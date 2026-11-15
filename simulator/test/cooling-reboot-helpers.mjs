import assert from 'node:assert/strict';
import { running, deliver } from './helpers.mjs';
import { fanFeedback } from './thermal-helpers.mjs';

export function bootInputs(sim,{closed=false,required=true,fanRunning=false}={}) {
  sim.sampleGroup('bootPermits');
  sim.signals.set('cooling.required',required,required===null?'UNKNOWN':'GOOD');
  sim.sampleGroup('flowNormal');sim.sampleGroup('pumpsOff');sim.sampleGroup(fanRunning?'fanOn':'fanOff');
  sim.sampleGroup(closed?'stClosed':'stOpen');sim.sampleGroup('valve1Open');sim.sampleGroup('valve2Closed');
  deliver(sim);sim.sampleGroup(fanRunning?'fanOn':'fanOff');
}
export function restoreCooling(sim=running(),options={}) {
  sim.restart();bootInputs(sim,options);sim.advance(5000);sim.tick();
  assert.equal(sim.coverageGap,null);return sim;
}
export function restoreCirculation(sim) {
  sim.sampleGroup('valvesClosed');sim.sampleGroup('pump1On');sim.advance(1000);
  sim.sampleGroup('valve1Open');sim.advance(5000);
  assert.equal(sim.boot.circulationRestored,true);assert.equal(sim.state,'STOPPING');
  if(sim.outputs.value('vfd.run')==='START'){deliver(sim);fanFeedback(sim,25);}
  return sim;
}
export function repeatCooling(sim) {
  sim.signals.set('flow',0);sim.tick();assert.equal(sim.outputs.value('vfd.run'),'STOP');
  deliver(sim);fanFeedback(sim,0,false);
  sim.signals.set('flow',8);sim.tick();sim.advance(10000);
  assert.equal(sim.outputs.value('vfd.run'),'START');deliver(sim);fanFeedback(sim,25);
}
