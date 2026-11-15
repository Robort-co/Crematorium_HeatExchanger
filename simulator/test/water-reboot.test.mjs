import test from 'node:test';
import assert from 'node:assert/strict';
import { Simulation } from '../src/simulation.mjs';
import { running } from './helpers.mjs';
import { bootInputs, restoreCirculation } from './cooling-reboot-helpers.mjs';

function values(s, a, b = a, r = a) {
  for (const [name, value] of Object.entries({'temperature.supply': a, 'temperature.backup': b, 'temperature.return': r})) {
    s.signals.set(name, value, value === null ? 'UNKNOWN' : 'GOOD');
  }
  s.tick();
}
function hot() {
  const s = new Simulation(); s.loadWaterFixture(); values(s, 91); s.advance(3000);
  assert.equal(s.waterProtection.overheat, true); return s;
}

test('Согласование 15.11: сохранённый перегрев после reboot удерживается при 88/86°C без новых 3 с', () => {
  const s = hot(); s.restart({downtimeMs: 100000});
  assert.equal(s.waterProtection.overheat, true); assert.equal(s.waterProtection.hotSince, null);
  assert.equal(s.temperature.water.protectionMaximum, null);
  values(s, 88); assert.equal(s.waterProtection.overheat, true);
  assert.ok(s.protection.faults.some(f => f.code === 'WATER_OVERHEAT'));
  assert.equal(s.command('start').result, 'REJECTED');
  values(s, 86); assert.equal(s.waterProtection.overheat, true);
  values(s, 85.9); assert.equal(s.waterProtection.overheat, false);
  assert.ok(!s.protection.faults.some(f => f.code === 'WATER_OVERHEAT'));
  assert.equal(s.outputs.value('heatRemoval.request'), true); // У теплоотвода свой порог снятия, ниже 80.
  assert.equal(s.waterProtection.recoveryPending, false); assert.equal(s.coverageGap, null);
});

test('Reboot: все неизвестны сохраняет перегрев; исправная обратка снимает только его, чужая ошибка остаётся', () => {
  const s = hot(); s.protection.fault(s, 'OTHER', 'Независимая тестовая причина'); s.restart();
  values(s, null); assert.equal(s.waterProtection.overheat, true);
  values(s, null, null, 85); assert.equal(s.waterProtection.overheat, false);
  assert.ok(s.protection.faults.some(f => f.code === 'OTHER'));
  assert.equal(s.temperature.water.supplyMissing, true); assert.equal(s.command('start').result, 'REJECTED');
});

test('Повторный reboot сохраняет аварийные защёлки, но не старые команды насосам', () => {
  const s = hot(); s.restart(); values(s, 88); s.restart(); values(s, 88);
  assert.equal(s.waterProtection.overheat, true); assert.equal(s.waterProtection.savedThermalRemoval, true);
  assert.equal(s.outputs.value('pump1.run'), null); assert.equal(s.outputs.value('heatRemoval.request'), true);
});

test('Непрочитанный снимок/новый процесс не восстанавливают известный перегрев из старой памяти', () => {
  const s = hot(); s.restart({savedStateReadable: false}); values(s, 88);
  assert.equal(s.boot.readable, false); assert.equal(s.waterProtection.recoveryPending, true);
  assert.equal(s.waterProtection.savedThermalRemoval, null); assert.equal(s.outputs.value('heatRemoval.request'), null);
  s.restart(); assert.equal(s.boot.readable, false); assert.equal(s.waterProtection.recoveryPending, true);
  const other = new Simulation(); assert.equal(other.waterProtection.enabled, false);
});

test('Reboot не переносит незавершённую выдержку перегрева и чужие водяные таймеры', () => {
  const s = new Simulation(); s.loadWaterFixture(); values(s, 91); s.advance(2900); s.restart({downtimeMs: 100000});
  assert.equal(s.waterProtection.overheat, false); assert.equal(s.waterProtection.hotSince, null);
  assert.equal(s.waterProtection.removalSince, null); assert.equal(s.waterProtection.deltaSince, null);
  assert.equal(s.waterProtection.deltaClearSince, null); assert.equal(s.waterProtection.deltaWarning, false);
  values(s, 91); s.advance(2999); assert.equal(s.waterProtection.overheat, false);
  assert.equal(s.waterProtection.thermalRemoval, false);
  s.advance(1); assert.equal(s.waterProtection.overheat, true); assert.equal(s.waterProtection.thermalRemoval, true);
});

test('Согласование теплоотвода: 87 → 82°C → reboot удерживает запрос сразу, 80 ещё удерживает, 79.9 снимает', () => {
  const s = new Simulation(); s.loadWaterFixture(); values(s, 87); s.advance(3000); values(s, 82);
  assert.equal(s.waterProtection.overheat, false); s.restart({downtimeMs: 100000});
  assert.equal(s.outputs.value('heatRemoval.request'), true); assert.equal(s.waterProtection.thermalRemoval, true);
  assert.equal(s.waterProtection.removalSince, null); values(s, 82);
  assert.equal(s.outputs.value('heatRemoval.request'), true); assert.equal(s.clock.now, 103000);
  values(s, 80); assert.equal(s.outputs.value('heatRemoval.request'), true);
  values(s, 79.9); assert.equal(s.outputs.value('heatRemoval.request'), false); assert.equal(s.coverageGap, null);
});

