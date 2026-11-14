import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { FrequencyPolicy } from '../src/frequency.mjs';

function deliver(sim) { // sim — испытательный мир; подтверждается только виртуальный транспорт.
  for (const [name, command] of Object.entries(sim.outputs.commands)) { // name/command — актуальная недоставленная команда.
    if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
  }
  sim.tick();
}
function prepared() {
  const sim = new Simulation(); // Свежая модель, затем явно загруженные синтетические исходные условия.
  sim.loadFixture();
  assert.equal(sim.command('start').result, 'ACCEPTED');
  deliver(sim);
  sim.sampleGroup('stOpen');
  sim.sampleGroup('valvesClosed');
  deliver(sim);
  sim.sampleGroup('fanOn');
  sim.sampleGroup('pump1On');
  sim.advance(1000);
  deliver(sim);
  sim.sampleGroup('valve1Open');
  sim.sampleGroup('flowNormal');
  sim.advance(5000);
  assert.equal(sim.state, 'STARTING');
  assert.equal(sim.main.preparationDone, true);
  assert.equal(sim.coverageGap, null);
  return sim;
}
function running() {
  const sim = prepared(); // Подготовка завершена, подтверждение оператора поступает отдельным событием.
  sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'RUNNING');
  return sim;
}

test('Загрузка и перезапуск не означают подтверждённый останов и не включают насос', () => {
  const sim = new Simulation(); // Неизвестное начальное состояние.
  assert.equal(sim.state, null);
  assert.equal(sim.stoppedConfirmed(), false);
  assert.equal(sim.outputs.value('pump1.run'), null);
  assert.equal(sim.command('start').result, 'REJECTED');
  sim.loadFixture();
  assert.equal(sim.stoppedConfirmed(), true);
  sim.restart();
  assert.equal(sim.state, null);
  assert.equal(sim.outputs.value('pump1.run'), null);
  assert.equal(sim.outputs.value('st.power'), false);
});

test('Ручной пуск → работа → обязательный останов с независимыми подтверждениями', () => {
  const sim = running(); // Все подтверждения даны испытателем, а не генератором команд.
  assert.equal(sim.outputs.value('vfd.frequency'), 25);
  sim.command('stop');
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.notEqual(sim.outputs.value('st.direction'), 'CLOSE');
  sim.command('confirm_bypass_open');
  assert.equal(sim.outputs.value('st.direction'), 'CLOSE');
  deliver(sim);
  sim.sampleGroup('stClosed');
  assert.equal(sim.outputs.value('pump1.run'), true);
  assert.equal(sim.outputs.value('valve1.direction'), 'CLOSE');
  assert.equal(sim.outputs.value('vfd.run'), 'STOP');
  deliver(sim);
  sim.sampleGroup('valve1Closed');
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('valve1.direction'), 'OPEN');
  assert.equal(sim.stoppedConfirmed(), false); // Команда OFF ещё не физическое подтверждение.
  deliver(sim);
  sim.sampleGroup('pumpsOff');
  sim.sampleGroup('fanOff');
  assert.equal(sim.stoppedConfirmed(), true);
  assert.equal(sim.signals.position('valve1'), 'CLOSED'); // Завершение не ждёт положения останова D-028.
});

test('Открытие ШТ не подтверждается его командой или доставкой', () => {
  const sim = new Simulation(); // Испытание без изменения обратной связи ШТ.
  sim.loadFixture();
  sim.command('start');
  deliver(sim);
  sim.advance(4900);
  assert.equal(sim.main.stage, 'OPEN_ST');
  assert.equal(sim.signals.position('st'), 'CLOSED');
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.advance(100);
  assert.equal(sim.protection.stBlocked, true); // Исходный концевик не снялся за 5 с, D-074.
  assert.equal(sim.state, 'STOPPING');
});

