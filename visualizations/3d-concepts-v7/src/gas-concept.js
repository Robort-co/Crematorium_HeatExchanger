import * as THREE from 'three';

// Параметры художественной модели; не монтажные размеры.
// X — вдоль банок; Y — вверх. Выход верхней банки: -X.
// v7: два плоских скоса задних полукруглых торцов по образцу STEP, деталь 219.
export const layout = Object.freeze({
  bankExit: [-.99, 1.675, 0],
  boxX: -1.40,
  wideSide: .82, narrowSide: .70, lowerRadius: .410,
  bottomY: 1.265, taperBottomY: 2.30, taperTopY: 2.66,
  stY: 2.78,
  archCenterY: 3.525, archRadius: .35,
  archTopY: 3.875,
  bevelSlope: .4813477694988251,
  pipeRadius: .24, pipeLength: 1.45,
  fanX: -1.40, fanY: 3.525, fanZ: -2.00, fanDepth: .40,
  fanDischargeX: -.95, fanDischargeY: 4.225, fanDischargeZ: -2.00,
  transitionBottomY: 4.425, transitionTopY: 4.775,
  chimneyX: -.95, chimneyZ: -2.00, chimneyRadius: .22, chimneyBaseY: 4.775, chimneyHeight: 5.80
});
export const conceptNotes = {
  revision:'v7',base:'v6',shodIncluded:false,
  requested:'Прямые скосы двух задних полукруглых торцов до и после ШТ по образцу верхнего выходного канала исходного STEP. Две параллельные насосные ветви на перенесённой водяной обратке.',
  bevelReference:{cadMesh:219,name:'Выходной канал торец полукруглый',slope:layout.bevelSlope,tiltFromVerticalDegrees:25.70373411787751},
  assumptions:'Длина круглого участка 1,45 взята как длина прежнего участка v5 после дымососа. Условный диаметр дымовой трубы уменьшен с 0,58 до 0,44. Высота, сечения и исполнения не являются расчётными размерами.',
  geometrySource:'Корпуса и внутренности — исходный STEP. Детали газового выхода 218–221 скрыты в новом макете. Детали обратки 16–19 перемещены как в v6; прямую трубу 19 в отображении заменяют две насосные ветви.',
  hiddenCADOutlet:[218,219,220,221],
  gasDirections:{bankExit:[-1,0,0],rise:[0,1,0],fanSuction:[0,0,-1],fanDischarge:[0,1,0]},
  axis:[0,0,-1],upperYawDegrees:90,archCenter:[layout.boxX,layout.archCenterY,0],archRadius:layout.archRadius,
  layout
};

