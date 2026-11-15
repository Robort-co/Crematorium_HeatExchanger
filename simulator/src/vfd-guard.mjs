/** Контроль ПЧ для профиля STOPPED/инженерных тестов: D-053/D-096/D-103–D-106.
 * Подтверждение записи и последующее Работа=0 не являются измерением неподвижности ротора.
 */
export class VfdGuard {
  blocked = false;
  causes = [];
  stopAt = null;
  stopId = null;
  startId = null;
  startAt = null;
  seenRunning = false;
  lossAt = null;
  stoppedOnce = false;
  stopped(sim) {
    const command = sim.outputs.commands['vfd.run'];
    return sim.signals.read('vfd.exchange') === true && sim.outputs.value('vfd.enable') === false &&
      command?.value === 'STOP' && command.delivery === 'ACCEPTED' && sim.signals.read('vfd.running') === false &&
      sim.signals.get('vfd.running').lastGoodRevision > command.deliveryInputRevision;
  }
  fail(sim, code, text) {
    this.blocked = true;
    if (!this.causes.includes(code)) this.causes.push(code);
    sim.protection.fault(sim, code, text);
  }
  step(sim) {
    if (!sim.cooling.supported(sim) && !(sim.state===null && sim.boot.readable)) return; // Обычные RUN/START/STOP пока имеют отдельный охват.
    const command = sim.outputs.commands['vfd.run'], running = sim.signals.read('vfd.running');
    if (!command || sim.signals.read('vfd.exchange') !== true || sim.signals.read('vfd.fault') !== false) return;
    if(command.value==='START')this.stoppedOnce=false; // Новый принятый запрос уже отличает выбег от неожиданного пуска после STOP.
    if (command.value === 'START' && sim.outputs.value('vfd.enable') === true && command.delivery === 'ACCEPTED') {
      if (this.startId !== command.id) { this.startId = command.id; this.startAt = command.deliveredAt; this.seenRunning = false; this.lossAt = null; }
      this.stoppedOnce = false; this.stopAt = null; this.stopId = null;
      const fresh = sim.signals.get('vfd.running').lastGoodRevision > command.deliveryInputRevision;
      if (running === true && fresh) { this.seenRunning = true; this.lossAt = null; }
      else if (running === false && fresh) {
        if (this.seenRunning) {
          this.lossAt ??= sim.clock.now;
          if (sim.clock.now - this.lossAt >= 5000) this.fail(sim, 'VFD_RUNNING_LOST', 'Работа ПЧ отсутствует непрерывно 5 с');
        }
      } else this.lossAt = null; // UNKNOWN не приравнивается к Работа=0.
      // D-053: при пуске нужно положительное новое подтверждение. Его отсутствие
      // отличается от доказанной потери Работа=0 после уже подтверждённого запуска.
      if (!this.seenRunning && sim.clock.now - this.startAt >= 10000) this.fail(sim, 'VFD_START_NOT_CONFIRMED', 'Пуск ПЧ не подтверждён за 10 с');
    } else if (command.value === 'STOP' && sim.outputs.value('vfd.enable') === false && command.delivery === 'ACCEPTED') {
      if (this.stopId !== command.id) { this.stopId = command.id; this.stopAt = Math.max(command.deliveredAt, sim.outputs.commands['vfd.enable'].issuedAt); }
      if (this.stopped(sim)) { this.stoppedOnce = true; this.stopAt = null; this.seenRunning = false; }
      else if (running === true && sim.signals.get('vfd.running').lastGoodRevision > command.deliveryInputRevision) {
        if (this.stoppedOnce) { this.fail(sim, 'VFD_UNCOMMANDED_RUN', 'Работа ПЧ после подтверждённого останова без нового Пуска'); this.stoppedOnce = false; this.stopAt = sim.clock.now; }
        if (this.stopAt !== null && sim.clock.now - this.stopAt >= 30000) this.fail(sim, 'VFD_STOP_NOT_CONFIRMED', 'Останов ПЧ не подтверждён за 30 с');
      }
    }
  }
  enforce(request) { if (this.blocked) { request['vfd.run'] = 'STOP'; request['vfd.enable'] = false; request['shod.voltage'] = 10; } }
  reset(sim, confirmed) {
    if (confirmed !== true || !sim.engineering.enabled || !sim.engineering.furnaceOff || sim.anyEngineeringTest() || !this.stopped(sim) ||
        sim.signals.read('configuration.ready') !== true || sim.signals.read('vfd.fault') !== false) return ['Нужны устранение причины, инженерный сеанс, подтверждённый STOP и проверенная конфигурация без активного теста'];
    sim.protection.faults = sim.protection.faults.filter(f=>!this.causes.includes(f.code));
    this.causes = []; this.blocked = false;
    return [];
  }
}
