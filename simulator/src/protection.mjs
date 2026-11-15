/** Единственный отправитель итоговых команд (D-323). Отделён от основной последовательности. */
export class Protection {
  timers = new Map(); // Начала непрерывных условий; null/неизвестность не равна подтверждённой неисправности.
  motions = {}; // Учёт отдельного движения, без перезапуска таймера повтором той же команды.
  faults = []; // Зафиксированные причины; новые входы сами не снимают блокировки.
  stopStage = null; // Независимая от основной программы последовательность обязательного останова.
  bypassOpen = false; // Подтверждение оператора только текущего останова.
  manualStClosed = false; // Отдельная ручная проверка закрытия неисправного ШТ, D-076.
  stBlocked = false; // Блокировка питания ШТ; обратная связь сама её не снимает.
  pumpCloseAt = {}; // Раздельное заключительное закрытие всех включённых ветвей, D-169.
  lastCycleAt = null; // Время полностью завершённого цикла защитной части.
  startupLinkStop = false; // Останов начался из-за потери ARANGA при запуске; D-330 к нему неприменим.
  startupHmiStop = false; // D-273/D-287: обнаруженная потеря HMI сохраняет приоритет охлаждения до закрытия ШТ.
  stopFrequencyRevision = 0; // Новая запись после прерывания запуска отдельно от прежнего регистра.
  frequencySource = 'STOP_COOLING'; // Источник частоты процедуры останова для HMI/экспорта.

