// Клиент показывает серверное состояние. Никакие команды к механизмам из браузера не отправляются.
let snapshot = null; // Последний снимок тестового мира с поколением для защиты от старых команд.
let busy = false; // Не допускаем одновременные действия одного клиента.
let renderedMode = null; // Последний показанный режим: при переходе на ручной поле получает фактически выданное задание D-267.
let renderedGeneration = null; // Новая фикстура/перезапуск не оставляет значение поля от прежнего тестового мира.
const sourceLabels = { MANUAL: 'Ручное HMI', FMIN: 'Fmin до первой записи', ARANGA: 'ARANGA', HOLD: 'Удержание после потери ARANGA', LOCAL: 'Местная корректировка', STOP_COOLING: 'Останов: частота охлаждения', STOP_ARANGA: 'Прерванный запуск: новая запись ARANGA', STARTUP_LINK_FALLBACK: 'Прерванный запуск: аварийная частота', FMIN_OR_INACTIVE: 'Запуск / вне рабочего управления' }; // Источник задания отличается от наличия связи.
const stateLabels = { STOPPED: 'Остановлен', STARTING: 'Запуск', RUNNING: 'В работе', STOPPING: 'Останов' }; // Четыре основных состояния; null отображается отдельно.
const stageLabels = { IDLE: 'Исходная точка', OPEN_ST: 'Открытие ШТ', CLOSE_VALVES: 'Закрытие обоих затворов', PUMP_ON: 'Включение насоса', OPEN_VALVE: 'Открытие рабочей ветви', CIRCULATION: 'Проверка циркуляции / ШБ', COMPLETE: 'Процедура завершена', WAIT_BYPASS: 'Ожидание открытия ШБ', CLOSE_ST: 'Закрытие ШТ', CLOSE_PUMP: 'Закрытие рабочего затвора', FINAL_OUTPUTS: 'Команды положений останова' }; // Названия подэтапов, не дополнительных состояний ТО.
const positionLabels = { OPEN: 'Открыт', CLOSED: 'Закрыт', UNKNOWN: 'Нет данных', CONTRADICTORY: 'Противоречие 1/1', INTERMEDIATE: 'Положение не подтверждено' }; // Значения только по входам.
const element = id => document.getElementById(id); // id — идентификатор элемента HMI.
const text = value => value === null || value === undefined ? 'Нет данных' : typeof value === 'boolean' ? (value ? '1' : '0') : String(value); // value — отображаемое значение без подмены null нулём.
const seconds = value => value === null ? '—' : (value / 1000).toFixed(1); // value — модельное время в мс.
const escaped = value => text(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); // value — текст из данных, не HTML.

