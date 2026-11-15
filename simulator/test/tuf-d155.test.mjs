import test from 'node:test';
import assert from 'node:assert/strict';
import {ManualClock,SignalStore} from '../src/signals.mjs';
function model(){const clock=new ManualClock();return {clock,signals:new SignalStore(clock)};}
for(const [name,good]of [['flow',8],['temperature.backup',60]]){
 test('D-155 '+name+': свежесть заканчивается раньше диагностических 5 с; повтор BAD не продлевает ни один срок',()=>{
  const{clock,signals:s}=model();s.set(name,good,'GOOD',true,false);clock.advance(3000);s.set(name,999,'BAD',true,false);
  assert.equal(s.tuf(name).freshnessRemainingMs,2000);assert.equal(s.tuf(name).diagnosticRemainingMs,5000);assert.equal(s.read(name),good);
  clock.advance(1999);s.set(name,998,'BAD',true,false);assert.equal(s.tuf(name).diagnosticSince,3000);assert.equal(s.tuf(name).freshnessDeadline,5000);assert.equal(s.tuf(name).diagnosticDeadline,8000);assert.equal(s.read(name),good);
  clock.advance(1);assert.equal(s.read(name),null);assert.equal(s.tuf(name).freshnessExpired,true);assert.equal(s.tuf(name).diagnosticExpired,false);
  assert.equal(s.tuf(name).diagnosticRemainingMs,3000);clock.advance(3000);assert.deepEqual(s.tuf(name).reasons,['FRESHNESS_EXPIRED','DIAGNOSTIC_EXPIRED']);
 });
 test('D-155 '+name+': совпадающие сроки истекают ровно на 5 с, новое неисправное значение не используется',()=>{
  const{clock,signals:s}=model();s.set(name,good);s.set(name,999,'BAD',true,false);clock.advance(4999);
  assert.equal(s.read(name),good);assert.equal(s.tuf(name).held,true);clock.advance(1);assert.equal(s.read(name),null);
  assert.equal(s.tuf(name).freshnessExpired,true);assert.equal(s.tuf(name).diagnosticExpired,true);
 });
 test('D-155 '+name+': корректное равное измерение сбрасывает диагностику и начинает новую свежесть, в том числе после истечения',()=>{
  const{clock,signals:s}=model();s.set(name,good);clock.advance(1000);s.set(name,999,'BAD',true,false);clock.advance(3000);
  s.set(name,good,'GOOD',true,false);assert.equal(s.tuf(name).diagnosticSince,null);assert.equal(s.tuf(name).freshnessDeadline,9000);
  clock.advance(5000);assert.equal(s.read(name),null);s.set(name,good,'GOOD',true,false);assert.equal(s.read(name),good);assert.equal(s.tuf(name).freshnessDeadline,14000);
 });
 test('D-155 '+name+': отсутствие ответа, UNKNOWN и несвежее GOOD не сбрасывают диагностическую выдержку',()=>{
  const{clock,signals:s}=model();s.set(name,good);clock.advance(1000);s.set(name,999,'BAD',true,false);clock.advance(1000);
  assert.equal(s.read(name),good);s.set(name,null,'UNKNOWN',true,false);assert.equal(s.tuf(name).diagnosticSince,1000);assert.equal(s.read(name),null);
  clock.advance(1000);s.set(name,good,'GOOD',false,false);assert.equal(s.tuf(name).diagnosticSince,1000);assert.equal(s.tuf(name).lastGoodAt,0);
  clock.advance(3000);assert.equal(s.tuf(name).diagnosticExpired,true);
 });
 test('D-155 '+name+': до первого корректного чтения Нет данных; несвежий BAD не начинает новый срок',()=>{
  const{clock,signals:s}=model();s.set(name,999,'BAD',false,false);assert.equal(s.tuf(name).diagnosticSince,null);assert.equal(s.read(name),null);
  clock.advance(1000);s.set(name,999,'BAD',true,false);assert.equal(s.tuf(name).diagnosticSince,1000);assert.equal(s.tuf(name).freshnessDeadline,null);
  assert.equal(s.tuf(name).held,false);assert.equal(s.read(name),null);clock.advance(5000);assert.equal(s.tuf(name).diagnosticExpired,true);
 });
 test('D-155 '+name+': позднее первое BAD не даёт нового периода удержания уже устаревших данных',()=>{
  const{clock,signals:s}=model();s.set(name,good,'GOOD',true,false);clock.advance(6000);s.set(name,999,'BAD',true,false);
  assert.equal(s.tuf(name).diagnosticRemainingMs,5000);assert.equal(s.read(name),null);assert.equal(s.tuf(name).held,false);
 });
}
test('D-153/D-155: обновление и восстановление одного TUF-канала не сдвигает сроки другого',()=>{
 const{clock,signals:s}=model();s.set('flow',8,'GOOD',true,false);clock.advance(1000);s.set('temperature.backup',60,'GOOD',true,false);
 clock.advance(1000);s.set('flow',999,'BAD',true,false);clock.advance(1000);s.set('temperature.backup',999,'BAD',true,false);
 const flow=s.tuf('flow');clock.advance(1000);s.set('temperature.backup',60,'GOOD',true,false);
 assert.equal(s.tuf('flow').freshnessDeadline,flow.freshnessDeadline);assert.equal(s.tuf('flow').diagnosticDeadline,flow.diagnosticDeadline);
 clock.advance(1000);assert.equal(s.read('flow'),null);assert.equal(s.read('temperature.backup'),60);
 s.set('flow',8,'GOOD',true,false);assert.equal(s.tuf('temperature.backup').freshnessDeadline,9000);assert.equal(s.tuf('temperature.backup').diagnosticSince,null);
});
test('D-155: генератор повторных BAD не делает ошибочные значения корректными и не освежает другой канал',()=>{
 const{clock,signals:s}=model();s.set('flow',8,'GOOD',true,false);s.set('temperature.backup',60,'GOOD',true,false);clock.advance(1000);s.set('flow',999,'BAD',true,true);
 for(let i=0;i<5;i++){clock.advance(1000);s.refresh();}
 assert.equal(s.tuf('flow').diagnosticSince,1000);assert.equal(s.tuf('flow').lastGoodAt,0);assert.equal(s.tuf('flow').diagnosticExpired,true);
 assert.equal(s.tuf('temperature.backup').diagnosticSince,null);assert.equal(s.read('temperature.backup'),null);
});
