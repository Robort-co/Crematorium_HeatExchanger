import * as THREE from 'three';

// Координаты обвязки — параметры рисунка, не монтажные размеры.
// +Y вверх; выход газа -X; правая сторона по ходу: (-X) × (+Y) = -Z.
export const conceptNotes = {
  revision: 'v4', style: '01 — полупрозрачный',
  requested: 'Небольшой поворот по часовой стрелке; правый поворот выходного тракта на 90°; дымосос и дымоход за поворотом; осевой вход нижнего корпуса с обрывом в сторону ARANGA.',
  assumptions: 'Разворот 12° по часовой стрелке при взгляде сверху выбран для эскиза. Длины, сечения, радиус отвода, снижение и форма оборудования условны.',
  assemblyYawDegrees: -12,
  outlet: {x:-.99,y:1.675,z:0}, inlet: {x:-.99,y:.575,z:0},
  inletBreak: {x:-4.15,y:.575,z:0},
  turn: {degrees:90,plane:'XZ',incoming:[-1,0,0],outgoing:[0,0,-1],side:'right relative to gas flow'},
  fanCenter: {x:-3.03,y:1.25,z:-2.4}, chimneyCenter: {x:-4.8,z:-2.4},
  chimneyHeight:3.15, chimneyAxis:[0,1,0],
  originalCADOutletHiddenWhenConceptVisible:[218,219,220,221],
  internalGasDirection:'Внутренние стрелки не добавлены. Показаны внешний вход и выход.',
  terminology:'ШД пользователя / ШТ по проекту.'
};

