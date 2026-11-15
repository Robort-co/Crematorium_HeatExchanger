import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { running, position } from './helpers.mjs';

function recovery(failed = 1) {
  const sim = new Simulation(); sim.loadRecoveryFixture(failed);
  sim.sampleGroup('valve' + (3 - failed) + 'Closed');
  sim.advance(45000);
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.outputs.value('pump' + failed + '.run'), false);
  assert.equal(sim.outputs.value('pump' + (3 - failed) + '.run'), true);
  return sim;
}
function circulated(sim, target) {
  sim.sampleGroup('pump' + target + 'On'); sim.advance(1000);
  sim.sampleGroup('valve' + target + 'Open'); sim.sampleGroup('flowNormal'); sim.advance(5000);
}
for (const failed of [1, 2]) {
  test('D-112/D-171: ветвь ' + failed + ' не включается, исправная включается после 45 с, OPEN через 1 с, завершение только с ручной изоляцией', () => {
    const sim = recovery(failed), target = 3 - failed;
    assert.equal(sim.valves.waits[failed].remaining, 60000);
    assert.equal(sim.outputs.value('valve' + failed + '.direction'), 'STOP');
    circulated(sim, target);
    assert.equal(sim.state, 'STARTING');
    assert.equal(sim.recovery.active.stage, 'CHECK_CIRCULATION');
    assert.equal(sim.command('confirm_valve_closed', failed).result, 'ACCEPTED');
    assert.equal(sim.state, 'RUNNING');
    assert.equal(sim.selectedPump, target);
    assert.ok(sim.pumps.branches[failed].faults.includes('VALVE_CLOSE_TIMEOUT_' + failed));
    assert.equal(sim.pumps.branches[target].faults.length, 0);
    assert.equal(sim.signals.position('valve' + failed), 'OPEN'); // Ручная отметка не переписала DI.
    assert.equal(sim.journal.some(entry => entry.kind === 'OUTPUT' && entry.message === 'pump' + failed + '.run = true'), false);
  });
}
test('D-112: до 45 с нет преждевременного обхода; нормальное закрытие включает выбранный насос', () => {
  const sim = new Simulation(); sim.loadRecoveryFixture(); sim.sampleGroup('valve2Closed'); sim.advance(44900);
  assert.equal(sim.outputs.value('pump2.run'), false);
  sim.sampleGroup('valve1Closed');
  assert.equal(sim.outputs.value('pump1.run'), true);
  circulated(sim, 1);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.coverageGap, null);
});
test('D-171: 60 с от запроса не продлеваются окном/повтором; позднее подтверждение останов не отменяет', () => {
  const sim = recovery(); circulated(sim, 2); sim.advance(53900);
  assert.equal(sim.valves.waits[1].remaining, 100);
  sim.valves.requestManual(sim, 1, 'CLOSED', 'RECOVERY_CLOSE');
  sim.advance(100);
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.protection.stopStage, 'WAIT_BYPASS');
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.pumps.branches[2].faults.length, 0);
  sim.command('confirm_valve_closed', 1);
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.coverageGap, null);
});
test('D-112: два отказа закрытия создают групповую аварию, насосы не включаются', () => {
  const sim = new Simulation(); sim.loadRecoveryFixture(); sim.advance(45000);
  assert.equal(sim.pumps.groupFault, true); assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.coverageGap, null);
});
test('D-112: низкая циркуляция исправной ранее ветви — отдельный диагноз и групповая авария, не ручное разрешение', () => {
  const sim = recovery(); sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open'); sim.advance(5000);
  assert.equal(sim.pumps.groupFault, true); assert.equal(sim.outputs.value('pump2.run'), false);
});
test('D-112: неизвестный Q не считается нулём и не завершает восстановление', () => {
  const sim = recovery(); sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open');
  sim.signals.set('flow', null, 'UNKNOWN'); sim.command('confirm_valve_closed', 1); sim.advance(5000);
  assert.equal(sim.state, 'STARTING'); assert.equal(sim.pumps.groupFault, false); assert.equal(sim.coverageGap, null);
});
test('D-112: защита давления прерывает восстановление; нормализация не выдаёт автоматический ON', () => {
  const sim = recovery(); sim.signals.set('pressure.before', 0.7); sim.tick();
  assert.equal(sim.outputs.value('pump2.run'), false); assert.equal(sim.recovery.active, null);
  sim.sampleGroup('flowNormal'); sim.advance(1000); assert.equal(sim.outputs.value('pump2.run'), false);
});
test('D-139: обычный пуск не получает специальный обход D-112', () => {
  const sim = new Simulation(); sim.loadFixture(); sim.command('start'); sim.sampleGroup('stOpen'); sim.sampleGroup('fanOn');
  sim.sampleGroup('valve2Closed'); sim.advance(45000);
  assert.equal(sim.recovery.active, null); assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
  assert.ok(sim.coverageGap);
});
test('D-175: заблокированный привод при полном останове — ручное закрытие, затем ручное открытие, без выдуманного таймаута', () => {
  const sim = running(); sim.pumps.branches[1].valveBlocked = true;
  sim.pumps.fail(sim, 1, 'VALVE_CLOSE_TIMEOUT_1', 'Имитируем ранее выявленную ошибку');
  position(sim, 1, false, false); sim.command('stop'); sim.command('confirm_bypass_open'); sim.sampleGroup('stClosed');
  assert.equal(sim.valves.waits[1].source, 'STOP_CLOSE'); assert.equal(sim.valves.waits[1].remaining, null);
  sim.advance(65000);
  assert.equal(sim.outputs.value('pump1.run'), true); assert.equal(sim.outputs.value('valve1.direction'), 'STOP'); assert.equal(sim.coverageGap, null);
  sim.command('confirm_valve_closed', 1);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.valves.waits[1].source, 'STOP_OPEN'); assert.equal(sim.pumps.branches[1].manualClosed, false);
  sim.command('confirm_valve_open', 1);
  assert.equal(sim.pumps.branches[1].manualOpen, 'PASSAGE'); assert.equal(sim.pumps.branches[1].valveBlocked, true);
});
