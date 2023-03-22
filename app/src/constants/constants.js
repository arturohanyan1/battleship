const LEVELS = ['level1', 'level2', 'level3', 'level4', 'level5'];
const LEVEL = 'level4';

const ALREADY_SHOTED_MESSAGE = {
  type: 'info',
  content: 'already shoted',
  duration: 2,
};

const PLAYER_WIN_MESSAGE = {
  type: 'success',
  content: 'Player Win! Game Over!'
};

const BOT_WIN_MESSAGE = {
  type: 'success',
  content: 'Bot Win! Game Over!'
};

const NO_AVAILABLE_PLACE_MESSAGE = {
  type: "error",
  content: "place is not available",
  duration: 2,
};

export {
  LEVELS,
  LEVEL,
  ALREADY_SHOTED_MESSAGE,
  PLAYER_WIN_MESSAGE,
  BOT_WIN_MESSAGE,
  NO_AVAILABLE_PLACE_MESSAGE
};