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
  lastKnownRequest = null; // История запроса, не разрешение по старым данным после reboot.
  manualClosed = null; // D-164: текущее операторское подтверждение, никогда не переносится через reboot.
  repeatEvents = []; // Возраст событий в мс работы приложения; простой/загрузка исключены D-091.
  repeatWarning = false;
  sinceRepeat = null;
  historyAt = null;
  retryPending = false;
  supported(sim) { return sim.state === 'STOPPED' || sim.state === 'STOPPING' && sim.boot.phase === 'RESTORED' && sim.protection.needsRestartContinue; }
  confirmedClosed(sim) {
    return sim.signals.position('st') === 'CLOSED' || !!this.manualClosed ||
      sim.state === 'STOPPING' && sim.protection.stBlocked && sim.protection.manualStClosed;
  }
  confirmClosed(sim, confirmed) {
    const reasons=[];
    if(confirmed!==true || sim.state!=='STOPPED' || sim.signals.read('cooling.required')!==true)reasons.push('Нужны текущий запрос охлаждения, остановленный ТО и отдельное подтверждение проверки закрытия на месте');
    if(sim.outputs.value('st.power')!==false || sim.outputs.value('st.direction')!=='STOP' || sim.anyEngineeringTest())reasons.push('Питание и движение ШТ должны быть сняты; активная проверка недопустима');
    if(reasons.length)return reasons;
    this.manualClosed={at:sim.clock.now,openAtConfirmation:sim.signals.position('st')==='OPEN'};
    sim.log('COOLING_MANUAL_ST','Закрытие проверено на месте только для текущего охлаждения. DI, неисправность и блокировка питания не изменены (D-164)');
    return [];
  }
  revokeManual(sim,reason) {
    if(!this.manualClosed)return;
    this.manualClosed=null;sim.log('COOLING_MANUAL_ST','Подтверждение закрытия снято: '+reason);
  }
  observeManual(sim) {
    if(sim.signals.read('cooling.required')===false)this.revokeManual(sim,'цикл охлаждения закончился');
    // Старые неисправные 1/0, уже видимые при проверке на месте, не отменяют её сразу.
    if(this.manualClosed && !this.manualClosed.openAtConfirmation && sim.signals.position('st')==='OPEN')this.revokeManual(sim,'новое достоверное Открыт=1/Закрыт=0 (D-164)');
  }
  updateHistory(sim) {
    if(sim.state===null){this.historyAt=sim.clock.now;return;}
    const delta=this.historyAt===null?0:Math.max(0,sim.clock.now-this.historyAt);this.historyAt=sim.clock.now;
    this.repeatEvents=this.repeatEvents.map(age=>age+delta).filter(age=>age<=600000);
    if(this.sinceRepeat!==null)this.sinceRepeat+=delta;
    if(this.repeatWarning && this.sinceRepeat>=600000){this.repeatWarning=false;sim.log('COOLING_REPEAT','Предупреждение повторов снято: 10 минут без учитываемого пуска (D-091)');}
  }
  issued(sim,name,value) {
    if(name==='st.direction' && ['OPEN','CLOSE'].includes(value))this.revokeManual(sim,'фактически выдана новая команда движения');
    if(name!=='vfd.run'||value!=='START'||!this.supported(sim)||sim.fanTest.active)return;
    if(this.retryPending && sim.boot.phase==='RESTORED' && sim.protection.needsRestartContinue && !this.confirmedClosed(sim)){
      this.repeatEvents.push(0);this.sinceRepeat=0;
      if(this.repeatEvents.length>=3)this.repeatWarning=true;
      sim.log('COOLING_REPEAT','Учтена новая попытка после потери циркуляции: '+this.repeatEvents.length+' за 10 минут; дополнительного запрета нет (D-090)');
    }
    this.retryPending=false;this.lostCirculation=false;this.normalSince=null;
  }
  restoreSnapshot(saved,sim) {
    this.lastKnownRequest=saved.lastKnownRequest;
    this.repeatEvents=[...saved.repeatEvents];this.repeatWarning=saved.repeatWarning;this.sinceRepeat=saved.sinceRepeat;
    this.retryPending=saved.retryPending;this.lostCirculation=saved.retryPending;
    this.historyAt=sim.clock.now; // Ни старые разрешения/OPEN+5 с, ни ручная проверка не восстанавливаются.
  }
  observeCirculation(sim) {
    for (const pump of [1,2]) {
      if (sim.signals.position('valve'+pump) === 'OPEN') this.openedAt[pump] ??= sim.clock.now;
      else delete this.openedAt[pump];
    }
  }
  circulation(sim) {
    const pump=sim.selectedPump, {q,dp}=sim.hydraulics.values(sim);
    // Запрет насосов D-149 уже принят в текущем цикле: не ждать следующего чтения собственного OFF.
    return !sim.pressure.trip && !sim.pumps.active && sim.outputs.value('pump'+pump+'.run') === true && sim.signals.phases(pump)?.every(Boolean) === true &&
      this.openedAt[pump] !== undefined && sim.clock.now-this.openedAt[pump]>=5000 &&
      q !== null && q>=sim.config.flowMin && dp !== null && dp>=sim.config.dpMin;
  }
  running(sim) { return sim.outputs.value('vfd.run')==='START' && sim.outputs.value('vfd.enable')===true && sim.signals.read('vfd.running')===true; }
  step(sim, request) {
    if (!this.supported(sim)) return;
    const required=sim.signals.read('cooling.required'),wanted=required===true;
    if(required!==null)this.lastKnownRequest=required;
    request['shod.voltage'] = required!==false || sim.fanTest.coolingBlocked || sim.vfdGuard.blocked ? 10 : 0;
    this.reasons=[];
    if (sim.fanTest.active) { this.phase='TEST_OWNS_FAN'; return; }
    // При начинающемся открытии теста не пускать охлаждение по ещё не снявшемуся CLOSED.
    const closed=this.confirmedClosed(sim) && sim.shutterTest.active?.stage!=='OPEN';
    const circulation=this.circulation(sim);
    if (!closed && !circulation && (this.running(sim) || this.phase==='COOLING')) {this.lostCirculation=true;this.retryPending=true;}
    if (closed || required===false) { this.lostCirculation=false; this.normalSince=null;this.retryPending=false; }
    else if (this.lostCirculation) {
      if (circulation && wanted) this.normalSince ??= sim.clock.now; else this.normalSince=null;
      if (this.normalSince===null || sim.clock.now-this.normalSince<10000) this.reasons.push('Нужны 10 с непрерывной циркуляции после её потери');
    }
    if (!wanted) this.reasons.push(required===null?'Нет нового достоверного запроса охлаждения':'Запрос охлаждения отсутствует');
    if (!closed && !circulation) this.reasons.push('Нет закрытого ШТ или подтверждённой местной циркуляции Q/ΔP/затвор/+5 с');
    if (sim.fanTest.coolingBlocked || sim.vfdGuard.blocked) this.reasons.push('Действует отдельная блокировка дымососа/охлаждения');
    if (sim.signals.read('configuration.ready')!==true) this.reasons.push('Конфигурация ПЧ не подтверждена');
    if (this.reasons.length) {
      request['vfd.run']='STOP'; request['vfd.enable']=false;
      this.phase=required===false?'IDLE':'WAITING';
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
