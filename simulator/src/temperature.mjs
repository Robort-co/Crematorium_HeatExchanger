/** Нормализованные температуры: GOOD означает уже проверенный адаптером диапазон
 * и отсутствие аппаратной ошибки. Физические пределы AI/Modbus не назначаются.
 * Сохранение здесь — только снимок памяти процесса, не энергонезависимое хранение.
 */
export class Temperature {
  enabled = false;
  startedAt = 0;
  request = null;
  phase = 'DISABLED';
  valid = false;
  fault = false;
  continuing = false;
  wasInvalid = false;
  overheat = false;
  hotSince = null;
  differenceWarning = false;
  differenceSince = null;
  clearSince = null;
  water = {};
  begin(sim, saved = null) {
    this.enabled = true; this.startedAt = sim.clock.now;
    this.request = saved?.request ?? null;
    this.fault = saved?.fault ?? false;
    this.overheat = saved?.overheat ?? false;
    this.differenceWarning = saved?.differenceWarning ?? false;
    // Первое измерение, подтверждение пуска и незавершённые выдержки не переносятся.
  }
  demand(sim) {
    if (!this.enabled) return undefined; // Прежние изолированные фикстуры сохраняют явную предпосылку.
    if (this.valid) return this.request;
    return this.continuing && sim.outputs.value('vfd.run') === 'START' && sim.outputs.value('vfd.enable') === true ? true : null;
  }
  confirmedCooling(sim) {
    const command = sim.outputs.commands['vfd.run'];
    return sim.cooling.supported(sim) && command?.value === 'START' && command.delivery === 'ACCEPTED' &&
      sim.outputs.value('vfd.enable') === true && sim.signals.read('vfd.running') === true &&
      sim.signals.get('vfd.running').lastGoodRevision > command.deliveryInputRevision;
  }
  ownFault(sim, code, active, message) {
    if (active) sim.protection.fault(sim, code, message);
    else if (sim.protection.faults.some(f => f.code === code)) {
      sim.protection.faults = sim.protection.faults.filter(f => f.code !== code);
      sim.log('TEMPERATURE_RECOVERED', message + ': снята только эта причина');
    }
  }
  step(sim) {
    if (!this.enabled) return;
    const reading = sim.signals.retainedTemperature('temperature.fan');
    this.valid = reading.value !== null;
    this.fault = !this.valid && (this.fault || sim.clock.now - (reading.lastGoodAt ?? this.startedAt) >= 5000);
    this.phase = this.valid ? 'VALID' : this.fault ? 'INVALID' : 'WAIT_FIRST';
    if (!this.valid && !this.wasInvalid) this.continuing = this.request === true && this.confirmedCooling(sim);
    if (this.valid) {
      const t = reading.value;
      if (t >= sim.config.coolingOn) this.request = true;
      else if (t < sim.config.coolingOff) this.request = false;
      else this.request ??= true; // D-092: без сохранённого запроса середина диапазона требует охлаждения.
      this.continuing = false;
      if (t >= sim.config.fanOverheat) this.hotSince ??= sim.clock.now;
      else this.hotSince = null;
      if (this.hotSince !== null && sim.clock.now - this.hotSince >= 5000) this.overheat = true;
      if (t < sim.config.fanOverheat - 10) this.overheat = false;
    } else this.hotSince = null; // Неизвестность не доказывает новый перегрев или снятие уже активного.
    if (sim.outputs.value('vfd.run') !== 'START' || sim.outputs.value('vfd.enable') !== true) this.continuing = false;
    this.wasInvalid = !this.valid;
    this.ownFault(sim, 'FAN_TEMPERATURE_UNAVAILABLE', this.fault, 'Нет достоверной температуры перед дымососом 5 с (D-021/D-093/D-094)');
    this.ownFault(sim, 'FAN_OVERHEAT', this.overheat, 'Перегрев дымососа (D-023)');
    this.observeWater(sim);
  }
  observeWater(sim) {
    // Для прямых каналов воды физическая достоверность нормализована испытателем.
    // Только резерв TUF имеет утверждённые независимые 5 с D-153/D-155.
    const primary = sim.signals.read('temperature.supply');
    const backup = sim.signals.tuf('temperature.backup');
    const returned = sim.signals.read('temperature.return');
    const selected = primary !== null ? primary : backup.value;
    const temperatures = [primary, backup.value, returned].filter(v => v !== null);
    const difference = primary !== null && backup.value !== null ? Math.abs(primary - backup.value) : null;
    this.water = { primary, backup: backup.value, backupStatus: backup, returned,
      selected, source: primary !== null ? 'PRIMARY' : backup.value !== null ? 'BACKUP' : null,
      delta: selected !== null && returned !== null ? selected - returned : null,
      protectionMaximum: temperatures.length ? Math.max(...temperatures) : null,
      supplyMissing: selected === null, difference };
    if (!this.differenceWarning) {
      this.clearSince = null;
      if (difference !== null && difference > 5) this.differenceSince ??= sim.clock.now;
      else this.differenceSince = null;
      if (this.differenceSince !== null && sim.clock.now - this.differenceSince >= 10000) {
        this.differenceWarning = true; this.differenceSince = null;
        sim.log('TEMPERATURE_DIFFERENCE', 'Расхождение подач >5 °C в течение 10 с; без запрета/выбора виновного датчика (D-152)');
      }
    } else {
      this.differenceSince = null;
      if (difference !== null && difference <= sim.config.supplyDifferenceClear) this.clearSince ??= sim.clock.now;
      else this.clearSince = null;
      if (this.clearSince !== null && sim.clock.now - this.clearSince >= 10000) {
        this.differenceWarning = false; this.clearSince = null;
        sim.log('TEMPERATURE_DIFFERENCE', 'Расхождение снято по непрерывной норме 10 с (D-152)');
      }
    }
  }
  enforce(sim, request) {
    if (!this.enabled) return;
    if (!this.valid) {
      request['shod.voltage'] = 10;
      if (!this.continuing) { request['vfd.run'] = 'STOP'; request['vfd.enable'] = false; }
      else if (request['vfd.run'] === 'START') request['vfd.frequency'] = sim.outputs.value('vfd.frequency');
    }
    if (this.overheat) request['shod.voltage'] = 10;
    // Не отменять запреты ПЧ/циркуляции и не включать насосы. Неохваченная сеть
    // останавливает вычисление до этой функции; удержание ШОД не заменяется 100%.
  }
  settings(sim, value) {
    if (!sim.engineering.enabled || !sim.hmiAvailable()) return ['Нужны инженерный режим и HMI'];
    const allowed = ['coolingOn', 'coolingOff', 'fanOverheat', 'supplyDifferenceClear'];
    if (!value || typeof value !== 'object' || Array.isArray(value) || !Object.keys(value).length || Object.keys(value).some(k => !allowed.includes(k))) return ['Неизвестные температурные настройки'];
    const c = { ...sim.config, ...value };
    if (!allowed.every(k => Number.isFinite(c[k])) || c.coolingOn < 30 || c.coolingOn > 130 ||
      c.coolingOff < 30 || c.coolingOff > 130 || c.coolingOff >= c.coolingOn ||
      c.fanOverheat < 140 || c.fanOverheat > 200 || c.supplyDifferenceClear < 1 || c.supplyDifferenceClear > 4.9) return ['Уставки вне утверждённых диапазонов/нарушен гистерезис'];
    if (c.supplyDifferenceClear !== sim.config.supplyDifferenceClear) this.clearSince = null;
    Object.assign(sim.config, value);
    return [];
  }
}
