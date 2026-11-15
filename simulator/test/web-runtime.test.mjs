import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { Simulation } from '../src/simulation.mjs';
import { engineer } from './helpers.mjs';
import { cooling, fanAtFirst } from './thermal-helpers.mjs';

// Исполнение клиентского JS с минимальным DOM. Не браузер и не проверка визуального оформления.
async function client(sim){
 const html=await readFile(new URL('../web/index.html',import.meta.url),'utf8');
 const elements=new Map([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>[m[1],{value:'',checked:false,disabled:false,hidden:false,textContent:'',innerHTML:'',querySelectorAll:()=>[]} ]));
 const document={activeElement:null,getElementById:id=>{assert.ok(elements.has(id),'Нет элемента '+id);return elements.get(id);},querySelectorAll:()=>[]};
 const fetch=async(url,options)=>{
  if(options){const data=JSON.parse(options.body);if(data.type==='command')sim.command(data.action,data.value,data.procedureId);}
  return {ok:true,json:async()=>sim.snapshot()};
 };
 const code=await readFile(new URL('../web/app.js',import.meta.url),'utf8');
 const api=await vm.runInNewContext('(async()=>{'+code+';return {render,replace:value=>snapshot=value};})()',{document,fetch});
 assert.equal(elements.get('error').textContent,'');return {api,elements};
}

test('HMI JS: начальная загрузка и холодный профиль выполняются без обращения к ещё не объявленным переменным',async()=>{
 const sim=new Simulation();const {api,elements}=await client(sim);sim.loadFixture();api.replace(sim.snapshot());api.render();
 assert.equal(elements.get('state').textContent,'Остановлен');assert.equal(elements.get('fan-test-start').disabled,true);
});

test('HMI JS: проверка ШОД блокирует другие старты, показывает нескорректированную и диагностическую величины',async()=>{
 const sim=engineer();const {api,elements}=await client(sim);await elements.get('shod-test-start').onclick();
 assert.ok(sim.damperTest.active);assert.equal(elements.get('fan-test-start').disabled,true);
 sim.signals.set('shod.feedback',10);sim.tick();api.replace(sim.snapshot());api.render();
 assert.match(elements.get('shod-test-state').textContent,/120%/);assert.equal(elements.get('shod-k-set').disabled,true);
});

test('HMI JS: ручное продолжение дымососа доступно на подтверждённой ступени и недоступно при отклонении',async()=>{
 const sim=engineer();const {api,elements}=await client(sim);await elements.get('fan-test-start').onclick();fanAtFirst(sim);api.replace(sim.snapshot());api.render();
 assert.equal(elements.get('fan-continue').disabled,false);assert.equal(elements.get('shod-test-start').disabled,true);
 sim.signals.set('vfd.frequency',22);sim.tick();api.replace(sim.snapshot());api.render();assert.equal(elements.get('fan-continue').disabled,true);
});

test('HMI JS: вход инженера при охлаждении разрешён интерфейсом, допуск проверяет сервер',async()=>{
 const sim=cooling(false);sim.engineering.enabled=false;const {elements}=await client(sim);
 assert.equal(elements.get('engineering-enter').disabled,false);assert.match(elements.get('cooling-state').textContent,/Запрос охлаждения: 1/);
});