  elapsed(sim, name, active) { // sim — часы; name — таймер; active — достоверно выполненное условие.
    if (!active) { this.timers.delete(name); return 0; }
    if (!this.timers.has(name)) this.timers.set(name, sim.clock.now);
    return sim.clock.now - this.timers.get(name);
  }
  fault(sim, code, text, evidence = 'CONFIRMED') { // code/text — причина; evidence — качество основания, а не уверенность в поломке детали.
    if (this.faults.some(item => item.code === code)) return;
    this.faults.push({ code, text, evidence, at: sim.clock.now });
    sim.log('FAULT', text, { code, evidence });
  }
  beginStop(sim, reason, kind = 'NORMAL') { // reason/kind — принятая причина; повтор не сбрасывает процедуру и её частотный приоритет.
    if (sim.state === null || sim.state === 'STOPPED' || sim.state === 'STOPPING') return false;
    sim.procedureId += 1;
    sim.transition('STOPPING', reason);
    this.stopStage = 'WAIT_BYPASS';
    this.bypassOpen = false;
    this.manualStClosed = false;
    this.pumpCloseAt = {};
    this.startupLinkStop = kind === 'STARTUP_ARANGA';
    this.startupHmiStop = kind === 'STARTUP_HMI';
    this.stopFrequencyRevision = sim.aranga.frequencyRevision;
    sim.stopReason = reason;
    sim.log('PROMPT', 'Откройте ШБ и подтвердите. Принятый останов не отменяется (D-263/D-264)');
    return true;
  }
  checkCommunication(sim) {
    if (sim.state === 'STARTING') {
      // HMI проверяется до перехода В работе; при двух причинах сразу действует D-287.
      if (!sim.hmiAvailable()) this.beginStop(sim, 'Потеря HMI при запуске (D-273)', 'STARTUP_HMI');
      else if (sim.mode === 'ARANGA' && !sim.aranga.available(sim)) this.beginStop(sim, 'Потеря обмена ARANGA при запуске (D-259/D-294)', 'STARTUP_ARANGA');
    }
    if (sim.state === 'STOPPING' && (this.startupLinkStop || this.startupHmiStop) && !sim.hmiAvailable()) {
      if (!this.startupHmiStop) sim.log('PRIORITY', 'Добавилась потеря HMI: частота охлаждения до закрытия ШТ независимо от восстановления (D-287)');
      this.startupHmiStop = true;
    }
  }
  stopRequests(sim, request) { // request — копия последних запросов, изменяемая только защитной последовательностью.
    if (sim.outputs.value('vfd.run') === 'START') {
      let frequency = sim.config.coolingFrequency; // Обычный командный останов и D-273/D-287: местная частота охлаждения.
      this.frequencySource = 'STOP_COOLING';
      if (this.startupLinkStop && !this.startupHmiStop) {
        // Только D-260: новая достоверная запись до закрытия ШТ может вернуть частоту, но не отменить останов.
        const freshWrite = sim.aranga.available(sim) && sim.aranga.frequencyRevision > this.stopFrequencyRevision; // Факт чтения не создаёт отсутствовавшее после запуска задание.
        frequency = freshWrite ? sim.aranga.frequencyValue : sim.config.startupLinkLossFrequency;
        this.frequencySource = freshWrite ? 'STOP_ARANGA' : 'STARTUP_LINK_FALLBACK';
      }
      request['vfd.frequency'] = sim.frequency.apply(frequency);
    }
    if (this.stopStage === 'WAIT_BYPASS' && this.bypassOpen) this.stopStage = 'CLOSE_ST';
    if (this.stopStage === 'CLOSE_ST') {
      request['st.direction'] = this.stBlocked ? 'STOP' : 'CLOSE';
      if (sim.signals.position('st') === 'CLOSED' || (this.stBlocked && this.manualStClosed)) {
        this.stopStage = 'CLOSE_PUMP';
        request['st.direction'] = 'STOP';
        request['vfd.run'] = 'STOP';
        request['vfd.enable'] = false;
        sim.log('STAGE', 'ШТ закрыт: останов ПЧ без запроса охлаждения и закрытие рабочего затвора');
      }
    }
    if (this.stopStage === 'CLOSE_PUMP') {
      for (const pump of [1, 2]) { // Останов относится к каждой реально включённой ветви, включая перекрытие при смене.
        const branch = sim.pumps.branches[pump]; // Предыдущие 45+60 с повторно не запускаются, D-170.
        if (sim.outputs.value('pump' + pump + '.run') !== true) { request['pump' + pump + '.run'] = false; continue; }
        if (branch.valveBlocked && !branch.manualClosed && !branch.closeExhausted) {
          request['valve' + pump + '.direction'] = 'STOP';
          if (sim.valves.waits[pump]?.target === 'OPEN') delete sim.valves.waits[pump]; // Текущее задание закрыть для останова заменяет прежнее открытие, не отменяя его ошибку.
          sim.valves.requestManual(sim, pump, 'CLOSED', 'STOP_CLOSE', null); // Нет выданного CLOSE — нет нового автоматического таймаута 45 с.
          continue;
        }
        this.pumpCloseAt[pump] ??= sim.clock.now;
        request['valve' + pump + '.direction'] = branch.valveBlocked ? 'STOP' : 'CLOSE';
        const timedOut = sim.clock.now - this.pumpCloseAt[pump] >= 45000; // Собственный предел полного останова D-169.
        if (sim.signals.position('valve' + pump) === 'CLOSED' || branch.manualClosed || branch.closeExhausted || timedOut) {
          if (timedOut && sim.signals.position('valve' + pump) !== 'CLOSED' && !branch.manualClosed) {
            sim.pumps.fail(sim, pump, 'FINAL_VALVE_CLOSE_TIMEOUT_' + pump, 'Заключительное закрытие затвора ' + pump + ' не подтверждено за 45 с (D-169)',
              sim.signals.position('valve' + pump) === 'UNKNOWN' ? 'NO_FEEDBACK' : 'TARGET_NOT_CONFIRMED');
          }
          request['pump' + pump + '.run'] = false;
        }
      }
      if ([1, 2].every(pump => request['pump' + pump + '.run'] === false)) {
        request['valve1.direction'] = 'OPEN';
        request['valve2.direction'] = 'OPEN';
        for (const pump of [1, 2]) if (sim.pumps.branches[pump].valveBlocked) {
          delete sim.valves.waits[pump]; // Завершён этап закрытия; D-175/D-177 требуют новое, противоположное ручное положение.
          sim.valves.requestManual(sim, pump, 'OPEN', 'STOP_OPEN', null);
        }
        this.stopStage = 'FINAL_OUTPUTS';
        if (sim.pumps.active) { sim.pumps.history = { ...sim.pumps.active, stage: 'STOPPED' }; sim.pumps.active = null; }
      }
    }
  }

