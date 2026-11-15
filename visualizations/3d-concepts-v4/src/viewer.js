import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {addGasConcept,conceptNotes} from './gas-concept.js';

// Статическая геометрия и оформление. Сетевые запросы, сигналы и команды отсутствуют.
const $=id=>document.getElementById(id),host=$('canvas-host'),stage=$('stage');
const scene=new THREE.Scene();
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});}catch(error){$('loading').textContent='WebGL недоступен. Схема сверху: previews/plan.png.';throw error;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.localClippingEnabled=true;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);
const pmrem=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment();
scene.environment=pmrem.fromScene(environment,.04).texture;environment.dispose();pmrem.dispose();
const camera=new THREE.OrthographicCamera(-5,5,2.2,-2.2,.02,80);
let frameHeight=5.2,frameWidth=8.5;
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1.2,0);controls.enableDamping=true;controls.minZoom=.4;controls.maxZoom=3;controls.maxPolarAngle=Math.PI*.88;
const hemi=new THREE.HemisphereLight(0xc0e3ff,0x26323e,1.2);scene.add(hemi);
const key=new THREE.DirectionalLight(0xffead4,2.5);key.position.set(1,6,4);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-4;key.shadow.camera.right=4;key.shadow.camera.top=4;key.shadow.camera.bottom=-4;key.shadow.normalBias=.012;scene.add(key);
const rim=new THREE.DirectionalLight(0x8bbcf4,2.5);rim.position.set(-4,2,-3);scene.add(rim);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.23}));floor.rotation.x=-Math.PI/2;floor.position.y=-.012;floor.receiveShadow=true;scene.add(floor);
const grid=new THREE.GridHelper(8,20,0x577083,0x3b5060);grid.material.transparent=true;grid.material.opacity=.12;grid.position.y=-.01;scene.add(grid);
const assembly=new THREE.Group();scene.add(assembly);const meshes=[];
const decode=(s,T)=>{const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return new T(u.buffer);};
function category(i){if(i===2||i===7)return 'shell';if(i>=27&&i<=162)return 'tubes';if(i>=20&&i<=24)return 'baffles';if((i>=3&&i<=6)||(i>=8&&i<=19)||i===185||i===186)return 'water';if(i>=208&&i<=217||i>=222&&i<=233)return 'chamber';if(i>=218&&i<=221)return 'outlet';if(i>=171&&i<=172||i>=187&&i<=207)return 'safety';if(i>=234&&i<=244)return 'detached';if([0,1,25,26].includes(i))return 'plates';return 'frame';}
const originalBounds=new THREE.Box3();
for(const part of window.CAD_PARTS){
 const p=decode(part.p,Float32Array),n=decode(part.n,Float32Array);
 for(let i=0;i<p.length;i+=3){const x=p[i],y=p[i+1],z=p[i+2];p[i]=(z+980)/1000;p[i+1]=(y+575)/1000;p[i+2]=-x/1000;const nx=n[i],nz=n[i+2];n[i]=nz;n[i+2]=-nx;}
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(p,3));geometry.setAttribute('normal',new THREE.BufferAttribute(n,3));geometry.setIndex(new THREE.BufferAttribute(decode(part.ix,Uint32Array),1));geometry.computeBoundingBox();
 const material=new THREE.MeshStandardMaterial({color:0xa6b6c2,metalness:.65,roughness:.3,side:THREE.DoubleSide});
 const mesh=new THREE.Mesh(geometry,material);mesh.userData={id:part.id,name:part.name,category:category(part.id)};mesh.castShadow=true;mesh.receiveShadow=true;assembly.add(mesh);meshes.push(mesh);originalBounds.union(geometry.boundingBox);
}
window.CAD_PARTS=null;
const concept=addGasConcept(assembly,meshes);
assembly.rotation.y=THREE.MathUtils.degToRad(conceptNotes.assemblyYawDegrees);
assembly.updateMatrixWorld(true);
let style=1,selected='all',state='unknown';
const styleTexts={1:['Компоновка с правым поворотом','Вход от ARANGA → ТО → ШТ → направо 90° → дымосос → дымоход']};
const infos={
all:['Компоновка v4','После верхнего выхода и ШТ газоход поворачивает направо на 90° по ходу газа. За поворотом расположены дымосос и вертикальный дымоход. Вход от ARANGA соосен нижнему корпусу и показан с обрывом. Разворот всей сборки на 12° по часовой стрелке сверху — параметр эскиза.'],
inlet:['Вход от печи ARANGA','Условный газоход подходит к нижнему корпусу по его оси. Волнистая линия и пунктир обозначают продолжение в сторону печи, а не заглушку. Печь не моделируется; длина, сечение и форма перехода не определены.'],
shell:['Два корпуса','Геометрия из STEP; Ø820 и длина 2000 мм приняты D-125. Прозрачность и сечение условны. Это не прозрачный материал реального корпуса.'],
tubes:['136 жаровых труб','В STEP 68 труб в каждом корпусе, Ø57 × 3,5 мм. Газы проходят внутри труб; вода — снаружи. Направление газа по ярусам здесь не назначено.'],
baffles:['Пять перегородок','Три перегородки в нижнем корпусе, две в верхнем. Расположение из STEP. Вода проходит межтрубную полость вокруг перегородок; поле скоростей не вычисляется.'],
water:['Водяной тракт','Патрубки и межкорпусная перемычка взяты из STEP. Штатный путь: вход нижнего корпуса → перемычка → верхний корпус → подача. Цвет обозначает тракт, не температуру.'],
chamber:['Камера переворота','Стенки, дверь и экраны присутствуют в STEP. Прозрачность и удаление части оболочки — графические приёмы. Направление газов по ярусам требует отдельной проверки.'],
outlet:['Боковой выход с коробом','Выход верхнего корпуса через ШТ сохранён по v3. Далее расположен правый поворот на 90° в плане. Четыре сетки исходного канала CAD временно скрыты. Новый выход — условная геометрия.'],
safety:['Клапан из STEP','В дереве сборки: «1-Клапан 17с28нж в сборе». Это геометрический объект CAD. Фактическая установка, исполнение и настройка не проверены; состояние не моделируется.'],
pumps:['Насосная группа · схема','Две параллельные ветви. По потоку: кран → фильтр → насос → затвор → кран (D-124). ROMMER FORCE65-140F380V подтверждён фото одного насоса; одинаковость второго — данными пользователя. Форму и координаты не придумываем.'],
fan:['Дымосос · условная модель','Наличие дымососа и его место после ШОД подтверждены. Д3,5 указан в документации. Колесо, корпус, патрубки, размеры и ориентация — эскиз, не CAD конкретного изделия. Вращение и состояние не имитируются.'],
motor:['Прямой привод · условно','По D-284 колесо непосредственно на валу двигателя АИР. Здесь форма, длина, клеммная коробка и положение двигателя условны.'],
damper:['ШД (ШТ по проекту)','Расположен в прямоугольном выходном корпусе верхнего ТО по вашему указанию. Геометрия пластины и привода, тип движения и показанное положение условны. В документации применяется обозначение ШТ.'],
shod:['ШОД · врезка наружного воздуха','Врезка находится за правым поворотом, перед дымососом. ШОД обозначает подсос наружного воздуха. Сторона врезки, сечение, привод и положение пластины условны.'],
duct:['Поворот направо 90°','После ШТ тракт поворачивает направо относительно движения газа из верхнего корпуса. Угол в плане — 90°; проверить расположение можно кнопкой «Сверху · 90°». Далее — небольшое снижение и дымосос. Радиус и длины условны.'],
chimney:['Вертикальный дымоход ТО','После дымососа тракт подключён к отдельному вертикальному дымоходу по вашему описанию. Высота, диаметр, отметка врезки и опоры не определены. Дымоход байпаса здесь не объединён с ним.'],
gasflow:['Направление газа','Статичные стрелки показывают только внешний маршрут из вашего сообщения. Это не движение частиц, не расход и не работа оборудования. Направление внутри ярусов ТО не назначено.'],
airflow:['Подсос наружного воздуха','Стрелка показывает поступление воздуха через ШОД в газоход перед дымососом. Расход и положение заслонки не задаются.'],
detached:['Вынесенная группа STEP','Группа «Крепление трубы» сохранена в исходных координатах. В файле она отделена от основного узла. Назначение разрыва и связь не подтверждены.'],
plates:['Трубные доски','Четыре трубные доски из STEP. Доски отделяют водяную межтрубную полость от газовых торцов.'],
frame:['Опоры и крепления','Геометрия опор, усилителей и площадок из STEP. Цвет и фактура условны; соответствие монтажу не проверено.']};
const stateText={unknown:'? Нет данных',normal:'✓ Норма · ДЕМО',warn:'△ Внимание · ДЕМО',alarm:'! Авария · ДЕМО'};
const stateColor={unknown:0x82c6dc,normal:0x7bd1a0,warn:0xffcb6b,alarm:0xff6377};
const cutPlane=new THREE.Plane(new THREE.Vector3(0,0,-1),-.02);
function apply(){
 concept.group.visible=$('show-concept').checked;
 for(const mesh of meshes){const c=mesh.userData.category,m=mesh.material;mesh.visible=(c!=='detached'||$('detached').checked)&&(mesh.userData.origin!=='concept'||$('show-concept').checked)&&!(c==='outlet'&&mesh.userData.origin!=='concept'&&$('show-concept').checked);m.transparent=false;m.opacity=1;m.depthWrite=true;m.clippingPlanes=[];m.emissive.set(0);m.emissiveIntensity=0;m.metalness=style===3?.8:.4;m.roughness=style===3?.31:.4;
  const colors={shell:0xa3bacb,tubes:0xd5a16e,baffles:0x8fc8d2,water:0x5cc7db,chamber:0x879aa9,outlet:0xa7a6a4,safety:0xacb5bf,frame:0x485e71,plates:0xb4c4cf,detached:0x858e98};
  m.color.setHex(colors[c]||0xa6b6c2);
  if(style===3){if(['shell','chamber','outlet','plates','baffles'].includes(c))m.color.setHex(0x697d8d);if(c==='tubes')m.color.setHex(0xa6a7a5);if(c==='water')m.color.setHex(0x43839b);}
  if(style===1&&['shell','chamber','outlet'].includes(c)){m.transparent=true;m.opacity=c==='shell'?.22:.12;m.depthWrite=false;m.metalness=.05;m.roughness=.18;mesh.castShadow=false;mesh.renderOrder=2;}else{mesh.castShadow=true;mesh.renderOrder=0;}
  if(style===2&&['shell','chamber','outlet'].includes(c))m.clippingPlanes=[cutPlane];
  if(mesh.userData.origin==='concept'){
   m.color.setHex(({inlet:0xdab793,damper:0xe6ab63,duct:0xdab793,fan:0xc69b72,motor:0x5f7387,shod:0xbca9e3,chimney:0xb9a799,gasflow:0xffb34f,airflow:0xb8a0ee})[c]||0xcaa478);
   m.metalness=.25;m.roughness=.38;
   if(mesh.userData.skin){m.transparent=true;m.opacity=c==='fan'?.23:.34;m.depthWrite=false;mesh.renderOrder=2;mesh.castShadow=false;}else{mesh.renderOrder=0;mesh.castShadow=true;}
   if(['gasflow','airflow'].includes(c)){m.emissive.copy(m.color);m.emissiveIntensity=.3;}
  }
  const picked=selected===c || selected==='shell'&&c==='plates';
  if(picked){m.emissive.setHex(stateColor[state]);m.emissiveIntensity=state==='unknown'?.2:.45;if(m.transparent)m.opacity=.3;}
  else if(style===3&&selected==='all'&&c==='water'){m.emissive.setHex(0x469eb4);m.emissiveIntensity=.18;}
  m.needsUpdate=true;
 }
 const info=selected==='outlet'&&!$('show-concept').checked?['Исходный выход вверх · CAD','Показаны исходные сетки STEP 218–221. Новая компоновка выключена.']:(infos[selected]||infos.all);$('part-title').textContent=info[0];$('part-info').textContent=info[1];$('source-tag').textContent=selected==='pumps'?'СОСТАВ ИЗ ДОКУМЕНТОВ · БЕЗ 3D':['inlet','damper','outlet','duct','fan','motor','shod','chimney','gasflow','airflow'].includes(selected)?'НОВАЯ ГЕОМЕТРИЯ · УСЛОВНО':selected==='all'?'ТО: CAD · ОБВЯЗКА: ЭСКИЗ':'ГЕОМЕТРИЯ ИЗ CAD';
 if(selected==='outlet'&&!$('show-concept').checked)$('source-tag').textContent='ГЕОМЕТРИЯ ИЗ CAD';
 $('state-readout').textContent=stateText[state];$('state-readout').style.color='#'+stateColor[state].toString(16).padStart(6,'0');
 $('style-title').textContent=styleTexts[style][0];$('style-subtitle').textContent=styleTexts[style][1];
 document.querySelectorAll('[data-style]').forEach(b=>{const active=+b.dataset.style===style;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});
 document.querySelectorAll('[data-pick]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pick===selected));
}
function select(c,name='') {selected=c;if([...$('component').options].some(o=>o.value===c))$('component').value=c;else $('component').value='all';$('picked').textContent=name?(meshes.some(m=>m.userData.name===name&&m.userData.origin==='concept')?'Эскиз: ':'Деталь STEP: ')+name:'';apply();}
function view(name){frameHeight=5.7;frameWidth=8.6;camera.zoom=1;controls.target.set(-1.7,1.25,-1.05);if(name==='top'){controls.target.set(-1.7,0,-1.05);camera.position.set(-1.7,14,-1.049);}else if(name==='side')camera.position.set(-1.7,2.4,12);else if(name==='back')camera.position.set(-5,5,-10);else if(name==='core'){frameHeight=3.6;frameWidth=4.5;controls.target.set(0,1.25,0);camera.position.set(3.8,2.9,5.6);}else camera.position.set(2.7,6.8,11);controls.update();resize();}
view('iso');
const anchors=[
{text:'Теплообменник',sub:'Корпуса и внутренности: CAD',p:[.5,1.7,.4],offset:[95,45],cls:'',category:'shell'},
{text:'ШД (ШТ)',sub:'В выходном коробе',p:[-1.72,1.675,.25],offset:[70,50],cls:'gas',category:'damper'},
{text:'ШОД · подсос воздуха',sub:'Перед дымососом',p:[-2.45,1.25,-1.85],offset:[60,-100],cls:'air',category:'shod'},
{text:'Дымосос',sub:'За правым поворотом',p:[-3.03,1.25,-2.4],offset:[-110,-125],cls:'gas',category:'fan'},
{text:'Вертикальный дымоход',sub:'Отдельный тракт ТО',p:[-4.8,2.6,-2.4],offset:[-180,-25],cls:'gas',category:'chimney'},
{text:'Направо 90°',sub:'По ходу выходящего газа',p:[-2.83,1.675,-.20],offset:[-180,15],cls:'gas',category:'duct'},
{text:'От печи ARANGA',sub:'Обрыв входящего тракта',p:[-4.15,.575,0],offset:[-95,80],cls:'gas',category:'inlet'}
];
const labels=anchors.map(a=>{const el=document.createElement('div');el.className='label '+a.cls;el.innerHTML=a.text+'<small>'+a.sub+'</small>';$('labels').appendChild(el);const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('stroke','#7e9baa');line.setAttribute('stroke-width','1');line.setAttribute('opacity','.7');$('leaders').appendChild(line);return {...a,el,line,p:new THREE.Vector3(...a.p)};});
function updateLabels(){const w=stage.clientWidth,h=stage.clientHeight;for(const [index,a] of labels.entries()){const v=a.p.clone().applyMatrix4(assembly.matrixWorld).project(camera),px=(v.x+1)*w/2,py=(1-v.y)*h/2;let x=Math.max(14,Math.min(w-a.el.offsetWidth-14,px+a.offset[0])),y=Math.max(100,Math.min(h-120,py+a.offset[1]));if(w<750){x=index%2===0?14:w-a.el.offsetWidth-14;y=115+68*Math.floor(index/2);}const show=a.category==='shell'||$('show-concept').checked;a.el.hidden=!show;a.line.style.display=show?'':'none';a.el.style.left=x+'px';a.el.style.top=y+'px';a.line.setAttribute('x1',px);a.line.setAttribute('y1',py);a.line.setAttribute('x2',x+(a.offset[0]<0?a.el.offsetWidth:0));a.line.setAttribute('y2',y+15);}}
function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const aspect=w/h,span=Math.max(frameHeight,frameWidth/aspect);camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(host);resize();
document.querySelectorAll('[data-style]').forEach(b=>b.onclick=()=>{style=+b.dataset.style;apply()});
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));
document.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>select(b.dataset.pick));
$('component').onchange=()=>select($('component').value);$('demo-state').onchange=()=>{state=$('demo-state').value;apply()};$('detached').onchange=()=>{if($('detached').checked){controls.target.y=1.6;camera.position.multiplyScalar(1.2);}else view('iso');apply()};$('show-labels').onchange=()=>{$('labels').hidden=!$('show-labels').checked;$('leaders').style.display=$('show-labels').checked?'':'none';};
$('show-concept').onchange=()=>apply();
const raycaster=new THREE.Raycaster();let down=null;
renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const r=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),camera);const hits=raycaster.intersectObjects(meshes.filter(m=>m.visible));const hit=hits.find(h=>h.object.material.clippingPlanes.every(p=>p.distanceToPoint(h.point)>=0));if(hit)select(hit.object.userData.category,hit.object.userData.name);});
apply();$('loading').hidden=true;
function animate(){controls.update();updateLabels();renderer.render(scene,camera);}renderer.setAnimationLoop(animate);
// Только для воспроизводимой визуальной проверки; не интерфейс управления установкой.
window.preview={select,view,getInfo(){scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);const base=concept.chimney.localToWorld(new THREE.Vector3(0,-1.575,0)),top=concept.chimney.localToWorld(new THREE.Vector3(0,1.575,0)),axis=top.clone().sub(base).normalize(),p1=base.clone().project(camera),p2=top.clone().project(camera);return{style,selected,state,cameraType:camera.type,assemblyYawDegrees:conceptNotes.assemblyYawDegrees,cadMeshes:247,conceptMeshes:concept.count,conceptVisible:$('show-concept').checked,sourceOutletVisible:meshes.filter(m=>m.userData.origin!=='concept'&&m.userData.category==='outlet'&&m.visible).length,notes:concept.notes,visible:meshes.filter(m=>m.visible).length,chimneyWorldAxis:axis.toArray(),chimneyScreenDeltaX:(p2.x-p1.x)*stage.clientWidth/2,camera:camera.position.toArray(),boundsCAD:{min:originalBounds.min.toArray(),max:originalBounds.max.toArray()}}}};
