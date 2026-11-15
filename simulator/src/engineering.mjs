/** Инженерные проверки D-179–D-213, D-167 и объединённая ветвь D-251/D-252.
 * Порядок всех механизмов общего цикла и физическое подтверждение выключенной печи здесь не задаются.
 * enabled/furnaceOff — явные предпосылки испытателя, не новая аппаратная схема.
 */
export class Engineering {
  enabled = false; // Инженерный сеанс отделён от четырёх основных состояний ТО.
  furnaceOff = false; // Явное подтверждение тестовой предпосылки, не следствие STOPPED.
  active = null; // Исключительное управление группой до подтверждённого выключения.
  results = { 1: {}, 2: {} }; // Последние раздельные результаты затвора/насоса и действительность для возврата.
  history = []; // Завершённые попытки: новый тест не переписывает историю старого.
  manualIsolation = null; // Разрешение изоляции нижним краном для одной конкретной попытки.
  returnRequired = { 1: false, 2: false }; // D-193: обязанность устанавливается ДО задания закрыть ручной кран.
  breakerOffRequired = { 1: false, 2: false }; // D-211/D-212: ручное отключение, без выдуманного контакта автомата.
  breakerOffConfirmed = { 1: false, 2: false }; // Человеческое подтверждение не подменяет напряжение/DI.
  interruptedAttempt = null; // Сохранённая незавершённая попытка после моделируемого reboot; восстановление состояния отдельно.