test('Reboot не переносит свежесть: потеря обеих подач требует теплоотвод до восстановления подачи', () => {
  const s = new Simulation(); s.loadWaterFixture(); s.restart();
  assert.equal(s.temperature.water.selected, null); assert.equal(s.waterProtection.thermalRemoval, false);
  assert.equal(s.waterProtection.supplyMissing, true); assert.equal(s.outputs.value('heatRemoval.request'), true);
  values(s, null, null, 60); assert.equal(s.outputs.value('heatRemoval.request'), true);
  values(s, null, 60, 60); assert.equal(s.waterProtection.supplyMissing, false);
  assert.equal(s.outputs.value('heatRemoval.request'), false);
});

test('Сохранённый OFF теплоотвода не становится температурной защёлкой от краткой потери новых входов', () => {
  const s = new Simulation(); s.loadWaterFixture(); s.restart(); values(s, 82);
  assert.equal(s.waterProtection.thermalRemoval, false); assert.equal(s.outputs.value('heatRemoval.request'), false);
  values(s, 85); s.advance(2999); assert.equal(s.waterProtection.thermalRemoval, false);
  s.advance(1); assert.equal(s.waterProtection.thermalRemoval, true); assert.equal(s.outputs.value('heatRemoval.request'), true);
});

test('Перегрев и теплоотвод после reboot снимаются раздельно, сторонние ошибки не сбрасываются', () => {
  const s = hot(); s.protection.fault(s, 'OTHER', 'Независимая причина'); s.restart();
  values(s, 85.9); assert.equal(s.waterProtection.overheat, false); assert.equal(s.outputs.value('heatRemoval.request'), true);
  values(s, 79.9); assert.equal(s.outputs.value('heatRemoval.request'), false);
  assert.ok(s.protection.faults.some(f => f.code === 'OTHER'));
});

test('Прочитанная уставка отключения теплоотвода сохраняет свой порог после reboot', () => {
  const s = new Simulation(); s.loadWaterFixture(); s.command('engineering_enter', true);
  assert.equal(s.command('engineering_water_settings', {waterRemovalOn: 87, waterRemovalOff: 81, waterOverheat: 92}).result, 'ACCEPTED');
  values(s, 87); s.advance(3000); s.restart(); values(s, 81);
  assert.equal(s.config.waterRemovalOff, 81); assert.equal(s.outputs.value('heatRemoval.request'), true);
  values(s, 80.9); assert.equal(s.outputs.value('heatRemoval.request'), false);
});

test('Reboot: запрос теплоотвода не ждёт STOP ПЧ/положения ШТ и не создаёт им подтверждения', () => {
  const s = hot(); s.restart(); values(s, 82);
  assert.equal(s.outputs.value('heatRemoval.request'), true); assert.equal(s.state, null);
  assert.equal(s.signals.position('st'), 'UNKNOWN'); assert.equal(s.outputs.value('pump1.run'), null);
  assert.notEqual(s.outputs.value('vfd.run'), 'START'); assert.equal(s.boot.phase, 'WAIT_INPUTS');
});

test('Водяной STOPPED восстанавливается по новым входам; теплоотвод не запускает насосы и обычную работу', () => {
  const s = hot(); s.restart(); s.signals.set('temperature.fan', 40); values(s, 82);
  bootInputs(s, {closed: true, required: false}); s.advance(5000); s.tick();
  assert.equal(s.state, 'STOPPED'); assert.equal(s.boot.phase, 'RESTORED');
  assert.equal(s.outputs.value('heatRemoval.request'), true); assert.equal(s.outputs.value('vfd.run'), 'STOP');
  assert.equal(s.outputs.value('pump1.run'), false); assert.equal(s.outputs.value('pump2.run'), false);
  assert.equal(s.coverageGap, null);
});

test('Водяной reboot из RUNNING допускает только прежний обязательный останов с новым ШБ/Продолжить', () => {
  const s = running(); s.temperature.begin(s); s.signals.set('temperature.fan', 40); s.waterProtection.enabled = true;
  values(s, 91); s.advance(3000); s.restart(); s.signals.set('temperature.fan', 80); values(s, 82);
  bootInputs(s); s.advance(5000); s.tick(); restoreCirculation(s);
  assert.equal(s.state, 'STOPPING'); assert.equal(s.outputs.value('pump1.run'), true);
  assert.equal(s.outputs.value('vfd.run'), 'START'); assert.equal(s.outputs.value('heatRemoval.request'), true);
  assert.equal(s.protection.bypassOpen, false); assert.equal(s.protection.restartContinued, false);
  s.command('confirm_bypass_open'); assert.equal(s.protection.stopStage, 'WAIT_BYPASS');
  s.command('continue_stop_after_restart'); assert.equal(s.outputs.value('st.direction'), 'CLOSE');
  assert.equal(s.coverageGap, null);
});
