import * as actionTypes from "../actionTypes";
import * as types from "../../types/pages/user";

export const isUserAuthenticated = (data: any) => ({
  type: actionTypes.IS_USER_AUTHENTICATED,
  data,
});

export const setUserLogin = (data: any) => ({
  type: actionTypes.SET_USER_LOGIN,
  payload: data,
});

export const setUserLoginSuccess = (users: any) => ({
  type: actionTypes.SET_USER_LOGIN_SUCCESS,
  users,
});

export const setUserLoginFail = (err: any) => ({
  type: actionTypes.SET_USER_LOGIN_FAIL,
  message: err,
});

export const setUserLogout = () => ({
  type: actionTypes.SET_USER_LOGOUT,
});

