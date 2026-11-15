import test from 'node:test';import assert from 'node:assert/strict';
import{Simulation}from'../src/simulation.mjs';import{running}from'./helpers.mjs';
function water(s,a,b,r){for(const[name,value]of Object.entries({'temperature.supply':a,'temperature.backup':b,'temperature.return':r}))s.signals.set(name,value,value===null?'UNKNOWN':'GOOD');s.tick();}
function stopped(){const s=new Simulation();s.loadWaterFixture();return s;}
function work(){const s=running();s.temperature.begin(s);s.signals.set('temperature.fan',40);s.waterProtection.enabled=true;water(s,60,60,50);return s;}
test('D-023: ровно 90°C не перегрев, >90°C непрерывно 3 с; Пуск запрещается только при срабатывании',()=>{
 const s=stopped();water(s,90,60,50);s.advance(3000);assert.equal(s.waterProtection.overheat,false);assert.ok(!s.startReasons().some(r=>r.includes('водяной')));
 water(s,90.1,60,50);s.advance(2999);assert.equal(s.waterProtection.overheat,false);s.advance(1);assert.equal(s.waterProtection.overheat,true);
 assert.equal(s.command('start').result,'REJECTED');assert.equal(s.outputs.value('pump1.run'),false);assert.equal(s.outputs.value('vfd.run'),'STOP');
});
test('D-023/D-152: максимум включает резерв и обратку, краткое снижение сбрасывает 3 с',()=>{
 for(const values of [[60,91,50],[60,60,91]]){const s=stopped();water(s,...values);s.advance(2900);water(s,60,60,50);water(s,...values);s.advance(2999);assert.equal(s.waterProtection.overheat,false);s.advance(1);assert.equal(s.waterProtection.overheat,true);}
});
test('D-023: активный перегрев снимается при всех доступных <86°C, равенство не снимает',()=>{
 const s=stopped();water(s,91,60,50);s.advance(3000);water(s,85,86,50);assert.equal(s.waterProtection.overheat,true);
 water(s,85,85.9,50);assert.equal(s.waterProtection.overheat,false);assert.ok(!s.protection.faults.some(f=>f.code==='WATER_OVERHEAT'));
});
test('D-024: один исправный канал разрешает снятие перегрева; отсутствие всех не доказывает охлаждение',()=>{
 const s=stopped();water(s,91,60,50);s.advance(3000);water(s,null,null,null);assert.equal(s.waterProtection.overheat,true);assert.equal(s.waterProtection.supplyMissing,true);
 water(s,null,null,50);assert.equal(s.waterProtection.overheat,false);assert.equal(s.waterProtection.supplyMissing,true);assert.equal(s.outputs.value('heatRemoval.request'),true);
 assert.ok(s.protection.faults.some(f=>f.code==='WATER_SUPPLY_UNAVAILABLE'));
});
test('D-023: теплоотвод при ≥85°C через 3 с, удержание при 80 и снятие ниже 80',()=>{
 const s=stopped();water(s,84.9,60,50);s.advance(3000);assert.equal(s.outputs.value('heatRemoval.request'),false);
 water(s,85,60,50);s.advance(2999);assert.equal(s.outputs.value('heatRemoval.request'),false);s.advance(1);assert.equal(s.outputs.value('heatRemoval.request'),true);
 water(s,80,60,50);assert.equal(s.outputs.value('heatRemoval.request'),true);water(s,79.9,60,50);assert.equal(s.outputs.value('heatRemoval.request'),false);
});
test('D-024: потеря обеих подач при исправной обратке немедленно требует теплоотвод и запрещает Пуск',()=>{
 const s=stopped();water(s,null,null,50);assert.equal(s.waterProtection.supplyMissing,true);assert.equal(s.outputs.value('heatRemoval.request'),true);assert.equal(s.command('start').result,'REJECTED');
 water(s,null,60,50);assert.equal(s.waterProtection.supplyMissing,false);assert.equal(s.outputs.value('heatRemoval.request'),false);assert.equal(s.temperature.water.source,'BACKUP');
 assert.ok(!s.protection.faults.some(f=>f.code==='WATER_SUPPLY_UNAVAILABLE'));assert.equal(s.command('start').result,'ACCEPTED');
});
test('D-024: принудительный теплоотвод старше температурного снятия; восстановление не обнуляет тепловую защёлку',()=>{
 const s=stopped();water(s,85,60,50);s.advance(3000);water(s,null,null,82);assert.equal(s.waterProtection.thermalRemoval,true);assert.equal(s.outputs.value('heatRemoval.request'),true);
 water(s,82,82,82);assert.equal(s.waterProtection.supplyMissing,false);assert.equal(s.outputs.value('heatRemoval.request'),true);
 water(s,79,79,79);assert.equal(s.outputs.value('heatRemoval.request'),false);
});
test('D-023/D-024: работающий ТО продолжает работу при перегреве/потере подачи; насосы, частота и ШТ не переключаются',()=>{
 const s=work();const before=Object.fromEntries(['pump1.run','pump2.run','vfd.run','vfd.frequency','st.direction'].map(k=>[k,s.outputs.value(k)]));
 water(s,91,60,50);s.advance(3000);assert.equal(s.state,'RUNNING');water(s,null,null,50);assert.equal(s.state,'RUNNING');assert.equal(s.outputs.value('heatRemoval.request'),true);
 for(const[k,v]of Object.entries(before))assert.equal(s.outputs.value(k),v);assert.equal(s.protection.bypassOpen,false);assert.equal(s.coverageGap,null);
});
test('D-024: отказ основного с резервом/обратки — отдельные некритические признаки без запрета Пуска',()=>{
 const s=stopped();water(s,null,60,null);assert.deepEqual(s.waterProtection.warnings,['PRIMARY_FAILED_WITH_BACKUP','RETURN_FAILED']);
 assert.equal(s.waterProtection.supplyMissing,false);assert.equal(s.outputs.value('heatRemoval.request'),false);assert.equal(s.temperature.water.delta,null);assert.equal(s.command('start').result,'ACCEPTED');
});
test('D-155/D-024: BAD резерва удерживает подачу до раннего срока; свежий расход и OFF флага не продлевают её',()=>{
 const s=stopped();s.config.flowControl=false;water(s,null,60,50);s.signals.set('temperature.backup',60,'GOOD',true,false);s.advance(3000);s.signals.set('temperature.backup',999,'BAD');s.tick();
 assert.equal(s.waterProtection.supplyMissing,false);s.signals.set('flow',8);s.advance(1999);assert.equal(s.waterProtection.supplyMissing,false);s.advance(1);
 assert.equal(s.waterProtection.supplyMissing,true);assert.equal(s.outputs.value('heatRemoval.request'),true);s.signals.set('temperature.backup',60);s.tick();assert.equal(s.waterProtection.supplyMissing,false);
});
test('D-025: только RUNNING, >20°C 5 с; снятие ≤19°C 10 с, промежуточные нарушения сбрасывают сроки',()=>{
 const s=work();water(s,70,70,50);s.advance(5000);assert.equal(s.waterProtection.deltaWarning,false);water(s,71,71,50);s.advance(4900);
 water(s,70,70,50);water(s,71,71,50);s.advance(4999);assert.equal(s.waterProtection.deltaWarning,false);s.advance(1);assert.equal(s.waterProtection.deltaWarning,true);
 water(s,69,69,50);s.advance(9000);water(s,69.1,69.1,50);water(s,69,69,50);s.advance(9999);assert.equal(s.waterProtection.deltaWarning,true);s.advance(1);assert.equal(s.waterProtection.deltaWarning,false);
 assert.equal(s.state,'RUNNING');assert.equal(s.coverageGap,null);
});
test('D-025: останов/потеря ΔT снимают предупреждение, не ошибки датчиков; отрицательная ΔT не высокое значение',()=>{
 const s=work();water(s,71,71,50);s.advance(5000);s.command('stop');assert.equal(s.waterProtection.deltaWarning,false);assert.equal(s.waterProtection.deltaSince,null);
 const t=work();water(t,71,71,50);t.advance(5000);water(t,null,null,50);assert.equal(t.waterProtection.deltaWarning,false);assert.equal(t.waterProtection.supplyMissing,true);
 water(t,40,40,65);t.advance(5000);assert.equal(t.temperature.water.delta,-25);assert.equal(t.waterProtection.deltaWarning,false);
 const u=stopped();water(u,71,71,50);u.advance(10000);assert.equal(u.waterProtection.deltaWarning,false);
});
test('Водяные уставки: диапазоны и строгий порядок проверяются до изменения всего объекта',()=>{
 const s=stopped();s.command('engineering_enter',true);const original={...s.config};
 for(const v of [{waterOverheat:96},{waterRemovalOn:79},{waterRemovalOff:91},{waterRemovalOff:85,waterRemovalOn:85},{waterRemovalOn:90,waterOverheat:90},{deltaOn:19,deltaOff:19},{deltaOff:14}])assert.equal(s.command('engineering_water_settings',v).result,'REJECTED');
 assert.deepEqual(s.config,original);assert.equal(s.command('engineering_water_settings',{waterOverheat:92,waterRemovalOn:87,waterRemovalOff:81,deltaOn:22,deltaOff:20}).result,'ACCEPTED');
 water(s,87,60,50);s.advance(3000);assert.equal(s.outputs.value('heatRemoval.request'),true);
});
test('Водяной reboot восстанавливает обе согласованные защёлки без старых команд насосам',()=>{
 const s=stopped();water(s,91,60,50);s.advance(3000);s.restart();assert.equal(s.coverageGap,null);assert.equal(s.waterProtection.recoveryPending,false);
 assert.equal(s.outputs.value('heatRemoval.request'),true);assert.equal(s.outputs.value('pump1.run'),null);assert.equal(s.waterProtection.overheat,true);
});

test('Граница: новая водяная причина во время инженерной проверки не получает выдуманного продолжения',()=>{
  const s=stopped();s.command('engineering_enter',true);s.command('engineering_shod_test');
  const before=s.outputs.value('pump1.run');water(s,null,null,50);assert.ok(s.coverageGap);assert.equal(s.outputs.value('pump1.run'),before);
  assert.equal(s.protection.bypassOpen,false);assert.notEqual(s.state,'STOPPING');
});