export function addGasConcept(assembly, meshes) {
  const group=new THREE.Group();group.name='Обвязка v7';assembly.add(group);
  const added=[];
  const quadBuckets=new Map();
  function add(geometry,category,name,position=[0,0,0],rotation=null,skin=false) {
    const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({side:THREE.DoubleSide}));
    m.position.set(...position);if(rotation)m.rotation.set(...rotation);
    m.userData={category,name,id:'concept-'+added.length,origin:'concept',skin};
    group.add(m);meshes.push(m);added.push(m);return m;
  }
  const box=(s,c,n,p,r,skin=false)=>add(new THREE.BoxGeometry(...s),c,n,p,r,skin);
  function cylinder(radius,length,c,n,p,axis='y',skin=false,open=true) {
    return add(new THREE.CylinderGeometry(radius,radius,length,64,1,open),c,n,p,
      axis==='x'?[0,0,Math.PI/2]:axis==='z'?[Math.PI/2,0,0]:null,skin);
  }
  function quad(points,c,n,skin=true) {
    const key=c+'|'+n,entry=quadBuckets.get(key)||{positions:[],indices:[],c,n,skin};
    const start=entry.positions.length/3;
    entry.positions.push(...points.flat());entry.indices.push(start,start+1,start+2,start,start+2,start+3);
    quadBuckets.set(key,entry);
  }
  function ring(radius,at,c,axis='y') {
    const m=add(new THREE.TorusGeometry(radius,.014,8,64),c,'Условный фланец',at);
    if(axis==='y')m.rotation.x=Math.PI/2;
    if(axis==='x')m.rotation.y=Math.PI/2;return m;
  }
  function arrow(at,dir,len) {
    const d=new THREE.Vector3(...dir).normalize(),p=new THREE.Vector3(...at);
    const b=cylinder(.013,len-.12,'gasflow','Направление газа',p.clone().addScaledVector(d,(len-.12)/2).toArray(),'y',false,false);
    b.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);
    const h=add(new THREE.ConeGeometry(.055,.12,16),'gasflow','Стрелка газа',p.clone().addScaledVector(d,len-.06).toArray());
    h.quaternion.copy(b.quaternion);
  }
  function rectShape(z1,y1,z2,y2) {
    return new THREE.Shape().moveTo(z1,y1).lineTo(z2,y1).lineTo(z2,y2).lineTo(z1,y2).closePath();
  }
  function hole(shape,z,y,r) {
    const p=new THREE.Path();p.absarc(z,y,r,0,Math.PI*2,true);shape.holes.push(p);
  }
  // ShapeGeometry задана координатами (Z,Y), затем переносится в плоскость X.
  function face(shape,x,c,n,skin=true) {
    const g=new THREE.ShapeGeometry(shape,64),p=g.attributes.position;
    for(let i=0;i<p.count;i++){const z=p.getX(i),y=p.getY(i);p.setXYZ(i,x,y,z);}
    g.computeVertexNormals();return add(g,c,n,[0,0,0],null,skin);
  }
  function faceZ(shape,z,c,n,skin=true) {
    const g=new THREE.ShapeGeometry(shape,64),p=g.attributes.position;
    for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);p.setXYZ(i,layout.boxX+x,y,z);}
    g.computeVertexNormals();return add(g,c,n,[0,0,0],null,skin);
  }
  function squareTube(y1,y2,s1,s2,c,n) {
    const x=layout.boxX;
    const corners=s=>[[x-s/2,-s/2],[x+s/2,-s/2],[x+s/2,s/2],[x-s/2,s/2]];
    const a=corners(s1),b=corners(s2);
    for(let i=0;i<4;i++){const j=(i+1)%4;quad([[a[i][0],y1,a[i][1]],[a[j][0],y1,a[j][1]],[b[j][0],y2,b[j][1]],[b[i][0],y2,b[i][1]]],c,n);}
  }
  const L=layout,wide=L.wideSide/2,half=L.narrowSide/2;
  const xBack=L.boxX-half,xFront=L.boxX+half;
  // Продолжение верхней банки: нижняя полуокружность с тем же радиусом .410.
  function lowerShape(){
    const s=new THREE.Shape().moveTo(-wide,L.taperBottomY).lineTo(-wide,L.bankExit[1]);
    s.absarc(0,L.bankExit[1],L.lowerRadius,Math.PI,Math.PI*2,false);
    s.lineTo(wide,L.taperBottomY);s.closePath();return s;
  }
  const lowerFront=lowerShape();
  hole(lowerFront,0,L.bankExit[1],.403);
  face(lowerFront,L.boxX+wide,'outlet','Круглое продолжение верхней банки');
  // Верхняя прямоугольная часть остаётся вертикальной. Полукруглый торец
  // наклоняется внутрь по плоскости x = xBack + slope * (axisY - y), как STEP 219.
  face(rectShape(-wide,L.bankExit[1],wide,L.taperBottomY),L.boxX-wide,'outlet','Прямая задняя стенка нижнего короба');
  const bottomBack=face(new THREE.Shape().absarc(0,L.bankExit[1],wide,Math.PI,2*Math.PI,false).closePath(),L.boxX-wide,'bevel_lower','Нижний плоский скос по STEP');
  const bp=bottomBack.geometry.attributes.position;
  for(let i=0;i<bp.count;i++)bp.setX(i,L.boxX-wide+L.bevelSlope*(L.bankExit[1]-bp.getY(i)));
  bottomBack.geometry.computeVertexNormals();
  for(const z of [-wide,wide])quad([[L.boxX-wide,L.bankExit[1],z],[L.boxX+wide,L.bankExit[1],z],[L.boxX+wide,L.taperBottomY,z],[L.boxX-wide,L.taperBottomY,z]],'outlet','Боковая стенка нижнего короба');
  for(let i=0;i<128;i++){
    const a=Math.PI+i*Math.PI/128,b=Math.PI+(i+1)*Math.PI/128;
    const back=t=>L.boxX-wide-L.bevelSlope*wide*Math.sin(t);
    quad([[back(a),L.bankExit[1]+wide*Math.sin(a),wide*Math.cos(a)],[L.boxX+wide,L.bankExit[1]+wide*Math.sin(a),wide*Math.cos(a)],[L.boxX+wide,L.bankExit[1]+wide*Math.sin(b),wide*Math.cos(b)],[back(b),L.bankExit[1]+wide*Math.sin(b),wide*Math.cos(b)]],'outlet','Полукруглое дно соосно верхней банке');
  }
  squareTube(L.taperBottomY,L.taperTopY,L.wideSide,L.narrowSide,'duct','Сужение обеих сторон квадратного короба');

  // Арка повёрнута на 90°: теперь фасад и отверстие смотрят по -Z.
  function archShape() {
    const s=new THREE.Shape().moveTo(-half,L.taperTopY).lineTo(half,L.taperTopY).lineTo(half,L.archCenterY);
    s.absarc(0,L.archCenterY,L.archRadius,0,Math.PI,false);s.lineTo(-half,L.taperTopY);s.closePath();return s;
  }
  const frontShape=archShape();hole(frontShape,0,L.archCenterY,L.pipeRadius);
  faceZ(frontShape,-half,'arch','Арочная стенка с круглым отверстием');
  faceZ(rectShape(-half,L.taperTopY,half,L.archCenterY),half,'arch','Прямая задняя стенка верхнего короба');
  const topBack=faceZ(new THREE.Shape().absarc(0,L.archCenterY,half,0,Math.PI,false).closePath(),half,'bevel_upper','Верхний плоский скос по STEP');
  const tp=topBack.geometry.attributes.position;
  for(let i=0;i<tp.count;i++)tp.setZ(i,half-L.bevelSlope*(tp.getY(i)-L.archCenterY));
  topBack.geometry.computeVertexNormals();
  for(const x of [xBack,xFront])quad([[x,L.taperTopY,-half],[x,L.taperTopY,half],[x,L.archCenterY,half],[x,L.archCenterY,-half]],'duct','Вертикальная стенка квадратного короба');
  for(let i=0;i<128;i++){
    const a=i*Math.PI/128,b=(i+1)*Math.PI/128;
    const back=t=>half-L.bevelSlope*half*Math.sin(t);
    quad([[L.boxX+half*Math.cos(a),L.archCenterY+half*Math.sin(a),-half],[L.boxX+half*Math.cos(a),L.archCenterY+half*Math.sin(a),back(a)],[L.boxX+half*Math.cos(b),L.archCenterY+half*Math.sin(b),back(b)],[L.boxX+half*Math.cos(b),L.archCenterY+half*Math.sin(b),-half]],'arch','Полукруглая крыша, концентричная трубе');
  }

  // ШТ в уменьшенном квадратном сечении после сужения.
  box([.62,.014,.62],'damper','ШТ — условная пластина',[L.boxX,L.stY,0],[0,0,.36]);
  cylinder(.018,.89,'damper','Ось ШТ',[L.boxX,L.stY,0],'z',false,false);
  box([.20,.13,.14],'damper','Условный привод ШТ',[L.boxX,L.stY,.52]);
  for(const sign of [-1,1]){
    box([.76,.035,.035],'damper','Рамка ШТ',[L.boxX,L.stY,sign*.37]);
    box([.035,.035,.76],'damper','Рамка ШТ',[L.boxX+sign*.37,L.stY,0]);
  }

  // Продлённая круглая труба по -Z, в прежнем направлении выпуска v5.
  cylinder(L.pipeRadius,L.pipeLength,'suction','Круглый тракт к дымососу',[L.boxX,L.fanY,-half-L.pipeLength/2],'z',true);
  ring(L.pipeRadius+.012,[L.boxX,L.fanY,-half],'suction','z');
  ring(L.pipeRadius+.012,[L.fanX,L.fanY,L.fanZ+L.fanDepth/2],'suction','z');

  // Улитка строится в прежних локальных осях и ниже поворачивается целиком:
  // осевой вход +X -> -Z, выпуск -Z -> +Y. Форма и размеры сохраняются.
  function voluteShape() {
    return new THREE.Shape().moveTo(-.70,.60).lineTo(0,.60)
      .bezierCurveTo(.45,.60,.57,.36,.57,0)
      .bezierCurveTo(.57,-.36,.25,-.50,0,-.50)
      .bezierCurveTo(-.45,-.50,-.61,-.08,-.35,.30)
      .lineTo(-.70,.30).closePath();
  }
  // Перенос только вертикальной координаты Shape, центры отверстий остаются точными.
  function shiftedShape(s,withHole=false) {
    const pts=s.getPoints(64),out=new THREE.Shape(pts.map(p=>new THREE.Vector2(p.x,p.y+L.fanY)));
    if(withHole)hole(out,0,L.fanY,L.pipeRadius);return out;
  }
  const fx1=L.fanX-L.fanDepth/2,fx2=L.fanX+L.fanDepth/2;
  face(shiftedShape(voluteShape(),true),fx1,'fan','Передняя стенка улитки с осевым отверстием');
  face(shiftedShape(voluteShape()),fx2,'fan','Задняя стенка улитки');
  const outline=voluteShape().getPoints(64);
  for(let i=0;i<outline.length-1;i++){
    const a=outline[i],b=outline[i+1];
    if(Math.abs(a.x+.70)<1e-8&&Math.abs(b.x+.70)<1e-8)continue; // открытый выпуск
    quad([[fx1,L.fanY+a.y,a.x],[fx2,L.fanY+a.y,a.x],[fx2,L.fanY+b.y,b.x],[fx1,L.fanY+b.y,b.x]],'fan','Оболочка условной улитки');
  }
  cylinder(.095,.27,'fan','Ступица колеса',[L.fanX,L.fanY,0],'x',false,false);
  for(let i=0;i<16;i++){
    const a=i*2*Math.PI/16;
    box([.23,.20,.026],'fan','Условная лопатка',[L.fanX,L.fanY+.265*Math.cos(a),.265*Math.sin(a)],[a+.27,0,0]);
  }
  cylinder(.17,.43,'motor','Двигатель прямого привода',[L.fanX+.48,L.fanY,0],'x',false,false);
  for(let i=0;i<7;i++)ring(.18,[L.fanX+.31+i*.05,L.fanY,0],'motor','x');
  box([.19,.12,.17],'motor','Клеммная коробка двигателя',[L.fanX+.48,L.fanY+.22,0]);

  // Выпуск вверх: прямоугольный участок, переход и круглая дымовая труба.
  const corners=[[-.15,-.20],[.15,-.20],[.15,.20],[-.15,.20]];
  for(let i=0;i<4;i++){
    const a=corners[i],b=corners[(i+1)%4];
    const p=(v,y)=>[L.chimneyX+v[0],y,L.chimneyZ+v[1]];
    quad([p(a,L.fanDischargeY),p(b,L.fanDischargeY),p(b,L.transitionBottomY),p(a,L.transitionBottomY)],'exhaust','Вертикальный прямоугольный выпуск');
  }
  // Углы прямоугольника включены явно: стык не имеет срезанных уголков.
  const angles=Array.from({length:64},(_,i)=>i*2*Math.PI/64);
  for(const [x,z] of corners)angles.push((Math.atan2(z,x)+2*Math.PI)%(2*Math.PI));
  angles.sort((a,b)=>a-b);
  const lower=t=>{const r=Math.min(.15/Math.max(Math.abs(Math.cos(t)),1e-12),.20/Math.max(Math.abs(Math.sin(t)),1e-12));return [L.chimneyX+r*Math.cos(t),L.transitionBottomY,L.chimneyZ+r*Math.sin(t)];};
  const upper=t=>[L.chimneyX+L.chimneyRadius*Math.cos(t),L.transitionTopY,L.chimneyZ+L.chimneyRadius*Math.sin(t)];
  for(let i=0;i<angles.length;i++){
    const a=angles[i],b=angles[(i+1)%angles.length];
    quad([lower(a),lower(b),upper(b),upper(a)],'exhaust','Переход прямоугольного выпуска в круглую трубу');
    const top=t=>[L.chimneyX+L.chimneyRadius*Math.cos(t),L.chimneyHeight,L.chimneyZ+L.chimneyRadius*Math.sin(t)];
    quad([upper(a),upper(b),top(b),top(a)],'chimney','Дымовая труба над дымососом');
  }
  ring(L.chimneyRadius,[L.chimneyX,L.chimneyHeight,L.chimneyZ],'chimney');
  ring(L.chimneyRadius,[L.chimneyX,L.chimneyBaseY,L.chimneyZ],'chimney');

  // Стрелки только на запрошенном внешнем участке.
  arrow([-.90,L.bankExit[1],0],[-1,0,0],.38);
  arrow([L.boxX,1.90,0],[0,1,0],.48);
  arrow([L.boxX,2.94,0],[0,1,0],.38);
  arrow([L.boxX,L.fanY,-.55],[0,0,-1],.60);
  arrow([L.chimneyX,4.27,L.chimneyZ],[0,1,0],.40);
  arrow([L.chimneyX,5.00,L.chimneyZ],[0,1,0],.55);
  for(const entry of quadBuckets.values()){
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(entry.positions,3));
    g.setIndex(entry.indices);g.computeVertexNormals();add(g,entry.c,entry.n,[0,0,0],null,entry.skin);
  }
  const fanRotation=new THREE.Matrix4().set(
    0,1,0,L.fanX-L.fanY,
    0,0,-1,L.fanY,
    -1,0,0,L.fanZ+L.fanX,
    0,0,0,1
  );
  for(const mesh of added)if(['fan','motor'].includes(mesh.userData.category))mesh.applyMatrix4(fanRotation);
  return {count:added.length,notes:conceptNotes,group};
}
