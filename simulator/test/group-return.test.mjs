import test from 'node:test';
import assert from 'node:assert/strict';
import { running, deliver, valveTestPassed, pumpTestOpened } from './helpers.mjs';

function groupStopped() {
  const sim = running();
  for (const pump of [1, 2]) sim.pumps.fail(sim, pump, 'VALVE_CLOSE_TIMEOUT_' + pump, 'Имитируем ранее установленный отказ закрытия');
  sim.tick(); sim.sampleGroup('pumpsOff');
  assert.equal(sim.pumps.groupFault, true);
  sim.command('confirm_bypass_open'); sim.sampleGroup('stClosed'); deliver(sim); sim.sampleGroup('fanOff');
  assert.equal(sim.stoppedConfirmed(), true);
  assert.equal(sim.command('engineering_enter', true).result, 'ACCEPTED');
  sim.sampleGroup('valve1Open'); sim.sampleGroup('valve2Open');
  return sim;
}
function returnAll(sim) {
  for (const pump of [1, 2]) {
    valveTestPassed(sim, pump);
    assert.equal(sim.command('engineering_return', { pump, kind: 'valve' }).result, 'ACCEPTED');
  }
  for (const pump of [1, 2]) {
    pumpTestOpened(sim, pump); sim.sampleGroup('flowNormal'); sim.advance(5000); sim.sampleGroup('pump' + pump + 'Off');
    assert.equal(sim.engineering.results[pump].pump.result, 'PASSED');
    assert.equal(sim.command('engineering_return', { pump, kind: 'pump' }).result, 'ACCEPTED');
  }
}
test('D-116: реальный модельный останов, проверки обеих ветвей, раздельные возвраты, выход и отдельный сброс; Q=0 при OFF допустим', () => {
  const sim = groupStopped();
  assert.equal(sim.command('reset_pump_group', true).result, 'REJECTED');
  returnAll(sim);
  assert.equal(sim.pumps.groupFault, true);
  assert.equal(sim.command('reset_pump_group', true).result, 'REJECTED');
  sim.sampleGroup('flowZero'); sim.command('engineering_leave');
  assert.equal(sim.command('reset_pump_group', true).result, 'ACCEPTED');
  assert.equal(sim.pumps.groupFault, false); assert.equal(sim.pumps.emergencyCirculationRequested, false);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.state, 'STOPPED'); assert.equal(sim.command('start').result, 'ACCEPTED');
  assert.equal(sim.coverageGap, null);
});
test('D-116: один возврат, новая неисправность и моделируемый reboot не дают сбросить групповую причину', () => {
  const sim = groupStopped(); valveTestPassed(sim); sim.command('engineering_return', { pump: 1, kind: 'valve' });
  sim.command('engineering_leave'); assert.equal(sim.command('reset_pump_group', true).result, 'REJECTED');
  sim.command('engineering_enter', true); returnAll(sim);
  sim.pumps.fail(sim, 1, 'VALVE_LOST_OPEN_1', 'Новая неисправность после возврата');
  assert.equal(sim.pumps.groupReturns[1].valve, false); assert.equal(sim.pumps.groupReturns[1].pump, false);
  sim.command('engineering_leave'); assert.equal(sim.command('reset_pump_group', true).result, 'REJECTED');
  sim.restart(); assert.equal(sim.pumps.groupFault, true);
  assert.equal(sim.command('reset_pump_group', true).result, 'REJECTED');
});
test('D-116: сброс группы не сбрасывает другую критическую причину и не запускает насос', () => {
  const sim = groupStopped(); returnAll(sim); sim.command('engineering_leave');
  sim.protection.fault(sim, 'OTHER_CRITICAL_TEST', 'Независимая тестовая фиксация');
  assert.equal(sim.command('reset_pump_group', true).result, 'ACCEPTED');
  assert.ok(sim.protection.faults.some(f => f.code === 'OTHER_CRITICAL_TEST'));
  assert.equal(sim.command('start').result, 'REJECTED');
});
test('D-012: низкая гидравлика новой ветви возвращает доступную прежнюю OFF/000/CLOSED; проверка результата остаётся обязательной', () => {
  const sim = running(); sim.command('switch_pump', 2);
  sim.sampleGroup('pump2On'); sim.sampleGroup('valve1Closed'); sim.sampleGroup('pump1Off'); sim.advance(1000);
  sim.sampleGroup('valve2Open'); sim.sampleGroup('flowZero'); sim.advance(5000);
  assert.equal(sim.pumps.active.from, 2); assert.equal(sim.pumps.active.to, 1); assert.equal(sim.coverageGap, null);
  sim.tick(); assert.equal(sim.outputs.value('pump1.run'), true);
  sim.sampleGroup('pump1On'); sim.sampleGroup('valve2Closed'); sim.sampleGroup('pump2Off'); sim.advance(1000);
  sim.sampleGroup('valve1Open'); sim.sampleGroup('flowNormal'); sim.advance(5000);
  assert.equal(sim.selectedPump, 1); assert.equal(sim.pumps.active, null); assert.equal(sim.state, 'RUNNING');
  assert.ok(sim.pumps.branches[2].faults.includes('HYDRAULIC_LOW_2')); assert.equal(sim.pumps.groupFault, false);
});
test('Обратное резервирование: независимая защита давления старше попытки возвращения', () => {
  const sim = running(); sim.command('switch_pump', 2); sim.sampleGroup('pump2On');
  sim.sampleGroup('valve1Closed'); sim.sampleGroup('pump1Off'); sim.advance(1000); sim.sampleGroup('valve2Open'); sim.sampleGroup('flowZero'); sim.advance(5000);
  sim.signals.set('pressure.before', 0.7); sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false); assert.equal(sim.pumps.active, null);
});

for (const cause of ['ELECTRICAL', 'VALVE']) {
  test('Обратный переход после ' + cause + ': прежняя ветвь OFF/000/CLOSED не объявляется отказавшей', () => {
    const sim = running(); sim.command('switch_pump', 2); sim.sampleGroup('pump2On');
    sim.sampleGroup('valve1Closed'); sim.sampleGroup('pump1Off'); sim.advance(1000); sim.sampleGroup('valve2Open');
    if (cause === 'ELECTRICAL') { sim.sampleGroup('pump2Off'); sim.advance(3000); }
    else { sim.sampleGroup('valve2Closed'); }
    assert.equal(sim.coverageGap, null); assert.equal(sim.pumps.groupFault, false);
    assert.equal(sim.pumps.active.to, 1); assert.equal(sim.outputs.value('pump1.run'), true);
    assert.equal(sim.outputs.value('pump2.run'), false);
    assert.equal(sim.pumps.branches[1].faults.length, 0); assert.ok(sim.pumps.branches[2].faults.length);
  });
}
