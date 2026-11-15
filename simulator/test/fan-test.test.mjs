import test from 'node:test';
import assert from 'node:assert/strict';
import { engineer, deliver } from './helpers.mjs';
import { cooling, fanFeedback, fanStop, fanAtFirst, fanPassed } from './thermal-helpers.mjs';

const start=sim=>assert.equal(sim.command('engineering_fan_test').result,'ACCEPTED');
const next=sim=>sim.command('engineering_fan_continue');

test('D-237/D-247: работающий на охлаждение сначала полностью останавливается; ШОД не условие пуска теста',()=>{
  const sim=cooling(false);sim.signals.set('shod.feedback',null,'BAD');start(sim);
  assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('vfd.enable'),false);
  sim.advance(5000);assert.equal(sim.fanTest.active.stage,'PREPARE_STOP');
  sim.signals.set('vfd.running',false);sim.tick();deliver(sim); // Старый OFF до записи STOP недостаточен.
  assert.equal(sim.fanTest.active.stage,'PREPARE_STOP');
  fanFeedback(sim,0,false);assert.equal(sim.fanTest.active.stage,'TRACK');fanAtFirst(sim);
  assert.equal(sim.outputs.value('vfd.frequency'),20);assert.equal(sim.outputs.value('shod.voltage'),10);
  assert.equal(sim.signals.read('cooling.required'),true);assert.equal(sim.coverageGap,null);
});

test('D-238/D-239/D-240: каждую ступень продолжает инженер, плавность 0,5 Гц/с без обхода резонанса',()=>{
  const sim=engineer();sim.config.resonance={low:21,high:24,hysteresis:1};start(sim);fanAtFirst(sim);
  sim.advance(60000);assert.equal(sim.fanTest.active.index,0);assert.equal(sim.outputs.value('vfd.frequency'),20);
  assert.equal(next(sim).result,'ACCEPTED');assert.equal(next(sim).result,'REJECTED');
  sim.advance(5000);assert.equal(sim.outputs.value('vfd.frequency'),22.5);assert.equal(sim.fanTest.active.stage,'RAMP');
  fanFeedback(sim,25);assert.equal(next(sim).result,'REJECTED');
  sim.advance(5000);assert.equal(sim.outputs.value('vfd.frequency'),25);assert.equal(sim.fanTest.active.reachAt,null);
  deliver(sim);assert.equal(next(sim).result,'REJECTED'); // Нужна обратная связь после принятой записи.
  fanFeedback(sim,25.5);assert.equal(next(sim).result,'ACCEPTED');
});

test('D-241: начальные 10 с после Работа=1 и записи Fmin, повтор записи не продлевает срок',()=>{
  const sim=engineer();start(sim);sim.advance(100);deliver(sim);sim.advance(9000);
  assert.equal(sim.fanTest.active.reachAt,null);fanFeedback(sim,18);const at=sim.fanTest.active.reachAt;
  sim.advance(9000);const cmd=sim.outputs.commands['vfd.frequency'];sim.outputs.deliver('vfd.frequency',cmd.id);sim.tick();
  assert.equal(sim.fanTest.active.reachAt,at);sim.advance(1000);
  assert.equal(sim.fanTest.active.stage,'WAIT_STOP');assert.equal(sim.fanTest.ordinaryBlocked,true);assert.equal(sim.fanTest.coolingBlocked,true);
  assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('shod.voltage'),10);
  fanStop(sim);assert.equal(sim.fanTest.result.result,'FAILED');
});

test('D-242: отклонение сразу блокирует Продолжить; возврат до 10 с сбрасывает только таймер удержания',()=>{
  const sim=engineer();start(sim);fanAtFirst(sim);fanFeedback(sim,21);
  assert.equal(next(sim).result,'REJECTED');sim.advance(9900);fanFeedback(sim,20);
  sim.advance(100);assert.equal(sim.fanTest.active.stage,'HOLD');fanFeedback(sim,19);sim.advance(10000);
  assert.equal(sim.fanTest.active.stage,'WAIT_STOP');assert.match(sim.fanTest.active.reason,/не удержана/);
  assert.equal(sim.fanTest.coolingBlocked,true);assert.equal(sim.fanTest.ordinaryBlocked,true);
});

