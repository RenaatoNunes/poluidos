import * as ex from "excalibur";
import { Resources } from "./resources";
import { Config } from "./config";
import { Level } from "./level";
import { Trash } from "./trash";
import { Ground } from "./ground";

export class Turtle extends ex.Actor {
    playing = false;
    jumping = false;
    startSprite!: ex.Sprite;
    upAnimation!: ex.Animation;
    downAnimation!: ex.Animation;
    constructor(private level: Level) {
        super({
            pos: Config.TurtleStartPos,
            radius: 8,
            color: ex.Color.Yellow
        });
    }

    override onInitialize(): void {
        const spriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.TurtleImage,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 75,
                spriteHeight: 75,
            }
        });

        this.startSprite = spriteSheet.getSprite(0, 0);
        this.upAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [1, 1, 1], 150, ex.AnimationStrategy.Freeze);
        this.downAnimation = ex.Animation.fromSpriteSheet(spriteSheet, [2, 2, 2], 150, ex.AnimationStrategy.Freeze);
        
        // Register
        this.graphics.add('down', this.downAnimation);
        this.graphics.add('up', this.upAnimation);
        this.graphics.add('start', this.startSprite);

        this.graphics.use('start');

        // this.on('exitviewport', () => {
        //     this.level.triggerGameOver();
        // });
    }

    private isInputActive(engine: ex.Engine) {
        return (engine.input.keyboard.isHeld(ex.Keys.Space) ||
                engine.input.pointers.isDown(0))
    }

    override onPostUpdate(engine: ex.Engine): void {
        if (!this.playing) return;

        // if the space bar or the first pointer was down
        if (!this.jumping && this.isInputActive(engine)) {
            this.vel.y += Config.TurtleJumpVelocity;
            this.jumping = true;
            this.graphics.use('up');
            // rewind
            this.upAnimation.reset();
            this.downAnimation.reset();
            // play sound effect
            Resources.FlapSound.play();
        }

        if (!this.isInputActive(engine)) {
            this.jumping = false;
        }

        this.vel.y = ex.clamp(this.vel.y, Config.TurtleMinVelocity, Config.TurtleMaxVelocity);

        if (this.vel.y > 0) {
            this.graphics.use('down');
        }

        const screenHeight = engine.screen.resolution.height;

        if (this.pos.y + this.height / 2 >= screenHeight) {
            // 🛑 Bateu no fundo
            this.level.triggerGameOver();
        }

        if (this.pos.y - this.height / 2 <= 0) {
            // 🛑 Bateu no topo
            this.level.triggerGameOver();
        }
    }

    start() {
        this.playing = true;
        this.pos = Config.TurtleStartPos; // starting position
        this.acc = ex.vec(0, Config.TurtleAcceleration); // pixels per second per second
    }

    reset() {
        this.pos = Config.TurtleStartPos; // starting position
        this.stop();
    }

    stop() {
        this.playing = false;
        this.vel = ex.vec(0, 0);
        this.acc = ex.vec(0, 0);
    }

    override onCollisionStart(_self: ex.Collider, other: ex.Collider): void {
        if (other.owner instanceof Trash ||
            other.owner instanceof Ground
        ) {
            this.level.triggerGameOver();
        }
    }
}