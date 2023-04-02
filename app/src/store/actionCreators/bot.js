import actionTypes from '../actionTypes';

export const setBot = (payload) => ({
  type: actionTypes.SET_BOT,
  payload: payload,
});

export const setBotName = (payload) => ({
  type: actionTypes.SET_BOT_NAME,
  payload: payload
})

export const setBotAvatar = (payload) => ({
  type: actionTypes.SET_BOT_AVATAR,
  payload: payload
})

export const setBotFlag = (payload) => ({
  type: actionTypes.SET_BOT_FLAG,
  payload: payload
})

export const setBotWinCount = () => ({
  type: actionTypes.SET_BOT_WIN_COUNT
})

export const setBotlostCount = () => ({
  type: actionTypes.SET_BOT_LOST_COUNT
})

export const resetBot = () => ({
  type: actionTypes.RESET_BOT,
});