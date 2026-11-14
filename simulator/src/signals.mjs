/** Программные входы имитатора. Здесь нет адресов, каналов и доступа к WB. */
export const DEFINITIONS = { // Названия, типы и единицы нормализованных входов; pressure/flow уже в инженерных единицах.
  'st.open': ['ШТ: открыт', 'bool'],
  'st.closed': ['ШТ: закрыт', 'bool'],
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
    } else if (quality === 'BAD' && sample.diagnosticSince === null) {
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
    const sample = this.values[name]; // Последний образец данного входа.
    if (name === 'flow') return this.flow().value;
    return sample?.quality === 'GOOD' && sample.fresh ? sample.value : null;
  }
  flow() {
    const sample = this.values.flow; // Только расход; резервная температура будет отдельным каналом.
    const recent = sample.lastGoodAt !== null && this.clock.now - sample.lastGoodAt < 5000; // D-153: независимые 5 с актуальности.
    const diagnosing = sample.diagnosticSince !== null; // Диагностика может приходить при исправной связи.
    const diagnosticAlive = !diagnosing || this.clock.now - sample.diagnosticSince < 5000; // D-155: повторы ошибки не продлевают таймер.
    const usable = recent && diagnosticAlive && sample.fresh && sample.quality !== 'UNKNOWN'; // UNKNOWN не превращается в нулевой расход.
    return { value: usable ? sample.lastGoodValue : null,
      held: usable && (diagnosing || sample.updatedAt !== this.clock.now),
      quality: sample.quality, usable, updatedAt: sample.updatedAt, lastGoodAt: sample.lastGoodAt };
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
