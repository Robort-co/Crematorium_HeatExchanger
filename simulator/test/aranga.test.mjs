import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';

function deliver(sim) { // sim — только тестовый транспорт; обратная связь по-прежнему подаётся независимо.
  for (const [name, command] of Object.entries(sim.outputs.commands)) { // name/command — ещё не подтверждённая запись.
    if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
  }
  sim.tick();
}
function controls(sim, start, stop = false) { // start/stop — два уровня в одной операции, проверка приоритета без порядка HTTP-вызовов.
  return sim.arangaOperation('controls', { start, stop });
}
function ready() {
  const sim = new Simulation(); // Новый мир, никаких сохранённых уровней Пуска или частоты.
  sim.loadFixture();
  assert.equal(sim.command('mode', 'ARANGA').result, 'ACCEPTED');
  sim.exchange.aranga = true; // Генератор только чтений 500 мс, не записи команды/частоты.
  sim.tick();
  return sim;
}
function prepared(mode = 'ARANGA') { // mode — источник запуска для проверки одинаковой подготовки механизмов.
  const sim = ready(); // Положения и значения явно задаются испытателем.
  if (mode === 'MANUAL') { sim.command('mode', 'MANUAL'); sim.command('start'); }
  else { controls(sim, false); assert.equal(controls(sim, true).result, 'ACCEPTED'); }
  deliver(sim);
  sim.sampleGroup('stOpen');
  sim.sampleGroup('valvesClosed');
  deliver(sim);
  sim.sampleGroup('fanOn');
  sim.sampleGroup('pump1On');
  sim.advance(1000);
  deliver(sim);
  sim.sampleGroup('valve1Open');
  sim.sampleGroup('flowNormal');
  sim.advance(5000);
  assert.equal(sim.main.preparationDone, true);
  assert.equal(sim.coverageGap, null);
  return sim;
}
function running(mode = 'ARANGA') {
  const sim = prepared(mode); // Закрытие ШБ остаётся отдельным ручным подтверждением.
  assert.equal(sim.command('confirm_bypass_closed').result, 'ACCEPTED');
  assert.equal(sim.state, 'RUNNING');
  return sim;
}
function finishStop(sim) {
  sim.command('confirm_bypass_open');
  deliver(sim);
  sim.sampleGroup('stClosed');
  deliver(sim);
  sim.sampleGroup('valve1Closed');
  deliver(sim);
  sim.sampleGroup('pumpsOff');
  sim.sampleGroup('fanOff');
  assert.equal(sim.stoppedConfirmed(), true);
}

test('ARANGA: после загрузки/отказанного Пуска нет очереди, нужны 0 → 1 и местные разрешения', () => {
  const sim = ready(); // Первую единицу нельзя трактовать как фронт с вымышленного нуля.
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
  assert.equal(sim.state, 'STOPPED');
  controls(sim, false);
  sim.signals.set('configuration.ready', false);
  assert.equal(controls(sim, true).result, 'REJECTED');
  sim.signals.set('configuration.ready', true);
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
  controls(sim, false);
  assert.equal(controls(sim, true).result, 'ACCEPTED');
  assert.equal(sim.state, 'STARTING');
  assert.equal(sim.command('mode', 'MANUAL').result, 'REJECTED');
});

test('Пуск HMI запрещён в сквозном; дистанционный Пуск запрещён в ручном, явный Стоп действует', () => {
  const sim = ready(); // Готовность HMI и ARANGA экспортируется раздельно.
  assert.equal(sim.command('start').result, 'REJECTED');
  sim.command('mode', 'MANUAL');
  controls(sim, false);
  assert.equal(controls(sim, true).result, 'REJECTED');
  assert.equal(sim.telemetry().ready, false);
  assert.ok(sim.telemetry().notReadyReasons.includes('Ручной режим'));
  sim.command('start');
  controls(sim, true, true);
  assert.equal(sim.state, 'STOPPING');
});

