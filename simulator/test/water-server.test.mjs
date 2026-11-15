import test from'node:test';import assert from'node:assert/strict';import{createSimulatorServer}from'../server.mjs';
async function session(body){const{server}=createSimulatorServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;let s=await(await fetch(base+'/api/state')).json();
const act=async(data,status=200)=>{const r=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({generation:s.generation,procedureId:s.procedureId,...data})});assert.equal(r.status,status);const j=await r.json();if(status===200)s=j;return j;};
try{await body(act,()=>s);}finally{await new Promise(r=>server.close(r));}}
test('HTTP D-155: сроки каждого TUF, BAD/новое GOOD и независимая телеметрия',async()=>session(async(act,state)=>{
 await act({type:'water_fixture'});await act({type:'signal',name:'flow',value:8,repeat:false});await act({type:'advance',ms:3000});await act({type:'signal',name:'flow',value:999,quality:'BAD',repeat:false});
 assert.equal(state().telemetry.tuf.flow.freshnessRemainingMs,2000);assert.equal(state().telemetry.tuf.flow.diagnosticRemainingMs,5000);assert.equal(state().telemetry.tuf.flow.value,8);
 await act({type:'advance',ms:2000});assert.equal(state().telemetry.tuf.flow.value,null);assert.equal(state().telemetry.tuf.flow.diagnosticExpired,false);assert.equal(state().telemetry.tuf.backup.value,60);
 await act({type:'signal',name:'flow',value:8,repeat:false});assert.equal(state().telemetry.tuf.flow.diagnosticSince,null);assert.equal(state().telemetry.tuf.flow.value,8);
}));
test('HTTP D-023/D-024: перегрев и потеря подачи запрещают новый Пуск, восстановление снимает только водяные причины',async()=>session(async(act,state)=>{
 await act({type:'water_fixture'});await act({type:'signal',name:'temperature.backup',value:91});await act({type:'advance',ms:3000});assert.equal(state().waterProtection.overheat,true);assert.equal(state().outputs['heatRemoval.request'].value,true);
 await act({type:'command',action:'start'});assert.equal(state().lastRequest.result,'REJECTED');assert.equal(state().outputs['pump1.run'].value,false);
 for(const name of ['temperature.supply','temperature.backup'])await act({type:'signal',name,value:null,quality:'UNKNOWN'});
 assert.equal(state().waterProtection.supplyMissing,true);assert.equal(state().waterProtection.overheat,false);assert.equal(state().outputs['heatRemoval.request'].value,true);
 await act({type:'signal',name:'temperature.supply',value:60});assert.equal(state().waterProtection.supplyMissing,false);assert.equal(state().outputs['heatRemoval.request'].value,false);
}));
test('HTTP: водяной профиль после reboot сообщает границу и отвергает старое поколение',async()=>session(async(act,state)=>{
 await act({type:'water_fixture'});const old=state().generation;await act({type:'restart'});assert.equal(state().waterProtection.recoveryPending,true);assert.ok(state().coverageGap);
 assert.equal(state().outputs['heatRemoval.request'],undefined);await act({type:'command',action:'start',generation:old},400);
}));
