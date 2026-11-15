import * as THREE from 'three';
import {addGasConcept} from './gas-concept.js';
import {addWaterRelocation,applyWaterRelocation} from './water-relocation.js';

export function category(i) {
  if(i===2||i===7)return 'shell';
  if(i>=27&&i<=162)return 'tubes';
  if(i>=20&&i<=24)return 'baffles';
  if(i>=16&&i<=19)return 'water_return';
  if((i>=3&&i<=6)||(i>=8&&i<=19)||i===185||i===186)return 'water';
  if(i>=208&&i<=217||i>=222&&i<=233)return 'chamber';
  if(i>=218&&i<=221)return 'outlet';
  if(i>=171&&i<=172||i>=187&&i<=207)return 'safety';
  if(i>=234&&i<=244)return 'detached';
  if([0,1,25,26].includes(i))return 'plates';
  return 'frame';
}
const decode=(s,T)=>{const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return new T(u.buffer);};
export function createAssembly(parts) {
  const assembly=new THREE.Group(),meshes=[],originalBounds=new THREE.Box3();
  for(const part of parts){
    const p=decode(part.p,Float32Array),n=decode(part.n,Float32Array);
    // Тот же перенос CAD, что в v2. Никакого разворота из v4.
    for(let i=0;i<p.length;i+=3){
      const x=p[i],y=p[i+1],z=p[i+2],nx=n[i],nz=n[i+2];
      p[i]=(z+980)/1000;p[i+1]=(y+575)/1000;p[i+2]=-x/1000;n[i]=nz;n[i+2]=-nx;
    }
    const geometry=new THREE.BufferGeometry();
    geometry.setAttribute('position',new THREE.BufferAttribute(p,3));
    geometry.setAttribute('normal',new THREE.BufferAttribute(n,3));
    geometry.setIndex(new THREE.BufferAttribute(decode(part.ix,Uint32Array),1));geometry.computeBoundingBox();
    const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({side:THREE.DoubleSide}));
    m.userData={id:part.id,name:part.name,category:category(part.id),origin:'cad'};
    assembly.add(m);meshes.push(m);originalBounds.union(geometry.boundingBox);
  }
  const concept=addGasConcept(assembly,meshes);
  const model={assembly,meshes,originalBounds,concept};
  addWaterRelocation(model);return model;
}
export const stateColors={unknown:0x82c6dc,normal:0x7bd1a0,warn:0xffcb6b,alarm:0xff6377};
export function applyAppearance(model,{showConcept=true,showDetached=false,selected='all',state='unknown'}={}) {
  model.concept.group.visible=showConcept;
  applyWaterRelocation(model,showConcept);
  for(const mesh of model.meshes){
    const {category:c,origin,skin}=mesh.userData,m=mesh.material,isConcept=origin==='concept';
    mesh.visible=(c!=='detached'||showDetached)&&(!isConcept||showConcept)&&!(origin==='cad'&&c==='outlet'&&showConcept);
    m.transparent=false;m.opacity=1;m.depthWrite=true;m.clippingPlanes=[];
    m.emissive.set(0);m.emissiveIntensity=0;m.metalness=.4;m.roughness=.4;
    m.color.setHex(({shell:0xa3bacb,tubes:0xd5a16e,baffles:0x8fc8d2,water:0x5cc7db,water_return:0x5cc7db,chamber:0x879aa9,outlet:0xa7a6a4,safety:0xacb5bf,frame:0x485e71,plates:0xb4c4cf,detached:0x858e98})[c]||0xa6b6c2);
    if(!isConcept&&['shell','chamber','outlet'].includes(c)){
      m.transparent=true;m.opacity=c==='shell'?.22:.12;m.depthWrite=false;m.metalness=.05;m.roughness=.18;
    }
    if(isConcept){
      m.color.setHex(({outlet:0xc7a88a,damper:0xe6ab63,duct:0xdab793,arch:0xe1c29c,suction:0xe1c29c,fan:0xc69b72,motor:0x5f7387,exhaust:0xdab793,chimney:0xb9a799,gasflow:0xffb34f,water_cap:0x5cc7db})[c]||0xcaa478);
      m.metalness=.25;m.roughness=.38;
      if(skin){m.transparent=true;m.opacity=c==='fan'?.27:.36;m.depthWrite=false;}
      if(c==='gasflow'){m.emissive.copy(m.color);m.emissiveIntensity=.3;}
    }
    mesh.castShadow=!m.transparent;mesh.receiveShadow=true;mesh.renderOrder=m.transparent?2:0;
    if(selected===c||(selected==='shell'&&c==='plates')||(selected==='water'&&['water_return','water_cap'].includes(c))){
      m.emissive.setHex(stateColors[state]);m.emissiveIntensity=state==='unknown'?.2:.45;
      if(m.transparent)m.opacity=.45;
    }
    m.needsUpdate=true;
  }
}