test('Неизвестные концевики не равны доказанному недоходу', () => {
  const sim = new Simulation(); // Потеря обратной связи во время открытия.
  sim.loadFixture();
  sim.command('start');
  sim.signals.set('st.open', null, 'UNKNOWN', false, false);
  sim.signals.set('st.closed', null, 'UNKNOWN', false, false);
  sim.advance(67500);
  assert.equal(sim.protection.faults.find(fault => fault.code === 'st_MOTION_TIMEOUT')?.evidence, 'NO_FEEDBACK');
  assert.equal(sim.protection.stBlocked, true);
  assert.equal(sim.signals.read('st.closed'), null);
});

test('Неизвестный расход не позволяет завершить первоначальную подготовку', () => {
  const sim = prepared(); // Утрата актуальности до завершения общего запуска.
  sim.signals.set('flow', null, 'UNKNOWN', false, false);
  sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'STARTING');
  assert.equal(sim.main.preparationDone, false);
  assert.equal(sim.circulation(), 'DP_ONLY_NORMAL');
  assert.equal(sim.protection.faults.length, 0);
});

test('Без нового подтверждения Работа после принятой START запуск не завершается', () => {
  const sim = prepared(); // Подготовленная модель с явным отказом доставки новой записи START.
  sim.outputs.commands['vfd.run'].delivery = 'ERROR';
  sim.command('confirm_bypass_closed');
  assert.equal(sim.state, 'STARTING');
  sim.outputs.deliver('vfd.run', sim.outputs.commands['vfd.run'].id);
  sim.tick();
  assert.equal(sim.state, 'STARTING'); // Прежняя обратная связь того же времени недостаточна.
  sim.signals.set('vfd.running', true);
  sim.tick();
  assert.equal(sim.state, 'RUNNING');
});

test('Повторный Стоп, Пуск и попытка отмены не сбрасывают обязательный останов', () => {
  const sim = running(); // Действующий останов нельзя заменить рабочим запросом.
  sim.command('stop');
  sim.command('confirm_bypass_open');
  const stage = sim.protection.stopStage; // Текущий этап до повторных команд.
  assert.equal(sim.command('stop').result, 'NO_CHANGE');
  assert.equal(sim.command('start').result, 'REJECTED');
  assert.equal(sim.command('cancel_stop').result, 'REJECTED');
  assert.equal(sim.protection.stopStage, stage);
  assert.equal(sim.protection.bypassOpen, true);
});

test('Подтверждение с контекстом прежней процедуры отклоняется', () => {
  const sim = running(); // Операторское действие связано с показанной процедурой, а не глобальным флагом.
  const oldProcedure = sim.procedureId; // Контекст до принятия обязательного останова.
  sim.command('stop');
  assert.equal(sim.command('confirm_bypass_open', undefined, oldProcedure).result, 'REJECTED');
  assert.equal(sim.protection.bypassOpen, false);
  assert.equal(sim.command('confirm_bypass_open').result, 'ACCEPTED');
});

test('Прерывание ручного запуска Стопом требует отдельного подтверждения ШБ', () => {
  const sim = new Simulation(); // Останов на раннем этапе, насосы ещё не включались.
  sim.loadFixture();
  sim.command('start');
  sim.command('stop');
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.protection.bypassOpen, false);
  assert.equal(sim.outputs.value('pump1.run'), false);
  sim.command('confirm_bypass_open');
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.outputs.value('vfd.run'), 'STOP');
});

test('HMI: 5 с при запуске прерывают его, а восстановление не отменяет останов', () => {
  const sim = prepared(); // Запуск не завершён, ожидается подтверждение оператора.
  sim.exchange.hmi = false;
  sim.advance(4900);
  assert.equal(sim.state, 'STARTING');
  sim.advance(100);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.protection.bypassOpen, false);
  assert.equal(sim.outputs.value('vfd.frequency'), 25);
  sim.exchange.hmi = true;
  sim.tick();
  assert.equal(sim.state, 'STOPPING');
});

