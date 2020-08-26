import * as ActionTypes from './ActionTypes';
import {initialState} from './initialState';

//change the state to an object with isLoading, errmess, dishes[],
export const User=(state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {...state, errMess: null, user: action.user,};
        case ActionTypes.USER_FAILED:
            return {...state, errMess: action.user};
        default:
            return state;
    }
}