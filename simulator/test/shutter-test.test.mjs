import test from 'node:test';
import assert from 'node:assert/strict';
import { engineer, deliver } from './helpers.mjs';

function position(sim, open, closed) { sim.signals.set('st.open', open); sim.signals.set('st.closed', closed); sim.tick(); }
function begin() { const sim = engineer(); assert.equal(sim.command('engineering_st_test').result, 'ACCEPTED'); return sim; }
function closing(sim) { sim.sampleGroup('stOpen'); sim.advance(200); assert.equal(sim.outputs.value('st.direction'), 'CLOSE'); }
function passed(sim) { closing(sim); sim.sampleGroup('stClosed'); assert.equal(sim.shutterTest.result.result, 'PASSED'); }
const repair = { repaired: true, manualFinished: true, engaged: true };

test('Согласование 15.11: низкое давление прекращает тест ШТ, закрывает при разрешении, OFF/OPEN насосной группы старше; нормализация не возобновляет тест', () => {
  const sim=begin(); position(sim,false,false);
  sim.signals.set('pressure.before',0.7); sim.tick();
  assert.equal(sim.outputs.value('st.direction'),'CLOSE');
  for(const pump of [1,2]) { assert.equal(sim.outputs.value('pump'+pump+'.run'),false); assert.equal(sim.outputs.requests['valve'+pump+'.direction'],'OPEN'); }
  sim.sampleGroup('flowNormal'); assert.equal(sim.outputs.value('st.direction'),'CLOSE');
  sim.sampleGroup('stClosed'); assert.equal(sim.shutterTest.result.result,'NOT_CHECKED'); assert.match(sim.shutterTest.result.reason,/давления/);
  assert.equal(sim.shutterTest.required,true); assert.equal(sim.coverageGap,null); assert.equal(sim.state,'STOPPED');
  assert.equal(sim.command('engineering_st_test').result,'ACCEPTED');
});

test('Согласование 15.11: низкое давление не продлевает уже идущее закрытие; собственная ошибка ШТ блокирует движение', () => {
  const sim=begin(); closing(sim); position(sim,false,false); const issued=sim.outputs.commands['st.direction'].issuedAt;
  sim.advance(30000); sim.signals.set('pressure.before',0.7); sim.tick();
  assert.equal(sim.outputs.commands['st.direction'].issuedAt,issued); sim.advance(37500);
  assert.equal(sim.shutterTest.result.result,'FAILED'); assert.equal(sim.outputs.value('st.power'),false);
  assert.equal(sim.outputs.value('st.direction'),'STOP'); assert.equal(sim.coverageGap,null);
  sim.sampleGroup('stClosed'); assert.equal(sim.command('engineering_st_restore',repair).result,'ACCEPTED');
  assert.equal(sim.command('engineering_st_test').result,'REJECTED'); // Пока давление низкое, новой попытки нет.
});

test('D-214/D-224: полный цикл, новые DI, STOP перед успехом, питание остаётся; остальные ошибки не снимаются', () => {
  const sim = begin();
  assert.equal(sim.state, 'STOPPED'); assert.equal(sim.shutterTest.incomplete, true); assert.equal(sim.shutterTest.required, true);
  assert.equal(sim.outputs.value('st.direction'), 'OPEN'); assert.equal(sim.command('start').result, 'REJECTED');
  assert.equal(sim.command('engineering_test', {kind:'valve',pump:1}).result, 'REJECTED');
  sim.protection.fault(sim, 'INDEPENDENT_TEST_FAULT', 'Независимая тестовая причина');
  passed(sim);
  assert.equal(sim.shutterTest.required, false); assert.equal(sim.shutterTest.incomplete, false);
  assert.equal(sim.outputs.value('st.direction'), 'STOP'); assert.equal(sim.outputs.value('st.power'), true);
  assert.equal(sim.state, 'STOPPED'); assert.equal(sim.telemetry().ready, false);
  assert.ok(sim.protection.faults.some(f=>f.code==='INDEPENDENT_TEST_FAULT'));
});

test('D-077: фактическое закрытие и три явных подтверждения; отдельный возврат питания ещё не выполняет тест', () => {
  const sim = begin(); sim.advance(5000);
  assert.equal(sim.shutterTest.result.result, 'FAILED'); assert.equal(sim.protection.stBlocked, true);
  assert.equal(sim.command('engineering_st_test').result, 'REJECTED');
  assert.equal(sim.command('engineering_st_restore', {...repair,engaged:false}).result, 'REJECTED');
  position(sim,false,false); sim.protection.manualStClosed = true;
  assert.equal(sim.command('engineering_st_restore',repair).result, 'REJECTED');
  sim.sampleGroup('stClosed'); assert.equal(sim.command('engineering_st_restore',repair).result, 'ACCEPTED');
  assert.equal(sim.outputs.value('st.power'),true); assert.equal(sim.outputs.value('st.direction'),'STOP');
  assert.equal(sim.shutterTest.required,true); assert.equal(sim.shutterTest.active,null);
  assert.equal(sim.command('engineering_st_test').result,'ACCEPTED'); passed(sim);
});

test('D-218: 67,5 с без цели, без автоматического реверса/байпаса; поздний концевик и выход не сбрасывают отказ', () => {
  const sim=begin(); position(sim,false,false); sim.advance(67400); assert.equal(sim.protection.stBlocked,false);
  sim.advance(100); assert.equal(sim.shutterTest.result.result,'FAILED');
  assert.equal(sim.outputs.value('st.power'),false); assert.equal(sim.outputs.value('st.direction'),'STOP');
  sim.sampleGroup('stClosed'); sim.command('engineering_leave');
  assert.equal(sim.protection.stBlocked,true); assert.equal(sim.shutterTest.required,true);
  assert.equal(sim.state,'STOPPED'); assert.equal(sim.protection.stopStage,null); assert.equal(sim.command('start').result,'REJECTED');
});

