import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';

function deliver(sim) { // sim — испытательный мир; доставка не изменяет обратную связь.
  for (const [name, command] of Object.entries(sim.outputs.commands)) { // name/command — конкретная виртуальная команда.
    if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
  }
  sim.tick();
}
function prepared() {
  const sim = new Simulation(); // Искусственная подготовка без замыкания выходов на входы.
  sim.loadFixture(); sim.command('start'); deliver(sim);
  sim.sampleGroup('stOpen'); sim.sampleGroup('valvesClosed'); deliver(sim);
  sim.sampleGroup('fanOn'); sim.sampleGroup('pump1On'); sim.advance(1000);
  sim.sampleGroup('valve1Open'); sim.sampleGroup('flowNormal'); sim.advance(5000);
  return sim;
}
function running() {
  const sim = prepared(); // Закрытие ШБ подтверждается отдельно.
  sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING');
  return sim;
}
function openReserve(sim) { // sim — уже принятая смена на ветвь 2.
  deliver(sim); sim.sampleGroup('pump2On'); sim.advance(1000); deliver(sim);
  sim.sampleGroup('valve2Open');
}
function closeOld(sim) { // sim — старый насос не обесточивается до отдельного подтверждения положения.
  sim.sampleGroup('valve1Closed');
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.sampleGroup('pump1Off');
}

test('Ручная смена 1→2 и обратно: перекрытие, 1 с, независимое закрытие, проверка через 5 с', () => {
  const sim = running(); // Исходно один насос, резерв закрыт.
  assert.equal(sim.command('switch_pump', 2).result, 'ACCEPTED');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.outputs.value('valve1.direction'), 'CLOSE');
  assert.notEqual(sim.outputs.value('valve2.direction'), 'OPEN');
  sim.sampleGroup('pump2On'); sim.advance(900);
  assert.notEqual(sim.outputs.value('valve2.direction'), 'OPEN');
  sim.advance(100);
  assert.equal(sim.outputs.value('valve2.direction'), 'OPEN');
  sim.sampleGroup('valve2Open'); closeOld(sim);
  sim.advance(4900); assert.equal(sim.selectedPump, 1);
  sim.advance(100); assert.equal(sim.selectedPump, 2);
  assert.equal(sim.pumps.active, null);
  assert.equal(sim.pumps.history.stage, 'COMPLETE');
  assert.equal(sim.command('switch_pump', 1).result, 'ACCEPTED');
  sim.sampleGroup('pump1On'); sim.advance(1000); sim.sampleGroup('valve1Open');
  sim.sampleGroup('valve2Closed'); sim.sampleGroup('pump2Off'); sim.advance(5000);
  assert.equal(sim.selectedPump, 1);
  assert.equal(sim.coverageGap, null);
});

test('Команда и доставка открытия не подтверждают резерв; повтор смены не перезапускает таймер', () => {
  const sim = running(); // Новая ветвь физически остаётся закрытой.
  sim.command('switch_pump', 2); deliver(sim); sim.sampleGroup('pump2On'); sim.advance(1000); deliver(sim);
  const startedAt = sim.pumps.active.startedAt; // Неизменяемая исходная отметка текущей попытки.
  assert.equal(sim.command('switch_pump', 2).result, 'REJECTED');
  sim.advance(5000);
  assert.equal(sim.selectedPump, 1);
  assert.equal(sim.pumps.active.openedAt, null);
  assert.equal(sim.pumps.active.startedAt, startedAt);
});

test('Смена запрещена при неизвестном или открытом затворе резерва, не создавая индивидуальную ошибку', () => {
  for (const position of ['UNKNOWN', 'OPEN']) { // position — два разных отсутствующих разрешения.
    const sim = running(); // Независимая попытка.
    if (position === 'OPEN') sim.sampleGroup('valve2Open');
    else sim.signals.set('valve2.closed', null, 'UNKNOWN', false, false);
    assert.equal(sim.command('switch_pump', 2).result, 'REJECTED');
    assert.equal(sim.outputs.value('pump2.run'), false);
    assert.equal(sim.pumps.branches[2].faults.length, 0);
  }
});

