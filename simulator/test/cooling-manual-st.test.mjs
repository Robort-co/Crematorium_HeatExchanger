import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { deliver } from './helpers.mjs';
import { fanFeedback } from './thermal-helpers.mjs';

function manualCase(open=false){
  const sim=new Simulation();sim.loadCoolingFixture();
  sim.protection.stBlocked=true;sim.protection.fault(sim,'ST_LIMIT_CONTRADICTION','Сохранённый отказ концевиков');sim.shutterTest.required=true;
  sim.signals.set('st.open',open);sim.signals.set('st.closed',false);sim.tick();
  deliver(sim);fanFeedback(sim,0,false);return sim;
}
test('D-164: отдельное подтверждение после ручной проверки разрешает только охлаждение; DI, питание, ошибка и запрет Пуска сохранены',()=>{
  const sim=manualCase();assert.equal(sim.command('confirm_st_closed_for_cooling',true).result,'ACCEPTED');
  assert.equal(sim.outputs.value('vfd.run'),'START');assert.equal(sim.outputs.value('pump1.run'),false);assert.equal(sim.outputs.value('st.power'),false);
  assert.equal(sim.signals.position('st'),'INTERMEDIATE');assert.equal(sim.protection.stBlocked,true);assert.equal(sim.shutterTest.required,true);
  assert.equal(sim.command('start').result,'REJECTED');assert.ok(sim.protection.faults.some(f=>f.code==='ST_LIMIT_CONTRADICTION'));
});
test('D-164: новое OPEN снимает подтверждение и немедленно STOP без циркуляции; прежние плохие OPEN при подтверждении не снимают его',()=>{
  const sim=manualCase();sim.command('confirm_st_closed_for_cooling',true);deliver(sim);fanFeedback(sim,25);
  sim.sampleGroup('stOpen');assert.equal(sim.cooling.manualClosed,null);assert.equal(sim.outputs.value('vfd.run'),'STOP');
  const old=manualCase(true);old.command('confirm_st_closed_for_cooling',true);deliver(old);fanFeedback(old,25);old.advance(5000);
  assert.ok(old.cooling.manualClosed);assert.equal(old.outputs.value('vfd.run'),'START');assert.equal(old.protection.stBlocked,true);
});
test('D-164: отклонённый/заблокированный запрос движения не отменяет подтверждение; фактически выданная команда отменяет',()=>{
  const sim=manualCase();sim.command('confirm_st_closed_for_cooling',true);
  assert.equal(sim.command('engineering_st_test').result,'REJECTED');assert.ok(sim.cooling.manualClosed);
  sim.request['st.direction']='OPEN';sim.tick();assert.equal(sim.outputs.value('st.direction'),'STOP');assert.ok(sim.cooling.manualClosed);
  sim.protection.emit(sim,'st.direction','CLOSE');assert.equal(sim.cooling.manualClosed,null); // Контракт единственного отправителя фактической команды.
});
test('D-164: окончание цикла и reboot требуют новой проверки на месте; старый контекст не принимается',()=>{
  const sim=manualCase();sim.command('confirm_st_closed_for_cooling',true);
  sim.signals.set('cooling.required',false);sim.tick();assert.equal(sim.cooling.manualClosed,null);
  sim.signals.set('cooling.required',true);sim.tick();sim.command('confirm_st_closed_for_cooling',true);const old=sim.procedureId;
  sim.restart();assert.equal(sim.cooling.manualClosed,null);assert.equal(sim.command('confirm_st_closed_for_cooling',true,old).result,'REJECTED');
});
test('D-164: без снятия питания, без запроса или без явного подтверждения разрешение не создаётся',()=>{
  const sim=new Simulation();sim.loadCoolingFixture();assert.equal(sim.command('confirm_st_closed_for_cooling',true).result,'REJECTED');
  const off=manualCase();assert.equal(off.command('confirm_st_closed_for_cooling',false).result,'REJECTED');
  off.signals.set('cooling.required',false);off.tick();assert.equal(off.command('confirm_st_closed_for_cooling',true).result,'REJECTED');
  assert.equal(off.cooling.manualClosed,null);
});
