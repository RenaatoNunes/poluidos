import * as ex from 'excalibur';
import { Resources, TrashImages } from './resources';
import { Level } from './level';
import { initMuteButton } from './ui';

const positionUI = (game: ex.Engine) => {
  const ui = document.getElementsByClassName("ui")[0] as HTMLElement;
  if (ui) {
    const topLeft = game.screen.screenToPageCoordinates(ex.vec(10, 500 - 40));
    ui.style.visibility = 'visible';
    ui.style.left = topLeft.x + 'px';
    ui.style.top = topLeft.y + 'px';
  }
};

const game = new ex.Engine({
  width: 400,
  height: 500,
  backgroundColor: ex.Color.fromHex("#54C0CA"),
  pixelArt: true,
  pixelRatio: 2,
  displayMode: ex.DisplayMode.FitScreen,
  scenes: { Level }
});

game.screen.events.on('resize', () => {
  location.reload();
});

// ✅ Inclui também as imagens dos obstáculos
const loader = new ex.Loader([
  ...Object.values(Resources),
  ...TrashImages
]);

loader.playButtonText = "Jogar";

game.start(loader).then(() => {
  const loaderBg = document.getElementById('loader-background');
    if (loaderBg) loaderBg.style.display = 'none';

    game.goToScene('Level');
    positionUI(game);
    initMuteButton();
});

game.screen.events.on('resize', () => positionUI(game));