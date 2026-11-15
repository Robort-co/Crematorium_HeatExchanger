import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorServer } from '../server.mjs';

async function session(body){
 const {server}=createSimulatorServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 let s=await(await fetch(base+'/api/state')).json();
 const act=async data=>{const res=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({generation:s.generation,procedureId:s.procedureId,...data})});assert.equal(res.status,200);s=await res.json();return s;};
 try{await body(act,()=>s);}finally{await new Promise(r=>server.close(r));}
}

test('HTTP: ШОД от сырого сигнала до полного результата; независимые данные, K и контекст процедуры',async()=>session(async(act,state)=>{
 await act({type:'fixture'});await act({type:'command',action:'engineering_enter',value:true});
 const old=state().procedureId;await act({type:'command',action:'engineering_shod_test'});
 await act({type:'command',action:'engineering_stop',procedureId:old});assert.equal(state().lastRequest.result,'REJECTED');
 for(const target of [0,50,100,50,0]){
  await act({type:'advance',ms:0});await act({type:'signal',name:'shod.feedback',value:target/12});await act({type:'advance',ms:2100});
 }
 assert.equal(state().damperTest.result.result,'PASSED');assert.equal(state().state,'STOPPED');assert.equal(state().coverageGap,null);
}));

test('HTTP: охлаждение → тест дымососа → ручная отмена → отдельный возврат D-246',async()=>session(async(act,state)=>{
 await act({type:'cooling_fixture',circulation:false});await act({type:'command',action:'engineering_enter',value:true});
 await act({type:'command',action:'engineering_fan_test'});assert.equal(state().outputs['vfd.run'].value,'STOP');
 await act({type:'deliver_all'});await act({type:'signal',name:'vfd.running',value:false});await act({type:'advance',ms:100});
 await act({type:'deliver_all'});await act({type:'signal',name:'vfd.running',value:true});await act({type:'signal',name:'vfd.frequency',value:20});
 assert.equal(state().fanTest.active.stage,'HOLD');await act({type:'command',action:'engineering_stop'});
 assert.equal(state().fanTest.coolingBlocked,true);await act({type:'deliver_all'});await act({type:'signal',name:'vfd.running',value:false});
 assert.equal(state().fanTest.result.result,'FAILED');assert.equal(state().outputs['vfd.run'].value,'STOP');
 await act({type:'command',action:'engineering_cooling_restore',value:{inspected:true,causeRemoved:true,workFinished:true,allowAutomatic:true}});
 assert.equal(state().lastRequest.result,'ACCEPTED');assert.equal(state().outputs['vfd.run'].value,'START');
 assert.equal(state().fanTest.ordinaryBlocked,true);assert.equal(state().telemetry.cooling.blocked,false);assert.equal(state().coverageGap,null);
}));
