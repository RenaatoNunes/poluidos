import * as ex from "excalibur";

// ✅ Imagens dos obstáculos (vários tipos)
export const TrashImages = [
  new ex.ImageSource('./images/copo.png'),
  new ex.ImageSource('./images/garrafa_oleo.png'),
  new ex.ImageSource('./images/garrafa_plastica.png'),
  new ex.ImageSource('./images/garrafa.png'),
  new ex.ImageSource('./images/garrafa2.png'),
  new ex.ImageSource('./images/latinha.png'),
  new ex.ImageSource('./images/latinha2.png'),
  new ex.ImageSource('./images/mascara.png'),
  new ex.ImageSource('./images/sacola.png'),
];

// ✅ Outros recursos do jogo
export const Resources = {
  // Imagens
  TurtleImage: new ex.ImageSource('./images/turtle.png'),
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
  BackgroundMusic: new ex.Sound('./sounds/background.wav')
} as const;

// ✅ Loader com todos os recursos
export const ResourceLoader = new ex.Loader([
  // Obstáculos variados
  ...TrashImages,

  // Imagens
  Resources.TurtleImage,
  Resources.BackgroundImage,
  Resources.OilImage,
  Resources.GroundImage,

  // Sons
  Resources.FlapSound,
  Resources.FailSound,
  Resources.ScoreSound,
  Resources.BackgroundMusic
]);