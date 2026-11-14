/** Разность десятичных образцов без артефакта 1.4 - 1.1 < 0.3 в IEEE-754.
 * Не вводит допуска/округления датчика: вычитаются ровно десятичные представления полученных чисел.
 */
function pressureDifference(after, before) { // after/before — проверенные числовые образцы, бар.
  const parse = value => { // value — конечное число, преобразуемое в целое и степень десяти.
    const [mantissa, power = '0'] = String(value).split('e'); // Мантисса и явная степень, включая малые входные образцы.
    const fraction = mantissa.split('.')[1]?.length ?? 0; // Число десятичных знаков, без предположения о разрешении датчика.
    return { integer: BigInt(mantissa.replace('.', '')), exponent: Number(power) - fraction };
  };
  const a = parse(after); // Первый десятичный операнд.
  const b = parse(before); // Второй десятичный операнд.
  const exponent = Math.min(a.exponent, b.exponent); // Общая степень для точного целочисленного вычитания.
  const difference = a.integer * 10n ** BigInt(a.exponent - exponent) - b.integer * 10n ** BigInt(b.exponent - exponent); // Разность без промежуточного двоичного округления.
  return Number(String(difference) + 'e' + exponent);
}

/** Гидравлические критерии D-031/D-032/D-045/D-138/D-165–D-167.
 * Здесь нет гидравлического расчёта установки: Q и два давления — независимые образцы испытателя.
 */
export class HydraulicControl {
  mode = null; // Текущий критерий; его изменение сбрасывает только незавершённые рабочие выдержки.
  warning = null; // Текущее предупреждение/ожидание, не индивидуальная ошибка насосной ветви.
  requireFullStartup = false; // D-167: после критического недостатка Q следующий успешный пуск проверяет Q и ΔP независимо от флага.

