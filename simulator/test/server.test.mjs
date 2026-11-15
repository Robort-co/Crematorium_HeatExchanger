import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorServer } from '../server.mjs';

test('HTTP 0.7: reboot из запуска, новые входы, отдельные ШБ/Продолжить; старые поколения и контексты отвергаются', async () => {
  const { server } = createSimulatorServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  let snapshot = await (await fetch(base + '/api/state')).json();
  const act = async (data, status = 200) => {
    const response = await fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ generation: snapshot.generation, procedureId: snapshot.procedureId, ...data }) });
    assert.equal(response.status, status); if (status === 200) snapshot = await response.json();
  };
  try {
    await act({ type: 'fixture' }); await act({ type: 'command', action: 'start' });
    const previousGeneration = snapshot.generation;
    await act({ type: 'restart', downtimeMs: 120000 }); assert.equal(snapshot.state, null);
    assert.equal(snapshot.boot.storage, 'MEMORY_SIMULATION_ONLY');
    await act({ type: 'command', action: 'confirm_bypass_open', generation: previousGeneration }, 400);
    for (const name of ['bootPermits', 'flowZero', 'pumpsOff', 'fanOff', 'stClosed']) await act({ type: 'group', name });
    await act({ type: 'deliver_all' }); await act({ type: 'group', name: 'fanOff' }); await act({ type: 'advance', ms: 5000 });
    assert.equal(snapshot.state, 'STOPPING'); assert.equal(snapshot.needsRestartContinue, true); assert.equal(snapshot.outputs['pump1.run'].value, false);
    await act({ type: 'command', action: 'continue_stop_after_restart' }); assert.equal(snapshot.lastRequest.result, 'REJECTED');
    await act({ type: 'command', action: 'confirm_bypass_open' }); assert.equal(snapshot.state, 'STOPPING');
    await act({ type: 'command', action: 'continue_stop_after_restart' }); assert.equal(snapshot.state, 'STOPPED');
    assert.equal(snapshot.coverageGap, null); assert.equal(snapshot.outputs['vfd.run'].value, 'STOP');
    const html = await (await fetch(base + '/')).text();
    assert.match(html, /id="continue-restart"/); assert.match(html, /id="reset-pressure"/);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTTP 0.7: раздельная блокировка давления после остановленного запуска и отдельный сброс', async () => {
  const { server } = createSimulatorServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  let snapshot = await (await fetch(base + '/api/state')).json();
  const act = async data => {
    const response = await fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ generation: snapshot.generation, procedureId: snapshot.procedureId, ...data }) });
    assert.equal(response.status, 200); snapshot = await response.json();
  };
  try {
    await act({ type: 'fixture' }); await act({ type: 'command', action: 'start' });
    await act({ type: 'signal', name: 'pressure.before', value: 0, quality: 'GOOD' });
    assert.equal(snapshot.state, 'STOPPING'); assert.equal(snapshot.pressure.lowTrip, true); assert.equal(snapshot.pressure.lowAlarm, false);
    await act({ type: 'command', action: 'confirm_bypass_open' }); assert.equal(snapshot.state, 'STOPPED');
    assert.equal(snapshot.pressure.restartBlocked, true);
    await act({ type: 'group', name: 'flowZero' });
    await act({ type: 'command', action: 'start' }); assert.equal(snapshot.lastRequest.result, 'REJECTED');
    await act({ type: 'command', action: 'reset_pressure_stop', value: true }); assert.equal(snapshot.lastRequest.result, 'ACCEPTED');
    assert.equal(snapshot.state, 'STOPPED'); assert.equal(snapshot.outputs['pump1.run'].value, false);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTTP: D-112/D-171 и согласованный D-177 через локальные действия, без обхода поколения и контекста', async () => {
  const { server } = createSimulatorServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  let snapshot = await (await fetch(base + '/api/state')).json();
  const act = async data => {
    const response = await fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ generation: snapshot.generation, procedureId: snapshot.procedureId, ...data }) });
    assert.equal(response.status, 200); snapshot = await response.json();
  };
  try {
    await act({ type: 'recovery_fixture', pump: 1 });
    const oldProcedure = snapshot.procedureId;
    await act({ type: 'group', name: 'valve2Closed' }); await act({ type: 'advance', ms: 45000 });
    assert.equal(snapshot.outputs['pump1.run'].value, false); assert.equal(snapshot.outputs['pump2.run'].value, true);
    await act({ type: 'group', name: 'pump2On' }); await act({ type: 'advance', ms: 1000 });
    await act({ type: 'group', name: 'valve2Open' }); await act({ type: 'group', name: 'flowNormal' }); await act({ type: 'advance', ms: 5000 });
    await act({ type: 'command', action: 'confirm_valve_closed', value: 1 });
    assert.equal(snapshot.state, 'RUNNING');
    await act({ type: 'signal', name: 'valve1.open', value: null, quality: 'UNKNOWN' });
    assert.equal(snapshot.pumpGroup.branches[1].manualClosed, true);
    await act({ type: 'group', name: 'valve1Open' });
    assert.equal(snapshot.state, 'STOPPING'); assert.equal(snapshot.coverageGap, null);
    assert.equal(snapshot.outputs['pump2.run'].value, true);
    await act({ type: 'command', action: 'confirm_bypass_open', procedureId: oldProcedure });
    assert.equal(snapshot.lastRequest.result, 'REJECTED');
    await act({ type: 'command', action: 'confirm_bypass_open' }); await act({ type: 'group', name: 'stClosed' });
    await act({ type: 'group', name: 'valve2Closed' });
    assert.equal(snapshot.state, 'STOPPED'); assert.equal(snapshot.outputs['pump2.run'].value, false);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTTP: инженерный отказ по гидравлике, успешный повтор и отдельный возврат ветви через команды HMI', async () => {
  const { server } = createSimulatorServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  let snapshot = await (await fetch(base + '/api/state')).json();
  const act = async data => {
    const response = await fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ generation: snapshot.generation, procedureId: snapshot.procedureId, ...data }) });
    assert.equal(response.status, 200); snapshot = await response.json();
  };
  try {
    await act({ type: 'fixture' }); await act({ type: 'command', action: 'engineering_enter', value: true });
    const oldProcedure = snapshot.procedureId;
    for (const success of [false, true]) {
      await act({ type: 'group', name: 'valve2Closed' });
      await act({ type: 'command', action: 'engineering_test', value: { kind: 'pump', pump: 1, repaired: true } });
      assert.equal(snapshot.lastRequest.result, 'ACCEPTED');
      assert.equal(snapshot.telemetry.state, 'STOPPED'); assert.equal(snapshot.telemetry.ready, false);
      await act({ type: 'group', name: 'valve1Closed' }); await act({ type: 'advance', ms: 100 });
      await act({ type: 'group', name: 'pump1On' }); await act({ type: 'advance', ms: 1100 });
      await act({ type: 'group', name: 'valve1Open' });
      await act({ type: 'group', name: success ? 'flowNormal' : 'flowZero' }); await act({ type: 'advance', ms: 5000 });
      assert.equal(snapshot.outputs['pump1.run'].value, false);
      await act({ type: 'group', name: 'pump1Off' });
      assert.equal(snapshot.engineering.results[1].pump.result, success ? 'PASSED' : 'FAILED');
    }
    await act({ type: 'command', action: 'engineering_return', value: { kind: 'pump', pump: 1 }, procedureId: oldProcedure });
    assert.equal(snapshot.lastRequest.result, 'REJECTED');
    await act({ type: 'command', action: 'engineering_return', value: { kind: 'pump', pump: 1 } });
    assert.equal(snapshot.lastRequest.result, 'ACCEPTED');
    assert.deepEqual(snapshot.pumpGroup.branches[1].exclusions, []);
    await act({ type: 'command', action: 'engineering_leave' });
    assert.equal(snapshot.engineering.enabled, false);
    assert.equal(snapshot.state, 'STOPPED'); assert.equal(snapshot.outputs['pump1.run'].value, false);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTTP: смена насосов, независимые входы и останов через API веб-HMI', async () => {
  const { server } = createSimulatorServer(); // Локальный транспорт без реального контроллера.
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port; // Только loopback-адрес теста.
  let snapshot = await (await fetch(base + '/api/state')).json(); // Контекст каждого запроса актуализируется ответом.
  const act = async data => { // data — действие из тех же кнопок HMI.
    const response = await fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ ...data, generation: snapshot.generation, procedureId: snapshot.procedureId }) }); // Запрос ещё не подтверждение механизма.
    assert.equal(response.status, 200);
    snapshot = await response.json();
  };
  try {
    const html = await (await fetch(base)).text(); // Проверка наличия всех адресуемых контролов, без заявления о визуальной проверке браузером.
    const script = await (await fetch(base + '/app.js')).text(); // Фактически отдаваемый клиент.
    for (const match of script.matchAll(/element\('([^']+)'\)/g)) assert.ok(html.includes('id="' + match[1] + '"'), match[1]); // match — статический идентификатор элемента.
    for (const prefix of ['switch-pump-', 'confirm-valve-', 'confirm-breaker-']) { // prefix — динамически адресуемые парные кнопки.
      for (const pump of [1, 2]) assert.ok(html.includes('id="' + prefix + pump + '"')); // pump — реальный номер элемента HMI.
    }
    await act({ type: 'fixture' }); await act({ type: 'command', action: 'start' });
    await act({ type: 'group', name: 'stOpen' }); await act({ type: 'group', name: 'valvesClosed' });
    await act({ type: 'deliver_all' }); await act({ type: 'group', name: 'fanOn' });
    await act({ type: 'group', name: 'pump1On' }); await act({ type: 'advance', ms: 1000 });
    await act({ type: 'group', name: 'valve1Open' }); await act({ type: 'group', name: 'flowNormal' });
    await act({ type: 'advance', ms: 5000 }); await act({ type: 'command', action: 'confirm_bypass_closed' });
    await act({ type: 'command', action: 'flow_control', value: false });
    assert.equal(snapshot.config.flowControl, false);
    assert.equal(snapshot.hydraulics.criterion.mode, 'DP_ONLY');
    await act({ type: 'command', action: 'flow_control', value: 'off' });
    assert.equal(snapshot.lastRequest.result, 'REJECTED');
    await act({ type: 'command', action: 'flow_control', value: true });
    assert.equal(snapshot.config.flowControl, true);
    await act({ type: 'command', action: 'switch_pump', value: 2 });
    assert.equal(snapshot.lastRequest.result, 'ACCEPTED');
    assert.equal(snapshot.outputs['pump2.run'].value, true);
    assert.equal(snapshot.signals['pump2.l1'].value, false);
    await act({ type: 'group', name: 'pump2On' }); await act({ type: 'advance', ms: 1000 });
    await act({ type: 'group', name: 'valve2Open' }); await act({ type: 'group', name: 'valve1Closed' });
    await act({ type: 'group', name: 'pump1Off' }); await act({ type: 'advance', ms: 5000 });
    assert.equal(snapshot.telemetry.pumpGroup.selected, 2);
    assert.equal(snapshot.pumpGroup.history.stage, 'COMPLETE');
    await act({ type: 'command', action: 'stop' }); await act({ type: 'command', action: 'confirm_bypass_open' });
    await act({ type: 'group', name: 'stClosed' }); await act({ type: 'group', name: 'valve2Closed' });
    assert.equal(snapshot.state, 'STOPPED');
    assert.equal(snapshot.stoppedConfirmed, false);
    await act({ type: 'deliver_all' }); await act({ type: 'group', name: 'pumpsOff' }); await act({ type: 'group', name: 'fanOff' });
    assert.equal(snapshot.stoppedConfirmed, true);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTTP: страница, API, поколение команд, запрет чужого Origin и неизвестных действий', async () => {
  const { server } = createSimulatorServer(); // Изолированный тестовый сервер без оборудования.
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port; // ОС назначает свободный порт только тесту.
  try {
    const page = await fetch(base); // Статическая HMI доступна независимо от состояния ТО.
    assert.equal(page.status, 200);
    assert.match(await page.text(), /ТОЛЬКО ИМИТАЦИЯ/);
    const initial = await (await fetch(base + '/api/state')).json(); // Исходный неизвестный снимок.
    assert.equal(initial.state, null);
    const send = (data, origin = base) => fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(data) }); // data/origin — тестируемый запрос и его источник.
    const fixture = await send({ type: 'fixture', generation: initial.generation }); // Явное создание тестового мира.
    assert.equal(fixture.status, 200);
    const current = await fixture.json(); // Новое поколение отклоняет команды от старого окна.
    assert.equal(current.state, 'STOPPED');
    assert.equal((await send({ type: 'command', action: 'start', generation: initial.generation })).status, 400);
    assert.equal((await send({ type: 'fixture', generation: current.generation }, 'https://foreign.invalid')).status, 400);
    assert.equal((await send({ type: 'real_modbus_write', generation: current.generation })).status, 400);
    assert.equal((await fetch(base + '/../../DECISIONS.md')).status, 404);
    const started = await (await send({ type: 'command', action: 'start', generation: current.generation, procedureId: current.procedureId })).json(); // Корректный контекст HMI должен позволять штатный пуск через тот же HTTP-маршрут.
    assert.equal(started.state, 'STARTING');
    const outdated = await (await send({ type: 'command', action: 'confirm_bypass_closed', generation: started.generation, procedureId: current.procedureId })).json(); // Старое подтверждение до Пуска не переносится в начатую процедуру.
    assert.equal(outdated.lastRequest.result, 'REJECTED');
    assert.match(outdated.lastRequest.reasons.join(' '), /Устаревший контекст/);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTTP: сквозной сценарий и удержание после потери ARANGA доступны через действия веб-HMI', async () => {
  const { server } = createSimulatorServer(); // Настоящий локальный HTTP с виртуальными I/O внутри.
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port; // Временный loopback-порт теста.
  let snapshot = await (await fetch(base + '/api/state')).json(); // Контекст каждого запроса обновляется ответом сервера.
  const act = async data => { // data — те же декларативные действия, которые отправляет веб-клиент.
    const response = await fetch(base + '/api/action', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: JSON.stringify({ ...data, generation: snapshot.generation, procedureId: snapshot.procedureId }) }); // Транспорт не заменяет физические подтверждения.
    assert.equal(response.status, 200);
    snapshot = await response.json();
    return snapshot;
  };
  try {
    await act({ type: 'fixture' });
    await act({ type: 'command', action: 'mode', value: 'ARANGA' });
    await act({ type: 'exchange', name: 'aranga', enabled: true });
    await act({ type: 'aranga', operation: 'controls', payload: { start: false, stop: false } });
    await act({ type: 'aranga', operation: 'controls', payload: { start: true, stop: false } });
    assert.equal(snapshot.state, 'STARTING');
    await act({ type: 'deliver_all' });
    await act({ type: 'group', name: 'stOpen' });
    await act({ type: 'group', name: 'valvesClosed' });
    await act({ type: 'deliver_all' });
    await act({ type: 'group', name: 'fanOn' });
    await act({ type: 'group', name: 'pump1On' });
    await act({ type: 'advance', ms: 1000 });
    await act({ type: 'deliver_all' });
    await act({ type: 'group', name: 'valve1Open' });
    await act({ type: 'group', name: 'flowNormal' });
    await act({ type: 'advance', ms: 5000 });
    await act({ type: 'command', action: 'confirm_bypass_closed' });
    assert.equal(snapshot.state, 'RUNNING');
    assert.equal(snapshot.outputs['vfd.frequency'].value, 20);
    await act({ type: 'aranga', operation: 'frequency', payload: { value: 36 } });
    await act({ type: 'exchange', name: 'aranga', enabled: false });
    await act({ type: 'advance', ms: 5000 });
    assert.equal(snapshot.telemetry.arangaWarning, true);
    await act({ type: 'command', action: 'frequency', value: 32 });
    await act({ type: 'aranga', operation: 'read' });
    assert.equal(snapshot.outputs['vfd.frequency'].value, 32);
    await act({ type: 'aranga', operation: 'frequency', payload: { value: 36 } });
    assert.equal(snapshot.outputs['vfd.frequency'].value, 36);
    await act({ type: 'aranga', operation: 'controls', payload: { start: true, stop: true } });
    assert.equal(snapshot.state, 'STOPPING');
    assert.equal(snapshot.outputs['vfd.frequency'].value, 25);
    await act({ type: 'command', action: 'confirm_bypass_open' });
    await act({ type: 'deliver_all' });
    await act({ type: 'group', name: 'stClosed' });
    await act({ type: 'deliver_all' });
    await act({ type: 'group', name: 'valve1Closed' });
    await act({ type: 'deliver_all' });
    await act({ type: 'group', name: 'pumpsOff' });
    await act({ type: 'group', name: 'fanOff' });
    assert.equal(snapshot.stoppedConfirmed, true);
    assert.equal(snapshot.coverageGap, null);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
