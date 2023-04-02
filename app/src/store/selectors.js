import { createSelector as cs } from "reselect";

const player = (state) => state.player;
const bot = (state) => state.bot;
const playerBoard = (state) => state.playerBoard;
const playerShips = (state) => state.playerShips;
const botBoard = (state) => state.botBoard;
const botShips = (state) => state.botShips;
const dialogs = (state) => state.dialogs;
const music = (state) => state.music;
const sound = (state) => state.sound;
const level = (state) => state.level;

export const getPlayerName = cs(
  player,
  (p) => {
    return p.playerName
  }
)

export const getPlayer = player;
export const getBot = bot;
export const getPlayerBoard = playerBoard;
export const getPlayerShips = playerShips;
export const getBotBoard = botBoard;
export const getBotShips = botShips;
export const getDialogs = dialogs;
export const getMusic = music;
export const getSound = sound;
export const getLevel = level;