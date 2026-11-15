import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { running, deliver, position } from './helpers.mjs';

function newInputs(sim, st = 'stOpen') {
  sim.sampleGroup('bootPermits'); sim.sampleGroup('flowNormal'); sim.sampleGroup('pumpsOff'); sim.sampleGroup('fanOff');
  sim.sampleGroup(st); sim.sampleGroup('valve1Open'); sim.sampleGroup('valve2Closed');
  deliver(sim); sim.sampleGroup('fanOff');
}
function restored(sim, st = 'stOpen') { newInputs(sim, st); sim.advance(5000); assert.equal(sim.coverageGap, null); return sim; }
function circulated(sim) {
  sim.tick(); sim.sampleGroup('valvesClosed'); sim.sampleGroup('pump1On'); sim.advance(1000); sim.sampleGroup('valve1Open'); sim.advance(5000);
}

test('Reboot: перед циркуляцией повторно проверяются конфигурация и сохранённые ручные обязанности', () => {
  for (const block of [
    sim => sim.signals.set('configuration.ready', false),
    sim => sim.signals.set('configuration.ready', null, 'UNKNOWN'),
    sim => { sim.engineering.returnRequired[1] = true; },
    sim => { sim.engineering.breakerOffRequired[2] = true; }
  ]) {
    const sim = running(); sim.restart(); restored(sim); block(sim); sim.tick();
    assert.equal(sim.state, 'STOPPING'); assert.equal(sim.recovery.active, null);
    assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
    assert.ok(sim.boot.reasons.length); assert.equal(sim.coverageGap, null);
  }
});
test('D-150/D-162: старые данные не доказательство; 5 с сети, новая доставка STOP/Работа=0, после reboot остаётся обязательный останов', () => {
  const sim = running(); sim.restart();
  assert.equal(sim.state, null); assert.equal(sim.outputs.value('pump1.run'), null); assert.equal(sim.outputs.value('st.power'), false);
  assert.equal(sim.main.bypassClosed, false); assert.equal(sim.protection.bypassOpen, false);
  newInputs(sim); assert.equal(sim.outputs.value('st.power'), true); sim.advance(4900); assert.equal(sim.state, null);
  sim.advance(100); assert.equal(sim.state, 'STOPPING'); assert.equal(sim.protection.needsRestartContinue, true);
  assert.equal(sim.outputs.value('vfd.run'), 'STOP'); assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.command('start').result, 'REJECTED');
});
test('D-080/D-150: только циркуляция; ШБ и Продолжить отдельны, дымосос/обычная работа не возвращаются', () => {
  const sim = running(); sim.restart(); restored(sim); circulated(sim);
  assert.equal(sim.boot.circulationRestored, true); assert.equal(sim.state, 'STOPPING'); assert.equal(sim.outputs.value('vfd.run'), 'STOP');
  assert.equal(sim.outputs.value('pump1.run'), true); assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.command('continue_stop_after_restart').result, 'REJECTED');
  sim.command('confirm_bypass_open'); assert.equal(sim.outputs.value('st.direction'), 'STOP');
  assert.equal(sim.command('continue_stop_after_restart').result, 'ACCEPTED'); assert.equal(sim.outputs.value('st.direction'), 'CLOSE');
  sim.sampleGroup('stClosed'); sim.sampleGroup('valve1Closed'); sim.sampleGroup('pump1Off');
  assert.equal(sim.stoppedConfirmed(), true); assert.equal(sim.coverageGap, null);
});
test('D-150: уже закрытый ШТ не вызывает пуска насоса; старые контексты подтверждений отвергаются', () => {
  const sim = running(); sim.command('stop'); sim.command('confirm_bypass_open');
  const oldContext = sim.procedureId; sim.restart(); restored(sim, 'stClosed'); sim.tick();
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.command('confirm_bypass_open', undefined, oldContext).result, 'REJECTED');
  sim.command('confirm_bypass_open'); sim.command('continue_stop_after_restart');
  assert.equal(sim.state, 'STOPPED'); assert.equal(sim.outputs.value('pump1.run'), false);
});
test('Уточнение 15.11: один достоверный 0/0 после reboot допускает одну CLOSE 45 с и D-112 без возврата RUNNING', () => {
  const sim = running(); sim.restart(); newInputs(sim); position(sim, 1, false, false); sim.advance(5000); sim.tick();
  assert.equal(sim.outputs.value('valve1.direction'), 'CLOSE'); assert.equal(sim.outputs.value('pump1.run'), false);
  sim.advance(45000); assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), true);
  sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open'); sim.advance(5000);
  sim.command('confirm_valve_closed', 1);
  assert.equal(sim.boot.circulationRestored, true); assert.equal(sim.state, 'STOPPING'); assert.equal(sim.outputs.value('vfd.run'), 'STOP');
  assert.equal(sim.coverageGap, null);
});
for (const condition of ['UNKNOWN', 'CONTRADICTORY', 'BOTH_INTERMEDIATE', 'EXCLUDED']) {
  test('Reboot: согласование одного 0/0 не даёт обхода ' + condition, () => {
    const sim = running(); sim.restart(); newInputs(sim);
    if (condition === 'UNKNOWN') sim.signals.set('valve1.open', null, 'UNKNOWN');
    if (condition === 'CONTRADICTORY') position(sim, 1, true, true);
    if (condition === 'BOTH_INTERMEDIATE') { position(sim, 1, false, false); position(sim, 2, false, false); }
    if (condition === 'EXCLUDED') sim.pumps.branches[1].exclusions.push('CHECK_AFTER_LOW_FLOW');
    sim.advance(5000); sim.tick();
    assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
    assert.equal(sim.recovery.active, null); assert.ok(sim.boot.reasons.length);
  });
}
test('D-149/D-150: reboot исключает раннюю отмену давления; сохранённая причина требует закончить останов и сбросить отдельно', () => {
  const sim = running(); sim.signals.set('pressure.before', 0.7); sim.tick(); sim.restart(); restored(sim); sim.advance(1000);
  assert.equal(sim.pressure.stopPending, true); assert.equal(sim.state, 'STOPPING'); assert.equal(sim.recovery.active, null);
  sim.command('confirm_bypass_open'); sim.command('continue_stop_after_restart'); sim.sampleGroup('stClosed');
  assert.equal(sim.pressure.restartBlocked, true); assert.equal(sim.command('start').result, 'REJECTED');
  assert.equal(sim.command('reset_pressure_stop', true).result, 'ACCEPTED'); assert.equal(sim.state, 'STOPPED');
});
test('Reboot из STOPPED восстанавливает только подтверждённый останов, настройки и ошибки; тест сам не продолжается', () => {
  const sim = new Simulation(); sim.loadFixture(); sim.config.flowControl = false; sim.selectedPump = 2;
  sim.protection.fault(sim, 'SAVED_TEST_FAULT', 'Тестовая сохранённая причина');
  sim.restart(); restored(sim, 'stClosed');
  assert.equal(sim.state, 'STOPPED'); assert.equal(sim.config.flowControl, false); assert.equal(sim.selectedPump, 2);
  assert.ok(sim.protection.faults.some(f => f.code === 'SAVED_TEST_FAULT'));
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.engineering.active, null);
});
test('D-162: неизвестный/противоречивый ШТ и сохранённая блокировка не разрешают питание', () => {
  for (const kind of ['UNKNOWN', 'CONTRADICTORY', 'BLOCKED']) {
    const sim = running(); if (kind === 'BLOCKED') sim.protection.stBlocked = true;
    sim.restart(); sim.sampleGroup('bootPermits');
    if (kind === 'CONTRADICTORY') { sim.signals.set('st.open', true); sim.signals.set('st.closed', true); }
    if (kind === 'BLOCKED') sim.sampleGroup('stOpen');
    sim.tick(); assert.equal(sim.outputs.value('st.power'), false); assert.equal(sim.outputs.value('st.direction'), 'STOP');
  }
});
test('Непрочитанный снимок и повторный reboot не объявляют достоверное состояние, исправность или разрешение питания', () => {
  const sim = running(); sim.restart({ savedStateReadable: false }); restored(sim); sim.restart(); restored(sim);
  assert.equal(sim.state, null); assert.equal(sim.outputs.value('st.power'), false); assert.equal(sim.outputs.value('pump1.run'), null);
  assert.equal(sim.boot.phase, 'UNKNOWN_SAVED_STATE'); assert.equal(sim.command('start').result, 'REJECTED');
});
test('Reboot при 111 не выдаёт выдуманную начальную команду насосам; новый экземпляр модели не получает снимок памяти', () => {
  const sim = running(); sim.restart(); sim.sampleGroup('bootPermits'); sim.sampleGroup('pump1On'); sim.sampleGroup('pump2Off'); sim.advance(5000);
  assert.equal(sim.state, null); assert.equal(sim.outputs.value('pump1.run'), null);
  const fresh = new Simulation(); assert.equal(fresh.boot.readable, false); assert.equal(fresh.state, null);
});
test('D-257: простой/загрузка не расходуют остаток, тот же текущий запрос продолжает его; другой не наследует старую цель', () => {
  const sim = running(); position(sim, 2, false, false); sim.advance(5000); sim.advance(45000); sim.advance(12000);
  assert.equal(sim.valves.waits[2].remaining, 48000);
  sim.restart({ downtimeMs: 120000 }); restored(sim); sim.advance(5000);
  assert.equal(sim.valves.waits[2].remaining, 48000); assert.equal(sim.valves.waits[2].suspended, true);
  position(sim, 2, false, false);
  sim.valves.requestManual(sim, 2, 'CLOSED', 'STOP_CLOSE', null); // Контракт владельца текущего этапа, не самостоятельная команда HMI.
  sim.advance(1000); assert.equal(sim.valves.waits[2].remaining, 47000);
  sim.valves.requestManual(sim, 2, 'CLOSED', 'STOP_CLOSE', null); sim.advance(1000); assert.equal(sim.valves.waits[2].remaining, 46000);
  sim.restart(); sim.valves.requestManual(sim, 2, 'OPEN', 'STOP_OPEN', null);
  assert.equal(sim.valves.waits[2].target, 'OPEN'); assert.equal(sim.valves.waits[2].remaining, null);
});