test('Работа в ручном режиме не зависит от обмена ARANGA; потеря HMI удерживает задание', () => {
  const sim = running(); // Ручное управление: D-328 и D-271.
  sim.command('frequency', 40);
  sim.exchange.hmi = false;
  sim.exchange.aranga = false;
  sim.advance(6000);
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.outputs.value('vfd.frequency'), 40);
  assert.equal(sim.command('frequency', 30).result, 'REJECTED');
  sim.exchange.aranga = true;
  sim.tick();
  assert.equal(sim.outputs.value('vfd.frequency'), 40);
});

test('Два недостоверных давления отключают насос без подстановки нуля и ждут ШБ', () => {
  const sim = running(); // Самостоятельная защита выше сохранения циркуляции до закрытия ШТ.
  sim.signals.set('pressure.before', null, 'UNKNOWN', false, false);
  sim.signals.set('pressure.after', null, 'UNKNOWN', false, false);
  sim.tick();
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.outputs.value('valve2.direction'), 'OPEN');
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.protection.bypassOpen, false);
  assert.equal(sim.snapshot().dp, null);
  assert.equal(sim.protection.faults.some(fault => fault.code === 'LOW_PRESSURE'), false);
});

test('Достоверное низкое давление отключает насос немедленно, не запрещая открытие', () => {
  const sim = running(); // 0 бар допустим как измерение 4 мА, D-148.
  sim.signals.set('pressure.before', 0);
  sim.tick();
  assert.equal(sim.signals.read('pressure.before'), 0);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.protection.faults.some(fault => fault.code === 'LOW_PRESSURE'), true);
});

test('Потеря одного давления при достоверном Q не объявляет потерю всех критериев циркуляции', () => {
  const sim = running(); // Регрессия: неизвестный ΔP сам не означает одновременно неизвестный Q, D-148/D-165.
  sim.signals.set('pressure.before', null, 'UNKNOWN', false, false);
  sim.tick();
  assert.equal(sim.state, 'RUNNING');
  assert.equal(sim.snapshot().dp, null);
  assert.equal(sim.protection.faults.some(fault => fault.code === 'NO_CIRCULATION_CONTROL'), false);
  sim.signals.set('flow', null, 'UNKNOWN', false, false);
  sim.tick();
  assert.equal(sim.state, 'STOPPING');
  assert.equal(sim.outputs.value('pump1.run'), true); // D-165: сохраняем разрешённую циркуляцию до ШТ закрыт.
  assert.equal(sim.protection.faults.some(fault => fault.code === 'NO_CIRCULATION_CONTROL'), true);
});

test('Заключительное закрытие по 45 с выключает насос, но не подделывает концевик', () => {
  const sim = running(); // Таймаут D-169 относится именно к полному останову.
  sim.command('stop');
  sim.command('confirm_bypass_open');
  sim.sampleGroup('stClosed');
  sim.advance(44900);
  assert.equal(sim.outputs.value('pump1.run'), true);
  sim.advance(100);
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.signals.position('valve1'), 'OPEN');
  assert.equal(sim.protection.faults.some(fault => fault.code === 'FINAL_VALVE_CLOSE_TIMEOUT_1'), true);
});

test('Отказ основной программы: надзор 2 с, независимое завершение принятого останова', () => {
  const sim = running(); // Основная программа перестаёт завершать циклы, защита продолжает их выполнять.
  sim.mainEnabled = false;
  sim.advance(1900);
  assert.equal(sim.state, 'RUNNING');
  sim.advance(100);
  assert.equal(sim.state, 'STOPPING');
  sim.command('confirm_bypass_open');
  sim.sampleGroup('stClosed');
  sim.sampleGroup('valve1Closed');
  assert.equal(sim.state, 'STOPPED');
  assert.equal(sim.protection.faults.some(fault => fault.code === 'CONTROL_STALLED'), true);
});

test('Отказ надзора контролируется отдельно защитной частью за 2 с', () => {
  const sim = running(); // Отдельно останавливаем циклы надзора при живой основной программе.
  sim.supervisionEnabled = false;
  sim.advance(2000);
  assert.equal(sim.state, 'STOPPING');
});

