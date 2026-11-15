import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { running,deliver } from './helpers.mjs';
import { fanFeedback } from './thermal-helpers.mjs';
import { bootInputs,restoreCooling,restoreCirculation,repeatCooling } from './cooling-reboot-helpers.mjs';

test('D-080/D-150: из STOPPED охлаждение возобновляется по новым данным/STOP/5 с сети, насосы не включаются',()=>{
  const sim=new Simulation();sim.loadCoolingFixture();sim.manualFrequency=39;sim.restart();
  assert.equal(sim.signals.read('cooling.required'),null);assert.equal(sim.cooling.lastKnownRequest,true);
  assert.equal(sim.outputs.value('vfd.run'),null);bootInputs(sim,{closed:true});sim.advance(4900);
  assert.equal(sim.state,null);assert.equal(sim.outputs.value('vfd.run'),'STOP');sim.advance(100);sim.tick();
  assert.equal(sim.state,'STOPPED');assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.outputs.value('vfd.frequency'),25);
  assert.equal(sim.outputs.value('pump1.run'),false);assert.equal(sim.outputs.value('pump2.run'),false);
  assert.equal(sim.manualFrequency,39);assert.equal(sim.engineering.enabled,false);assert.equal(sim.coverageGap,null);
});

test('D-150: из RUN/START/STOP — только STOPPING и охлаждение; ШБ/Продолжить новые и отдельные',()=>{
  const makeStart=()=>{const s=new Simulation();s.loadFixture();s.command('start');return s;};
  const makeStop=()=>{const s=running();s.command('stop');s.command('confirm_bypass_open');return s;};
  for(const make of [running,makeStart,makeStop]){
    const sim=make(),old=sim.procedureId;restoreCooling(sim,{closed:true});
    assert.equal(sim.state,'STOPPING');assert.equal(sim.outputs.value('vfd.run'),'START');
    assert.equal(sim.protection.stopStage,'WAIT_BYPASS');assert.equal(sim.protection.bypassOpen,false);
    assert.equal(sim.command('continue_stop_after_restart').result,'REJECTED');assert.equal(sim.command('start').result,'REJECTED');
    assert.equal(sim.command('confirm_bypass_open',undefined,old).result,'REJECTED');
    sim.command('confirm_bypass_open');assert.equal(sim.state,'STOPPING');sim.command('continue_stop_after_restart');
    assert.equal(sim.state,'STOPPED');assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.coverageGap,null);
  }
});

test('D-084: при незакрытом ШТ нужны новая циркуляция/OPEN+5 с и Q+ΔP независимо от флага',()=>{
  const sim=restoreCooling();sim.config.flowControl=false;
  assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('shod.voltage'),10);
  sim.sampleGroup('valvesClosed');sim.sampleGroup('pump1On');sim.advance(1000);sim.sampleGroup('valve1Open');
  sim.advance(4900);assert.equal(sim.outputs.value('vfd.run'),'STOP');sim.signals.set('flow',null,'UNKNOWN');sim.advance(100);
  assert.equal(sim.outputs.value('vfd.run'),'STOP');sim.signals.set('flow',8);sim.tick();
  assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.boot.circulationRestored,true);
  assert.equal(sim.protection.bypassOpen,false);assert.equal(sim.outputs.value('st.direction'),'STOP');assert.equal(sim.state,'STOPPING');
});

test('D-093: неизвестный нормализованный запрос не становится FALSE и не мешает независимой циркуляции',()=>{
  const sim=restoreCooling(running(),{required:null});restoreCirculation(sim);
  assert.equal(sim.outputs.value('shod.voltage'),10);assert.equal(sim.outputs.value('vfd.run'),'STOP');
  assert.equal(sim.state,'STOPPING');assert.equal(sim.signals.read('cooling.required'),null);
  sim.signals.set('cooling.required',true);sim.tick();assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.coverageGap,null);
});

