/** Модель отдельного надзора. Реальные процессы/systemd здесь не запускаются. */
export class Supervision {
  lastCycleAt = null; // Завершение проверки надзора, контролируемое защитной службой.
  mainStale = false; // Отсутствие завершённого цикла основной программы 2 с, D-312/D-322.
  step(sim) { // sim — время и отметка основной программы, без доступа к выдаче выходов.
    this.mainStale = sim.main.lastCycleAt === null || sim.clock.now - sim.main.lastCycleAt >= 2000;
    this.lastCycleAt = sim.clock.now;
  }
}