export function addGasConcept(assembly, meshes) {
  const group = new THREE.Group();
  group.name = 'Условная газовая обвязка v4';
  assembly.add(group);
  const added = [];
  function add(g,c,n,p=[0,0,0],r=null,skin=false) {
    const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({side:THREE.DoubleSide}));
    m.position.set(...p); if(r)m.rotation.set(...r);
    m.userData={category:c,name:n,id:'concept-'+added.length,origin:'concept',skin};
    m.castShadow=!skin; m.receiveShadow=true;
    group.add(m); meshes.push(m); added.push(m); return m;
  }
  const box=(s,c,n,p,r,skin=false)=>add(new THREE.BoxGeometry(...s),c,n,p,r,skin);
  function cylinder(radius,length,c,n,p,axis='y',skin=false,open=true) {
    return add(new THREE.CylinderGeometry(radius,radius,length,48,1,open),c,n,p,
      axis==='x'?[0,0,Math.PI/2]:axis==='z'?[Math.PI/2,0,0]:null,skin);
  }
  function pipe(points,r,c,n) {
    const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal');
    return add(new THREE.TubeGeometry(curve,64,r,40,false),c,n,[0,0,0],null,true);
  }
  function ring(r,at,c,axis='y') {
    const m=add(new THREE.TorusGeometry(r,.017,8,48),c,'Условный фланец',at);
    if(axis==='y')m.rotation.x=Math.PI/2;
    if(axis==='x')m.rotation.y=Math.PI/2; return m;
  }
  function arrow(at,dir,len,c='gasflow') {
    const d=new THREE.Vector3(...dir).normalize(),p=new THREE.Vector3(...at);
    const body=cylinder(.012,len-.12,c,'Направление внешнего потока',p.clone().addScaledVector(d,(len-.12)/2).toArray(),'y',false,false);
    body.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);
    const head=add(new THREE.ConeGeometry(.05,.12,16),c,'Статичная стрелка',p.clone().addScaledVector(d,len-.06).toArray());
    head.quaternion.copy(body.quaternion);
  }
  function loftX(x1,x2,y,half1,half2,round2=false) {
    const pos=[],ix=[];
    for(let j=0;j<2;j++)for(let i=0;i<=64;i++){
      const a=2*Math.PI*i/64,co=Math.cos(a),si=Math.sin(a),h=j?half2:half1;
      const r=j&&round2?h:Math.min(h/(Math.abs(co)||1e-8),h/(Math.abs(si)||1e-8));
      pos.push(j?x2:x1,y+r*co,r*si);
    }
    for(let i=0;i<64;i++)ix.push(i,i+65,i+1,i+1,i+65,i+66);
    const g=new THREE.BufferGeometry();
    g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
    g.setIndex(ix);g.computeVertexNormals();
    return add(g,'outlet','Боковой переход — условная геометрия',[0,0,0],null,true);
  }

  // Выход верхнего корпуса и ШТ по схеме v3.
  loftX(-.99,-1.48,1.675,.415,.30);
  loftX(-1.48,-1.96,1.675,.30,.30);
  loftX(-1.96,-2.20,1.675,.30,.23,true);
  box([.014,.54,.54],'damper','ШТ: условная пластина',[-1.72,1.675,0],[0,0,.5]);
  cylinder(.018,.76,'damper','Условная ось ШТ',[-1.72,1.675,0],'z',false,false);
  box([.19,.14,.14],'damper','Условный привод ШТ',[-1.72,1.675,.43]);
  ring(.24,[-2.20,1.675,0],'duct','x');
  cylinder(.23,.15,'duct','Прямой участок перед поворотом',[-2.275,1.675,0],'x',true);

  // Точная четверть окружности: касательные -X → -Z, угол в плане 90°.
  class RightElbow extends THREE.Curve {
    getPoint(t,target=new THREE.Vector3()) {
      const a=t*Math.PI/2;
      return target.set(-2.35-.68*Math.sin(a),1.675,-.68+.68*Math.cos(a));
    }
    getTangent(t,target=new THREE.Vector3()) {
      const a=t*Math.PI/2;
      return target.set(-Math.cos(a),0,-Math.sin(a));
    }
  }
  add(new THREE.TubeGeometry(new RightElbow(),48,.23,40,false),'duct','Поворот направо 90° по ходу газа',[0,0,0],null,true);
  pipe([[-3.03,1.675,-.68],[-3.03,1.675,-.86],[-3.03,1.25,-1.5],[-3.03,1.25,-1.7],[-3.03,1.25,-2.2]],.23,'duct','Газоход за правым поворотом к дымососу');
  ring(.24,[-3.03,1.25,-2.2],'duct','z');

  // ШОД после отвода, перед дымососом.
  cylinder(.12,.58,'shod','Врезка наружного воздуха через ШОД',[-2.74,1.25,-1.85],'x',true);
  ring(.13,[-2.45,1.25,-1.85],'shod','x');
  add(new THREE.CircleGeometry(.112,40),'shod','ШОД: условная пластина',[-2.63,1.25,-1.85],[0,Math.PI/2+.6,0]);
  cylinder(.012,.32,'shod','Условная ось ШОД',[-2.63,1.25,-1.85],'y',false,false);
  box([.10,.11,.12],'shod','Условный привод ШОД',[-2.63,1.46,-1.85]);
  arrow([-2.04,1.25,-1.85],[-1,0,0],.32,'airflow');

  // Прежняя условная форма дымососа, вход навстречу потоку -Z.
  const fx=-3.03,fy=1.25,fz=-2.4;
  cylinder(.45,.40,'fan','Условный корпус дымососа Д3,5',[fx,fy,fz],'z',true);
  add(new THREE.RingGeometry(.24,.45,48),'fan','Условный вход дымососа',[fx,fy,fz+.20],null,true);
  ring(.45,[fx,fy,fz+.20],'fan','z');ring(.45,[fx,fy,fz-.20],'fan','z');
  add(new THREE.CircleGeometry(.45,48),'fan','Условная задняя стенка дымососа',[fx,fy,fz-.20],null,true);
  cylinder(.095,.27,'fan','Ступица условного колеса',[fx,fy,fz-.01],'z',false,false);
  for(let i=0;i<16;i++){
    const a=2*Math.PI*i/16;
    box([.20,.026,.23],'fan','Условная лопатка',[fx+.265*Math.cos(a),fy+.265*Math.sin(a),fz],[0,0,a+.27]);
  }
  cylinder(.17,.43,'motor','Условный двигатель АИР, прямой привод',[fx,fy,fz-.48],'z',false,false);
  for(let i=0;i<7;i++)ring(.18,[fx,fy,fz-.31-i*.05],'motor','z');
  box([.17,.12,.19],'motor','Условная клеммная коробка',[fx,fy+.22,fz-.47]);
  box([.40,.30,.34],'fan','Условный выход дымососа',[fx-.33,fy+.31,fz],null,true);
  box([1.24,.30,.34],'duct','Условный участок после дымососа',[-4.18,1.56,fz],null,true);
  const chimney=cylinder(.29,3.15,'chimney','Вертикальный дымоход ТО',[-4.8,1.575,fz],'y',true);
  ring(.29,[-4.8,3.15,fz],'chimney');ring(.29,[-4.8,.07,fz],'chimney');

  // Вход нижнего корпуса: общая ось Y=.575, Z=0; печь не моделируется.
  add(new THREE.CylinderGeometry(.30,.41,.51,48,1,true),'inlet','Условный осевой вход нижнего корпуса',[-1.245,.575,0],[0,0,Math.PI/2],true);
  cylinder(.30,2.65,'inlet','Входящий газовый тракт от ARANGA',[-2.825,.575,0],'x',true);
  ring(.31,[-1.5,.575,0],'inlet','x');
  // Волнистая линия обрыва обозначает продолжение, а не заглушку.
  const breakPoints=Array.from({length:129},(_,i)=>{
    const a=i*Math.PI*2/128;
    return new THREE.Vector3(-4.15+.055*Math.cos(8*a),.575+.31*Math.cos(a),.31*Math.sin(a));
  });
  group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(breakPoints),new THREE.LineBasicMaterial({color:0xffc381})));
  const continuation=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4.32,.575,0),new THREE.Vector3(-4.9,.575,0)]),new THREE.LineDashedMaterial({color:0xffc381,dashSize:.07,gapSize:.055}));
  continuation.computeLineDistances();group.add(continuation);

  arrow([-3.85,.575,0],[1,0,0],.58);
  arrow([-2.65,.575,0],[1,0,0],.58);
  arrow([-2.18,1.675,0],[-1,0,0],.34);
  arrow([-3.03,1.40,-1.18],[0,-.25,-1],.46);
  arrow([-3.91,1.56,fz],[-1,0,0],.49);
  arrow([-4.8,2.25,fz],[0,1,0],.50);
  return {count:added.length,notes:conceptNotes,chimney,group};
}
