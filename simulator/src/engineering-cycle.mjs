/** Переходы общего цикла D-265/D-253/D-255/D-256.
 * Реализованы две объединённые ветви и ШТ; ШОД/дымосос остаются явными незавершёнными этапами.
 * Этот координатор не выдаёт выходов и не отменяет собственных допусков отдельных тестов.
 */
export const ENGINEERING_ORDER = ['BRANCH_1', 'BRANCH_2', 'ST', 'SHOD', 'FAN'];
export class EngineeringCycle {
  phase = 'IDLE';
  cursor = 0;
  running = null;
  results = {};
  history = [];
  cancelRequested = false;
  get pending() { return ['WAITING', 'ACTIVE'].includes(this.phase); }
  get current() { return ENGINEERING_ORDER[this.cursor] ?? null; }
  reasons(sim) {
    const reasons = [];
    if (!sim.engineering.enabled || !sim.engineering.furnaceOff || sim.state !== 'STOPPED') reasons.push('Нужен инженерный сеанс при выключенной печи и остановленном ТО');
    if (!sim.hmiAvailable()) reasons.push('Нет HMI');
    if (sim.engineering.active || sim.shutterTest.active) reasons.push('Предыдущая проверка не закончена');
    if (Object.values(sim.engineering.returnRequired).some(Boolean) || Object.values(sim.engineering.breakerOffRequired).some(Boolean) || Object.keys(sim.valves.waits).length) reasons.push('Сначала закончите обязательные ручные действия');
    return reasons;
  }
  begin(sim) {
    const reasons = this.reasons(sim);
    if (this.pending) reasons.push('Общий цикл уже начат');
    if (reasons.length) return reasons;
    this.phase = 'WAITING'; this.cursor = 0; this.running = null; this.results = {}; this.cancelRequested = false;
    sim.procedureId += 1;
    sim.log('ENGINEERING_CYCLE', 'Порядок D-265: ветвь 1 → ветвь 2 → ШТ → ШОД → дымосос; каждый запуск отдельным Продолжить');
    return [];
  }
  next(sim, options = {}, repeatKey = null) {
    const reasons = this.reasons(sim);
    if (repeatKey ? !['WAITING', 'COMPLETE', 'CANCELLED'].includes(this.phase) : this.phase !== 'WAITING') reasons.push('Нет ожидающего перехода общего цикла');
    const key = repeatKey ?? this.current;
    if (!ENGINEERING_ORDER.includes(key)) reasons.push('Неизвестный этап');
    if (repeatKey && !this.results[key]) reasons.push('Этап ещё не имеет результата для выборочного повторения');
    if (['SHOD', 'FAN'].includes(key)) reasons.push('Этот тест ещё не реализован; успех общего цикла не объявляется');
    if (reasons.length) return reasons;
    const admission = key === 'ST' ? sim.shutterTest.start(sim) : sim.engineering.start(sim, { kind: 'branch', pump: key === 'BRANCH_1' ? 1 : 2, repaired: options?.repaired });
    if (admission.length) return admission;
    const previousPhase = this.phase;
    this.results[key] = { result: 'NOT_CHECKED', reason: 'Новая полная попытка', valid: false };
    this.running = { key, repeat: !!repeatKey, previousPhase };
    this.phase = 'ACTIVE'; this.cancelRequested = false;
    return [];
  }
  skip(sim) {
    const reasons = this.reasons(sim);
    if (this.phase !== 'WAITING') reasons.push('Пропустить можно только ещё не начатый тест');
    if (reasons.length) return reasons;
    this.record(sim, this.current, { result: 'NOT_CHECKED', reason: 'Пропущено инженером (D-253)', valid: false });
    this.cursor += 1; this.phase = this.current ? 'WAITING' : 'COMPLETE';
    sim.procedureId += 1;
    return [];
  }
  cancel(sim) {
    if (!this.pending) return ['Нет незавершённого общего цикла'];
    if (this.phase === 'ACTIVE') {
      this.cancelRequested = true;
      if (this.running.key === 'ST') sim.shutterTest.cancel(sim, 'Общий цикл отменён инженером (D-255/D-221)');
      else sim.engineering.stop(sim, 'Общий цикл отменён инженером (D-255)');
    } else this.finishCancel(sim);
    return [];
  }
  record(sim, key, result) {
    this.results[key] = { ...result };
    this.history.push({ key, at: sim.clock.now, ...result });
  }
  finishCancel(sim) {
    for (const key of ENGINEERING_ORDER.slice(this.cursor)) if (!this.results[key]) this.record(sim, key, { result: 'NOT_CHECKED', reason: 'Общий цикл отменён до начала теста', valid: false });
    this.phase = 'CANCELLED'; this.running = null; this.cancelRequested = false;
    sim.procedureId += 1;
  }
  observe(sim) {
    if (this.phase !== 'ACTIVE') return;
    const op = this.running;
    if (op.key === 'ST' ? sim.shutterTest.active : sim.engineering.active) return;
    const result = op.key === 'ST' ? sim.shutterTest.result : sim.engineering.history.at(-1);
    this.record(sim, op.key, result ?? { result: 'NOT_CHECKED', reason: 'Нет результата текущей попытки', valid: false });
    this.running = null;
    if (this.cancelRequested) { this.finishCancel(sim); return; }
    if (!op.repeat) this.cursor += 1;
    this.phase = op.repeat ? op.previousPhase : this.current ? 'WAITING' : 'COMPLETE';
    sim.procedureId += 1; // Старое подтверждение не начинает следующий механизм.
  }
  restoreSnapshot(saved, sim) {
    Object.assign(this, saved);
    if (!this.pending) return;
    if (this.running) this.record(sim, this.running.key, { result: 'NOT_CHECKED', reason: 'Перезагрузка, новая полная попытка отдельно', valid: false });
    this.finishCancel(sim); // Ни очередь, ни текущий механизм не продолжаются автоматически.
  }
}
