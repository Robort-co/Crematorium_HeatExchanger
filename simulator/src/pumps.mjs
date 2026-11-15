/** Насосная группа: запросы смены и диагностика. Выходы выдаёт только Protection (D-323).
 * Профиль: нормальная сеть, холодный останов, смена и резерв; затворы/инженерные тесты — в отдельных модулях.
 * Новая физическая схема и реальные NV-записи здесь не назначаются.
 */
export class PumpGroup {
  groupReturns = { 1: { valve: false, pump: false }, 2: { valve: false, pump: false } }; // D-116: отдельные возвраты после возникновения групповой аварии.
  active = null; // Текущая смена; два одновременно включённых насоса допустимы по D-010.
  history = null; // Итог последней смены для HMI, не разрешение на повторный пуск.
  branches = { 1: this.branch(), 2: this.branch() }; // Раздельные ошибки и разрешения двух ветвей.
  groupFault = false; // D-117/D-118: именно две индивидуально неисправные ветви, не потеря общего датчика.
  emergencyCirculationRequested = false; // Условный исходящий статус котельной, не команда её насосу.
  branch() {
    return {
      exclusions: [], // Требуется инженерная проверка, без утверждения физической неисправности D-167.
      faults: [], // Индивидуальные причины исключения; не общие ошибки датчиков/связи.
      inhibited: false, // Запрет ON после электрического отключения, ещё до окончания классификации.
      classificationAt: null, // Начало дополнительных 2 с после снятия ON, D-142.
      electricalIsolation: false, // Есть опасное напряжение при OFF: нужна отдельная изоляция насоса.
      voltageFaultRevision: null, // Номер входных данных при событии; последующие 000 должны быть новыми.
      valveBlocked: false, // Ручное вмешательство в привод: дистанционное движение запрещено, D-175.
      valvePumpOff: false, // Немедленный OFF при неожиданном достоверном закрытии D-173, отдельно от электрического отказа.
      manualClosed: false, // Подтверждение оператора конкретного затвора; не подмена концевиков.
      manualOpen: false, // RUN — ограниченный обход D-139, PASSAGE — ручной свободный проход; не физический DI.
      closeExhausted: false, // Уже истекли 45+60 с; после закрытия ШТ новые 45 с не даются, D-170.
      isolationConfirmed: false, // Оператор подтвердил отключение автомата насоса; свежие 000 нужны отдельно.
    };
  }
  fail(sim, pump, code, text, evidence = 'CONFIRMED') { // pump/code/text/evidence — ветвь, причина и основание диагностики.
    const branch = this.branches[pump]; // Ошибка этой ветви не выводится из общих Q/ΔP.
    if (!branch.faults.includes(code)) {
      branch.faults.push(code);
      sim.engineering.invalidate(pump, /VALVE|valve/.test(code) ? 'valve' : 'pump');
      this.groupReturns[pump].pump = false;
      if (/VALVE|valve/.test(code)) this.groupReturns[pump].valve = false;
    }
    sim.protection.fault(sim, code, text, evidence);
  }
  reasons(sim, target) { // target — запрошенная резервная ветвь; неизвестность не разрешает включение.
    const reasons = []; // Причины отказа нового запроса, без очереди команд.
    if (![1, 2].includes(target)) return ['Номер насоса должен быть 1 или 2'];
    if (this.active) reasons.push('Смена уже выполняется');
    if (sim.recovery.active) reasons.push('Выполняется специальное восстановление');
    if (sim.engineering.enabled) reasons.push('Инженерный режим: автоматическая/ручная рабочая смена запрещена');
    if (target === sim.selectedPump) reasons.push('Этот насос уже выбран');
    if (this.branches[target].faults.length || this.branches[target].exclusions.length || this.branches[target].inhibited) reasons.push('Резерв исключён или заблокирован');
    if (sim.outputs.value('pump' + target + '.run') !== false || !sim.signals.phases(target)?.every(value => !value)) reasons.push('Не подтверждён OFF и отсутствие напряжения резерва');
    if (sim.signals.position('valve' + target) !== 'CLOSED') reasons.push('Затвор резерва достоверно не закрыт');
    if (sim.signals.read('grid.normal') !== true) reasons.push('Не подтверждена исправная сеть');
    if (['pressure.before', 'pressure.after'].some(name => { // name — оба датчика для данного ограниченного профиля.
      const pressure = sim.signals.read(name); // Абсолютное давление, бар; null не равен нулю.
      return pressure === null || pressure < 0.8 || pressure > 2.8;
    })) reasons.push('Не подтверждены допустимые давления');
    return reasons;
  }
  begin(sim, target, cause = 'MANUAL') { // target/cause — новый насос и источник смены, не команда физическому выходу.
    const reasons = this.reasons(sim, target); // Все проверки до изменения процедуры.
    if (!['STARTING', 'RUNNING'].includes(sim.state)) reasons.push('Новая смена разрешена только в запуске/работе');
    if (reasons.length) return reasons;
    sim.procedureId += 1;
    this.active = { from: sim.selectedPump, to: target, cause, stage: 'START_RESERVE',
      startedAt: sim.clock.now, onAt: null, closeAt: null, openedAt: null,
      manualRequestedAt: null, oldOff: false, circulationConfirmed: false, verificationFailed: false }; // Отдельные таймеры от итоговых команд/обратной связи.
    sim.main.preparationDone = false;
    sim.log('PUMP_SWITCH', 'Смена ' + sim.selectedPump + ' → ' + target + ': ' + cause);
    return [];
  }
  cancelClassificationForGrid(sim) { // Только отмена классификации D-142; полная авария сети остаётся отдельной нереализованной ветвью.
    for (const pump of [1, 2]) { // pump — независимый эпизод 1+2 с каждой ветви.
      if (this.branches[pump].classificationAt !== null) sim.log('PUMP_CLASSIFICATION', 'Общая сеть: индивидуальная классификация насоса ' + pump + ' отменена');
      this.branches[pump].classificationAt = null;
      sim.protection.timers.delete('pumpMissing' + pump);
    }
  }
  diagnose(sim, request, pressureTrip) { // request — желаемые выходы; pressureTrip — самостоятельный запрет насосов, выше смены.
    for (const pump of [1, 2]) { // pump — ветвь, оцениваемая по собственной итоговой команде.
      const branch = this.branches[pump]; // Сохранённая неисправность не снимается новыми входами.
      const phases = sim.signals.phases(pump); // Только достоверные фазные данные, иначе null.
      const commanded = sim.outputs.value('pump' + pump + '.run'); // Не запрос HMI и не факт вращения.
      if (phases === null) {
        sim.protection.elapsed(sim, 'pumpMissing' + pump, false);
        sim.protection.elapsed(sim, 'pumpUnexpected' + pump, false);
        if (sim.engineering.active) sim.engineering.stop(sim, 'Нет достоверных фазных входов; индивидуальная ошибка не назначена');
        else if (!pressureTrip) sim.gap('Недостоверны фазные входы: общая диагностика качества WB D-144 ещё не реализована; это не 000 и не индивидуальная ошибка');
        continue;
      }
      if (sim.protection.elapsed(sim, 'pumpUnexpected' + pump, commanded === false && phases.some(Boolean)) >= 1000) {
        if (!branch.electricalIsolation) {
          this.fail(sim, pump, 'VOLTAGE_WHEN_OFF_' + pump, 'Напряжение при OFF насоса ' + pump + ' (D-142)');
          branch.electricalIsolation = true;
          branch.isolationConfirmed = false;
          branch.voltageFaultRevision = sim.signals.revision;
          branch.inhibited = true;
          if (sim.engineering.active) {
            const ownPumpTest = sim.engineering.active.kind !== 'valve' && sim.engineering.active.pump === pump; // Отказ другого насоса не доказывает отказ проверяемого механизма D-180/D-201.
            if (ownPumpTest) sim.engineering.active.electricalTripped = true;
            sim.engineering.stop(sim, 'Напряжение при OFF насоса ' + pump + ' (D-143)', ownPumpTest ? 'FAILED' : 'NOT_CHECKED');
          }
          sim.log('PROMPT', 'Насос ' + pump + ': отключите отдельный автомат; подтвердите отключение после проверки. Движение его затвора запрещено');
        }
        sim.protection.beginStop(sim, 'Напряжение при выключенном насосе (D-142)');
      }
      if (!pressureTrip && branch.classificationAt === null && (!branch.inhibited || sim.engineering.permitPump(pump)) &&
          sim.protection.elapsed(sim, 'pumpMissing' + pump, commanded === true && phases.some(value => !value)) >= 1000) {
        branch.classificationAt = sim.clock.now;
        branch.inhibited = true;
        if (sim.engineering.active?.pump === pump) sim.engineering.active.electricalTripped = true;
        request['pump' + pump + '.run'] = false;
        sim.log('PUMP_CLASSIFICATION', 'Насос ' + pump + ': ON снят после 1 с; классификация индивидуального отказа ещё 2 с (D-142)');
      }
      if (branch.classificationAt !== null && sim.clock.now - branch.classificationAt >= 2000) {
        branch.classificationAt = null;
        this.fail(sim, pump, 'PUMP_PHASES_ON_' + pump, 'Отсутствие фаз при ON насоса ' + pump + ' подтверждено после 1+2 с (D-142)');
        if (!pressureTrip && this.active?.to === pump && ['STARTING', 'RUNNING'].includes(sim.state)) this.reverse(sim, pump, 'ELECTRICAL_FAILURE');
        if (!pressureTrip && !this.active && ['STARTING', 'RUNNING'].includes(sim.state)) {
          const reasons = this.begin(sim, 3 - pump, 'ELECTRICAL_FAILURE'); // Резерв не ждёт закрытия отказавшей ветви.
          if (reasons.length) sim.protection.beginStop(sim, 'Недоступен резерв после отказа насоса: ' + reasons.join('; '));
        }
      }
    }
    this.checkGroup(sim);
  }
  checkGroup(sim) {
    if ([1, 2].every(pump => this.branches[pump].faults.length)) {
      if (!this.groupFault) this.groupReturns = { 1: { valve: false, pump: false }, 2: { valve: false, pump: false } };
      this.groupFault = true;
      this.emergencyCirculationRequested = true;
      sim.protection.fault(sim, 'PUMP_GROUP_FAILED', 'Неисправны обе насосные ветви (D-117/D-118)');
      sim.protection.beginStop(sim, 'Критическая авария насосной группы: байпас и обязательный останов');
      if (this.active) { this.history = { ...this.active, stage: 'FAILED_GROUP' }; this.active = null; }
    }
  }
  resetGroup(sim, confirmed) {
    if (confirmed !== true || !this.groupFault) return ['Нужны отдельное подтверждение и действующая групповая авария'];
    if (sim.engineering.enabled || sim.engineering.active || !sim.stoppedConfirmed()) return ['Завершите подтверждённый останов и выйдите из инженерного режима'];
    if (Object.values(sim.engineering.returnRequired).some(Boolean) || Object.values(sim.engineering.breakerOffRequired).some(Boolean)) return ['Не завершены ручные действия'];
    if ([1, 2].some(pump => !this.groupReturns[pump].valve || !this.groupReturns[pump].pump || this.branches[pump].faults.length || this.branches[pump].exclusions.length || this.branches[pump].inhibited || this.branches[pump].valveBlocked)) return ['Обе ветви должны пройти проверки затвора/насоса и отдельные возвраты после групповой аварии (D-116)'];
    this.groupFault = false;
    this.emergencyCirculationRequested = false;
    sim.protection.faults = sim.protection.faults.filter(fault => fault.code !== 'PUMP_GROUP_FAILED');
    sim.log('GROUP_RESET', 'Снята только авария насосной группы; новый Пуск требуется отдельно (D-116)');
    return [];
  }
  reverse(sim, failed, cause) {
    const previous = this.active;
    if (!previous || previous.to !== failed) return false;
    const target = previous.from;
    const branch = this.branches[target];
    this.checkGroup(sim);
    if (this.groupFault) return false;
    // Доступный прежний насос уже OFF/000, его затвор CLOSED: обычная последовательность D-010 применима без нового исключения.
    if (branch.faults.length || branch.exclusions.length || branch.inhibited || branch.valveBlocked ||
        sim.outputs.value('pump' + target + '.run') !== false || !sim.signals.phases(target)?.every(value => !value) || sim.signals.position('valve' + target) !== 'CLOSED') {
      sim.gap('Обратное резервирование: прежняя ветвь ещё не OFF/000/CLOSED либо недоступна; это сочетание остаётся вне реализованного профиля');
      return false;
    }
    this.history = { ...previous, stage: 'REVERSED' };
    this.active = null; sim.selectedPump = failed;
    const reasons = this.begin(sim, target, cause);
    if (reasons.length) sim.protection.beginStop(sim, 'Обратный резерв недоступен: ' + reasons.join('; '));
    return reasons.length === 0;
  }
  confirmClosed(sim, pump) { // pump — конкретный затвор из текущего запроса; DI не перезаписываются.
    if (sim.valves.waits[pump]?.target === 'CLOSED') return sim.valves.confirm(sim, pump, 'CLOSED');
    const operation = this.active; // Повторное окно HMI не создаёт нового запроса/таймера.
    if (!operation || operation.from !== pump || operation.manualRequestedAt === null) return ['Нет запроса ручного закрытия этого затвора'];
    this.branches[pump].manualClosed = true;
    this.branches[pump].manualEvidencePosition = sim.signals.position('valve' + pump); // Известный неисправный концевик при подтверждении не объявляется новыми противоречащими сведениями.
    sim.log('MANUAL_POSITION', 'Затвор ' + pump + ': оператор подтвердил отключение автомата привода, ручное закрытие и проверку на месте (D-175/D-177)');
    return [];
  }
  confirmIsolation(sim, pump) { // pump — автомат именно насоса; не автомат привода затвора D-175.
    const branch = this.branches[pump]; // Физические 000 сами не являются ручным подтверждением отключения.
    if (!branch?.electricalIsolation) return ['Нет запроса отключения автомата насоса'];
    if (!sim.signals.phases(pump)?.every(value => !value) ||
        !['l1', 'l2', 'l3'].every(phase => sim.signals.get('pump' + pump + '.' + phase).lastGoodRevision > branch.voltageFaultRevision)) return ['Нужны новые достоверные 000 после неисправности'];
    branch.isolationConfirmed = true;
    sim.log('ISOLATION', 'Отключение автомата насоса ' + pump + ' подтверждено отдельно от новых 000; ошибка и останов сохраняются');
    return [];
  }
  step(sim, request) { // Формирование запросов уже принятой смены; защита остаётся единственным отправителем.
    const operation = this.active; // Смена не отменяется повторным нажатием и не запускается заново после отказа.
    if (!operation || this.groupFault || sim.coverageGap || sim.state === 'STOPPED') return;
    if (sim.state === 'STOPPING' && ['CLOSE_PUMP', 'FINAL_OUTPUTS', 'COMPLETE'].includes(sim.protection.stopStage)) return;
    const old = this.branches[operation.from]; // Старая ветвь может быть включена до подтверждения закрытия.
    const next = this.branches[operation.to]; // Резерв может стать неисправным; это не повод включать его повторно.
    request['pump' + operation.to + '.run'] = !next.inhibited;
    request['pump' + operation.from + '.run'] = !old.inhibited && !old.valvePumpOff && !operation.oldOff;
    if (!operation.oldOff) request['valve' + operation.from + '.direction'] = old.valveBlocked ? 'STOP' : 'CLOSE';
    // Физически уже закрытый затвор достаточен; транспортное подтверждение закрытием не является.
    if (sim.signals.position('valve' + operation.from) === 'CLOSED' || old.manualClosed) {
      operation.oldOff = true;
      request['pump' + operation.from + '.run'] = false;
      request['valve' + operation.from + '.direction'] = 'STOP';
    }
    const close = sim.outputs.commands['valve' + operation.from + '.direction']; // Отсчёт от реально выданного CLOSE.
    if (close?.value === 'CLOSE') operation.closeAt ??= close.issuedAt;
    if (!operation.oldOff && operation.closeAt !== null && sim.clock.now - operation.closeAt >= 45000 && operation.manualRequestedAt === null) {
      this.fail(sim, operation.from, 'VALVE_CLOSE_TIMEOUT_' + operation.from, 'Затвор ' + operation.from + ': закрытие не подтверждено за 45 с (D-170)',
        sim.signals.position('valve' + operation.from) === 'UNKNOWN' ? 'NO_FEEDBACK' : 'TARGET_NOT_CONFIRMED');
      old.valveBlocked = true;
      operation.manualRequestedAt = sim.clock.now;
      request['valve' + operation.from + '.direction'] = 'STOP';
      sim.log('PROMPT', 'Отключите автомат привода затвора ' + operation.from + ', закройте вручную, проверьте на месте и подтвердите. Ожидание 60 с (D-170/D-175)');
    }
    if (!operation.oldOff && operation.manualRequestedAt !== null && sim.clock.now - operation.manualRequestedAt >= 60000) {
      old.closeExhausted = true;
      sim.protection.fault(sim, 'VALVE_MANUAL_WAIT_TIMEOUT_' + operation.from, 'Нет подтверждения ручного закрытия затвора ' + operation.from + ' за 60 с (D-178)');
      sim.protection.beginStop(sim, 'Истекли 45+60 с закрытия при смене насосов (D-170)');
    }
    const on = sim.outputs.commands['pump' + operation.to + '.run']; // Задержка открытия от итогового ON, не доставки/клика.
    if (on?.value === true) operation.onAt ??= on.issuedAt;
    if (operation.onAt !== null && sim.clock.now - operation.onAt >= 1000 && !next.inhibited) {
      if (operation.openedAt !== null && !sim.valves.passage(sim, operation.to)) return; // Диагностика действует отдельно; повтор OPEN не выдаётся.
      operation.stage = 'OPEN_RESERVE';
      request['valve' + operation.to + '.direction'] = 'OPEN';
      if (sim.valves.passage(sim, operation.to)) {
        operation.openedAt ??= sim.clock.now;
        operation.stage = 'CHECK_CIRCULATION';
        request['valve' + operation.to + '.direction'] = 'STOP';
      } else operation.openedAt = null;
      if (operation.openedAt !== null && sim.clock.now - operation.openedAt >= 5000) {
        operation.circulationConfirmed = sim.hydraulics.verifySwitch(sim, operation) && sim.signals.phases(operation.to)?.every(Boolean) === true;
        if (this.active !== operation) return; // Новый обратный переход не завершается устаревшим объектом прежней смены.
        if (operation.verificationFailed) operation.stage = 'FAILED_CIRCULATION';
      }
    }
    this.checkGroup(sim);
    if (operation.oldOff && operation.circulationConfirmed && !this.groupFault) {
      sim.hydraulics.complete(sim, operation);
      sim.selectedPump = operation.to;
      this.history = { ...operation, stage: sim.state === 'STOPPING' ? 'COMPLETED_DURING_STOP' : 'COMPLETE' };
      this.active = null;
      if (sim.state === 'STARTING') { sim.main.stage = 'CIRCULATION'; sim.main.openedAt = operation.openedAt; }
      sim.log('PUMP_SWITCH_DONE', 'Была произведена смена насоса! Проверьте гидравлический узел насосной группы (D-011)');
    }
  }
  enforce(sim, request) { // Последний приоритет насосов/движения; не отменяет другие защиты.
    for (const pump of [1, 2]) { // pump — независимое ограничение каждой ветви.
      const branch = this.branches[pump]; // Сохранённые ошибки не сбрасываются окончанием смены/останова.
      if ((branch.inhibited && !sim.engineering.permitPump(pump)) || (branch.valvePumpOff && !sim.engineering.permitValve(pump)) || (this.groupFault && !sim.engineering.permitPump(pump))) request['pump' + pump + '.run'] = false;
      if (this.groupFault && !sim.engineering.enabled) request['valve' + pump + '.direction'] = 'OPEN'; // D-116: контролируемая проверка в остановленном ТО отдельно от аварийного открытия в работе.
      if ((branch.electricalIsolation && !sim.engineering.permitPump(pump) && (!branch.isolationConfirmed || !sim.signals.phases(pump)?.every(value => !value))) || (branch.valveBlocked && !sim.engineering.permitValve(pump))) request['valve' + pump + '.direction'] = 'STOP';
      else if (branch.electricalIsolation && branch.isolationConfirmed && !this.groupFault && sim.state === 'STOPPING' && sim.protection.stopStage === 'WAIT_BYPASS') request['valve' + pump + '.direction'] = 'CLOSE';
    }
  }
}
