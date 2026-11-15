/** Программные входы имитатора. Здесь нет адресов, каналов и доступа к WB. */
export const DEFINITIONS = { // Названия, типы и единицы нормализованных входов; pressure/flow уже в инженерных единицах.
  'st.open': ['ШТ: открыт', 'bool'],
  'st.closed': ['ШТ: закрыт', 'bool'],
  'shod.feedback': ['ШОД: исходная обратная связь', 'number', 'В', 0, 10],
  'valve1.open': ['Затвор 1: открыт', 'bool'],
  'valve1.closed': ['Затвор 1: закрыт', 'bool'],
  'valve2.open': ['Затвор 2: открыт', 'bool'],
  'valve2.closed': ['Затвор 2: закрыт', 'bool'],
  'pump1.l1': ['Насос 1: напряжение L1', 'bool'],
  'pump1.l2': ['Насос 1: напряжение L2', 'bool'],
  'pump1.l3': ['Насос 1: напряжение L3', 'bool'],
  'pump2.l1': ['Насос 2: напряжение L1', 'bool'],
  'pump2.l2': ['Насос 2: напряжение L2', 'bool'],
  'pump2.l3': ['Насос 2: напряжение L3', 'bool'],
  'pressure.before': ['Давление до НГ', 'number', 'бар', 0, 4],
  'pressure.after': ['Давление после НГ', 'number', 'бар', 0, 4],
  'flow': ['Расход TUF через ТО', 'number', 'м³/ч'],
  'vfd.running': ['ПЧ: Работа', 'bool'],
  'vfd.frequency': ['ПЧ: фактическая частота', 'number', 'Гц', 0],
  'vfd.fault': ['ПЧ: собственная авария', 'bool'],
  'vfd.exchange': ['ПЧ: обязательный цикл обмена исправен', 'bool'],
  'emergency': ['Кнопка Авария нажата', 'bool'],
  'grid.normal': ['Норма сети — результат внешнего для v0.1 алгоритма', 'bool'],
  'temperature.normal': ['Температурные разрешения — тестовая предпосылка', 'bool'],
  'temperature.fan': ['Перед дымососом: нормализованная температура', 'number', '°C'],
  'temperature.supply': ['Подача: основной датчик, нормализованный', 'number', '°C'],
  'temperature.backup': ['Подача: резерв TUF, нормализованный', 'number', '°C'],
  'temperature.return': ['Обратка: нормализованная температура', 'number', '°C'],
  'cooling.required': ['Запрос охлаждения — тестовая предпосылка', 'bool'],
  'configuration.ready': ['Конфигурация/тесты/прочие разрешения — предпосылка', 'bool'],
};

/** Часы модели задаются извне; Date.now и реальные задержки в ядре отсутствуют. */
export class ManualClock {
  now = 0; // Модельное время, мс от начала экземпляра; не календарное время.
  advance(ms) { // ms — положительное приращение модельного времени.
    if (!Number.isFinite(ms) || ms < 0) throw new Error('Недопустимое приращение времени');
    this.now += ms;
  }
}

