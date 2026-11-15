import * as THREE from 'three';

// Положение оси и размер фланца взяты из CAD. Толщина крышки условна.
export const waterLayout=Object.freeze({
  movedCAD:[16,17,18,19],connectedFlange:12,freeFlange:13,
  axisX:.83,axisY:1.125,oldFlangeFaceZ:-.46,newFlangeFaceZ:.46,
  flangeRadius:.1075,capThickness:.012,
  rotationDegrees:180
});

export function addWaterRelocation(model){
  const L=waterLayout;
  const cap=new THREE.Mesh(
    new THREE.CylinderGeometry(L.flangeRadius,L.flangeRadius,L.capThickness,64,1,false),
    new THREE.MeshStandardMaterial({side:THREE.DoubleSide})
  );
  cap.rotation.x=Math.PI/2;
  cap.position.set(L.axisX,L.axisY,L.oldFlangeFaceZ-L.capThickness/2);
  cap.userData={id:'water-cap',category:'water_cap',name:'Глухая крышка прежней обратки (условно)',origin:'concept',skin:false};
  model.concept.group.add(cap);model.meshes.push(cap);model.concept.count++;
  model.concept.notes.waterRelocation=waterLayout;
}

export function applyWaterRelocation(model,enabled){
  for(const m of model.meshes){
    if(m.userData.origin!=='cad'||!waterLayout.movedCAD.includes(m.userData.id))continue;
    // Жёсткий поворот вокруг вертикальной оси x=.83,z=0: (x,y,z) -> (1.66-x,y,-z).
    m.rotation.set(0,enabled?Math.PI:0,0);
    m.position.set(enabled?2*waterLayout.axisX:0,0,0);
  }
}
