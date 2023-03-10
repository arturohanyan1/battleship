import actionTypes from '../actionTypes';

export const setBotShips = (payload) => ({
  type: actionTypes.SET_BOT_SHIPS,
  payload: payload,
});

export const updateBotShips = (payload) => ({
  type: actionTypes.UPDATE_BOT_SHIPS,
  payload: payload
});

export const deleteBotShips = () => ({
  type: actionTypes.DELETE_BOT_SHIPS
});