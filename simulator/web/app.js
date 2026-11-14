// Клиент показывает серверное состояние. Никакие команды к механизмам из браузера не отправляются.
let snapshot = null; // Последний снимок тестового мира с поколением для защиты от старых команд.
let busy = false; // Не допускаем одновременные действия одного клиента.
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
  element('state').textContent = stateLabels[snapshot.state] ?? 'Неизвестно после загрузки';
  element('stage').textContent = stageLabels[snapshot.stage] ?? snapshot.stage;
  element('time').textContent = seconds(snapshot.time) + ' с';
  element('physical').textContent = snapshot.stoppedConfirmed ? 'Подтверждён входами' : 'Не подтверждён';
  element('physical').className = snapshot.stoppedConfirmed ? 'ok' : 'warning';
  element('gap').hidden = !snapshot.coverageGap;
  element('gap').textContent = 'ПАУЗА МОДЕЛИ: ' + (snapshot.coverageGap ?? '') + '. Состояние исполнения выходов за этой границей не моделируется. Для нового прогона загрузите исходную точку.';
  element('start').disabled = snapshot.startReasons.length > 0;
  element('stop').disabled = !snapshot.hmiAvailable || !['STARTING', 'RUNNING'].includes(snapshot.state) || !!snapshot.coverageGap;
  element('set-frequency').disabled = snapshot.state !== 'RUNNING' || !snapshot.hmiAvailable || !!snapshot.coverageGap;
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

element('fixture').onclick = () => act({ type: 'fixture' });
element('restart').onclick = () => act({ type: 'restart' });
element('start').onclick = () => act({ type: 'command', action: 'start' });
element('stop').onclick = () => act({ type: 'command', action: 'stop' });
element('bypass-closed').onclick = () => act({ type: 'command', action: 'confirm_bypass_closed' });
element('bypass-open').onclick = () => act({ type: 'command', action: 'confirm_bypass_open' });
element('st-manual').onclick = () => act({ type: 'command', action: 'confirm_st_closed_manually' });
element('set-frequency').onclick = () => act({ type: 'command', action: 'frequency', value: Number(element('frequency').value) });
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
