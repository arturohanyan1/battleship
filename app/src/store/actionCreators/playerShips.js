import actionTypes from '../actionTypes';

export const setPlayersShips = (payload) => ({
  type: actionTypes.SET_PLAYER_SHIPS,
  payload: payload,
});

export const updatePlayerShips = (payload) => ({
  type: actionTypes.UPDATE_PLAYER_SHIPS,
  payload: payload
});

export const deletePlayerShips = () => ({
  type: actionTypes.DELETE_PLAYER_SHIPS
});