  motion(sim, mechanism, desired) { // mechanism — ШТ/затвор; desired — направление запроса.
    if (desired === 'STOP') { delete this.motions[mechanism]; if (mechanism.startsWith('valve')) this.elapsed(sim, 'motionConflict' + mechanism.slice(-1), false); return 'STOP'; }
    if (mechanism === 'st' && this.stBlocked) return 'STOP';
    let movement = this.motions[mechanism]; // Один цикл движения, в том числе уже достигший цели.
    if (!movement || movement.desired !== desired) {
      movement = { desired, at: sim.clock.now, origin: sim.signals.position(mechanism), done: false };
      this.motions[mechanism] = movement;
    }
    const position = sim.signals.position(mechanism); // Только входы; команды не подтверждают положение.
    if (position === (desired === 'CLOSE' ? 'CLOSED' : 'OPEN')) movement.done = true;
    if (movement.done) return 'STOP'; // Потеря концевика не инициирует автоматический повтор движения.
    const duration = sim.clock.now - movement.at; // Прошедшее время именно этой команды.
    const pump = mechanism.startsWith('valve') ? Number(mechanism.slice(-1)) : null; // Только два насосных затвора.
    const specialClose = pump && desired === 'CLOSE' && sim.pumps.active?.from === pump && sim.pumps.active.cause === 'VALVE_FAILURE'; // D-168: разрешённая попытка закрытия, не обычный ход D-176.
    const contradictory = pump && this.elapsed(sim, 'motionConflict' + pump, position === 'CONTRADICTORY') >= 5000 && !specialClose;
    const timeout = mechanism === 'st' ? 67500 : 45000; // D-072 и D-040, отдельные пределы.
    const stuckOrigin = mechanism === 'st' && ['OPEN', 'CLOSED'].includes(movement.origin) && // ШТ достоверно остаётся на исходном концевике после разрешённого времени выхода.
      position === movement.origin && position !== desired && duration >= 5000; // D-074, исходная настройка N=5 с.
    if (duration >= timeout || stuckOrigin || contradictory) {
      if (pump) {
        movement.done = true;
        sim.valves.motionFault(sim, pump, desired, contradictory && duration < timeout);
        return 'STOP';
      }
      this.fault(sim, mechanism + '_MOTION_TIMEOUT', mechanism + ': положение не подтверждено в срок',
        position === 'UNKNOWN' ? 'NO_FEEDBACK' : 'TARGET_NOT_CONFIRMED');
      movement.done = true;
      if (mechanism === 'st') {
        this.stBlocked = true;
        this.beginStop(sim, 'Неисправность ШТ: байпас и обязательный останов (D-075)');
      }
      return 'STOP';
    }
    return desired;
  }
  step(sim) { // sim — модель, от которой берутся только условные входы/запросы.
    if (sim.state === null) {
      // D-162: только известные команды инициализации ШТ; другим механизмам общий OFF не изобретается.
      this.emit(sim, 'st.direction', 'STOP');
      this.emit(sim, 'st.power', false);
      this.lastCycleAt = sim.clock.now;
      return;
    }
    const request = { ...sim.request }; // Итоговые запросы после локальных приоритетов.
    const p1 = sim.signals.read('pressure.before'); // Достоверное абсолютное давление до НГ или null.
    const p2 = sim.signals.read('pressure.after'); // Достоверное абсолютное давление после НГ или null.
    const low = (p1 !== null && p1 < 0.8) || (p2 !== null && p2 < 0.8); // D-065: немедленное отключение насосов.
    const noPressure = p1 === null && p2 === null; // D-066/D-148: отсутствие контроля, а не нулевое давление.
    if (low || noPressure) {
      this.fault(sim, low ? 'LOW_PRESSURE' : 'NO_PRESSURE_DATA', low ? 'Низкое давление: насосы OFF' : 'Нет контроля давления: насосы OFF', low ? 'CONFIRMED' : 'NO_FEEDBACK');
      this.beginStop(sim, 'Защита давления: обязательный останов');
    }
    if (sim.signals.read('emergency') === true) this.beginStop(sim, 'Кнопка Авария');
    sim.pumps.diagnose(sim, request, low || noPressure); // D-142: 1 с снятия ON + отдельные 2 с классификации.
    sim.valves.monitor(sim, request, low || noPressure);
    this.checkCommunication(sim);
    // Наличие ARANGA в ручном режиме сюда намеренно не входит (D-328).
    if (sim.state === 'RUNNING' && (sim.supervision.mainStale || sim.supervision.lastCycleAt === null || sim.clock.now - sim.supervision.lastCycleAt >= 2000)) {
      this.fault(sim, 'CONTROL_STALLED', 'Нет завершённых циклов основной программы или надзора за 2 с (D-312/D-325)');
      this.beginStop(sim, 'Отказ основной программы: независимый обязательный останов');
    }
    if (this.elapsed(sim, 'stContradiction', sim.signals.position('st') === 'CONTRADICTORY') >= 5000) {
      this.fault(sim, 'ST_LIMIT_CONTRADICTION', 'Противоречие концевиков ШТ 5 с (D-073)');
      this.stBlocked = true;
      this.beginStop(sim, 'Неисправность ШТ');
    }
    if (sim.state === 'RUNNING') {
      if (sim.signals.position('st') === 'CLOSED' || this.elapsed(sim, 'stLostOpen', sim.signals.position('st') === 'INTERMEDIATE') >= 5000) {
        this.stBlocked = true;
        this.fault(sim, 'ST_LOST_OPEN', 'Потеря подтверждения открытого ШТ (D-163)');
        this.beginStop(sim, 'Неисправность ШТ');
      }
      if (sim.signals.position('st') === 'UNKNOWN') sim.gap('Реакция на недоступность канала концевиков WB требует привязки адаптера');
      const circulation = sim.circulation(); // В v0.1 выполняется рабочая проверка без автоматического резервирования.
      if (circulation === 'UNKNOWN' && sim.signals.read('flow') === null && (p1 === null || p2 === null)) {
        this.fault(sim, 'NO_CIRCULATION_CONTROL', 'Потерян контроль Q и ΔP (D-165)', 'NO_FEEDBACK');
        this.beginStop(sim, 'Потеря контроля циркуляции');
      }

    }
    sim.hydraulics.monitor(sim); // D-138/D-166: собственные непрерывные выдержки, маска на смене и сброс при изменении критерия.
    const runningCommand = sim.outputs.commands['vfd.run']; // Доставка START и физический статус проверяются раздельно.
    if (sim.state === 'STARTING' && runningCommand?.value === 'START' && runningCommand.delivery === 'ACCEPTED' &&
        sim.outputs.value('vfd.enable') === true && sim.signals.read('vfd.exchange') === true &&
        sim.clock.now - runningCommand.deliveredAt >= 10000 && sim.signals.read('vfd.running') !== true) {
      sim.gap('Пуск ПЧ не подтверждён за 10 с: процедура сбросов и блокировок ещё не реализована');
    }
    if ((low || noPressure) && sim.pumps.active) { // Прерванная защитой давления смена не даёт нового ON при возвращении давления.
      sim.pumps.history = { ...sim.pumps.active, stage: 'PRESSURE_INTERRUPTED' };
      sim.pumps.active = null;
    }
    sim.pumps.step(sim, request); // Продолжаем уже принятую смену до заключительного насосного останова.
    sim.recovery.step(sim, request, low || noPressure);
    sim.engineering.step(sim, request, low || noPressure); // Только запросы проверки, самостоятельные защиты остаются старше.
    if (sim.state === 'STOPPING') this.stopRequests(sim, request);
    if (low || noPressure) {
      // D-149: низкое давление запрещает насосы, но не открытие затворов.
      request['pump1.run'] = false;
      request['pump2.run'] = false;
      request['valve1.direction'] = 'OPEN';
      request['valve2.direction'] = 'OPEN';
    }
    sim.pumps.enforce(sim, request); // Электрическое исключение и ручная работа выше обычного движения.
    if (this.stBlocked) { request['st.power'] = false; request['st.direction'] = 'STOP'; }
    sim.outputs.requests = { ...request };
    if (sim.coverageGap) return; // Пауза вычисления неопределённой ветви, не новая команда реальной установке.
    const final = {}; // Полный расчёт до выдачи: новая ошибка затвора может в том же цикле означать отказ обеих ветвей.
    for (const [name, value] of Object.entries(request)) { // name/value — желаемая функция после обычных приоритетов.
      final[name] = name.endsWith('.direction') ? this.motion(sim, name.split('.')[0], value) : value;
    }
    // Ошибка хода, выявленная в этом цикле, немедленно снимает проверочные команды D-187/D-205.
    if (sim.engineering.active?.stage === 'WAIT_OFF') {
      for (const pump of [1, 2]) { final['pump' + pump + '.run'] = false; final['valve' + pump + '.direction'] = (low || noPressure) ? this.motion(sim, 'valve' + pump, 'OPEN') : 'STOP'; }
      sim.pumps.enforce(sim, final);
    }
    if (sim.pumps.groupFault) {
      sim.pumps.enforce(sim, final);
      for (const pump of [1, 2]) { // pump — разрешённое аварийное открытие с прежним контролем хода.
        const name = 'valve' + pump + '.direction'; // Условный выход, не реальный DO.
        final[name] = this.motion(sim, 'valve' + pump, final[name]);
      }
    }
    if (sim.coverageGap) return; // Диагноз не разрешает выдачу выдуманной реакции за границей реализованного сценария.
    for (const [name, value] of Object.entries(final)) this.emit(sim, name, value); // name/value — итог после всех вычисленных в цикле ограничений.
    if (this.stBlocked) { this.emit(sim, 'st.direction', 'STOP'); this.emit(sim, 'st.power', false); }
    sim.request = request;
    if (sim.state === 'STOPPING' && this.stopStage === 'FINAL_OUTPUTS') {
      // D-028/D-169: выдача положений останова завершает процедуру; достижения этих положений не ждём.
      this.stopStage = 'COMPLETE';
      sim.transition('STOPPED', 'Останов завершён: насосы OFF, положения останова выданы. Физические подтверждения отображаются отдельно');
    }
    this.lastCycleAt = sim.clock.now;
  }
  emit(sim, name, value) {
    if (name.startsWith('valve') && ['OPEN', 'CLOSE'].includes(value) && sim.outputs.value(name) !== value) {
      const branch = sim.pumps.branches[Number(name[5])]; // Только действительно выданное новое движение снимает ручное положение D-177.
      branch.manualClosed = false; branch.manualOpen = false;
    }
    sim.outputs.issue(name, value, 'protection');
  } // Единственное место итоговой выдачи.
}
