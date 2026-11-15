import test from 'node:test';
import assert from 'node:assert/strict';
import { running, position } from './helpers.mjs';

test('D-173: потеря открытия сразу не подтверждает проход; 5 с вызывают смену, краткий провал сбрасывается', () => {
  const sim = running();
  position(sim, 1, false, false); sim.advance(4900);
  assert.equal(sim.valves.passage(sim, 1), false);
  assert.equal(sim.pumps.active, null);
  position(sim, 1, true, false); sim.advance(100);
  position(sim, 1, false, false); sim.advance(4900);
  assert.equal(sim.pumps.active, null);
  sim.advance(100);
  assert.equal(sim.pumps.active.cause, 'VALVE_FAILURE');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.coverageGap, null);
});

test('D-173: без доступного резерва после 5 с обязателен останов; восстановление не отменяет', () => {
  const sim = running(); sim.pumps.branches[2].exclusions.push('CHECK_AFTER_LOW_FLOW');
  position(sim, 1, false, false); sim.advance(5000);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.pumps.groupFault, false);
  position(sim, 1, true, false);
  assert.equal(sim.state, 'STOPPING');
});

test('D-173: неожиданное достоверное закрытие немедленно выключает насос и запускает доступный резерв', () => {
  const sim = running(); position(sim, 1, false, true);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.ok(sim.pumps.branches[1].faults.includes('VALVE_UNEXPECTED_CLOSED_1'));
});

test('D-168: 1/1 5 с; специальное закрытие разрешено 45 с, насос остаётся ON до закрытия', () => {
  const sim = running(); position(sim, 1, true, true); sim.advance(4900);
  assert.equal(sim.pumps.active, null);
  sim.advance(100); sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open');
  sim.advance(44000);
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.pumps.active.oldOff, false);
  assert.equal(sim.command('confirm_valve_closed', 1).result, 'ACCEPTED');
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.signals.position('valve1'), 'CONTRADICTORY');
});

test('D-174: резерв сразу недоступен при 0/0; через 5 с одна попытка закрытия, успех ошибку не снимает', () => {
  const sim = running(); position(sim, 2, false, false);
  assert.ok(sim.pumps.reasons(sim, 2).length);
  sim.advance(5000);
  assert.equal(sim.outputs.value('valve2.direction'), 'CLOSE');
  assert.equal(sim.outputs.value('pump1.run'), true);
  position(sim, 2, false, true); sim.advance(5000);
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
  assert.ok(sim.pumps.branches[2].faults.includes('VALVE_LOST_CLOSED_2'));
  assert.equal(sim.command('switch_pump', 2).result, 'REJECTED');
});

test('D-174: 45+60 с не выключают рабочий насос напрямую; позднее закрытие не отменяет останов', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(5000); sim.advance(45000);
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
  assert.equal(sim.valves.waits[2].remaining, 60000);
  sim.advance(59900); assert.equal(sim.state, 'RUNNING');
  sim.advance(100); assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), true);
  sim.command('confirm_valve_closed', 2);
  assert.equal(sim.state, 'STOPPING');
  assert.ok(sim.protection.faults.some(fault => fault.code === 'VALVE_MANUAL_WAIT_TIMEOUT_2'));
});

test('D-174/D-258: своевременное ручное закрытие и ожидаемые недоступные DI не мешают исправной ветви', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(5000); sim.advance(45000);
  assert.equal(sim.command('confirm_valve_closed', 2).result, 'ACCEPTED');
  sim.signals.set('valve2.open', null, 'UNKNOWN'); sim.signals.set('valve2.closed', null, 'UNKNOWN'); sim.tick(); sim.advance(60000);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.pumps.branches[2].manualClosed, true);
});

test('D-257: перезапуск хранит остаток ручного ожидания; неизвестный этап не получает новые 60 с', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(5000); sim.advance(45000); sim.advance(12300);
  sim.restart();
  assert.equal(sim.valves.waits[2].remaining, 47700);
  assert.equal(sim.valves.waits[2].suspended, true);
  assert.equal(sim.state, null);
  assert.equal(sim.pumps.branches[2].manualClosed, false);
});

