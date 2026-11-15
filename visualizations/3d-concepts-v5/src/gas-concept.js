import * as THREE from 'three';

// Параметры художественной модели; не монтажные размеры.
// X — вдоль банок; Y — вверх. Выход верхней банки: -X.
// После подъёма всасывание дымососа: +X. Слева по ходу +X: -Z.
export const layout = Object.freeze({
  bankExit: [-.99, 1.675, 0],
  boxX: -1.405,
  wideSide: .83, narrowSide: .70,
  bottomY: 1.260, taperBottomY: 2.30, taperTopY: 2.66,
  stY: 2.78,
  archCenterY: 3.525, archRadius: .35,
  archTopY: 3.875,
  pipeRadius: .24, pipeLength: .46,
  fanX: -.395, fanY: 3.525, fanZ: 0, fanDepth: .40,
  fanDischargeY: 3.975, fanDischargeZ: -.70,
  chimneyX: -.395, chimneyZ: -2.15, chimneyRadius: .29, chimneyHeight: 5.10
});
export const conceptNotes = {
  revision:'v5',base:'v2',shodIncluded:false,
  requested:'Квадратный короб с сужением обеих сторон; ШТ после сужения; арочная верхушка концентрична круглой трубе; дымосос над ТО, всасывание обратно вдоль банок; выпуск сверху налево. ШОД исключён по последнему указанию.',
  assumptions:'Высота от оси выхода верхней банки до верха короба 2,20 в масштабе модели — примерно высота двухъярусного ТО. ШТ на прежней высоте ШОД v2. Сечения, длины, форма улитки и высота трубы условны.',
  geometrySource:'Корпуса и внутренности — STEP v2. Четыре исходные детали выходного канала 218–221 заменяются только в отображении новым квадратным коробом.',
  hiddenCADOutlet:[218,219,220,221],
  gasDirections:{bankExit:[-1,0,0],rise:[0,1,0],fanSuction:[1,0,0],fanDischarge:[0,0,-1]},
  axis:[1,0,0],archCenter:[layout.boxX,layout.archCenterY,0],archRadius:layout.archRadius,
  layout
};

