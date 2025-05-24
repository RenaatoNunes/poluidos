import * as ex from "excalibur";
import { Level } from "./level";
import { Config } from "./config";
import { Resources } from "./resources";
import { Turtle } from "./turtle";

export class ScoreTrigger extends ex.Actor {
    constructor(pos: ex.Vector, private level: Level) {
        super({
            pos,
            width: 2, // bem fino, só pra detectar passagem
            height: 500, // altura que cobre toda a tela
            anchor: ex.vec(0.5, 0.5),
            vel: ex.vec(-Config.TrashSpeed, 0),
            collisionType: ex.CollisionType.Passive, // ⬅️ importante!
            z: 0
        });

        this.on('exitviewport', () => this.kill());
    }

    override onInitialize(): void {
        this.on('collisionstart', (ev) => {
            if (ev.other instanceof Turtle) {
                this.level.incrementScore();
                Resources.ScoreSound.play();
                this.kill(); // impede pontuação repetida
            }
        });
    }
}