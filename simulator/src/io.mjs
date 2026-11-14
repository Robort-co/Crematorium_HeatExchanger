/** Только виртуальная доставка. Никаких MQTT, Modbus, serial, GPIO или IP оборудования. */
export class SimulatedOutputs {
  commands = {}; // Итоговые команды, отдельно от подтверждений их доставки.
  requests = {}; // Последний запрос основной программы/последовательности останова.
  sequence = 0; // Локальный идентификатор выдачи; не регистр Modbus и не watchdog ARANGA.
  constructor(clock, log, inputRevision) { // clock — время; log — журнал; inputRevision — порядок полученных входов.
    this.clock = clock; // Время изменения команды и доставки.
    this.log = log; // Независимый журнал выдачи.
    this.inputRevision = inputRevision; // Нужен новый ответ после выдачи/доставки, одного равенства времён недостаточно.
  }
  issue(name, value, owner) { // name/value — логический выход; owner — единственный разрешённый отправитель.
    if (owner !== 'protection') throw new Error('Выдача разрешена только защитной логике (D-323)');
    const previous = this.commands[name]; // Повтор уровня не создаёт новую команду и не сбрасывает таймер.
    if (previous && previous.value === value) return previous;
    const command = { id: ++this.sequence, value, issuedAt: this.clock.now,
      delivery: 'PENDING', deliveredAt: null, issuedInputRevision: this.inputRevision(), deliveryInputRevision: null }; // Исполнение определяется по входам.
    this.commands[name] = command;
    this.log('OUTPUT', name + ' = ' + value, { commandId: command.id });
    return command;
  }
  deliver(name, id, success = true) { // name/id — конкретная актуальная команда; success — ответ виртуального транспорта.
    const command = this.commands[name]; // Ответ нельзя применить к более новой выдаче.
    if (!command || command.id !== id) throw new Error('Устаревшее подтверждение доставки');
    command.delivery = success ? 'ACCEPTED' : 'ERROR';
    command.deliveredAt = this.clock.now;
    command.deliveryInputRevision = this.inputRevision();
    this.log('DELIVERY', name + ': ' + command.delivery, { commandId: id });
  }
  value(name) { return this.commands[name]?.value ?? null; } // name — выход; null означает неизвестную выдачу.
}