test('D-219: исходный контакт контролируется в обоих направлениях; настройка 1–10 с, активный таймер не меняется', () => {
  for(const seconds of [1,10]) {
    const sim=engineer(); assert.equal(sim.command('engineering_st_release_time',seconds).result,'ACCEPTED');
    sim.command('engineering_st_test'); assert.equal(sim.command('engineering_st_release_time',5).result,'REJECTED');
    sim.advance(seconds*1000-100); assert.equal(sim.protection.stBlocked,false);
    sim.advance(100); assert.equal(sim.protection.faults.at(-1).code,'st_ORIGIN_NOT_RELEASED');
  }
  const sim=begin(); closing(sim); sim.advance(5000); assert.equal(sim.shutterTest.result.result,'FAILED');
  for(const value of [0,11,NaN]) assert.equal(engineer().command('engineering_st_release_time',value).result,'REJECTED');
});

test('D-073: 1/1 имеет собственную выдержку 5 с и не объявляет успешный тест', () => {
  const sim=begin(); position(sim,false,false); position(sim,true,true);
  sim.advance(4900); assert.equal(sim.protection.stBlocked,false);
  sim.advance(100); assert.equal(sim.shutterTest.result.result,'FAILED');
  assert.ok(sim.protection.faults.some(f=>f.code==='ST_LIMIT_CONTRADICTION'));
  assert.equal(sim.outputs.value('st.power'),false);
});

test('D-221: отмена из закрытого положения не создаёт движения; открытие отменяется закрытием без автоматического повтора', () => {
  const beforeMove=begin(); beforeMove.command('engineering_stop');
  assert.equal(beforeMove.outputs.value('st.direction'),'STOP'); assert.equal(beforeMove.shutterTest.result.result,'NOT_CHECKED');
  const sim=begin(); position(sim,false,false); sim.command('engineering_stop');
  assert.equal(sim.outputs.value('st.direction'),'CLOSE'); sim.sampleGroup('stClosed');
  assert.equal(sim.shutterTest.result.result,'NOT_CHECKED'); assert.equal(sim.shutterTest.required,true);
  sim.advance(1000); assert.equal(sim.shutterTest.active,null);
});

test('D-221/D-218: отмена во время закрытия не обновляет 67,5 с; ошибка закрытия старше отмены', () => {
  const sim=begin(); closing(sim); position(sim,false,false);
  const issued=sim.outputs.commands['st.direction'].issuedAt;
  sim.advance(30000); sim.command('engineering_stop'); assert.equal(sim.outputs.commands['st.direction'].issuedAt,issued);
  sim.advance(37500); assert.equal(sim.shutterTest.result.result,'FAILED'); assert.equal(sim.protection.stBlocked,true);
});

test('D-222: потеря HMI через 5 с закрывает без новой выдержки; возврат не продолжает тест', () => {
  const sim=begin(); position(sim,false,false); sim.exchange.hmi=false;
  sim.advance(4900); assert.equal(sim.outputs.value('st.direction'),'OPEN');
  sim.advance(100); assert.equal(sim.outputs.value('st.direction'),'CLOSE');
  sim.exchange.hmi=true; sim.tick(); assert.equal(sim.outputs.value('st.direction'),'CLOSE');
  sim.sampleGroup('stClosed'); assert.match(sim.shutterTest.result.reason,/HMI/);
  assert.equal(sim.engineering.enabled,true); assert.equal(sim.shutterTest.required,true);
});

test('D-223: reboot не продолжает OPEN/закрытие отмены, сохраняет требование и выключает инженерный режим', () => {
  for(const cancel of [false,true]) {
    const sim=begin(); position(sim,false,false); if(cancel)sim.command('engineering_stop');
    sim.restart(); assert.equal(sim.engineering.enabled,false); assert.equal(sim.shutterTest.active,null);
    assert.equal(sim.shutterTest.required,true); assert.match(sim.shutterTest.result.reason,/Перезагрузка/);
    assert.equal(sim.outputs.value('st.direction'),'STOP');
    sim.sampleGroup('bootPermits'); sim.sampleGroup('pumpsOff'); sim.sampleGroup('fanOff'); sim.sampleGroup('stClosed');
    deliver(sim); sim.sampleGroup('fanOff'); sim.advance(5000);
    assert.equal(sim.state,'STOPPED'); assert.equal(sim.command('start').result,'REJECTED');
    assert.equal(sim.command('engineering_st_test').result,'REJECTED');
  }
});

test('D-224: успех сохраняется в памяти reboot; новая попытка заменяет прежний успех до движения', () => {
  const sim=begin(); passed(sim); sim.restart(); assert.equal(sim.shutterTest.result.result,'PASSED'); assert.equal(sim.shutterTest.required,false);
  const retry=begin(); passed(retry); retry.command('engineering_st_test');
  assert.equal(retry.shutterTest.required,true); assert.equal(retry.shutterTest.result.valid,false); assert.equal(retry.shutterTest.history.length,1);
});

test('Профиль ШТ не выдумывает проверку с неизвестными исходными DI', () => {
  for(const condition of ['UNKNOWN','INTERMEDIATE','CONTRADICTORY']) {
    const sim=engineer();
    if(condition==='UNKNOWN')sim.signals.set('st.closed',null,'UNKNOWN');
    if(condition==='INTERMEDIATE')sim.signals.set('st.closed',false);
    if(condition==='CONTRADICTORY')sim.signals.set('st.open',true);
    assert.equal(sim.command('engineering_st_test').result,'REJECTED'); assert.equal(sim.shutterTest.active,null);
  }
});
