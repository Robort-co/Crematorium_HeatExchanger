import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { engineer, pumpTestOpened, valveTestPassed, position } from './helpers.mjs';

test('D-179/D-254: STOPPED не доказывает выключенную печь; инженерный режим запрещает обычный/ARANGA пуск', () => {
  const sim = new Simulation(); sim.loadFixture();
  assert.equal(sim.command('engineering_enter', false).result, 'REJECTED');
  assert.equal(sim.command('engineering_enter', true).result, 'ACCEPTED');
  assert.equal(sim.telemetry().state, 'STOPPED'); assert.equal(sim.telemetry().ready, false);
  assert.ok(sim.startReasons().includes('Инженерный режим'));
  assert.equal(sim.command('start').result, 'REJECTED');
});

test('D-204/D-208: обе стороны проверяются; успех не снимает ошибку/блокировку, отдельный возврат снимает только свою', () => {
  const sim = engineer();
  sim.pumps.fail(sim, 1, 'VALVE_LOST_OPEN_1', 'Исходная ошибка'); sim.pumps.branches[1].valveBlocked = true;
  sim.pumps.branches[1].exclusions.push('CHECK_AFTER_LOW_FLOW');
  valveTestPassed(sim);
  assert.equal(sim.pumps.branches[1].valveBlocked, true);
  assert.ok(sim.pumps.branches[1].faults.length);
  assert.equal(sim.command('engineering_return', { kind: 'valve', pump: 1 }).result, 'ACCEPTED');
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  assert.equal(sim.pumps.branches[1].valveBlocked, false);
  assert.deepEqual(sim.pumps.branches[1].exclusions, ['CHECK_AFTER_LOW_FLOW']);
  assert.equal(sim.outputs.value('pump1.run'), false);
});

test('D-204: исходное 1/1 и UNKNOWN запрещают проверку; ручное положение не заменяет концевик', () => {
  for (const unknown of [false, true]) {
    const sim = engineer();
    if (unknown) sim.signals.set('valve1.open', null, 'UNKNOWN'); else position(sim, 1, true, true);
    sim.pumps.branches[1].manualClosed = true;
    assert.equal(sim.command('engineering_test', { kind: 'valve', pump: 1, repaired: true }).result, 'REJECTED');
    assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  }
  const sim = engineer(); sim.pumps.branches[1].electricalIsolation = true;
  assert.equal(sim.command('engineering_test', { kind: 'valve', pump: 1, repaired: true }).result, 'REJECTED');
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
});

test('D-205: 45 с без цели — отказ, без обратного хода/автоповтора; поздний концевик не успех', () => {
  const sim = engineer(); sim.command('engineering_test', { kind: 'valve', pump: 1 }); sim.advance(100); sim.advance(45000);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.advance(100); sim.sampleGroup('valve1Closed');
  assert.equal(sim.engineering.results[1].valve.result, 'FAILED');
  assert.equal(sim.engineering.results[1].valve.valid, false);
  assert.equal(sim.engineering.breakerOffRequired[1], true);
  assert.equal(sim.command('engineering_return', { kind: 'valve', pump: 1 }).result, 'REJECTED');
});

test('D-206: 1/1 сохраняет направление менее 5 с, затем снимает; 45 с не продлеваются', () => {
  for (const offset of [0, 43000]) {
    const sim = engineer(); sim.command('engineering_test', { kind: 'valve', pump: 1 }); sim.advance(100 + offset);
    position(sim, 1, true, true);
    const delay = offset ? 2000 : 5000;
    sim.advance(delay - 100); assert.equal(sim.outputs.value('valve1.direction'), 'CLOSE');
    sim.advance(100); assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
    sim.advance(100); assert.equal(sim.engineering.results[1].valve.result, 'FAILED');
  }
});