test('D-150: при охлаждении закрытие ШТ завершает насосный останов без отключения разрешённого дымососа',()=>{
  const sim=restoreCirculation(restoreCooling());
  sim.command('confirm_bypass_open');assert.equal(sim.outputs.value('st.direction'),'STOP');sim.command('continue_stop_after_restart');
  assert.equal(sim.outputs.value('st.direction'),'CLOSE');sim.sampleGroup('stClosed');
  assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.outputs.value('valve1.direction'),'CLOSE');
  sim.sampleGroup('valve1Closed');sim.sampleGroup('pump1Off');
  assert.equal(sim.state,'STOPPED');assert.equal(sim.outputs.value('pump1.run'),false);assert.equal(sim.outputs.value('vfd.run'),'START');
  assert.equal(sim.coverageGap,null);
});

test('D-085/D-086: низкий Q немедленно прекращает охлаждение, не насос; 8 с нормы+нарушение требуют новых 10 с',()=>{
  const sim=restoreCirculation(restoreCooling());sim.signals.set('flow',0);sim.tick();
  assert.equal(sim.outputs.value('pump1.run'),true);assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('shod.voltage'),10);
  deliver(sim);fanFeedback(sim,0,false);sim.signals.set('flow',8);sim.tick();sim.advance(8000);
  sim.signals.set('pressure.after',1.1);sim.tick();sim.signals.set('pressure.after',2);sim.tick();sim.advance(9900);
  assert.equal(sim.outputs.value('vfd.run'),'STOP');sim.advance(100);assert.equal(sim.outputs.value('vfd.run'),'START');
  assert.equal(sim.fanTest.coolingBlocked,false);assert.equal(sim.vfdGuard.blocked,false);
});

test('D-085: устаревший расход снимает допуск после прежних 5 с, нормальный ΔP не подменяет Q',()=>{
  const sim=restoreCirculation(restoreCooling());sim.config.flowControl=false;
  sim.signals.set('flow',8,'GOOD',true,false);sim.advance(4900);assert.equal(sim.outputs.value('vfd.run'),'START');
  sim.advance(100);assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('pump1.run'),true);
});

test('D-245/самостоятельная блокировка ПЧ переживают reboot; обязательный повтор диапазона сам охлаждение не запрещает',()=>{
  for(const kind of ['COOLING','VFD','RANGE']){
    const sim=new Simulation();sim.loadFixture();
    if(kind==='COOLING')sim.fanTest.coolingBlocked=true;
    if(kind==='VFD'){sim.vfdGuard.blocked=true;sim.vfdGuard.causes=['SAVED_VFD'];}
    sim.fanTest.rangeRequired=true;sim.fanTest.ordinaryBlocked=true;
    restoreCooling(sim,{closed:true});
    assert.equal(sim.outputs.value('vfd.run'),kind==='RANGE'?'START':'STOP');assert.equal(sim.outputs.value('shod.voltage'),10);
    assert.equal(sim.fanTest.rangeRequired,true);assert.equal(sim.fanTest.ordinaryBlocked,true);assert.equal(sim.outputs.value('pump1.run'),false);
  }
});

test('D-103: незавершённый STOP после reboot получает новые доставку/30 с; поздний OFF не снимает блокировку',()=>{
  const sim=new Simulation();sim.loadCoolingFixture();sim.signals.set('cooling.required',false);sim.tick();deliver(sim);sim.advance(29000);
  assert.equal(sim.vfdGuard.blocked,false);sim.restart();bootInputs(sim,{closed:true,fanRunning:true});
  fanFeedback(sim,25);sim.advance(29000);assert.equal(sim.state,null);assert.equal(sim.vfdGuard.blocked,false);
  const cmd=sim.outputs.commands['vfd.run'];sim.outputs.deliver('vfd.run',cmd.id);sim.tick();sim.advance(1000);
  assert.equal(sim.vfdGuard.blocked,true);assert.ok(sim.vfdGuard.causes.includes('VFD_STOP_NOT_CONFIRMED'));
  fanFeedback(sim,0,false);sim.tick();assert.equal(sim.state,'STOPPED');assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.vfdGuard.blocked,true);
});