async function act(data) { // data — одно действие из разрешённого сервером списка.
  if (busy || !snapshot) return;
  busy = true;
  try {
    const response = await fetch('/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, generation: snapshot.generation, procedureId: snapshot.procedureId }) }); // Ответ сервера; старый контекст нельзя применить к новой процедуре.
    const result = await response.json(); // Новый снимок или явная ошибка; автоматического повтора команды нет.
    if (!response.ok) throw new Error(result.error);
    snapshot = result;
    element('error').hidden = true;
    render();
  } catch (error) { // error — ошибка запроса; состояние не объявляем изменённым.
    element('error').textContent = error.message;
    element('error').hidden = false;
  } finally { busy = false; }
}

function feedback(name) { // name — функция выхода; результат берётся только из независимых входов.
  if (name === 'shod.voltage') return text(snapshot.damperTest.raw) + ' В; положение ' + (snapshot.damperTest.corrected === null ? 'Нет данных' : Math.max(0, Math.min(100, snapshot.damperTest.corrected)).toFixed(1) + '%');
  if (name.startsWith('st.')) return positionLabels[snapshot.positions.st];
  if (name.startsWith('valve')) return positionLabels[snapshot.positions[name.split('.')[0]]];
  if (name.startsWith('pump')) {
    const pump = name.split('.')[0]; // Имя насосной ветви.
    return ['l1', 'l2', 'l3'].map(phase => { // phase — один отдельный фазный вход.
      const sample = snapshot.signals[pump + '.' + phase]; // Состояние и качество контакта.
      return sample.quality === 'GOOD' && sample.fresh ? text(sample.value) : '?';
    }).join(' / ');
  }
  const sample = snapshot.signals[name === 'vfd.frequency' ? 'vfd.frequency' : 'vfd.running']; // Фактический статус/частота ПЧ.
  return sample.quality === 'GOOD' && sample.fresh ? text(sample.value) : 'Нет данных';
}

function render() {
  renderEngineering();
  renderThermalTests();
  const group = snapshot.pumpGroup; // Состояние группы отдельно от отдельных выходов и входов.
  const operation = group.active; // Уже принятая смена, не новый запрос при каждом обновлении HMI.
  element('flow-control').checked = snapshot.config.flowControl;
  element('flow-control').disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap || snapshot.state === null;
  element('hydraulic-criterion').textContent = 'Критерий: ' + snapshot.hydraulics.criterion.mode + ' · ' + snapshot.hydraulics.criterion.state + (snapshot.hydraulics.requireFullStartup ? ' · Следующий успешный пуск обязательно проверяет Q и ΔP' : '');
  element('hydraulic-warning').hidden = !snapshot.hydraulics.warning;
  element('hydraulic-warning').textContent = snapshot.hydraulics.warning ?? '';
  element('pump-state').textContent = 'Выбран насос ' + snapshot.selectedPump + (operation ? ' · Смена ' + operation.from + ' → ' + operation.to + ' · ' + operation.stage : '') + (group.groupFault ? ' · Критическая неисправность группы; запрошена внешняя циркуляция' : '');
  if (snapshot.recovery.active) element('pump-state').textContent += ' · Специальное восстановление: ' + snapshot.recovery.active.stage;
  element('pump-branches').innerHTML = [1, 2].map(pump => { // pump — номер отображаемой ветви.
    const branch = group.branches[pump]; // Ошибки, блокировки и ручное положение не смешиваются с DI.
    return '<div class="mechanism"><b>Насос ' + pump + '</b>Команда: ' + escaped(snapshot.outputs['pump' + pump + '.run']?.value) + '<br>Фазы: ' + escaped(feedback('pump' + pump + '.run')) + '<br>Исключение: ' + escaped([...branch.faults, ...branch.exclusions].join(', ') || 'нет') + '<br>Движение привода заблокировано: ' + text(branch.valveBlocked || (branch.electricalIsolation && !branch.isolationConfirmed)) + '<br>Закрытие подтверждено вручную: ' + text(branch.manualClosed) + '</div>';
  }).join('');
  const waiting = operation?.manualRequestedAt !== null && operation?.manualRequestedAt !== undefined; // Непрерывный отсчёт хранится сервером, не браузером.
  element('pump-wait').hidden = !waiting;
  element('pump-wait').textContent = waiting ? 'Затвор ' + operation.from + ': движение снято. Отключить автомат привода, закрыть вручную и проверить. До обязательного останова: ' + Math.max(0, (60000 - snapshot.time + operation.manualRequestedAt) / 1000).toFixed(1) + ' с.' : '';
  for (const pump of [1, 2]) { // pump — команды строго одной ветви.
    element('switch-pump-' + pump).disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap || !(snapshot.state === 'RUNNING' || (snapshot.state === 'STARTING' && snapshot.stage === 'CIRCULATION')) || snapshot.pumpSwitchReasons[pump].length > 0;
    element('switch-pump-' + pump).title = snapshot.pumpSwitchReasons[pump].join('; ');
    element('confirm-valve-' + pump).hidden = !((waiting && operation.from === pump) || (snapshot.valves.waits[pump]?.target === 'CLOSED' && !snapshot.valves.waits[pump].suspended));
    element('confirm-valve-' + pump).disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap;
    element('confirm-breaker-' + pump).hidden = !group.branches[pump].electricalIsolation || group.branches[pump].isolationConfirmed;
    element('confirm-breaker-' + pump).disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap;
  }
  element('state').textContent = stateLabels[snapshot.state] ?? 'Неизвестно после загрузки';
  const pressure = snapshot.pressure;
  element('pressure-state').textContent = 'Давление: запрет насосов — ' + text(pressure.lowTrip || pressure.missingBoth || pressure.requireBoth) +
    '; сигнализация низкого/высокого — ' + text(pressure.lowAlarm) + '/' + text(pressure.highAlarm) +
    '; блокировка после останова — ' + text(pressure.restartBlocked) + (pressure.resumeReasons.length ? '. Возобновление: ' + pressure.resumeReasons.join('; ') : '');
  element('boot-state').textContent = snapshot.boot.phase === 'INACTIVE' ? 'Перезапуск в этом тестовом мире не выполнялся.' :
    'Имитация памяти, не реальная NV. Восстановление: ' + snapshot.boot.phase + (snapshot.boot.reasons.length ? ' · ' + snapshot.boot.reasons.join('; ') : '');
  element('reset-pressure').disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap || !pressure.restartBlocked || !snapshot.stoppedConfirmed;
  element('continue-restart').hidden = !snapshot.needsRestartContinue || snapshot.restartContinued || snapshot.state !== 'STOPPING';
  element('continue-restart').disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap || !snapshot.bypassOpen;
  element('stage').textContent = stageLabels[snapshot.stage] ?? snapshot.stage;
  element('time').textContent = seconds(snapshot.time) + ' с';
  element('physical').textContent = snapshot.stoppedConfirmed ? 'Подтверждён входами' : 'Не подтверждён';
  element('physical').className = snapshot.stoppedConfirmed ? 'ok' : 'warning';
  element('gap').hidden = !snapshot.coverageGap;
  element('gap').textContent = 'ПАУЗА МОДЕЛИ: ' + (snapshot.coverageGap ?? '') + '. Состояние исполнения выходов за этой границей не моделируется. Для нового прогона загрузите исходную точку.';
  element('start').disabled = snapshot.startReasons.length > 0;
  element('stop').disabled = !snapshot.hmiAvailable || (!['STARTING', 'RUNNING'].includes(snapshot.state) && !(snapshot.state === 'STOPPING' && !snapshot.stopIrreversible)) || !!snapshot.coverageGap;
  const canSetFrequency = snapshot.state === 'RUNNING' && snapshot.hmiAvailable && !snapshot.coverageGap && (snapshot.mode === 'MANUAL' || snapshot.aranga.holding); // Местная корректировка не отбирает нормальное сквозное управление.
  element('set-frequency').disabled = !canSetFrequency;
  element('frequency-minus').disabled = !canSetFrequency;
  element('frequency-plus').disabled = !canSetFrequency;
  element('mode').value = snapshot.mode;
  element('set-mode').disabled = !snapshot.hmiAvailable || !!snapshot.coverageGap || !['STOPPED', 'RUNNING'].includes(snapshot.state);
  element('mode').disabled = element('set-mode').disabled;
  element('frequency-source').textContent = sourceLabels[snapshot.telemetry.frequencySource] ?? snapshot.telemetry.frequencySource;
  if (renderedMode !== snapshot.mode || renderedGeneration !== snapshot.generation) {
    element('frequency').value = snapshot.mode === 'MANUAL' ? snapshot.manualFrequency : (snapshot.aranga.activeFrequency ?? snapshot.config.fmin);
    renderedMode = snapshot.mode;
    renderedGeneration = snapshot.generation;
  }
  element('bypass-closed').disabled = snapshot.state !== 'STARTING' || snapshot.stage === 'OPEN_ST' || !snapshot.hmiAvailable;
  element('bypass-open').disabled = snapshot.state !== 'STOPPING' || !snapshot.hmiAvailable || snapshot.stage !== 'WAIT_BYPASS';
  element('st-manual').disabled = snapshot.state !== 'STOPPING' || !snapshot.stBlocked || !snapshot.bypassOpen || !snapshot.hmiAvailable;
  element('reasons').innerHTML = snapshot.startReasons.map(reason => '<li>' + escaped(reason) + '</li>').join('') || '<li>Новый ручной пуск разрешён в рамках тестового профиля.</li>';
  element('last-request').textContent = snapshot.lastRequest ? 'Запрос #' + snapshot.lastRequest.id + ' ' + snapshot.lastRequest.action + ': ' + snapshot.lastRequest.result + '. ' + snapshot.lastRequest.reasons.join('; ') : 'Запросов оператора ещё нет.';
  element('mechanisms').innerHTML = ['st', 'valve1', 'valve2'].map(name => '<div class="mechanism"><b>' + ({ st: 'ШТ', valve1: 'Затвор насоса 1', valve2: 'Затвор насоса 2' })[name] + '</b>' + escaped(positionLabels[snapshot.positions[name]]) + '<span><br>Команда: ' + escaped(snapshot.outputs[name + '.direction']?.value) + '</span></div>').join('') + '<div class="mechanism"><b>Дымосос / ПЧ</b>Работа: ' + escaped(feedback('vfd.run')) + '<span><br>Задание: ' + escaped(snapshot.outputs['vfd.frequency']?.value) + ' Гц · фактически: ' + escaped(feedback('vfd.frequency')) + ' Гц</span></div>';
  element('flow').textContent = snapshot.flow.value === null ? 'Нет данных' : snapshot.flow.value.toFixed(2) + (snapshot.flow.held ? ' (удерж.)' : '');
  element('dp').textContent = snapshot.dp === null ? 'Нет данных' : snapshot.dp.toFixed(2);
  element('circulation').textContent = ({ NORMAL: 'Подтверждена', DISAGREEMENT: 'Расхождение Q/ΔP', BOTH_LOW: 'Q и ΔP ниже', DP_ONLY_NORMAL: 'Только ΔP в норме', DP_ONLY_LOW: 'Только ΔP ниже', UNKNOWN: 'Нет данных' })[snapshot.circulation];
  element('exchange-hmi').checked = snapshot.exchange.hmi;
  element('exchange-aranga').checked = snapshot.exchange.aranga;
  element('aranga-link').textContent = snapshot.arangaAvailable ? 'Связь есть' : 'Связи нет';
  element('aranga-link').className = snapshot.arangaAvailable ? 'ok' : 'warning';
  element('aranga-held').textContent = snapshot.aranga.holding ? 'Удержание: возврат только по новой записи частоты' : 'Удержание не активно';
  element('aranga-ready').textContent = snapshot.telemetry.ready ? 'Готов к дистанционному Пуску' : 'Не готов: ' + snapshot.remoteStartReasons.join('; ');
  element('aranga-levels').textContent = 'Последние уровни: Пуск=' + text(snapshot.aranga.startLevel) + ', Стоп=' + text(snapshot.aranga.stopLevel) + '. ' + (snapshot.aranga.startArmed ? 'Пуск=0 получен; ожидается фронт.' : 'Для нового Пуска требуется 0 → 1.');
  element('aranga-times').textContent = 'Последняя попытка / успех: ' + seconds(snapshot.aranga.lastAttemptAt) + ' / ' + seconds(snapshot.aranga.lastSuccessAt) + ' с. Частота: ' + text(snapshot.aranga.frequencyValue) + ' Гц; качество последней записи ' + snapshot.aranga.frequencyQuality + '; обновлена / достоверна: ' + seconds(snapshot.aranga.frequencyUpdatedAt) + ' / ' + seconds(snapshot.aranga.frequencyGoodAt) + ' с.';
  element('aranga-result').textContent = snapshot.aranga.lastRequest ? snapshot.aranga.lastRequest.operation + ': ' + snapshot.aranga.lastRequest.result + '. ' + snapshot.aranga.lastRequest.reasons.join('; ') : 'Операций пока нет.';
  element('frequency-limits').textContent = snapshot.telemetry.frequencyTreatment ? 'LIMIT: ' + text(snapshot.telemetry.frequencyTreatment.limitApplied) + '; обход резонанса: ' + text(snapshot.telemetry.frequencyTreatment.resonanceApplied) : 'Обработка частоты ещё не выполнялась.';
  element('link-warning').hidden = !snapshot.telemetry.arangaWarning && !snapshot.telemetry.hmiWarning;
  element('link-warning').textContent = [snapshot.telemetry.arangaWarning ? 'Нет обмена с ARANGA: рабочее задание удерживается.' : '', snapshot.telemetry.hmiWarning ? 'Нет доступной управляющей HMI: местные команды недоступны.' : ''].filter(Boolean).join(' ');
  element('service-main').checked = snapshot.mainEnabled;
  element('service-supervision').checked = snapshot.supervisionEnabled;
  element('outputs').innerHTML = Object.entries(snapshot.outputs).map(([name, command]) => '<tr><td>' + escaped(name) + '</td><td>' + escaped(snapshot.requests[name]) + '</td><td>' + escaped(command.value) + '<small>#' + command.id + ' · ' + seconds(command.issuedAt) + ' с</small></td><td>' + escaped(command.delivery) + '<small>' + seconds(command.deliveredAt) + ' с</small><button data-fail="' + name + '" data-id="' + command.id + '">Ошибка доставки</button></td><td>' + escaped(feedback(name)) + '</td></tr>').join('');
  element('outputs').querySelectorAll('[data-fail]').forEach(button => { // button — явная имитация отказа транспорта выбранной команды.
    button.onclick = () => act({ type: 'deliver', name: button.dataset.fail, id: Number(button.dataset.id), success: false });
  });
  element('signals').innerHTML = Object.entries(snapshot.signals).map(([name, sample]) => {
    const definition = snapshot.definitions[name]; // Название, тип и единицы конкретного входа.
    const input = definition[1] === 'bool' ? '<select class="value"><option value="true"' + (sample.value === true ? ' selected' : '') + '>1</option><option value="false"' + (sample.value === false ? ' selected' : '') + '>0</option><option value="null"' + (sample.value === null ? ' selected' : '') + '>Нет данных</option></select>' : '<input class="value" type="number" step="any" value="' + (sample.value ?? '') + '" placeholder="Нет данных">'; // Поле редактирования без автоматического применения.
    return '<tr data-name="' + name + '"><td>' + escaped(definition[0]) + '<small>' + name + (definition[2] ? ', ' + definition[2] : '') + '</small></td><td>' + input + '</td><td><select class="quality">' + ['GOOD', 'BAD', 'UNKNOWN'].map(quality => '<option' + (sample.quality === quality ? ' selected' : '') + '>' + quality + '</option>').join('') + '</select></td><td><input class="fresh" type="checkbox"' + (sample.fresh ? ' checked' : '') + '></td><td><input class="repeat" type="checkbox"' + (sample.repeat ? ' checked' : '') + '></td><td>' + seconds(sample.updatedAt) + ' / ' + seconds(sample.lastGoodAt) + '<small>Последнее достоверное: ' + escaped(sample.lastGoodValue) + '</small></td><td><button class="apply">Применить</button></td></tr>';
  }).join('');
  element('signals').querySelectorAll('tr').forEach(row => { // row — редактор одного независимого входа.
    row.querySelector('.apply').onclick = () => {
      const raw = row.querySelector('.value').value; // Строка формы до проверки типа.
      const value = snapshot.definitions[row.dataset.name][1] === 'bool' ? JSON.parse(raw) : raw === '' ? null : Number(raw); // Нормализованное значение либо null.
      act({ type: 'signal', name: row.dataset.name, value, quality: row.querySelector('.quality').value, fresh: row.querySelector('.fresh').checked, repeat: row.querySelector('.repeat').checked });
    };
  });
  element('faults').textContent = snapshot.faults.map(fault => fault.text + ' [' + fault.evidence + ']').join(' • ');
  element('journal').innerHTML = [...snapshot.journal].reverse().map(event => '<div><time>' + seconds(event.at) + '</time><b>' + escaped(event.kind) + '</b>' + escaped(event.message) + '</div>').join('');
}

function renderEngineering() {
  const blocked = !snapshot.hmiAvailable || !!snapshot.coverageGap;
  const engineering = snapshot.engineering; // Состояние серверного сеанса; обновление окна не запускает тест заново.
  const shutter = snapshot.shutterTest, cycle = snapshot.engineeringCycle;
  const engineeringBusy = !!engineering.active || !!shutter.active || !!snapshot.damperTest.active || !!snapshot.fanTest.active;
  element('st-test-state').textContent = (shutter.active ? 'Этап ШТ: ' + shutter.active.stage : shutter.result ? shutter.result.reason : 'ШТ ещё не проверен') + (shutter.required ? ' · Полный тест обязателен перед Пуском.' : '');
  element('st-test-start').disabled = blocked || !engineering.enabled || engineeringBusy || cycle.pending;
  element('st-restore-power').disabled = blocked || engineeringBusy || !snapshot.stBlocked;
  element('st-release-set').disabled = blocked || !engineering.enabled || engineeringBusy;
  if (document.activeElement !== element('st-release-time')) element('st-release-time').value = snapshot.config.stReleaseSeconds;
  const names = { BRANCH_1: 'Ветвь 1', BRANCH_2: 'Ветвь 2', ST: 'ШТ', SHOD: 'ШОД', FAN: 'Дымосос' };
  const phases = { IDLE: 'Не начат', WAITING: 'Ожидает отдельного продолжения', ACTIVE: 'Выполняется тест', COMPLETE: 'Список завершён; результаты ниже', CANCELLED: 'Отменён' };
  element('engineering-cycle-state').textContent = (phases[cycle.phase] ?? cycle.phase) + (cycle.current ? ' · ' + names[cycle.running?.key ?? cycle.current] : '');
  element('engineering-cycle-results').textContent = Object.entries(cycle.results).map(([key,result]) => names[key] + ': ' + ({PASSED:'Пройдено',FAILED:'Не пройдено',NOT_CHECKED:'Не проверено'}[result.result] ?? result.result) + ' — ' + result.reason).join('; ');
  element('engineering-cycle-begin').disabled = blocked || !engineering.enabled || engineeringBusy || cycle.pending;
  element('engineering-cycle-continue').disabled = blocked || !engineering.enabled || cycle.phase !== 'WAITING';
  element('engineering-cycle-skip').disabled = blocked || !engineering.enabled || cycle.phase !== 'WAITING';
  element('engineering-cycle-cancel').disabled = blocked || !cycle.pending;
  element('engineering-cycle-repeat').disabled = blocked || !engineering.enabled || engineeringBusy || !['WAITING','COMPLETE','CANCELLED'].includes(cycle.phase);
  const labels = { PASSED: 'Пройдено', FAILED: 'Не пройдено', NOT_CHECKED: 'Не проверено' };
  const stages = { PREPARE_OPEN: 'Подготовительное открытие', PREPARE_CLOSED: 'Подготовительное закрытие', CLOSE: 'Проверочное закрытие', BREAK_OPEN: 'Команда снята, подготовка открытия', BREAK_CLOSE: 'Команда снята, подготовка закрытия', OPEN: 'Проверочное открытие', PUMP_ON: 'Включение насоса / задержка 1 с', HYDRAULICS: 'Открытие подтверждено, оценка Q и ΔP через 5 с', WAIT_OFF: 'Ожидание нового подтверждения выключения' };
  element('engineering-state').textContent = engineering.enabled ? (shutter.active ? 'ШТ · ' + (stages[shutter.active.stage] ?? shutter.active.stage) : engineering.active ? 'Ветвь ' + engineering.active.pump + ' · ' + (stages[engineering.active.stage] ?? engineering.active.stage) : snapshot.damperTest.active ? 'Проверка ШОД' : snapshot.fanTest.active ? 'Проверка дымососа' : 'Инженерный режим. Активных проверок нет.') : 'Инженерный режим выключен.';
  element('engineering-enter').disabled = blocked || engineering.enabled || snapshot.state !== 'STOPPED';
  element('engineering-leave').disabled = blocked || !engineering.enabled || engineeringBusy || cycle.pending;
  element('engineering-stop').disabled = blocked || !engineeringBusy;
  element('reset-flow').disabled = blocked || !snapshot.stoppedConfirmed;
  element('engineering-branches').innerHTML = [1, 2].map(pump => {
    const results = engineering.results[pump];
    return '<div class="mechanism"><b>Ветвь ' + pump + '</b>' + ['valve', 'pump'].map(kind => {
      const result = results[kind];
      return '<p>' + (kind === 'valve' ? 'Затвор: ' : 'Насос: ') + (result ? escaped(labels[result.result]) + ' · ' + escaped(result.reason) + '<br>Основание возврата: ' + (result.valid ? 'действует' : 'нет') : 'не проверен') + '</p>';
    }).join('') + (engineering.returnRequired[pump] ? '<p class="warning">Проверить и подтвердить полное открытие нижнего ручного крана.</p>' : '') + (engineering.breakerOffRequired[pump] ? '<p class="warning">Отключить отдельный автомат привода затвора и проверить на месте.</p>' : '') + '</div>';
  }).join('');
  const actions = []; // Каждое действие дополнительно проверяется сервером при исполнении.
  for (const pump of [1, 2]) {
    actions.push({ label: 'Проверить насос и затвор ветви ' + pump, action: 'engineering_test', value: { kind: 'branch', pump }, repair: true, disabled: !engineering.enabled || !!engineering.active });
    for (const kind of ['valve', 'pump']) {
      actions.push({ label: 'Проверить ' + (kind === 'valve' ? 'затвор ' : 'насос ') + pump, action: 'engineering_test', value: { kind, pump }, repair: true, disabled: !engineering.enabled || !!engineering.active });
      actions.push({ label: 'Вернуть ' + (kind === 'valve' ? 'затвор ' : 'насос ') + pump, action: 'engineering_return', value: { kind, pump }, disabled: !engineering.enabled || !!engineering.active || !engineering.results[pump][kind]?.valid });
    }
    actions.push({ label: 'Запросить изоляцию нижним краном ветви ' + pump, action: 'engineering_isolate', value: pump, disabled: !engineering.enabled || !!engineering.active });
    if (engineering.manualIsolation?.pump === pump && !engineering.manualIsolation.confirmed) actions.push({ label: 'Нижний кран ' + pump + ' закрыт и проверен', action: 'engineering_confirm_isolation', value: pump });
    if (engineering.returnRequired[pump]) actions.push({ label: 'Нижний кран ' + pump + ' открыт и проверен', action: 'engineering_confirm_return', value: pump, disabled: !!engineering.active });
    if (engineering.breakerOffRequired[pump]) actions.push({ label: 'Автомат привода ' + pump + ' отключён, проверено', action: 'engineering_breaker_off', value: pump });
    if (snapshot.faults.some(fault => fault.code === 'VOLTAGE_WHEN_OFF_' + pump)) actions.push({ label: 'Отдельный сброс критической аварии насоса ' + pump, action: 'engineering_reset_voltage', value: pump, disabled: !engineering.enabled });
  }
  if (snapshot.pumpGroup.groupFault) actions.push({ label: 'Отдельно сбросить аварию насосной группы', action: 'reset_pump_group', value: true, disabled: engineering.enabled || !snapshot.stoppedConfirmed });
  element('engineering-actions').innerHTML = actions.map((action, index) => '<button data-engineering="' + index + '"' + (blocked || action.disabled || !!shutter.active || !!snapshot.damperTest.active || !!snapshot.fanTest.active || (cycle.pending && action.action === 'engineering_test') ? ' disabled' : '') + '>' + escaped(action.label) + '</button>').join('');
  element('engineering-actions').querySelectorAll('button').forEach(button => {
    const action = actions[Number(button.dataset.engineering)];
    button.onclick = () => act({ type: 'command', action: action.action, value: action.repair ? { ...action.value, repaired: element('engineering-repaired').checked } : action.value });
  });
  element('valve-waits').innerHTML = Object.entries(snapshot.valves.waits).map(([pump, wait]) => '<span>Затвор ' + pump + ': ' + escaped(wait.target === 'OPEN' ? 'проверить открытие' : 'закрыть и проверить') + (wait.remaining === null ? ' · таймаут не назначен' : ', осталось ' + seconds(wait.remaining) + ' с') + (wait.suspended ? ' · сохранено до актуального задания текущего этапа' : '') + '</span>' + (wait.target === 'OPEN' && !wait.suspended ? '<button data-open="' + pump + '">Привод ' + pump + ' обесточен, полное открытие проверено</button>' : '')).join('');
  element('valve-waits').querySelectorAll('button').forEach(button => { button.disabled = blocked; button.onclick = () => act({ type: 'command', action: 'confirm_valve_open', value: Number(button.dataset.open) }); });
}

function renderThermalTests() {
  const damper = snapshot.damperTest, fan = snapshot.fanTest, cooling = snapshot.cooling;
  const locked = !snapshot.hmiAvailable || !!snapshot.coverageGap || !snapshot.engineering.enabled;
  const active = !!(snapshot.engineering.active || snapshot.shutterTest.active || damper.active || fan.active);
  const labels = { PASSED: 'Пройдено', FAILED: 'Не пройдено', NOT_CHECKED: 'Не проверено' };
  const fanStages = { PREPARE_STOP: 'Подтверждение предварительного останова', RAMP: 'Нарастание задания', TRACK: 'Ожидание частоты', HOLD: 'Ожидание инженера', WAIT_STOP: 'Подтверждение конечного останова' };
  element('shod-test-state').textContent = (damper.active ? 'Цель ' + damper.active.targets[damper.active.index] + '%' : damper.result ? labels[damper.result.result] + ': ' + damper.result.reason : 'ШОД ещё не проверен') + ' · Обратная связь ' + text(damper.raw) + ' В; скорректировано для диагностики ' + text(damper.corrected) + '%';
  element('shod-motion-warning').hidden = !damper.motionWarning;
  element('fan-test-state').textContent = fan.active ? fanStages[fan.active.stage] + ' · Ступень ' + fan.active.targets[fan.active.index] + ' Гц · Задание ' + text(snapshot.outputs['vfd.frequency']?.value) + ' Гц · Факт ' + feedback('vfd.frequency') + ' Гц' : fan.result ? labels[fan.result.result] + ': ' + fan.result.reason : 'Дымосос ещё не проверен';
  element('fan-blocks').textContent = 'Запрет обычного пуска: ' + text(fan.ordinaryBlocked) + '; требуется тест диапазона: ' + text(fan.rangeRequired) + '; запрет охлаждения: ' + text(fan.coolingBlocked) + '; самостоятельная блокировка ПЧ: ' + text(snapshot.vfdGuard.blocked);
  element('cooling-state').textContent = 'Запрос охлаждения: ' + text(snapshot.telemetry.cooling.requested) + ' · ' + ({IDLE:'Не требуется',WAITING:'Ожидает разрешений',WAIT_STOP:'Ожидает подтверждения останова',TEST_OWNS_FAN:'Дымососом управляет проверка',COOLING:'Выдан запрос охлаждения'}[cooling.phase] ?? cooling.phase) + (cooling.reasons.length ? ' · ' + cooling.reasons.join('; ') : '');
  element('shod-test-start').disabled = element('fan-test-start').disabled = locked || active || snapshot.engineeringCycle.pending;
  element('shod-k-set').disabled = locked || !!damper.active;
  for (const [id, value] of [['shod-k',snapshot.config.shodK],['fan-rate',snapshot.config.fanTestRate],['fan-min',snapshot.config.fmin],['fan-max',snapshot.config.fmax]]) if (document.activeElement !== element(id)) element(id).value = value;
  element('fan-rate-set').disabled = element('fan-bounds-set').disabled = locked || !!fan.active;
  const actual = snapshot.signals['vfd.frequency'], work = snapshot.signals['vfd.running'];
  element('fan-continue').disabled = locked || fan.active?.stage !== 'HOLD' || actual.quality !== 'GOOD' || !actual.fresh || work.value !== true || work.quality !== 'GOOD' || !work.fresh || Math.abs(actual.value - fan.active.targets[fan.active.index]) > 0.5;
  element('cooling-restore').disabled = locked || active || !fan.coolingBlocked;
  element('vfd-reset').disabled = locked || active || !snapshot.vfdGuard.blocked;
}

element('shod-test-start').onclick = () => act({type:'command',action:'engineering_shod_test'});
element('shod-k-set').onclick = () => act({type:'command',action:'engineering_shod_k',value:Number(element('shod-k').value)});
element('fan-test-start').onclick = () => act({type:'command',action:'engineering_fan_test'});
element('fan-continue').onclick = () => act({type:'command',action:'engineering_fan_continue'});
element('fan-rate-set').onclick = () => act({type:'command',action:'engineering_fan_settings',value:{rate:Number(element('fan-rate').value)}});
element('fan-bounds-set').onclick = () => act({type:'command',action:'engineering_fan_settings',value:{fmin:Number(element('fan-min').value),fmax:Number(element('fan-max').value),reserveFrequency:element('fan-reserve').value === '' ? null : Number(element('fan-reserve').value),reserveConfirmed:element('fan-reserve-confirmed').checked}});
element('cooling-restore').onclick = () => act({type:'command',action:'engineering_cooling_restore',value:{inspected:element('fan-inspected').checked,causeRemoved:element('fan-cause-removed').checked,workFinished:element('fan-work-finished').checked,allowAutomatic:element('fan-allow-automatic').checked}});
element('vfd-reset').onclick = () => act({type:'command',action:'engineering_vfd_reset',value:element('vfd-repaired').checked});
element('cooling-fixture').onclick = () => act({type:'cooling_fixture',circulation:false});
element('cooling-pump-fixture').onclick = () => act({type:'cooling_fixture',circulation:true});

for (const pump of [1, 2]) { // pump — номер насоса из отдельной подписанной кнопки.
  element('switch-pump-' + pump).onclick = () => act({ type: 'command', action: 'switch_pump', value: pump });
  element('confirm-valve-' + pump).onclick = () => act({ type: 'command', action: 'confirm_valve_closed', value: pump });
  element('confirm-breaker-' + pump).onclick = () => act({ type: 'command', action: 'confirm_pump_breaker_off', value: pump });
}
element('flow-control').onchange = () => act({ type: 'command', action: 'flow_control', value: element('flow-control').checked });
element('engineering-enter').onclick = () => act({ type: 'command', action: 'engineering_enter', value: element('engineering-assumption').checked });
element('engineering-leave').onclick = () => act({ type: 'command', action: 'engineering_leave' });
element('engineering-stop').onclick = () => act({ type: 'command', action: 'engineering_stop' });
element('st-test-start').onclick = () => act({ type: 'command', action: 'engineering_st_test' });
element('st-release-set').onclick = () => act({ type: 'command', action: 'engineering_st_release_time', value: Number(element('st-release-time').value) });
element('st-restore-power').onclick = () => act({ type: 'command', action: 'engineering_st_restore', value: { repaired: element('st-repaired').checked, manualFinished: element('st-manual-finished').checked, engaged: element('st-engaged').checked } });
element('engineering-cycle-begin').onclick = () => act({ type: 'command', action: 'engineering_cycle_begin' });
element('engineering-cycle-continue').onclick = () => act({ type: 'command', action: 'engineering_cycle_continue', value: { repaired: element('engineering-repaired').checked } });
element('engineering-cycle-skip').onclick = () => act({ type: 'command', action: 'engineering_cycle_skip' });
element('engineering-cycle-cancel').onclick = () => act({ type: 'command', action: 'engineering_cycle_cancel' });
element('engineering-cycle-repeat').onclick = () => act({ type: 'command', action: 'engineering_cycle_repeat', value: { key: element('engineering-cycle-repeat-key').value, repaired: element('engineering-repaired').checked } });
element('reset-flow').onclick = () => act({ type: 'command', action: 'reset_flow_faults', value: true });
element('fixture').onclick = () => act({ type: 'fixture' });
element('recovery-fixture').onclick = () => act({ type: 'recovery_fixture', pump: 1 });
element('restart').onclick = () => act({ type: 'restart' });
element('reset-pressure').onclick = () => act({ type: 'command', action: 'reset_pressure_stop', value: true });
element('continue-restart').onclick = () => act({ type: 'command', action: 'continue_stop_after_restart' });
element('start').onclick = () => act({ type: 'command', action: 'start' });
element('stop').onclick = () => act({ type: 'command', action: 'stop' });
element('bypass-closed').onclick = () => act({ type: 'command', action: 'confirm_bypass_closed' });
element('bypass-open').onclick = () => act({ type: 'command', action: 'confirm_bypass_open' });
element('st-manual').onclick = () => act({ type: 'command', action: 'confirm_st_closed_manually' });
element('set-frequency').onclick = () => act({ type: 'command', action: 'frequency', value: Number(element('frequency').value) });
element('set-mode').onclick = () => act({ type: 'command', action: 'mode', value: element('mode').value });
for (const [id, delta] of [['frequency-minus', -1], ['frequency-plus', 1]]) { // id/delta — ручные кнопки с шагом 1 Гц, D-270.
  element(id).onclick = () => {
    const value = Number(element('frequency').value) + delta; // Новое числовое задание, не команда разгона ПЧ.
    element('frequency').value = value;
    act({ type: 'command', action: 'frequency', value });
  };
}
element('aranga-read').onclick = () => act({ type: 'aranga', operation: 'read' });
element('aranga-failed').onclick = () => act({ type: 'aranga', operation: 'failed' });
element('aranga-controls').onclick = () => act({ type: 'aranga', operation: 'controls', payload: { start: element('aranga-start').checked, stop: element('aranga-stop').checked } });
element('aranga-frequency-write').onclick = () => act({ type: 'aranga', operation: 'frequency', payload: { value: element('aranga-frequency').value === '' ? null : Number(element('aranga-frequency').value) } });
element('deliver').onclick = () => act({ type: 'deliver_all' });
document.querySelectorAll('[data-time]').forEach(button => { // button — выбранный явный шаг времени модели.
  button.onclick = () => act({ type: 'advance', ms: Number(button.dataset.time) });
});
for (const name of ['hmi', 'aranga']) { // name — отдельный генератор прикладного обмена.
  element('exchange-' + name).onchange = event => act({ type: 'exchange', name, enabled: event.target.checked }); // event — изменение переключателя испытателя.
}
for (const [id, name] of [['service-main', 'mainEnabled'], ['service-supervision', 'supervisionEnabled']]) { // id/name — элемент HMI и флаг соответствующей модели службы.
  element(id).onchange = event => act({ type: 'service', name, enabled: event.target.checked }); // event — действие испытателя.
}
try {
  const response = await fetch('/api/state'); // Чтение не является управляющей командой и не подтверждает состояние механизмов.
  snapshot = await response.json();
  element('groups').innerHTML = Object.entries(snapshot.groups).map(([name, group]) => '<button data-group="' + name + '">' + escaped(group.label) + '</button>').join('');
  element('groups').querySelectorAll('button').forEach(button => { // button — конкретное независимое воздействие на входы.
    button.onclick = () => act({ type: 'group', name: button.dataset.group });
  });
  render();
} catch (error) { // error — недоступность сервера; старые данные не объявляются актуальными.
  element('error').textContent = 'Нет данных сервера: ' + error.message;
  element('error').hidden = false;
}
