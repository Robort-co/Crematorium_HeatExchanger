import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { deliver, running } from './helpers.mjs';
import { bootInputs, restoreCirculation } from './cooling-reboot-helpers.mjs';
const source = (sim,t,quality='GOOD',repeat=true) => { sim.signals.set('temperature.fan',t,quality,true,repeat);sim.tick(); };
function model(t){const sim=new Simulation();sim.loadTemperatureFixture();if(t!==undefined)source(sim,t);return sim;}
function working(){const sim=model(80);deliver(sim);sim.signals.set('vfd.running',true);sim.tick();return sim;}

test('D-093: без первого измерения STOP/enable=0/ШОД100, через 5 с только своя критическая ошибка, без байпаса',()=>{
 const s=model();assert.equal(s.temperature.phase,'WAIT_FIRST');assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.outputs.value('vfd.enable'),false);assert.equal(s.outputs.value('shod.voltage'),10);
 assert.equal(s.signals.read('cooling.required'),null);assert.equal(s.command('start').result,'REJECTED');s.advance(4999);assert.equal(s.temperature.fault,false);s.advance(1);
 assert.equal(s.temperature.fault,true);assert.equal(s.state,'STOPPED');assert.equal(s.protection.bypassOpen,false);assert.equal(s.outputs.value('pump1.run'),false);
 assert.equal(s.protection.faults.filter(f=>f.code==='FAN_TEMPERATURE_UNAVAILABLE').length,1);assert.equal(s.coverageGap,null);
});
test('D-019/D-092: равенство 70 включает, 50 ещё сохраняет, ниже 50 выключает; середина без истории требует охлаждения',()=>{
 const s=model(60);assert.equal(s.temperature.request,true);assert.equal(s.outputs.value('vfd.run'),'START');source(s,50);assert.equal(s.temperature.request,true);
 source(s,49.9);assert.equal(s.temperature.request,false);assert.equal(s.outputs.value('vfd.run'),'STOP');source(s,69.9);assert.equal(s.temperature.request,false);
 source(s,70);assert.equal(s.temperature.request,true);assert.equal(s.coverageGap,null);
});
test('D-094: одно корректное измерение снимает ожидание; равное новое значение освежает, BAD не заменяет последнее',()=>{
 const s=model(40);s.signals.set('temperature.fan',40,'GOOD',true,false);s.advance(4900);source(s,40,'GOOD',false);s.advance(4900);assert.equal(s.temperature.valid,true);
 source(s,999,'BAD',true);assert.equal(s.signals.retainedTemperature('temperature.fan').value,40);s.advance(99);assert.equal(s.temperature.valid,true);s.advance(1);
 assert.equal(s.temperature.valid,false);assert.equal(s.temperature.request,false);assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.outputs.value('shod.voltage'),10);
});
test('D-094: последнее корректное до 5 с разрешает новый пуск охлаждения при снятии независимой блокировки',()=>{
 const s=model();s.fanTest.coolingBlocked=true;source(s,80,'GOOD',false);assert.equal(s.outputs.value('vfd.run'),'STOP');s.advance(4900);
 s.fanTest.coolingBlocked=false;s.tick();assert.equal(s.outputs.value('vfd.run'),'START');assert.equal(s.temperature.valid,true);
});
test('D-094: неподтверждённый START отменяется на 5 с, поздняя Работа не возобновляет охлаждение',()=>{
 const s=model(80);deliver(s);s.signals.set('temperature.fan',80,'GOOD',true,false);s.advance(5000);
 assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.outputs.value('vfd.enable'),false);assert.equal(s.temperature.continuing,false);
 s.signals.set('vfd.running',true);s.tick();assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.coverageGap,null);
});
test('D-021/D-094: подтверждённое охлаждение продолжается при потере температуры с текущей частотой',()=>{
 const s=working();source(s,80,'GOOD',false);s.advance(5000);assert.equal(s.temperature.fault,true);assert.equal(s.temperature.continuing,true);
 s.config.coolingFrequency=30;s.tick();assert.equal(s.outputs.value('vfd.run'),'START');assert.equal(s.outputs.value('vfd.frequency'),25);assert.equal(s.outputs.value('shod.voltage'),10);
 assert.equal(s.command('start').result,'REJECTED');assert.equal(s.coverageGap,null);
});
test('D-094: старое TRUE до принятия START и недостоверная Работа не доказывают уже работающее охлаждение',()=>{
 for(const stale of [true,false]){const s=model();s.signals.set('vfd.running',true);source(s,80,'GOOD',false);deliver(s);
 s.signals.values['vfd.running'].repeat=false;if(!stale)s.signals.set('vfd.running',true,'BAD',true,false);s.advance(5000);
 assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.temperature.continuing,false);}
});
test('D-094: самостоятельный запрет прекращает продолжение; снятие запрета без температуры не даёт повторного START',()=>{
 const s=working();source(s,80,'GOOD',false);s.advance(5000);s.fanTest.coolingBlocked=true;s.tick();assert.equal(s.outputs.value('vfd.run'),'STOP');
 s.fanTest.coolingBlocked=false;deliver(s);s.signals.set('vfd.running',false);s.tick();assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.temperature.request,true);
 source(s,60);assert.equal(s.outputs.value('vfd.run'),'START');assert.equal(s.temperature.fault,false);
});
test('D-094: возврат температуры снимает только свою ошибку, другие блокировки остаются',()=>{
 const s=model();s.protection.fault(s,'OTHER','Другая причина');s.fanTest.coolingBlocked=true;s.advance(5000);source(s,40);
 assert.equal(s.temperature.fault,false);assert.deepEqual(s.protection.faults.map(f=>f.code),['OTHER']);assert.equal(s.fanTest.coolingBlocked,true);
});
test('D-092: reboot хранит запрос/настройки в памяти, до нового измерения запроса-допуска нет',()=>{
 for(const previous of [40,80]){const s=model(previous);const requested=s.temperature.request;s.restart({downtimeMs:100000});bootInputs(s,{closed:true,required:false});s.advance(5000);
 assert.equal(s.temperature.request,requested);assert.equal(s.temperature.valid,false);assert.equal(s.signals.read('cooling.required'),null);assert.equal(s.outputs.value('vfd.run'),'STOP');
 source(s,60);s.tick();assert.equal(s.temperature.request,requested);assert.equal(s.state,'STOPPED');assert.equal(s.outputs.value('vfd.run'),requested?'START':'STOP');}
});
test('D-092/D-093: непрочитанный снимок не даёт старого запроса или команд насосам; новый экземпляр не получает память',()=>{
 const s=model(40);s.restart({savedStateReadable:false});s.sampleGroup('bootPermits');assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.outputs.value('pump1.run'),null);
 source(s,60);assert.equal(s.temperature.request,true);assert.equal(s.state,null);const another=model();assert.equal(another.temperature.request,null);
});
test('D-023: корректные 200°C не BAD; перегрев через 5 с, утрата измерения не снимает его, 160 ещё не снимает',()=>{
 const s=working();source(s,200);s.advance(4999);assert.equal(s.temperature.overheat,false);s.advance(1);assert.equal(s.temperature.overheat,true);
 assert.equal(s.temperature.valid,true);assert.equal(s.outputs.value('vfd.frequency'),25);source(s,null,'BAD',false);s.advance(5000);assert.equal(s.temperature.overheat,true);
 source(s,160);assert.equal(s.temperature.overheat,true);source(s,159.9);assert.equal(s.temperature.overheat,false);assert.equal(s.temperature.fault,false);
});
test('Температурные уставки: проверка диапазонов/строгого гистерезиса и имитация сохранения',()=>{
 const s=model(40);assert.equal(s.command('engineering_temperature_settings',{coolingOff:40}).result,'REJECTED');s.command('engineering_enter',true);
 for(const value of [{coolingOn:30,coolingOff:30},{coolingOn:131},{fanOverheat:139},{supplyDifferenceClear:5},{unknown:1}])assert.equal(s.command('engineering_temperature_settings',value).result,'REJECTED');
 assert.equal(s.command('engineering_temperature_settings',{coolingOn:80,coolingOff:45,fanOverheat:180,supplyDifferenceClear:2}).result,'ACCEPTED');s.restart();
 assert.equal(s.config.coolingOn,80);assert.equal(s.config.coolingOff,45);assert.equal(s.config.fanOverheat,180);assert.equal(s.config.supplyDifferenceClear,2);
});
test('Граница: сеть и отказ температуры в инженерном тесте не получают выдуманную реакцию',()=>{
 const s=working();const old=s.outputs.value('shod.voltage');s.signals.set('grid.normal',false);s.tick();assert.ok(s.coverageGap);assert.equal(s.outputs.value('shod.voltage'),old);
 const t=model(40);t.command('engineering_enter',true);t.command('engineering_shod_test');source(t,40,'GOOD',false);t.advance(5000);assert.ok(t.coverageGap);
 const waiting=model();waiting.signals.set('configuration.ready',false);waiting.tick();assert.ok(waiting.coverageGap);assert.equal(waiting.outputs.value('vfd.run'),'STOP');
});

