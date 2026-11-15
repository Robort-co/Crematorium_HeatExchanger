import test from 'node:test';
import assert from 'node:assert/strict';
import { engineer } from './helpers.mjs';

function cycle() { const sim=engineer(); assert.equal(sim.command('engineering_cycle_begin').result,'ACCEPTED'); return sim; }
function branch(sim,pump) {
  sim.sampleGroup('valve'+pump+'Open'); sim.sampleGroup('valve'+(3-pump)+'Closed');
  assert.equal(sim.command('engineering_cycle_continue',{repaired:true}).result,'ACCEPTED');
  sim.advance(100); sim.sampleGroup('valve'+pump+'Closed'); sim.advance(100);
  sim.sampleGroup('pump'+pump+'On'); sim.advance(1000); sim.sampleGroup('valve'+pump+'Open'); sim.sampleGroup('flowNormal');
  sim.advance(5100); sim.sampleGroup('valve'+pump+'Closed'); sim.sampleGroup('pump'+pump+'Off'); sim.advance(100);
  sim.sampleGroup('valve'+pump+'Open'); sim.advance(100);
  assert.equal(sim.engineering.active,null); assert.equal(sim.engineeringCycle.results['BRANCH_'+pump].result,'PASSED');
}
function st(sim) { sim.sampleGroup('stOpen'); sim.advance(200); sim.sampleGroup('stClosed'); }

test('D-265: две объединённые ветви → ШТ, каждый следующий тест только после отдельного Продолжить; ШОД/дымосос не объявлены пройденными', () => {
  const sim=cycle(); assert.equal(sim.engineeringCycle.current,'BRANCH_1');
  assert.equal(sim.command('engineering_st_test').result,'REJECTED');
  branch(sim,1); assert.equal(sim.engineeringCycle.current,'BRANCH_2');
  sim.advance(5000); assert.equal(sim.engineering.active,null); assert.equal(sim.outputs.value('pump2.run'),false);
  branch(sim,2); assert.equal(sim.engineeringCycle.current,'ST'); assert.equal(sim.outputs.value('st.direction'),'STOP');
  assert.equal(sim.command('engineering_cycle_continue').result,'ACCEPTED'); st(sim);
  assert.equal(sim.engineeringCycle.current,'SHOD'); assert.equal(sim.engineeringCycle.results.ST.result,'PASSED');
  assert.equal(sim.command('engineering_cycle_continue').result,'REJECTED'); assert.equal(sim.shutterTest.active,null);
  sim.command('engineering_cycle_skip'); assert.equal(sim.engineeringCycle.current,'FAN');
  assert.equal(sim.command('engineering_cycle_continue').result,'REJECTED');
  sim.command('engineering_cycle_skip'); assert.equal(sim.engineeringCycle.phase,'COMPLETE');
  assert.equal(sim.engineeringCycle.results.SHOD.result,'NOT_CHECKED'); assert.equal(sim.engineeringCycle.results.FAN.result,'NOT_CHECKED');
});

test('D-253/D-265: ручные обязанности и текущий допуск проверяются заново; пропуск не снимает ошибки/требования', () => {
  const sim=cycle(); sim.engineering.returnRequired[1]=true;
  assert.equal(sim.command('engineering_cycle_skip').result,'REJECTED');
  assert.equal(sim.command('engineering_cycle_continue').result,'REJECTED');
  sim.command('engineering_confirm_return',1); sim.shutterTest.required=true;
  sim.pumps.branches[1].exclusions.push('TEST_EXCLUSION');
  sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_skip');
  assert.equal(sim.engineeringCycle.current,'ST'); assert.ok(sim.pumps.branches[1].exclusions.length);
  sim.signals.set('configuration.ready',false); assert.equal(sim.command('engineering_cycle_continue').result,'REJECTED');
  assert.equal(sim.shutterTest.active,null); sim.command('engineering_cycle_skip'); assert.equal(sim.shutterTest.required,true);
});

test('D-255: отмена активного ШТ закрывает по своему правилу, следующие тесты не запускаются и инженерный режим остаётся', () => {
  const sim=cycle(); sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_skip');
  sim.command('engineering_cycle_continue'); sim.signals.set('st.closed',false); sim.tick();
  assert.equal(sim.command('engineering_cycle_skip').result,'REJECTED');
  assert.equal(sim.command('engineering_cycle_cancel').result,'ACCEPTED'); assert.equal(sim.outputs.value('st.direction'),'CLOSE');
  assert.equal(sim.command('engineering_cycle_continue').result,'REJECTED');
  sim.sampleGroup('stClosed'); assert.equal(sim.engineeringCycle.phase,'CANCELLED');
  assert.equal(sim.engineeringCycle.results.ST.result,'NOT_CHECKED'); assert.equal(sim.engineering.enabled,true);
  assert.equal(sim.engineeringCycle.results.SHOD.result,'NOT_CHECKED'); assert.equal(sim.shutterTest.required,true);
});

test('D-256: выборочный полный повтор сохраняет независимый результат и прежнюю точку ожидания, прежний успех заменён новой попыткой', () => {
  const sim=cycle(); branch(sim,1); sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_continue'); st(sim);
  const branchResult=structuredClone(sim.engineeringCycle.results.BRANCH_1);
  assert.equal(sim.command('engineering_cycle_repeat',{key:'ST'}).result,'ACCEPTED');
  assert.equal(sim.engineeringCycle.results.ST.result,'NOT_CHECKED'); assert.equal(sim.shutterTest.required,true);
  st(sim); assert.equal(sim.engineeringCycle.current,'SHOD'); assert.equal(sim.engineeringCycle.phase,'WAITING');
  assert.deepEqual(sim.engineeringCycle.results.BRANCH_1,branchResult);
  assert.equal(sim.engineeringCycle.history.filter(item=>item.key==='ST').length,2);
  assert.equal(sim.command('engineering_cycle_repeat').result,'REJECTED');
});

test('D-180/D-220: отказ ШТ не создаёт байпас и не запускает следующий этап; независимый переход доступен отдельно', () => {
  const sim=cycle(); sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_continue');
  sim.advance(5000); assert.equal(sim.engineeringCycle.results.ST.result,'FAILED');
  assert.equal(sim.state,'STOPPED'); assert.equal(sim.engineeringCycle.current,'SHOD');
  assert.equal(sim.protection.stopStage,null); sim.command('engineering_cycle_cancel');
  assert.equal(sim.command('engineering_leave').result,'ACCEPTED'); assert.equal(sim.protection.stBlocked,true);
});

test('Общий цикл после reboot сохраняет результаты в памяти, но не продолжает очередь или движение ШТ', () => {
  const sim=cycle(); sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_skip'); sim.command('engineering_cycle_continue');
  sim.restart(); assert.equal(sim.engineeringCycle.phase,'CANCELLED'); assert.equal(sim.shutterTest.required,true);
  assert.equal(sim.engineeringCycle.results.ST.result,'NOT_CHECKED'); assert.equal(sim.outputs.value('st.direction'),'STOP');
  assert.equal(sim.command('engineering_cycle_continue').result,'REJECTED');
});
