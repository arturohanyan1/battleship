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

const AVATARS = [
  'avatar_1',
  'avatar_2',
  'avatar_3',
  'avatar_4',
  'avatar_5',
  'avatar_6',
  'avatar_7',
  'avatar_8',
  'avatar_9',
  'avatar_10',
  'avatar_11',
  'avatar_12',
  'avatar_13',
  'avatar_14',
  'avatar_15',
];

const FLAGS = [
  'flag_1',
  'flag_2',
  'flag_3',
  'flag_4',
  'flag_5',
  'flag_6',
  'flag_7',
  'flag_8',
  'flag_9',
  'flag_10',
  'flag_11',
  'flag_12',
  'flag_13',
  'flag_14',
  'flag_15',
  'flag_16',

];

const BOARD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const BOARD_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export {
  LEVELS,
  LEVEL,
  ALREADY_SHOTED_MESSAGE,
  PLAYER_WIN_MESSAGE,
  BOT_WIN_MESSAGE,
  NO_AVAILABLE_PLACE_MESSAGE,
  AVATARS,
  FLAGS,
  BOARD_NUMBERS,
  BOARD_LETTERS
};