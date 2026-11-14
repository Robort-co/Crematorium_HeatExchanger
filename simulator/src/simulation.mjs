import { DEFINITIONS, ManualClock, SignalStore } from './signals.mjs';
import { SimulatedOutputs } from './io.mjs';
import { MainProgram } from './main-program.mjs';
import { Protection } from './protection.mjs';
import { FrequencyPolicy } from './frequency.mjs';
import { Supervision } from './supervision.mjs';
import { ArangaExchange } from './aranga.mjs';
import { PumpGroup } from './pumps.mjs';
import { HydraulicControl } from './hydraulics.mjs';

// Явные тестовые воздействия. Числа 1,5/2 бар и 8 м³/ч — образцы, НЕ новые проектные уставки.
export const INPUT_GROUPS = {
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
    this.selectedPump = 1; // Начальный выбор тестового профиля; после успешной смены изменяется.
    this.signals = new SignalStore(this.clock); // Отдельный поставщик измерений.
    this.outputs = new SimulatedOutputs(this.clock, this.log.bind(this), () => this.signals.revision); // Только виртуальный транспорт.
    this.main = new MainProgram(); // Основная последовательность без права выдачи.
    this.hydraulics = new HydraulicControl(); // Матрица пусковых/рабочих критериев без подстановки отсутствующих Q/ΔP.
    this.pumps = new PumpGroup(); // Подпоследовательность насосов без права выдачи выходов.
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
    this.request = { 'pump1.run': false, 'pump2.run': false,
      'valve1.direction': 'STOP', 'valve2.direction': 'STOP',
      'st.direction': 'STOP', 'st.power': true, 'vfd.enable': false, 'vfd.run': 'STOP', 'vfd.frequency': 20 };
    // Команды исходной точки — часть тестовых данных о прошлом, а не результат Пуска.
    for (const [name, value] of Object.entries(this.request)) { // name/value — сохранённая виртуальная команда.
      this.outputs.commands[name] = { id: ++this.outputs.sequence, value, issuedAt: this.clock.now,
        delivery: 'ACCEPTED', deliveredAt: this.clock.now, origin: 'TEST_FIXTURE', issuedInputRevision: -1, deliveryInputRevision: -1 };
    }
    this.transition('STOPPED', 'Загружена искусственная исходная точка: холодный ТО, насосы и ПЧ остановлены');
    this.log('ASSUMPTION', 'Профиль: частотные настройки/тесты подтверждены, резонанс не выявлен, температуры и сеть нормальны. Это данные имитатора, не оборудования');
    this.tick();
  }
  restart() {
    const savedFaults = this.protection.faults.map(item => ({ ...item })); // Для демонстрации не теряем известные ошибки в памяти процесса.
    const savedStBlock = this.protection.stBlocked; // Существующая блокировка не снимается перезапуском модели.
    const savedMode = this.mode; // Демонстрация сохранённого выбора в памяти процесса, не NV-хранилище WB.
    const savedManualFrequency = this.manualFrequency; // D-267/D-291: перезапуск не заменяет известное ручное задание умолчанием.
    const savedFlowControl = this.config.flowControl; // Действующий флаг в памяти процесса, не сброс к ON при перезапуске.
    const savedFullStartup = this.hydraulics.requireFullStartup; // D-167: требование полной проверки не теряется в демонстрации reboot.
    const savedBranches = structuredClone(this.pumps.branches); // Только память текущего процесса, не реальное NV.
    const savedGroupFault = this.pumps.groupFault; // Перезапуск не снимает критическую неисправность группы.
    this.resetRuntime();
    this.config.flowControl = savedFlowControl;
    this.hydraulics.requireFullStartup = savedFullStartup;
    this.pumps.branches = savedBranches;
    this.pumps.groupFault = savedGroupFault;
    for (const branch of Object.values(this.pumps.branches)) { // branch — сохраняемые ошибки; временные подтверждения отменяются.
      branch.classificationAt = null; branch.manualClosed = false; branch.isolationConfirmed = false;
    }
    this.protection.faults = savedFaults;
    this.protection.stBlocked = savedStBlock;
    this.mode = savedMode;
    this.manualFrequency = savedManualFrequency;
    this.log('RESTART', 'Достоверного восстановления нет: состояние и выходы неизвестны. Реальная NV-процедура не реализована');
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
    const stop = this.outputs.commands['vfd.run']; // Нужна принятая запись STOP, а не только низкая частота.
    return this.state === 'STOPPED' && [1, 2].every(pump => this.outputs.value('pump' + pump + '.run') === false && this.signals.phases(pump)?.every(value => value === false) &&
      ['l1', 'l2', 'l3'].every(phase => this.signals.get('pump' + pump + '.' + phase).lastGoodRevision > this.outputs.commands['pump' + pump + '.run']?.issuedInputRevision)) &&
      stop?.value === 'STOP' && stop.delivery === 'ACCEPTED' && this.signals.read('vfd.running') === false &&
      this.signals.get('vfd.running').lastGoodRevision > stop.deliveryInputRevision;
  }
  startReasons(source = 'HMI') { // source — источник нового Пуска; готовность для HMI и ARANGA различается.
    const reasons = []; // Все выявленные причины запрета, без очереди отложенного Пуска.
    if (this.state !== 'STOPPED' || !this.stateKnown) reasons.push('Нет подтверждённого программного состояния Остановлен');
    if (!this.stoppedConfirmed()) reasons.push('Не подтверждены останов ПЧ и отсутствие напряжения насосов');
    if (!this.hmiAvailable()) reasons.push('Нет обмена с управляющей HMI');
    for (const name of ['grid.normal', 'temperature.normal', 'configuration.ready', 'vfd.exchange']) { // name — обязательная предпосылка первого сценария.
      if (this.signals.read(name) !== true) reasons.push('Не подтверждено: ' + DEFINITIONS[name][0]);
    }
    if (this.signals.read('vfd.fault') !== false || this.signals.read('emergency') !== false) reasons.push('Нет подтверждения отсутствия аварии/нажатия кнопки');
    if (this.signals.read('cooling.required') !== false) reasons.push('Профиль v0.1 не реализует самостоятельное охлаждение');
    for (const name of ['pressure.before', 'pressure.after']) { // name — оба обязательных для нового пуска датчика.
      const pressure = this.signals.read(name); // Измеренное давление, бар, либо null.
      if (pressure === null || pressure < 0.8 || pressure > 2.8) reasons.push('Давление не разрешает пуск: ' + name);
    }
    if (this.protection.faults.length || this.protection.stBlocked) reasons.push('Сохраняются неисправности/блокировки');
    if (Object.values(this.pumps.branches).some(branch => branch.exclusions.length)) reasons.push('Не возвращена исключённая для проверки насосная ветвь (D-167)');
    if (this.coverageGap) reasons.push('Модель на паузе вне реализованной области');
    if (source === 'HMI' && this.mode !== 'MANUAL') reasons.push('Сквозной режим: новый Пуск только от ARANGA');
    if (source === 'ARANGA' && this.mode !== 'ARANGA') reasons.push('Ручной режим');
    if (source === 'ARANGA' && !this.aranga.available(this)) reasons.push('Нет успешного обмена ARANGA');
    if (this.aranga.stopLevel === true) reasons.push('Принята команда Стоп ARANGA=1; требуется её снятие (D-299)');
    return reasons;
  }
  beginStart(source) { // source — уже проверенный источник команды; подготовка механизмов общая.
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
    else if (action === 'start') {
      record.reasons = this.startReasons();
      if (!record.reasons.length) { this.beginStart('HMI'); record.result = 'ACCEPTED'; }
    } else if (action === 'switch_pump') {
      record.reasons = this.state === 'RUNNING' || (this.state === 'STARTING' && this.main.stage === 'CIRCULATION') ? this.pumps.begin(this, value) : ['Ручная смена доступна в работе или при гидравлической проверке подготовки (D-031)'];
      if (!record.reasons.length) record.result = 'ACCEPTED';
    } else if (action === 'confirm_valve_closed') {
      record.reasons = this.pumps.confirmClosed(this, value);
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
      record.result = this.protection.beginStop(this, 'Стоп HMI, обязательный с принятия (D-264)') ? 'ACCEPTED' : 'NO_CHANGE';
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
      if (this.signals.read('grid.normal') !== true || this.signals.read('temperature.normal') !== true ||
          this.signals.read('cooling.required') !== false || this.signals.read('vfd.fault') !== false ||
          this.signals.read('vfd.exchange') !== true) {
        if (this.signals.read('grid.normal') === false) this.pumps.cancelClassificationForGrid(this);
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
      circulation: this.circulation(), faults: this.protection.faults, stBlocked: this.protection.stBlocked,
      hydraulics: { ...this.hydraulics, criterion: this.hydraulics.evaluate(this, this.state === 'STARTING') },
      selectedPump: this.selectedPump, pumpGroup: this.pumps, pumpSwitchReasons: { 1: this.pumps.reasons(this, 1), 2: this.pumps.reasons(this, 2) },
      bypassClosed: this.main.bypassClosed, bypassOpen: this.protection.bypassOpen,
      lastRequest: this.lastHmiRequest, coverageGap: this.coverageGap, journal: this.journal.slice(-300), groups: INPUT_GROUPS };
  }
  telemetry() {
    const actual = this.signals.get('vfd.frequency'); // Обратная связь ПЧ с самостоятельными качеством и временем.
    const reasons = this.startReasons('ARANGA'); // Готовность именно к дистанционному Пуску, D-301/D-303.
    return { state: this.state, stateKnown: this.stateKnown, mode: this.mode, ready: reasons.length === 0,
      notReadyReasons: reasons, alarm: this.protection.faults.length > 0, errors: this.protection.faults,
      frequencyReady: this.state === 'RUNNING', frequencyCommand: this.outputs.value('vfd.frequency'),
      frequencySource: this.state === 'RUNNING' ? (this.mode === 'MANUAL' ? 'MANUAL' : this.aranga.source) : this.state === 'STOPPING' ? this.protection.frequencySource : 'FMIN_OR_INACTIVE',
      frequencyTreatment: this.frequency.last, actualFrequency: { value: this.signals.read('vfd.frequency'), quality: actual.quality, fresh: actual.fresh, updatedAt: actual.updatedAt, lastGoodAt: actual.lastGoodAt },
      hydraulicWarning: this.hydraulics.warning, flowControl: this.config.flowControl, requireFullHydraulicStartup: this.hydraulics.requireFullStartup,
      pumpGroup: { selected: this.selectedPump, switching: this.pumps.active, branches: this.pumps.branches, emergencyCirculationRequested: this.pumps.emergencyCirculationRequested },
      arangaWarning: this.mode === 'ARANGA' && this.state === 'RUNNING' && !this.aranga.available(this), hmiWarning: !this.hmiAvailable() };
  }
}