test('D-207/D-209/D-211: отмена/потеря HMI не дают успех и требуют отключить автомат после ремонтного допуска', () => {
  for (const lost of [false, true]) {
    const sim = engineer(); sim.pumps.branches[1].valveBlocked = true;
    sim.command('engineering_test', { kind: 'valve', pump: 1, repaired: true }); sim.advance(100);
    if (lost) { sim.exchange.hmi = false; sim.advance(5000); } else sim.command('engineering_stop');
    sim.advance(100);
    assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
    assert.equal(sim.engineering.results[1].valve.result, 'NOT_CHECKED');
    assert.equal(sim.engineering.breakerOffRequired[1], true);
    assert.equal(sim.engineering.enabled, true);
    assert.equal(sim.pumps.branches[1].valveBlocked, true);
  }
});

test('D-213: выход/новая попытка отменяют основание возврата, потеря HMI после успеха сама его не отменяет', () => {
  const sim = engineer(); valveTestPassed(sim);
  sim.exchange.hmi = false; sim.advance(5000);
  assert.equal(sim.engineering.results[1].valve.valid, true);
  sim.exchange.hmi = true; sim.tick(); sim.command('engineering_test', { kind: 'valve', pump: 1 });
  assert.equal(sim.engineering.results[1].valve.valid, false);
  sim.command('engineering_stop'); sim.advance(100); sim.command('engineering_leave');
  assert.equal(sim.engineering.enabled, false);
});

test('D-184/D-190: Q и ΔP обязательны при OFF флага; успех только после нового подтверждения OFF', () => {
  const sim = engineer(); sim.command('flow_control', false); pumpTestOpened(sim);
  sim.sampleGroup('flowNormal'); sim.advance(4900); assert.equal(sim.outputs.value('pump1.run'), true);
  sim.advance(100); assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.engineering.active.stage, 'WAIT_OFF');
  assert.equal(sim.engineering.results[1].pump, undefined);
  sim.sampleGroup('pump1Off');
  assert.equal(sim.engineering.results[1].pump.result, 'PASSED');
  sim.sampleGroup('flowZero');
  assert.equal(sim.engineering.results[1].pump.valid, true);
  assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
});

for (const parameter of ['Q', 'DP']) test('D-188/D-197: низкий ' + parameter + ' — выключение без закрытия, исключение без диагноза поломки', () => {
  const sim = engineer(); sim.command('flow_control', false); pumpTestOpened(sim); sim.sampleGroup('flowNormal');
  if (parameter === 'Q') sim.signals.set('flow', 4); else sim.signals.set('pressure.after', 1.6);
  sim.tick(); sim.advance(5000);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
  assert.equal(sim.signals.position('valve1'), 'OPEN');
  assert.deepEqual(sim.pumps.branches[1].exclusions, ['HYDRAULIC_TEST_FAILED']);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  sim.sampleGroup('pump1Off'); assert.equal(sim.engineering.results[1].pump.result, 'FAILED');
});

test('D-189/D-198: неизвестный Q не ноль, результат не проверено без нового индивидуального исключения', () => {
  const sim = engineer(); pumpTestOpened(sim); sim.sampleGroup('flowNormal');
  sim.signals.set('flow', null, 'UNKNOWN'); sim.tick(); sim.advance(5000); sim.sampleGroup('pump1Off');
  assert.equal(sim.engineering.results[1].pump.result, 'NOT_CHECKED');
  assert.deepEqual(sim.pumps.branches[1].exclusions, []);
  assert.deepEqual(sim.pumps.branches[1].faults, []);
});

test('D-167/D-202: возврат после низкого Q отдельно, повтор отменяет прежний успех; выход не возвращает ветвь', () => {
  const sim = engineer(); sim.pumps.branches[1].exclusions.push('CHECK_AFTER_LOW_FLOW');
  pumpTestOpened(sim); sim.sampleGroup('flowNormal'); sim.advance(5000); sim.sampleGroup('pump1Off');
  assert.deepEqual(sim.pumps.branches[1].exclusions, ['CHECK_AFTER_LOW_FLOW']);
  assert.equal(sim.command('engineering_return', { kind: 'pump', pump: 1 }).result, 'ACCEPTED');
  assert.deepEqual(sim.pumps.branches[1].exclusions, []);
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.command('engineering_leave');
  assert.deepEqual(sim.pumps.branches[1].exclusions, []);
});