test('D-238/D-244/D-245: отмена немедленно STOP, сохраняет последнюю частоту и время; квитирование/reboot не снимают запреты',()=>{
  const sim=engineer();start(sim);fanAtFirst(sim);sim.advance(1000);fanFeedback(sim,20.2);
  const at=sim.signals.get('vfd.frequency').lastGoodAt;sim.command('engineering_stop');
  assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('vfd.enable'),false);
  assert.equal(sim.fanTest.active.lastGoodFrequency,20.2);assert.equal(sim.fanTest.active.lastGoodAt,at);
  sim.signals.set('vfd.frequency',3);sim.tick();assert.equal(sim.fanTest.active.lastGoodFrequency,20.2);
  sim.command('acknowledge');assert.equal(sim.fanTest.ordinaryBlocked,true);sim.restart();
  assert.equal(sim.fanTest.active,null);assert.equal(sim.engineering.enabled,false);
  assert.equal(sim.fanTest.ordinaryBlocked,true);assert.equal(sim.fanTest.coolingBlocked,true);
  assert.equal(sim.outputs.value('vfd.run'),null); // До новых входов выходы неизвестны; снимок не подтверждает STOP.
});

test('D-248: успех только после последней команды и нового OFF после STOP; D-244 снимается, D-245 остаётся',()=>{
  const sim=engineer();sim.fanTest.ordinaryBlocked=true;sim.fanTest.coolingBlocked=true;sim.fanTest.rangeRequired=true;
  start(sim);fanPassed(sim);
  assert.equal(sim.fanTest.ordinaryBlocked,false);assert.equal(sim.fanTest.rangeRequired,false);assert.equal(sim.fanTest.coolingBlocked,true);
  assert.equal(sim.outputs.value('shod.voltage'),10);assert.equal(sim.state,'STOPPED');
});

test('D-248: конец теста ждёт STOP, охлаждение автоматически возвращается лишь после нового доказательства',()=>{
  const sim=engineer();sim.config.fmax=25;start(sim);fanAtFirst(sim);
  sim.signals.set('cooling.required',true);sim.tick();assert.equal(sim.fanTest.active.stage,'HOLD');
  next(sim);sim.advance(10000);deliver(sim);fanFeedback(sim,25);
  assert.equal(sim.fanTest.active.stage,'HOLD');assert.equal(sim.fanTest.result.result,'NOT_CHECKED');
  next(sim);assert.equal(sim.fanTest.active.stage,'WAIT_STOP');assert.equal(sim.outputs.value('vfd.run'),'STOP');
  sim.signals.set('vfd.running',false);sim.tick();deliver(sim);assert.equal(sim.fanTest.active.stage,'WAIT_STOP');
  fanFeedback(sim,0,false);assert.equal(sim.fanTest.result.result,'PASSED');sim.tick();
  assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.outputs.value('vfd.frequency'),25);
});

test('D-246: отдельное восстановление требует всех подтверждений и снимает только D-245; возможно автоматическое охлаждение',()=>{
  const sim=engineer();start(sim);fanAtFirst(sim);sim.command('engineering_stop');fanStop(sim);
  const c={inspected:true,causeRemoved:true,workFinished:true,allowAutomatic:true};
  for(const key of Object.keys(c))assert.equal(sim.command('engineering_cooling_restore',{...c,[key]:false}).result,'REJECTED');
  sim.signals.set('cooling.required',true);sim.tick();assert.equal(sim.outputs.value('vfd.run'),'STOP');
  assert.equal(sim.command('engineering_cooling_restore',c).result,'ACCEPTED');assert.equal(sim.outputs.value('vfd.run'),'START');
  assert.equal(sim.fanTest.ordinaryBlocked,true);assert.equal(sim.fanTest.result.result,'FAILED');
});

test('D-243: потеря CLOSED до конца STOP немедленна, без новой D-245, без перезапуска таймера останова',()=>{
  const sim=engineer();start(sim);fanAtFirst(sim);sim.signals.set('st.closed',false);sim.tick();
  assert.equal(sim.fanTest.active.stage,'WAIT_STOP');assert.equal(sim.outputs.value('vfd.run'),'STOP');
  assert.equal(sim.fanTest.coolingBlocked,false);assert.equal(sim.fanTest.ordinaryBlocked,false);
  deliver(sim);const at=sim.vfdGuard.stopAt;sim.advance(29000);sim.sampleGroup('stClosed');sim.signals.set('st.closed',false);sim.tick();
  assert.equal(sim.vfdGuard.stopAt,at);sim.advance(1000);assert.equal(sim.vfdGuard.blocked,true);
  assert.ok(sim.vfdGuard.causes.includes('VFD_STOP_NOT_CONFIRMED'));
});

