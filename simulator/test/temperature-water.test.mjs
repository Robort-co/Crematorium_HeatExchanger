import test from 'node:test';import assert from 'node:assert/strict';import {Simulation}from'../src/simulation.mjs';
function model(){const s=new Simulation();s.loadTemperatureFixture();s.signals.set('temperature.fan',40);s.tick();return s;}
function water(s,a,b,r=50){for(const[name,v]of Object.entries({'temperature.supply':a,'temperature.backup':b,'temperature.return':r}))s.signals.set(name,v,v===null?'UNKNOWN':'GOOD');s.tick();}
test('D-152: расчёт основной→резерв→основной, защита максимум всех трёх, обратка не заменяет подачу',()=>{
 const s=model();water(s,60,70,80);assert.equal(s.temperature.water.source,'PRIMARY');assert.equal(s.temperature.water.delta,-20);assert.equal(s.temperature.water.protectionMaximum,80);
 s.signals.set('temperature.supply',null,'UNKNOWN');s.tick();assert.equal(s.temperature.water.source,'BACKUP');assert.equal(s.temperature.water.delta,-10);
 s.signals.set('temperature.supply',65);s.tick();assert.equal(s.temperature.water.source,'PRIMARY');assert.equal(s.temperature.water.delta,-15);
 water(s,null,null,80);assert.equal(s.temperature.water.supplyMissing,true);assert.equal(s.temperature.water.selected,null);assert.equal(s.temperature.water.delta,null);assert.equal(s.temperature.water.protectionMaximum,80);
});
test('D-152: отсутствующая обратка даёт Нет данных для ΔT, не ноль; расхождение не выключает источник',()=>{
 const s=model();water(s,60,70,null);s.advance(10000);assert.equal(s.temperature.water.delta,null);assert.equal(s.temperature.differenceWarning,true);
 assert.equal(s.temperature.water.source,'PRIMARY');assert.equal(s.temperature.water.protectionMaximum,70);assert.equal(s.command('start').result,'ACCEPTED');
});
test('D-152: >5°C непрерывно 10 с, ровно 5 и недостоверность сбрасывают незавершённый срок',()=>{
 const s=model();water(s,60,65);s.advance(10000);assert.equal(s.temperature.differenceWarning,false);water(s,60,66);s.advance(9000);
 water(s,null,66);water(s,60,66);s.advance(9999);assert.equal(s.temperature.differenceWarning,false);s.advance(1);assert.equal(s.temperature.differenceWarning,true);
});
test('D-152: активное предупреждение держится при UNKNOWN/промежутке, снятие ≤3°C ровно 10 с',()=>{
 const s=model();water(s,60,66);s.advance(10000);water(s,60,64);s.advance(10000);assert.equal(s.temperature.differenceWarning,true);
 water(s,60,63);s.advance(9000);water(s,null,63);s.advance(10000);assert.equal(s.temperature.differenceWarning,true);
 water(s,60,63);s.advance(9999);assert.equal(s.temperature.differenceWarning,true);s.advance(1);assert.equal(s.temperature.differenceWarning,false);
});
test('D-152: изменение порога сбрасывает только незавершённое снятие; предупреждение сохраняется',()=>{
 const s=model();water(s,60,66);s.advance(10000);water(s,60,62);s.advance(9000);s.command('engineering_enter',true);
 assert.equal(s.command('engineering_temperature_settings',{supplyDifferenceClear:2}).result,'ACCEPTED');s.advance(9999);assert.equal(s.temperature.differenceWarning,true);s.advance(1);assert.equal(s.temperature.differenceWarning,false);
});
test('D-152: reboot сохраняет предупреждение, но обе 10-секундные выдержки начинаются по новым данным',()=>{
 const s=model();water(s,60,66);s.advance(10000);water(s,60,62);s.advance(9000);s.restart({downtimeMs:120000});s.advance(5000);
 assert.equal(s.temperature.differenceWarning,true);assert.equal(s.temperature.water.source,null);water(s,60,62);s.advance(9999);assert.equal(s.temperature.differenceWarning,true);s.advance(1);assert.equal(s.temperature.differenceWarning,false);
 const t=model();water(t,60,66);t.advance(9000);t.restart();water(t,60,66);t.advance(9999);assert.equal(t.temperature.differenceWarning,false);t.advance(1);assert.equal(t.temperature.differenceWarning,true);
});
test('D-153/D-155: расход и резервная температура имеют раздельные свежесть и диагностические 5 с',()=>{
 const s=model();s.config.flowControl=false;s.signals.set('flow',8,'GOOD',true,false);water(s,60,61);s.advance(5000);
 assert.equal(s.signals.read('flow'),null);assert.equal(s.temperature.water.backup,61);s.signals.set('flow',8);s.signals.set('temperature.backup',61,'GOOD',true,false);s.advance(4000);
 s.signals.set('temperature.backup',999,'BAD');s.tick();assert.equal(s.temperature.water.backup,61);assert.equal(s.signals.tuf('temperature.backup').held,true);s.advance(999);assert.equal(s.temperature.water.backup,61);s.advance(1);
 assert.equal(s.temperature.water.backup,null);assert.equal(s.signals.read('flow'),8);assert.equal(s.temperature.water.source,'PRIMARY');
});
test('D-155: повтор BAD не продлевает срок; новое корректное то же значение снимает диагностику независимо от расхода',()=>{
 const s=model();water(s,60,61);s.signals.set('temperature.backup',-999,'BAD');s.tick();s.advance(4000);const since=s.signals.get('temperature.backup').diagnosticSince;
 s.signals.set('temperature.backup',-998,'BAD');assert.equal(s.signals.get('temperature.backup').diagnosticSince,since);s.signals.set('flow',null,'BAD');s.signals.set('temperature.backup',61);s.tick();s.advance(2000);
 assert.equal(s.temperature.water.backup,61);assert.equal(s.signals.get('temperature.backup').diagnosticSince,null);assert.notEqual(s.signals.get('flow').diagnosticSince,null);
});

test('D-155: без первого корректного TUF нет значения; отсутствие ответов не снимает начавшуюся диагностику',()=>{
 const s=model();s.signals.set('temperature.backup',90,'BAD',true,false);s.tick();assert.equal(s.temperature.water.backup,null);assert.equal(s.signals.tuf('temperature.backup').held,false);
 s.signals.set('temperature.backup',60);s.signals.set('temperature.backup',90,'BAD',true,false);s.tick();s.advance(4900);assert.equal(s.temperature.water.backup,60);
 s.signals.set('flow',8);s.advance(100);assert.equal(s.temperature.water.backup,null);assert.notEqual(s.signals.get('temperature.backup').diagnosticSince,null);
});
