import actionTypes from '../actionTypes';

export const setPlayer = (payload) => ({
  type: actionTypes.SET_PLAYER,
  payload: payload,
});

export const setPlayerName = (payload) => ({
  type: actionTypes.SET_PLAYER_NAME,
  payload: payload
})

export const setPlayerAvatar = (payload) => ({
  type: actionTypes.SET_PLAYER_AVATAR,
  payload: payload
})

export const setPlayerFlag = (payload) => ({
  type: actionTypes.SET_PLAYER_FLAG,
  payload: payload
})

export const setPlayerWinCount = () => ({
  type: actionTypes.SET_PLAYER_WIN_COUNT
})

export const setPlayerlostCount = () => ({
  type: actionTypes.SET_PLAYER_LOST_COUNT
})

export const resetPlayer = () => ({
  type: actionTypes.RESET_PLAYER,
});