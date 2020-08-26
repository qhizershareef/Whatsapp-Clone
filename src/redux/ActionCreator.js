import * as ActionTypes from './ActionTypes';

export const setUser = (user) => ({
    type: ActionTypes.SET_USER,
    payload:user
});

export const UserFailed = (errmess) => ({
    type: ActionTypes.USER_FAILED,
    payload: errmess
})