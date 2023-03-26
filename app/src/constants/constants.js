const LEVELS = [
  { value: 'level1', label: 'level 1' },
  { value: 'level2', label: 'level 2' },
  { value: 'level3', label: 'level 3' },
  { value: 'level4', label: 'level 4' },
  { value: 'level5', label: 'level 5' }
];
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

const AVATARS = ['avatar_1', 'avatar_2', 'avatar_3', 'avatar_4'];
const FLAGS = ['flag_1', 'flag_2', 'flag_3', 'flag_4', 'flag_5', 'flag_6'];

export {
  LEVELS,
  LEVEL,
  ALREADY_SHOTED_MESSAGE,
  PLAYER_WIN_MESSAGE,
  BOT_WIN_MESSAGE,
  NO_AVAILABLE_PLACE_MESSAGE,
  AVATARS,
  FLAGS
};