test('Частичные/неизвестные фазы после reboot не получают согласование OFF для 111/000',()=>{
  for(const phases of [[true,false,false],[null,null,null]]){
    const sim=new Simulation();sim.loadFixture();sim.restart();sim.sampleGroup('bootPermits');sim.signals.set('cooling.required',true);
    for(const [i,p]of ['l1','l2','l3'].entries())sim.signals.set('pump1.'+p,phases[i],phases[i]===null?'UNKNOWN':'GOOD');
    sim.sampleGroup('pump2Off');sim.sampleGroup('stClosed');sim.sampleGroup('fanOff');deliver(sim);sim.sampleGroup('fanOff');sim.advance(5000);
    assert.equal(sim.state,null);assert.equal(sim.outputs.value('pump1.run'),null);assert.equal(sim.outputs.value('pump2.run'),null);
    assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.ok(sim.boot.reasons.length);
  }
});

test('Согласование 15.11: STOPPED/CLOSED/охлаждение и одна 111/другая 000 — OFF обоим, затем прежняя диагностика 1 с',()=>{
  for(const pump of [1,2]){
    const sim=new Simulation();sim.loadFixture();sim.restart();sim.sampleGroup('bootPermits');sim.signals.set('cooling.required',true);
    sim.sampleGroup('pump'+pump+'On');sim.sampleGroup('pump'+(3-pump)+'Off');sim.sampleGroup('stClosed');
    assert.equal(sim.boot.initialOffAccepted,true);assert.equal(sim.outputs.value('pump1.run'),false);assert.equal(sim.outputs.value('pump2.run'),false);
    sim.sampleGroup('flowNormal');sim.sampleGroup('fanOff');deliver(sim);sim.sampleGroup('fanOff');sim.advance(900);
    assert.equal(sim.pumps.branches[pump].electricalIsolation,false);sim.advance(100);
    assert.equal(sim.pumps.branches[pump].electricalIsolation,true);assert.ok(sim.protection.faults.some(f=>f.code==='VOLTAGE_WHEN_OFF_'+pump));
    assert.equal(sim.outputs.value('valve'+pump+'.direction'),'STOP');assert.equal(sim.state,null);assert.equal(sim.outputs.value('vfd.run'),'STOP');
    sim.sampleGroup('pump'+pump+'Off');sim.advance(4000);sim.tick();
    assert.equal(sim.state,'STOPPED');assert.equal(sim.outputs.value('vfd.run'),'START');
    assert.equal(sim.pumps.branches[pump].inhibited,true);assert.ok(sim.protection.faults.some(f=>f.code==='VOLTAGE_WHEN_OFF_'+pump));
  }
});

test('Согласованный начальный OFF: быстрые новые 000 до 1 с не создают ложной неисправности',()=>{
  const sim=new Simulation();sim.loadFixture();sim.restart();sim.sampleGroup('bootPermits');sim.signals.set('cooling.required',true);
  sim.sampleGroup('pump1On');sim.sampleGroup('pump2Off');sim.sampleGroup('stClosed');sim.advance(900);sim.sampleGroup('pump1Off');sim.advance(100);
  assert.equal(sim.pumps.branches[1].electricalIsolation,false);assert.equal(sim.outputs.value('pump1.run'),false);assert.equal(sim.coverageGap,null);
});

test('Согласование OFF не расширено на обе 111, открытый ШТ, отсутствие запроса и прежнее RUNNING',()=>{
  for(const kind of ['BOTH_111','OPEN','NO_REQUEST','RUNNING']){
    const sim=kind==='RUNNING'?running():new Simulation();if(kind!=='RUNNING')sim.loadFixture();sim.restart();sim.sampleGroup('bootPermits');
    sim.signals.set('cooling.required',kind!=='NO_REQUEST');sim.sampleGroup('pump1On');sim.sampleGroup(kind==='BOTH_111'?'pump2On':'pump2Off');
    sim.sampleGroup(kind==='OPEN'?'stOpen':'stClosed');sim.advance(5000);
    assert.equal(sim.boot.initialOffAccepted,false);assert.equal(sim.outputs.value('pump1.run'),null);assert.equal(sim.outputs.value('pump2.run'),null);
  }
});

test('D-086: недостоверный запрос во время восстановления нормы не засчитывается в 10 с',()=>{
  const sim=restoreCirculation(restoreCooling());sim.signals.set('flow',0);sim.tick();deliver(sim);fanFeedback(sim,0,false);
  sim.signals.set('flow',8);sim.tick();sim.advance(8000);sim.signals.set('cooling.required',null,'UNKNOWN');sim.tick();sim.advance(5000);
  sim.signals.set('cooling.required',true);sim.tick();sim.advance(9900);assert.equal(sim.outputs.value('vfd.run'),'STOP');
  sim.advance(100);assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.coverageGap,null);
});

