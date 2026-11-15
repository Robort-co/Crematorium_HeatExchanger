import * as THREE from 'three';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {addGasConcept,conceptNotes} from './gas-concept.js';

// Экспорт схемы плана из той же геометрии; это не снимок браузера.
const assembly=new THREE.Group(),meshes=[];
addGasConcept(assembly,meshes);
assembly.rotation.y=THREE.MathUtils.degToRad(conceptNotes.assemblyYawDegrees);
assembly.updateMatrixWorld(true);
const point=p=>{const v=assembly.localToWorld(new THREE.Vector3(...p));return [v.x,v.z];};
const polygon=(x1,z1,x2,z2)=>[[x1,0,z1],[x2,0,z1],[x2,0,z2],[x1,0,z2]].map(point);
const elbow=meshes.find(m=>m.userData.name==='Поворот направо 90° по ходу газа').geometry.parameters.path;
const duct=meshes.find(m=>m.userData.name==='Газоход за правым поворотом к дымососу').geometry.parameters.path;
const sample=curve=>Array.from({length:81},(_,i)=>point(curve.getPoint(i/80).toArray()));
const arrows=meshes.filter(m=>m.userData.category==='gasflow'&&m.geometry.type==='ConeGeometry').flatMap(m=>{
  const direction=new THREE.Vector3(0,1,0).applyQuaternion(m.quaternion);
  if(Math.hypot(direction.x,direction.z)<.1)return [];
  // На плане не накладывать противоположные стрелки двух разных высот.
  if(m.position.y<1&&m.position.x>-2.35)return [];
  return [{from:point(m.position.clone().addScaledVector(direction,-.24).toArray()),to:point(m.position.clone().addScaledVector(direction,.06).toArray())}];
});
const plan={
  description:'Условная схема вида сверху, рассчитанная из геометрии v4; не рендер CAD и не снимок браузера.',
  yawDegrees:conceptNotes.assemblyYawDegrees,
  shell:polygon(-1,-.41,1,.41),
  inlet:[point([-4.15,.575,0]),point([-.99,.575,0])],
  outlet:[point([-.99,1.675,0]),point([-2.35,1.675,0])],
  elbow:sample(elbow),duct:sample(duct),
  fan:polygon(-3.48,-2.6,-2.58,-2.2),motor:polygon(-3.20,-3.095,-2.86,-2.665),
  exhaust:[point([-3.36,1.56,-2.4]),point([-4.8,1.56,-2.4])],
  chimney:point([-4.8,1.575,-2.4]),chimneyRadius:.29,
  shod:[point([-3.03,1.25,-1.85]),point([-2.45,1.25,-1.85])],
  break:point([-4.15,.575,0]),continuation:[point([-4.32,.575,0]),point([-4.9,.575,0])],
  arrows,
  anchors:{shell:point([.4,1.675,0]),st:point([-1.72,1.675,0]),turn:point(elbow.getPoint(.5).toArray()),fan:point([-3.03,1.25,-2.4]),chimney:point([-4.8,1.575,-2.4]),shod:point([-2.45,1.25,-1.85]),inlet:point([-4.15,.575,0])}
};
fs.writeFileSync(fileURLToPath(new URL('../previews/plan-data.json',import.meta.url)),JSON.stringify(plan,null,2)+'\n');
