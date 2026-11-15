import test from 'node:test';import assert from 'node:assert/strict';
import { engineer } from './helpers.mjs';import { damperPassed } from './thermal-helpers.mjs';
function begin(){const sim=engineer();assert.equal(sim.command('engineering_shod_test').result,'ACCEPTED');return sim;}
test('D-226/D-229/D-236: полный 0→50→100→50→0, K только в обратной связи, успех без нового Пуска/сброса чужих ошибок',()=>{
 const sim=begin();sim.protection.fault(sim,'OTHER','Посторонняя причина');damperPassed(sim);
 assert.equal(sim.outputs.value('shod.voltage'),0);assert.equal(sim.state,'STOPPED');assert.ok(sim.protection.faults.some(f=>f.code==='OTHER'));assert.equal(sim.damperTest.incomplete,false);
});
test('D-227/D-228: 120% не превращается в 100%, достоверная недостижимость за 52,5 с — FAILED без нового запрета Пуска',()=>{
 const sim=begin();sim.signals.set('shod.feedback',10);sim.tick();sim.advance(52500);
 assert.equal(sim.damperTest.result.result,'FAILED');assert.equal(sim.damperTest.result.corrected,120);assert.equal(sim.outputs.value('shod.voltage'),0);
 assert.equal(sim.protection.faults.length,0);sim.command('engineering_leave');assert.equal(sim.command('start').result,'ACCEPTED');
});
test('D-231: 2 с в допуске сбрасываются выходом и входят в общий срок 52,5 с',()=>{
 const sim=begin();sim.advance(1000);sim.signals.set('shod.feedback',2);sim.tick();sim.advance(500);sim.signals.set('shod.feedback',0);sim.tick();sim.advance(1900);
 assert.equal(sim.damperTest.active.index,0);sim.advance(100);assert.equal(sim.damperTest.active.index,1);
 const late=begin();late.signals.set('shod.feedback',5);late.tick();late.advance(51000);late.signals.set('shod.feedback',0);late.tick();late.advance(1500);
 assert.equal(late.damperTest.result.result,'FAILED');
});
test('D-232/D-233/D-234: K заблокирован в тесте, BAD не становится нулём; отмена/новая попытка отдельно',()=>{
 const sim=begin();assert.equal(sim.command('engineering_shod_k',1.5).result,'REJECTED');assert.ok(sim.damperTest.active);
 sim.signals.set('shod.feedback',0,'BAD');sim.tick();assert.equal(sim.damperTest.result.result,'NOT_CHECKED');assert.equal(sim.damperTest.result.corrected,null);
 assert.equal(sim.command('engineering_shod_k',1.5).result,'ACCEPTED');sim.signals.set('shod.feedback',0);sim.tick();assert.equal(sim.damperTest.active,null);
 sim.command('engineering_shod_test');sim.command('engineering_stop');assert.equal(sim.damperTest.result.result,'NOT_CHECKED');assert.equal(sim.outputs.value('shod.voltage'),0);
});
test('D-230/D-235: охлаждение прерывает ШОД, HMI и reboot не возобновляют тест',()=>{
 const sim=begin();sim.signals.set('cooling.required',true);sim.tick();assert.equal(sim.damperTest.result.result,'NOT_CHECKED');assert.equal(sim.outputs.value('shod.voltage'),10);assert.equal(sim.outputs.value('vfd.run'),'START');
 const hmi=begin();hmi.exchange.hmi=false;hmi.advance(5000);assert.match(hmi.damperTest.result.reason,/HMI/);hmi.exchange.hmi=true;hmi.tick();assert.equal(hmi.damperTest.active,null);
 const reboot=begin();reboot.restart();assert.equal(reboot.damperTest.result.result,'NOT_CHECKED');assert.equal(reboot.engineering.enabled,false);assert.equal(reboot.damperTest.active,null);
});
test('D-020: отсутствие изменения после 5 с — только значок, не преждевременный отказ инженерного теста',()=>{
 const sim=begin();sim.advance(2200);sim.tick();sim.advance(5000);
 assert.equal(sim.damperTest.motionWarning,true);assert.ok(sim.damperTest.active);assert.equal(sim.protection.faults.length,0);assert.equal(sim.outputs.value('shod.voltage'),5);
});

test('D-020: накопление, неизменный срок одного направления, отмена при реверсе и сброс значка только успешной проверкой',()=>{
 const sim=engineer();sim.tick();
 const command=v=>{sim.protection.emit(sim,'shod.voltage',v);sim.damperTest.monitorMotion(sim);};
 const wait=ms=>{sim.clock.advance(ms);sim.damperTest.monitorMotion(sim);};
 command(0.6);wait(6000);assert.equal(sim.damperTest.motionWarning,false);
 command(1.2);wait(4000);command(2);wait(1000);assert.equal(sim.damperTest.motionWarning,true);
 command(1.6);wait(6000);assert.equal(sim.damperTest.motionWarning,true); // В обратную сторону ещё не накоплен 1 В.
 command(1);sim.signals.set('shod.feedback',0.2);wait(5000);assert.equal(sim.damperTest.motionWarning,false);
 command(3);wait(4900);command(2.8);wait(100);assert.equal(sim.damperTest.motionWarning,false); // Старый таймер отменён реверсом.
 command(1.8);assert.deepEqual(sim.damperTest.setK(sim,1.5),[]);sim.damperTest.monitorMotion(sim);wait(6000);assert.equal(sim.damperTest.motionWarning,false);
});
