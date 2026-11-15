/** Специальное восстановление D-111/D-112/D-171 после отдельно полученного допуска.
 * Допуск дают PressureProtection (D-149), RebootRecovery (D-080/D-150) либо явно подписанная тестовая точка.
 * Обычный пуск D-139 обхода не получает; после reboot успешная циркуляция не переводит ТО в RUNNING.
 */
export class PumpRecovery {
  active = null;
  history = null;
  begin(sim, selected, context = 'PRESSURE_OR_FIXTURE') {
    this.active = { context, stage: context !== 'REBOOT' && sim.signals.position('st') !== 'OPEN' ? 'WAIT_ST_OPEN' : 'CLOSE_VALVES', selected, target: null, closeAt: {}, failed: [], onAt: null, openedAt: null };
    if (context !== 'REBOOT') sim.main.stage = 'RECOVERY';
    sim.procedureId += 1;
  }
  owns(pump) { return !!this.active && [1, 2].includes(pump); }
  step(sim, request, pressureTrip) {
    const op = this.active;
    if (!op) return;
    const reboot = op.context === 'REBOOT';
    if (pressureTrip || sim.state !== (reboot ? 'STOPPING' : 'STARTING') || sim.pumps.groupFault ||
        (reboot && (['CLOSE_PUMP', 'FINAL_OUTPUTS', 'COMPLETE'].includes(sim.protection.stopStage) || (op.target === null && sim.protection.restartContinued)))) {
      this.history = { ...op, stage: 'INTERRUPTED' };
      this.active = null; // Принятый останов не отменяется поздним концевиком/ручным подтверждением.
      return;
    }
    if (!reboot) request['st.direction'] = 'STOP'; // В восстановлении после reboot запрос ШТ принадлежит отдельному продолжению останова.
    if (!reboot && op.stage === 'WAIT_ST_OPEN') {
      request['pump1.run'] = false; request['pump2.run'] = false;
      request['st.direction'] = 'OPEN'; // Продолжение ещё не законченного начального открытия, без обхода допуска ШТ.
      if (sim.signals.position('st') !== 'OPEN') return;
      request['st.direction'] = 'STOP'; op.stage = 'CLOSE_VALVES';
    }
    if (!reboot) {
      request['vfd.enable'] = true; request['vfd.run'] = 'START';
      request['vfd.frequency'] = sim.frequency.apply(sim.config.fmin);
    }
    if (op.stage === 'CLOSE_VALVES') {
      for (const pump of [1, 2]) {
        const branch = sim.pumps.branches[pump];
        request['pump' + pump + '.run'] = false;
        request['valve' + pump + '.direction'] = branch.valveBlocked ? 'STOP' : 'CLOSE';
        const command = sim.outputs.commands['valve' + pump + '.direction'];
        if (command?.value === 'CLOSE') op.closeAt[pump] ??= command.issuedAt;
        if (op.closeAt[pump] !== undefined && sim.clock.now - op.closeAt[pump] >= 45000 &&
            sim.signals.position('valve' + pump) !== 'CLOSED' && !op.failed.includes(pump)) {
          sim.valves.fail(sim, pump, 'VALVE_CLOSE_TIMEOUT', 'Специальное восстановление: закрытие затвора ' + pump + ' не подтверждено за 45 с (D-112)');
          branch.valveBlocked = true;
          request['valve' + pump + '.direction'] = 'STOP';
          op.failed.push(pump);
        }
      }
      sim.pumps.checkGroup(sim);
      if (sim.pumps.groupFault) return;
      const available = pump => {
        const b = sim.pumps.branches[pump];
        return !b.faults.length && !b.exclusions.length && !b.inhibited && !b.valveBlocked &&
          sim.signals.position('valve' + pump) === 'CLOSED' && sim.engineering.off(sim, pump);
      };
      if ([1, 2].every(available)) op.target = op.selected;
      else if (op.failed.length === 1 && available(3 - op.failed[0])) {
        op.target = 3 - op.failed[0];
        sim.valves.requestManual(sim, op.failed[0], 'CLOSED', 'RECOVERY_CLOSE'); // Единственные 60 с от запроса, не от ON/окна HMI.
      }
      if (op.target !== null) { op.stage = 'PUMP_ON'; sim.selectedPump = op.target; }
    }
    if (op.target !== null) {
      const pump = op.target;
      request['pump' + pump + '.run'] = true;
      request['pump' + (3 - pump) + '.run'] = false; // Отказавшая при закрытии ветвь ни разу не включается.
      const on = sim.outputs.commands['pump' + pump + '.run'];
      if (on?.value === true) op.onAt ??= on.issuedAt;
      if (op.onAt !== null && sim.clock.now - op.onAt >= 1000) {
        request['valve' + pump + '.direction'] = op.openedAt === null ? 'OPEN' : 'STOP';
        op.stage = 'OPEN';
        if (sim.signals.position('valve' + pump) === 'OPEN') {
          op.openedAt ??= sim.clock.now;
          request['valve' + pump + '.direction'] = 'STOP';
          op.stage = 'CHECK_CIRCULATION';
          if (sim.clock.now - op.openedAt >= 5000) {
            const criterion = sim.hydraulics.evaluate(sim, true); // Утверждённая пусковая матрица, без рабочего fallback при неизвестном Q.
            if (criterion.state === 'LOW') {
              this.history = { ...op, stage: 'LOW_CIRCULATION' }; this.active = null;
              sim.hydraulics.reserve(sim, 'HYDRAULIC_LOW', pump);
              if (reboot && !sim.pumps.groupFault) sim.gap('После reboot циркуляция первой ветви не подтверждена: смена при сохранённом STOPPING ещё не перенесена');
            } else if (criterion.state === 'OK' && sim.signals.phases(pump)?.every(Boolean) &&
                (reboot || sim.main.bypassClosed) && // D-030: давление при первоначальном запуске не заменяет подтверждение ШБ закрыт.
                (reboot || (sim.outputs.commands['vfd.run']?.delivery === 'ACCEPTED' && sim.signals.read('vfd.running') === true && sim.signals.get('vfd.running').lastGoodRevision > sim.outputs.commands['vfd.run'].deliveryInputRevision)) &&
                op.failed.every(index => sim.pumps.branches[index].manualClosed || sim.signals.position('valve' + index) === 'CLOSED')) {
              sim.hydraulics.warn(null);
              this.history = { ...op, stage: 'COMPLETE' }; this.active = null;
              if (reboot) {
                sim.boot.circulationRestored = true;
                sim.log('BOOT_CIRCULATION', 'Циркуляция восстановлена, состояние остаётся STOPPING; требуются ШБ и отдельное продолжение');
              } else {
                sim.main.stage = 'COMPLETE'; sim.main.preparationDone = true;
                sim.transition('RUNNING', 'Специальное восстановление: циркуляция и изоляция ветвей подтверждены (D-112)');
              }
            } else sim.hydraulics.warn('Специальное восстановление: требуется циркуляция и подтверждение закрытия неисправной ветви');
          }
        } else if (op.openedAt !== null) sim.gap('Специальное восстановление: потеря уже подтверждённого открытия до окончания процедуры ещё не перенесена');
      }
    }
  }
}
