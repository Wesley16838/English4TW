import { all, call, put, takeEvery } from "redux-saga/effects";
import { CommonActions } from '@react-navigation/native';
import axios from "axios";
import { setUserLoginSuccess, setUserLoginFail, setUserLogout } from "../actions/user";

const loginAPI = async (formData: any) => {
  const result = await axios({
    method: "post",
    url: "https://www.english4tw.com/login_ajax",
    data: formData.formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result;
};

const logoutAPI = async () => {
  const result = await axios({
    method: "get",
    url: "https://www.english4tw.com/logout",
  });
  return result;
};

function* userLogin(loginData: any): any {
  try {
    const users = yield call(loginAPI, loginData);
    if (users.data.message === "Login Failed") throw new Error("Login Failed");
    yield put(setUserLoginSuccess(users.data.data));
  } catch (err) {
    yield put(setUserLoginFail(err));
  }
}

function* userLogout(): any {
  try {
    const users = yield call(logoutAPI);
    yield put(setUserLogout());
  } catch (err) {
    yield put(setUserLoginFail(err));
  }
}

function* userSaga() {
  yield all([takeEvery("SET_USER_LOGIN", userLogin)]);
}

export default userSaga;