test('Низкий ΔP во время смены не вызывает прежнюю рабочую диагностику до открытия +5 с', () => {
  const sim = running(); // Маска только гидравлической проверки, не давления/электрических защит.
  sim.command('switch_pump', 2); sim.sampleGroup('pump2On'); sim.sampleGroup('flowZero');
  sim.advance(6000);
  assert.equal(sim.coverageGap, null);
  sim.sampleGroup('valve2Open'); closeOld(sim); sim.advance(4900);
  assert.equal(sim.coverageGap, null);
  sim.sampleGroup('flowNormal'); sim.advance(100);
  assert.equal(sim.selectedPump, 2);
});

test('45 с закрытия снимают движение, сохраняя насос; ручное подтверждение не меняет DI и не снимает ошибку', () => {
  const sim = running(); // Старый затвор остаётся в исходном положении.
  sim.command('switch_pump', 2); openReserve(sim); sim.advance(44000);
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  assert.equal(sim.pumps.active.manualRequestedAt, sim.clock.now);
  const deadlineBase = sim.pumps.active.manualRequestedAt; // Окно HMI не является новым отсчётом.
  sim.advance(1000); sim.command('switch_pump', 2);
  assert.equal(sim.pumps.active.manualRequestedAt, deadlineBase);
  assert.equal(sim.command('confirm_valve_closed', 1).result, 'ACCEPTED');
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.signals.position('valve1'), 'OPEN');
  assert.equal(sim.pumps.branches[1].manualClosed, true);
  assert.equal(sim.pumps.branches[1].valveBlocked, true);
  assert.ok(sim.pumps.branches[1].faults.length);
  assert.equal(sim.selectedPump, 2);
  sim.sampleGroup('pump1Off'); sim.advance(1000);
  assert.equal(sim.command('switch_pump', 1).result, 'REJECTED');
});

test('45+60 с: обязательный останов, позднее подтверждение не отменяет его; после ШТ нет новых 45 с старой ветви', () => {
  const sim = running(); // Старый насос разрешён до закрытия ШТ, если нет самостоятельной защиты.
  sim.command('switch_pump', 2); openReserve(sim); sim.advance(104000);
  assert.equal(sim.clock.now - sim.pumps.active.startedAt, 105000);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.notEqual(sim.outputs.value('st.direction'), 'CLOSE');
  assert.equal(sim.protection.bypassOpen, false);
  sim.command('confirm_bypass_open'); sim.sampleGroup('stClosed');
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP'); // Ручное вмешательство блокирует дистанционный привод.
  sim.sampleGroup('pump1Off'); sim.sampleGroup('valve2Closed');
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.pumps.branches[1].closeExhausted, true);
  assert.ok(sim.startReasons().some(reason => reason.includes('неисправности')));
});

test('Позднее ручное закрытие после 60 с учитывается, но останов остаётся обязательным', () => {
  const sim = running(); // Подтверждение пришло уже после начала останова.
  sim.command('switch_pump', 2); openReserve(sim); sim.advance(104000);
  sim.command('confirm_valve_closed', 1);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.pumps.branches[1].faults.length, 1);
  assert.ok(sim.protection.faults.some(fault => fault.code === 'VALVE_MANUAL_WAIT_TIMEOUT_1'));
});

test('Стоп во время перекрытия: оба насоса закрываются и выключаются независимо после ШТ', () => {
  const sim = running(); // Два насоса включены в принятой смене, старый ещё не изолирован.
  sim.command('switch_pump', 2); openReserve(sim);
  sim.command('stop');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.outputs.value('pump2.run'), true);
  sim.command('confirm_bypass_open'); sim.sampleGroup('stClosed');
  assert.equal(sim.outputs.value('valve1.direction'), 'CLOSE');
  assert.equal(sim.outputs.value('valve2.direction'), 'CLOSE');
  closeOld(sim);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump2.run'), true);
  sim.sampleGroup('valve2Closed'); sim.sampleGroup('pump2Off');
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.pumps.active, null);
  assert.equal(sim.outputs.value('valve1.direction'), 'OPEN');
  assert.equal(sim.outputs.value('valve2.direction'), 'OPEN');
});

