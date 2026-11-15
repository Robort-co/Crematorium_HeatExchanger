import * as THREE from 'three';

// Только эскизная геометрия. Все числа ниже — параметры рисунка в метрах,
// а не размеры установки. Последовательность узлов задана пользователем.
export const conceptNotes={
  revision:'v2',style:'01 — полупрозрачный, выбран пользователем',
  confirmed:'ШД в прямоугольном выходном корпусе верхнего ТО; затем горизонтальный тракт, ШОД перед дымососом, далее вертикальный дымоход.',
  assumptions:'Поворот в сторону +Z модели, форма дымососа, сечения, длины, высоты, положение приводов и заслонок условны. Опоры не проектировались.',
  terminology:'ШД пользователя соответствует ШТ в docs/02_Технологическая_схема.md.',
  outletCAD:{x:-1.19,y:2.175,z:0},
  fanCenter:{x:-1.19,y:2.78,z:1.83},chimneyCenter:{x:-3.05,z:1.83},
  internalGasDirection:'Не назначено; стрелки только на новой внешней обвязке.'
};

export function addGasConcept(assembly,meshes){
 const added=[];
 function add(g,category,name,pos=[0,0,0],rotation=null,skin=false){
  const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({side:THREE.DoubleSide}));m.position.set(...pos);if(rotation)m.rotation.set(...rotation);
  m.userData={category,name,id:'concept-'+added.length,origin:'concept',skin};m.castShadow=!skin;m.receiveShadow=true;assembly.add(m);meshes.push(m);added.push(m);return m;
 }
 const box=(size,c,n,p,r,skin=false)=>add(new THREE.BoxGeometry(...size),c,n,p,r,skin);
 function cylinder(radius,length,c,n,p,axis='y',skin=false,open=true){return add(new THREE.CylinderGeometry(radius,radius,length,48,1,open),c,n,p,axis==='x'?[0,0,Math.PI/2]:axis==='z'?[Math.PI/2,0,0]:null,skin)}
 function pipe(points,radius,c,n){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal');return add(new THREE.TubeGeometry(curve,80,radius,40,false),c,n,[0,0,0],null,true)}
 function ring(radius,at,c,axis='y'){const m=add(new THREE.TorusGeometry(radius,.017,8,48),c,'Условный фланец',at);if(axis==='y')m.rotation.x=Math.PI/2;if(axis==='x')m.rotation.y=Math.PI/2;return m;}
 function arrow(at,dir,length,c){const d=new THREE.Vector3(...dir).normalize(),p=new THREE.Vector3(...at);const body=cylinder(.012,length-.12,c,'Направление потока — по описанию',p.clone().addScaledVector(d,(length-.12)/2).toArray(),'y',false,false);body.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);const head=add(new THREE.ConeGeometry(.05,.12,16),c,'Стрелка внешнего потока',p.clone().addScaledVector(d,length-.06).toArray());head.quaternion.copy(body.quaternion);}
 // ШД в существующем прямоугольном выходном канале CAD. Положение пластины — условное.
 box([.34,.014,.72],'damper','ШД / ШТ: условная пластина',[-1.19,2.08,0],[0,0,.65]);
 cylinder(.018,.91,'damper','Условная ось шибера',[-1.19,2.08,0],'z',false,false);
 box([.20,.13,.14],'damper','Условное изображение привода',[-1.19,2.08,.51]);
 // Переход с прямоугольного CAD-отверстия на круглое сечение. Нижний край совпадает с CAD.
 const p=[],ix=[];for(let j=0;j<2;j++)for(let i=0;i<=64;i++){const a=2*Math.PI*i/64,co=Math.cos(a),si=Math.sin(a),rr=j?.24:Math.min(.2/(Math.abs(co)||1e-8),.414/(Math.abs(si)||1e-8));p.push(-1.19+rr*co,j?2.43:2.175,rr*si);}
 for(let i=0;i<64;i++){const a=i,b=i+1,c=i+65,d=i+66;ix.push(a,c,b,b,c,d);}const loft=new THREE.BufferGeometry();loft.setAttribute('position',new THREE.Float32BufferAttribute(p,3));loft.setIndex(ix);loft.computeVertexNormals();add(loft,'duct','Условный переход прямоугольник → круг',[0,0,0],null,true);
 // Подъём поворачивает на 90 градусов и продолжается строго горизонтально по +Z.
 const path=[];for(let i=0;i<=20;i++){const a=Math.PI*.5*i/20;path.push([-1.19,2.43+.35*Math.sin(a),.35-.35*Math.cos(a)]);}path.push([-1.19,2.78,1.0],[-1.19,2.78,1.63]);
 pipe(path,.24,'duct','Газоход: условный поворот и горизонтальный участок');ring(.25,[-1.19,2.43,0],'duct');ring(.25,[-1.19,2.78,1.60],'duct','z');
 // Воздух через ШОД поступает по боковой врезке именно ДО дымососа.
 cylinder(.13,.78,'shod','Врезка наружного воздуха перед дымососом',[-.80,2.78,.9],'x',true);
 ring(.14,[-.41,2.78,.9],'shod','x');
 const blade=add(new THREE.CircleGeometry(.119,40),'shod','Пластина ШОД — условное положение',[-.69,2.78,.9]);blade.rotation.y=Math.PI/2+.6;
 cylinder(.013,.34,'shod','Условная ось ШОД',[-.69,2.78,.9],'y',false,false);
 box([.13,.12,.11],'shod','Условный привод ШОД',[-.69,3.01,.9]);
 arrow([.10,2.78,.9],[-1,0,0],.42,'airflow');
 // Условный центробежный дымосос: осевой вход, радиальный выход, прямой привод.
 cylinder(.45,.40,'fan','Условный корпус дымососа Д3,5',[-1.19,2.78,1.83],'z',true);
 add(new THREE.RingGeometry(.24,.45,48),'fan','Условный вход дымососа',[-1.19,2.78,1.63],null,true);
 ring(.45,[-1.19,2.78,1.63],'fan','z');ring(.45,[-1.19,2.78,2.03],'fan','z');
 const plate=add(new THREE.CircleGeometry(.45,48),'fan','Условная задняя стенка дымососа',[-1.19,2.78,2.03],null,true);
 cylinder(.095,.27,'fan','Ступица условного колеса',[-1.19,2.78,1.84],'z',false,false);
 for(let i=0;i<16;i++){const a=2*Math.PI*i/16;box([.20,.026,.23],'fan','Условная лопатка рабочего колеса',[-1.19+.265*Math.cos(a),2.78+.265*Math.sin(a),1.83],[0,0,a+.27]);}
 cylinder(.17,.43,'motor','Условный двигатель АИР, прямой привод',[-1.19,2.78,2.31],'z',false,false);
 for(let i=0;i<7;i++)ring(.18,[-1.19,2.78,2.14+i*.05],'motor','z');
 box([.17,.12,.19],'motor','Условная клеммная коробка',[-1.19,3.00,2.3]);
 // Тангенциальный горизонтальный выход в отдельный вертикальный дымоход ТО.
 box([.40,.30,.34],'fan','Условный выход дымососа',[-1.52,3.09,1.83],null,true);
 box([1.10,.30,.34],'duct','Условный участок после дымососа',[-2.21,3.09,1.83],null,true);
 cylinder(.29,4.25,'chimney','Вертикальный дымоход ТО — условный габарит',[-3.05,2.125,1.83],'y',true);
 ring(.29,[-3.05,4.25,1.83],'chimney');ring(.29,[-3.05,.07,1.83],'chimney');
 arrow([-2.0,3.09,1.83],[-1,0,0],.53,'gasflow');
 arrow([-3.05,3.45,1.83],[0,1,0],.53,'gasflow');
 arrow([-1.19,2.78,.47],[0,0,1],.43,'gasflow');
 return {count:added.length,notes:conceptNotes};
}
