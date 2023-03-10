import actionTypes from '../actionTypes';

export const setPlayer = (payload) => ({
  type: actionTypes.SET_PLAYER,
  payload: payload,
});

export const resetPlayer = () => ({
  type: actionTypes.RESET_PLAYER,
});