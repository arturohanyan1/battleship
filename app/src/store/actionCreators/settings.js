import actionTypes from '../actionTypes';

export const setMusicOn = () => ({
  type: actionTypes.MUSIC_ON
});

export const setMusicOff = () => ({
  type: actionTypes.MUSIC_OFF
});

export const setSoundOn = () => ({
  type: actionTypes.SOUND_ON
});

export const setSoundOff = () => ({
  type: actionTypes.SOUND_OFF
});

export const setLevel = (payload) => ({
  type: actionTypes.SET_LEVEL,
  payload: payload
})

