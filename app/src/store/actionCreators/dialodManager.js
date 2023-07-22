import types from '../actionTypes';

export const openDialog = (dialogType, data = null) => ({
    type: types.OPEN_DIALOG,
    payload: { dialogType, data: data }
});

export const closeDialog = (dialogType) => ({
    type: types.CLOSE_DIALOG,
    payload: dialogType
});