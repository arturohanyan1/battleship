import actionTypes from '../actionTypes';

export const setPlayerBoard = (payload) => ({
  type: actionTypes.SET_PLAYER_BOARD,
  payload: payload,
});

export const updatePlayerBoard = (payload) => ({
  type: actionTypes.UPDATE_PLAYER_BOARD,
  payload: payload
});

export const deletePlayerBoard = () => ({
  type: actionTypes.DELETE_PLAYER_BOARD
});