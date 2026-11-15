/** Давление D-026/D-065–D-067/D-148/D-149.
 * Немедленное отключение, выдержка сигнализации и блокировка после останова различаются.
 * Входы уже отфильтрованы; ещё 2 с перед trip не добавляются. Реального AI/хранилища нет.
 */
export class PressureProtection {
  lowTrip = false;
  lowAlarm = false;
  highAlarm = false;
  missingBoth = false;
  requireBoth = false; // После потери двух каналов один восстановившийся не разрешает насосы.
  stopPending = false;
  restartBlocked = false; // Сохраняемая в памяти модели фиксация завершённого защитного останова.
  stopCauses = [];
  resumeFrom = null;
  resumeReasons = [];
  values(sim) { return ['pressure.before', 'pressure.after'].map(name => sim.signals.read(name)); }
  normalBoth(sim) {
    const p = this.values(sim);
    const minimum = this.stopCauses.includes('LOW_PRESSURE') ? 1 : 0.8; // Plow=0,8 + утверждённый гистерезис 0,2.
    return p.every(value => value !== null && value >= minimum && value <= 2.8) && !this.lowTrip && !this.highAlarm;
  }
  get trip() { return this.lowTrip || this.missingBoth || this.requireBoth; }
  update(sim) {
    const values = this.values(sim).filter(value => value !== null);
    const low = values.some(value => value < 0.8), high = values.some(value => value > 2.8);
    this.missingBoth = values.length === 0;
    if (low) this.lowTrip = true;
    else if (values.length && values.every(value => value >= 1)) { this.lowTrip = false; this.lowAlarm = false; }
    if (sim.protection.elapsed(sim, 'pressureLowAlarm', low) >= 3000) this.lowAlarm = true;
    if (sim.protection.elapsed(sim, 'pressureHighAlarm', high) >= 3000) this.highAlarm = true;
    if (values.length && values.every(value => value <= 2.6)) this.highAlarm = false; // Phigh=2,8 минус 0,2; при двух UNKNOWN старое состояние сохраняется.
    if (this.highAlarm) sim.protection.fault(sim, 'HIGH_PRESSURE', 'Высокое давление: сигнализация после 3 с, без останова оборудования (D-026)');
    else sim.protection.faults = sim.protection.faults.filter(fault => fault.code !== 'HIGH_PRESSURE');
    if (this.missingBoth) this.requireBoth = true;
    else if (this.normalBoth(sim)) this.requireBoth = false;
    const causes = [low && 'LOW_PRESSURE', this.missingBoth && 'NO_PRESSURE_DATA'].filter(Boolean);
    for (const code of causes) {
      // Это фиксация причины немедленного отключения; lowAlarm отдельно отсчитывает 3 с сигнализации D-065.
      sim.protection.fault(sim, code, code === 'LOW_PRESSURE' ? 'Причина немедленного OFF: низкое давление (сигнализация отдельно через 3 с)' : 'Нет контроля обоих давлений: насосы OFF', code === 'LOW_PRESSURE' ? 'CONFIRMED' : 'NO_FEEDBACK');
      if (['STARTING', 'RUNNING', 'STOPPING'].includes(sim.state)) {
        if (!this.stopPending) this.resumeFrom = sim.state;
        this.stopPending = true;
        if (!this.stopCauses.includes(code)) this.stopCauses.push(code);
        sim.protection.beginStop(sim, 'Защита давления: запрос байпаса (D-149)', 'PRESSURE');
      }
    }
    if (!this.stopPending && !this.restartBlocked && !this.trip) this.clearFaults(sim);
  }
  clearFaults(sim) { sim.protection.faults = sim.protection.faults.filter(fault => !['LOW_PRESSURE', 'NO_PRESSURE_DATA'].includes(fault.code)); }
  tryEarly(sim) {
    this.resumeReasons = [];
    if (!this.stopPending || sim.state !== 'STOPPING' || !['RUNNING', 'STARTING'].includes(this.resumeFrom)) return;
    const p = sim.protection;
    if (p.stopIrreversible || p.bypassOpen || p.stopStage !== 'WAIT_BYPASS' || p.needsRestartContinue) return;
    if (!this.normalBoth(sim) || this.trip) this.resumeReasons.push('Нужны оба нормальных давления с гистерезисом');
    if (!sim.hmiAvailable() || (sim.mode === 'ARANGA' && (!sim.aranga.available(sim) || sim.aranga.stopLevel === true))) this.resumeReasons.push('Нет допуска HMI/ARANGA');
    if (sim.signals.read('configuration.ready') !== true || sim.signals.read('emergency') !== false) this.resumeReasons.push('Нет актуального допуска конфигурации/аварийного входа');
    // Нормализация давления не подтверждает завершение ручного вмешательства D-193/D-211.
    if (Object.values(sim.engineering.returnRequired).some(Boolean) || Object.values(sim.engineering.breakerOffRequired).some(Boolean)) this.resumeReasons.push('Не завершены обязательные ручные действия');
    const interruptedOpening = this.resumeFrom === 'STARTING' && sim.main.stage === 'OPEN_ST';
    if (p.stBlocked || (sim.signals.position('st') !== 'OPEN' && !(interruptedOpening && ['CLOSED', 'INTERMEDIATE'].includes(sim.signals.position('st'))))) this.resumeReasons.push('Нет допуска ШТ для продолжения прежнего запуска/работы');
    if (this.resumeFrom === 'RUNNING' && (sim.signals.read('vfd.running') !== true || sim.outputs.value('vfd.run') !== 'START')) this.resumeReasons.push('Не подтверждена работа ПЧ прежнего рабочего цикла');
    if (![1, 2].every(pump => sim.engineering.off(sim, pump))) this.resumeReasons.push('Нужны OFF и новые 000 обеих ветвей');
    if (!sim.mainEnabled || sim.supervision.mainStale || !sim.supervisionEnabled) this.resumeReasons.push('Не подтверждена работоспособность управления');
    if (sim.engineering.enabled || p.faults.some(fault => !['LOW_PRESSURE', 'NO_PRESSURE_DATA'].includes(fault.code)) ||
        Object.values(sim.pumps.branches).some(b => b.faults.length || b.exclusions.length || b.inhibited || b.valveBlocked)) this.resumeReasons.push('Сохраняется независимая причина/запрет');
    if (this.resumeReasons.length) return;
    this.clearFaults(sim);
    this.stopPending = false; this.stopCauses = []; this.resumeFrom = null;
    p.stopStage = null; sim.stopReason = null; p.bypassOpen = false;
    sim.transition('STARTING', 'Ранняя отмена только давления до подтверждения ШБ (D-067/D-149)');
    sim.recovery.begin(sim, sim.selectedPump);
    sim.log('PRESSURE_RESUME', 'Без нового Пуска: закрыть оба затвора и восстановить циркуляцию по D-111/D-112');
  }
  completed(sim) {
    if (!this.stopPending) return;
    this.restartBlocked = true;
    this.stopPending = false;
    this.resumeFrom = null;
    sim.log('PRESSURE_LATCH', 'Останов завершён; блокировка нового Пуска по давлению сохранена в памяти модели, нужен отдельный сброс');
  }
  reset(sim, confirmed) {
    if (confirmed !== true || !this.restartBlocked) return ['Нужны отдельное подтверждение и завершённая блокировка давления'];
    if (!sim.stoppedConfirmed() || sim.engineering.active) return ['Сначала подтвердите полный останов'];
    if (!this.normalBoth(sim) || this.trip) return ['Нужны оба достоверных нормальных давления с гистерезисом'];
    this.restartBlocked = false; this.stopCauses = []; this.clearFaults(sim);
    sim.log('PRESSURE_RESET', 'Сняты только блокировки давления/двух каналов; новый Пуск отдельно');
    return [];
  }
}
