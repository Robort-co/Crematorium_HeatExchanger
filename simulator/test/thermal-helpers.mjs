import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { deliver } from './helpers.mjs';
export function cooling(circulation=true){const sim=new Simulation();sim.loadCoolingFixture(circulation);assert.equal(sim.command('engineering_enter',true).result,'ACCEPTED');return sim;}
export function fanFeedback(sim,f,running=true){sim.signals.set('vfd.running',running);sim.signals.set('vfd.frequency',f);sim.tick();}
export function fanStop(sim){deliver(sim);fanFeedback(sim,0,false);}
export function fanAtFirst(sim){sim.advance(100);deliver(sim);fanFeedback(sim,sim.config.fmin);assert.equal(sim.fanTest.active.stage,'HOLD');}
export function fanPassed(sim){
  fanAtFirst(sim);
  while(sim.fanTest.active.index<sim.fanTest.active.targets.length-1){
    assert.equal(sim.command('engineering_fan_continue').result,'ACCEPTED');sim.advance(5/sim.config.fanTestRate*1000);deliver(sim);fanFeedback(sim,sim.fanTest.active.targets[sim.fanTest.active.index]);
    assert.equal(sim.fanTest.active.stage,'HOLD');
  }
  sim.command('engineering_fan_continue');fanStop(sim);assert.equal(sim.fanTest.result.result,'PASSED');
}
export function damperPassed(sim){
  for(const target of [0,50,100,50,0]){
    sim.tick();sim.signals.set('shod.feedback',target/(10*sim.config.shodK));sim.tick();sim.advance(2100);
  }
  assert.equal(sim.damperTest.result.result,'PASSED');
}
