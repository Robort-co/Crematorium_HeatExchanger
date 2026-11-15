/** Водяные защиты D-023/D-024 и предупреждение D-025 по источникам D-152.
 * Реальных датчиков/выходов нет: heatRemoval.request — запрос местного теплоотвода,
 * не подтверждение вентилятора или принятия команды котельной.
 */
export class WaterProtection {
  enabled = false;
  recoveryPending = false;
  savedThermalRemoval = null; // История прочитанного снимка, отдельно от текущего запроса/подтверждения выхода.
  overheat = false;
  hotSince = null;
  thermalRemoval = false;
  removalSince = null;
  supplyMissing = false;
  removalRequested = false;
  deltaWarning = false;
  deltaSince = null;
  deltaClearSince = null;
  warnings = [];
  restoreSnapshot(saved, readable) {
    this.enabled = true;
    this.recoveryPending = !readable;
    // Согласование 15.11: обе установленные защёлки переживают reboot до своих
    // условий снятия, без повторных 3 с. Непрочитанный снимок не угадываем.
    // Таймеры, измерения и подтверждения выходов не переносим.
    this.overheat = readable ? saved.overheat : false;
    this.savedThermalRemoval = readable ? (saved.recoveryPending ? saved.savedThermalRemoval : saved.thermalRemoval) : null;
    this.thermalRemoval = this.savedThermalRemoval === true;
  }
  observeOverheat(sim) {
    const maximum = sim.temperature.water.protectionMaximum;
    if (maximum !== null && maximum > sim.config.waterOverheat) this.hotSince ??= sim.clock.now;
    else this.hotSince = null;
    if (this.hotSince !== null && sim.clock.now - this.hotSince >= 3000) this.overheat = true;
    if (maximum !== null && maximum < 86) this.overheat = false;
    sim.temperature.ownFault(sim,'WATER_OVERHEAT',this.overheat,'Перегрев воды: запрет нового Пуска без останова работающего ТО (D-023)');
  }
  interruptStartup(sim) {
    if (!this.enabled || !(this.overheat || this.supplyMissing) || sim.state !== 'STARTING') return;
    // Согласование 15.11: принятый Пуск прерывается до возможности перейти в RUNNING.
    // Снятие водяной причины не отменяет уже обязательный останов. Команды и
    // независимые запреты циркуляции остаются у общей защитной последовательности.
    sim.protection.beginStop(sim, 'Водяная защита прервала незавершённый Пуск: подтвердить ШБ, затем закрыть ШТ', 'STARTUP_WATER');
  }
  step(sim) {
    if (!this.enabled || this.recoveryPending) return;
    const water = sim.temperature.water, maximum = water.protectionMaximum;
    // Не объединять сравнения: перегрев — превышение, теплоотвод — достижение.
    this.observeOverheat(sim);
    if (maximum !== null && maximum >= sim.config.waterRemovalOn) this.removalSince ??= sim.clock.now;
    else this.removalSince = null;
    if (this.removalSince !== null && sim.clock.now - this.removalSince >= 3000) this.thermalRemoval = true;
    if (maximum !== null && maximum < sim.config.waterRemovalOff) this.thermalRemoval = false;
    // Нет ни одного достоверного канала — нет доказательства снятия по температуре.
    // Обратка не заменяет контроль подачи; требование D-024 имеет приоритет.
    this.supplyMissing = water.supplyMissing;
    this.removalRequested = this.supplyMissing || this.thermalRemoval;
    sim.temperature.ownFault(sim,'WATER_SUPPLY_UNAVAILABLE',this.supplyMissing,'Нет достоверной температуры подачи: теплоотвод и запрет нового Пуска (D-024)');
    this.warnings = [];
    if (water.primary === null && water.backup !== null) this.warnings.push('PRIMARY_FAILED_WITH_BACKUP');
    if (water.returned === null && !this.supplyMissing) this.warnings.push('RETURN_FAILED');
    this.observeDelta(sim, water.delta);
  }
  observeDelta(sim, delta) {
    if (sim.state !== 'RUNNING' || delta === null) {
      this.deltaWarning = false; this.deltaSince = null; this.deltaClearSince = null;
      return; // D-025: останов/нет ΔT снимают только это предупреждение, не аварии датчиков.
    }
    if (!this.deltaWarning) {
      this.deltaClearSince = null;
      if (delta > sim.config.deltaOn) this.deltaSince ??= sim.clock.now;
      else this.deltaSince = null;
      if (this.deltaSince !== null && sim.clock.now - this.deltaSince >= 5000) {
        this.deltaWarning = true; this.deltaSince = null;
        sim.log('WATER_DELTA','ΔT выше порога 5 с: некритическое предупреждение D-025');
      }
    } else {
      this.deltaSince = null;
      if (delta <= sim.config.deltaOff) this.deltaClearSince ??= sim.clock.now;
      else this.deltaClearSince = null;
      if (this.deltaClearSince !== null && sim.clock.now - this.deltaClearSince >= 10000) {
        this.deltaWarning = false; this.deltaClearSince = null;
        sim.log('WATER_DELTA','Предупреждение ΔT снято после 10 с нормы (D-025)');
      }
    }
  }
  enforce(request) {
    if (this.enabled && !this.recoveryPending) request['heatRemoval.request'] = this.removalRequested;
    // Ни насосам, ни ПЧ, ни ШТ водяная причина новых команд не назначает.
  }
  settings(sim, value) {
    if (!sim.engineering.enabled || !sim.hmiAvailable() || sim.state !== 'STOPPED' || sim.anyEngineeringTest()) return ['В этом этапе настройки доступны только в инженерном сеансе остановленного ТО вне тестов'];
    if (this.overheat || this.thermalRemoval) return ['Изменение уставок при активной водяной защите ещё вне профиля'];
    const allowed = ['waterOverheat','waterRemovalOn','waterRemovalOff','deltaOn','deltaOff'];
    if (!value || typeof value !== 'object' || Array.isArray(value) || !Object.keys(value).length || Object.keys(value).some(k=>!allowed.includes(k))) return ['Неизвестные уставки воды'];
    const c = {...sim.config,...value};
    if (!allowed.every(k=>Number.isFinite(c[k])) || c.waterOverheat<87 || c.waterOverheat>95 ||
      c.waterRemovalOn<80 || c.waterRemovalOn>90 || c.waterRemovalOff<75 || c.waterRemovalOff>90 ||
      !(c.waterRemovalOff<c.waterRemovalOn && c.waterRemovalOn<c.waterOverheat) ||
      c.deltaOn<15 || c.deltaOn>25 || c.deltaOff<15 || c.deltaOff>25 || c.deltaOff>=c.deltaOn) return ['Уставки вне диапазонов или нарушен порядок порогов'];
    Object.assign(sim.config,value);
    return [];
  }
}
