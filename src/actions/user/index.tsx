import * as actionTypes from "./../actionTypes";
import * as types from "./../../types/user"

export const getUser = (user: types.IUser) => ({
    type: actionTypes.GET_USER,
    user,
});

export const setUserLogin = (isLoggedIn: boolean) => ({
    type: actionTypes.SET_USER_LOGIN,
    isLoggedIn,
});