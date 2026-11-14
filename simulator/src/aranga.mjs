/** Имитатор прикладных операций ARANGA. Нет сокетов Modbus, адресов и управления печью. */
export class ArangaExchange {
  lastAttemptAt = null; // Последняя попытка, включая неуспешную; не подтверждает обмен.
  lastSuccessAt = null; // Последняя успешная операция именно ARANGA, D-294/D-300.
  lossDetected = false; // Зафиксированный перерыв; чтение снимает связь, но не удержание частоты.
  startArmed = false; // D-298: после загрузки/потери связи требуется сначала запись Пуск=0.
  startLevel = null; // Последний полученный уровень Пуска; неизвестность не считается нулём.
  stopLevel = null; // Принятый Стоп=1 запрещает новый пуск до явного снятия, D-299.
  frequencyValue = null; // Последнее достоверное записанное число, не обязательно применяемое задание.
  frequencyUpdatedAt = null; // Время последней попытки частотной записи, включая отклонённую.
  frequencyGoodAt = null; // Время последней принятой частотной записи.
  frequencyQuality = 'UNKNOWN'; // Качество последней попытки записи; последнее хорошее число хранится отдельно.
  frequencyRevision = 0; // Порядок событий записи; это не новый сетевой watchdog или регистр.
  activeFrequency = null; // Действующее рабочее задание сквозного режима; при потере фиксируется итоговая выдача.
  source = 'FMIN'; // FMIN / ARANGA / HOLD / LOCAL: источник рабочей частоты, отдельно от признака связи.
  holding = false; // D-331: удержание остаётся после восстановления чтения до новой записи частоты.
  lastRequest = null; // Результат принятия сетевого запроса, не подтверждение исполнения механизма.
  sequence = 0; // Технический номер запроса в журнале симулятора.