test('Стоп выше одновременного фронта Пуска; единица блокирует новый запуск до снятия и нового фронта', () => {
  const sim = ready(); // Стоп=1 принимается даже без предварительного нуля.
  controls(sim, false);
  controls(sim, true, true);
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.aranga.stopLevel, true);
  assert.ok(sim.startReasons('ARANGA').some(reason => reason.includes('Стоп')));
  controls(sim, true, false);
  assert.equal(sim.state, 'STOPPED');
  controls(sim, false);
  controls(sim, true);
  assert.equal(sim.state, 'STARTING');
});

test('Новый сквозной запуск держит Fmin до записи после В работе, без таймаута первой частоты', () => {
  const sim = prepared(); // Старое число записано ещё при Запуске.
  sim.arangaOperation('frequency', { value: 44 });
  sim.command('confirm_bypass_closed');
  assert.equal(sim.outputs.value('vfd.frequency'), 20);
  sim.advance(20000);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.outputs.value('vfd.frequency'), 20);
  assert.equal(sim.telemetry().frequencySource, 'FMIN');
  sim.arangaOperation('frequency', { value: 44 });
  assert.equal(sim.outputs.value('vfd.frequency'), 44);
  assert.equal(sim.telemetry().frequencySource, 'ARANGA');
});

test('Чтения ARANGA поддерживают обмен без частотных записей; HMI и неуспешные операции его не заменяют', () => {
  const sim = running(); // Никакого отдельного watchdog частотных записей.
  sim.arangaOperation('frequency', { value: 34 });
  sim.advance(20000);
  assert.equal(sim.outputs.value('vfd.frequency'), 34);
  assert.equal(sim.telemetry().arangaWarning, false);
  sim.exchange.aranga = false;
  sim.arangaOperation('failed');
  sim.advance(5000);
  assert.equal(sim.telemetry().arangaWarning, true);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.outputs.value('vfd.frequency'), 34);
  assert.equal(sim.aranga.startArmed, false);
});

test('Потеря рабочей ARANGA: удержание, местная корректировка, чтение не возвращает частоту, новая одинаковая запись возвращает', () => {
  const sim = running(); // Проверяем последний итог после LIMIT, а не устаревший необработанный регистр.
  sim.arangaOperation('frequency', { value: 80 });
  assert.equal(sim.outputs.value('vfd.frequency'), 50);
  sim.exchange.aranga = false;
  sim.advance(4999);
  assert.equal(sim.aranga.holding, false);
  sim.advance(1);
  assert.equal(sim.aranga.activeFrequency, 50);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.command('frequency', 32).result, 'ACCEPTED');
  assert.equal(sim.outputs.value('vfd.frequency'), 32);
  sim.arangaOperation('read');
  assert.equal(sim.aranga.available(sim), true);
  assert.equal(sim.aranga.holding, true);
  assert.equal(sim.outputs.value('vfd.frequency'), 32);
  assert.equal(sim.command('frequency', 33).result, 'ACCEPTED');
  sim.arangaOperation('frequency', { value: 80 });
  assert.equal(sim.outputs.value('vfd.frequency'), 50);
  assert.equal(sim.aranga.holding, false);
  assert.equal(sim.command('frequency', 31).result, 'REJECTED');
});

test('Неизвестное частотное значение не обнуляет задание и не подменяет время достоверной записи', () => {
  const sim = running(); // Время попытки и последнего хорошего значения расходятся.
  sim.arangaOperation('frequency', { value: 37 });
  const goodAt = sim.aranga.frequencyGoodAt; // Отметка последней корректной записи, а не любой активности.
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(sim.arangaOperation('frequency', { value: null }).result, 'REJECTED');
  assert.equal(sim.aranga.frequencyQuality, 'UNKNOWN');
  assert.equal(sim.aranga.frequencyGoodAt, goodAt);
  assert.equal(sim.aranga.frequencyUpdatedAt, sim.clock.now);
  assert.equal(sim.aranga.available(sim), false);
  assert.equal(sim.outputs.value('vfd.frequency'), 37);
});

