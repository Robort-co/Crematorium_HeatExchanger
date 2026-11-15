import * as THREE from 'three';

// Параметры художественного эскиза в метрах; не габариты оборудования.
export const conceptNotes={
 revision:'v3',style:'01 — полупрозрачный',
 confirmed:'По новому указанию: из верхнего корпуса влево через короб с ШТ, затем немного вниз к дымососу и далее в вертикальный дымоход. ШОД остаётся перед дымососом.',
 assumptions:'Новый выход заменяет показ исходного выходного канала CAD (сетки 218–221). Сечения, длины, снижение, форма дымососа и высота дымохода условны.',
 terminology:'ШД пользователя / ШТ по проекту.',
 outlet:{x:-.99,y:1.675,z:0},fanCenter:{x:-3.4,y:1.25,z:.50},chimneyCenter:{x:-5.15,z:.50},
 chimneyHeight:3.15,chimneyAxis:[0,1,0],originalCADOutletHiddenWhenConceptVisible:[218,219,220,221],
 internalGasDirection:'Не назначено. Стрелки только во внешнем тракте.'
};

export function addGasConcept(assembly,meshes){
 const added=[];
 function add(g,category,name,pos=[0,0,0],rotation=null,skin=false){const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({side:THREE.DoubleSide}));m.position.set(...pos);if(rotation)m.rotation.set(...rotation);m.userData={category,name,id:'concept-'+added.length,origin:'concept',skin};m.castShadow=!skin;m.receiveShadow=true;assembly.add(m);meshes.push(m);added.push(m);return m;}
 const box=(s,c,n,p,r,skin=false)=>add(new THREE.BoxGeometry(...s),c,n,p,r,skin);
 function cylinder(radius,length,c,n,p,axis='y',skin=false,open=true){return add(new THREE.CylinderGeometry(radius,radius,length,48,1,open),c,n,p,axis==='x'?[0,0,Math.PI/2]:axis==='z'?[Math.PI/2,0,0]:null,skin)}
 function pipe(points,r,c,n){return add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)),false,'centripetal'),90,r,40,false),c,n,[0,0,0],null,true)}
 function ring(r,at,c,axis='y'){const m=add(new THREE.TorusGeometry(r,.017,8,48),c,'Условный фланец',at);if(axis==='y')m.rotation.x=Math.PI/2;if(axis==='x')m.rotation.y=Math.PI/2;return m;}
 function arrow(at,dir,len,c){const d=new THREE.Vector3(...dir).normalize(),p=new THREE.Vector3(...at);const body=cylinder(.012,len-.12,c,'Направление внешнего потока',p.clone().addScaledVector(d,(len-.12)/2).toArray(),'y',false,false);body.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);const head=add(new THREE.ConeGeometry(.05,.12,16),c,'Статичная стрелка',p.clone().addScaledVector(d,len-.06).toArray());head.quaternion.copy(body.quaternion);}
 function loftX(x1,x2,y,half1,half2,round2=false){const pos=[],ix=[];for(let j=0;j<2;j++)for(let i=0;i<=64;i++){const a=2*Math.PI*i/64,co=Math.cos(a),si=Math.sin(a),h=j?half2:half1,r=j&&round2?h:Math.min(h/(Math.abs(co)||1e-8),h/(Math.abs(si)||1e-8));pos.push(j?x2:x1,y+r*co,r*si);}for(let i=0;i<64;i++){ix.push(i,i+65,i+1,i+1,i+65,i+66);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(ix);g.computeVertexNormals();return add(g,'outlet','Новый боковой переход — условная геометрия',[0,0,0],null,true);}
 // В этой версии исходный выход вверх скрыт. Корпуса и трубные доски не меняются.
 loftX(-.99,-1.48,1.675,.415,.30);
 loftX(-1.48,-1.96,1.675,.30,.30);
 loftX(-1.96,-2.20,1.675,.30,.23,true);
 // Шибер стоит в прямоугольной части; угол пластины не означает состояние.
 box([.014,.54,.54],'damper','ШТ: условная пластина',[-1.72,1.675,0],[0,0,.5]);
 cylinder(.018,.76,'damper','Условная ось ШТ',[-1.72,1.675,0],'z',false,false);
 box([.19,.14,.14],'damper','Условный привод ШТ',[-1.72,1.675,.43]);
 ring(.24,[-2.20,1.675,0],'duct','x');
 // Небольшое снижение и короткий разворот к осевому входу дымососа.
 pipe([[-2.20,1.675,0],[-2.40,1.65,0],[-2.68,1.32,0],[-2.93,1.25,0],[-3.18,1.25,0],[-3.35,1.25,.10],[-3.40,1.25,.30]],.23,'duct','Газоход влево с небольшим снижением');
 ring(.24,[-3.40,1.25,.30],'duct','z');
 // Боковая врезка наружного воздуха на горизонтальном участке перед дымососом.
 cylinder(.12,.58,'shod','Подсос наружного воздуха через ШОД',[-2.96,1.25,.29],'z',true);
 ring(.13,[-2.96,1.25,.58],'shod','z');
 const shod=add(new THREE.CircleGeometry(.112,40),'shod','ШОД: условная пластина',[-2.96,1.25,.40]);shod.rotation.y=.6;
 cylinder(.012,.32,'shod','Условная ось ШОД',[-2.96,1.25,.40],'y',false,false);
 box([.12,.11,.10],'shod','Условный привод ШОД',[-2.96,1.46,.40]);
 arrow([-2.96,1.25,.99],[0,0,-1],.32,'airflow');
 // Форма и размер дымососа сохранены относительно v2; изменено размещение.
 const fx=-3.40,fy=1.25,fz=.50;
 cylinder(.45,.40,'fan','Условный корпус дымососа Д3,5',[fx,fy,fz],'z',true);
 add(new THREE.RingGeometry(.24,.45,48),'fan','Условный вход дымососа',[fx,fy,fz-.20],null,true);
 ring(.45,[fx,fy,fz-.20],'fan','z');ring(.45,[fx,fy,fz+.20],'fan','z');
 add(new THREE.CircleGeometry(.45,48),'fan','Условная задняя стенка дымососа',[fx,fy,fz+.20],null,true);
 cylinder(.095,.27,'fan','Ступица условного колеса',[fx,fy,fz+.01],'z',false,false);
 for(let i=0;i<16;i++){const a=2*Math.PI*i/16;box([.20,.026,.23],'fan','Условная лопатка',[fx+.265*Math.cos(a),fy+.265*Math.sin(a),fz],[0,0,a+.27]);}
 cylinder(.17,.43,'motor','Условный двигатель АИР, прямой привод',[fx,fy,fz+.48],'z',false,false);
 for(let i=0;i<7;i++)ring(.18,[fx,fy,fz+.31+i*.05],'motor','z');
 box([.17,.12,.19],'motor','Условная клеммная коробка',[fx,fy+.22,fz+.47]);
 // Горизонтальный тангенциальный выход; дымоход строго по мировой оси Y.
 box([.40,.30,.34],'fan','Условный выход дымососа',[fx-.33,fy+.31,fz],null,true);
 box([1.00,.30,.34],'duct','Условный участок после дымососа',[-4.36,1.56,.50],null,true);
 const chimney=cylinder(.29,3.15,'chimney','Вертикальный дымоход ТО',[-5.15,1.575,.50],'y',true);
 ring(.29,[-5.15,3.15,.50],'chimney');ring(.29,[-5.15,.07,.50],'chimney');
 arrow([-2.26,1.62,0],[-.7,-.6,0],.38,'gasflow');
 arrow([-4.12,1.56,.50],[-1,0,0],.49,'gasflow');
 arrow([-5.15,2.25,.50],[0,1,0],.50,'gasflow');
 return {count:added.length,notes:conceptNotes,chimney};
}