test('D-185/D-187: закрытие/открытие в тесте до 45 с, таймаут не даёт запуска/успеха', () => {
  for (const opening of [false, true]) {
    const sim = engineer(); sim.sampleGroup('valve2Closed');
    if (opening) sim.sampleGroup('valve1Closed');
    sim.command('engineering_test', { kind: 'pump', pump: 1 });
    if (opening) { sim.advance(100); sim.sampleGroup('pump1On'); sim.advance(1100); }
    sim.advance(45000);
    assert.equal(sim.outputs.value('pump1.run'), false);
    sim.sampleGroup('pump1Off'); sim.advance(100);
    assert.equal(sim.engineering.results[1].pump.result, 'NOT_CHECKED');
    assert.ok(sim.pumps.branches[1].faults.length);
  }
});

test('D-199/D-200: утрата открытия или изоляции немедленно прерывает тест без автоматического возобновления', () => {
  for (const own of [false, true]) {
    const sim = engineer(); pumpTestOpened(sim); sim.sampleGroup('flowNormal');
    position(sim, own ? 1 : 2, false, false);
    assert.equal(sim.outputs.value('pump1.run'), false);
    assert.equal(sim.outputs.value('valve1.direction'), 'STOP');
    assert.equal(sim.pumps.branches[1].faults.length, 0);
    sim.sampleGroup('valve1Open'); sim.sampleGroup('valve2Closed'); sim.sampleGroup('pump1Off');
    assert.equal(sim.engineering.results[1].pump.result, 'NOT_CHECKED');
  }
});

test('D-193/D-183: обязанность ручного возврата возникает до подтверждения изоляции и переживает reboot', () => {
  const sim = engineer(); assert.equal(sim.command('engineering_isolate', 2).result, 'ACCEPTED');
  assert.equal(sim.engineering.returnRequired[2], true);
  assert.equal(sim.engineering.manualIsolation.confirmed, false);
  sim.restart(); assert.equal(sim.engineering.returnRequired[2], true); assert.equal(sim.engineering.enabled, false);
  assert.ok(sim.startReasons().some(reason => reason.includes('нижнего')));
});

test('D-182/D-200: ручной кран разрешает одну проверку другого насоса, DI затвора не подменяются', () => {
  const sim = engineer();
  sim.command('engineering_isolate', 2); sim.command('engineering_confirm_isolation', 2);
  assert.equal(sim.command('engineering_test', { kind: 'pump', pump: 1 }).result, 'ACCEPTED');
  sim.sampleGroup('valve1Closed'); sim.advance(100); sim.sampleGroup('pump1On'); sim.advance(1100); sim.sampleGroup('valve1Open');
  position(sim, 2, false, false); sim.sampleGroup('flowNormal'); sim.advance(5000); sim.sampleGroup('pump1Off');
  assert.equal(sim.engineering.results[1].pump.result, 'PASSED');
  assert.equal(sim.engineering.returnRequired[2], true);
  assert.equal(sim.command('engineering_return', { kind: 'pump', pump: 1 }).result, 'REJECTED');
  assert.equal(sim.command('engineering_confirm_return', 2).result, 'ACCEPTED');
  assert.equal(sim.signals.position('valve2'), 'INTERMEDIATE');
});

test('D-167: ручной кран не подменяет специальное требование закрытого противоположного электрозатвора', () => {
  const sim = engineer(); sim.pumps.branches[1].exclusions.push('CHECK_AFTER_LOW_FLOW');
  sim.command('engineering_isolate', 2); sim.command('engineering_confirm_isolation', 2);
  assert.equal(sim.command('engineering_test', { kind: 'pump', pump: 1, repaired: true }).result, 'REJECTED');
});

test('D-196: в активной проверке нет второго теста/рабочей смены; свежий OFF обязателен до новой попытки', () => {
  const sim = engineer(); pumpTestOpened(sim);
  assert.equal(sim.command('engineering_test', { kind: 'valve', pump: 2 }).result, 'REJECTED');
  assert.equal(sim.command('switch_pump', 2).result, 'REJECTED');
  sim.command('engineering_stop');
  assert.equal(sim.command('engineering_leave').result, 'REJECTED');
  sim.sampleGroup('pump1Off');
  assert.equal(sim.engineering.active, null);
});