test('D-168/D-117: две реальные ошибки затворов создают групповую аварию, исключение проверки — нет', () => {
  const sim = running(); sim.pumps.fail(sim, 2, 'VALVE_TEST_2', 'Тестовая ранее установленная ошибка');
  position(sim, 1, true, true); sim.advance(5000);
  assert.equal(sim.pumps.groupFault, true);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
});

test('Давление старше диагностического движения резервного затвора', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(5000);
  sim.signals.set('pressure.before', 0.7); sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('valve2.direction'), 'OPEN');
  assert.equal(sim.valves.recoveries[2].done, true);
});

test('D-139/D-172: ограниченное ручное открытие после 45 с, затем отдельные 5 с гидравлики', () => {
  const sim = running(); // Новый отдельный искусственный запуск, не сброс ремонтной ошибки оператором.
  sim.loadFixture(); sim.command('start'); sim.sampleGroup('stOpen'); sim.sampleGroup('valvesClosed');
  for (const [name, command] of Object.entries(sim.outputs.commands)) if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
  sim.sampleGroup('fanOn'); sim.sampleGroup('pump1On'); sim.advance(1000);
  position(sim, 1, false, false); sim.advance(45000);
  assert.equal(sim.coverageGap, null); assert.equal(sim.valves.waits[1].remaining, 60000);
  assert.equal(sim.command('confirm_valve_open', 1).result, 'ACCEPTED');
  sim.sampleGroup('flowNormal'); sim.command('confirm_bypass_closed'); sim.advance(4900);
  assert.equal(sim.state, 'STARTING'); sim.advance(100); assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.signals.position('valve1'), 'INTERMEDIATE');
  assert.equal(sim.pumps.branches[1].manualOpen, 'RUN');
  assert.ok(sim.pumps.branches[1].faults.length);
});

test('D-177, согласование 15.11: новое OPEN против ручного CLOSED снимает отметку и требует останова через ШБ/ШТ', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(5000); sim.advance(45000);
  sim.command('confirm_valve_closed', 2); position(sim, 2, true, false);
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.protection.stopStage, 'WAIT_BYPASS');
  assert.equal(sim.pumps.branches[2].manualClosed, false);
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
  position(sim, 2, false, true);
  assert.equal(sim.state, 'STOPPING');
  sim.command('confirm_bypass_open'); sim.sampleGroup('stClosed');
  assert.equal(sim.outputs.value('pump1.run'), true);
  sim.sampleGroup('valve1Closed');
  assert.equal(sim.outputs.value('pump1.run'), false);
});

test('D-177: обратное противоречие ручному OPEN не получает автоматически согласование для CLOSED', () => {
  const sim = running(); sim.pumps.branches[2].valveBlocked = true;
  sim.pumps.branches[2].manualOpen = 'PASSAGE'; sim.pumps.branches[2].manualEvidencePosition = 'UNKNOWN';
  sim.tick();
  assert.match(sim.coverageGap, /вне согласованного случая/);
  assert.equal(sim.state, 'RUNNING');
});

test('D-174: краткое исчезновение резервного концевика не фиксирует неисправность и не создаёт закрывающий повтор', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(4900); position(sim, 2, false, true); sim.advance(5000);
  assert.deepEqual(sim.pumps.branches[2].faults, []);
  assert.equal(sim.valves.recoveries[2], undefined);
  assert.equal(sim.outputs.value('valve2.direction'), 'STOP');
});

test('D-176: обычное 1/1 в конце хода не продлевает исходные 45 с и ожидание начинается в исходный срок', () => {
  const sim = running(); sim.command('switch_pump', 2); sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open');
  sim.advance(42000); position(sim, 1, true, true); sim.advance(2000);
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  assert.equal(sim.pumps.active.manualRequestedAt, sim.clock.now);
  assert.equal(sim.outputs.value('pump1.run'), true);
});
