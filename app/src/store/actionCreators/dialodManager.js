import types from '../actionTypes';

export const openDialog = (dialogType) => ({
    type: types.OPEN_DIALOG,
    payload: dialogType
});

export const closeDialog = (dialogType) => ({
    type: types.CLOSE_DIALOG,
    payload: dialogType
});