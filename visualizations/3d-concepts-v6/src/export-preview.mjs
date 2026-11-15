import fs from 'node:fs';
import * as THREE from 'three';
import {createAssembly,applyAppearance} from './assembly.js';
import {layout} from './gas-concept.js';
const path=new URL('../model-data.js',import.meta.url),source=fs.readFileSync(path,'utf8').trim();
const parts=JSON.parse(source.slice('window.CAD_PARTS='.length).replace(/;$/,''));
const model=createAssembly(parts);applyAppearance(model);model.assembly.updateMatrixWorld(true);
const b64=a=>Buffer.from(a.buffer,a.byteOffset,a.byteLength).toString('base64');
const meshes=model.meshes.filter(m=>m.visible).map(m=>{
  const p=m.geometry.attributes.position.array,n=m.geometry.attributes.normal.array;
  const wp=new Float32Array(p.length),wn=new Float32Array(n.length),normalMatrix=new THREE.Matrix3().getNormalMatrix(m.matrixWorld);
  for(let i=0;i<p.length;i+=3){
    const v=new THREE.Vector3(p[i],p[i+1],p[i+2]).applyMatrix4(m.matrixWorld);
    const normal=new THREE.Vector3(n[i],n[i+1],n[i+2]).applyMatrix3(normalMatrix).normalize();
    wp.set(v.toArray(),i);wn.set(normal.toArray(),i);
  }
  const ix=m.geometry.index?new Uint32Array(m.geometry.index.array):Uint32Array.from({length:p.length/3},(_,i)=>i);
  return {id:m.userData.id,name:m.userData.name,category:m.userData.category,origin:m.userData.origin,positions:b64(wp),normals:b64(wn),indices:b64(ix),color:m.material.color.getHexString(),opacity:m.material.opacity};
});
fs.writeFileSync(new URL('../previews/scene-data.json',import.meta.url),JSON.stringify({layout,meshes}));
console.log('Exported '+meshes.length+' visible meshes for offline software preview.');