  off(sim, pump) { // Свежие 000 после итогового OFF; неизвестность не является остановом.
    const command = sim.outputs.commands['pump' + pump + '.run'];
    return command?.value === false && sim.signals.phases(pump)?.every(value => !value) === true &&
      ['l1', 'l2', 'l3'].every(phase => sim.signals.get('pump' + pump + '.' + phase).lastGoodRevision > command.issuedInputRevision);
  }
  invalidate(pump, kind = null) {
    for (const [name, result] of Object.entries(this.results[pump])) {
      if (!kind || name === kind || name === 'pump') result.valid = false;
    }
  }
  commonReasons(sim) {
    const reasons = [];
    if (sim.shutterTest.active || sim.damperTest.active || sim.fanTest.active) reasons.push('Сначала завершите другую инженерную проверку');
    if (!this.enabled || !this.furnaceOff) reasons.push('Нужен инженерный сеанс с явной предпосылкой «печь выключена»');
    if (sim.state !== 'STOPPED') reasons.push('ТО должен быть остановлен');
    if (!sim.hmiAvailable()) reasons.push('Нет управляющей HMI');
    if (sim.signals.read('cooling.required') !== false) reasons.push('Не подтверждено отсутствие требуемого охлаждения');
    for (const name of ['grid.normal', 'temperature.normal', 'configuration.ready', 'vfd.exchange']) {
      if (sim.signals.read(name) !== true) reasons.push('Нет допуска: ' + name);
    }
    if (sim.signals.read('emergency') !== false || sim.signals.read('vfd.fault') !== false) reasons.push('Нет разрешения по аварии/ПЧ');
    for (const name of ['pressure.before', 'pressure.after']) {
      const pressure = sim.signals.read(name);
      if (pressure === null || pressure < 0.8 || pressure > 2.8) reasons.push('Нет допуска по давлению: ' + name);
    }
    return reasons;
  }
  enter(sim, confirmed) {
    if (confirmed !== true) return ['Явно подтвердите тестовую предпосылку: печь выключена, проверку выполняет инженер'];
    if (this.enabled) return ['Инженерный режим уже включён'];
    if (sim.state !== 'STOPPED' || (!sim.stoppedConfirmed() && !sim.cooling.running(sim)) || sim.pumps.active) return ['Нужен остановленный ТО с подтверждённым остановом механизмов либо разрешённым охлаждением'];
    this.enabled = true; this.furnaceOff = true;
    sim.procedureId += 1;
    sim.log('ENGINEERING', 'Инженерный сеанс: выключенная печь и полномочия заданы испытателем; аппаратное доказательство отсутствует');
    return [];
  }
  leave(sim) {
    if (!this.enabled || sim.anyEngineeringTest()) return ['Завершите текущую инженерную попытку'];
    if (Object.values(this.returnRequired).some(Boolean) || Object.values(this.breakerOffRequired).some(Boolean)) return ['Завершите обязательные ручные действия'];
    if (Object.values(sim.valves.waits).some(wait => wait.source === 'ENGINEERING_OPEN')) return ['Подтвердите ручное открытие неисправного затвора после проверки'];
    this.enabled = false; this.furnaceOff = false;
    for (const pump of [1, 2]) this.invalidate(pump);
    this.manualIsolation = null;
    sim.procedureId += 1;
    for (const pump of [1, 2]) sim.request['valve' + pump + '.direction'] = 'OPEN'; // D-046, блокировки привода сохраняются в Protection.
    return [];
  }
  isolate(sim, pump, confirm = false) {
    if (![1, 2].includes(pump)) return ['Неверная ветвь'];
    const reasons = this.commonReasons(sim);
    if (this.active || !this.off(sim, 1) || !this.off(sim, 2)) reasons.push('Оба насоса должны быть подтверждённо выключены, тест не выполняется');
    if (reasons.length) return reasons;
    if (confirm) {
      if (this.manualIsolation?.pump !== pump || !this.returnRequired[pump]) return ['Сначала запросите ручную изоляцию конкретной ветви'];
      this.manualIsolation.confirmed = true;
    } else {
      if (Object.values(this.returnRequired).some(Boolean)) return ['Сначала завершите прежний возврат нижнего крана'];
      this.returnRequired[pump] = true;
      this.manualIsolation = { pump, confirmed: false };
      sim.log('PROMPT', 'Закройте нижний ручной кран ветви ' + pump + ' после электрозатвора и подтвердите полное закрытие (D-181–D-193)');
    }
    return [];
  }
  confirmReturn(sim, pump) {
    if (![1, 2].includes(pump) || !this.returnRequired[pump]) return ['Нет обязанности возврата этого крана'];
    if (this.active || sim.shutterTest.active || !this.off(sim, 1) || !this.off(sim, 2)) return ['Сначала подтвердите выключение насосов и завершение попытки'];
    this.returnRequired[pump] = false;
    if (this.manualIsolation?.pump === pump) this.manualIsolation = null;
    sim.log('MANUAL_RETURN', 'Полное открытие нижнего крана ветви ' + pump + ' проверено и подтверждено инженером; ошибки сохранены');
    return [];
  }
  start(sim, options) {
    const { kind, pump, repaired } = options ?? {}; // kind — отдельный насос либо затвор; repaired — подтверждение ремонта/окончания вмешательства.
    if (!['pump', 'valve', 'branch'].includes(kind) || ![1, 2].includes(pump)) return ['Выберите насос/затвор/объединённую ветвь 1 или 2'];
    const reasons = this.commonReasons(sim);
    const branch = sim.pumps.branches[pump];
    const other = 3 - pump;
    if (this.active || sim.shutterTest.active) reasons.push('Механизм занят текущей инженерной попыткой');
    if (Object.values(sim.valves.waits).some(wait => wait.source === 'ENGINEERING_OPEN')) reasons.push('Завершите ручное открытие после предыдущей попытки');
    if (!this.off(sim, 1) || !this.off(sim, 2)) reasons.push('Требуются обе команды OFF и новые достоверные 000');
    if (Object.values(this.breakerOffRequired).some(Boolean)) reasons.push('Сначала подтвердите требуемое отключение автомата привода');
    if (this.returnRequired[pump]) reasons.push('Собственная ветвь имеет незавершённый возврат ручного крана');
    const position = sim.signals.position('valve' + pump);
    if (['UNKNOWN', 'CONTRADICTORY'].includes(position)) reasons.push('Исходные концевики недостоверны или противоречат друг другу');
    const repair = branch.valveBlocked || branch.faults.length > 0 || branch.exclusions.length > 0;
    if (repair && repaired !== true) reasons.push('Подтвердите устранение причины и окончание ручного вмешательства');
    if (kind === 'pump' && (branch.valveBlocked || branch.faults.some(code => /VALVE|valve/.test(code)))) reasons.push('Сначала успешно проверьте и отдельно верните собственный затвор');
    if (kind !== 'pump' && branch.electricalIsolation && !branch.isolationConfirmed) reasons.push('Движение запрещено до отдельного подтверждения изоляции опасной электрической ветви');
    const manual = this.manualIsolation?.pump === other && this.manualIsolation.confirmed;
    if (kind !== 'valve' && sim.signals.position('valve' + other) !== 'CLOSED' && !manual) reasons.push('Нет подтверждённой изоляции противоположной ветви');
    if (kind !== 'valve' && branch.exclusions.includes('CHECK_AFTER_LOW_FLOW') && sim.signals.position('valve' + other) !== 'CLOSED') reasons.push('D-167 требует достоверного закрытия противоположного электрозатвора; ручная изоляция это условие не заменяет');
    if (reasons.length) return reasons;
    this.invalidate(pump, kind === 'branch' ? null : kind);
    branch.manualClosed = false; branch.manualOpen = false; // D-177: до возврата разрешения электрического движения.
    this.breakerOffConfirmed[pump] = false;
    sim.procedureId += 1;
    this.active = { kind, pump, stage: kind !== 'pump' ? 'PREPARE_OPEN' : 'PREPARE_CLOSED',
      repair, startedAt: sim.clock.now, moveAt: null, moveRevision: null, onAt: null, openedAt: null,
      isolation: kind !== 'valve' ? (manual ? 'MANUAL' : 'VALVE') : null, manualPump: manual && kind !== 'valve' ? other : null,
      electrical: 'NOT_CHECKED', hydraulic: 'NOT_CHECKED', valveResult: 'NOT_CHECKED', result: 'NOT_CHECKED', reason: null, electricalTripped: false };
    // Обязанность возврата хранится до первого движения; разрешение ручной изоляции потребляется этой попыткой.
    if (kind !== 'valve' && manual) this.manualIsolation = null;
    for (const index of [1, 2]) {
      sim.request['pump' + index + '.run'] = false;
      sim.request['valve' + index + '.direction'] = 'STOP';
      delete sim.protection.motions['valve' + index];
    }
    sim.log('ENGINEERING_START', 'Отдельная проверка ' + kind + ', ветвь ' + pump + '; успех не возвращает ветвь автоматически');
    return [];
  }
  permitValve(pump) { return this.active?.pump === pump && this.active.kind !== 'pump' && this.active.stage !== 'WAIT_OFF'; }
  permitPump(pump) { return this.active?.pump === pump && this.active.kind !== 'valve' && !this.active.electricalTripped && this.active.stage !== 'WAIT_OFF'; }
  stop(sim, reason = 'Прервано инженером', result = 'NOT_CHECKED') {
    const operation = this.active;
    if (!operation || operation.stage === 'WAIT_OFF') return;
    operation.result = result;
    operation.reason = reason;
    operation.stage = 'WAIT_OFF';
    operation.moveAt = null;
    if (operation.kind !== 'pump' && operation.repair && result !== 'PASSED') this.breakerOffRequired[operation.pump] = true;
    sim.log('ENGINEERING_STOP', reason + '; ожидание достоверного OFF, без автоматического повтора');
  }
  motionFailed(sim, pump) {
    if (this.active?.pump !== pump) return;
    sim.pumps.branches[pump].valveBlocked = true;
    this.breakerOffRequired[pump] = true;
    this.active.valveResult = 'FAILED';
    this.stop(sim, 'Проверочное положение затвора не подтверждено', this.active.kind !== 'pump' ? 'FAILED' : 'NOT_CHECKED');
  }
  move(sim, request, desired, next) { // Отдельный ход, 45 с; цель должна быть новым ответом после команды.
    const operation = this.active;
    const name = 'valve' + operation.pump;
    request[name + '.direction'] = desired;
    const command = sim.outputs.commands[name + '.direction'];
    if (command?.value === desired) { operation.moveAt ??= command.issuedAt; operation.moveRevision ??= command.issuedInputRevision; }
    const target = desired === 'OPEN' ? 'OPEN' : 'CLOSED';
    if (operation.moveAt !== null && sim.signals.position(name) === target &&
        ['open', 'closed'].every(limit => sim.signals.get(name + '.' + limit).lastGoodRevision > operation.moveRevision)) {
      request[name + '.direction'] = 'STOP';
      operation.stage = next;
      operation.moveAt = null; operation.moveRevision = null;
      return true;
    }
    return false;
  }
  step(sim, request, pressureTrip) {
    const operation = this.active;
    if (!operation) return;
    const pump = operation.pump;
    const branch = sim.pumps.branches[pump];
    const position = sim.signals.position('valve' + pump);
    for (const index of [1, 2]) { request['pump' + index + '.run'] = false; request['valve' + index + '.direction'] = 'STOP'; }
    if (operation.stage !== 'WAIT_OFF') {
      if (!sim.hmiAvailable()) this.stop(sim, 'Потеря HMI (D-192/D-209)');
      else if (pressureTrip || sim.signals.read('emergency') !== false || !this.furnaceOff) this.stop(sim, 'Утрата допуска/защита (D-201)');
      else if (branch.classificationAt !== null || operation.electricalTripped) {
        operation.electricalTripped = true;
        this.stop(sim, 'Электрическая диагностика: результат классификации ожидается (D-142/D-201)');
      } else if (operation.kind === 'valve' && (!this.off(sim, 1) || !this.off(sim, 2))) this.stop(sim, 'Утрачено подтверждение OFF насосов');
      else if (operation.kind !== 'valve' && operation.isolation === 'VALVE' && sim.signals.position('valve' + (3 - pump)) !== 'CLOSED') this.stop(sim, 'Утрачена изоляция противоположной ветви (D-200)');
      else if (position === 'UNKNOWN') this.stop(sim, 'Нет достоверных концевиков проверяемого затвора');
      else if (this.commonReasons(sim).length) this.stop(sim, 'Утрачены условия допуска (D-201): ' + this.commonReasons(sim).join('; '));
    }
    if (operation.kind === 'valve') {
      if (operation.stage === 'PREPARE_OPEN') {
        if (position === 'OPEN') operation.stage = 'CLOSE';
        else this.move(sim, request, 'OPEN', 'BREAK_CLOSE');
      } else if (operation.stage === 'BREAK_CLOSE') operation.stage = 'CLOSE';
      else if (operation.stage === 'CLOSE') this.move(sim, request, 'CLOSE', 'BREAK_OPEN');
      else if (operation.stage === 'BREAK_OPEN') operation.stage = 'OPEN';
      else if (operation.stage === 'OPEN' && this.move(sim, request, 'OPEN', 'SUCCESS')) this.stop(sim, 'Оба проверочных хода подтверждены (D-204)', 'PASSED');
    } else {
      if (operation.kind === 'branch' && operation.stage === 'PREPARE_OPEN') {
        if (position === 'OPEN') operation.stage = 'CLOSE';
        else this.move(sim, request, 'OPEN', 'BREAK_CLOSE');
      } else if (operation.stage === 'BREAK_CLOSE') operation.stage = 'CLOSE';
      else if (operation.stage === 'CLOSE') this.move(sim, request, 'CLOSE', 'PUMP_ON'); // Реальный проверочный CLOSE, а не принятие исходного положения.
      else if (operation.stage === 'PREPARE_CLOSED') {
        if (position === 'CLOSED') operation.stage = 'PUMP_ON';
        else this.move(sim, request, 'CLOSE', 'PUMP_ON');
      } else if (operation.stage === 'PUMP_ON') {
        request['pump' + pump + '.run'] = true;
        const command = sim.outputs.commands['pump' + pump + '.run'];
        if (command?.value === true) operation.onAt ??= command.issuedAt;
        if (operation.onAt !== null && sim.clock.now - operation.onAt >= 1000) {
          operation.stage = 'OPEN';
          this.move(sim, request, 'OPEN', 'HYDRAULICS'); // Открытие после существующей 1 с, без нового технологического интервала.
        }
      } else if (operation.stage === 'OPEN') {
        request['pump' + pump + '.run'] = true;
        if (this.move(sim, request, 'OPEN', 'HYDRAULICS')) operation.openedAt = sim.clock.now;
      } else if (operation.stage === 'HYDRAULICS') {
        request['pump' + pump + '.run'] = true;
        if (position !== 'OPEN') {
          if (position === 'CLOSED') sim.valves.fail(sim, pump, 'VALVE_UNEXPECTED_CLOSED', 'Затвор неожиданно закрылся в тесте (D-199)');
          this.stop(sim, 'Утрачено открытие собственного затвора (D-199)');
        } else if (sim.clock.now - operation.openedAt >= 5000) {
          const { q, dp } = sim.hydraulics.values(sim);
          operation.measurements = { q, dp, flowMin: sim.config.flowMin, dpMin: sim.config.dpMin };
          if (q === null || dp === null) this.stop(sim, 'Гидравлика не проверена: недостоверны Q/давления (D-189)');
          else if (q < sim.config.flowMin || dp < sim.config.dpMin) {
            operation.hydraulic = 'FAILED';
            if (!branch.exclusions.includes('HYDRAULIC_TEST_FAILED')) branch.exclusions.push('HYDRAULIC_TEST_FAILED');
            this.stop(sim, 'Гидравлическая проверка ветви не пройдена (D-188/D-197)', 'FAILED');
          } else {
            operation.hydraulic = 'PASSED';
            if (operation.kind === 'branch') operation.stage = 'FINAL_CLOSE'; // D-251 изменяет только объединённый тест: закрыть при работающем насосе.
            else this.stop(sim, 'Гидравлика подтверждена; проверяется выключение насоса (D-190)', 'PASSED');
          }
        }
      } else if (operation.stage === 'FINAL_CLOSE') {
        request['pump' + pump + '.run'] = true;
        if (this.move(sim, request, 'CLOSE', 'FINAL_OFF')) request['pump' + pump + '.run'] = false;
      } else if (operation.stage === 'FINAL_OFF') {
        if (this.off(sim, pump)) operation.stage = 'FINAL_OPEN'; // Новый 000 после OFF обязателен перед заключительным OPEN.
      } else if (operation.stage === 'FINAL_OPEN' && this.move(sim, request, 'OPEN', 'SUCCESS')) {
        operation.valveResult = 'PASSED';
        this.stop(sim, 'Объединённый цикл: насос проверен и выключен, затвор вновь открыт (D-251)', 'PASSED');
      }
      const on = sim.outputs.commands['pump' + pump + '.run'];
      if (on?.value === true && sim.signals.phases(pump)?.every(Boolean) &&
          ['l1', 'l2', 'l3'].every(phase => sim.signals.get('pump' + pump + '.' + phase).lastGoodRevision > on.issuedInputRevision)) operation.electrical = 'PASSED';
    }
    if (operation.stage === 'WAIT_OFF') {
      for (const index of [1, 2]) { request['pump' + index + '.run'] = false; request['valve' + index + '.direction'] = 'STOP'; }
      if (operation.electricalTripped && branch.classificationAt === null) { operation.electrical = 'FAILED'; operation.result = 'FAILED'; }
      if ([1, 2].every(index => this.off(sim, index)) && branch.classificationAt === null &&
          (pressureTrip || [1, 2].every(index => sim.outputs.value('valve' + index + '.direction') === 'STOP'))) {
        if (operation.kind !== 'valve' && operation.result === 'PASSED' && operation.electrical !== 'PASSED') operation.result = 'NOT_CHECKED';
        const result = { ...operation, completedAt: sim.clock.now, valid: operation.result === 'PASSED' };
        if (operation.kind === 'branch') {
          // D-252: успешные измерения насоса не превращают неудавшуюся объединённую ветвь в успешную.
          this.results[pump].pump = { ...result, kind: 'pump', result: operation.electrical === 'PASSED' && operation.hydraulic === 'PASSED' ? 'PASSED' : operation.result };
          this.results[pump].valve = { ...result, kind: 'valve', result: operation.valveResult };
          if (operation.valveResult === 'FAILED') sim.valves.requestManual(sim, pump, 'OPEN', 'ENGINEERING_OPEN', null);
        } else this.results[pump][operation.kind] = result;
        this.history.push(structuredClone(result));
        this.active = null;
        sim.log('ENGINEERING_RESULT', 'Ветвь ' + pump + ', ' + operation.kind + ': ' + operation.result + '. Возврат — отдельная команда');
      }
    }
  }
  returnBranch(sim, options) {
    const { pump, kind } = options ?? {};
    if (![1, 2].includes(pump) || !['pump', 'valve'].includes(kind)) return ['Выберите ветвь и проверенный механизм'];
    const reasons = this.commonReasons(sim);
    if (this.active || !this.off(sim, 1) || !this.off(sim, 2)) reasons.push('Не завершён подтверждённый останов проверок');
    if (Object.values(this.returnRequired).some(Boolean) || Object.values(this.breakerOffRequired).some(Boolean)) reasons.push('Не завершены обязательные ручные действия');
    if (this.results[pump][kind]?.valid !== true) reasons.push('Нет действующего успешного теста в этом инженерном сеансе');
    if (reasons.length) return reasons;
    const branch = sim.pumps.branches[pump];
    const matches = code => kind === 'valve' ? /VALVE|valve/.test(code) : /PUMP_PHASES_ON|HYDRAULIC_LOW|VOLTAGE_WHEN_OFF/.test(code);
    const cleared = branch.faults.filter(matches);
    branch.faults = branch.faults.filter(code => !matches(code));
    // Критическое напряжение при OFF требует отдельного сброса D-143 даже после возврата.
    sim.protection.faults = sim.protection.faults.filter(fault => !cleared.includes(fault.code) || fault.code.startsWith('VOLTAGE_WHEN_OFF'));
    if (kind === 'valve') {
      branch.valveBlocked = false; branch.valvePumpOff = false; branch.manualClosed = false; branch.manualOpen = false; branch.closeExhausted = false;
      sim.protection.faults = sim.protection.faults.filter(fault => fault.code !== 'VALVE_MANUAL_WAIT_TIMEOUT_' + pump);
      delete sim.valves.waits[pump]; delete sim.valves.recoveries[pump]; delete sim.protection.motions['valve' + pump];
    } else {
      branch.exclusions = branch.exclusions.filter(code => !['CHECK_AFTER_LOW_FLOW', 'HYDRAULIC_TEST_FAILED'].includes(code));
      branch.inhibited = false; branch.electricalIsolation = false; branch.isolationConfirmed = false;
    }
    this.results[pump][kind].valid = false; // Однократно использованный допуск, без автоматического пуска.
    if (sim.pumps.groupFault) sim.pumps.groupReturns[pump][kind] = true;
    sim.log('ENGINEERING_RETURN', 'Ветвь ' + pump + ': возвращён ' + kind + '; сняты только связанные проверенные причины');
    return [];
  }
}
