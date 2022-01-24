import * as actionTypes from "../actionTypes";
import * as types from "../../types/user";

export const setUserLogin = (formData: any) => ({
  type: actionTypes.SET_USER_LOGIN,
  formData,
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