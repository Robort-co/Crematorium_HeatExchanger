import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';

function deliver(sim) { // sim — имитатор; виртуальная доставка не изменяет входы механизмов.
  for (const [name, command] of Object.entries(sim.outputs.commands)) { // name/command — одна актуальная команда.
    if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
  }
  sim.tick();
}
function startup() {
  const sim = new Simulation(); // Синтетические исправные механизмы, гидравлические входы задаются отдельно.
  sim.loadFixture(); sim.command('start'); sim.sampleGroup('stOpen'); sim.sampleGroup('valvesClosed');
  deliver(sim); sim.sampleGroup('fanOn'); sim.sampleGroup('pump1On'); sim.advance(1000); sim.sampleGroup('valve1Open');
  return sim;
}
function measurements(sim, q, dp) { // q/dp — независимые испытательные значения, не расчёт сети.
  sim.signals.set('flow', q, q === null ? 'UNKNOWN' : 'GOOD', q !== null, q !== null);
  sim.signals.set('pressure.before', 1.5); sim.signals.set('pressure.after', 1.5 + dp); sim.tick();
}
function running() {
  const sim = startup(); // Все пусковые подтверждения поступают отдельными событиями.
  measurements(sim, 8, 0.5); sim.advance(5000); sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING');
  return sim;
}
function reserveOpened(sim) { // sim — уже принятая смена 1→2.
  sim.sampleGroup('pump2On'); sim.advance(1000); sim.sampleGroup('valve2Open');
  sim.sampleGroup('valve1Closed'); sim.sampleGroup('pump1Off');
}

test('Подготовка: Q и ΔP ниже порогов дают резерв ровно через 5 с открытия, без дополнительных 5 с', () => {
  const sim = startup(); // Исходные Q=0 и ΔP=0 достоверны.
  sim.advance(4900); assert.equal(sim.pumps.active, null);
  sim.advance(100); assert.equal(sim.pumps.active?.cause, 'HYDRAULIC_LOW');
  assert.equal(sim.outputs.value('pump2.run'), true);
  reserveOpened(sim); measurements(sim, 8, 0.5); sim.advance(5000); sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.selectedPump, 2);
  assert.ok(sim.pumps.branches[1].faults.includes('HYDRAULIC_LOW_1'));
});

for (const [q, dp] of [[4, 0.5], [8, 0.1]]) { // q/dp — обе комбинации несогласия пусковой матрицы D-031.
  test('Подготовка: несогласие Q=' + q + ', ΔP=' + dp + ' предупреждает и ждёт, не меняя насос автоматически', () => {
    const sim = startup(); // Пуск ещё не завершён.
    measurements(sim, q, dp); sim.advance(20000); sim.command('confirm_bypass_closed');
    assert.equal(sim.state, 'STARTING'); assert.equal(sim.pumps.active, null);
    assert.match(sim.hydraulics.warning, /не согласованы/);
    assert.equal(sim.coverageGap, null);
    measurements(sim, 8, 0.5);
    assert.equal(sim.state, 'RUNNING');
  });
}

test('Подготовка: неизвестный Q не равен нулю; OFF флага разрешает готовность только по достоверному ΔP', () => {
  const sim = startup(); // Отсутствующий расход не запускает автоматическую смену при ON.
  measurements(sim, null, 0.5); sim.advance(5000); sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'STARTING'); assert.equal(sim.pumps.active, null);
  assert.match(sim.hydraulics.warning, /нет достоверного Q/);
  sim.command('flow_control', false);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.config.flowControl, false);
});

test('Ручная смена разрешена в гидравлической подготовке и повторяет матрицу D-031', () => {
  const sim = startup(); // Несогласие показателей не блокирует разрешённую ручную смену.
  measurements(sim, 4, 0.5); sim.advance(5000);
  assert.equal(sim.command('switch_pump', 2).result, 'ACCEPTED');
  reserveOpened(sim); sim.advance(5000);
  assert.equal(sim.state, 'STARTING'); assert.equal(sim.coverageGap, null);
  assert.equal(sim.pumps.active.circulationConfirmed, false);
  measurements(sim, 8, 0.5); sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.selectedPump, 2);
});

