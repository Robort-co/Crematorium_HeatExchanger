import test from 'node:test';
import assert from 'node:assert/strict';
import { running, deliver } from './helpers.mjs';
import { Simulation } from '../src/simulation.mjs';

function pressure(sim, before, after) {
  sim.signals.set('pressure.before', before, before === null ? 'UNKNOWN' : 'GOOD');
  sim.signals.set('pressure.after', after, after === null ? 'UNKNOWN' : 'GOOD'); sim.tick();
}
function trip() { const sim = running(); pressure(sim, 0.7, 1.5); sim.sampleGroup('pumpsOff'); return sim; }
function complete(sim) {
  sim.command('confirm_bypass_open'); sim.sampleGroup('stClosed'); deliver(sim); sim.sampleGroup('fanOff');
  assert.equal(sim.stoppedConfirmed(), true);
}

test('D-149: нормализация давления не заменяет актуальные разрешения и завершение ручных действий', () => {
  for (const block of [
    sim => sim.signals.set('configuration.ready', false),
    sim => sim.signals.set('configuration.ready', null, 'UNKNOWN'),
    sim => sim.signals.set('emergency', null, 'UNKNOWN'),
    sim => { sim.engineering.returnRequired[1] = true; },
    sim => { sim.engineering.breakerOffRequired[2] = true; }
  ]) {
    const sim = trip(); block(sim); pressure(sim, 1.5, 2);
    assert.equal(sim.state, 'STOPPING'); assert.equal(sim.recovery.active, null);
    assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
    assert.ok(sim.pressure.resumeReasons.length); assert.equal(sim.coverageGap, null);
  }
});
test('D-065/D-026: немедленный trip, 3 с сигнализации отдельно, гистерезис без нового таймера', () => {
  const sim = trip();
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.requests['valve1.direction'], 'OPEN');
  assert.equal(sim.pressure.lowAlarm, false); sim.advance(2900); assert.equal(sim.pressure.lowAlarm, false);
  sim.advance(100); assert.equal(sim.pressure.lowAlarm, true);
  pressure(sim, 0.99, 1.5); assert.equal(sim.pressure.lowTrip, true); assert.equal(sim.state, 'STOPPING');
  pressure(sim, 1, 1.5); assert.equal(sim.pressure.lowTrip, false); assert.equal(sim.pressure.lowAlarm, false); assert.equal(sim.state, 'STARTING');
});
test('D-149: раннее автоматическое восстановление проходит закрытие обоих и гидравлику без нового Пуска', () => {
  const sim = trip(); pressure(sim, 1.5, 2);
  assert.equal(sim.state, 'STARTING'); assert.equal(sim.main.stage, 'RECOVERY');
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('valve1.direction'), 'CLOSE');
  sim.sampleGroup('valvesClosed'); assert.equal(sim.outputs.value('pump1.run'), true);
  sim.sampleGroup('pump1On'); sim.advance(1000); sim.sampleGroup('valve1Open'); sim.advance(5000);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.pressure.stopPending, false); assert.equal(sim.pressure.restartBlocked, false);
  assert.equal(sim.protection.faults.some(f => f.code === 'LOW_PRESSURE'), false); assert.equal(sim.coverageGap, null);
});
test('D-149/D-112: раннее восстановление после давления допускает другую ветвь только после отказа закрытия 45 с', () => {
  const sim = trip(); pressure(sim, 1.5, 2); sim.advance(45000);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.valves.waits[1].remaining, 60000); assert.equal(sim.coverageGap, null);
});
test('D-149: подтверждение ШБ запрещает раннюю отмену; после полного останова нужен отдельный сброс и новый Пуск', () => {
  const sim = trip(); complete(sim); pressure(sim, 1.5, 1.5);
  assert.equal(sim.pressure.restartBlocked, true); assert.equal(sim.command('start').result, 'REJECTED');
  assert.equal(sim.command('reset_pressure_stop', true).result, 'ACCEPTED');
  assert.equal(sim.state, 'STOPPED'); assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.command('start').result, 'ACCEPTED');
});
for (const source of ['HMI', 'ARANGA', 'OTHER']) {
  test('D-149: независимый останов ' + source + ' во время давления остаётся обязательным после нормализации', () => {
    const sim = trip();
    if (source === 'HMI') assert.equal(sim.command('stop').result, 'ACCEPTED');
    else if (source === 'ARANGA') sim.arangaOperation('controls', { start: false, stop: true });
    else sim.protection.beginStop(sim, 'Отдельный обязательный останов');
    pressure(sim, 1.5, 2);
    assert.equal(sim.state, 'STOPPING'); assert.equal(sim.protection.stopIrreversible, true); assert.equal(sim.outputs.value('pump1.run'), false);
  });
}
test('D-148/D-149: одного канала после двух UNKNOWN недостаточно; нет фиктивного низкого давления', () => {
  const sim = running(); pressure(sim, null, null); sim.sampleGroup('pumpsOff');
  assert.equal(sim.pressure.lowTrip, false); assert.equal(sim.pressure.requireBoth, true);
  pressure(sim, 1.5, null); assert.equal(sim.state, 'STOPPING'); assert.equal(sim.pressure.trip, true);
  assert.equal(sim.protection.faults.some(f => f.code === 'LOW_PRESSURE'), false);
  pressure(sim, 1.5, 2); assert.equal(sim.state, 'STARTING'); assert.equal(sim.pressure.trip, false);
});
test('D-149: несколько причин давления сохраняются раздельно, сброс не снимает чужую критическую причину', () => {
  const sim = trip(); pressure(sim, null, null); complete(sim);
  assert.deepEqual(sim.pressure.stopCauses, ['LOW_PRESSURE', 'NO_PRESSURE_DATA']);
  pressure(sim, 1.5, null); assert.equal(sim.command('reset_pressure_stop', true).result, 'REJECTED');
  pressure(sim, 0.9, 1.5); assert.equal(sim.command('reset_pressure_stop', true).result, 'REJECTED');
  pressure(sim, 1, 1.5); sim.protection.fault(sim, 'INDEPENDENT_TEST_REASON', 'Посторонняя тестовая причина');
  assert.equal(sim.command('reset_pressure_stop', true).result, 'ACCEPTED');
  assert.ok(sim.protection.faults.some(f => f.code === 'INDEPENDENT_TEST_REASON')); assert.equal(sim.command('start').result, 'REJECTED');
});
test('D-149: ранний сброс/неизвестный OFF/недоступная HMI не разрешают восстановление', () => {
  const sim = running(); pressure(sim, 0.7, 1.5); pressure(sim, 1.5, 2);
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.command('reset_pressure_stop', true).result, 'REJECTED');
  sim.exchange.hmi = false; sim.lastHmiAt = null; sim.sampleGroup('pumpsOff');
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.outputs.value('pump1.run'), false);
});
test('D-026: высокое давление — 3 с и гистерезис 2,6 без отключения насоса', () => {
  const sim = running(); pressure(sim, 1.5, 2.9); sim.advance(2900); assert.equal(sim.pressure.highAlarm, false);
  sim.advance(100); assert.equal(sim.pressure.highAlarm, true); assert.equal(sim.outputs.value('pump1.run'), true); assert.equal(sim.state, 'RUNNING');
  pressure(sim, 1.5, 2.61); assert.equal(sim.pressure.highAlarm, true);
  pressure(sim, 1.5, 2.6); assert.equal(sim.pressure.highAlarm, false);
});
test('D-148: два неизвестных канала сохраняют прежние тревоги, один нормальный восстанавливает только абсолютный контроль', () => {
  const sim = running(); pressure(sim, 1.5, 2.9); sim.advance(3000); pressure(sim, null, null); sim.sampleGroup('pumpsOff');
  assert.equal(sim.pressure.highAlarm, true); pressure(sim, 1.5, null); assert.equal(sim.pressure.highAlarm, false);
  assert.equal(sim.pressure.trip, true); assert.equal(sim.state, 'STOPPING');
});

test('D-149: давление во время начального открытия ШТ не даёт включить насос до открытия и не обходит подтверждение ПЧ', () => {
  const sim = new Simulation(); sim.loadFixture(); sim.command('start'); pressure(sim, 0.7, 1.5); sim.sampleGroup('pumpsOff');
  pressure(sim, 1.5, 2); assert.equal(sim.state, 'STARTING'); assert.equal(sim.recovery.active.stage, 'WAIT_ST_OPEN');
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.sampleGroup('stOpen'); sim.sampleGroup('valvesClosed'); sim.sampleGroup('pump1On'); sim.advance(1000); sim.sampleGroup('valve1Open'); sim.sampleGroup('flowNormal'); sim.advance(5000);
  assert.equal(sim.state, 'STARTING'); // Доставка START и последующий ответ Работа ещё не даны.
  deliver(sim); sim.sampleGroup('fanOn');
  assert.equal(sim.state, 'STARTING'); sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.coverageGap, null);
});
