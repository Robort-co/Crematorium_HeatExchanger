import * as THREE from 'three';

// Условное изображение принятой схемы D-124, D-131–D-133.
// Координаты крайних стыков взяты из перенесённой сборки CAD v6.
export const pumpLayout=Object.freeze({
  x:.83,z:.601,topY:2.325,bottomY:1.256,
  upperHeaderY:2.25,lowerHeaderY:1.30,branchXs:[.34,1.32],
  handInY:2.14,filterY:2.015,pumpY:1.80,actuatorValveY:1.565,handOutY:1.42,
  replacedCAD:[19],flow:[0,-1,0],
  order:['Ручной кран','Фильтр','Насос','Электрозатвор','Ручной кран']
});
export const pumpCategories=['pumps','pump_filters','pump_valves','pump_manual','pump_pipes'];

export function addPumpGroup(model){
  const L=pumpLayout,group=new THREE.Group();group.name='Две параллельные насосные ветви';model.concept.group.add(group);
  const added=[];
  function add(g,c,name,pos=[0,0,0],rotation=null,branch=null){
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({side:THREE.DoubleSide}));m.position.set(...pos);if(rotation)m.rotation.set(...rotation);
    m.userData={id:'pump-'+added.length,name,category:c,origin:'concept',skin:false,branch};
    group.add(m);model.meshes.push(m);added.push(m);return m;
  }
  function pipe(a,b,r=.038,c='pump_pipes',name='Трубопровод насосной группы',branch=null){
    const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),direction=bv.clone().sub(av),length=direction.length();
    const m=add(new THREE.CylinderGeometry(r,r,length,32,1,true),c,name,av.clone().add(bv).multiplyScalar(.5).toArray(),null,branch);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),direction.normalize());return m;
  }
  function drum(r,length,pos,axis,c,name,branch){
    return add(new THREE.CylinderGeometry(r,r,length,40,1,false),c,name,pos,axis==='z'?[Math.PI/2,0,0]:null,branch);
  }
  function flange(x,y,branch){
    const f=add(new THREE.TorusGeometry(.064,.009,8,32),'pump_pipes','Условное фланцевое соединение',[x,y,L.z],[Math.PI/2,0,0],branch);return f;
  }
  function handValve(x,y,branch){
    drum(.061,.085,[x,y,L.z],'y','pump_manual','Ручной кран ветви '+branch,branch);
    pipe([x,y,L.z+.045],[x,y,L.z+.125],.012,'pump_manual','Шток ручного крана',branch);
    add(new THREE.BoxGeometry(.12,.016,.025),'pump_manual','Рукоятка — положение условно',[x+.04,y,L.z+.137],null,branch);
  }
  // Общие подключения; прямой байпас между коллекторами отсутствует.
  pipe([L.x,L.topY,L.z],[L.x,L.upperHeaderY,L.z],.054);
  pipe([L.x,L.lowerHeaderY,L.z],[L.x,L.bottomY,L.z],.054);
  for(const y of [L.upperHeaderY,L.lowerHeaderY]){
    const ends=[L.branchXs[0]-.08,L.branchXs[1]+.08];
    pipe([ends[0],y,L.z],[ends[1],y,L.z],.054);
    for(const x of ends)add(new THREE.CylinderGeometry(.054,.054,.004,32),'pump_pipes','Заглушённый торец коллектора',[x,y,L.z],[0,0,Math.PI/2]);
  }
  for(const [i,x] of L.branchXs.entries()){
    const branch=i+1;
    // Прямые участки останавливаются на корпусах устройств.
    for(const [a,b] of [[2.25,2.1825],[2.0975,2.075],[1.955,1.92],[1.68,1.595],[1.535,1.4625],[1.3775,1.30]])pipe([x,a,L.z],[x,b,L.z],.038,'pump_pipes','Труба ветви '+branch,branch);
    handValve(x,L.handInY,branch);handValve(x,L.handOutY,branch);
    drum(.065,.12,[x,L.filterY,L.z],'y','pump_filters','Фильтр Ф'+branch,branch);
    const pocket=pipe([x,L.filterY+.02,L.z],[x+.08,L.filterY-.06,L.z+.08],.038,'pump_filters','Косой карман фильтра Ф'+branch,branch);
    const cover=drum(.043,.015,[x+.08,L.filterY-.06,L.z+.08],'z','pump_filters','Крышка фильтра Ф'+branch,branch);
    cover.quaternion.copy(pocket.quaternion);
    // Насос изображён условно: вертикальные порты и горизонтальная ось двигателя.
    drum(.054,.24,[x,L.pumpY,L.z],'y','pumps','Патрубки насоса Н'+branch,branch);
    drum(.115,.14,[x,L.pumpY,L.z+.035],'z','pumps','Корпус насоса Н'+branch,branch);
    drum(.087,.22,[x,L.pumpY,L.z+.215],'z','pumps','Двигатель насоса Н'+branch,branch);
    for(let j=0;j<5;j++)add(new THREE.TorusGeometry(.088,.006,6,32),'pumps','Рёбра двигателя Н'+branch,[x,L.pumpY,L.z+.13+j*.04],null,branch);
    add(new THREE.BoxGeometry(.09,.07,.10),'pumps','Клеммная коробка Н'+branch,[x+.09,L.pumpY+.07,L.z+.21],null,branch);
    flange(x,L.pumpY+.12,branch);flange(x,L.pumpY-.12,branch);
    drum(.075,.06,[x,L.actuatorValveY,L.z],'y','pump_valves','Электрозатвор З'+branch,branch);
    pipe([x,L.actuatorValveY,L.z+.06],[x,L.actuatorValveY,L.z+.16],.014,'pump_valves','Шток З'+branch,branch);
    add(new THREE.BoxGeometry(.14,.095,.10),'pump_valves','Электропривод З'+branch,[x,L.actuatorValveY,L.z+.205],null,branch);
    flange(x,L.actuatorValveY+.03,branch);flange(x,L.actuatorValveY-.03,branch);
  }
  model.concept.count+=added.length;
  model.concept.notes.pumpGroup={source:'docs/2026-10-29_Утверждённая_гидравлика.md, D-124, D-131–D-133',layout:L,checkValves:false,status:'Unknown; static schematic only',geometry:'Symbolic equipment shapes and spacing; not manufacturer CAD'};
  model.pumpGroup={group,layout:L,count:added.length};
}