test('Ручной режим не зависит от потери/возврата ARANGA; внешняя частота не вытесняет ручную', () => {
  const sim = running('MANUAL'); // История появления ARANGA не создаёт зависимости ручного сеанса.
  sim.command('frequency', 31);
  sim.arangaOperation('frequency', { value: 49 });
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.outputs.value('vfd.frequency'), 31);
  sim.arangaOperation('frequency', { value: 40 });
  assert.equal(sim.mode, 'MANUAL');
  assert.equal(sim.outputs.value('vfd.frequency'), 31);
  assert.equal(sim.telemetry().arangaWarning, false);
  assert.equal(sim.command('mode', 'ARANGA').result, 'REJECTED');
});

test('ARANGA → ручной берёт выдаваемую частоту, а не обратную связь; обратный переход в работе запрещён', () => {
  const sim = running(); // Фактические 20 Гц намеренно отличаются от выданных 36 Гц.
  sim.arangaOperation('frequency', { value: 36 });
  assert.equal(sim.signals.read('vfd.frequency'), 20);
  assert.equal(sim.command('mode', 'MANUAL').result, 'ACCEPTED');
  assert.equal(sim.manualFrequency, 36);
  assert.equal(sim.command('mode', 'ARANGA').result, 'REJECTED');
  sim.arangaOperation('frequency', { value: 48 });
  assert.equal(sim.outputs.value('vfd.frequency'), 36);
});

test('Потеря HMI и ARANGA в работе удерживает задание, местная корректировка недоступна', () => {
  const sim = running(); // D-330 не превращается в прежнюю аварийную частоту даже при двух потерях.
  sim.arangaOperation('frequency', { value: 35 });
  sim.exchange.hmi = false;
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.outputs.value('vfd.frequency'), 35);
  assert.equal(sim.command('frequency', 29).result, 'REJECTED');
  sim.arangaOperation('frequency', { value: 39 });
  assert.equal(sim.outputs.value('vfd.frequency'), 39);
  assert.equal(sim.hmiAvailable(), false);
});

test('Без HMI фронт Пуска отклонён; восстановление не воспроизводит его', () => {
  const sim = ready(); // Рабочий обмен ARANGA не заменяет доступность интерфейса управления.
  sim.exchange.hmi = false;
  sim.advance(5000);
  controls(sim, false);
  assert.equal(controls(sim, true).result, 'REJECTED');
  sim.exchange.hmi = true;
  sim.tick();
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
  assert.equal(sim.state, 'STOPPED');
  controls(sim, false);
  assert.equal(controls(sim, true).result, 'ACCEPTED');
});

test('Прерванный сквозной запуск: 5 с → обязательный останов и 38 Гц; новая частота не отменяет останов', () => {
  const sim = prepared(); // ШБ ещё не подтверждён, поэтому это не состояние В работе.
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('vfd.frequency'), 38);
  assert.notEqual(sim.outputs.value('st.direction'), 'CLOSE');
  sim.arangaOperation('read');
  assert.equal(sim.outputs.value('vfd.frequency'), 38);
  sim.arangaOperation('frequency', { value: 42 });
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('vfd.frequency'), 42);
  finishStop(sim);
  assert.equal(sim.outputs.value('vfd.run'), 'STOP');
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
});

for (const order of ['ARANGA_FIRST', 'HMI_FIRST']) { // order — оба порядка возникновения D-260/D-273; результат D-287 один.
  test('Совместная потеря при запуске, порядок ' + order + ': приоритет 25 Гц сохраняется после восстановления', () => {
    const sim = prepared(); // Работающая механика, незавершённое подтверждение ШБ.
    sim.exchange[order === 'ARANGA_FIRST' ? 'aranga' : 'hmi'] = false;
    sim.advance(5000);
    assert.equal(sim.outputs.value('vfd.frequency'), order === 'ARANGA_FIRST' ? 38 : 25);
    sim.exchange[order === 'ARANGA_FIRST' ? 'hmi' : 'aranga'] = false;
    sim.advance(5000);
    assert.equal(sim.outputs.value('vfd.frequency'), 25);
    sim.exchange.hmi = true;
    sim.arangaOperation('frequency', { value: 47 });
    assert.equal(sim.state, 'STOPPING');
    assert.equal(sim.outputs.value('vfd.frequency'), 25);
  });
}