test('D-093/D-094: reboot не снимает уже активную ошибку до нового корректного измерения',()=>{
 const s=model();s.advance(5000);s.restart();assert.equal(s.temperature.fault,true);assert.ok(s.protection.faults.some(f=>f.code==='FAN_TEMPERATURE_UNAVAILABLE'));
 source(s,40);assert.equal(s.temperature.fault,false);assert.ok(!s.protection.faults.some(f=>f.code==='FAN_TEMPERATURE_UNAVAILABLE'));
});

test('D-023: краткий перегрев сбрасывает 5 с, активный сохраняется в снимке до достоверного охлаждения',()=>{
 const s=working();source(s,170);s.advance(4900);source(s,169);source(s,170);s.advance(4900);assert.equal(s.temperature.overheat,false);s.advance(100);assert.equal(s.temperature.overheat,true);
 s.restart();assert.equal(s.temperature.overheat,true);s.advance(1000);assert.equal(s.temperature.overheat,true);source(s,159);assert.equal(s.temperature.overheat,false);
});

test('D-093/D-150: отсутствие температуры после reboot не мешает разрешённой циркуляции и не заменяет новое ШБ/Продолжить',()=>{
 const s=running();s.temperature.begin(s);source(s,40);s.restart();bootInputs(s,{required:null});s.advance(5000);s.tick();
 assert.equal(s.state,'STOPPING');assert.equal(s.temperature.fault,true);assert.equal(s.protection.stopStage,'WAIT_BYPASS');restoreCirculation(s);
 assert.equal(s.outputs.value('pump1.run'),true);assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.outputs.value('shod.voltage'),10);
 assert.equal(s.protection.bypassOpen,false);assert.equal(s.protection.restartContinued,false);source(s,80);assert.equal(s.outputs.value('vfd.run'),'START');assert.equal(s.coverageGap,null);
});

test('D-085/D-094: потеря циркуляции старше продолжения при отказе температуры; 10 с нормы не разрешают новый пуск без измерения',()=>{
 const s=running();s.temperature.begin(s);source(s,40);s.restart();bootInputs(s,{required:null});source(s,80);s.advance(5000);restoreCirculation(s);
 source(s,80,'GOOD',false);s.advance(5000);assert.equal(s.temperature.continuing,true);s.signals.set('flow',0);s.tick();assert.equal(s.outputs.value('vfd.run'),'STOP');
 deliver(s);s.sampleGroup('fanOff');s.signals.set('flow',8);s.tick();s.advance(10000);assert.equal(s.outputs.value('vfd.run'),'STOP');assert.equal(s.outputs.value('pump1.run'),true);
 source(s,80);s.advance(9999);assert.equal(s.outputs.value('vfd.run'),'STOP');s.advance(1);assert.equal(s.outputs.value('vfd.run'),'START');assert.equal(s.coverageGap,null);
});