  values(sim) {
    const before = sim.signals.read('pressure.before'); // Достоверное давление до НГ, бар, либо null.
    const after = sim.signals.read('pressure.after'); // Достоверное давление после НГ, бар, либо null.
    return { q: sim.signals.read('flow'), dp: before !== null && after !== null ? pressureDifference(after, before) : null }; // Общие измерения, не датчики отдельных ветвей.
  }
  evaluate(sim, startup = false) { // startup — подготовка требует Q при включённом флаге, без рабочего fallback.
    const { q, dp } = this.values(sim); // Значения с уже применёнными правилами достоверности TUF.
    const full = startup && this.requireFullStartup; // Разовая обязательная полная проверка D-167.
    const useFlow = full || sim.config.flowControl; // Флаг не меняется из-за временной потери TUF.
    const mode = !useFlow || (!startup && q === null) ? 'DP_ONLY' : 'COMBINED'; // Fallback D-045 допустим только в работе.
    if (dp === null) return { state: 'NO_DP', mode, q, dp };
    if (mode === 'DP_ONLY') return { state: dp >= sim.config.dpMin ? 'OK' : 'LOW', mode, q, dp };
    if (q === null) return { state: 'NO_Q', mode, q, dp };
    if (q >= sim.config.flowMin && dp >= sim.config.dpMin) return { state: 'OK', mode, q, dp };
    if (q < sim.config.flowMin && dp < sim.config.dpMin) return { state: 'LOW', mode, q, dp };
    return { state: q < sim.config.flowMin ? 'FLOW_LOW' : 'DP_LOW', mode, q, dp };
  }
  resetTimers(sim) {
    sim.protection.elapsed(sim, 'hydraulicBothLow', false);
    sim.protection.elapsed(sim, 'hydraulicFlowLow', false);
  }
  warn(text) { this.warning = text; } // text — действующее сообщение, не защёлка физической неисправности.
  lowFlowStop(sim, unknown = false) { // unknown — Q результата смены нельзя подтвердить, это не нулевой расход.
    this.requireFullStartup = true;
    sim.protection.fault(sim, unknown ? 'FLOW_RECOVERY_UNCONFIRMED' : 'FLOW_INSUFFICIENT',
      unknown ? 'Восстановление расхода после смены насоса не подтверждено (D-166)' : 'Недостаточный расход через ТО (D-166)', unknown ? 'NO_FEEDBACK' : 'CONFIRMED');
    sim.protection.beginStop(sim, 'Недостаточный/неподтверждённый расход: обязательный останов (D-166)');
  }
  reserve(sim, cause, pump = sim.selectedPump) { // cause/pump — диагностическая причина и проверяемая ветвь, не утверждение о поломке детали.
    if (cause === 'HYDRAULIC_LOW') sim.pumps.fail(sim, pump, 'HYDRAULIC_LOW_' + pump, 'Недостаточная циркуляция на ветви ' + pump + ' (D-012/D-138)', 'HYDRAULIC_CRITERION');
    sim.pumps.checkGroup(sim);
    if (sim.pumps.groupFault) return;
    const reasons = sim.pumps.begin(sim, 3 - pump, cause); // Автоматически выбирается только доступный закрытый резерв.
    if (reasons.length) {
      if (cause === 'LOW_FLOW') this.lowFlowStop(sim);
      else sim.protection.beginStop(sim, 'Недостаточная циркуляция, доступного резерва нет: ' + reasons.join('; '));
    }
  }
  startReady(sim) { // Вызывается только после прежних 5 с от подтверждения открытия, без новых 5 с диагностики.
    if (sim.outputs.value('pump' + sim.selectedPump + '.run') !== true || sim.pumps.branches[sim.selectedPump].inhibited) return false; // Защитно снятый ON не подтверждает готовность и не создаёт обход 2 с классификации D-142.
    if (['pressure.before', 'pressure.after'].some(name => { // name — исходные абсолютные разрешения пуска, не относительный ΔP.
      const pressure = sim.signals.read(name); // null не превращается в низкое давление.
      return pressure === null || pressure < 0.8 || pressure > 2.8;
    })) { this.warn('Подготовка: не подтверждены допустимые абсолютные давления'); return false; }
    const result = this.evaluate(sim, true); // Матрица подготовки D-031/D-032 отдельно от установившейся работы.
    this.warn(null);
    if (result.state === 'OK') return true;
    if (result.state === 'LOW') this.reserve(sim, 'HYDRAULIC_LOW');
    else this.warn(result.state === 'NO_Q' ? 'Подготовка: нет достоверного Q; без готовности и без автоматической смены (D-031)' :
      result.state === 'NO_DP' ? 'Подготовка: нет достоверного ΔP' : 'Подготовка: Q и ΔP не согласованы; ожидание нормализации или команды оператора (D-031)');
    return false;
  }
  monitor(sim) {
    if (sim.state !== 'RUNNING' || sim.pumps.active || sim.outputs.value('pump' + sim.selectedPump + '.run') !== true || sim.pumps.branches[sim.selectedPump].inhibited) { this.resetTimers(sim); return; } // После защитного OFF гидравлический таймер не опережает классификацию электрического события.
    const result = this.evaluate(sim); // Рабочая матрица, включая временный DP_ONLY после потери Q.
    if (result.mode !== this.mode) { this.resetTimers(sim); this.mode = result.mode; }
    this.warn(result.q === null ? 'Нет достоверного Q; контроль по доступному ΔP (D-045)' : null);
    if (result.state === 'NO_DP') {
      this.resetTimers(sim);
      if (result.q !== null && result.q < sim.config.flowMin && sim.config.flowControl) sim.gap('Низкий Q при недостоверном ΔP: совмещение D-148/D-166 ещё не перенесено');
      return; // Общую потерю обоих критериев отдельно обрабатывает защита D-165.
    }
    const lowDuration = sim.protection.elapsed(sim, 'hydraulicBothLow', result.state === 'LOW'); // Непрерывно оба низкие либо низкий ΔP в DP_ONLY.
    const flowDuration = sim.protection.elapsed(sim, 'hydraulicFlowLow', result.mode === 'COMBINED' && result.q !== null && result.q < sim.config.flowMin); // Q может оставаться низким при изменении ΔP; его собственная выдержка не подменяется перепадом.
    if (lowDuration >= 5000) { this.resetTimers(sim); this.reserve(sim, 'HYDRAULIC_LOW'); }
    else if (flowDuration >= 5000) { this.resetTimers(sim); this.reserve(sim, 'LOW_FLOW'); }
    else if (result.state === 'DP_LOW') this.warn('Низкий ΔP при нормальном Q: предупреждение, не индивидуальный отказ (D-012)');
  }
  verifySwitch(sim, operation) { // operation — принятая смена; проверка через 5 с после открытия резерва.
    if (operation.verificationFailed) return false; // Позднее улучшение не отменяет уже начатый останов D-166.
    if (operation.cause === 'LOW_FLOW') {
      const { q } = this.values(sim); // D-166: после принятия смены обязательно проверяется Q даже при выключенном флаге.
      if (q === null || q < sim.config.flowMin) {
        operation.verificationFailed = true;
        this.lowFlowStop(sim, q === null);
        return false;
      }
      return true;
    }
    const result = this.evaluate(sim, sim.state === 'STARTING'); // Пусковая потеря Q не получает рабочего fallback.
    if (result.state === 'OK') { this.warn(null); return true; }
    if (result.state === 'LOW') {
      if (!sim.pumps.branches[operation.from].faults.length) {
        sim.gap('Низкая циркуляция после ручной смены при ещё исправной прежней ветви: обратное резервирование этого случая ещё не реализовано');
        return false;
      }
      sim.pumps.fail(sim, operation.to, 'HYDRAULIC_LOW_' + operation.to, 'Недостаточная циркуляция на резервной ветви ' + operation.to + ' после открытия +5 с', 'HYDRAULIC_CRITERION');
      sim.pumps.checkGroup(sim);
      operation.verificationFailed = true;
      // Для второй диагностированной ветви действует D-117; общие измерения без такого диагноза сюда не попадают.
      return false;
    }
    if (sim.state === 'STARTING') {
      this.warn('Подготовка после смены: нет подтверждения Q/ΔP, ожидание без готовности (D-031)');
      return false;
    }
    if (result.state === 'DP_LOW') {
      this.warn('После смены Q нормальный, ΔP низкий: предупреждение (D-012)');
      return true;
    }
    sim.gap('Результат обычной смены не подтверждён по гидравлике: эта комбинация требует следующего этапа реализации');
    return false;
  }
  complete(sim, operation) { // operation — только успешно завершённая смена.
    if (operation.cause === 'LOW_FLOW') {
      const branch = sim.pumps.branches[operation.from]; // Исключение для проверки не объявляет физический отказ этой ветви.
      if (!branch.exclusions.includes('CHECK_AFTER_LOW_FLOW')) branch.exclusions.push('CHECK_AFTER_LOW_FLOW');
      sim.log('PUMP_EXCLUDED', 'Ветвь ' + operation.from + ': требуется проверка после недостаточного расхода (D-167); автоматического возврата нет');
    }
  }
}
