import test from 'node:test';import assert from 'node:assert/strict';import{createSimulatorServer}from'../server.mjs';
async function session(body){const{server}=createSimulatorServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;let s=await(await fetch(base+'/api/state')).json();
const post=async(data,status=200)=>{const response=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({generation:s.generation,procedureId:s.procedureId,...data})});assert.equal(response.status,status);const result=await response.json();if(status===200)s=result;return result;};
try{await body(post,()=>s);}finally{await new Promise(r=>server.close(r));}}
test('HTTP: температура, подтверждённое охлаждение, устаревание и возврат; ручная подмена запроса запрещена',async()=>session(async(act,state)=>{
 await act({type:'temperature_fixture'});assert.equal(state().temperature.phase,'WAIT_FIRST');await act({type:'advance',ms:5000});assert.equal(state().telemetry.temperature.fault,true);
 await act({type:'signal',name:'cooling.required',value:false},400);await act({type:'signal',name:'temperature.fan',value:80,repeat:false});assert.equal(state().outputs['vfd.run'].value,'START');
 await act({type:'deliver_all'});await act({type:'group',name:'fanOn'});await act({type:'advance',ms:5000});assert.equal(state().temperature.continuing,true);assert.equal(state().outputs['vfd.run'].value,'START');
 await act({type:'signal',name:'temperature.fan',value:40});assert.equal(state().outputs['vfd.run'].value,'STOP');assert.equal(state().telemetry.temperature.fault,false);
}));
test('HTTP: D-152 источник/предупреждение в телеметрии и сохранение только в снимке reboot',async()=>session(async(act,state)=>{
 await act({type:'temperature_fixture'});for(const[name,value]of Object.entries({'temperature.fan':40,'temperature.supply':60,'temperature.backup':66,'temperature.return':50}))await act({type:'signal',name,value});
 await act({type:'advance',ms:10000});assert.equal(state().telemetry.temperature.differenceWarning,true);assert.equal(state().telemetry.temperature.water.source,'PRIMARY');assert.equal(state().telemetry.temperature.water.delta,10);
 const old=state().generation;await act({type:'restart'});assert.equal(state().telemetry.temperature.differenceWarning,true);assert.equal(state().temperature.water.source,null);assert.equal(state().temperature.fan.value,null);
 await act({type:'signal',name:'temperature.fan',value:40,generation:old},400);assert.equal(state().temperature.fan.value,null);
}));
