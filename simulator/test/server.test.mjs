import test from 'node:test';
import assert from 'node:assert/strict';
import { createSimulatorServer } from '../server.mjs';

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
