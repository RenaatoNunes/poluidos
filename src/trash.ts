import * as ex from "excalibur";
import { Config } from "./config";
import { TrashImages } from "./resources";

export class Trash extends ex.Actor {
    scored = false;
    private static readonly TRASH_WIDTH = 50;
    private static readonly TRASH_HEIGHT = 50;

    constructor(pos: ex.Vector, public type: 'top' | 'bottom') {
        super({
            pos,
            width: Trash.TRASH_WIDTH,
            height: Trash.TRASH_HEIGHT,
            anchor: ex.vec(0.5, 0.5), // centraliza o sprite
            vel: ex.vec(-Config.TrashSpeed, 0),
            z: -1
        });

        this.on('exitviewport', () => this.kill());
    }

    override onInitialize(): void {
        const index = Math.floor(Math.random() * TrashImages.length);
        const randomImage = TrashImages[index];
        const randomSprite = randomImage.toSprite();

        // Redimensiona a imagem para encaixar no ator
        randomSprite.destSize = {
            width: Trash.TRASH_WIDTH,
            height: Trash.TRASH_HEIGHT
        };

        // Inverte verticalmente se for do tipo "top"
        if (this.type === 'top') {
            randomSprite.flipVertical = true;
        }

        this.graphics.use(randomSprite);

        // Define colisão como fixa (obstáculo estático)
        this.collider.set(ex.Shape.Box(this.width, this.height));
        this.body.collisionType = ex.CollisionType.Fixed;
    }
}