  available(sim) { // sim — источник управляемого времени, не реальное сетевое подключение.
    return this.lastSuccessAt !== null && sim.clock.now - this.lastSuccessAt < 5000;
  }
  beginStartup(sim) {
    // D-295: прежний регистр и записи до завершения запуска не заменяют начальное Fmin.
    this.activeFrequency = sim.config.fmin;
    this.source = 'FMIN';
    this.holding = false;
  }
  poll(sim) {
    if (this.lastSuccessAt !== null && !this.available(sim) && !this.lossDetected) {
      this.lossDetected = true;
      this.startArmed = false;
      this.startLevel = null;
      sim.log('ARANGA_LINK', 'Нет успешного обмена ARANGA 5 с; новый Пуск требует 0 → 1');
      if (sim.state === 'RUNNING' && sim.mode === 'ARANGA') {
        this.activeFrequency = sim.outputs.value('vfd.frequency');
        this.holding = true;
        this.source = 'HOLD';
        sim.log('WARNING', 'Нет обмена с ARANGA: удержание задания, без останова (D-330)');
      }
    }
  }
  success(sim) {
    this.lastSuccessAt = sim.clock.now;
    if (this.lossDetected) sim.log('ARANGA_LINK', 'Обмен восстановлен; чтение само не возвращает управление частотой (D-331)');
    this.lossDetected = false;
  }
  receive(sim, operation, payload = {}) { // operation — read/controls/frequency/failed; payload — условные данные без адресов.
    this.poll(sim); // Перерыв нельзя скрыть поздней записью на границе 5 с.
    if (!sim.coverageGap) sim.protection.checkCommunication(sim); // Истёкший пусковой таймаут обрабатывается до новой операции.
    const restoring = this.lossDetected; // Восстановление обмена отличается от обычного очередного чтения.
    this.lastAttemptAt = sim.clock.now;
    const result = { id: ++this.sequence, operation, at: sim.clock.now, result: 'REJECTED', reasons: [] }; // Отдельный итог сетевого запроса.
    this.lastRequest = result;
    if (sim.coverageGap) result.reasons.push('Модель приостановлена вне реализованного охвата');
    else if (operation === 'failed') result.reasons.push('Неуспешная операция: таймер обмена не обновлён');
    else if (operation === 'read') {
      this.success(sim);
      result.result = 'ACCEPTED';
    } else if (operation === 'frequency') {
      this.frequencyUpdatedAt = sim.clock.now;
      if (!Number.isFinite(payload.value)) {
        this.frequencyQuality = payload.value === null || payload.value === undefined ? 'UNKNOWN' : 'BAD';
        result.reasons.push('Частота отсутствует или не является конечным числом');
      }
      else {
        this.success(sim);
        this.frequencyValue = payload.value;
        this.frequencyGoodAt = sim.clock.now;
        this.frequencyQuality = 'GOOD';
        this.frequencyRevision += 1;
        if (sim.state === 'RUNNING' && sim.mode === 'ARANGA') {
          this.activeFrequency = payload.value;
          this.source = 'ARANGA';
          this.holding = false; // Новая запись может содержать прежнее число, D-331.
        }
        result.result = 'ACCEPTED'; // В ручном режиме/при останове приём не даёт права вытеснять местное задание.
      }
    } else if (operation === 'controls' && typeof payload.start === 'boolean' && typeof payload.stop === 'boolean') {
      this.success(sim);
      const rising = payload.start && this.startArmed; // Однократный фронт; недопущенная команда не остаётся в очереди.
      this.startLevel = payload.start;
      this.startArmed = !payload.start;
      this.stopLevel = payload.stop;
      if (payload.stop) {
        result.result = sim.protection.beginStop(sim, 'Стоп ARANGA по уровню (D-299)') ? 'ACCEPTED' : 'NO_CHANGE';
        if (payload.start) result.reasons.push('Стоп имеет приоритет над Пуском');
      } else if (rising) {
        result.reasons = sim.startReasons('ARANGA');
        if (!result.reasons.length) { sim.beginStart('ARANGA'); result.result = 'ACCEPTED'; }
      } else {
        result.result = 'NO_CHANGE';
        if (payload.start) result.reasons.push('Нет нового допустимого фронта 0 → 1');
      }
    } else result.reasons.push('Неизвестная операция или неверный тип данных');
    if (restoring && operation !== 'frequency' && ['ACCEPTED', 'NO_CHANGE'].includes(result.result) &&
        sim.state === 'STOPPING' && sim.protection.startupLinkStop && !sim.protection.startupHmiStop &&
        ['WAIT_BYPASS', 'CLOSE_ST'].includes(sim.protection.stopStage) &&
        this.frequencyValue !== null && this.frequencyRevision <= sim.protection.stopFrequencyRevision) {
      // D-331 явно относится к В работе. Старый ранний регистр при останове D-260 требует отдельной сверки D-294.
      sim.gap('Прерванный сквозной запуск: восстановилось чтение при сохранённой ранней частоте. Применение старого регистра в этом сочетании не уточнено; новая реакция не назначена');
    }
    if (operation !== 'read' || result.result !== 'ACCEPTED') sim.log('ARANGA_REQUEST', operation + ': ' + result.result, result);
    return result;
  }
  localFrequency(sim, value) { // value — местная корректировка сквозного задания только в период удержания.
    if (sim.mode !== 'ARANGA' || sim.state !== 'RUNNING' || !this.holding) return false;
    this.activeFrequency = value;
    this.source = 'LOCAL';
    return true;
  }
  snapshot(sim) {
    return { available: this.available(sim), lastAttemptAt: this.lastAttemptAt, lastSuccessAt: this.lastSuccessAt,
      startLevel: this.startLevel, stopLevel: this.stopLevel, startArmed: this.startArmed,
      frequencyValue: this.frequencyValue, frequencyUpdatedAt: this.frequencyUpdatedAt,
      frequencyGoodAt: this.frequencyGoodAt, frequencyQuality: this.frequencyQuality, frequencyRevision: this.frequencyRevision,
      activeFrequency: this.activeFrequency, holding: this.holding, source: this.source, lastRequest: this.lastRequest };
  }
}