test('D-090: третья повторная попытка за 10 минут только предупреждает; повтор записи и начальный пуск не считаются',()=>{
  const sim=restoreCirculation(restoreCooling());assert.equal(sim.cooling.repeatEvents.length,0);
  for(let i=1;i<=3;i++){repeatCooling(sim);assert.equal(sim.cooling.repeatEvents.length,i);assert.equal(sim.cooling.repeatWarning,i===3);}
  const cmd=sim.outputs.commands['vfd.run'];sim.outputs.deliver('vfd.run',cmd.id);fanFeedback(sim,25);
  assert.equal(sim.cooling.repeatEvents.length,3);assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.vfdGuard.blocked,false);
  assert.equal(sim.fanTest.coolingBlocked,false);assert.equal(sim.telemetry().cooling.repeatWarning,true);
});

test('D-091: история/возраст/предупреждение сохраняются в памяти, простой и сбор входов не расходуют срок',()=>{
  const sim=restoreCirculation(restoreCooling());for(let i=0;i<3;i++)repeatCooling(sim);sim.advance(5000);
  const ages=[...sim.cooling.repeatEvents],since=sim.cooling.sinceRepeat;
  sim.restart({downtimeMs:120000});sim.advance(30000);
  assert.deepEqual(sim.cooling.repeatEvents,ages);assert.equal(sim.cooling.sinceRepeat,since);assert.equal(sim.cooling.manualClosed,null);
  bootInputs(sim);sim.advance(5000);assert.deepEqual(sim.cooling.repeatEvents,ages);assert.equal(sim.cooling.repeatWarning,true);
  sim.advance(100);assert.equal(sim.cooling.sinceRepeat,since+100);assert.equal(sim.outputs.value('vfd.run'),'STOP');
});

test('D-091: выпадение старых событий из окна не снимает предупреждение до 10 минут без нового пуска',()=>{
  const sim=restoreCirculation(restoreCooling());sim.cooling.repeatEvents=[590000,500000,100000];sim.cooling.sinceRepeat=100000;sim.cooling.repeatWarning=true;
  sim.advance(20000);assert.equal(sim.cooling.repeatEvents.length,2);assert.equal(sim.cooling.repeatWarning,true);
  for(let i=0;i<4;i++)sim.advance(120000);assert.equal(sim.cooling.repeatWarning,false);assert.equal(sim.outputs.value('vfd.run'),'START');
});

test('D-090: обычное прекращение/новый запрос охлаждения не считаются повтором после циркуляции',()=>{
  const sim=restoreCirculation(restoreCooling());repeatCooling(sim);const count=sim.cooling.repeatEvents.length;
  sim.signals.set('cooling.required',false);sim.tick();deliver(sim);fanFeedback(sim,0,false);
  sim.signals.set('cooling.required',true);sim.tick();assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.cooling.repeatEvents.length,count);
});

test('D-091: новый Пуск ТО не стирает историю; поздний обычный останов не наследует специальный профиль reboot',()=>{
  const sim=restoreCirculation(restoreCooling());for(let i=0;i<3;i++)repeatCooling(sim);
  sim.command('confirm_bypass_open');sim.command('continue_stop_after_restart');sim.sampleGroup('stClosed');sim.sampleGroup('valve1Closed');sim.sampleGroup('pump1Off');
  sim.signals.set('cooling.required',false);sim.tick();deliver(sim);fanFeedback(sim,0,false);sim.sampleGroup('valve1Open');sim.sampleGroup('valve2Open');
  assert.equal(sim.command('start').result,'ACCEPTED');assert.equal(sim.cooling.repeatEvents.length,3);assert.equal(sim.cooling.repeatWarning,true);
  sim.command('stop');assert.equal(sim.protection.needsRestartContinue,false);
  sim.signals.set('cooling.required',true);sim.tick();assert.ok(sim.coverageGap); // Обычный останов с охлаждением остаётся отдельным нерасширенным профилем.
});
