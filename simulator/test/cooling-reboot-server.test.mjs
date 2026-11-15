import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorServer } from '../server.mjs';

async function session(body){
 const {server}=createSimulatorServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 let s=await(await fetch(base+'/api/state')).json();
 const act=async data=>{const res=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({generation:s.generation,procedureId:s.procedureId,...data})});assert.equal(res.status,200);s=await res.json();return s;};
 try{await body(act,()=>s,base);}finally{await new Promise(r=>server.close(r));}
}
test('HTTP: reboot при охлаждении требует новых данных и STOP; старое поколение HMI не выполняет команду',async()=>session(async(act,state,base)=>{
 await act({type:'cooling_fixture',circulation:false});const old={generation:state().generation,procedureId:state().procedureId};
 await act({type:'restart'});assert.equal(state().state,null);assert.equal(state().signals['cooling.required'].value,null);
 const stale=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify({...old,type:'command',action:'confirm_bypass_open'})});assert.equal(stale.status,400);
 await act({type:'group',name:'bootPermits'});await act({type:'signal',name:'cooling.required',value:true});
 for(const name of ['pumpsOff','stClosed','fanOff'])await act({type:'group',name});
 await act({type:'deliver_all'});await act({type:'group',name:'fanOff'});await act({type:'advance',ms:5000});await act({type:'advance',ms:0});
 assert.equal(state().state,'STOPPED');assert.equal(state().outputs['vfd.run'].value,'START');assert.equal(state().outputs['pump1.run'].value,false);
 assert.equal(state().coverageGap,null);
}));
test('HTTP: сохранённая ошибка ШТ и отдельное D-164 разрешают охлаждение без подмены DI',async()=>session(async(act,state)=>{
 await act({type:'cooling_fixture',circulation:false});await act({type:'signal',name:'st.closed',value:false});
 await act({type:'deliver_all'});await act({type:'group',name:'fanOff'});await act({type:'advance',ms:5000});
 assert.equal(state().stBlocked,true);assert.equal(state().outputs['st.power'].value,false);
 await act({type:'command',action:'confirm_st_closed_for_cooling',value:true});
 assert.equal(state().lastRequest.result,'ACCEPTED');assert.equal(state().telemetry.cooling.manualClosed,true);
 assert.equal(state().positions.st,'INTERMEDIATE');assert.equal(state().outputs['vfd.run'].value,'START');assert.equal(state().shutterTest.required,true);
 await act({type:'group',name:'stOpen'});assert.equal(state().telemetry.cooling.manualClosed,false);assert.equal(state().outputs['vfd.run'].value,'STOP');
}));