test('Время последнего ответа и последнего достоверного Q различаются; удержание не бесконечно', () => {
  const sim = new Simulation(); // Два независимых таймера D-153/D-155 на управляемых часах.
  sim.signals.set('flow', 8);
  sim.clock.advance(1000);
  sim.signals.set('flow', 999, 'BAD', true, false);
  assert.equal(sim.signals.get('flow').updatedAt, 1000);
  assert.equal(sim.signals.get('flow').lastGoodAt, 0);
  assert.equal(sim.signals.flow().value, 8);
  assert.equal(sim.signals.flow().held, true);
  sim.clock.advance(4000);
  assert.equal(sim.signals.flow().value, null);
});

test('Стабильное новое показание обновляет достоверность; неизвестные фазы не 000', () => {
  const sim = new Simulation(); // Обновление одинакового числа не означает отсутствие обмена.
  sim.signals.set('flow', 8);
  sim.clock.advance(2500);
  sim.signals.set('flow', 8);
  assert.equal(sim.signals.get('flow').lastGoodAt, 2500);
  assert.equal(sim.signals.phases(1), null);
});

test('Владение выходами и отклонение подтверждения старой команды', () => {
  const sim = new Simulation(); // Только защита может формировать итог, транспорт отвечает по идентификатору.
  assert.throws(() => sim.outputs.issue('pump1.run', true, 'main'));
  const first = sim.outputs.issue('pump1.run', true, 'protection'); // Предыдущая команда.
  sim.outputs.issue('pump1.run', false, 'protection');
  assert.throws(() => sim.outputs.deliver('pump1.run', first.id));
});

test('LIMIT и резонансный гистерезис не применяются к STOP', () => {
  const policy = new FrequencyPolicy({ fmin: 20, fmax: 50, resonance: { low: 28, high: 31, hysteresis: 1 } }); // Синтетическая зона для проверки функции, не проектная уставка.
  assert.equal(policy.apply(28), 31);
  assert.equal(policy.apply(27.5), 31);
  assert.equal(policy.apply(27), 27);
  assert.equal(policy.apply(100), 50);
  assert.throws(() => policy.apply('STOP'));
});

test('Не реализованная температурная ветвь явно останавливает расчёт модели', () => {
  const sim = running(); // Не подменяем ещё не реализованное охлаждение вымышленным OFF.
  sim.signals.set('cooling.required', true);
  sim.tick();
  assert.ok(sim.coverageGap);
  const time = sim.clock.now; // За пределом охвата время модели не продолжает скрытую работу.
  sim.advance(1000);
  assert.equal(sim.clock.now, time);
});

test('Недостоверные фазные входы не превращаются в индивидуальный отказ насоса', () => {
  const sim = running(); // Проверка честного ограничения реализации качества WB.
  sim.signals.set('pump1.l1', null, 'UNKNOWN', false, false);
  sim.tick();
  assert.ok(sim.coverageGap);
  assert.equal(sim.signals.phases(1), null);
  assert.equal(sim.protection.faults.length, 0);
  assert.equal(sim.command('stop').result, 'REJECTED'); // Остановлена модель, а не выдумано новое поведение оборудования.
});

test('Достоверное отсутствие фаз 1 с снимает ON, но не опережает классификацию неисправности', () => {
  const sim = running(); // В отличие от UNKNOWN есть подтверждённое отсутствие напряжения.
  sim.sampleGroup('pumpsOff');
  sim.advance(1000);
  assert.equal(sim.outputs.value('pump1.run'), false);
  assert.equal(sim.coverageGap, null);
  assert.equal(sim.protection.faults.length, 0); // Индивидуальная неисправность ещё не подтверждена: идут отдельные 2 с.
  sim.advance(1900);
  assert.equal(sim.pumps.active, null);
  sim.advance(100);
  assert.equal(sim.pumps.active?.to, 2);
});