test('D-201: давление прерывает проверку; защитное открытие старше снятия проверочной команды', () => {
  const sim = engineer(); pumpTestOpened(sim); sim.signals.set('pressure.before', 0.7); sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('valve2.direction'), 'OPEN');
  sim.sampleGroup('pump1Off'); assert.equal(sim.engineering.results[1].pump.result, 'NOT_CHECKED');
  const lost = engineer(); pumpTestOpened(lost); lost.signals.set('configuration.ready', false); lost.tick();
  assert.equal(lost.outputs.value('pump1.run'), false); lost.sampleGroup('pump1Off');
  assert.equal(lost.engineering.results[1].pump.result, 'NOT_CHECKED');
});

test('D-167: отдельный сброс при нулевом Q не снимает требование полного пуска или ошибки ветвей', () => {
  const sim = engineer(); sim.hydraulics.requireFullStartup = true;
  sim.protection.fault(sim, 'FLOW_INSUFFICIENT', 'Исходная авария расхода');
  sim.pumps.branches[1].exclusions.push('CHECK_AFTER_LOW_FLOW');
  assert.equal(sim.command('reset_flow_faults', false).result, 'REJECTED');
  sim.signals.set('flow', null, 'UNKNOWN');
  assert.equal(sim.command('reset_flow_faults', true).result, 'REJECTED');
  sim.signals.set('flow', 0); sim.tick();
  assert.equal(sim.command('reset_flow_faults', true).result, 'ACCEPTED');
  assert.equal(sim.hydraulics.requireFullStartup, true);
  assert.deepEqual(sim.pumps.branches[1].exclusions, ['CHECK_AFTER_LOW_FLOW']);
  assert.equal(sim.protection.faults.some(fault => fault.code === 'FLOW_INSUFFICIENT'), false);
});

test('D-143: восстановление после электрической ошибки требует ON/111, OFF/000, возврат и отдельный критический сброс', () => {
  const sim = engineer();
  sim.pumps.fail(sim, 1, 'VOLTAGE_WHEN_OFF_1', 'Предыдущая электрическая ошибка');
  sim.pumps.branches[1].inhibited = true; sim.pumps.branches[1].electricalIsolation = true;
  assert.equal(sim.command('engineering_reset_voltage', 1).result, 'REJECTED');
  pumpTestOpened(sim); sim.sampleGroup('flowNormal'); sim.advance(5000); sim.sampleGroup('pump1Off');
  assert.equal(sim.engineering.results[1].pump.result, 'PASSED');
  assert.equal(sim.command('engineering_return', { kind: 'pump', pump: 1 }).result, 'ACCEPTED');
  assert.ok(sim.protection.faults.some(fault => fault.code === 'VOLTAGE_WHEN_OFF_1'));
  assert.equal(sim.command('engineering_reset_voltage', 1).result, 'ACCEPTED');
  assert.equal(sim.protection.faults.some(fault => fault.code === 'VOLTAGE_WHEN_OFF_1'), false);
});

test('D-142/D-201: ошибка фаз во время теста выключает за 1 с, классифицируется ещё 2 с, не запускает резерв', () => {
  const sim = engineer(); pumpTestOpened(sim); sim.sampleGroup('pump1Off'); sim.advance(1000);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  assert.notEqual(sim.engineering.active, null);
  sim.advance(2000);
  assert.ok(sim.pumps.branches[1].faults.includes('PUMP_PHASES_ON_1'));
  assert.equal(sim.engineering.results[1].pump.result, 'FAILED');
  assert.equal(sim.outputs.value('pump2.run'), false);
});

test('D-192: потеря HMI в тесте насоса снимает команды ровно по 5 с; восстановление не продолжает', () => {
  const sim = engineer(); pumpTestOpened(sim); sim.sampleGroup('flowNormal');
  sim.exchange.hmi = false; sim.advance(4900); assert.equal(sim.outputs.value('pump1.run'), true);
  sim.advance(100); assert.equal(sim.outputs.value('pump1.run'), false);
  sim.sampleGroup('pump1Off'); sim.exchange.hmi = true; sim.tick();
  assert.equal(sim.engineering.results[1].pump.result, 'NOT_CHECKED');
  assert.match(sim.engineering.results[1].pump.reason, /HMI/);
  assert.equal(sim.outputs.value('pump1.run'), false);
});

