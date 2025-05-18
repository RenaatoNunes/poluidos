import * as ex from "excalibur";
import { Pipe } from "./pipe";
// import { Config } from "./config";
import { Level } from "./level";
import { ScoreTrigger } from "./score-trigger";

export class PipeFactory {
  private timer: ex.Timer;

  constructor(
    private level: Level,
    private random: ex.Random,
    intervalMs: number
  ) {
    this.timer = new ex.Timer({
      interval: intervalMs,
      repeats: true,
      action: () => this.spawnPipe()
    });

    this.level.add(this.timer);
  }

    spawnPipe() {
    const screenHeight = this.level.engine.screen.drawHeight;

    const pipeY = this.random.floating(80, screenHeight - 80);
    const type: 'top' | 'bottom' = this.random.bool() ? 'top' : 'bottom';

    const pipe = new Pipe(
        ex.vec(this.level.engine.screen.drawWidth, pipeY),
        type
    );
    this.level.add(pipe);

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
      if (actor instanceof Pipe || actor instanceof ScoreTrigger) {
        actor.kill();
      }
    }
  }

  stop() {
    this.timer.stop();
    for (const actor of this.level.actors) {
      if (actor instanceof Pipe || actor instanceof ScoreTrigger) {
        actor.vel = ex.vec(0, 0);
      }
    }
  }
}
