import * as ex from "excalibur";
import { Bird } from "./bird";
import { Pipe } from "./pipe";
import { PipeFactory } from "./pipe-factory";
import { Config } from "./config";
import { Ground } from "./ground";
import { Resources } from "./resources";

export class Level extends ex.Scene {
    score: number = 0;
    best: number = 0;
    random = new ex.Random();
    pipeFactory = new PipeFactory(this, this.random, Config.PipeInterval);
    bird = new Bird(this);
    ground!: Ground;

    startGameLabel = new ex.Label({
        text: 'Clique para começar',
        x: 200,
        y: 200,
        z: 2,
        font: new ex.Font({
            size: 30,
            color: ex.Color.White,
            textAlign: ex.TextAlign.Center
        })
    });

    scoreLabel = new ex.Label({
        text: 'Score: 0',
        x: 0,
        y: 0,
        z: 2,
        font: new ex.Font({
            size: 10,
            color: ex.Color.White
        })
    });

    bestLabel = new ex.Label({
        text: 'Best: 0',
        x: 400,
        y: 0,
        z: 2,
        font: new ex.Font({
            size: 10,
            color: ex.Color.White,
            textAlign: ex.TextAlign.End
        })
    });

    override onActivate(): void {
        Resources.BackgroundMusic.loop = true;
        Resources.BackgroundMusic.play();
    }

    override onInitialize(engine: ex.Engine): void {
        const background = new ex.Actor({
            pos: ex.vec(engine.halfDrawWidth, engine.halfDrawHeight),
            z: -1
        });

        const sprite = Resources.BackgroundImage.toSprite();
        sprite.destSize = {
            width: engine.drawWidth,
            height: engine.drawHeight
        };
        background.graphics.use(sprite);
        this.add(background);

        // ✅ Adiciona a imagem Oil fixa no topo da tela
        const oil = new ex.Actor({
        pos: ex.vec(engine.halfDrawWidth, 0),
        anchor: ex.vec(0.5, 0), // ⬅️ topo central
        z: 0
        });

        const oilSprite = Resources.OilImage.toSprite();
        oilSprite.destSize = {
        width: engine.drawWidth,
        height: Resources.OilImage.height // ou ajuste como quiser
        };

        oil.graphics.use(oilSprite);
        this.add(oil);

        this.add(this.bird);
        this.add(this.startGameLabel);
        this.add(this.scoreLabel);
        this.add(this.bestLabel);

        this.ground = new Ground(ex.vec(0, engine.screen.drawHeight - 64));
        this.add(this.ground);

        const bestScore = localStorage.getItem('bestScore');
        this.setBestScore(bestScore ? +bestScore : 0);

        this.showStartInstructions();
    }

    override onPostUpdate(_engine: ex.Engine): void {
        for (const actor of this.actors) {
            if (actor instanceof Pipe && !actor.scored) {
                const pipeRightEdge = actor.pos.x + actor.width / 2;
                if (pipeRightEdge < this.bird.pos.x) {
                    actor.scored = true;
                    this.incrementScore();
                    Resources.ScoreSound.play();
                }
            }
        }
    }

    incrementScore() {
        this.scoreLabel.text = `Pontos: ${++this.score}`;
        Config.PipeSpeed += 3; // Aumenta a velocidade dos obstáculos
        Config.PipeInterval -= 100; // Diminui o intervalo entre os obstáculos
        this.setBestScore(this.score);
    }

    setBestScore(score: number) {
        if (score > this.best) {
            localStorage.setItem('bestScore', this.score.toString());
            this.best = score;
        }
        this.bestLabel.text = `Recorde: ${this.best}`;
    }

    showStartInstructions() {
        this.startGameLabel.graphics.isVisible = true;
        this.engine.input.pointers.once('down', () => {
            this.reset();
            this.startGameLabel.graphics.isVisible = false;
            this.bird.start();
            this.pipeFactory.start();
            this.ground.start();
        });
    }

    reset() {
        this.bird.reset();
        this.pipeFactory.reset();
        this.score = 0;
        this.scoreLabel.text = `Pontos: ${this.score}`;
    }

    triggerGameOver() {
        this.pipeFactory.stop();
        this.bird.stop();
        this.ground.stop();
        this.showStartInstructions();
        Resources.FailSound.play();
    }
}