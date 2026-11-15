import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { deliver } from './helpers.mjs';

function water(s, a, b, r = 50) {
  for (const [name, value] of Object.entries({'temperature.supply': a, 'temperature.backup': b, 'temperature.return': r})) {
    s.signals.set(name, value, value === null ? 'UNKNOWN' : 'GOOD');
  }
  s.tick();
}
function startup(stage = 'CIRCULATION') {
  const s = new Simulation(); s.loadWaterFixture(); s.command('start'); deliver(s);
  if (stage === 'OPEN_ST') return s;
  s.sampleGroup('stOpen');
  if (stage === 'CLOSE_VALVES') return s;
  s.sampleGroup('valvesClosed'); deliver(s); s.sampleGroup('fanOn'); s.sampleGroup('pump1On');
  if (stage === 'PUMP_ON') return s;
  s.advance(1000);
  if (stage === 'OPEN_VALVE') return s;
  s.sampleGroup('valve1Open'); s.sampleGroup('flowNormal');
  assert.equal(s.state, 'STARTING'); assert.equal(s.main.stage, 'CIRCULATION');
  return s;
}

for (const cause of ['OVERHEAT', 'MISSING']) {
  test('Вода ' + cause + ': прервать запуск, удержать разрешённую циркуляцию до ШБ → закрытия ШТ', () => {
    const s = startup(); const old = s.procedureId;
    if (cause === 'OVERHEAT') { water(s, 91, 60); s.advance(3000); } else water(s, null, null);
    assert.equal(s.coverageGap, null); assert.equal(s.state, 'STOPPING');
    assert.equal(s.protection.stopStage, 'WAIT_BYPASS'); assert.equal(s.protection.stopIrreversible, true);
    assert.equal(s.protection.bypassOpen, false); assert.equal(s.outputs.value('pump1.run'), true);
    assert.notEqual(s.outputs.value('st.direction'), 'CLOSE');
    assert.equal(s.outputs.value('heatRemoval.request'), true);
    const procedure = s.procedureId;
    water(s, 60, 60); s.advance(1000);
    assert.equal(s.state, 'STOPPING'); assert.equal(s.procedureId, procedure);
    assert.equal(s.command('start').result, 'REJECTED');
    assert.equal(s.command('confirm_bypass_open', null, old).result, 'REJECTED');
    assert.equal(s.protection.bypassOpen, false);
    assert.equal(s.command('confirm_bypass_open').result, 'ACCEPTED');
    assert.equal(s.outputs.value('st.direction'), 'CLOSE'); assert.equal(s.outputs.value('pump1.run'), true);
    const closing = s.outputs.commands['st.direction'].issuedAt;
    water(s, null, null); s.advance(500);
    assert.equal(s.outputs.commands['st.direction'].issuedAt, closing); assert.equal(s.procedureId, procedure);
    s.sampleGroup('stClosed'); assert.equal(s.outputs.value('valve1.direction'), 'CLOSE');
    assert.equal(s.outputs.value('pump1.run'), true);
    s.sampleGroup('valve1Closed'); assert.equal(s.outputs.value('pump1.run'), false);
    deliver(s); s.sampleGroup('pumpsOff'); s.sampleGroup('fanOff');
    assert.equal(s.state, 'STOPPED'); assert.equal(s.command('start').result, 'REJECTED');
    water(s, 60, 60); assert.equal(s.state, 'STOPPED'); assert.equal(s.coverageGap, null);
  });
}

for (const stage of ['OPEN_ST', 'CLOSE_VALVES', 'PUMP_ON', 'OPEN_VALVE', 'CIRCULATION']) {
  test('Потеря подачи прерывает этап ' + stage + ' без перехода к следующим пусковым командам', () => {
    const s = startup(stage); const before = s.outputs.value('pump1.run');
    water(s, null, null);
    assert.equal(s.state, 'STOPPING'); assert.equal(s.protection.stopStage, 'WAIT_BYPASS');
    assert.equal(s.outputs.value('pump1.run'), before); assert.equal(s.coverageGap, null);
    assert.equal(s.main.stage, stage); assert.equal(s.protection.bypassOpen, false);
  });
}

test('Водяная причина проверяется до завершения подготовки и перехода в RUNNING', () => {
  const s = startup(); s.command('confirm_bypass_closed'); s.advance(4900);
  s.signals.set('temperature.supply', null, 'UNKNOWN'); s.signals.set('temperature.backup', null, 'UNKNOWN');
  s.advance(100);
  assert.equal(s.state, 'STOPPING'); assert.equal(s.protection.bypassOpen, false);
  assert.ok(!s.journal.some(item => item.kind === 'STATE' && item.message.includes('→ RUNNING:')));
});

test('Независимая защита давления отключает насосы при водяном останове; нормализация не возобновляет Пуск', () => {
  const s = startup(); water(s, null, null);
  s.signals.set('pressure.before', 0.7); s.tick();
  assert.equal(s.outputs.value('pump1.run'), false); assert.equal(s.outputs.requests['valve1.direction'], 'OPEN');
  s.sampleGroup('pumpsOff'); water(s, 60, 60); s.sampleGroup('flowNormal');
  assert.equal(s.state, 'STOPPING'); assert.equal(s.recovery.active, null);
  assert.equal(s.protection.stopIrreversible, true); assert.equal(s.coverageGap, null);
});

test('Одновременные потеря подачи и давление: обязательность водяного останова не теряется', () => {
  const s = startup();
  s.signals.set('pressure.before', 0.7); water(s, null, null);
  assert.equal(s.state, 'STOPPING'); assert.equal(s.outputs.value('pump1.run'), false);
  assert.equal(s.protection.stopIrreversible, true);
  s.sampleGroup('pumpsOff'); s.sampleGroup('flowNormal'); water(s, 60, 60);
  assert.equal(s.state, 'STOPPING'); assert.equal(s.recovery.active, null);
});

test('Повтор критического сообщения до ШБ не создаёт новую процедуру и не подтверждает байпас', () => {
  const s = startup(); water(s, null, null); const procedure = s.procedureId;
  water(s, null, null); s.tick();
  assert.equal(s.procedureId, procedure); assert.equal(s.protection.bypassOpen, false);
  assert.equal(s.outputs.value('pump1.run'), true); assert.equal(s.protection.stopStage, 'WAIT_BYPASS');
});
