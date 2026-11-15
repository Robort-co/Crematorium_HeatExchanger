/** ШОД D-225–D-236: K применяется только к обратной связи, не к заданию. */
export class DamperTest {
  active = null; result = null; history = []; incomplete = false;
  motionWarning = false; motionWatch = null; motionBase = null; motionLastCommand = null; motionDirection = 0;
  position(sim) { const raw=sim.signals.read('shod.feedback'); return raw===null?null:raw*sim.config.shodK*10; }
  setK(sim,value) {
    if (!sim.engineering.enabled || this.active || !Number.isFinite(value) || value<0.5 || value>2) return ['K=0,5–2, только до проверки ШОД в инженерном режиме'];
    sim.config.shodK=value; this.motionWatch=null; this.motionBase=null; this.motionLastCommand=null; this.motionDirection=0; return [];
  }
  reasons(sim) {
    const r=sim.engineeringIdleReasons();
    if (!sim.vfdGuard.stopped(sim)) r.push('Нужен полностью подтверждённый останов ПЧ');
    if (sim.signals.read('cooling.required')!==false) r.push('D-225: охлаждение должно достоверно не требоваться');
    if (sim.vfdGuard.blocked || sim.fanTest.coolingBlocked) r.push('Защитный приоритет удерживает ШОД на 100%');
    if (this.position(sim)===null) r.push('Нет достоверной обратной связи ШОД');
    return r;
  }
  start(sim) {
    const r=this.reasons(sim); if(r.length)return r;
    this.incomplete=true; this.result={result:'NOT_CHECKED',reason:'Новая попытка',valid:false};
    this.active={index:0,targets:[0,50,100,50,0],stageAt:sim.clock.now,revision:sim.signals.revision,issuedAt:null,withinAt:null};
    sim.procedureId++; sim.log('SHOD_TEST','Незавершённость сохранена в памяти до первого задания; 0→50→100→50→0%'); return [];
  }
  finish(sim,result,reason) {
    if(!this.active)return;
    this.result={...this.active,result,reason,valid:result==='PASSED',completedAt:sim.clock.now,raw:sim.signals.read('shod.feedback'),corrected:this.position(sim)};
    this.history.push({...this.result}); this.active=null;this.incomplete=false;
    sim.log('SHOD_RESULT',result+': '+reason);
  }
  cancel(sim,reason='Отменено инженером (D-234)') {this.finish(sim,'NOT_CHECKED',reason);}
  step(sim,request) {
    const op=this.active;if(!op)return;
    if(sim.signals.read('cooling.required')===true){this.cancel(sim,'Требуется охлаждение (D-230)');return;}
    if(!sim.hmiAvailable()){this.cancel(sim,'Потеря HMI 5 с (D-235)');return;}
    const position=this.position(sim);
    if(position===null){this.cancel(sim,'Недостоверная обратная связь (D-232)');return;}
    if(sim.vfdGuard.blocked||sim.fanTest.coolingBlocked){this.cancel(sim,'Управление забрано действующим защитным приоритетом');return;}
    const target=op.targets[op.index],command=sim.outputs.commands['shod.voltage'];
    request['shod.voltage']=target/10; // K не меняет 0/5/10 В команды.
    if(command?.value!==target/10)return;
    op.issuedAt ??= Math.max(op.stageAt,command.issuedAt);
    const fresh=sim.signals.get('shod.feedback').lastGoodRevision>Math.max(op.revision,command.issuedInputRevision);
    if(fresh && Math.abs(position-target)<=10)op.withinAt??=sim.clock.now;else op.withinAt=null;
    // Непрерывные 2 с входят в общий срок 52,5 с; шкала 0–100 не обрезает критерий.
    if(op.withinAt!==null && sim.clock.now-op.withinAt>=2000){
      if(++op.index===op.targets.length){this.finish(sim,'PASSED','Полная последовательность подтверждена (D-236)');request['shod.voltage']=0;return;}
      op.stageAt=sim.clock.now;op.revision=sim.signals.revision;op.issuedAt=null;op.withinAt=null;
    } else if(sim.clock.now-op.issuedAt>=52500) {this.finish(sim,'FAILED','Положение '+target+'% не подтверждено за 52,5 с (D-228)'); request['shod.voltage']=0;}
  }
  monitorMotion(sim) {
    // Отдельная D-020: только значок, без общего извещателя/останова теста/байпаса.
    const command=sim.outputs.commands['shod.voltage'],position=this.position(sim);
    if(!command||position===null)return;
    const corrected=position/10;
    if(!this.motionBase){this.motionBase={command:command.value};this.motionLastCommand=command.value;}
    const direction=Math.sign(command.value-this.motionLastCommand);
    // Смена определяется относительно предыдущей команды, а не старой точки накопления.
    if(direction && direction!==this.motionDirection){
      this.motionWatch=null;this.motionBase={command:this.motionLastCommand};this.motionDirection=direction;
    }
    this.motionLastCommand=command.value;
    if(!this.motionWatch && Math.abs(command.value-this.motionBase.command)>=1)this.motionWatch={at:command.issuedAt,feedback:corrected};
    if(this.motionWatch && sim.clock.now-this.motionWatch.at>=5000){
      this.motionWarning=Math.abs(corrected-this.motionWatch.feedback)<0.1;
      this.motionWatch=null;this.motionBase={command:command.value};
    }
  }
  restoreSnapshot(saved,sim){Object.assign(this,saved);if(this.active||this.incomplete)this.cancel(sim,'Перезагрузка (D-235): новая попытка отдельно');this.active=null;this.incomplete=false;this.motionWatch=null;this.motionBase=null;this.motionLastCommand=null;this.motionDirection=0;}
}