test('Отсутствие фаз: OFF через 1 с, резерв только через дополнительные 2 с, ошибка не сбрасывается', () => {
  const sim = running(); // Индивидуальная электрическая причина при нормальной общей сети.
  sim.sampleGroup('pump1Off'); sim.advance(900);
  assert.equal(sim.outputs.value('pump1.run'), true);
  sim.advance(100);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.protection.faults.length, 0);
  sim.advance(1900); assert.equal(sim.outputs.value('pump2.run'), false);
  sim.advance(100); assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.pumps.active.cause, 'ELECTRICAL_FAILURE');
  openReserve(sim); closeOld(sim); sim.advance(5000);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.selectedPump, 2);
  assert.ok(sim.pumps.branches[1].faults.includes('PUMP_PHASES_ON_1'));
  sim.restart();
  assert.ok(sim.pumps.branches[1].faults.includes('PUMP_PHASES_ON_1'));
  assert.equal(sim.state, null);
  assert.equal(sim.outputs.value('pump1.run'), null);
});

test('Принятый первоначальный запуск может завершиться на исправном резерве', () => {
  const sim = prepared(); // Ожидается закрытие ШБ, это ещё не В работе.
  sim.sampleGroup('pump1Off'); sim.advance(3000); openReserve(sim); closeOld(sim); sim.advance(5000);
  sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.selectedPump, 2);
  assert.ok(sim.pumps.branches[1].faults.length);
});

test('Второй индивидуальный электрический отказ немедленно включает D-117/D-118 после своей диагностики', () => {
  const sim = running(); // Резерв физически также не получил напряжение.
  sim.sampleGroup('pump1Off'); sim.advance(3000); sim.tick(); sim.advance(3000);
  assert.equal(sim.pumps.groupFault, true);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.outputs.value('valve2.direction'), 'OPEN');
  assert.equal(sim.pumps.emergencyCirculationRequested, true);
  assert.equal(sim.protection.bypassOpen, false);
});

test('Общая сеть в окне классификации отменяет индивидуальную ошибку; полная сетевой реакция явно вне охвата', () => {
  const sim = running(); // Два события одной причины не должны создавать ложный отказ насоса.
  sim.sampleGroup('pump1Off'); sim.advance(2900);
  sim.signals.set('grid.normal', false); sim.advance(100);
  assert.equal(sim.pumps.branches[1].classificationAt, null);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  assert.ok(sim.coverageGap);
  assert.equal(sim.outputs.value('pump2.run'), false);
});

test('Напряжение при OFF: критический останов через 1 с без 2 с, затвор запрещён до ручного отключения и свежих 000', () => {
  const sim = running(); // Неожиданное напряжение на выключенном резерве — не доказательство залипания конкретного контактора.
  sim.sampleGroup('pump2On'); sim.advance(1000);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
  assert.equal(sim.command('confirm_pump_breaker_off', 2).result, 'REJECTED');
  sim.sampleGroup('pump2Off');
  assert.equal(sim.pumps.branches[2].isolationConfirmed, false);
  assert.equal(sim.command('confirm_pump_breaker_off', 2).result, 'ACCEPTED');
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.ok(sim.protection.faults.some(fault => fault.code === 'VOLTAGE_WHEN_OFF_2'));
});

test('Самостоятельная защита давления выключает оба насоса в середине смены', () => {
  const sim = running(); // Ни маска ΔP, ни ожидание закрытия не блокируют абсолютное давление.
  sim.command('switch_pump', 2); openReserve(sim);
  sim.signals.set('pressure.before', 0.7); sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.state, 'STOPPING');
  sim.signals.set('pressure.before', 1.5); sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false); // Незавершённая смена не является новым разрешением после защиты.
});

