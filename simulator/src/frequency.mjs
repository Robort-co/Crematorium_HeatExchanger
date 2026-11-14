/** Чистая обработка задания. ARANGA-обмен ещё не реализован; эти правила общие для будущего адаптера. */
export class FrequencyPolicy {
  held = false; // Несохраняемый признак гистерезиса обхода резонанса, D-290.
  last = null; // Последняя обработка задания для индикации LIMIT/резонанса; не фактическая частота двигателя.
  constructor(config) { // config — допустимые Fmin/Fmax и результат инженерной проверки резонанса.
    this.config = config; // Ссылка на настройки конкретного экземпляра имитатора.
  }
  apply(value) { // value — частота в Гц; STOP сюда не передаётся и не превращается в Fmin.
    if (!Number.isFinite(value)) throw new Error('Частота должна быть конечным числом');
    const limited = Math.max(this.config.fmin, Math.min(this.config.fmax, value)); // LIMIT перед обходом резонанса.
    const zone = this.config.resonance; // null — только явно выбранная тестовая предпосылка отсутствия резонанса.
    if (zone && limited >= zone.low && limited < zone.high) this.held = true;
    if (zone && limited <= zone.low - zone.hysteresis) this.held = false;
    const output = zone && this.held && limited < zone.high ? zone.high : limited; // Применённое задание после двух независимых ограничений.
    this.last = { input: value, limited, output, limitApplied: limited !== value, resonanceApplied: output !== limited };
    return output;
  }
}