test('D-202: новая прерванная попытка насоса отменяет старое основание возврата, история успеха остаётся', () => {
  const sim = engineer(); sim.pumps.branches[1].exclusions.push('CHECK_AFTER_LOW_FLOW');
  pumpTestOpened(sim); sim.sampleGroup('flowNormal'); sim.advance(5000); sim.sampleGroup('pump1Off');
  sim.command('engineering_test', { kind: 'pump', pump: 1, repaired: true });
  sim.command('engineering_stop'); sim.advance(100);
  assert.equal(sim.command('engineering_return', { kind: 'pump', pump: 1 }).result, 'REJECTED');
  assert.ok(sim.engineering.history.some(item => item.kind === 'pump' && item.result === 'PASSED'));
  assert.deepEqual(sim.pumps.branches[1].exclusions, ['CHECK_AFTER_LOW_FLOW']);
});

test('D-194/D-211: перезапуск не продолжает ремонтный тест и сохраняет требование отключить автомат', () => {
  const sim = engineer(); sim.pumps.branches[1].valveBlocked = true;
  sim.command('engineering_test', { kind: 'valve', pump: 1, repaired: true }); sim.advance(100); sim.restart();
  assert.equal(sim.engineering.active, null); assert.equal(sim.engineering.enabled, false);
  assert.equal(sim.engineering.interruptedAttempt.kind, 'valve');
  assert.equal(sim.engineering.breakerOffRequired[1], true);
  assert.equal(sim.pumps.branches[1].valveBlocked, true);
  assert.equal(sim.state, null); // Общая процедура восстановления ещё не реализована, STOPPED не подделывается.
  sim.restart();
  assert.equal(sim.engineering.interruptedAttempt.kind, 'valve');
  assert.equal(sim.engineering.breakerOffRequired[1], true);
});

test('D-206: кратковременное 1/1 сбрасывает выдержку; обе стороны и новые ответы нужны до успеха', () => {
  const sim = engineer(); sim.command('engineering_test', { kind: 'valve', pump: 2 }); sim.advance(100);
  position(sim, 2, true, true); sim.advance(4900); position(sim, 2, true, false);
  position(sim, 2, true, true); sim.advance(4900); position(sim, 2, false, true);
  sim.advance(200); sim.sampleGroup('valve2Open'); sim.advance(100);
  assert.equal(sim.engineering.results[2].valve.result, 'PASSED');
  assert.deepEqual(sim.pumps.branches[2].faults, []);
});

test('D-184: равенство порогам допускается, параметры оцениваются после задержки, а не 5 с непрерывной нормы', () => {
  const sim = engineer(); pumpTestOpened(sim, 2); sim.sampleGroup('flowZero'); sim.advance(4900);
  sim.signals.set('flow', 5); sim.signals.set('pressure.before', 1.1); sim.signals.set('pressure.after', 1.4); sim.tick(); sim.advance(100);
  assert.equal(sim.outputs.value('pump2.run'), false); sim.sampleGroup('pump2Off');
  assert.equal(sim.engineering.results[2].pump.result, 'PASSED');
});

test('D-180/D-201: напряжение на противоположном насосе не объявляет проверяемый затвор неисправным', () => {
  const sim = engineer(); sim.command('engineering_test', { kind: 'valve', pump: 1 }); sim.advance(100);
  sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('pump2Off'); sim.advance(100);
  assert.equal(sim.engineering.results[1].valve.result, 'NOT_CHECKED');
  assert.deepEqual(sim.pumps.branches[1].faults, []);
  assert.ok(sim.pumps.branches[2].faults.includes('VOLTAGE_WHEN_OFF_2'));
});

test('D-180/D-213: новая ошибка насоса не перечёркивает независимый успех его затвора', () => {
  const sim = engineer(); valveTestPassed(sim);
  sim.pumps.fail(sim, 1, 'PUMP_PHASES_ON_1', 'Новая подтверждённая ошибка насоса');
  assert.equal(sim.engineering.results[1].valve.valid, true);
  assert.equal(sim.engineering.results[1].valve.result, 'PASSED');
});
