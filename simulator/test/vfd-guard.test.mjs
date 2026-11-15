import test from 'node:test';
import assert from 'node:assert/strict';
import { engineer, deliver } from './helpers.mjs';
import { fanAtFirst, fanFeedback, fanStop } from './thermal-helpers.mjs';

test('D-053: отсутствие нового Работа=1 за 10 с не подтверждает пуск, UNKNOWN и старое TRUE не заменяют ответ',()=>{
  for(const unknown of [true,false]){
    const sim=engineer();sim.command('engineering_fan_test');sim.advance(100);
    sim.signals.set('vfd.running',unknown?null:true,unknown?'UNKNOWN':'GOOD',true,false);deliver(sim);sim.advance(10000);
    assert.ok(sim.vfdGuard.causes.includes('VFD_START_NOT_CONFIRMED'));assert.equal(sim.outputs.value('vfd.run'),'STOP');
    assert.equal(sim.fanTest.ordinaryBlocked,false);assert.equal(sim.fanTest.coolingBlocked,false);
  }
});

test('D-053: неподтверждённый пуск 10 с, повтор доставки START не перезапускает отсчёт',()=>{
  const sim=engineer();sim.command('engineering_fan_test');sim.advance(100);deliver(sim);sim.advance(9000);
  const cmd=sim.outputs.commands['vfd.run'];sim.outputs.deliver('vfd.run',cmd.id);sim.tick();sim.advance(1000);
  assert.equal(sim.vfdGuard.blocked,true);assert.ok(sim.vfdGuard.causes.includes('VFD_START_NOT_CONFIRMED'));
  assert.equal(sim.outputs.value('vfd.run'),'STOP');assert.equal(sim.outputs.value('shod.voltage'),10);
  assert.equal(sim.fanTest.ordinaryBlocked,false);assert.equal(sim.fanTest.coolingBlocked,false);
});

test('D-096: потеря уже работавшего ПЧ 5 с отдельно от частоты; UNKNOWN не считается Работа=0',()=>{
  const sim=engineer();sim.command('engineering_fan_test');fanAtFirst(sim);
  sim.signals.set('vfd.running',null,'UNKNOWN');sim.tick();sim.advance(10000);assert.equal(sim.vfdGuard.blocked,false);
  fanFeedback(sim,20,false);sim.advance(4900);assert.equal(sim.vfdGuard.blocked,false);sim.advance(100);
  assert.ok(sim.vfdGuard.causes.includes('VFD_RUNNING_LOST'));assert.equal(sim.outputs.value('vfd.enable'),false);
});

test('D-104/D-105: 30 с после принятого STOP, поздний OFF не снимает аварию; отдельный сброс',()=>{
  const sim=engineer();sim.command('engineering_fan_test');fanAtFirst(sim);sim.command('engineering_stop');
  sim.advance(31000);assert.equal(sim.vfdGuard.blocked,false);deliver(sim);sim.advance(29000);
  const cmd=sim.outputs.commands['vfd.run'];sim.outputs.deliver('vfd.run',cmd.id);sim.tick();sim.advance(1000);
  assert.ok(sim.vfdGuard.causes.includes('VFD_STOP_NOT_CONFIRMED'));fanStop(sim);assert.equal(sim.vfdGuard.blocked,true);
  assert.equal(sim.command('engineering_vfd_reset',false).result,'REJECTED');assert.equal(sim.command('engineering_vfd_reset',true).result,'ACCEPTED');
  assert.equal(sim.vfdGuard.blocked,false);assert.equal(sim.fanTest.coolingBlocked,true);assert.equal(sim.fanTest.ordinaryBlocked,true);
});

test('D-106: новая Работа=1 после доказанного STOP без START — отдельная сохраняемая авария',()=>{
  const sim=engineer();sim.tick();fanFeedback(sim,10);
  assert.ok(sim.vfdGuard.causes.includes('VFD_UNCOMMANDED_RUN'));assert.equal(sim.outputs.value('vfd.run'),'STOP');
  fanFeedback(sim,0,false);assert.equal(sim.vfdGuard.blocked,true);sim.restart();assert.equal(sim.vfdGuard.blocked,true);
});
