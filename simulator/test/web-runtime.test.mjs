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
  if(options){const data=JSON.parse(options.body);if(data.type==='command')sim.command(data.action,data.value,data.procedureId);if(data.type==='temperature_fixture')sim.loadTemperatureFixture();if(data.type==='water_fixture')sim.loadWaterFixture();}
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

test('HMI JS: D-164 требует отдельного подтверждения оператора и показывает его отдельно от концевиков',async()=>{
 const sim=cooling(false);sim.engineering.enabled=false;sim.protection.stBlocked=true;sim.signals.set('st.closed',false);sim.tick();
 const {api,elements}=await client(sim);assert.equal(elements.get('cooling-st-confirm').disabled,false);
 await elements.get('cooling-st-confirm').onclick();assert.equal(sim.cooling.manualClosed,null);
 elements.get('cooling-st-checked').checked=true;await elements.get('cooling-st-confirm').onclick();
 assert.ok(sim.cooling.manualClosed);assert.match(elements.get('cooling-manual-state').textContent,/подтверждено оператором/);
 sim.cooling.repeatWarning=true;api.replace(sim.snapshot());api.render();assert.equal(elements.get('cooling-repeat-warning').hidden,false);
 sim.sampleGroup('stOpen');api.replace(sim.snapshot());api.render();assert.equal(elements.get('cooling-st-checked').checked,false);
});

test('HMI JS: температурная исходная точка, ожидание/удержание, вода и отдельное предупреждение',async()=>{
 const sim=new Simulation();const{api,elements}=await client(sim);await elements.get('temperature-fixture').onclick();
 assert.equal(sim.temperature.enabled,true);assert.match(elements.get('temperature-state').textContent,/Ожидание первого/);assert.equal(elements.get('temperature-settings').disabled,true);
 assert.match(elements.get('signals').innerHTML,/Вычислено по температурному профилю: Нет данных/);
 sim.signals.set('temperature.fan',40);sim.signals.set('temperature.fan',999,'BAD');sim.signals.set('temperature.supply',60);sim.signals.set('temperature.backup',66);sim.signals.set('temperature.return',50);sim.tick();api.replace(sim.snapshot());api.render();
 assert.match(elements.get('temperature-state').textContent,/Последнее достоверное/);assert.match(elements.get('temperature-water').textContent,/PRIMARY/);assert.match(elements.get('temperature-water').textContent,/ΔT: 10/);
 sim.signals.set('temperature.fan',40);sim.advance(10000);api.replace(sim.snapshot());api.render();assert.equal(elements.get('temperature-warning').hidden,false);
 sim.command('engineering_enter',true);api.replace(sim.snapshot());api.render();elements.get('temperature-clear').value='2';await elements.get('temperature-settings').onclick();assert.equal(sim.config.supplyDifferenceClear,2);
});

test('HMI JS: водяной профиль, раздельные сроки TUF, запрос теплоотвода без вымышленной обратной связи',async()=>{
 const sim=new Simulation();const{api,elements}=await client(sim);await elements.get('water-fixture').onclick();assert.equal(sim.waterProtection.enabled,true);
 sim.signals.set('temperature.supply',85);sim.signals.set('flow',8,'GOOD',true,false);sim.tick();sim.advance(3000);sim.signals.set('flow',999,'BAD',true,false);sim.tick();api.replace(sim.snapshot());api.render();
 assert.match(elements.get('water-protection-state').textContent,/Теплоотвод: 1/);assert.match(elements.get('outputs').innerHTML,/Нет физической обратной связи/);
 assert.match(elements.get('tuf-timers').textContent,/свежести 2.0 с; диагностики 5.0 с/);assert.equal(elements.get('water-settings').disabled,true);
});