test('Новая запись точно на истёкшем пусковом таймауте не скрывает обязательный останов', () => {
  const sim = prepared(); // Отдельный порядок событий при одной отметке часов.
  sim.exchange.aranga = false;
  sim.advance(4999);
  sim.clock.advance(1);
  sim.signals.refresh();
  sim.arangaOperation('frequency', { value: 43 });
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('vfd.frequency'), 43);
});

test('Потеря ARANGA до включения дымососа не создаёт START', () => {
  const sim = ready(); // ШТ в движении, дымосос ещё не получил разрешение пуска.
  controls(sim, false);
  controls(sim, true);
  sim.signals.set('st.closed', false);
  sim.tick();
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(sim.state, 'STOPPING');
  assert.notEqual(sim.outputs.value('vfd.run'), 'START');
});

test('Старый ранний регистр при восстановлении только чтения в прерванном запуске отмечен как пробел, не новая реакция', () => {
  const sim = prepared(); // Частота пришла до В работе и не была рабочим заданием D-295.
  sim.arangaOperation('frequency', { value: 44 });
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(sim.outputs.value('vfd.frequency'), 38);
  sim.arangaOperation('read');
  assert.match(sim.coverageGap, /ранней частоте/);
  assert.equal(sim.state, 'STOPPING');
  const pausedAt = sim.clock.now; // Физическое поведение за границей охвата не предсказывается.
  sim.advance(5000);
  assert.equal(sim.clock.now, pausedAt);
  assert.notEqual(sim.outputs.value('vfd.frequency'), 44);
});

test('Штатный Стоп ARANGA держит охлаждение, новые записи/Пуск/восстановление не отменяют процедуру', () => {
  const sim = running(); // Проверка D-262 отдельно от D-260.
  sim.arangaOperation('frequency', { value: 46 });
  controls(sim, true, true);
  const stopStage = sim.protection.stopStage; // Повтор не сбрасывает этап/контекст обязательного останова.
  const procedure = sim.procedureId; // Контекст для независимых подтверждений оператора.
  sim.arangaOperation('frequency', { value: 49 });
  controls(sim, true, true);
  assert.equal(sim.outputs.value('vfd.frequency'), 25);
  assert.equal(sim.procedureId, procedure);
  assert.equal(sim.protection.stopStage, stopStage);
  controls(sim, false, false);
  assert.equal(controls(sim, true).result, 'REJECTED');
  finishStop(sim);
  assert.equal(sim.state, 'STOPPED');
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
  controls(sim, false);
  assert.equal(controls(sim, true).result, 'ACCEPTED');
});

test('Потеря и восстановление обмена сбрасывают разрешение фронта, а новый запуск не берёт старую частоту', () => {
  const sim = ready(); // Нулевой уровень получен до потери, после неё требуется снова.
  controls(sim, false);
  sim.arangaOperation('frequency', { value: 48 });
  sim.exchange.aranga = false;
  sim.advance(5000);
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
  controls(sim, false);
  controls(sim, true);
  assert.equal(sim.aranga.activeFrequency, 20);
  sim.restart();
  assert.equal(sim.mode, 'ARANGA');
  assert.equal(sim.state, null);
  assert.equal(sim.aranga.startArmed, false);
  assert.equal(sim.aranga.frequencyValue, null);
  assert.equal(controls(sim, true).result, 'NO_CHANGE');
});

test('LIMIT/резонанс видны в телеметрии, фактическая частота с BAD не заменяется нулём', () => {
  const sim = running(); // Зона только синтетическая тестовая конфигурация.
  sim.config.resonance = { low: 28, high: 31, hysteresis: 1 };
  sim.arangaOperation('frequency', { value: 29 });
  assert.equal(sim.outputs.value('vfd.frequency'), 31);
  assert.equal(sim.telemetry().frequencyTreatment.resonanceApplied, true);
  sim.arangaOperation('frequency', { value: 80 });
  assert.equal(sim.telemetry().frequencyTreatment.limitApplied, true);
  sim.signals.set('vfd.frequency', 44, 'BAD');
  assert.equal(sim.telemetry().actualFrequency.value, null);
  assert.equal(sim.telemetry().actualFrequency.quality, 'BAD');
  assert.equal(sim.telemetry().state, 'RUNNING');
});
