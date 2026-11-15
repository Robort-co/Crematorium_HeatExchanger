/** Восстановление логики по имитируемому снимку в памяти процесса.
 * НЕ энергонезависимое хранилище: завершение Node.js теряет этот снимок.
 * Старые команды/DI не используются как новые физические подтверждения после reboot.
 */
export class RebootRecovery {
  storage = 'MEMORY_SIMULATION_ONLY';
  savedState = null;
  readable = false;
  phase = 'INACTIVE';
  reasons = [];
  circulationPending = false;
  circulationRestored = false;
  initialOffAccepted = false; // Узкое согласование 15.11: STOPPED/CLOSED/охлаждение, одна ветвь 111, другая 000.
  begin(state, readable) {
    this.savedState = state;
    this.readable = readable && ['STOPPED', 'STOPPING', 'STARTING', 'RUNNING'].includes(state);
    this.phase = this.readable ? 'WAIT_INPUTS' : 'UNKNOWN_SAVED_STATE';
    this.reasons = this.readable ? ['Нужны новые входы, подтверждения OFF/STOP и 5 с нормы сети'] : ['Сохранённое состояние отсутствует/не прочитано; автоматического восстановления нет'];
  }
  stPower(sim) { // D-162: достоверно прочитанная блокировка и новые непротиворечивые концевики.
    return this.readable && !sim.protection.stBlocked && !['UNKNOWN', 'CONTRADICTORY'].includes(sim.signals.position('st'));
  }
  initialRequests(sim) {
    const request = {};
    if (!this.readable) return request;
    request['vfd.enable'] = false; // D-093: проводное разрешение не ждёт доступности рабочего обмена.
    if (sim.signals.read('vfd.exchange') === true) {
      // D-093/D-103: до нового допуска/подтверждения останова прежний Пуск не возвращается.
      request['vfd.run'] = 'STOP'; request['vfd.enable'] = false;
    }
    if (sim.signals.read('grid.normal') === true) {
      request['shod.voltage'] = sim.signals.read('cooling.required') === false && !sim.fanTest.coolingBlocked && !sim.vfdGuard.blocked ? 0 : 10;
    }
    const phases=[1,2].map(pump=>sim.signals.phases(pump));
    const oneRunning=phases.filter(p=>p?.every(Boolean)).length===1 && phases.filter(p=>p?.every(value=>!value)).length===1;
    if(!this.initialOffAccepted && this.savedState==='STOPPED' && sim.signals.position('st')==='CLOSED' && sim.signals.read('cooling.required')===true && oneRunning){
      this.initialOffAccepted=true;
      sim.log('BOOT_PUMP_OFF','Принят OFF обоим насосам при новых 111/000 после reboot; далее прежняя диагностика напряжения после OFF. Согласование 15.11');
    }
    if (this.initialOffAccepted || phases.every(p=>p?.every(value=>!value))) {
      for (const pump of [1, 2]) {
        request['pump' + pump + '.run'] = false;
        request['valve' + pump + '.direction'] = 'STOP';
      }
    } // Иные исходные фазы не получают нового допуска; уже принятый OFF не отменяется.
    return request;
  }
  restoreState(sim) {
    if (!this.readable || this.phase !== 'WAIT_INPUTS') return;
    const reasons = [];
    if (sim.protection.elapsed(sim, 'bootGridNormal', sim.signals.read('grid.normal') === true) < 5000) reasons.push('Нет 5 с непрерывной нормы сети после загрузки (D-051)');
    for (const name of ['temperature.normal', 'configuration.ready', 'vfd.exchange']) if (sim.signals.read(name) !== true) reasons.push('Нет нового допуска: ' + name);
    // Неизвестный температурный запрос не разрешает дымосос, но по D-093 не мешает
    // восстановить независимую циркуляцию незавершённого останова при её разрешениях.
    if (this.savedState === 'STOPPED' && sim.signals.read('cooling.required') === null) reasons.push('Ожидание нового нормализованного запроса охлаждения');
    if (sim.signals.read('vfd.fault') !== false || sim.signals.read('emergency') === null) reasons.push('Нет новых данных об авариях');
    if (![1, 2].every(pump => sim.engineering.off(sim, pump))) reasons.push(this.initialOffAccepted?'OFF уже выдан; нужны новые 000 и выполнение диагностики напряжения после OFF':'Нужны обе команды OFF и новые 000; исходное сочетание вне согласованного допуска');
    const stop = sim.outputs.commands['vfd.run'];
    if (stop?.value !== 'STOP' || stop.delivery !== 'ACCEPTED' || sim.signals.read('vfd.running') !== false || sim.signals.get('vfd.running').lastGoodRevision <= stop.deliveryInputRevision) reasons.push('Нет принятого STOP ПЧ и нового ответа Работа=0');
    if (this.savedState === 'STOPPED' && sim.signals.position('st') !== 'CLOSED') reasons.push('Для сохранённого останова нужно новое достоверное закрытие ШТ');
    this.reasons = reasons;
    if (reasons.length) return;
    this.phase = 'RESTORED';
    if (this.savedState === 'STOPPED') {
      sim.transition('STOPPED', 'Сохранённый останов подтверждён новыми входами; инженерный тест не возобновляется');
    } else {
      sim.procedureId += 1;
      sim.transition('STOPPING', 'Перезагрузка из ' + this.savedState + ': обязательный останов D-150, без возврата обычной работы');
      const p = sim.protection;
      p.stopStage = 'WAIT_BYPASS'; p.stopIrreversible = true;
      p.needsRestartContinue = true; p.restartContinued = false; p.bypassOpen = false;
      sim.stopReason = 'Останов после перезагрузки';
      this.circulationPending = sim.signals.position('st') !== 'CLOSED';
      sim.log('PROMPT', 'Заново проверьте и подтвердите ШБ открыт, затем отдельно «Продолжить останов». Новый Пуск запрещён (D-150)');
    }
  }
  maybeCirculate(sim) {
    if (!this.circulationPending || sim.state !== 'STOPPING' || this.phase !== 'RESTORED') return;
    const p = sim.protection;
    if (sim.signals.position('st') === 'CLOSED' || p.stopStage !== 'WAIT_BYPASS' || p.restartContinued) { this.circulationPending = false; return; }
    const reasons = [];
    if (!['OPEN', 'INTERMEDIATE'].includes(sim.signals.position('st')) || p.stBlocked) reasons.push('Нет допустимого текущего положения/управления ШТ');
    if (!sim.pressure.normalBoth(sim) || sim.pressure.trip || sim.pressure.stopPending || sim.pressure.restartBlocked) reasons.push('Давление/сохранённый защитный останов не разрешает автоматическое включение');
    if (!sim.hmiAvailable() || !sim.mainEnabled || !sim.supervisionEnabled || sim.signals.read('emergency') !== false) reasons.push('Нет общего допуска управления');
    if (sim.signals.read('configuration.ready') !== true) reasons.push('Нет актуального допуска конфигурации');
    // Сохранённая обязанность ручного возврата не снимается восстановлением программного состояния.
    if (Object.values(sim.engineering.returnRequired).some(Boolean) || Object.values(sim.engineering.breakerOffRequired).some(Boolean)) reasons.push('Не завершены сохранённые обязательные ручные действия');
    if (!sim.engineering.off(sim, 1) || !sim.engineering.off(sim, 2)) reasons.push('Нет OFF/новых 000');
    if (Object.values(sim.pumps.branches).some(b => b.faults.length || b.exclusions.length || b.inhibited || b.valveBlocked) || sim.pumps.groupFault) reasons.push('Сохраняется индивидуальное исключение/запрет насосных ветвей');
    const positions = [1, 2].map(pump => sim.signals.position('valve' + pump));
    if (positions.some(position => !['OPEN', 'CLOSED', 'INTERMEDIATE'].includes(position)) || positions.every(position => position === 'INTERMEDIATE')) reasons.push('Исходное положение затворов вне согласованного профиля: допустимы крайние положения и один достоверный 0/0');
    this.reasons = reasons;
    if (reasons.length) return;
    this.circulationPending = false; // Только одна процедура; отказ/защита не запускают повтор автоматически.
    sim.recovery.begin(sim, sim.selectedPump, 'REBOOT');
    sim.log('BOOT_CIRCULATION', 'Только восстановление циркуляции D-080/D-150; обычная работа и автоматический Пуск запрещены');
  }
}