test('Рабочие низкие Q/ΔP требуют непрерывных 5 с; краткое восстановление сбрасывает таймер', () => {
  const sim = running(); // Два раздельных интервала недостаточной циркуляции не суммируются.
  measurements(sim, 0, 0.1); sim.advance(4900); measurements(sim, 8, 0.5);
  measurements(sim, 0, 0.1); sim.advance(4900); assert.equal(sim.pumps.active, null);
  sim.advance(100); assert.equal(sim.pumps.active?.cause, 'HYDRAULIC_LOW');
});

test('Смена критерия на DP_ONLY сбрасывает незавершённую рабочую выдержку', () => {
  const sim = running(); // Потеря Q после 4 с не переносит старый таймер в новый способ контроля.
  measurements(sim, 0, 0.1); sim.advance(4000); measurements(sim, null, 0.1);
  sim.advance(4900); assert.equal(sim.pumps.active, null);
  sim.advance(100); assert.equal(sim.pumps.active?.cause, 'HYDRAULIC_LOW');
  assert.equal(sim.config.flowControl, true); // Временный fallback не меняет сохранённый флаг.
});

test('Рабочая потеря Q с нормальным ΔP продолжает работу с предупреждением без индивидуальной ошибки', () => {
  const sim = running(); // Общая связь/качество расходомера не являются отказом насосной ветви.
  measurements(sim, null, 0.5); sim.advance(10000);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.pumps.active, null);
  assert.match(sim.hydraulics.warning, /Нет достоверного Q/);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  assert.equal(sim.config.flowControl, true);
  measurements(sim, 8, 0.5); assert.equal(sim.hydraulics.warning, null);
});

test('Рабочий низкий ΔP при нормальном Q остаётся предупреждением, не отказом ветви', () => {
  const sim = running(); // Достоверный расход сохраняется.
  measurements(sim, 8, 0.1); sim.advance(10000);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.pumps.active, null);
  assert.match(sim.hydraulics.warning, /Низкий ΔP/);
  assert.equal(sim.pumps.groupFault, false);
});

test('D-166: низкий Q при нормальном ΔP вызывает одну смену; успех исключает старую ветвь без физического диагноза', () => {
  const sim = running(); // Пусковой случай с теми же числами имел бы ожидание; здесь В работе.
  measurements(sim, 4, 0.5); sim.advance(4900); assert.equal(sim.pumps.active, null);
  sim.advance(100); assert.equal(sim.pumps.active?.cause, 'LOW_FLOW');
  reserveOpened(sim); measurements(sim, 8, 0.5); sim.advance(5000);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.selectedPump, 2);
  assert.deepEqual(sim.pumps.branches[1].exclusions, ['CHECK_AFTER_LOW_FLOW']);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  assert.equal(sim.pumps.groupFault, false);
  assert.equal(sim.command('switch_pump', 1).result, 'REJECTED');
});

test('D-166: изменение флага после принятия смены не отменяет обязательную проверку Q результата', () => {
  const sim = running(); // Флаг OFF не превращает неудачное восстановление Q в успех по нормальному ΔP.
  measurements(sim, 4, 0.5); sim.advance(5000); sim.command('flow_control', false);
  reserveOpened(sim); sim.advance(4900); assert.equal(sim.state, 'RUNNING');
  sim.advance(100);
  assert.equal(sim.state, 'STOPPING');
  assert.ok(sim.protection.faults.some(fault => fault.code === 'FLOW_INSUFFICIENT'));
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.pumps.groupFault, false);
  assert.equal(sim.hydraulics.requireFullStartup, true);
  measurements(sim, 8, 0.5); assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.pumps.active.verificationFailed, true);
  sim.restart(); assert.equal(sim.hydraulics.requireFullStartup, true);
  assert.equal(sim.config.flowControl, false);
});

test('D-166: неизвестный Q результата смены требует останова, нормального ΔP недостаточно', () => {
  const sim = running(); // Это результат уже принятой смены по Q, а не обычная потеря TUF в работе.
  measurements(sim, 4, 0.5); sim.advance(5000); reserveOpened(sim); measurements(sim, null, 0.5); sim.advance(5000);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.protection.faults.find(fault => fault.code === 'FLOW_RECOVERY_UNCONFIRMED')?.evidence, 'NO_FEEDBACK');
  assert.equal(sim.outputs.value('pump2.run'), true);
  assert.equal(sim.pumps.groupFault, false);
});

