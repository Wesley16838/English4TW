import { all, call, fork, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import authSeviceStorage from "../services/authDeviceStorage";
import { setUserLoginSuccess, setUserLoginFail, setUserLogout } from "../actions/user";
import {
  SET_USER_LOGIN, SET_USER_LOGOUT
} from "../actions/actionTypes"
import api from "../services/api"
const loginAPI = async (email: string, password: string) => {
  const res = await api.post("/api/auth",{ email, password })
  if (res.data.message === "Login Failed") {
    throw new Error("Login Failed");
  } else {
    await authSeviceStorage.saveItem("JWT_TOKEN", JSON.stringify(res.data.data))
  }
  return res
};

const logoutAPI = async () => {
  await api.get(`/logout`)
  await authSeviceStorage.deleteItem('JWT_TOKEN')
};

function* userLogin({ payload: { email, password } }: any): any{
  try {
    const users = yield call(loginAPI, email, password);
    yield put(setUserLoginSuccess(users.data.data));
  } catch (err) {
    yield put(setUserLoginFail(err));
  }
}

function* userLogout(): any {
  try {
    yield call(logoutAPI);
  } catch (err) {
    yield put(setUserLoginFail(err));
  }
}
function* onUserLogin(){
  yield takeLatest(SET_USER_LOGIN, userLogin);
}
function* onUserLogout(){
  yield takeLatest(SET_USER_LOGOUT, userLogout);
}
function* userSaga() {
  yield all([
    call(onUserLogin),
    call(onUserLogout)
  ])
}

export default userSaga;
