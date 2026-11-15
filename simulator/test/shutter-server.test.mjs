import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorServer } from '../server.mjs';

test('HTTP 0.8: отдельные переходы D-265, текущий контекст ШТ, полный цикл и ограничение следующего теста', async () => {
  const {server}=createSimulatorServer(); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+server.address().port;
  let snapshot=await (await fetch(base+'/api/state')).json();
  const act=async data=>{
    const response=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({generation:snapshot.generation,procedureId:snapshot.procedureId,...data})});
    assert.equal(response.status,200); snapshot=await response.json();
  };
  try {
    await act({type:'fixture'}); await act({type:'command',action:'engineering_enter',value:true});
    await act({type:'command',action:'engineering_cycle_begin'});
    for(let i=0;i<2;i++)await act({type:'command',action:'engineering_cycle_skip'});
    assert.equal(snapshot.engineeringCycle.current,'ST');
    const oldContext=snapshot.procedureId;
    await act({type:'command',action:'engineering_cycle_continue'});
    assert.equal(snapshot.outputs['st.direction'].value,'OPEN'); assert.equal(snapshot.shutterTest.required,true);
    await act({type:'command',action:'engineering_stop',procedureId:oldContext}); assert.equal(snapshot.lastRequest.result,'REJECTED');
    await act({type:'group',name:'stOpen'}); await act({type:'advance',ms:200});
    await act({type:'group',name:'stClosed'});
    assert.equal(snapshot.shutterTest.result.result,'PASSED'); assert.equal(snapshot.outputs['st.direction'].value,'STOP');
    assert.equal(snapshot.state,'STOPPED'); assert.equal(snapshot.engineeringCycle.current,'SHOD');
    await act({type:'command',action:'engineering_cycle_continue'}); assert.equal(snapshot.lastRequest.result,'REJECTED');
    const html=await (await fetch(base+'/')).text(); assert.match(html,/id="st-restore-power"/); assert.match(html,/id="engineering-cycle-continue"/);
    assert.equal(snapshot.coverageGap,null);
  } finally { await new Promise(resolve=>server.close(resolve)); }
});
