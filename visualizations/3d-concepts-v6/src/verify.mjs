import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createAssembly,applyAppearance} from './assembly.js';
import {layout as L} from './gas-concept.js';
import {waterLayout as W} from './water-relocation.js';
const root=path.resolve(import.meta.dirname,'..');
const source=fs.readFileSync(path.join(root,'model-data.js'),'utf8').trim();
const parts=JSON.parse(source.slice('window.CAD_PARTS='.length).replace(/;$/,''));
const model=createAssembly(parts),results=[];
const check=(name,fn)=>{fn();results.push({name,passed:true});};
const near=(a,b,tolerance=2e-6)=>assert.ok(Math.abs(a-b)<tolerance,`${a} != ${b}`);
const byName=name=>{const m=model.meshes.find(m=>m.userData.name===name);assert.ok(m,name);return m;};
const byID=id=>model.meshes.find(m=>m.userData.origin==='cad'&&m.userData.id===id);
const world=m=>Array.from({length:m.geometry.attributes.position.count},(_,i)=>new THREE.Vector3().fromBufferAttribute(m.geometry.attributes.position,i).applyMatrix4(m.matrixWorld));
const bounds=m=>new THREE.Box3().setFromPoints(world(m));
const ray=(m,p,d,far=10)=>new THREE.Raycaster(new THREE.Vector3(...p),new THREE.Vector3(...d),0,far).intersectObject(m).length;
applyAppearance(model,{showConcept:false});model.assembly.updateMatrixWorld(true);
const original=new Map(model.meshes.filter(m=>m.userData.origin==='cad').map(m=>[m.userData.id,world(m)]));
check('Original CAD mode restores 236 visible parts and hides new cap',()=>{
  assert.equal(model.meshes.filter(m=>m.visible&&m.userData.origin==='cad').length,236);
  assert.equal(byName('Глухая крышка прежней обратки (условно)').visible,false);
});
applyAppearance(model);model.assembly.updateMatrixWorld(true);
check('Only four water CAD parts move; all other CAD vertices remain unchanged',()=>{
  for(const m of model.meshes.filter(m=>m.userData.origin==='cad')){
    const before=original.get(m.userData.id),after=world(m);
    for(let i=0;i<before.length;i++){
      const expected=before[i].clone();
      if(W.movedCAD.includes(m.userData.id)){expected.x=2*W.axisX-expected.x;expected.z=-expected.z;}
      assert.ok(expected.distanceTo(after[i])<1e-9);
    }
  }
});
check('Relocated return flange mates opposite fixed flange; all heights preserved',()=>{
  const moving=bounds(byID(16)),fixed=bounds(byID(13));near(moving.min.z,fixed.max.z);
  const mc=moving.getCenter(new THREE.Vector3()),fc=fixed.getCenter(new THREE.Vector3());
  near(mc.x,fc.x);near(mc.y,fc.y);assert.ok(mc.z>0);
  for(const id of W.movedCAD){const before=new THREE.Box3().setFromPoints(original.get(id)),after=bounds(byID(id));near(before.min.y,after.min.y);near(before.max.y,after.max.y);}
});
check('Old flange is closed by a solid cap and cap meets old flange plane',()=>{
  const cap=byName('Глухая крышка прежней обратки (условно)'),b=bounds(cap),fixed=bounds(byID(12));
  near(b.max.z,fixed.min.z);assert.ok(ray(cap,[.83,1.125,-.7],[0,0,1])>0);
});
check('Rounded bottom shares upper-bank axis and radius',()=>{
  const m=byName('Полукруглое дно соосно верхней банке');
  for(const p of world(m))near(Math.hypot(p.y-L.bankExit[1],p.z),L.lowerRadius);
  const b=bounds(m);near(b.max.x,L.bankExit[0]);near(b.min.y,L.bankExit[1]-L.lowerRadius);
  const face=byName('Круглое продолжение верхней банки');
  assert.equal(ray(face,[-.9,L.bankExit[1],0],[-1,0,0]),0);
  assert.ok(ray(face,[-.9,2.2,0],[-1,0,0])>0);
});
check('Rotated arch is concentric with the round pipe; real opening is clear',()=>{
  for(const p of world(byName('Полукруглая крыша, концентричная трубе')))near(Math.hypot(p.x-L.boxX,p.y-L.archCenterY),L.archRadius);
  const m=byName('Арочная стенка с круглым отверстием');
  near(bounds(m).min.z,-L.narrowSide/2);near(bounds(m).max.z,-L.narrowSide/2);
  assert.equal(ray(m,[L.boxX,L.archCenterY,-.6],[0,0,1]),0);
  assert.ok(ray(m,[L.boxX+.30,L.archCenterY,-.6],[0,0,1])>0);
});
check('Round duct runs across bank axes and mates fan intake with no gap',()=>{
  const b=bounds(byName('Круглый тракт к дымососу'));
  near(b.max.z,-L.narrowSide/2);near(b.min.z,L.fanZ+L.fanDepth/2);near(b.max.z-b.min.z,1.45);
  near(b.getCenter(new THREE.Vector3()).x,L.boxX);near(b.getCenter(new THREE.Vector3()).y,L.archCenterY);
  const face=byName('Передняя стенка улитки с осевым отверстием');
  near(bounds(face).min.z,b.min.z);near(bounds(face).max.z,b.min.z);
  assert.equal(ray(face,[L.fanX,L.fanY,-1.7],[0,0,-1]),0);
  assert.ok(ray(face,[L.fanX+.30,L.fanY,-1.7],[0,0,-1])>0);
});
check('Fan open outlet points up and exactly meets the vertical rectangular riser',()=>{
  const shell=byName('Оболочка условной улитки'),points=world(shell),riser=byName('Вертикальный прямоугольный выпуск');
  const b=bounds(riser);near(b.min.y,L.fanDischargeY);near(b.max.y,L.transitionBottomY);
  for(const x of [b.min.x,b.max.x])for(const z of [b.min.z,b.max.z]){
    const p=new THREE.Vector3(x,b.min.y,z);assert.ok(points.some(q=>q.distanceTo(p)<2e-6));
  }
  assert.equal(ray(shell,[L.chimneyX,4.1,L.chimneyZ],[0,1,0],.15),0);
});
check('Transition matches rectangular outlet and round vertical chimney',()=>{
  const m=byName('Переход прямоугольного выпуска в круглую трубу'),ps=world(m);
  const lower=ps.filter(p=>Math.abs(p.y-L.transitionBottomY)<2e-6),upper=ps.filter(p=>Math.abs(p.y-L.transitionTopY)<2e-6);
  assert.ok(lower.length&&upper.length);
  for(const p of lower)near(Math.max(Math.abs(p.x-L.chimneyX)/.15,Math.abs(p.z-L.chimneyZ)/.20),1,3e-6);
  for(const p of upper)near(Math.hypot(p.x-L.chimneyX,p.z-L.chimneyZ),L.chimneyRadius);
  const chimney=bounds(byName('Дымовая труба над дымососом'));
  near(chimney.min.y,L.transitionTopY);near(chimney.max.y,L.chimneyHeight);assert.ok(L.chimneyRadius<.29);
});
check('Scene has 247 source CAD parts, 232 visible in v6, no SHOD, finite geometry',()=>{
  assert.equal(parts.length,247);assert.equal(model.meshes.filter(m=>m.visible&&m.userData.origin==='cad').length,232);
  assert.equal(model.meshes.filter(m=>m.userData.category==='shod').length,0);
  for(const m of model.meshes)for(const v of world(m))assert.ok(Number.isFinite(v.x)&&Number.isFinite(v.y)&&Number.isFinite(v.z));
});
check('Disabling concept reverses all relocation transforms',()=>{
  applyAppearance(model,{showConcept:false});model.assembly.updateMatrixWorld(true);
  for(const id of W.movedCAD)world(byID(id)).forEach((p,i)=>assert.ok(p.distanceTo(original.get(id)[i])<1e-9));
});
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
check('All 23 frozen v5 payload files and its ZIP remain unchanged',()=>{
  const checkpoint=path.resolve(root,'../baselines/2026-11-15-v5');
  const manifest=fs.readFileSync(path.join(checkpoint,'MANIFEST.sha256'),'utf8').trim().split(/\r?\n/);
  assert.equal(manifest.length,23);
  for(const line of manifest){const [,expected,relative]=line.match(/^([0-9a-f]+)\s+(.+)$/);assert.equal(hash(path.resolve(root,'..',relative)),expected);}
  const cp=JSON.parse(fs.readFileSync(path.join(checkpoint,'CHECKPOINT.json'),'utf8'));
  assert.equal(hash(path.join(checkpoint,cp.Archive)),cp.ArchiveSHA256);
});
check('Source geometry and audit copied byte-for-byte from v5',()=>{
  for(const file of ['model-data.js','cad-audit.json'])assert.equal(hash(path.join(root,file)),hash(path.resolve(root,'../3d-concepts-v5',file)));
  for(const file of fs.readdirSync(path.join(root,'source')))assert.equal(hash(path.join(root,'source',file)),hash(path.resolve(root,'../3d-concepts-v5/source',file)));
});
check('Viewer DOM references exist and v6 text does not describe old gas routing',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),viewer=fs.readFileSync(path.join(root,'src/viewer.js'),'utf8');
  for(const [,id] of viewer.matchAll(/\$\('([^']+)'\)/g))assert.ok(html.includes(`id="${id}"`),id);
  assert.ok(!html.includes('Верхний выпуск налево'));assert.ok(!viewer.includes('короб · v5'));
  assert.ok(fs.statSync(path.join(root,'viewer.js')).size>100000);
});
const report={revision:'v6',base:'v5',date:'2026-11-15',passed:results.length,checks:results,cadParts:247,visibleCAD:232,conceptMeshes:model.concept.count,shodIncluded:false,build:'npm run build passed',browserWebGLChecked:false,preview:'Offline triangle renderer of actual scene; inspected overview and water-return views',limits:'Graphic layout only. No engineering sizing, strength, clearance or equipment validation.',viewerSHA256:hash(path.join(root,'viewer.js'))};
fs.writeFileSync(path.join(root,'verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:results.length,cadParts:247,conceptMeshes:model.concept.count,browserWebGLChecked:false}));
