import * as ex from "excalibur";
import { Trash } from "./trash";
// import { Config } from "./config";
import { Level } from "./level";
import { ScoreTrigger } from "./score-trigger";

export class TrashFactory {
  private timer: ex.Timer;

  constructor(
    private level: Level,
    private random: ex.Random,
    intervalMs: number
  ) {
    this.timer = new ex.Timer({
      interval: intervalMs,
      repeats: true,
      action: () => this.spawnTrash()
    });

    this.level.add(this.timer);
  }

    spawnTrash() {
    const screenHeight = this.level.engine.screen.drawHeight;

    const trashY = this.random.floating(80, screenHeight - 80);
    const type: 'top' | 'bottom' = this.random.bool() ? 'top' : 'bottom';

    const trash = new Trash(
        ex.vec(this.level.engine.screen.drawWidth, trashY),
        type
    );
    this.level.add(trash);

    // ✅ Ajuste: coloca o ScoreTrigger no centro vertical
    const trigger = new ScoreTrigger(
        ex.vec(this.level.engine.screen.drawWidth, this.level.engine.screen.drawHeight / 2),
        this.level
    );
    this.level.add(trigger);
    }


  start() {
    this.timer.start();
  }

  reset() {
    for (const actor of this.level.actors) {
      if (actor instanceof Trash || actor instanceof ScoreTrigger) {
        actor.kill();
      }
    }
  }

  stop() {
    this.timer.stop();
    for (const actor of this.level.actors) {
      if (actor instanceof Trash || actor instanceof ScoreTrigger) {
        actor.vel = ex.vec(0, 0);
      }
    }
  }
}
