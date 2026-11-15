/** Ограниченный профиль охлаждения остановленного ТО по явному нормализованному запросу.
 * Температурные пороги/датчики здесь не имитируются: cooling.required задаёт испытатель.
 * Местные насосы ради охлаждения не запускаются. Реального NV/ПЧ нет.
 */
export class Cooling {
  openedAt = {};
  lostCirculation = false;
  normalSince = null;
  phase = 'IDLE';
  reasons = [];
  observeCirculation(sim) {
    for (const pump of [1,2]) {
      if (sim.signals.position('valve'+pump) === 'OPEN') this.openedAt[pump] ??= sim.clock.now;
      else delete this.openedAt[pump];
    }
  }
  circulation(sim) {
    const pump=sim.selectedPump, {q,dp}=sim.hydraulics.values(sim);
    // Запрет насосов D-149 уже принят в текущем цикле: не ждать следующего чтения собственного OFF.
    return !sim.pressure.trip && sim.outputs.value('pump'+pump+'.run') === true && sim.signals.phases(pump)?.every(Boolean) === true &&
      this.openedAt[pump] !== undefined && sim.clock.now-this.openedAt[pump]>=5000 &&
      q !== null && q>=sim.config.flowMin && dp !== null && dp>=sim.config.dpMin;
  }
  running(sim) { return sim.outputs.value('vfd.run')==='START' && sim.outputs.value('vfd.enable')===true && sim.signals.read('vfd.running')===true; }
  step(sim, request) {
    if (sim.state !== 'STOPPED') return;
    const wanted=sim.signals.read('cooling.required')===true;
    request['shod.voltage'] = wanted || sim.fanTest.coolingBlocked || sim.vfdGuard.blocked ? 10 : 0;
    this.reasons=[];
    if (sim.fanTest.active) { this.phase='TEST_OWNS_FAN'; return; }
    // При начинающемся открытии теста не пускать охлаждение по ещё не снявшемуся CLOSED.
    const closed=sim.signals.position('st')==='CLOSED' && sim.shutterTest.active?.stage!=='OPEN';
    const circulation=this.circulation(sim);
    if (!closed && !circulation && (this.running(sim) || this.phase==='COOLING')) this.lostCirculation=true;
    if (closed) { this.lostCirculation=false; this.normalSince=null; }
    else if (this.lostCirculation) {
      if (circulation) this.normalSince ??= sim.clock.now; else this.normalSince=null;
      if (this.normalSince===null || sim.clock.now-this.normalSince<10000) this.reasons.push('Нужны 10 с непрерывной циркуляции после её потери');
    }
    if (!wanted) this.reasons.push('Запрос охлаждения отсутствует');
    if (!closed && !circulation) this.reasons.push('Нет закрытого ШТ или подтверждённой местной циркуляции Q/ΔP/затвор/+5 с');
    if (sim.fanTest.coolingBlocked || sim.vfdGuard.blocked) this.reasons.push('Действует отдельная блокировка дымососа/охлаждения');
    if (sim.signals.read('configuration.ready')!==true) this.reasons.push('Конфигурация ПЧ не подтверждена');
    if (this.reasons.length) {
      request['vfd.run']='STOP'; request['vfd.enable']=false;
      this.phase=wanted?'WAITING':'IDLE';
      return;
    }
    if (sim.outputs.value('vfd.run') !== 'START' && !sim.vfdGuard.stopped(sim)) {
      request['vfd.run']='STOP'; request['vfd.enable']=false;
      this.phase='WAIT_STOP'; this.reasons.push('Сначала подтвердите полный останов ПЧ'); return;
    }
    request['vfd.run']='START'; request['vfd.enable']=true;
    request['vfd.frequency']=sim.frequency.apply(sim.config.coolingFrequency);
    this.phase='COOLING';
  }
}
