/** Инженерные ступени дымососа D-237–D-249/D-279–D-283. Только запросы Protection. */
export class FanTest {
  active=null; result=null; history=[]; incomplete=false;
  ordinaryBlocked=false; coolingBlocked=false; rangeRequired=false;
  settings(sim,options) {
    if(!sim.engineering.enabled||this.active)return ['Настройки доступны инженеру только вне принятой попытки, включая её останов'];
    if(options?.rate!==undefined){if(!Number.isFinite(options.rate)||options.rate<0.1||options.rate>5)return ['Скорость задания 0,1–5 Гц/с'];sim.config.fanTestRate=options.rate;return [];}
    const {fmin,fmax,reserveFrequency,reserveConfirmed}=options??{};
    if(!Number.isFinite(fmin)||!Number.isFinite(fmax)||fmin<10||fmax>100||fmin>=fmax||fmin%5||fmax%5)return ['Границы 10–100 Гц, кратные 5, Fmin<Fmax'];
    if(sim.state!=='STOPPED'||!sim.vfdGuard.stopped(sim)||sim.signals.read('configuration.ready')!==true)return ['Сначала остановленный ТО, подтверждённый останов ПЧ и проверенная конфигурация'];
    const zone=sim.config.resonance;
    if(zone&&(zone.low-zone.hysteresis<fmin||zone.high>fmax))return ['Зона резонанса с гистерезисом не помещается в новый диапазон'];
    if(reserveConfirmed!==true||!Number.isFinite(reserveFrequency)||reserveFrequency<fmin||reserveFrequency>fmax||zone&&reserveFrequency>=zone.low&&reserveFrequency<zone.high)return ['D-283: подтвердите внутреннюю резервную частоту ПЧ в новом диапазоне вне резонанса; автоматической записи в ПЧ нет'];
    if(fmin!==sim.config.fmin||fmax!==sim.config.fmax){this.rangeRequired=true;if(this.result)this.result.valid=false;}
    sim.config.fmin=fmin;sim.config.fmax=fmax;return [];
  }
  reasons(sim){
    const r=sim.engineeringIdleReasons();
    if(sim.signals.position('st')!=='CLOSED')r.push('Нужны реальные CLOSED DI ШТ');
    if(!sim.vfdGuard.stopped(sim)&&!sim.cooling.running(sim))r.push('Нужен подтверждённый STOP ПЧ либо уже выполняемое охлаждение (D-247)');
    if(sim.vfdGuard.blocked)r.push('Сохраняется самостоятельная блокировка ПЧ');
    return r;
  }
  start(sim){
    const r=this.reasons(sim);if(r.length)return r;
    const targets=[];for(let f=sim.config.fmin;f<=sim.config.fmax;f+=5)targets.push(f);
    this.incomplete=true;this.result={result:'NOT_CHECKED',reason:'Новая полная попытка',valid:false};
    this.active={stage:'PREPARE_STOP',targets,index:0,setpoint:targets[0],rate:sim.config.fanTestRate,lastAt:sim.clock.now,reachAt:null,lossAt:null,result:'NOT_CHECKED',reason:null};
    sim.procedureId++;sim.log('FAN_TEST','До действий сохранена незавершённость в памяти; сначала полный STOP, затем Fmin');return [];
  }
  feedbackReady(sim){
    const op=this.active,run=sim.outputs.commands['vfd.run'],frequency=sim.outputs.commands['vfd.frequency'];
    return op && op.setpoint===op.targets[op.index] && run?.value==='START'&&run.delivery==='ACCEPTED'&&
      frequency?.value===op.setpoint&&frequency.delivery==='ACCEPTED'&&sim.signals.read('vfd.running')===true&&
      sim.signals.get('vfd.running').lastGoodRevision>run.deliveryInputRevision && sim.signals.read('vfd.frequency')!==null&&
      sim.signals.get('vfd.frequency').lastGoodRevision>Math.max(frequency.deliveryInputRevision,run.deliveryInputRevision);
  }
  next(sim){
    const op=this.active;
    if(!op||op.stage!=='HOLD'||!this.feedbackReady(sim)||Math.abs(sim.signals.read('vfd.frequency')-op.targets[op.index])>0.5||sim.vfdGuard.blocked||sim.signals.position('st')!=='CLOSED')return ['Ступень ещё не подтверждена текущими данными в ±0,5 Гц'];
    if(op.index===op.targets.length-1)this.stop(sim,'PASSED','Все ступени приняты; ожидается подтверждённый конечный STOP');
    else {op.index++;op.stage='RAMP';op.reachAt=null;op.lossAt=null;op.lastAt=sim.clock.now;}
    return [];
  }
  stop(sim,result,reason,latch=false){
    const op=this.active;if(!op)return;
    if(op.stage!=='WAIT_STOP'){const actual=sim.signals.get('vfd.frequency');op.lastGoodFrequency=actual.lastGoodValue;op.lastGoodAt=actual.lastGoodAt;}
    if(latch){this.ordinaryBlocked=true;this.coolingBlocked=true;}
    if(op.stage!=='WAIT_STOP'||result==='FAILED'||op.result==='PASSED') {op.result=result;op.reason=reason;}
    op.stage='WAIT_STOP';
  }
  cancel(sim,reason='Отменено инженером (D-238/D-244/D-245)'){this.stop(sim,'FAILED',reason,true);}
  step(sim,request){
    const op=this.active;if(!op)return;
    if(sim.signals.position('st')!=='CLOSED')this.stop(sim,'FAILED','Утрачено закрытое положение ШТ (D-243)');
    if(!sim.hmiAvailable())this.stop(sim,'NOT_CHECKED','Потеря HMI 5 с; без новых D-244/D-245 (согласование 15.11)');
    if(sim.vfdGuard.blocked)this.stop(sim,'NOT_CHECKED','Самостоятельная защита ПЧ; её блокировка сохраняется');
    if(sim.signals.read('vfd.frequency')===null&&op.stage!=='WAIT_STOP')this.stop(sim,'NOT_CHECKED','Недостоверная фактическая частота (D-249)');
    if(op.stage==='PREPARE_STOP'){
      request['vfd.run']='STOP';request['vfd.enable']=false;
      if(sim.vfdGuard.stopped(sim)){op.stage='TRACK';op.lastAt=sim.clock.now;}
      return;
    }
    if(op.stage==='WAIT_STOP') {request['vfd.run']='STOP';request['vfd.enable']=false;return;}
    request['vfd.run']='START';request['vfd.enable']=true;
    if(op.stage==='RAMP'){
      op.setpoint=Number(Math.min(op.targets[op.index],op.setpoint+op.rate*(sim.clock.now-op.lastAt)/1000).toFixed(6));
      if(op.setpoint===op.targets[op.index])op.stage='TRACK';
    }
    op.lastAt=sim.clock.now;
    request['vfd.frequency']=op.setpoint; // Проверка проходит резонанс без программного обхода D-239.
    if(op.stage==='RAMP')return;
    const ready=this.feedbackReady(sim), actual=sim.signals.read('vfd.frequency');
    if(op.stage==='TRACK'){
      const frequency=sim.outputs.commands['vfd.frequency'];
      const initialRunConfirmed=sim.signals.read('vfd.running')===true && sim.signals.get('vfd.running').lastGoodRevision>sim.outputs.commands['vfd.run']?.deliveryInputRevision;
      // D-241: начальная ступень ждёт Работа=1; последующие — запись цели после разгона задания.
      if(frequency?.value===op.targets[op.index]&&frequency.delivery==='ACCEPTED'&&(op.index>0||initialRunConfirmed))op.reachAt??=sim.clock.now;
      if(ready&&Math.abs(actual-op.targets[op.index])<=0.5){op.stage='HOLD';op.lossAt=null;}
      else if(op.reachAt!==null&&sim.clock.now-op.reachAt>=10000&&actual!==null)this.stop(sim,'FAILED','Частота не достигнута за 10 с (D-241)',true);
    } else if(op.stage==='HOLD'){
      if(actual!==null&&Math.abs(actual-op.targets[op.index])>0.5){op.lossAt??=sim.clock.now;if(sim.clock.now-op.lossAt>=10000)this.stop(sim,'FAILED','Частота не удержана 10 с (D-242)',true);}
      else op.lossAt=null;
    }
    if(op.stage==='WAIT_STOP'){request['vfd.run']='STOP';request['vfd.enable']=false;}
  }
  afterOutputs(sim){
    const op=this.active;if(!op||op.stage!=='WAIT_STOP'||!sim.vfdGuard.stopped(sim))return;
    this.result={...op,completedAt:sim.clock.now,valid:op.result==='PASSED'};this.history.push({...this.result});
    if(op.result==='PASSED'){this.ordinaryBlocked=false;this.rangeRequired=false;} // D-245 снимается только отдельной командой.
    this.active=null;this.incomplete=false;sim.log('FAN_RESULT',this.result.result+': '+this.result.reason);
  }
  restoreCooling(sim,c){
    const r=sim.engineeringIdleReasons();
    if(!sim.vfdGuard.stopped(sim)||sim.vfdGuard.blocked)r.push('Нужен полный подтверждённый STOP без прочей блокировки ПЧ');
    if(!this.coolingBlocked)r.push('Нет блокировки D-245');
    if(c?.inspected!==true||c?.causeRemoved!==true||c?.workFinished!==true||c?.allowAutomatic!==true)r.push('Нужны осмотр, выясненная/устранённая причина, окончание работ и явное разрешение автоматического пуска охлаждения');
    if(r.length)return r;this.coolingBlocked=false;sim.log('COOLING_RESET','Снята только D-245. При сохранённом запросе возможен автоматический пуск охлаждения');return [];
  }
  restoreSnapshot(saved,sim){Object.assign(this,saved);if(this.active||this.incomplete){this.result={...this.active,result:'NOT_CHECKED',valid:false,reason:'Перезагрузка — новая попытка отдельно',completedAt:sim.clock.now};this.history.push({...this.result});}this.active=null;this.incomplete=false;}
}
