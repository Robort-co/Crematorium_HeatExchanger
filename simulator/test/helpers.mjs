import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';

export function deliver(sim) {
  for (const [name, command] of Object.entries(sim.outputs.commands)) if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
  sim.tick();
}
export function running() {
  const sim = new Simulation();
  sim.loadFixture(); sim.command('start'); deliver(sim);
  sim.sampleGroup('stOpen'); sim.sampleGroup('valvesClosed'); deliver(sim);
  sim.sampleGroup('fanOn'); sim.sampleGroup('pump1On'); sim.advance(1000);
  sim.sampleGroup('valve1Open'); sim.sampleGroup('flowNormal'); sim.advance(5000);
  sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING');
  return sim;
}
export function position(sim, pump, open, closed) {
  sim.signals.set('valve' + pump + '.open', open);
  sim.signals.set('valve' + pump + '.closed', closed);
  sim.tick();
}
export function engineer() {
  const sim = new Simulation(); sim.loadFixture();
  assert.equal(sim.command('engineering_enter', true).result, 'ACCEPTED');
  return sim;
}
export function pumpTestOpened(sim, pump = 1) {
  sim.sampleGroup('valve' + (3 - pump) + 'Closed');
  assert.equal(sim.command('engineering_test', { kind: 'pump', pump, repaired: true }).result, 'ACCEPTED');
  sim.sampleGroup('valve' + pump + 'Closed'); sim.advance(100);
  sim.sampleGroup('pump' + pump + 'On'); sim.advance(1100);
  sim.sampleGroup('valve' + pump + 'Open');
  assert.equal(sim.engineering.active.stage, 'HYDRAULICS');
}
export function valveTestPassed(sim, pump = 1, repaired = true) {
  assert.equal(sim.command('engineering_test', { kind: 'valve', pump, repaired }).result, 'ACCEPTED');
  sim.advance(100); // Первое отдельное CLOSE после исходного достоверного OPEN.
  assert.equal(sim.outputs.value('valve' + pump + '.direction'), 'CLOSE');
  sim.sampleGroup('valve' + pump + 'Closed'); sim.advance(200);
  assert.equal(sim.outputs.value('valve' + pump + '.direction'), 'OPEN');
  sim.sampleGroup('valve' + pump + 'Open'); sim.advance(100);
  assert.equal(sim.engineering.active, null);
  assert.equal(sim.engineering.results[pump].valve.result, 'PASSED');
}
