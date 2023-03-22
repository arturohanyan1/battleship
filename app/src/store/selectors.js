import { createSelector as cs } from "reselect";

const player = (state) => state?.player;
const playerBoard = (state) => state?.playerBoard;
const playerShips = (state) => state?.playerShips;
const botBoard = (state) => state?.botBoard;
const botShips = (state) => state?.botShips;
const dialogs = (state) => state?.dialogs;

export const getPlayerName = cs(
  player,
  (p) => {
    return p.playerName
  }
)

export const getPlayerBoard = playerBoard;
export const getPlayerShips = playerShips;
export const getBotBoard = botBoard;
export const getBotShips = botShips;
export const getDialogs = dialogs;