for(const prior of [false,true])test('Согласование HMI 15.11: после 5 с только существующие блокировки, прежние='+prior,()=>{
  const sim=engineer();sim.fanTest.ordinaryBlocked=prior;sim.fanTest.coolingBlocked=prior;sim.fanTest.rangeRequired=true;
  start(sim);fanAtFirst(sim);sim.exchange.hmi=false;sim.advance(4900);assert.equal(sim.fanTest.active.stage,'HOLD');sim.advance(100);
  assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('vfd.enable'),false);
  assert.equal(sim.fanTest.ordinaryBlocked,prior);assert.equal(sim.fanTest.coolingBlocked,prior);assert.equal(sim.fanTest.rangeRequired,true);
  fanStop(sim);assert.equal(sim.fanTest.result.result,'NOT_CHECKED');assert.match(sim.fanTest.result.reason,/HMI/);
  sim.exchange.hmi=true;sim.advance(100);assert.equal(sim.fanTest.active,null);
});

test('D-249: BAD/устаревшая фактическая частота не ноль и не отказ удержания; старые требования сохраняются',()=>{
  for(const bad of [true,false]){
    const sim=engineer();sim.fanTest.rangeRequired=true;start(sim);fanAtFirst(sim);
    sim.signals.set('vfd.frequency',20,bad?'BAD':'GOOD',bad,false);sim.tick();
    assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(next(sim).result,'REJECTED');
    assert.equal(sim.fanTest.coolingBlocked,false);assert.equal(sim.fanTest.ordinaryBlocked,false);assert.equal(sim.fanTest.rangeRequired,true);
    fanStop(sim);assert.equal(sim.fanTest.result.result,'NOT_CHECKED');
  }
});

test('D-239/D-279–D-283: настройки и резерв проверяются, блокируются до STOP; изменение диапазона не запрещает охлаждение',()=>{
  const sim=engineer();const pair={fmin:30,fmax:55,reserveFrequency:35,reserveConfirmed:true};
  assert.equal(sim.command('engineering_fan_settings',{...pair,reserveConfirmed:false}).result,'REJECTED');
  sim.config.resonance={low:30,high:32,hysteresis:1};
  assert.equal(sim.command('engineering_fan_settings',pair).result,'REJECTED');sim.config.resonance=null;
  assert.equal(sim.command('engineering_fan_settings',pair).result,'ACCEPTED');assert.equal(sim.fanTest.rangeRequired,true);
  const manual=sim.manualFrequency;sim.signals.set('cooling.required',true);sim.tick();
  assert.equal(sim.outputs.value('vfd.frequency'),30);assert.equal(sim.manualFrequency,manual); // LIMIT, исходная настройка не переписана.
  deliver(sim);fanFeedback(sim,30);start(sim);
  assert.equal(sim.command('engineering_fan_settings',{rate:1}).result,'REJECTED');
  assert.equal(sim.command('engineering_fan_settings',pair).result,'REJECTED');fanStop(sim);fanAtFirst(sim);
  assert.deepEqual(sim.fanTest.active.targets,[30,35,40,45,50,55]);sim.command('engineering_stop');
  assert.equal(sim.command('engineering_fan_settings',{rate:1}).result,'REJECTED');fanStop(sim);
  assert.equal(sim.command('engineering_fan_settings',{rate:1}).result,'ACCEPTED');
});

test('Нереализованные сочетания инженерного теплового профиля явно ставят модель на паузу',()=>{
  for(const signal of ['configuration.ready','emergency','vfd.exchange','temperature.normal']){
    const sim=engineer();start(sim);fanAtFirst(sim);sim.signals.set(signal,signal==='emergency');sim.tick();
    assert.ok(sim.coverageGap);assert.notEqual(sim.fanTest.result.result,'PASSED');
  }
});