test('D-166: без доступного резерва низкий Q даёт обязательный останов, не новый индивидуальный отказ', () => {
  const sim = running(); // Сначала реальная успешная смена исключает старую ветвь для проверки.
  measurements(sim, 4, 0.5); sim.advance(5000); reserveOpened(sim); measurements(sim, 8, 0.5); sim.advance(5000);
  measurements(sim, 4, 0.5); sim.advance(5000);
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.pumps.active, null);
  assert.equal(sim.pumps.branches[2].faults.length, 0);
  assert.equal(sim.outputs.value('pump2.run'), true);
});

test('Выключение флага до истечения исходных 5 с отменяет незавершённую проверку низкого Q', () => {
  const sim = running(); // До принятой смены флаг меняет критерий сразу, D-166.
  measurements(sim, 4, 0.5); sim.advance(4900); sim.command('flow_control', false); sim.advance(10000);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.pumps.active, null);
  assert.equal(sim.protection.faults.length, 0);
});

test('Повторная запись прежнего флага не сбрасывает выдержку низкого расхода', () => {
  const sim = running(); // Таймер принадлежит непрерывному условию, не экрану или повторному сохранению настройки.
  measurements(sim, 4, 0.5); sim.advance(4900);
  assert.equal(sim.command('flow_control', true).result, 'NO_CHANGE');
  sim.advance(100);
  assert.equal(sim.pumps.active?.cause, 'LOW_FLOW');
});

test('Вторая ветвь с низкими Q и ΔP после открытия +5 с даёт критическую группу без третьей попытки', () => {
  const sim = running(); // Обе ветви получили отдельный диагноз по согласованному критерию.
  measurements(sim, 0, 0.1); sim.advance(5000); reserveOpened(sim); sim.advance(5000);
  assert.equal(sim.state, 'STOPPING'); assert.equal(sim.pumps.groupFault, true);
  assert.equal(sim.outputs.value('pump1.run'), false); assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.pumps.active, null);
  assert.equal(sim.telemetry().pumpGroup.emergencyCirculationRequested, true);
});

test('Сохранённое требование D-167 не позволяет завершить новый пуск только по ΔP при OFF флага', () => {
  const sim = startup(); // Имитация сохранённого требования до пусковой проверки; не новая команда сброса.
  sim.hydraulics.requireFullStartup = true;
  sim.command('flow_control', false); measurements(sim, 4, 0.5); sim.advance(5000); sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'STARTING'); assert.equal(sim.hydraulics.requireFullStartup, true);
  measurements(sim, 8, 0.5);
  assert.equal(sim.state, 'RUNNING'); assert.equal(sim.hydraulics.requireFullStartup, false);
  assert.equal(sim.config.flowControl, false);
});

test('Равенство уставкам Q=5 и ΔP=0,3 разрешает пуск без машинного ложного снижения перепада', () => {
  const sim = startup(); // Десятичные давления дают ровно установленную границу, без нового допуска датчика.
  sim.signals.set('pressure.before', 1.1); sim.signals.set('pressure.after', 1.4); sim.signals.set('flow', 5);
  sim.tick(); sim.advance(5000); sim.command('confirm_bypass_closed');
  assert.equal(sim.snapshot().dp, 0.3);
  assert.equal(sim.state, 'RUNNING');
  sim.signals.set('pressure.after', 1.399999); sim.signals.set('flow', 4.999999); sim.tick(); sim.advance(5000);
  assert.equal(sim.pumps.active?.cause, 'HYDRAULIC_LOW'); // Реальное снижение не скрывается числовым допуском.
});

test('Низкое абсолютное давление на границе пусковой проверки не создаёт гидравлический диагноз ветви', () => {
  const sim = startup(); // Защита давления приоритетна перед диагностикой Q/ΔP готовящегося насоса.
  sim.advance(4900); sim.signals.set('pressure.before', 0.7); sim.signals.set('pressure.after', 0.7); sim.advance(100);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('pump2.run'), false);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  assert.equal(sim.state, 'STOPPING');
});

test('После электрического OFF незавершённая гидравлическая выдержка не обходит классификацию 2 с', () => {
  const sim = running(); // Низкая циркуляция началась раньше; после снятия ON рабочая диагностика больше не разрешена.
  measurements(sim, 0, 0.1); sim.advance(3900); sim.sampleGroup('pump1Off'); sim.advance(1000);
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.advance(100);
  assert.equal(sim.pumps.active, null);
  assert.equal(sim.pumps.branches[1].faults.length, 0);
  sim.advance(1900);
  assert.equal(sim.pumps.active?.cause, 'ELECTRICAL_FAILURE');
});
