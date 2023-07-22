import actionTypes from "./actionTypes";

const initialPlayer = { playerName: '', avatar: 'avatar_1', flag: 'flag_1', won: 0, lost: 0 }

export const player = (state = initialPlayer, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER:
      return {
        ...state, ...action.payload
      };
    case actionTypes.SET_PLAYER_NAME:
      return {
        ...state, playerName: action.payload
      }
    case actionTypes.SET_PLAYER_AVATAR:
      return {
        ...state, avatar: action.payload
      }
    case actionTypes.SET_PLAYER_FLAG:
      return {
        ...state, flag: action.payload
      }
    case actionTypes.SET_PLAYER_WIN_COUNT:
      return {
        ...state, won: state.won + 1
      }
    case actionTypes.SET_PLAYER_LOST_COUNT:
      return {
        ...state, lost: state.lost + 1
      }
    case actionTypes.RESET_PLAYER:
    case actionTypes.LOG_OUT:
      return initialPlayer;
    default:
      return state
  }
}

const initialBot = { botName: 'bot', avatar: 'avatar_1', flag: 'flag_1', won: 0, lost: 0 }

export const bot = (state = initialBot, action) => {
  switch (action.type) {
    case actionTypes.SET_BOT:
      return {
        ...state, ...action.payload
      };
    case actionTypes.SET_BOT_NAME:
      return {
        ...state, botName: action.payload
      }
    case actionTypes.SET_BOT_AVATAR:
      return {
        ...state, avatar: action.payload
      }
    case actionTypes.SET_BOT_FLAG:
      return {
        ...state, flag: action.payload
      }
    case actionTypes.SET_BOT_WIN_COUNT:
      return {
        ...state, won: state.won + 1
      }
    case actionTypes.SET_BOT_LOST_COUNT:
      return {
        ...state, lost: state.lost + 1
      }
    case actionTypes.RESET_BOT:
    case actionTypes.LOG_OUT:
      return initialBot;
    default:
      return state
  }
}

const initialPlayerSavedBoard = []

export const playerSavedBoard = (state = initialPlayerSavedBoard, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_SAVED_BOARD:
      return action.payload;
    case actionTypes.DELETE_PLAYER_SAVED_BOARD:
    case actionTypes.LOG_OUT:
      return [...initialPlayerSavedBoard];
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
    case actionTypes.LOG_OUT:
      return [...initialPlayerBoard];
    default:
      return state
  }
}

const initialPlayerSavedShips = []

export const playerSavedShips = (state = initialPlayerSavedShips, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYER_SAVED_SHIPS:
      return action.payload;
    case actionTypes.DELETE_PLAYER_SAVED_SHIPS:
    case actionTypes.LOG_OUT:
      return [...initialPlayerSavedShips];
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
    case actionTypes.LOG_OUT:
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
    case actionTypes.LOG_OUT:
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
    case actionTypes.LOG_OUT:
      return [...initialBotShips];
    default:
      return state
  }
}

const dialogsInitial = {};

export const dialogs = (state = dialogsInitial, action) => {
  switch (action.type) {
    case actionTypes.OPEN_DIALOG:
      return { ...state, [action.payload.dialogType]: action.payload }
    case actionTypes.CLOSE_DIALOG:
    case actionTypes.LOG_OUT:
      return { ...state, [action.payload]: null }
    default:
      return state;
  }
};

const musicInitial = false;

export const music = (state = musicInitial, action) => {
  switch (action.type) {
    case actionTypes.MUSIC_ON:
      return true;
    case actionTypes.MUSIC_OFF:
    case actionTypes.LOG_OUT:
      return false;
    default:
      return state;
  }
};

const soundInitial = false;

export const sound = (state = soundInitial, action) => {
  switch (action.type) {
    case actionTypes.SOUND_ON:
      return true;
    case actionTypes.SOUND_OFF:
    case actionTypes.LOG_OUT:
      return false;
    default:
      return state;
  }
};

const levelInitial = 'level3';

export const level = (state = levelInitial, action) => {
  switch (action.type) {
    case actionTypes.SET_LEVEL:
      return action.payload;
    case actionTypes.LOG_OUT:
      return levelInitial
    default:
      return state;
  }
}