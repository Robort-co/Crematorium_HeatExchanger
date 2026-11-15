import test from 'node:test';
import assert from 'node:assert/strict';
import { engineer, position } from './helpers.mjs';

function opened(sim = engineer(), pump = 1, manual = false) {
  if (!manual) sim.sampleGroup('valve' + (3 - pump) + 'Closed');
  assert.equal(sim.command('engineering_test', { kind: 'branch', pump, repaired: true }).result, 'ACCEPTED');
  sim.advance(100);
  assert.equal(sim.outputs.value('valve' + pump + '.direction'), 'CLOSE');
  assert.equal(sim.outputs.value('pump' + pump + '.run'), false);
  sim.sampleGroup('valve' + pump + 'Closed'); sim.advance(100);
  assert.equal(sim.outputs.value('pump' + pump + '.run'), true);
  sim.sampleGroup('pump' + pump + 'On'); sim.advance(1000);
  sim.sampleGroup('valve' + pump + 'Open'); sim.sampleGroup('flowNormal');
  assert.equal(sim.engineering.active.stage, 'HYDRAULICS');
  return sim;
}
function hydraulics(sim, pump = 1) {
  sim.advance(5000); sim.advance(100);
  assert.equal(sim.engineering.active.stage, 'FINAL_CLOSE');
  assert.equal(sim.outputs.value('pump' + pump + '.run'), true);
  assert.equal(sim.outputs.value('valve' + pump + '.direction'), 'CLOSE');
}
function finish(sim, pump = 1) {
  sim.sampleGroup('valve' + pump + 'Closed');
  assert.equal(sim.outputs.value('pump' + pump + '.run'), false);
  assert.equal(sim.engineering.active.stage, 'FINAL_OFF');
  sim.sampleGroup('pump' + pump + 'Off'); sim.advance(100);
  assert.equal(sim.outputs.value('valve' + pump + '.direction'), 'OPEN');
  sim.sampleGroup('valve' + pump + 'Open'); sim.advance(100);
}
for (const pump of [1, 2]) {
  test('D-251: объединённая ветвь ' + pump + ', реальный CLOSE/ON/OPEN/+5/гидравлика/CLOSE/OFF/000/OPEN, раздельный возврат', () => {
    const sim = opened(engineer(), pump); hydraulics(sim, pump); finish(sim, pump);
    assert.equal(sim.engineering.active, null);
    assert.equal(sim.engineering.results[pump].pump.result, 'PASSED');
    assert.equal(sim.engineering.results[pump].valve.result, 'PASSED');
    assert.equal(sim.state, 'STOPPED'); assert.equal(sim.telemetry().ready, false);
    assert.equal(sim.outputs.value('pump' + (3 - pump) + '.run'), false);
    for (const kind of ['valve', 'pump']) assert.equal(sim.command('engineering_return', { pump, kind }).result, 'ACCEPTED');
    assert.equal(sim.coverageGap, null);
  });
}
test('D-252: 45 с заключительного CLOSE немедленно OFF/STOP; успешные оценки насоса сохранены, ветвь не успешна, требуется ручное открытие', () => {
  const sim = opened(); hydraulics(sim); sim.advance(44900);
  assert.equal(sim.outputs.value('pump1.run'), true);
  sim.advance(100);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  assert.equal(sim.engineering.active.stage, 'WAIT_OFF');
  assert.equal(sim.engineering.results[1].pump, undefined);
  sim.sampleGroup('pump1Off');
  assert.equal(sim.engineering.active, null);
  assert.equal(sim.engineering.results[1].pump.electrical, 'PASSED'); assert.equal(sim.engineering.results[1].pump.hydraulic, 'PASSED');
  assert.equal(sim.engineering.results[1].pump.result, 'PASSED'); assert.equal(sim.engineering.results[1].pump.valid, false);
  assert.equal(sim.engineering.results[1].valve.result, 'FAILED'); assert.equal(sim.engineering.history.at(-1).result, 'FAILED');
  assert.equal(sim.valves.waits[1].source, 'ENGINEERING_OPEN');
  assert.equal(sim.command('engineering_leave').result, 'REJECTED');
  assert.equal(sim.command('confirm_valve_open', 1).result, 'REJECTED');
  sim.command('engineering_breaker_off', 1); sim.command('confirm_valve_open', 1);
  assert.equal(sim.pumps.branches[1].manualOpen, 'PASSAGE');
  assert.ok(sim.pumps.branches[1].faults.includes('VALVE_CLOSE_TIMEOUT_1'));
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP'); assert.equal(sim.outputs.value('pump2.run'), false); assert.equal(sim.coverageGap, null);
});
test('D-251: отсутствие новых 000 не выдаёт заключительный OPEN; напряжение при OFF диагностируется отдельно', () => {
  const sim = opened(); hydraulics(sim); sim.sampleGroup('valve1Closed'); sim.sampleGroup('pump1On'); sim.advance(1000);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP'); assert.equal(sim.engineering.active.stage, 'WAIT_OFF');
  assert.ok(sim.pumps.branches[1].faults.includes('VOLTAGE_WHEN_OFF_1')); assert.equal(sim.coverageGap, null);
});
test('D-251: низкий Q независимо от флага прерывает без заключительного CLOSE; неизвестный Q не создаёт гидравлический отказ', () => {
  for (const unknown of [false, true]) {
    const sim = opened(); sim.config.flowControl = false;
    sim.signals.set('flow', unknown ? null : 0, unknown ? 'UNKNOWN' : 'GOOD'); sim.advance(5000);
    assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
    sim.sampleGroup('pump1Off');
    assert.equal(sim.engineering.results[1].pump.hydraulic, unknown ? 'NOT_CHECKED' : 'FAILED');
    assert.equal(sim.pumps.branches[1].exclusions.includes('HYDRAULIC_TEST_FAILED'), !unknown);
  }
});
test('D-251: отмена/HMI/давление прерывают заключительное закрытие немедленно, не ждут 45 с', () => {
  for (const cause of ['HMI', 'PRESSURE', 'CANCEL']) {
    const sim = opened(); hydraulics(sim); position(sim, 1, false, false);
    if (cause === 'CANCEL') sim.command('engineering_stop');
    else if (cause === 'PRESSURE') { sim.signals.set('pressure.before', 0.7); sim.tick(); }
    else { sim.exchange.hmi = false; sim.advance(5000); }
    assert.equal(sim.outputs.value('pump1.run'), false);
    assert.equal(sim.outputs.value('valve1.direction'), cause === 'PRESSURE' ? 'OPEN' : 'STOP');
    sim.sampleGroup('pump1Off'); assert.equal(sim.engineering.active, null);
    assert.equal(sim.engineering.history.at(-1).result, 'NOT_CHECKED'); assert.equal(sim.coverageGap, null);
  }
});
test('D-251: ручная изоляция расходуется одной попыткой; обязанность вернуть нижний кран остаётся после успешного теста', () => {
  const sim = engineer(); sim.command('engineering_isolate', 2); sim.command('engineering_confirm_isolation', 2);
  opened(sim, 1, true); hydraulics(sim); finish(sim);
  assert.equal(sim.engineering.manualIsolation, null); assert.equal(sim.engineering.returnRequired[2], true);
  assert.equal(sim.command('engineering_return', { kind: 'pump', pump: 1 }).result, 'REJECTED');
  sim.command('engineering_confirm_return', 2);
  assert.equal(sim.command('engineering_return', { kind: 'pump', pump: 1 }).result, 'ACCEPTED');
});
test('D-176/D-252: 1/1 пять секунд в заключительном ходе — ошибка затвора, OFF без самопроизвольного реверса', () => {
  const sim = opened(); hydraulics(sim); position(sim, 1, true, true); sim.advance(5000);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  sim.sampleGroup('pump1Off'); assert.equal(sim.engineering.results[1].valve.result, 'FAILED'); assert.equal(sim.coverageGap, null);
});