test('Повторное напряжение после ручной изоляции снова запрещает движение опасной ветви', () => {
  const sim = running(); // Условия разрешения движения должны оставаться выполненными.
  sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('pump2Off');
  sim.command('confirm_pump_breaker_off', 2);
  sim.sampleGroup('valve2Open'); sim.sampleGroup('pump2On');
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
  assert.equal(sim.state, 'STOPPING');
});

test('Неуспешное открытие резерва после отказа первой ветви даёт D-117 в том же цикле таймаута', () => {
  const sim = running(); // Уже есть индивидуальная ошибка насоса 1, затвор 2 не открылся.
  sim.sampleGroup('pump1Off'); sim.advance(3000); sim.sampleGroup('pump2On');
  sim.advance(1000); closeOld(sim); sim.advance(45000);
  assert.equal(sim.pumps.groupFault, true);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.coverageGap, null);
});

test('Нет обратной связи старого затвора: таймаут имеет отдельное основание NO_FEEDBACK', () => {
  const sim = running(); // Неизвестность не становится утверждением о физическом недоходе.
  sim.command('switch_pump', 2); openReserve(sim);
  sim.signals.set('valve1.open', null, 'UNKNOWN', false, false);
  sim.signals.set('valve1.closed', null, 'UNKNOWN', false, false);
  sim.advance(44000);
  assert.equal(sim.protection.faults.find(fault => fault.code === 'VALVE_CLOSE_TIMEOUT_1')?.evidence, 'NO_FEEDBACK');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.pumps.branches[1].manualClosed, false);
});

test('Общая потеря Q/ΔP при уже исключённом насосе не объявляет отказ второй ветви', () => {
  const sim = running(); // D-165 не заменяется подсчётом любых двух ошибок.
  sim.sampleGroup('pump1Off'); sim.advance(3000); openReserve(sim); closeOld(sim); sim.advance(5000);
  sim.signals.set('flow', null, 'UNKNOWN', false, false);
  sim.signals.set('pressure.before', null, 'UNKNOWN', false, false); sim.tick();
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.pumps.groupFault, false);
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.pumps.branches[2].faults.length, 0);
});

test('Старое HMI-подтверждение смены не переносится в другую процедуру', () => {
  const sim = running(); // Контекст до новой смены не разрешает ручное закрытие в её окне.
  const previous = sim.procedureId; // Старое отображение HMI.
  sim.command('switch_pump', 2); openReserve(sim); sim.advance(44000);
  assert.equal(sim.command('confirm_valve_closed', 1, previous).result, 'REJECTED');
  assert.equal(sim.pumps.branches[1].manualClosed, false);
  assert.equal(sim.outputs.value('pump1.run'), true);
});

test('Потеря открытия во время смены: без повторного OPEN, после 5 с диагноз и явная граница обратного резервирования', () => {
  const sim = running(); // Уже подтверждённый целевой концевик пропал до окончания смены.
  sim.command('switch_pump', 2); openReserve(sim);
  sim.signals.set('valve2.open', false); sim.tick();
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
  assert.equal(sim.selectedPump, 1);
  sim.advance(5000);
  assert.match(sim.coverageGap, /обратное резервирование/);
  assert.ok(sim.pumps.branches[2].faults.includes('VALVE_LOST_OPEN_2'));
});

test('Обычное 1/1 при смене: не подтверждает закрытие; движение снимается после 5 с D-176', () => {
  const sim = running(); // Положение сразу неопределённо, продолжение этого сценария не заявлено реализованным.
  sim.command('switch_pump', 2); sim.signals.set('valve1.closed', true); sim.tick();
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.pumps.active.oldOff, false);
  assert.equal(sim.outputs.value('pump1.run'), true);
  sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open'); sim.advance(4000);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
});

test('Низкое давление не теряет немедленный OFF из-за одновременно неизвестной фазной обратной связи', () => {
  const sim = running(); // Независимая защита давления выше неподтверждённого электрического диагноза.
  sim.signals.set('pump1.l1', null, 'UNKNOWN', false, false);
  sim.signals.set('pressure.before', 0.7); sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
});
