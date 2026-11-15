import { DEFINITIONS, ManualClock, SignalStore } from './signals.mjs';
import { SimulatedOutputs } from './io.mjs';
import { MainProgram } from './main-program.mjs';
import { Protection } from './protection.mjs';
import { FrequencyPolicy } from './frequency.mjs';
import { Supervision } from './supervision.mjs';
import { ArangaExchange } from './aranga.mjs';
import { PumpGroup } from './pumps.mjs';
import { HydraulicControl } from './hydraulics.mjs';
import { PumpValves } from './valves.mjs';
import { Engineering } from './engineering.mjs';
import { PumpRecovery } from './recovery.mjs';
import { PressureProtection } from './pressure.mjs';
import { RebootRecovery } from './reboot.mjs';
import { ShutterTest } from './shutter-test.mjs';
import { EngineeringCycle } from './engineering-cycle.mjs';
import { Cooling } from './cooling.mjs';
import { VfdGuard } from './vfd-guard.mjs';
import { DamperTest } from './damper-test.mjs';
import { FanTest } from './fan-test.mjs';

// Явные тестовые воздействия. Числа 1,5/2 бар и 8 м³/ч — образцы, НЕ новые проектные уставки.
export const INPUT_GROUPS = {
  bootPermits: { label: 'Имитировать: общие условия нормальны, охлаждение не требуется', values: { 'grid.normal': true, 'temperature.normal': true, 'configuration.ready': true, 'vfd.exchange': true, 'vfd.fault': false, 'emergency': false, 'cooling.required': false } },
  stOpen: { label: 'Имитировать: ШТ открыт', values: { 'st.open': true, 'st.closed': false } },
  stClosed: { label: 'Имитировать: ШТ закрыт', values: { 'st.open': false, 'st.closed': true } },
  valvesClosed: { label: 'Имитировать: оба затвора закрыты', values: { 'valve1.open': false, 'valve1.closed': true, 'valve2.open': false, 'valve2.closed': true } },
  valve1Open: { label: 'Имитировать: затвор 1 открыт', values: { 'valve1.open': true, 'valve1.closed': false } },
  valve1Closed: { label: 'Имитировать: затвор 1 закрыт', values: { 'valve1.open': false, 'valve1.closed': true } },
  valve2Open: { label: 'Имитировать: затвор 2 открыт', values: { 'valve2.open': true, 'valve2.closed': false } },
  valve2Closed: { label: 'Имитировать: затвор 2 закрыт', values: { 'valve2.open': false, 'valve2.closed': true } },
  pump2On: { label: 'Имитировать: напряжение насоса 2 есть', values: { 'pump2.l1': true, 'pump2.l2': true, 'pump2.l3': true } },
  pump1Off: { label: 'Имитировать: напряжения насоса 1 нет', values: { 'pump1.l1': false, 'pump1.l2': false, 'pump1.l3': false } },
  pump2Off: { label: 'Имитировать: напряжения насоса 2 нет', values: { 'pump2.l1': false, 'pump2.l2': false, 'pump2.l3': false } },
  pump1On: { label: 'Имитировать: напряжение насоса 1 есть', values: { 'pump1.l1': true, 'pump1.l2': true, 'pump1.l3': true } },
  pumpsOff: { label: 'Имитировать: напряжения обоих насосов нет', values: { 'pump1.l1': false, 'pump1.l2': false, 'pump1.l3': false, 'pump2.l1': false, 'pump2.l2': false, 'pump2.l3': false } },
  fanOn: { label: 'Имитировать: ПЧ работает, 20 Гц', values: { 'vfd.running': true, 'vfd.frequency': 20 } },
  fanOff: { label: 'Имитировать: ПЧ остановлен', values: { 'vfd.running': false, 'vfd.frequency': 0 } },
  flowNormal: { label: 'Имитировать: Q=8, P1=1,5, P2=2', values: { 'flow': 8, 'pressure.before': 1.5, 'pressure.after': 2 } },
  flowZero: { label: 'Имитировать: Q=0, ΔP=0', values: { 'flow': 0, 'pressure.before': 1.5, 'pressure.after': 1.5 } },
};

