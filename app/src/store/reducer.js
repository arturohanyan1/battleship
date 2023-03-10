import actionTypes from "./actionTypes";

const initialPlayer = { playerName: null }

export const player = (state = initialPlayer, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER:
      return {
        ...state, playerName: action.payload
      };
    case actionTypes.RESET_PLAYER:
      return initialPlayer;
    default:
      return state
  }
}

const initialPlayerBoard = []

export const playerBoard = (state = initialPlayerBoard, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_BOARD:
      return [...state, ...action.payload];
    case actionTypes.UPDATE_PLAYER_BOARD:
      return [...state];
    case actionTypes.DELETE_PLAYER_BOARD:
      return [...initialPlayerBoard];
    default:
      return state
  }
}

const initialPlayerShips = []

export const playerShips = (state = initialPlayerShips, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_SHIPS:
      return [...state, ...action.payload];
    case actionTypes.UPDATE_PLAYER_SHIPS:
      return [...state];
    case actionTypes.DELETE_PLAYER_SHIPS:
      return [...initialPlayerShips];
    default:
      return state
  }
}

const initialBotBoard = []

export const botBoard = (state = initialBotBoard, action) => {
  switch (action.type) {
    case actionTypes.SET_BOT_BOARD:
      return [...state, ...action.payload];
    case actionTypes.UPDATE_BOT_BOARD:
      return [...state];
    case actionTypes.DELETE_BOT_BOARD:
      return [...initialBotBoard];
    default:
      return state
  }
}

const initialBotShips = []

export const botShips = (state = initialBotShips, action) => {
  switch (action.type) {
    case actionTypes.SET_BOT_SHIPS:
      return [...state, ...action.payload];
    case actionTypes.UPDATE_BOT_SHIPS:
      return [...state];
    case actionTypes.DELETE_BOT_SHIPS:
      return [...initialBotShips];
    default:
      return state
  }
}