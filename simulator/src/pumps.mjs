/** Насосная группа: запросы смены и диагностика. Выходы выдаёт только Protection (D-323).
 * Реализованный профиль: нормальная сеть, холодный останов, ручная смена и резерв D-142.
 * Новая физическая схема, сброс после ремонта и реальные NV-записи здесь не назначаются.
 */
export class PumpGroup {
  active = null; // Текущая смена; два одновременно включённых насоса допустимы по D-010.
  history = null; // Итог последней смены для HMI, не разрешение на повторный пуск.
  branches = { 1: this.branch(), 2: this.branch() }; // Раздельные ошибки и разрешения двух ветвей.
  groupFault = false; // D-117/D-118: именно две индивидуально неисправные ветви, не потеря общего датчика.
  emergencyCirculationRequested = false; // Условный исходящий статус котельной, не команда её насосу.
  branch() {
    return {
      faults: [], // Индивидуальные причины исключения; не общие ошибки датчиков/связи.
      inhibited: false, // Запрет ON после электрического отключения, ещё до окончания классификации.
      classificationAt: null, // Начало дополнительных 2 с после снятия ON, D-142.
      electricalIsolation: false, // Есть опасное напряжение при OFF: нужна отдельная изоляция насоса.
      voltageFaultRevision: null, // Номер входных данных при событии; последующие 000 должны быть новыми.
      valveBlocked: false, // Ручное вмешательство в привод: дистанционное движение запрещено, D-175.
      manualClosed: false, // Подтверждение оператора конкретного затвора; не подмена концевиков.
      closeExhausted: false, // Уже истекли 45+60 с; после закрытия ШТ новые 45 с не даются, D-170.
      isolationConfirmed: false, // Оператор подтвердил отключение автомата насоса; свежие 000 нужны отдельно.
    };
  }
  fail(sim, pump, code, text, evidence = 'CONFIRMED') { // pump/code/text/evidence — ветвь, причина и основание диагностики.
    const branch = this.branches[pump]; // Ошибка этой ветви не выводится из общих Q/ΔP.
    if (!branch.faults.includes(code)) branch.faults.push(code);
    sim.protection.fault(sim, code, text, evidence);
  }
  reasons(sim, target) { // target — запрошенная резервная ветвь; неизвестность не разрешает включение.
    const reasons = []; // Причины отказа нового запроса, без очереди команд.
    if (![1, 2].includes(target)) return ['Номер насоса должен быть 1 или 2'];
    if (this.active) reasons.push('Смена уже выполняется');
    if (target === sim.selectedPump) reasons.push('Этот насос уже выбран');
    if (this.branches[target].faults.length || this.branches[target].inhibited) reasons.push('Резерв исключён или заблокирован');
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
      manualRequestedAt: null, oldOff: false, circulationConfirmed: false }; // Отдельные таймеры от итоговых команд/обратной связи.
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
        if (!pressureTrip) sim.gap('Недостоверны фазные входы: общая диагностика качества WB D-144 ещё не реализована; это не 000 и не индивидуальная ошибка');
        continue;
      }
      if (sim.protection.elapsed(sim, 'pumpUnexpected' + pump, commanded === false && phases.some(Boolean)) >= 1000) {
        if (!branch.electricalIsolation) {
          this.fail(sim, pump, 'VOLTAGE_WHEN_OFF_' + pump, 'Напряжение при OFF насоса ' + pump + ' (D-142)');
          branch.electricalIsolation = true;
          branch.isolationConfirmed = false;
          branch.voltageFaultRevision = sim.signals.revision;
          branch.inhibited = true;
          sim.log('PROMPT', 'Насос ' + pump + ': отключите отдельный автомат; подтвердите отключение после проверки. Движение его затвора запрещено');
        }
        sim.protection.beginStop(sim, 'Напряжение при выключенном насосе (D-142)');
      }
      if (!pressureTrip && branch.classificationAt === null && !branch.inhibited &&
          sim.protection.elapsed(sim, 'pumpMissing' + pump, commanded === true && phases.some(value => !value)) >= 1000) {
        branch.classificationAt = sim.clock.now;
        branch.inhibited = true;
        request['pump' + pump + '.run'] = false;
        sim.log('PUMP_CLASSIFICATION', 'Насос ' + pump + ': ON снят после 1 с; классификация индивидуального отказа ещё 2 с (D-142)');
      }
      if (branch.classificationAt !== null && sim.clock.now - branch.classificationAt >= 2000) {
        branch.classificationAt = null;
        this.fail(sim, pump, 'PUMP_PHASES_ON_' + pump, 'Отсутствие фаз при ON насоса ' + pump + ' подтверждено после 1+2 с (D-142)');
        if (!pressureTrip && !this.active && ['STARTING', 'RUNNING'].includes(sim.state)) {
          const reasons = this.begin(sim, 3 - pump, 'ELECTRICAL_FAILURE'); // Резерв не ждёт закрытия отказавшей ветви.
          if (reasons.length) sim.protection.beginStop(sim, 'Недоступен резерв после отказа насоса: ' + reasons.join('; '));
        }
      }
    }
    this.checkGroup(sim);
    if (sim.state === 'RUNNING' && !this.active && !this.groupFault && !pressureTrip) {
      for (const pump of [1, 2]) { // Неперенесённая диагностика затворов не должна молча разрешать продолжение модели.
        const branch = this.branches[pump]; // Для ручного положения действуют отдельные правила, а не подстановка DI.
        const expected = pump === sim.selectedPump ? 'OPEN' : 'CLOSED'; // Согласованная установившаяся схема одного рабочего насоса.
        if (!branch.valveBlocked && !branch.faults.length && sim.signals.position('valve' + pump) !== expected) {
          sim.gap('Потеря/противоречие положения насосного затвора вне смены: полные D-168/D-173/D-174 ещё не реализованы');
        }
      }
    }
  }
  checkGroup(sim) {
    if ([1, 2].every(pump => this.branches[pump].faults.length)) {
      this.groupFault = true;
      this.emergencyCirculationRequested = true;
      sim.protection.fault(sim, 'PUMP_GROUP_FAILED', 'Неисправны обе насосные ветви (D-117/D-118)');
      sim.protection.beginStop(sim, 'Критическая авария насосной группы: байпас и обязательный останов');
      if (this.active) { this.history = { ...this.active, stage: 'FAILED_GROUP' }; this.active = null; }
    }
  }
  confirmClosed(sim, pump) { // pump — конкретный затвор из текущего запроса; DI не перезаписываются.
    const operation = this.active; // Повторное окно HMI не создаёт нового запроса/таймера.
    if (!operation || operation.from !== pump || operation.manualRequestedAt === null) return ['Нет запроса ручного закрытия этого затвора'];
    this.branches[pump].manualClosed = true;
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
    if (!operation || this.groupFault || sim.state === 'STOPPED') return;
    if (sim.state === 'STOPPING' && ['CLOSE_PUMP', 'FINAL_OUTPUTS', 'COMPLETE'].includes(sim.protection.stopStage)) return;
    if ([operation.from, operation.to].some(pump => sim.signals.position('valve' + pump) === 'CONTRADICTORY')) {
      sim.gap('Противоречие 1/1 при смене: полные последовательности D-168/D-176 ещё не реализованы');
      return;
    }
    const old = this.branches[operation.from]; // Старая ветвь может быть включена до подтверждения закрытия.
    const next = this.branches[operation.to]; // Резерв может стать неисправным; это не повод включать его повторно.
    request['pump' + operation.to + '.run'] = !next.inhibited;
    request['pump' + operation.from + '.run'] = !old.inhibited && !operation.oldOff;
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
      if (operation.openedAt !== null && sim.signals.position('valve' + operation.to) !== 'OPEN') {
        sim.gap('Потеря уже подтверждённого открытия резерва во время смены: соответствующая диагностика затвора ещё не реализована; повтор OPEN не выдаётся');
        return;
      }
      operation.stage = 'OPEN_RESERVE';
      request['valve' + operation.to + '.direction'] = 'OPEN';
      if (sim.signals.position('valve' + operation.to) === 'OPEN') {
        operation.openedAt ??= sim.clock.now;
        operation.stage = 'CHECK_CIRCULATION';
        request['valve' + operation.to + '.direction'] = 'STOP';
      } else operation.openedAt = null;
      if (operation.openedAt !== null && sim.clock.now - operation.openedAt >= 5000) {
        operation.circulationConfirmed = sim.circulation() === 'NORMAL' && sim.signals.phases(operation.to)?.every(Boolean) === true;
        if (!operation.circulationConfirmed) sim.gap('После смены нет подтверждения Q/ΔP и фаз резерва: расширенная гидравлическая диагностика/ожидание D-031/D-138/D-166 не реализованы');
      }
    }
    this.checkGroup(sim);
    if (operation.oldOff && operation.circulationConfirmed && !this.groupFault) {
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
      if (branch.inhibited || this.groupFault) request['pump' + pump + '.run'] = false;
      if (this.groupFault) request['valve' + pump + '.direction'] = 'OPEN';
      if ((branch.electricalIsolation && (!branch.isolationConfirmed || !sim.signals.phases(pump)?.every(value => !value))) || branch.valveBlocked) request['valve' + pump + '.direction'] = 'STOP';
      else if (branch.electricalIsolation && branch.isolationConfirmed && !this.groupFault && sim.state === 'STOPPING' && sim.protection.stopStage === 'WAIT_BYPASS') request['valve' + pump + '.direction'] = 'CLOSE';
    }
  }
}