export class Simulation {
  clock = new ManualClock(); // Управляемое время, мс; не идёт само по себе.
  journal = []; // Журнал текущего экземпляра; производственная NV-запись ещё не реализована.
  generation = 0; // Поколение модели для отклонения команд старого открытого окна HMI.
  commandSequence = 0; // Идентификаторы принятых запросов HMI.
  constructor() {
    this.resetRuntime();
    this.log('BOOT', 'Состояние после загрузки неизвестно. Нет автоматического объявления останова');
    this.tick();
  }
  resetRuntime() {
    this.generation += 1;
    this.state = null; // null — неизвестное основное состояние, не пятое технологическое состояние.
    this.stateKnown = false; // Источник знания состояния должен быть явным.
    this.stopReason = null; // Причина уже принятого обязательного останова.
    this.procedureId = 0; // Контекст текущего пуска/останова; старое подтверждение не переносится в новый цикл.
    this.mode = 'MANUAL'; // D-291: если сквозной режим не выбран — ручной.
    this.config = { fmin: 20, fmax: 50, coolingFrequency: 25, startupLinkLossFrequency: 38, resonance: null, flowControl: true, flowMin: 5, dpMin: 0.3 }; // D-269: 38 Гц только для прерванного сквозного запуска; flowControl — D-032/D-045, flowMin в м³/ч и dpMin в бар — исходные D-012.
    this.manualFrequency = 25; // D-296: сохранённое ручное задание не заменяется пусковым Fmin.
    this.config.stReleaseSeconds = 5; // D-074/D-219: исходное время схода; инженерная настройка 1–10 с.
    this.config.shodK = 1.2; this.config.fanTestRate = 0.5; // Утверждённые D-226/D-239; В и Гц/с различаются.
    this.selectedPump = 1; // Начальный выбор тестового профиля; после успешной смены изменяется.
    this.signals = new SignalStore(this.clock); // Отдельный поставщик измерений.
    this.outputs = new SimulatedOutputs(this.clock, this.log.bind(this), () => this.signals.revision); // Только виртуальный транспорт.
    this.main = new MainProgram(); // Основная последовательность без права выдачи.
    this.recovery = new PumpRecovery(); // Только специальный допуск D-112; обычный пуск его не получает.
    this.pressure = new PressureProtection();
    this.boot = new RebootRecovery();
    this.hydraulics = new HydraulicControl(); // Матрица пусковых/рабочих критериев без подстановки отсутствующих Q/ΔP.
    this.pumps = new PumpGroup(); // Подпоследовательность насосов без права выдачи выходов.
    this.valves = new PumpValves(); // Позиционная диагностика и ручные ожидания, отдельно от физических входов.
    this.engineering = new Engineering(); // Отдельные тесты и разрешённый возврат; производственных ролей пока нет.
    this.shutterTest = new ShutterTest();
    this.engineeringCycle = new EngineeringCycle();
    this.cooling = new Cooling(); this.vfdGuard = new VfdGuard();
    this.damperTest = new DamperTest(); this.fanTest = new FanTest();
    this.protection = new Protection(); // Единственный владелец итоговых команд.
    this.supervision = new Supervision(); // Модель проверки завершённых циклов.
    this.aranga = new ArangaExchange(); // Прикладные операции имитатора печи; реального Modbus нет.
    this.frequency = new FrequencyPolicy(this.config); // LIMIT/резонанс без команд запуска.
    this.request = {}; // Последний запрос основной программы и защитной последовательности.
    this.exchange = { hmi: true, aranga: false }; // Генераторы успешных операций: только синтетические источники.
    this.lastHmiAt = null; // Последняя успешная операция управляющего HMI, не работа веб-сервера.
    this.mainEnabled = true; // Отключение моделирует отсутствие завершённых циклов основной программы.
    this.supervisionEnabled = true; // Отдельное отключение модели надзора.
    this.coverageGap = null; // Пауза только симулятора при выходе за реализованную область.
    this.lastHmiRequest = null; // Запрос и результат его принятия, отдельно от выходных команд.
  }
  log(kind, message, details = {}) { // kind/message/details — тип, пояснение и основание события.
    this.journal.push({ at: this.clock.now, kind, message, ...details });
  }
  transition(state, reason) { // state/reason — подтверждённый переход программы и его основание.
    if (this.state === state) return;
    this.log('STATE', (this.state ?? 'UNKNOWN') + ' → ' + state + ': ' + reason);
    this.state = state;
    this.stateKnown = true;
  }
  gap(reason) { // reason — отсутствующая реализация, а не новая авария оборудования.
    if (!this.coverageGap) { this.coverageGap = reason; this.log('NOT_IMPLEMENTED', reason); }
  }
  loadFixture() {
    // Это сброс тестового мира, НЕ инженерная команда восстановления реального ТО.
    this.resetRuntime();
    for (const [name, definition] of Object.entries(DEFINITIONS)) { // name/definition — вход и его тип для исходного образца.
      this.signals.set(name, definition[1] === 'bool' ? false : 0);
    }
    for (const name of ['st.closed', 'valve1.open', 'valve2.open', 'grid.normal', 'temperature.normal', 'configuration.ready', 'vfd.exchange']) { // name — явно истинная предпосылка профиля.
      this.signals.set(name, true);
    }
    this.signals.set('pressure.before', 1.5);
    this.signals.set('pressure.after', 1.5);
    this.signals.set('shod.feedback', 0); // Явный образец начального положения, не результат команды.
    this.request = { 'pump1.run': false, 'pump2.run': false,
      'valve1.direction': 'STOP', 'valve2.direction': 'STOP',
      'st.direction': 'STOP', 'st.power': true, 'vfd.enable': false, 'vfd.run': 'STOP', 'vfd.frequency': 20, 'shod.voltage': 0 };
    // Команды исходной точки — часть тестовых данных о прошлом, а не результат Пуска.
    for (const [name, value] of Object.entries(this.request)) { // name/value — сохранённая виртуальная команда.
      this.outputs.commands[name] = { id: ++this.outputs.sequence, value, issuedAt: this.clock.now,
        delivery: 'ACCEPTED', deliveredAt: this.clock.now, origin: 'TEST_FIXTURE', issuedInputRevision: -1, deliveryInputRevision: -1 };
    }
    this.transition('STOPPED', 'Загружена искусственная исходная точка: холодный ТО, насосы и ПЧ остановлены');
    this.log('ASSUMPTION', 'Профиль: частотные настройки/тесты подтверждены, резонанс не выявлен, температуры и сеть нормальны. Это данные имитатора, не оборудования');
    this.tick();
  }
  loadRecoveryFixture(selected = 1) {
    if (![1, 2].includes(selected)) throw new Error('Выберите ветвь 1 или 2');
    this.loadFixture();
    this.selectedPump = selected;
    this.signals.set('st.open', true); this.signals.set('st.closed', false);
    this.signals.set('vfd.running', true);
    for (const [name, value] of Object.entries({ 'vfd.run': 'START', 'vfd.enable': true })) {
      this.request[name] = value;
      this.outputs.commands[name] = { id: ++this.outputs.sequence, value, issuedAt: this.clock.now,
        delivery: 'ACCEPTED', deliveredAt: this.clock.now, origin: 'TEST_FIXTURE', issuedInputRevision: -1, deliveryInputRevision: -1 };
    }
    this.transition('STARTING', 'Тестовая точка: отдельный допуск к специальному восстановлению уже получен');
    this.main.bypassClosed = true;
    this.recovery.begin(this, selected);
    this.log('ASSUMPTION', 'D-112: допустимость раннего восстановления, открытый ШТ, работающий ПЧ и закрытый ШБ заданы испытателем. Полная отмена защиты D-149 здесь не проверяется');
    this.tick();
  }
  loadCoolingFixture(circulation = false) {
    this.loadFixture();
    this.signals.set('cooling.required', true); this.signals.set('vfd.running', true); this.signals.set('vfd.frequency', 25);
    const preset = { 'vfd.run':'START', 'vfd.enable':true, 'vfd.frequency':25, 'shod.voltage':10 };
    if(circulation){
      preset['pump1.run']=true;
      for(const phase of ['l1','l2','l3'])this.signals.set('pump1.'+phase,true);
      this.signals.set('valve2.open',false);this.signals.set('valve2.closed',true);
      this.signals.set('pressure.after',2);this.signals.set('flow',8);
      this.cooling.openedAt[1]=this.clock.now-5000;
    }
    for(const [name,value] of Object.entries(preset)){
      this.request[name]=value;
      this.outputs.commands[name]={id:++this.outputs.sequence,value,issuedAt:this.clock.now,delivery:'ACCEPTED',deliveredAt:this.clock.now,issuedInputRevision:-1,deliveryInputRevision:-1,origin:'TEST_FIXTURE'};
    }
    this.log('ASSUMPTION','Искусственная исходная точка: охлаждение уже работает'+(circulation?', местная циркуляция и 5 с открытия заранее заданы испытателем':', насосы выключены')+'. Не автоматический запуск насосов и не восстановление оборудования');
    this.tick();
  }
  restart({ downtimeMs = 0, savedStateReadable = true } = {}) {
    if (!Number.isFinite(downtimeMs) || downtimeMs < 0 || downtimeMs > 86400000 || typeof savedStateReadable !== 'boolean') throw new Error('Некорректные условия имитации reboot');
    const savedState = this.state ?? (this.boot.readable ? this.boot.savedState : null); // Повторный reboot не превращает непрочитанный снимок в достоверный.
    const savedPressure = structuredClone(this.pressure);
    const savedSelected = this.selectedPump;
    const savedProcedureId = this.procedureId;
    const savedConfig = structuredClone(this.config);
    const savedShutterTest = structuredClone(this.shutterTest);
    const savedEngineeringCycle = structuredClone(this.engineeringCycle);
    const savedDamper = structuredClone(this.damperTest), savedFan = structuredClone(this.fanTest);
    const savedCooling = structuredClone(this.cooling);
    const savedVfdBlock = { blocked:this.vfdGuard.blocked, causes:[...this.vfdGuard.causes] };
    const savedFaults = this.protection.faults.map(item => ({ ...item })); // Для демонстрации не теряем известные ошибки в памяти процесса.
    const savedStBlock = this.protection.stBlocked; // Существующая блокировка не снимается перезапуском модели.
    const savedMode = this.mode; // Демонстрация сохранённого выбора в памяти процесса, не NV-хранилище WB.
    const savedManualFrequency = this.manualFrequency; // D-267/D-291: перезапуск не заменяет известное ручное задание умолчанием.
    const savedFlowControl = this.config.flowControl; // Действующий флаг в памяти процесса, не сброс к ON при перезапуске.
    const savedFullStartup = this.hydraulics.requireFullStartup; // D-167: требование полной проверки не теряется в демонстрации reboot.
    const savedBranches = structuredClone(this.pumps.branches); // Только память текущего процесса, не реальное NV.
    const savedGroupFault = this.pumps.groupFault; // Перезапуск не снимает критическую неисправность группы.
    const savedEngineering = this.engineering; // Только модель сохранения обязательств в памяти процесса.
    const savedWaits = structuredClone(this.valves.waits); // D-257: остаток без времени выключения/загрузки.
    if (this.pumps.active?.manualRequestedAt !== null && this.pumps.active?.manualRequestedAt !== undefined) {
      const operation = this.pumps.active; // Прежний насосный ручной запрос переносится как остаток, не новые 60 с.
      const remaining = Math.max(0, 60000 - (this.clock.now - operation.manualRequestedAt)); // Без времени отсутствия питания/загрузки D-257.
      savedWaits[operation.from] = { target: 'CLOSED', source: 'SWITCH_CLOSE', remaining, expired: remaining === 0 };
    }
    this.clock.advance(downtimeMs); // Только заданный испытателем простой; таймеры ручного ожидания в это время не идут.
    this.resetRuntime();
    this.procedureId = savedProcedureId + 1; // Даже внутри процесса старый контекст не совпадёт с новым после reboot.
    this.boot.begin(savedState, savedStateReadable);
    if (!savedStateReadable) { this.log('RESTART', 'Имитируется непрочитанный снимок: состояние и блокировки неизвестны, автоматика восстановления запрещена'); this.tick(); return; }
    Object.assign(this.pressure, savedPressure);
    this.pressure.resumeFrom = null; // D-150: reboot запрещает возврат к ранней отмене давления.
    Object.assign(this.config, savedConfig);
    this.shutterTest.restoreSnapshot(savedShutterTest, this.clock.now);
    this.engineeringCycle.restoreSnapshot(savedEngineeringCycle, this);
    this.damperTest.restoreSnapshot(savedDamper,this); this.fanTest.restoreSnapshot(savedFan,this);
    this.cooling.restoreSnapshot(savedCooling,this);
    Object.assign(this.vfdGuard,savedVfdBlock); // Старые подтверждения/таймеры ПЧ не являются новыми после reboot.
    this.selectedPump = savedSelected;
    this.config.flowControl = savedFlowControl;
    this.hydraulics.requireFullStartup = savedFullStartup;
    this.pumps.branches = savedBranches;
    this.pumps.groupFault = savedGroupFault;
    this.engineering.returnRequired = { ...savedEngineering.returnRequired };
    this.engineering.breakerOffRequired = { ...savedEngineering.breakerOffRequired };
    this.engineering.history = structuredClone(savedEngineering.history);
    this.engineering.results = structuredClone(savedEngineering.results);
    this.engineering.interruptedAttempt = structuredClone(savedEngineering.interruptedAttempt);
    for (const pump of [1, 2]) this.engineering.invalidate(pump);
    if (savedEngineering.active) {
      const operation = { ...savedEngineering.active, result: savedEngineering.active.result === 'FAILED' ? 'FAILED' : 'NOT_CHECKED', reason: 'Прервано перезагрузкой модели', valid: false }; // Автоматическое продолжение запрещено D-194/D-209; уже выявленный отказ не переименовывается в успех/пропуск.
      this.engineering.results[operation.pump][operation.kind] = operation;
      this.engineering.interruptedAttempt = operation;
      if (operation.kind !== 'pump' && operation.repair) this.engineering.breakerOffRequired[operation.pump] = true;
    }
    this.valves.waits = savedWaits;
    for (const wait of Object.values(this.valves.waits)) { wait.suspended = true; wait.updatedAt = this.clock.now; } // D-257: возобновление только когда текущий этап снова запросит эту цель.
    for (const branch of Object.values(this.pumps.branches)) { // branch — сохраняемые ошибки; временные подтверждения отменяются.
      branch.classificationAt = null; branch.manualClosed = false; branch.manualOpen = false; branch.isolationConfirmed = false;
    }
    this.protection.faults = savedFaults;
    this.protection.stBlocked = savedStBlock;
    this.mode = savedMode;
    this.manualFrequency = savedManualFrequency;
    this.log('RESTART', 'Снимок сохранён только в памяти процесса. Старые DI/команды не восстановлены как текущие; ожидаются новые подтверждения. Реальной NV нет');
    this.tick();
  }
  hmiAvailable() { return this.lastHmiAt !== null && this.clock.now - this.lastHmiAt < 5000; }
  circulation() {
    const before = this.signals.read('pressure.before'); // Достоверное входное давление.
    const after = this.signals.read('pressure.after'); // Достоверное выходное давление.
    const flow = this.signals.read('flow'); // Пригодное Q, включая только разрешённое удержание.
    if (before === null || after === null) return 'UNKNOWN';
    const dp = this.hydraulics.values(this).dp; // Общий перепад обеих ветвей, бар, без артефакта двоичного вычитания на пороге.
    if (!this.config.flowControl || flow === null) return dp >= this.config.dpMin ? 'DP_ONLY_NORMAL' : 'DP_ONLY_LOW';
    if (dp >= this.config.dpMin && flow >= this.config.flowMin) return 'NORMAL';
    return dp < this.config.dpMin && flow < this.config.flowMin ? 'BOTH_LOW' : 'DISAGREEMENT';
  }
  stoppedConfirmed() {
    return this.state === 'STOPPED' && [1, 2].every(pump => this.outputs.value('pump' + pump + '.run') === false && this.signals.phases(pump)?.every(value => value === false) &&
      ['l1', 'l2', 'l3'].every(phase => this.signals.get('pump' + pump + '.' + phase).lastGoodRevision > this.outputs.commands['pump' + pump + '.run']?.issuedInputRevision)) &&
      this.vfdGuard.stopped(this);
  }
  anyEngineeringTest() { return !!(this.engineering.active||this.shutterTest.active||this.damperTest.active||this.fanTest.active); }
  engineeringIdleReasons() {
    const reasons=[];
    if(!this.engineering.enabled||!this.engineering.furnaceOff||this.state!=='STOPPED')reasons.push('Нужен инженерный сеанс: печь выключена, ТО остановлен');
    if(this.anyEngineeringTest())reasons.push('Сначала завершите текущую проверку');
    if(!this.hmiAvailable())reasons.push('Нет управляющей HMI');
    if(Object.values(this.engineering.returnRequired).some(Boolean)||Object.values(this.engineering.breakerOffRequired).some(Boolean)||Object.keys(this.valves.waits).length)reasons.push('Не закончены обязательные ручные действия');
    for(const name of ['grid.normal','temperature.normal','configuration.ready','vfd.exchange'])if(this.signals.read(name)!==true)reasons.push('Нет допуска: '+name);
    if(this.signals.read('vfd.fault')!==false||this.signals.read('emergency')!==false||!this.mainEnabled||!this.supervisionEnabled)reasons.push('Нет общих разрешений управления/ПЧ');
    return reasons;
  }
  startReasons(source = 'HMI') { // source — источник нового Пуска; готовность для HMI и ARANGA различается.
    const reasons = []; // Все выявленные причины запрета, без очереди отложенного Пуска.
    if (this.state !== 'STOPPED' || !this.stateKnown) reasons.push('Нет подтверждённого программного состояния Остановлен');
    if (!this.stoppedConfirmed()) reasons.push('Не подтверждены останов ПЧ и отсутствие напряжения насосов');
    if (!this.hmiAvailable()) reasons.push('Нет обмена с управляющей HMI');
    if (this.engineering.enabled) reasons.push('Инженерный режим');
    if (this.shutterTest.required || this.shutterTest.incomplete) reasons.push('Не выполнен обязательный полный тест ШТ (D-214/D-223)');
    if (this.fanTest.ordinaryBlocked || this.fanTest.rangeRequired || this.vfdGuard.blocked) reasons.push('Блокировка ПЧ/не выполнен обязательный тест дымососа');
    if (Object.values(this.engineering.returnRequired).some(Boolean)) reasons.push('Не подтверждён возврат нижнего ручного крана');
    if (Object.values(this.engineering.breakerOffRequired).some(Boolean)) reasons.push('Не подтверждено обязательное отключение автомата затвора');
    for (const name of ['grid.normal', 'temperature.normal', 'configuration.ready', 'vfd.exchange']) { // name — обязательная предпосылка первого сценария.
      if (this.signals.read(name) !== true) reasons.push('Не подтверждено: ' + DEFINITIONS[name][0]);
    }
    if (this.signals.read('vfd.fault') !== false || this.signals.read('emergency') !== false) reasons.push('Нет подтверждения отсутствия аварии/нажатия кнопки');
    if (this.signals.read('cooling.required') !== false) reasons.push('Пуск ТО из активного охлаждения пока вне реализованного профиля');
    for (const name of ['pressure.before', 'pressure.after']) { // name — оба обязательных для нового пуска датчика.
      const pressure = this.signals.read(name); // Измеренное давление, бар, либо null.
      if (pressure === null || pressure < 0.8 || pressure > 2.8) reasons.push('Давление не разрешает пуск: ' + name);
    }
    if (this.protection.faults.length || this.protection.stBlocked) reasons.push('Сохраняются неисправности/блокировки');
    if (this.pressure.restartBlocked || this.pressure.stopPending || this.pressure.trip || this.pressure.highAlarm) reasons.push('Нет разрешения защиты давления');
    if (Object.values(this.pumps.branches).some(branch => branch.exclusions.length)) reasons.push('Не возвращена исключённая для проверки насосная ветвь (D-167)');
    if (this.coverageGap) reasons.push('Модель на паузе вне реализованной области');
    if (source === 'HMI' && this.mode !== 'MANUAL') reasons.push('Сквозной режим: новый Пуск только от ARANGA');
    if (source === 'ARANGA' && this.mode !== 'ARANGA') reasons.push('Ручной режим');
    if (source === 'ARANGA' && !this.aranga.available(this)) reasons.push('Нет успешного обмена ARANGA');
    if (this.aranga.stopLevel === true) reasons.push('Принята команда Стоп ARANGA=1; требуется её снятие (D-299)');
    return reasons;
  }
  beginStart(source) { // source — уже проверенный источник команды; подготовка механизмов общая.
    this.protection.stopIrreversible = false;
    this.protection.needsRestartContinue = false; this.protection.restartContinued = false;
    this.procedureId += 1;
    this.aranga.beginStartup(this);
    this.main.start();
    this.transition('STARTING', 'Новый Пуск ' + source);
  }
  changeMode(value, record) { // value — выбранный режим; record — результат операторского запроса.
    if (!['MANUAL', 'ARANGA'].includes(value)) record.reasons.push('Неизвестный режим');
    else if (this.state === 'STARTING') record.reasons.push('Выполняется запуск ТО: режим фиксирован (D-297)');
    else if (this.state === 'STOPPING' || this.state === null) record.reasons.push('В этой версии выбор режима доступен после останова либо ARANGA → ручной в работе');
    else if (value === this.mode) record.result = 'NO_CHANGE';
    else if (this.state === 'RUNNING' && value === 'ARANGA') record.reasons.push('Сначала завершите останов (D-329)');
    else {
      if (this.state === 'RUNNING') this.manualFrequency = this.outputs.value('vfd.frequency'); // D-267: именно итоговое задание, не обратная связь частоты.
      this.mode = value;
      record.result = 'ACCEPTED';
      this.log('MODE', 'Выбран режим ' + value + '; выбор не является Пуском');
    }
  }
  arangaOperation(operation, payload = {}) { // Условное сетевое событие поступает отдельно от команды механизму.
    const result = this.aranga.receive(this, operation, payload); // Приём/отклонение в текущем режиме.
    this.tick();
    return result;
  }
  command(action, value, procedureId = this.procedureId) { // action/value — запрос; procedureId — процедура, показанная клиенту при нажатии.
    const record = { id: ++this.commandSequence, action, value, at: this.clock.now, result: 'REJECTED', reasons: [] }; // Результат приёма не означает исполнение.
    this.lastHmiRequest = record;
    if (procedureId !== this.procedureId) record.reasons.push('Устаревший контекст процедуры: подтверждение не принято');
    else if (this.coverageGap) record.reasons.push('Расчёт модели приостановлен вне реализованного охвата');
    else if (!this.hmiAvailable()) record.reasons.push('Нет доступной HMI');
    else if(action==='confirm_st_closed_for_cooling'){
      record.reasons=this.cooling.confirmClosed(this,value);if(!record.reasons.length)record.result='ACCEPTED';
    }
    else if (action.startsWith('engineering_')) {
      const handlers = {
        engineering_enter: () => this.engineering.enter(this, value),
        engineering_leave: () => this.engineeringCycle.pending ? ['Сначала завершите или отмените общий цикл'] : this.engineering.leave(this),
        engineering_test: () => this.engineeringCycle.pending ? ['Общий цикл: используйте Продолжить/выборочный повтор'] : this.engineering.start(this, value),
        engineering_st_test: () => this.engineeringCycle.pending ? ['Общий цикл: используйте Продолжить/выборочный повтор'] : this.shutterTest.start(this),
        engineering_cycle_begin: () => this.engineeringCycle.begin(this),
        engineering_cycle_continue: () => this.engineeringCycle.next(this, value),
        engineering_cycle_skip: () => this.engineeringCycle.skip(this),
        engineering_cycle_cancel: () => this.engineeringCycle.cancel(this),
        engineering_cycle_repeat: () => typeof value?.key !== 'string' ? ['Выберите этап для полного повторения'] : this.engineeringCycle.next(this, value, value.key),
        engineering_st_restore: () => this.shutterTest.restorePower(this, value),
        engineering_st_release_time: () => this.shutterTest.setReleaseTime(this, value),
        engineering_shod_test: () => this.engineeringCycle.pending ? ['Используйте переход общего цикла'] : this.damperTest.start(this),
        engineering_shod_k: () => this.damperTest.setK(this,value),
        engineering_fan_test: () => this.engineeringCycle.pending ? ['Используйте переход общего цикла'] : this.fanTest.start(this),
        engineering_fan_continue: () => this.fanTest.next(this),
        engineering_fan_settings: () => this.fanTest.settings(this,value),
        engineering_cooling_restore: () => this.fanTest.restoreCooling(this,value),
        engineering_vfd_reset: () => this.vfdGuard.reset(this,value),
        engineering_stop: () => { if(this.damperTest.active){this.damperTest.cancel(this);return [];} if(this.fanTest.active){this.fanTest.cancel(this);return [];} if (this.shutterTest.active) { this.shutterTest.cancel(this); return []; } if (!this.engineering.active) return ['Нет активной проверки']; this.engineering.stop(this); return []; },
        engineering_return: () => this.engineering.returnBranch(this, value),
        engineering_reset_voltage: () => {
          if (![1, 2].includes(value) || !this.engineering.enabled || this.engineering.active || !this.stoppedConfirmed()) return ['Нужен инженерный режим и подтверждённый останов'];
          if (this.pumps.branches[value].faults.some(code => /PUMP_PHASES_ON|VOLTAGE_WHEN_OFF/.test(code)) || this.pumps.branches[value].electricalIsolation) return ['Сначала ремонт, успешная проверка и отдельный возврат насоса (D-143)'];
          this.protection.faults = this.protection.faults.filter(fault => fault.code !== 'VOLTAGE_WHEN_OFF_' + value);
          return [];
        },
        engineering_isolate: () => this.engineering.isolate(this, value),
        engineering_confirm_isolation: () => this.engineering.isolate(this, value, true),
        engineering_confirm_return: () => this.engineering.confirmReturn(this, value),
        engineering_breaker_off: () => {
          if (![1, 2].includes(value) || !this.engineering.breakerOffRequired[value]) return ['Нет запроса отключить этот автомат'];
          this.engineering.breakerOffRequired[value] = false; this.engineering.breakerOffConfirmed[value] = true; return [];
        },
      }; // Разрешённые локальные действия, без универсального сброса защит.
      record.reasons = handlers[action] ? handlers[action]() : ['Неизвестная инженерная команда'];
      if (!record.reasons.length) record.result = 'ACCEPTED';
    }
    else if (action === 'reset_pressure_stop') {
      record.reasons = this.pressure.reset(this, value);
      if (!record.reasons.length) record.result = 'ACCEPTED';
    }
    else if (action === 'reset_pump_group') {
      record.reasons = this.pumps.resetGroup(this, value);
      if (!record.reasons.length) record.result = 'ACCEPTED';
    }
    else if (action === 'reset_flow_faults') {
      if (value !== true || !this.stoppedConfirmed() || this.engineering.active) record.reasons.push('Нужны отдельное подтверждение и завершённый останов');
      else if (this.signals.read('flow') === null || this.signals.read('pressure.before') === null || this.signals.read('pressure.after') === null) record.reasons.push('Нужны достоверные Q и оба давления, нулевой Q при OFF допустим (D-167)');
      else {
        this.protection.faults = this.protection.faults.filter(fault => !['FLOW_INSUFFICIENT', 'FLOW_RECOVERY_UNCONFIRMED'].includes(fault.code));
        record.result = 'ACCEPTED'; // Требование полного следующего пуска и индивидуальные исключения сохранены.
      }
    }
    else if (action === 'start') {
      record.reasons = this.startReasons();
      if (!record.reasons.length) { this.beginStart('HMI'); record.result = 'ACCEPTED'; }
    } else if (action === 'switch_pump') {
      record.reasons = this.state === 'RUNNING' || (this.state === 'STARTING' && this.main.stage === 'CIRCULATION') ? this.pumps.begin(this, value) : ['Ручная смена доступна в работе или при гидравлической проверке подготовки (D-031)'];
      if (!record.reasons.length) record.result = 'ACCEPTED';
    } else if (action === 'confirm_valve_closed') {
      record.reasons = this.pumps.confirmClosed(this, value);
      if (!record.reasons.length) record.result = 'ACCEPTED';
    } else if (action === 'confirm_valve_open') {
      record.reasons = this.valves.confirm(this, value, 'OPEN');
      if (!record.reasons.length) record.result = 'ACCEPTED';
    } else if (action === 'confirm_pump_breaker_off') {
      record.reasons = this.pumps.confirmIsolation(this, value);
      if (!record.reasons.length) record.result = 'ACCEPTED';
    } else if (action === 'flow_control' && typeof value === 'boolean' && this.state !== null) {
      if (value === this.config.flowControl) record.result = 'NO_CHANGE'; // Повтор прежнего значения не продлевает диагностическую выдержку.
      else {
        this.config.flowControl = value;
        this.hydraulics.resetTimers(this);
        record.result = 'ACCEPTED';
        this.log('SIM_ENGINEER_SETTING', 'Флаг расхода: ' + value + '. Права инженера здесь имитируются, производственной авторизации нет (D-045)');
      }
    } else if (action === 'mode') {
      this.changeMode(value, record);
    } else if (action === 'stop') {
      if (this.damperTest.active) { this.damperTest.cancel(this); record.result = 'ACCEPTED'; }
      else if (this.fanTest.active) { this.fanTest.cancel(this); record.result = 'ACCEPTED'; }
      else if (this.shutterTest.active) { this.shutterTest.cancel(this); record.result = 'ACCEPTED'; }
      else if (this.engineering.active) { this.engineering.stop(this); record.result = 'ACCEPTED'; }
      else record.result = this.protection.beginStop(this, 'Стоп HMI, обязательный с принятия (D-264)') ? 'ACCEPTED' : 'NO_CHANGE';
    } else if (action === 'continue_stop_after_restart') {
      if (this.state !== 'STOPPING' || !this.protection.needsRestartContinue || !this.protection.bypassOpen || this.protection.stopStage !== 'WAIT_BYPASS') record.reasons.push('Нужно актуальное подтверждение ШБ открыт после reboot и незавершённый останов');
      else { this.protection.restartContinued = true; this.protection.stopIrreversible = true; record.result = 'ACCEPTED'; }
    } else if (action === 'confirm_bypass_closed' && this.state === 'STARTING' && this.main.stage !== 'OPEN_ST') {
      this.main.bypassClosed = true;
      record.result = 'ACCEPTED';
    } else if (action === 'confirm_bypass_open' && this.state === 'STOPPING' && this.protection.stopStage === 'WAIT_BYPASS') {
      this.protection.bypassOpen = true;
      record.result = 'ACCEPTED';
    } else if (action === 'confirm_st_closed_manually' && this.state === 'STOPPING' && this.protection.stBlocked && this.protection.bypassOpen) {
      this.protection.manualStClosed = true;
      record.result = 'ACCEPTED';
    } else if (action === 'frequency' && Number.isFinite(value) && this.state === 'RUNNING') {
      if (this.mode === 'MANUAL') { this.manualFrequency = value; record.result = 'ACCEPTED'; }
      else if (this.aranga.localFrequency(this, value)) record.result = 'ACCEPTED';
      else record.reasons.push('Сквозное задание управляется ARANGA; местная корректировка доступна при удержании (D-330)');
    } else record.reasons.push('Команда не допускается в текущем состоянии/первой версии');
    this.log('REQUEST', action + ': ' + record.result, { requestId: record.id, reasons: record.reasons });
    this.tick();
    return record;
  }
  tick() {
    if (this.coverageGap) return;
    if (this.exchange.hmi) this.lastHmiAt = this.clock.now;
    this.aranga.poll(this);
    // Только явно включённый генератор успешных чтений; частоту и команды он не воспроизводит.
    if (this.exchange.aranga && (this.aranga.lastSuccessAt === null || this.clock.now - this.aranga.lastSuccessAt >= 500)) this.aranga.receive(this, 'read');
    if (this.state !== null) {
      const thermalProfile=this.shutterTest.active||this.damperTest.active||this.fanTest.active||this.cooling.supported(this)&&this.signals.read('cooling.required')===true;
      if(thermalProfile&&(this.signals.read('emergency')!==false||!this.mainEnabled||!this.supervisionEnabled||this.signals.read('configuration.ready')!==true)){
        this.gap('Сочетание теплового инженерного профиля с аварийным входом, потерей управления или подтверждения конфигурации ещё не реализовано');
        return;
      }
      if (this.shutterTest.active && (this.signals.read('emergency') !== false ||
          (!this.shutterTest.active.coolingContext && ['pressure.before', 'pressure.after'].some(name => this.signals.read(name) === null)) ||
          !this.mainEnabled || !this.supervisionEnabled)) {
        this.gap('Сочетание проверки ШТ с аварийным входом, потерей управления или недостоверными давлениями пока вне реализованного профиля');
        return;
      }
      if (this.signals.read('grid.normal') !== true || this.signals.read('temperature.normal') !== true ||
          (this.signals.read('cooling.required') === null && this.boot.phase!=='RESTORED' || this.signals.read('cooling.required') === true && !this.cooling.supported(this)) || this.signals.read('vfd.fault') !== false ||
          this.signals.read('vfd.exchange') !== true) {
        if (this.signals.read('grid.normal') === false) this.pumps.cancelClassificationForGrid(this);
        if (this.engineering.active) {
          this.engineering.stop(this, 'Утрата общего допуска (D-201); дальнейшая защитная реакция вне профиля');
          // Снятие именно проверочных команд утверждено. Остальная реакция остаётся явным пробелом, без назначения новых выходов.
          for (const pump of [1, 2]) { this.protection.emit(this, 'pump' + pump + '.run', false); this.protection.emit(this, 'valve' + pump + '.direction', 'STOP'); }
        }
        this.gap('Полные реакции сети, температур, охлаждения или аварии/обмена ПЧ ещё не реализованы; выдача модели приостановлена');
        return;
      }
      this.protection.checkCommunication(this); // На границе таймаута нельзя сначала объявить успешный запуск.
      if (this.mainEnabled && this.state !== 'STOPPING') this.request = this.main.step(this);
      else if (this.mainEnabled) this.main.lastCycleAt = this.clock.now;
      if (this.supervisionEnabled) this.supervision.step(this);
    }
    this.protection.step(this);
  }
  advance(ms) { // ms — шаг пользователя/теста; шаг вычисления 100 мс не является требованием к реальному WB.
    if (!Number.isFinite(ms) || ms < 0 || ms > 120000) throw new Error('Шаг времени: 0–120000 мс');
    let remaining = ms; // Остаток запрошенного продвижения; при пробеле модель останавливается явно.
    while (remaining > 0 && !this.coverageGap) {
      const step = Math.min(100, remaining); // Техническая дискретность только этой модели.
      this.clock.advance(step);
      this.signals.refresh();
      this.tick();
      remaining -= step;
    }
    if (ms === 0) this.tick();
  }
  sampleGroup(name) { // name — статическая группа воздействий, никогда не вычисляемая по командам механизмам.
    const group = INPUT_GROUPS[name]; // Явный набор показаний для действия испытателя.
    if (!group) throw new Error('Неизвестная группа');
    for (const [signal, value] of Object.entries(group.values)) this.signals.set(signal, value); // signal/value — независимые тестовые показания.
    this.log('INPUT', group.label);
    this.tick();
  }
  snapshot() {
    const before = this.signals.read('pressure.before'); // Значение для показанного ΔP.
    const after = this.signals.read('pressure.after'); // Значение для показанного ΔP.
    return { time: this.clock.now, generation: this.generation, procedureId: this.procedureId, state: this.state, stateKnown: this.stateKnown,
      stoppedConfirmed: this.stoppedConfirmed(), stage: this.state === 'STOPPING' ? this.protection.stopStage : this.main.stage,
      stopReason: this.stopReason, mode: this.mode, config: this.config, manualFrequency: this.manualFrequency,
      hmiAvailable: this.hmiAvailable(), arangaAvailable: this.aranga.available(this), aranga: this.aranga.snapshot(this),
      exchange: this.exchange, mainEnabled: this.mainEnabled, supervisionEnabled: this.supervisionEnabled,
      startReasons: this.startReasons(), remoteStartReasons: this.startReasons('ARANGA'), telemetry: this.telemetry(), signals: this.signals.values, definitions: DEFINITIONS,
      requests: this.outputs.requests, outputs: this.outputs.commands,
      positions: { st: this.signals.position('st'), valve1: this.signals.position('valve1'), valve2: this.signals.position('valve2') },
      flow: this.signals.flow(), dp: before !== null && after !== null ? this.hydraulics.values(this).dp : null,
      circulation: this.circulation(), faults: this.protection.faults, pressure: this.pressure, boot: this.boot,
      needsRestartContinue: this.protection.needsRestartContinue, restartContinued: this.protection.restartContinued,
      stopIrreversible: this.protection.stopIrreversible, stBlocked: this.protection.stBlocked,
      hydraulics: { ...this.hydraulics, criterion: this.hydraulics.evaluate(this, this.state === 'STARTING') },
      selectedPump: this.selectedPump, pumpGroup: this.pumps, recovery: this.recovery, valves: this.valves, engineering: this.engineering, pumpSwitchReasons: { 1: this.pumps.reasons(this, 1), 2: this.pumps.reasons(this, 2) },
      shutterTest: this.shutterTest,
      damperTest: {...this.damperTest,raw:this.signals.read('shod.feedback'),corrected:this.damperTest.position(this)}, fanTest:this.fanTest, cooling:this.cooling, vfdGuard:this.vfdGuard,
      engineeringCycle: { ...this.engineeringCycle, current: this.engineeringCycle.current, pending: this.engineeringCycle.pending },
      bypassClosed: this.main.bypassClosed, bypassOpen: this.protection.bypassOpen,
      lastRequest: this.lastHmiRequest, coverageGap: this.coverageGap, journal: this.journal.slice(-300), groups: INPUT_GROUPS };
  }
  telemetry() {
    const actual = this.signals.get('vfd.frequency'); // Обратная связь ПЧ с самостоятельными качеством и временем.
    const reasons = this.startReasons('ARANGA'); // Готовность именно к дистанционному Пуску, D-301/D-303.
    return { state: this.state, stateKnown: this.stateKnown, mode: this.mode, ready: reasons.length === 0,
      notReadyReasons: reasons, alarm: this.protection.faults.length > 0, errors: this.protection.faults,
      pressure: { lowTrip: this.pressure.lowTrip, lowAlarm: this.pressure.lowAlarm, highAlarm: this.pressure.highAlarm,
        missingBoth: this.pressure.missingBoth, requireBoth: this.pressure.requireBoth, restartBlocked: this.pressure.restartBlocked, stopCauses: this.pressure.stopCauses },
      recoveryAfterRestart: { phase: this.boot.phase, storage: this.boot.storage, needsContinue: this.protection.needsRestartContinue && !this.protection.restartContinued },
      shutterTest: { required: this.shutterTest.required, incomplete: this.shutterTest.incomplete, result: this.shutterTest.result },
      cooling: { requested:this.signals.read('cooling.required'),lastKnownRequest:this.cooling.lastKnownRequest,phase:this.cooling.phase,blocked:this.fanTest.coolingBlocked||this.vfdGuard.blocked,reasons:this.cooling.reasons,manualClosed:!!this.cooling.manualClosed,repeatWarning:this.cooling.repeatWarning,repeatEvents:this.cooling.repeatEvents.length },
      fanTest: { ordinaryBlocked:this.fanTest.ordinaryBlocked,rangeRequired:this.fanTest.rangeRequired,result:this.fanTest.result },
      frequencyReady: this.state === 'RUNNING', frequencyCommand: this.outputs.value('vfd.frequency'),
      frequencySource: this.state === 'RUNNING' ? (this.mode === 'MANUAL' ? 'MANUAL' : this.aranga.source) : this.state === 'STOPPING' ? this.protection.frequencySource : 'FMIN_OR_INACTIVE',
      frequencyTreatment: this.frequency.last, actualFrequency: { value: this.signals.read('vfd.frequency'), quality: actual.quality, fresh: actual.fresh, updatedAt: actual.updatedAt, lastGoodAt: actual.lastGoodAt },
      hydraulicWarning: this.hydraulics.warning, flowControl: this.config.flowControl, requireFullHydraulicStartup: this.hydraulics.requireFullStartup,
      pumpGroup: { selected: this.selectedPump, switching: this.pumps.active, branches: this.pumps.branches, emergencyCirculationRequested: this.pumps.emergencyCirculationRequested },
      engineering: { enabled: this.engineering.enabled, active: this.engineering.active, results: this.engineering.results, returnRequired: this.engineering.returnRequired, breakerOffRequired: this.engineering.breakerOffRequired },
      arangaWarning: this.mode === 'ARANGA' && this.state === 'RUNNING' && !this.aranga.available(this), hmiWarning: !this.hmiAvailable() };
  }
}
