import * as ex from "excalibur";

// ✅ Imagens dos obstáculos (vários tipos)
export const ObstaculoImages = [
  new ex.ImageSource('./images/garrafa.png'),
  new ex.ImageSource('./images/latinha.png'),
  new ex.ImageSource('./images/pneu.png'),
  new ex.ImageSource('./images/copo.png')
];

// ✅ Outros recursos do jogo
export const Resources = {
  // Imagens
  BirdImage: new ex.ImageSource('./images/bird.png'),
  BackgroundImage: new ex.ImageSource('./images/bg.jpg'),
  OilImage: new ex.ImageSource('./images/oil.png'),
  GroundImage: new ex.ImageSource('./images/ground.png', {
    wrapping: ex.ImageWrapping.Repeat
  }),

  // Sons
  FlapSound: new ex.Sound('./sounds/flap.wav'),
  FailSound: new ex.Sound('./sounds/fail.wav'),
  ScoreSound: new ex.Sound('./sounds/score.wav'),

  // Música
  BackgroundMusic: new ex.Sound('./sounds/two_left_socks.ogg')
} as const;

// ✅ Loader com todos os recursos
export const ResourceLoader = new ex.Loader([
  // Obstáculos variados
  ...ObstaculoImages,

  // Imagens
  Resources.BirdImage,
  Resources.BackgroundImage,
  Resources.OilImage,
  Resources.GroundImage,

  // Sons
  Resources.FlapSound,
  Resources.FailSound,
  Resources.ScoreSound,
  Resources.BackgroundMusic
]);