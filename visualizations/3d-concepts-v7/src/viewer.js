import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {createAssembly,applyAppearance,stateColors} from './assembly.js';
import {layout} from './gas-concept.js';
import {pumpCategories,pumpLayout} from './pump-group.js';

const $=id=>document.getElementById(id),host=$('canvas-host'),stage=$('stage');
const scene=new THREE.Scene();
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});}
catch(error){$('loading').textContent='WebGL недоступен. Статичные изображения находятся в previews.';throw error;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
const pmrem=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment();
scene.environment=pmrem.fromScene(environment,.04).texture;environment.dispose();pmrem.dispose();
const camera=new THREE.OrthographicCamera(-4,4,3.2,-3.2,.02,80);
let frameHeight=7.0,frameWidth=7.0,selected='all',state='unknown',currentView='iso';
const controls=new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;controls.minZoom=.4;controls.maxZoom=3;controls.maxPolarAngle=Math.PI*.88;
scene.add(new THREE.HemisphereLight(0xc0e3ff,0x26323e,1.2));
const key=new THREE.DirectionalLight(0xffead4,2.5);key.position.set(1,7,4);key.castShadow=true;
key.shadow.mapSize.set(2048,2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:6,bottom:-3});key.shadow.normalBias=.012;scene.add(key);
const rim=new THREE.DirectionalLight(0x8bbcf4,2.5);rim.position.set(-4,3,-3);scene.add(rim);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.23}));
floor.rotation.x=-Math.PI/2;floor.position.y=-.012;floor.receiveShadow=true;scene.add(floor);
const grid=new THREE.GridHelper(8,20,0x577083,0x3b5060);grid.material.transparent=true;grid.material.opacity=.12;grid.position.y=-.01;scene.add(grid);
const model=createAssembly(window.CAD_PARTS);window.CAD_PARTS=null;scene.add(model.assembly);
const infos={
 all:['Компоновка · v7 на основе v6','Два наклонных полукруглых торца газового короба по образцу исходного STEP. На перенесённой обратке изображены две параллельные насосные ветви по утверждённой гидравлике.'],
 bevel_lower:['Скос перед ШТ','Задний полукруглый торец снизу наклонён внутрь. Принцип и наклон взяты с детали STEP «Выходной канал торец полукруглый». Это плоская грань, сопряжённая с круглой оболочкой.'],
 bevel_upper:['Скос после ШТ','Задний полукруглый торец арочной верхушки наклонён внутрь по тому же образцу STEP. Круглый проём и ось всасывающей трубы сохранены.'],
 shell:['Два корпуса','Корпуса, их положение и внутренние детали сохранены из STEP v2. Прозрачность — графический приём.'],
 tubes:['136 жаровых труб','Трубный пучок сохранён из STEP. Внутренние газовые стрелки не добавлялись.'],
 baffles:['Перегородки','Расположение перегородок сохранено из STEP. Поле скоростей воды не вычисляется.'],
 water:['Водяные патрубки и перемычка','Сборка обратки перенесена на противоположный свободный фланец между банками. На прежнем подключении — глухая крышка. Остальные водяные детали сохранены.'],
 water_return:['Обратка с насосной группой','Положение фланцев и отвода сохранено из v6. Вместо прямого вертикального участка показаны две параллельные насосные ветви между теми же точками подключения.'],
 water_cap:['Прежнее подключение заглушено','К старому фланцу добавлена сплошная глухая крышка. Толщина и исполнение крышки условны.'],
 chamber:['Камера переворота','Камера и её детали сохранены из STEP.'],
 outlet:['Закруглённый низ выходного короба','Нижняя часть повторяет радиус верхней банки и продолжает её по оси. Газ поворачивает вверх в квадратный короб. Четыре детали исходного канала скрыты при включённой новой обвязке.'],
 damper:['ШТ после сужения','Шибер расположен в уменьшенном квадратном сечении, на согласованной высоте. Положение пластины и форма привода условны.'],
 duct:['Квадратный короб с сужением','Обе стороны сечения сужаются одинаково. Высота от оси верхнего выхода до арочной верхушки — примерно высота всего двухъярусного ТО. Численные размеры — параметры рисунка.'],
 arch:['Арка с наклонным задним торцом','Общий центр арочной верхушки и круглого отверстия сохранён из v6. Задний полукруглый торец выполнен наклонной плоской гранью по образцу STEP.'],
 suction:['Продлённый круглый тракт','Ось направлена поперёк банок, в сторону прежнего выпуска дымососа v5. Длина примерно равна прежнему участку от дымососа к дымоходу. На конце — соосный вход дымососа.'],
 fan:['Дымосос в конце круглого тракта','Условная улитка с осевым входом от короба и вертикальным выпуском вверх. Форма сохранена из v5 и повёрнута. Это не CAD конкретного дымососа.'],
 motor:['Прямой привод','Условное изображение двигателя на оси колеса. Размеры и форма двигателя не подтверждены.'],
 exhaust:['Выпуск вверх и переход','Прямоугольный выпуск улитки направлен вертикально вверх. Далее расположен переход из прямоугольного сечения в круглую дымовую трубу.'],
 chimney:['Дымовая труба над дымососом','Труба продолжает выпуск вверх после перехода. Диаметр условно уменьшен относительно v5; расчёт сечения и креплений не выполнялся.'],
 gasflow:['Внешний маршрут газа','Статичные стрелки поясняют согласованное направление. Это не измеренный расход и не состояние установки.'],
 safety:['Клапан из CAD','Исходная геометрия сохранена. Фактическая установка и настройка этим макетом не подтверждаются.'],
 pumps:['Две параллельные насосные ветви','По утверждённой гидравлике: ручной кран → фильтр → насос → электрозатвор → ручной кран в каждой ветви. Насосы одинаковые, рабочий/резервный. Изображение условное; текущее состояние неизвестно.'],
 pump_filters:['Фильтры Ф1 / Ф2','В каждой ветви фильтр расположен перед насосом по штатному потоку воды сверху вниз. Форма и размеры условны.'],
 pump_valves:['Электрозатворы З1 / З2','Затворы после насосов по потоку к теплообменнику. Приводы показаны условно, фактическое положение не отображается.'],
 pump_manual:['Ручные краны','По два ручных крана в каждой ветви: перед фильтром и после электрозатвора. Положение рукояток условно.'],
 pump_pipes:['Трубопроводы группы','Общий верхний вход делится на две параллельные ветви и объединяется перед отводом в ТО. Прямого обхода насосов нет. Компоновочные расстояния условны.'],
 detached:['Вынесенная группа STEP','Прежняя группа «Крепление трубы» сохранена в исходном положении.'],
 plates:['Трубные доски','Исходная геометрия STEP сохранена.'],
 frame:['Опоры и крепления','Геометрия исходного STEP; опоры добавленной обвязки не проектировались.']
};
const stateTexts={unknown:'? Нет данных',normal:'✓ Норма · ДЕМО',warn:'△ Внимание · ДЕМО',alarm:'! Авария · ДЕМО'};
const conceptCategories=['outlet','damper','duct','arch','suction','fan','motor','exhaust','chimney','gasflow','bevel_lower','bevel_upper',...pumpCategories];
function apply(){
 applyAppearance(model,{showConcept:$('show-concept').checked,showDetached:$('detached').checked,selected,state});
 if(!$('show-fan').checked)for(const m of model.meshes)if(['fan','motor'].includes(m.userData.category))m.visible=false;
 if(['water','pumps'].includes(currentView))for(const m of model.meshes){
   if(m.userData.category==='shell')m.material.opacity=.055;
   else if(!['water','water_return','water_cap',...pumpCategories].includes(m.userData.category))m.visible=false;
 }
 if(currentView==='bevels')for(const m of model.meshes){
   if(m.userData.category==='shell')m.material.opacity=.055;
   else if(!['outlet','duct','arch','damper','bevel_lower','bevel_upper'].includes(m.userData.category))m.visible=false;
 }
 const originalOutlet=selected==='outlet'&&!$('show-concept').checked;
 const originalWater=!$('show-concept').checked&&['water','water_return','water_cap'].includes(selected);
 const info=originalOutlet?['Исходный канал v2 · CAD','Показаны исходные детали STEP 218–221. Новая обвязка выключена.']:originalWater?['Исходная водяная сборка · CAD','Показано исходное положение обратки. Перенос и крышка выключены.']:(infos[selected]||infos.all);
 $('part-title').textContent=info[0];$('part-info').textContent=info[1];
 $('source-tag').textContent=originalOutlet||originalWater?'ГЕОМЕТРИЯ ИЗ CAD':pumpCategories.includes(selected)?'СХЕМА УТВЕРЖДЕНА · ФОРМА УСЛОВНА':conceptCategories.includes(selected)||selected==='water_cap'?'НОВАЯ ГЕОМЕТРИЯ · УСЛОВНО':['water','water_return'].includes(selected)?'CAD · ОБРАТКА ПЕРЕНЕСЕНА':selected==='all'?'ТО: CAD · ОБВЯЗКА: ЭСКИЗ':'ГЕОМЕТРИЯ ИЗ CAD';
 $('state-readout').textContent=stateTexts[state];$('state-readout').style.color='#'+stateColors[state].toString(16).padStart(6,'0');
 document.querySelectorAll('[data-pick]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pick===selected));
}
function select(c,name=''){
 selected=c;$('component').value=[...$('component').options].some(o=>o.value===c)?c:'all';$('picked').textContent=name;apply();
}
function resize(){
 const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;
 renderer.setSize(w,h,false);const aspect=w/h,span=Math.max(frameHeight,frameWidth/aspect);
 camera.left=-span*aspect/2;camera.right=span*aspect/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();
}
function view(name){
 currentView=name;frameHeight=7.0;frameWidth=7.0;camera.zoom=1;controls.target.set(-.45,2.70,-.65);
 if(name==='iso')$('show-fan').checked=true;
 if(name==='side')camera.position.set(-.45,2.70,13);
 else if(name==='back')camera.position.set(-7,5.2,-9);
 else if(name==='top'){controls.target.set(-.55,1.5,-.70);camera.position.set(-.55,15,-.699);}
 else if(name==='arch'){
   frameHeight=2.7;frameWidth=3.8;controls.target.set(layout.boxX,3.15,0);camera.position.set(layout.boxX,3.15,-12);
   $('show-fan').checked=false;
 }else if(name==='water'){
   frameHeight=3.0;frameWidth=3.8;controls.target.set(.83,1.6,0);camera.position.set(8,2.8,-4);
 }else if(name==='pumps'){
   frameHeight=1.9;frameWidth=2.8;controls.target.set(.83,1.8,.601);camera.position.set(2.0,2.5,8);
 }else if(name==='bevels'){
   frameHeight=3.7;frameWidth=4.0;controls.target.set(layout.boxX,2.65,0);camera.position.set(-7,4.7,7);
 }else if(name==='core'){
   frameHeight=3.3;frameWidth=4.5;controls.target.set(0,1.25,0);camera.position.set(3.8,2.9,5.6);
 }else camera.position.set(-6,5.8,10);
 apply();controls.update();resize();
 document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===name));
}
const anchors=[
 {text:'Теплообменник',sub:'Корпуса из исходного STEP',p:[.6,1.7,.4],offset:[95,20],category:'shell'},
 {text:'ШТ',sub:'После квадратного сужения',p:[layout.boxX,layout.stY,.4],offset:[80,10],category:'damper'},
 {text:'Скос после ШТ',sub:'Наклонный торец по STEP',p:[layout.boxX,3.72,.256],offset:[-210,-90],category:'bevel_upper'},
 {text:'Скос перед ШТ',sub:'Наклонный торец по STEP',p:[-1.70,1.45,0],offset:[-210,30],category:'bevel_lower'},
 {text:'Дымосос',sub:'В конце круглого тракта',p:[layout.fanX,layout.fanY,layout.fanZ],offset:[95,-65],category:'fan'},
 {text:'Выпуск вверх',sub:'Прямоугольное → круглое',p:[layout.chimneyX,4.60,layout.chimneyZ],offset:[-160,55],category:'exhaust'},
 {text:'Дымовая труба',sub:'Диаметр уменьшен условно',p:[layout.chimneyX,5.45,layout.chimneyZ],offset:[-190,-20],category:'chimney'},
 {text:'Насосная группа',sub:'Две параллельные ветви',p:[.83,1.80,.8],offset:[65,-50],category:'pumps'},
 {text:'Н1',sub:'Состояние неизвестно',p:[pumpLayout.branchXs[0],1.80,.85],offset:[-165,-50],category:'pumps',detail:true},
 {text:'Н2',sub:'Состояние неизвестно',p:[pumpLayout.branchXs[1],1.80,.85],offset:[80,-50],category:'pumps',detail:true},
 {text:'Прежний фланец заглушён',sub:'Глухая крышка',p:[.83,1.125,-.466],offset:[50,55],category:'water_cap'}
];
const labels=anchors.map(a=>{
 const el=document.createElement('div');el.className='label '+(['shell','water_return','water_cap',...pumpCategories].includes(a.category)?'water':'gas');
 const title=document.createElement('span'),small=document.createElement('small');title.textContent=a.text;small.textContent=a.sub;el.append(title,small);$('labels').appendChild(el);
 const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('stroke','#7e9baa');line.setAttribute('stroke-width','1');line.setAttribute('opacity','.7');$('leaders').appendChild(line);
 return {...a,el,line,p:new THREE.Vector3(...a.p)};
});
function updateLabels(){
 const w=stage.clientWidth,h=stage.clientHeight,placed=[];
 const overlaps=(a,b)=>a.x<b.x+b.w+10&&a.x+a.w+10>b.x&&a.y<b.y+b.h+8&&a.y+a.h+8>b.y;
 for(const [i,a]of labels.entries()){
   const v=a.p.clone().project(camera),px=(v.x+1)*w/2,py=(1-v.y)*h/2;
   const waterLabel=['water_return','water_cap',...pumpCategories].includes(a.category);
   const show=(a.category==='shell'||$('show-concept').checked)&&(a.category!=='fan'||$('show-fan').checked)&&(!['water','pumps'].includes(currentView)||waterLabel)&&(currentView!=='bevels'||['bevel_lower','bevel_upper','damper'].includes(a.category))&&(a.category!=='water_cap'||currentView==='water')&&(!a.detail||currentView==='pumps')&&!(currentView==='pumps'&&a.category==='pumps'&&!a.detail);
   a.el.hidden=!show;a.line.style.display=show?'':'none';if(!show)continue;
   const ew=a.el.offsetWidth,eh=a.el.offsetHeight;
   const clamp=(x,y)=>({x:Math.max(12,Math.min(w-ew-12,x)),y:Math.max(95,Math.min(h-130-eh,y)),w:ew,h:eh});
   let rect=clamp(px+a.offset[0],py+a.offset[1]);
   if(w<750)rect=clamp(i%2===0?14:w-ew-14,110+75*Math.floor(i/2));
   else if(placed.some(p=>overlaps(rect,p))){
     const candidates=[];
     for(const dx of [a.offset[0],-ew-35,35])for(const dy of [a.offset[1],-100,0,80,140])candidates.push(clamp(px+dx,py+dy));
     rect=candidates.find(r=>!placed.some(p=>overlaps(r,p)))||rect;
   }
   placed.push(rect);a.el.style.left=rect.x+'px';a.el.style.top=rect.y+'px';
   a.line.setAttribute('x1',px);a.line.setAttribute('y1',py);a.line.setAttribute('x2',Math.max(rect.x,Math.min(rect.x+ew,px)));a.line.setAttribute('y2',rect.y+eh/2);
 }
}
new ResizeObserver(resize).observe(host);
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>view(b.dataset.view));
document.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>select(b.dataset.pick));
$('component').onchange=()=>select($('component').value);
$('demo-state').onchange=()=>{state=$('demo-state').value;apply();};
for(const id of ['show-concept','show-fan','detached'])$(id).onchange=apply;
$('show-labels').onchange=()=>{$('labels').hidden=!$('show-labels').checked;$('leaders').style.display=$('show-labels').checked?'':'none';};
const raycaster=new THREE.Raycaster();let down=null;
renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);
renderer.domElement.addEventListener('pointerup',e=>{
 if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;
 const r=renderer.domElement.getBoundingClientRect();
 raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),camera);
 const hit=raycaster.intersectObjects(model.meshes.filter(m=>m.visible))[0];if(hit)select(hit.object.userData.category,hit.object.userData.name);
});
apply();view('iso');$('loading').hidden=true;
renderer.setAnimationLoop(()=>{controls.update();updateLabels();renderer.render(scene,camera);});
window.preview={select,view,getInfo:()=>({revision:'v7',base:'v6',selected,state,currentView,cameraType:camera.type,cadMeshes:247,conceptMeshes:model.concept.count,shodMeshes:model.meshes.filter(m=>m.userData.category==='shod').length,conceptVisible:$('show-concept').checked,fanVisible:$('show-fan').checked,visibleCAD:model.meshes.filter(m=>m.userData.origin==='cad'&&m.visible).length,notes:model.concept.notes})};
