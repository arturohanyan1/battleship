import actionTypes from '../actionTypes';

export const setBotBoard = (payload) => ({
  type: actionTypes.SET_BOT_BOARD,
  payload: payload,
});

export const updateBotBoard = (payload) => ({
  type: actionTypes.UPDATE_BOT_BOARD,
  payload: payload
});

export const deleteBotBoard = () => ({
  type: actionTypes.DELETE_BOT_BOARD
});