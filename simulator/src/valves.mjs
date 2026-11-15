/** Диагностика насосных затворов D-168/D-173/D-174/D-176.
 * Модуль формирует запросы; итоговые выходы по-прежнему принадлежат Protection.
 */
export class PumpValves {
  previous = {}; // Последние достоверные крайние положения, только для обнаружения их утраты.
  recoveries = {}; // Одна попытка закрытия резервного затвора D-174.
  waits = {}; // Отдельные ручные ожидания, не физические положения и не подтверждения питания.
  fail(sim, pump, code, text) {
    sim.pumps.fail(sim, pump, code + '_' + pump, text);
    sim.engineering.invalidate(pump, 'valve');
  }
  passage(sim, pump) { // Ручной обход открытия не переписывает DI и не применяется в инженерном тесте.
    const branch = sim.pumps.branches[pump];
    return sim.signals.position('valve' + pump) === 'OPEN' || branch.manualOpen === 'RUN';
  }
  requestManual(sim, pump, target, source) {
    if (this.waits[pump]) return; // Повтор сообщения/окна не начинает новые 60 с.
    const branch = sim.pumps.branches[pump];
    branch.valveBlocked = true;
    if (target === 'OPEN') branch.manualClosed = false;
    this.waits[pump] = { target, source, remaining: 60000, updatedAt: sim.clock.now, expired: false, suspended: false };
    sim.log('PROMPT', 'Затвор ' + pump + ': отключите автомат привода, проверьте/установите ' + target + ', подтвердите на месте. Ожидание 60 с (D-175)');
  }
  confirm(sim, pump, target) {
    const wait = this.waits[pump];
    if (!wait || wait.target !== target || wait.suspended) return ['Нет актуального запроса этого ручного положения'];
    const branch = sim.pumps.branches[pump];
    if (target === 'OPEN' && wait.source === 'START_OPEN') {
      if (sim.signals.position('valve' + pump) !== 'INTERMEDIATE' || sim.pumps.branches[3 - pump].faults.length || sim.pumps.branches[3 - pump].exclusions.length || sim.pumps.branches[3 - pump].inhibited) return ['Обход открытия разрешён только при 0/0 и исправной другой ветви (D-139)'];
      branch.manualOpen = 'RUN';
      sim.main.openedAt = sim.clock.now;
      sim.main.stage = 'CIRCULATION';
    } else if (target === 'CLOSED') branch.manualClosed = true;
    else branch.manualOpen = 'PASSAGE';
    branch.manualEvidencePosition = sim.signals.position('valve' + pump);
    delete this.waits[pump];
    sim.log('MANUAL_POSITION', 'Затвор ' + pump + ': ' + target + ' подтверждено оператором; DI и ошибки сохранены');
    return [];
  }
  workingFailure(sim, pump, immediateOff = false) {
    if (immediateOff) sim.pumps.branches[pump].valvePumpOff = true;
    if (sim.engineering.enabled || !['STARTING', 'RUNNING'].includes(sim.state)) return;
    sim.pumps.checkGroup(sim);
    if (sim.pumps.groupFault) return;
    if (sim.pumps.active) {
      // Старый затвор уже закрывается; новый отказ не запускает вторую параллельную смену.
      if (sim.pumps.active.to === pump) sim.gap('Диагноз новой ветви во время смены установлен; обратное резервирование на прежнюю исправную ветвь ещё не перенесено');
      return;
    }
    const reasons = sim.pumps.begin(sim, 3 - pump, 'VALVE_FAILURE');
    if (reasons.length) sim.protection.beginStop(sim, 'Неисправность рабочего затвора, резерв недоступен: ' + reasons.join('; '));
  }
  monitor(sim, request, pressureTrip) {
    for (const pump of [1, 2]) {
      const branch = sim.pumps.branches[pump];
      const position = sim.signals.position('valve' + pump);
      const direction = sim.outputs.value('valve' + pump + '.direction');
      const moving = direction === 'OPEN' || direction === 'CLOSE';
      const on = sim.outputs.value('pump' + pump + '.run') === true;
      // D-258: ожидаемая недоступность обесточенного привода не опровергает ручную отметку.
      // Новые достоверные сведения против ручного положения — оставшаяся открытая граница D-177.
      if (branch.valveBlocked && (branch.manualClosed || branch.manualOpen) &&
          branch.manualEvidencePosition !== position && ((branch.manualClosed && position === 'OPEN') || (branch.manualOpen && position === 'CLOSED'))) {
        sim.gap('D-177: достоверный концевик против ручного подтверждения; реакция не согласована');
        continue;
      }
      if (branch.manualClosed || branch.manualOpen) branch.manualEvidencePosition = position;
      if (branch.manualOpen === 'RUN' && (!on || position === 'OPEN')) branch.manualOpen = false;
      if (!branch.valveBlocked && !sim.engineering.active) {
        const contradiction = sim.protection.elapsed(sim, 'valveConflict' + pump, position === 'CONTRADICTORY');
        if (contradiction >= 5000) {
          this.fail(sim, pump, 'VALVE_CONTRADICTION', 'Противоречие концевиков затвора ' + pump + ' 5 с (D-168)');
          if (on && !pressureTrip) this.workingFailure(sim, pump);
        }
        const steady = sim.state === 'RUNNING' && !sim.pumps.active && !moving && !pressureTrip;
        const established = (steady || (sim.pumps.active?.to === pump && sim.pumps.active.openedAt !== null && !moving && !pressureTrip));
        const lostOpen = established && on && this.previous[pump] === 'OPEN' && position === 'INTERMEDIATE';
        const lostClosed = steady && !on && !branch.faults.length && !branch.exclusions.length && this.previous[pump] === 'CLOSED' && position === 'INTERMEDIATE';
        if (sim.protection.elapsed(sim, 'valveLostOpen' + pump, lostOpen) >= 5000) {
          this.fail(sim, pump, 'VALVE_LOST_OPEN', 'Утрачено открытие рабочего затвора ' + pump + ' 5 с (D-173)');
          this.workingFailure(sim, pump);
        }
        if (established && on && this.previous[pump] === 'OPEN' && position === 'CLOSED') {
          this.fail(sim, pump, 'VALVE_UNEXPECTED_CLOSED', 'Рабочий затвор ' + pump + ' неожиданно закрылся (D-173)');
          this.workingFailure(sim, pump, true);
        }
        if (sim.protection.elapsed(sim, 'valveLostClosed' + pump, lostClosed) >= 5000) {
          this.fail(sim, pump, 'VALVE_LOST_CLOSED', 'Утрачено закрытие резервного затвора ' + pump + ' 5 с (D-174)');
          this.recoveries[pump] = { at: null, done: false };
          delete sim.protection.motions['valve' + pump]; // D-174 разрешает одну новую попытку, даже если прежний штатный CLOSE уже завершён.
        }
        if (position === 'UNKNOWN' && steady && !branch.faults.length) sim.gap('Недоступны входы насосного затвора WB: аппаратный критерий качества ещё не привязан; это не 0/0');
      } else {
        for (const prefix of ['valveConflict', 'valveLostOpen', 'valveLostClosed']) sim.protection.elapsed(sim, prefix + pump, false);
      }
      if (['OPEN', 'CLOSED'].includes(position)) this.previous[pump] = position;
      const recovery = this.recoveries[pump];
      if (recovery && !recovery.done) {
        if (pressureTrip || sim.pumps.groupFault || branch.electricalIsolation || branch.valveBlocked || sim.state !== 'RUNNING') {
          recovery.done = true; // Приоритетная процедура прерывает попытку, автоматического повтора нет.
        } else {
          request['valve' + pump + '.direction'] = 'CLOSE';
          const command = sim.outputs.commands['valve' + pump + '.direction'];
          if (command?.value === 'CLOSE') recovery.at ??= command.issuedAt;
          if (position === 'CLOSED') { recovery.done = true; request['valve' + pump + '.direction'] = 'STOP'; }
          else if (recovery.at !== null && sim.clock.now - recovery.at >= 45000) {
            recovery.done = true;
            request['valve' + pump + '.direction'] = 'STOP';
            this.requestManual(sim, pump, 'CLOSED', 'RESERVE_CLOSE');
          }
        }
      }
      const wait = this.waits[pump];
      if (wait && !wait.suspended) {
        wait.remaining = Math.max(0, wait.remaining - (sim.clock.now - wait.updatedAt));
        wait.updatedAt = sim.clock.now;
        if (wait.target === 'CLOSED' && position === 'CLOSED') delete this.waits[pump];
        else if (wait.remaining === 0) {
          wait.expired = true;
          sim.protection.fault(sim, 'VALVE_MANUAL_WAIT_TIMEOUT_' + pump, 'Истекло ручное ожидание ' + wait.target + ' затвора ' + pump + ' (D-178)');
          sim.protection.beginStop(sim, 'Нет подтверждения ручного положения за 60 с');
        }
      }
    }
    sim.pumps.checkGroup(sim);
  }
  motionFault(sim, pump, desired, contradiction) {
    const code = contradiction ? 'VALVE_CONTRADICTION' : 'VALVE_' + desired + '_TIMEOUT';
    this.fail(sim, pump, code, 'Затвор ' + pump + ': ' + (contradiction ? 'противоречие 1/1 5 с' : desired + ' не подтверждено за 45 с'));
    sim.pumps.checkGroup(sim);
    if (sim.engineering.active) { sim.engineering.motionFailed(sim, pump); return; }
    if (sim.pumps.active?.from === pump || this.recoveries[pump]) return; // Их отдельные 45+60 с обслуживаются владельцем процедуры.
    if (sim.state === 'STARTING' && desired === 'OPEN' && sim.signals.position('valve' + pump) === 'INTERMEDIATE' &&
        !sim.pumps.branches[3 - pump].faults.length && !sim.pumps.branches[3 - pump].exclusions.length) {
      this.requestManual(sim, pump, 'OPEN', 'START_OPEN');
      return;
    }
    if (['STARTING', 'RUNNING'].includes(sim.state) && !sim.pumps.groupFault) sim.gap('Диагноз затвора установлен; реакция этого сочетания пуск/смена ещё не перенесена. Автоматическая смена по одному таймауту открытия не назначается (D-009)');
  }
}
