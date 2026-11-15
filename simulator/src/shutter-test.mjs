/** ШТ: отдельный инженерный цикл D-077/D-214/D-218–D-224.
 * Этот профиль не моделирует охлаждение D-215–D-217. Все выходы выдаёт Protection.
 * required/incomplete/result сохраняются только в памяти имитатора, не в реальной NV.
 */
export class ShutterTest {
  active = null;
  required = false; // Обязательный полный повтор после неисправности/незавершённой попытки.
  incomplete = false; // Устанавливается ДО первой команды движения D-223.
  result = null;
  history = [];
  isOwnFault(code) { return ['st_MOTION_TIMEOUT', 'st_ORIGIN_NOT_RELEASED', 'ST_LIMIT_CONTRADICTION', 'ST_LOST_OPEN'].includes(code); }
  reasons(sim, test = true) {
    const reasons = [];
    if (test && (!sim.engineering.enabled || !sim.engineering.furnaceOff)) reasons.push('Нужен инженерный сеанс и явная предпосылка «печь выключена»');
    if (!sim.stoppedConfirmed()) reasons.push('Профиль ШТ без охлаждения: нужны подтверждённые останов ТО, OFF/000 насосов и STOP ПЧ');
    if (!sim.hmiAvailable()) reasons.push('Нет управляющей HMI');
    if (this.active || sim.engineering.active || sim.pumps.active || sim.recovery.active) reasons.push('Другой механизм/проверка ещё не завершён');
    if (Object.values(sim.engineering.returnRequired).some(Boolean) || Object.values(sim.engineering.breakerOffRequired).some(Boolean) || Object.keys(sim.valves.waits).length) reasons.push('Завершите обязательные ручные действия предыдущего этапа');
    if (sim.signals.position('st') !== 'CLOSED') reasons.push('Нужно реальное исходное Закрыт=1/Открыт=0; ручное подтверждение не заменяет DI');
    if (sim.signals.read('cooling.required') !== false) reasons.push('Профиль с охлаждением ещё не реализован; разрешение D-215 не отменено');
    for (const name of ['grid.normal', 'temperature.normal', 'configuration.ready', 'vfd.exchange']) if (sim.signals.read(name) !== true) reasons.push('Нет текущего допуска: ' + name);
    if (sim.signals.read('emergency') !== false || sim.signals.read('vfd.fault') !== false) reasons.push('Нет текущего допуска по аварии/ПЧ');
    if (!sim.mainEnabled || !sim.supervisionEnabled) reasons.push('Нет подтверждённой работы управления');
    if (test && (sim.pressure.trip || ['pressure.before', 'pressure.after'].some(name => sim.signals.read(name) === null || sim.signals.read(name) < 0.8))) reasons.push('Нет допуска к новой проверке по давлению');
    return reasons;
  }
  restorePower(sim, confirmation) {
    const reasons = this.reasons(sim, false);
    if (!sim.protection.stBlocked && !sim.protection.faults.some(f => this.isOwnFault(f.code))) reasons.push('Нет блокировки ШТ для отдельного возврата');
    if (confirmation?.repaired !== true || confirmation?.manualFinished !== true || confirmation?.engaged !== true) reasons.push('Подтвердите ремонт, окончание ручного вмешательства и восстановление механического зацепления (D-077)');
    if (reasons.length) return reasons;
    this.required = true;
    sim.protection.stBlocked = false;
    sim.protection.manualStClosed = false;
    sim.protection.faults = sim.protection.faults.filter(f => !this.isOwnFault(f.code));
    delete sim.protection.motions.st;
    sim.protection.elapsed(sim, 'stContradiction', false);
    sim.request['st.power'] = true; sim.request['st.direction'] = 'CLOSE'; // При достоверном CLOSED Protection выдаёт STOP; сам цикл ещё не запускается.
    sim.log('ST_RETURN', 'Питание ШТ возвращено по отдельным подтверждениям D-077; полный тест D-214 и новый Пуск остаются отдельными');
    return [];
  }
  setReleaseTime(sim, seconds) {
    if (!sim.engineering.enabled || this.active || sim.engineering.active || !Number.isFinite(seconds) || seconds < 1 || seconds > 10) return ['Инженерный режим без активного теста; время схода 1–10 с (D-219)'];
    sim.config.stReleaseSeconds = seconds;
    return [];
  }
  start(sim) {
    const reasons = this.reasons(sim);
    if (sim.protection.stBlocked || sim.protection.faults.some(f => this.isOwnFault(f.code))) reasons.push('Сначала отдельный возврат питания ШТ по D-077');
    if (reasons.length) return reasons;
    this.required = true; this.incomplete = true;
    this.result = { result: 'NOT_CHECKED', reason: 'Новая полная попытка начата', valid: false };
    this.active = { stage: 'OPEN', startedAt: sim.clock.now, moveRevision: null, result: 'NOT_CHECKED', reason: null, cancelling: false };
    delete sim.protection.motions.st;
    sim.procedureId += 1;
    sim.log('ST_TEST_START', 'До движения сохранён признак незавершённости в памяти модели; Закрыт → Открыт → Закрыт');
    return [];
  }
  cancel(sim, reason = 'Отменено инженером (D-221)') {
    const op = this.active;
    if (!op || op.cancelling || op.stage === 'FINISH') return;
    op.cancelling = true; op.result = 'NOT_CHECKED'; op.reason = reason;
    if (sim.protection.stBlocked || sim.signals.position('st') === 'CLOSED') op.stage = 'FINISH';
    else if (op.stage !== 'CLOSE') { op.stage = 'CLOSE'; op.moveRevision = null; }
    // Уже идущее CLOSE и таймер Protection не перезапускаются D-221/D-222.
    sim.log('ST_TEST_CANCEL', reason + '; старый тест не возобновляется');
  }
  fault(sim, reason) {
    this.required = true;
    if (this.result) this.result.valid = false;
    if (this.active) { this.active.result = 'FAILED'; this.active.reason = reason; this.active.stage = 'FINISH'; }
  }
  move(sim, request, desired) {
    const op = this.active, command = sim.outputs.commands['st.direction'];
    request['st.direction'] = desired;
    if (command?.value === desired) op.moveRevision ??= command.issuedInputRevision;
    if (op.moveRevision !== null && sim.signals.position('st') === (desired === 'OPEN' ? 'OPEN' : 'CLOSED') &&
        ['open', 'closed'].every(limit => sim.signals.get('st.' + limit).lastGoodRevision > op.moveRevision)) {
      request['st.direction'] = 'STOP'; op.moveRevision = null;
      return true;
    }
    return false;
  }
  step(sim, request) {
    const op = this.active;
    if (!op) return;
    if (sim.protection.stBlocked && op.stage !== 'FINISH') this.fault(sim, 'Собственная блокировка ШТ');
    // Узкое согласование 15.11: низкое давление при неработающем дымососе/без охлаждения.
    // OFF насосов и OPEN их затворов остаются в Protection, собственная ошибка ШТ старше отмены.
    if (sim.pressure.lowTrip) this.cancel(sim, 'Защита низкого давления — согласование 15.11');
    if (!sim.hmiAvailable()) this.cancel(sim, 'Потеря связи HMI 5 с (D-222)');
    request['st.power'] = !sim.protection.stBlocked;
    request['st.direction'] = 'STOP';
    if (op.stage === 'OPEN' && this.move(sim, request, 'OPEN')) op.stage = 'BREAK_CLOSE';
    else if (op.stage === 'BREAK_CLOSE') op.stage = 'CLOSE'; // Сначала отдельный цикл со снятыми направлениями.
    else if (op.stage === 'CLOSE' && this.move(sim, request, 'CLOSE')) {
      if (!op.cancelling) { op.result = 'PASSED'; op.reason = 'Полный непрерванный цикл подтверждён (D-224)'; }
      op.stage = 'FINISH';
    }
  }
  afterOutputs(sim) {
    const op = this.active;
    if (!op || op.stage !== 'FINISH' || sim.outputs.value('st.direction') !== 'STOP') return;
    if (op.result === 'PASSED' && (sim.protection.stBlocked || sim.signals.position('st') !== 'CLOSED')) return;
    if (op.result === 'FAILED' && sim.outputs.value('st.power') !== false) return;
    this.result = { ...op, completedAt: sim.clock.now, valid: op.result === 'PASSED' };
    this.history.push({ ...this.result });
    this.active = null; this.incomplete = false;
    if (this.result.valid) this.required = false; // Только своё требование; чужие аварии не сбрасываются.
    sim.log('ST_TEST_RESULT', this.result.result + ': ' + this.result.reason);
  }
  restoreSnapshot(saved, now) {
    Object.assign(this, saved);
    if (this.active || this.incomplete) {
      this.result = { ...this.active, result: 'NOT_CHECKED', valid: false, reason: 'Перезагрузка: полный тест требуется заново (D-223)', completedAt: now };
      this.history.push({ ...this.result }); this.required = true;
    }
    this.active = null; this.incomplete = false; // Ни OPEN, ни закрытие после отмены не продолжаются сами.
  }
}
