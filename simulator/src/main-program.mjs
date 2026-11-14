/** Основная программа: формирует запросы, но не имеет метода записи физических/виртуальных выходов. */
export class MainProgram {
  stage = 'IDLE'; // Подэтап запуска; основное состояние ТО хранится отдельно в Simulation.
  pumpOnAt = null; // Начало итоговой команды насосу, мс; задержка открытия D-139.
  openedAt = null; // Непрерывное подтверждение открытия перед пусковой проверкой через 5 с.
  preparationDone = false; // Оборудование подготовлено; подтверждение закрытия ШБ всё ещё отдельно.
  bypassClosed = false; // Операторское подтверждение только текущего запуска, не физический DI.
  lastCycleAt = null; // Обновляется только после полностью завершённого цикла основной программы.
  start() {
    this.stage = 'OPEN_ST';
    this.pumpOnAt = null;
    this.openedAt = null;
    this.preparationDone = false;
    this.bypassClosed = false;
  }
  step(sim) { // sim — окружение ядра: входы, время, состояние и запросы; реального I/O нет.
    const request = { ...sim.request }; // Базовые желаемые команды, не выдача на механизмы.
    const pump = sim.selectedPump; // Рабочая ветвь текущего тестового сценария.
    if (sim.state === 'STARTING') {
      request['st.power'] = true;
      request['st.direction'] = this.stage === 'OPEN_ST' ? 'OPEN' : 'STOP';
      if (this.stage === 'OPEN_ST' && sim.signals.position('st') === 'OPEN') {
        this.stage = 'CLOSE_VALVES';
        request['st.direction'] = 'STOP';
        sim.log('STAGE', 'ШТ открыт: подготовка ПЧ и насосов, требуется закрыть ШБ');
      }
      if (this.stage !== 'OPEN_ST') {
        request['vfd.enable'] = true;
        request['vfd.run'] = 'START';
        request['vfd.frequency'] = sim.config.fmin;
      }
      if (this.stage === 'CLOSE_VALVES') {
        request['valve1.direction'] = 'CLOSE';
        request['valve2.direction'] = 'CLOSE';
        if (sim.signals.position('valve1') === 'CLOSED' && sim.signals.position('valve2') === 'CLOSED') {
          this.stage = 'PUMP_ON';
          request['pump' + pump + '.run'] = true;
          sim.log('STAGE', 'Оба затвора закрыты: запрос включения рабочего насоса');
        }
      }
      if (this.stage === 'PUMP_ON') {
        request['pump' + pump + '.run'] = true;
        const issued = sim.outputs.commands['pump' + pump + '.run']; // Таймер от итоговой команды, не от нажатия Пуск.
        if (issued?.value === true) this.pumpOnAt ??= issued.issuedAt;
        if (this.pumpOnAt !== null && sim.clock.now - this.pumpOnAt >= 1000) { // D-139: исходная настройка задержки 1 с.
          this.stage = 'OPEN_VALVE';
          request['valve' + pump + '.direction'] = 'OPEN';
          sim.log('STAGE', 'Выдержка 1 с: запрос открытия рабочего затвора');
        }
      }
      if (this.stage === 'OPEN_VALVE' || this.stage === 'CIRCULATION') {
        request['valve' + pump + '.direction'] = this.stage === 'OPEN_VALVE' ? 'OPEN' : 'STOP';
        if (sim.signals.position('valve' + pump) === 'OPEN') {
          this.openedAt ??= sim.clock.now;
          this.stage = 'CIRCULATION';
          request['valve' + pump + '.direction'] = 'STOP';
        } else this.openedAt = null;
        if (this.openedAt !== null && sim.clock.now - this.openedAt >= 5000) {
          // D-031: это момент пусковой проверки, а не ещё одна выдержка низкого расхода.
          const circulation = sim.circulation(); // Отдельная достоверность Q и ΔP.
          const phases = sim.signals.phases(pump); // Напряжение не выводится из команды ON.
          const vfdStart = sim.outputs.commands['vfd.run']; // Подтверждение записи START отдельно от бита Работа.
          const running = sim.signals.get('vfd.running'); // Свежая обратная связь после принятой записи.
          const vfdConfirmed = vfdStart?.value === 'START' && vfdStart.delivery === 'ACCEPTED' && // Принятая запись START и новый достоверный ответ Работа — разные доказательства.
            sim.signals.read('vfd.running') === true && running.lastGoodRevision > vfdStart.deliveryInputRevision;
          this.preparationDone = circulation === 'NORMAL' && phases?.every(Boolean) && vfdConfirmed;
          if (this.preparationDone && this.bypassClosed) {
            sim.transition('RUNNING', 'Подготовка завершена и ШБ закрыт подтверждён оператором (D-030)');
            this.stage = 'COMPLETE';
          }
        }
      }
    }
    if (sim.state === 'RUNNING') {
      request['pump' + pump + '.run'] = true;
      request['vfd.enable'] = true;
      request['vfd.run'] = 'START';
      request['vfd.frequency'] = sim.frequency.apply(sim.manualFrequency);
    }
    this.lastCycleAt = sim.clock.now;
    return request;
  }
}
