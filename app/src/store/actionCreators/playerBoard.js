import actionTypes from '../actionTypes';

export const setPlayerSavedBoard = (payload) => ({
  type: actionTypes.SET_PLAYER_SAVED_BOARD,
  payload: payload,
});

export const deletePlayerSavedBoard = () => ({
  type: actionTypes.DELETE_PLAYER_SAVED_BOARD
});

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