export function addGasConcept(assembly, meshes) {
  const group=new THREE.Group();group.name='Обвязка v5';assembly.add(group);
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
  function squareTube(y1,y2,s1,s2,c,n) {
    const x=layout.boxX;
    const corners=s=>[[x-s/2,-s/2],[x+s/2,-s/2],[x+s/2,s/2],[x-s/2,s/2]];
    const a=corners(s1),b=corners(s2);
    for(let i=0;i<4;i++){const j=(i+1)%4;quad([[a[i][0],y1,a[i][1]],[a[j][0],y1,a[j][1]],[b[j][0],y2,b[j][1]],[b[i][0],y2,b[i][1]]],c,n);}
  }
  const L=layout,wide=L.wideSide/2,half=L.narrowSide/2;
  const xBack=L.boxX-half,xFront=L.boxX+half;
  // Новый нижний короб с открытым круглым входом от верхней банки.
  const lowerFront=rectShape(-wide,L.bottomY,wide,L.taperBottomY);
  hole(lowerFront,0,L.bankExit[1],.403);
  face(lowerFront,L.boxX+wide,'outlet','Вход верхней банки в квадратный короб');
  face(rectShape(-wide,L.bottomY,wide,L.taperBottomY),L.boxX-wide,'outlet','Задняя стенка нижнего короба');
  quad([[L.boxX-wide,L.bottomY,-wide],[L.boxX+wide,L.bottomY,-wide],[L.boxX+wide,L.taperBottomY,-wide],[L.boxX-wide,L.taperBottomY,-wide]],'outlet','Боковая стенка нижнего короба');
  quad([[L.boxX-wide,L.bottomY,wide],[L.boxX+wide,L.bottomY,wide],[L.boxX+wide,L.taperBottomY,wide],[L.boxX-wide,L.taperBottomY,wide]],'outlet','Боковая стенка нижнего короба');
  quad([[L.boxX-wide,L.bottomY,-wide],[L.boxX+wide,L.bottomY,-wide],[L.boxX+wide,L.bottomY,wide],[L.boxX-wide,L.bottomY,wide]],'outlet','Дно поворотного короба');
  squareTube(L.taperBottomY,L.taperTopY,L.wideSide,L.narrowSide,'duct','Сужение обеих сторон квадратного короба');

  // Две стенки с арочным верхом; отверстие только со стороны дымососа.
  function archShape() {
    const s=new THREE.Shape().moveTo(-half,L.taperTopY).lineTo(half,L.taperTopY).lineTo(half,L.archCenterY);
    s.absarc(0,L.archCenterY,L.archRadius,0,Math.PI,false);s.lineTo(-half,L.taperTopY);s.closePath();return s;
  }
  const frontShape=archShape();hole(frontShape,0,L.archCenterY,L.pipeRadius);
  face(frontShape,xFront,'arch','Арочная стенка с круглым отверстием');
  face(archShape(),xBack,'arch','Сплошная задняя арочная стенка');
  for(const z of [-half,half])quad([[xBack,L.taperTopY,z],[xFront,L.taperTopY,z],[xFront,L.archCenterY,z],[xBack,L.archCenterY,z]],'duct','Вертикальная стенка квадратного короба');
  for(let i=0;i<48;i++){
    const a=i*Math.PI/48,b=(i+1)*Math.PI/48;
    quad([[xBack,L.archCenterY+half*Math.sin(a),half*Math.cos(a)],[xFront,L.archCenterY+half*Math.sin(a),half*Math.cos(a)],[xFront,L.archCenterY+half*Math.sin(b),half*Math.cos(b)],[xBack,L.archCenterY+half*Math.sin(b),half*Math.cos(b)]],'arch','Полукруглая крыша, концентричная трубе');
  }

  // ШТ в уменьшенном квадратном сечении после сужения.
  box([.62,.014,.62],'damper','ШТ — условная пластина',[L.boxX,L.stY,0],[0,0,.36]);
  cylinder(.018,.89,'damper','Ось ШТ',[L.boxX,L.stY,0],'z',false,false);
  box([.20,.13,.14],'damper','Условный привод ШТ',[L.boxX,L.stY,.52]);
  for(const sign of [-1,1]){
    box([.76,.035,.035],'damper','Рамка ШТ',[L.boxX,L.stY,sign*.37]);
    box([.035,.035,.76],'damper','Рамка ШТ',[L.boxX+sign*.37,L.stY,0]);
  }

  // Короткий круглый патрубок +X, соосный арке и входу дымососа.
  cylinder(L.pipeRadius,L.pipeLength,'suction','Короткий всасывающий патрубок',[xFront+L.pipeLength/2,L.fanY,0],'x',true);
  ring(L.pipeRadius+.012,[xFront,L.fanY,0],'suction','x');
  ring(L.pipeRadius+.012,[L.fanX-L.fanDepth/2,L.fanY,0],'suction','x');

  // Условная улитка: плоскость YZ, осевой вход +X, верхний выпуск -Z.
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

  // Открытый прямоугольный участок от верхнего выпуска до дымовой трубы.
  const y1=L.fanY+.30,y2=L.fanY+.60,z1=-.70,z2=L.chimneyZ;
  quad([[fx1,y1,z1],[fx2,y1,z1],[fx2,y1,z2],[fx1,y1,z2]],'exhaust','Нижняя стенка выпускного тракта');
  quad([[fx1,y2,z1],[fx2,y2,z1],[fx2,y2,z2],[fx1,y2,z2]],'exhaust','Верхняя стенка выпускного тракта');
  for(const x of [fx1,fx2])quad([[x,y1,z1],[x,y2,z1],[x,y2,z2],[x,y1,z2]],'exhaust','Боковая стенка выпускного тракта');

  // Вертикальная труба с проёмом под примыкание выпускного короба.
  const ys=[0,y1,y2,L.chimneyHeight],r=L.chimneyRadius;
  for(let j=0;j<ys.length-1;j++)for(let i=0;i<96;i++){
    const a=i*2*Math.PI/96,b=(i+1)*2*Math.PI/96,m=(a+b)/2;
    if(j===1&&Math.cos(m)>0&&Math.abs(r*Math.sin(m))<L.fanDepth/2)continue;
    const p=(t,y)=>[L.chimneyX+r*Math.sin(t),y,L.chimneyZ+r*Math.cos(t)];
    quad([p(a,ys[j]),p(b,ys[j]),p(b,ys[j+1]),p(a,ys[j+1])],'chimney','Оболочка вертикального дымохода');
  }
  ring(r,[L.chimneyX,L.chimneyHeight,L.chimneyZ],'chimney');
  ring(r,[L.chimneyX,.07,L.chimneyZ],'chimney');

  // Стрелки только на запрошенном внешнем участке.
  arrow([-.90,L.bankExit[1],0],[-1,0,0],.38);
  arrow([L.boxX,1.90,0],[0,1,0],.48);
  arrow([L.boxX,2.94,0],[0,1,0],.38);
  arrow([xFront-.03,L.fanY,0],[1,0,0],.38);
  arrow([L.fanX,L.fanDischargeY,-.87],[0,0,-1],.58);
  arrow([L.chimneyX,4.40,L.chimneyZ],[0,1,0],.48);
  for(const entry of quadBuckets.values()){
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(entry.positions,3));
    g.setIndex(entry.indices);g.computeVertexNormals();add(g,entry.c,entry.n,[0,0,0],null,entry.skin);
  }
  return {count:added.length,notes:conceptNotes,group};
}