/** Хранилище с раздельными обновлением, достоверностью и последним хорошим значением. */
export class SignalStore {
  revision = 0; // Порядок ответов различает события даже при одинаковом модельном времени.
  values = {}; // Текущие образцы; отсутствие записи никогда не подменяется false/нулём.
  constructor(clock) { // clock — управляемые монотонные часы имитатора.
    this.clock = clock; // Единый источник времени для измерений и таймеров.
    for (const name of Object.keys(DEFINITIONS)) { // name — условное имя входа.
      this.values[name] = { value: null, quality: 'UNKNOWN', fresh: false,
        updatedAt: null, lastGoodAt: null, lastGoodValue: null,
        diagnosticSince: null, repeat: false, revision: 0, lastGoodRevision: 0 };
    }
  }
  set(name, value, quality = 'GOOD', fresh = true, repeat = true) {
    // name/value — вход и образец; quality/fresh — независимые признаки; repeat — генератор повторных ответов.
    const definition = DEFINITIONS[name]; // Описание типа и измерительных пределов.
    if (!definition) throw new Error('Неизвестный сигнал: ' + name);
    if (!['GOOD', 'BAD', 'UNKNOWN'].includes(quality)) throw new Error('Неверное качество');
    if (typeof fresh !== 'boolean' || typeof repeat !== 'boolean') throw new Error('Признаки должны быть boolean');
    if (value !== null && (definition[1] === 'bool' ? typeof value !== 'boolean' : !Number.isFinite(value))) {
      throw new Error('Значение не соответствует типу ' + name);
    }
    if (quality === 'GOOD' && value === null) throw new Error('GOOD требует значения');
    const sample = this.values[name]; // Существующий образец и сохранённое последнее достоверное значение.
    const rangeValid = definition[1] !== 'number' || value === null || // Попадание образца в известные измерительные пределы; не технологическое разрешение.
      ((definition[3] === undefined || value >= definition[3]) && (definition[4] === undefined || value <= definition[4]));
    // Выход за измерительный диапазон — недостоверность, а не вымышленный физический ноль (D-148).
    if (!rangeValid) quality = 'BAD';
    sample.value = value;
    sample.quality = quality;
    sample.fresh = fresh;
    sample.repeat = repeat;
    sample.updatedAt = this.clock.now;
    sample.revision = ++this.revision;
    if (quality === 'GOOD' && fresh) {
      sample.lastGoodAt = this.clock.now;
      sample.lastGoodValue = value;
      sample.lastGoodRevision = sample.revision;
      sample.diagnosticSince = null;
    } else if (quality === 'BAD' && sample.diagnosticSince === null &&
      (fresh || !['flow', 'temperature.backup'].includes(name))) {
      // D-155: таймер TUF запускает новый полученный диагностический ответ,
      // а не показ старой/несвежей ошибки. UNKNOWN и другой параметр его не сбрасывают.
      sample.diagnosticSince = this.clock.now;
    }
  }
  refresh() {
    // Повторяется только явно включённый генератор ответов. Команды выходов здесь не читаются.
    for (const [name, sample] of Object.entries(this.values)) { // name — канал; sample — режим его генератора.
      if (sample.repeat) this.set(name, sample.value, sample.quality, sample.fresh, true);
    }
  }
  get(name) { return this.values[name]; } // name — условное имя входа.
  read(name) { // name — вход; null означает отсутствие пригодного значения.
    if (name === 'cooling.required') { const derived = this.coolingRequest?.(); if (derived !== undefined) return derived; }
    if (name === 'temperature.backup') return this.tuf(name).value;
    const sample = this.values[name]; // Последний образец данного входа.
    if (name === 'flow') return this.flow().value;
    return sample?.quality === 'GOOD' && sample.fresh ? sample.value : null;
  }
  flow() {
    return this.tuf('flow');
  }
  retainedTemperature(name) { // D-094: BAD/отсутствие ответа не освежают последнее корректное измерение.
    const sample = this.values[name];
    const usable = sample.lastGoodAt !== null && this.clock.now - sample.lastGoodAt < 5000;
    return { value: usable ? sample.lastGoodValue : null, usable,
      held: usable && (sample.quality !== 'GOOD' || !sample.fresh || sample.updatedAt !== this.clock.now),
      lastGoodAt: sample.lastGoodAt, quality: sample.quality };
  }
  tuf(name) {
    if (!['flow', 'temperature.backup'].includes(name)) throw new Error('Неизвестный нормализованный канал TUF');
    const sample = this.values[name]; // D-153/D-155: отдельные данные и таймеры расхода/резервной температуры.
    const freshnessDeadline = sample.lastGoodAt === null ? null : sample.lastGoodAt + 5000;
    const diagnosticDeadline = sample.diagnosticSince === null ? null : sample.diagnosticSince + 5000;
    const freshnessExpired = freshnessDeadline !== null && this.clock.now >= freshnessDeadline;
    const diagnosticExpired = diagnosticDeadline !== null && this.clock.now >= diagnosticDeadline;
    const recent = freshnessDeadline !== null && !freshnessExpired;
    const diagnosing = diagnosticDeadline !== null;
    const diagnosticAlive = !diagnosticExpired;
    const usable = recent && diagnosticAlive && sample.fresh && sample.quality !== 'UNKNOWN'; // UNKNOWN не превращается в нулевой расход.
    // Оба срока проверяются в одном чтении: истёкший срок свежести никогда
    // не получает ещё 5 с ожидания диагностики. Данные/выдержки каналов не объединяются.
    const reasons = [];
    if (sample.lastGoodAt === null) reasons.push('NO_CORRECT_VALUE');
    if (freshnessExpired) reasons.push('FRESHNESS_EXPIRED');
    if (diagnosticExpired) reasons.push('DIAGNOSTIC_EXPIRED');
    if (!sample.fresh || sample.quality === 'UNKNOWN') reasons.push('EXPLICIT_UNUSABLE');
    return { value: usable ? sample.lastGoodValue : null,
      held: usable && (diagnosing || sample.updatedAt !== this.clock.now),
      quality: sample.quality, usable, updatedAt: sample.updatedAt, lastGoodAt: sample.lastGoodAt,
      diagnosticSince:sample.diagnosticSince, diagnosing, freshnessDeadline, diagnosticDeadline,
      freshnessExpired, diagnosticExpired,
      freshnessRemainingMs:freshnessDeadline === null ? null : Math.max(0,freshnessDeadline-this.clock.now),
      diagnosticRemainingMs:diagnosticDeadline === null ? null : Math.max(0,diagnosticDeadline-this.clock.now), reasons };
  }
  position(mechanism) { // mechanism — st, valve1 или valve2.
    const open = this.read(mechanism + '.open'); // Независимое подтверждение открытия.
    const closed = this.read(mechanism + '.closed'); // Независимое подтверждение закрытия.
    if (open === null || closed === null) return 'UNKNOWN';
    if (open && closed) return 'CONTRADICTORY';
    return open ? 'OPEN' : closed ? 'CLOSED' : 'INTERMEDIATE';
  }
  phases(pump) { // pump — номер ветви 1 или 2.
    const values = ['l1', 'l2', 'l3'].map(phase => this.read('pump' + pump + '.' + phase)); // Три раздельных фазных показания.
    return values.some(value => value === null) ? null : values;
  }
}
