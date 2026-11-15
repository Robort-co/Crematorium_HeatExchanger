import test from 'node:test';
import assert from 'node:assert/strict';
import { engineer,deliver } from './helpers.mjs';
import { cooling,fanStop } from './thermal-helpers.mjs';

test('D-149/D-217: принятый запрет насосов снимает допуск циркуляции в том же цикле даже при прежних нормальных Q/ΔP',()=>{
 const sim=cooling(true);sim.command('engineering_st_test');sim.sampleGroup('stOpen');
 sim.signals.set('pressure.before',0.7);sim.signals.set('pressure.after',1.1);sim.tick();
 assert.equal(sim.outputs.value('pump1.run'),false);assert.equal(sim.outputs.value('vfd.run'),'STOP');
 assert.equal(sim.outputs.value('st.direction'),'CLOSE');assert.equal(sim.outputs.value('shod.voltage'),10);
 assert.equal(sim.shutterTest.active.result,'NOT_CHECKED');assert.equal(sim.coverageGap,null);
});

test('D-215: один запрос охлаждения не запрещает ШТ; без циркуляции дымосос не пускается во время OPEN',()=>{
 const sim=engineer();sim.signals.set('cooling.required',true);
 assert.equal(sim.command('engineering_st_test').result,'ACCEPTED');assert.equal(sim.outputs.value('vfd.run'),'STOP');
 sim.sampleGroup('stOpen');sim.advance(200);sim.sampleGroup('stClosed');sim.tick();
 assert.equal(sim.shutterTest.result.result,'PASSED');assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.outputs.value('pump1.run'),false);
});
test('D-216: при работающем охлаждении до OPEN обязательны Q, ΔP, местная ветвь и 5 с открытия независимо от флага',()=>{
 for(const change of [s=>s.sampleGroup('flowZero'),s=>s.signals.set('flow',null,'UNKNOWN'),s=>s.cooling.openedAt[1]=s.clock.now,s=>s.sampleGroup('pump1Off')]){
  const sim=cooling();sim.config.flowControl=false;change(sim);assert.equal(sim.command('engineering_st_test').result,'REJECTED');
  assert.equal(sim.outputs.value('st.direction'),'STOP');
 }
 const sim=cooling(false);assert.equal(sim.command('engineering_st_test').result,'REJECTED');assert.equal(sim.outputs.value('pump1.run'),false);
});
test('D-217: потеря циркуляции закрывает ШТ, STOP/DO8=0 и ШОД100; возврат Q не возобновляет тест, закрытие разрешает охлаждение после полного STOP',()=>{
 const sim=cooling();assert.equal(sim.command('engineering_st_test').result,'ACCEPTED');sim.sampleGroup('stOpen');sim.sampleGroup('flowZero');
 assert.equal(sim.outputs.value('st.direction'),'CLOSE');assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('vfd.enable'),false);assert.equal(sim.outputs.value('shod.voltage'),10);
 sim.sampleGroup('flowNormal');assert.equal(sim.shutterTest.active.cancelling,true);sim.sampleGroup('stClosed');
 assert.equal(sim.shutterTest.result.result,'NOT_CHECKED');assert.equal(sim.shutterTest.required,true);assert.equal(sim.outputs.value('vfd.run'),'STOP');
 fanStop(sim);assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.coverageGap,null);
});
test('D-217/D-218: потеря циркуляции не обновляет уже идущий таймер закрытия, собственный отказ снимает питание',()=>{
 const sim=cooling();sim.command('engineering_st_test');sim.sampleGroup('stOpen');sim.advance(200);
 sim.signals.set('st.open',false);sim.tick();const at=sim.outputs.commands['st.direction'].issuedAt;
 sim.advance(30000);sim.sampleGroup('flowZero');assert.equal(sim.outputs.commands['st.direction'].issuedAt,at);
 deliver(sim);sim.signals.set('vfd.running',false);sim.tick();sim.advance(37500);
 assert.equal(sim.shutterTest.result.result,'FAILED');assert.equal(sim.outputs.value('st.power'),false);assert.equal(sim.outputs.value('st.direction'),'STOP');
});
test('D-163/D-086: потеря закрытия вне теста немедленно снимает разрешение без циркуляции; 10 с нормы для повторного охлаждения',()=>{
 const sim=cooling();sim.sampleGroup('flowZero');sim.signals.set('st.closed',false);sim.tick();
 assert.equal(sim.outputs.value('vfd.run'),'STOP');fanStop(sim);sim.sampleGroup('flowNormal');sim.advance(9900);
 assert.equal(sim.outputs.value('vfd.run'),'STOP');sim.advance(100);assert.equal(sim.outputs.value('vfd.run'),'START');
 assert.equal(sim.protection.stBlocked,true);assert.equal(sim.outputs.value('pump1.run'),true);
});
test('D-215/D-217: успешный тест ШТ при циркуляции не останавливает разрешённое охлаждение и не запускает новую ветвь',()=>{
 const sim=cooling();sim.command('engineering_st_test');sim.sampleGroup('stOpen');sim.advance(200);sim.sampleGroup('stClosed');
 assert.equal(sim.shutterTest.result.result,'PASSED');assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.outputs.value('pump2.run'),false);assert.equal(sim.coverageGap,null);
});
