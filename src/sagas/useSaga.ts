import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { setUserLoginSuccess, setUserLoginFail } from "../actions/user";

const loginAPI = async (formData: any) => {
  console.log("loginAPI,", formData);
  const result = await axios({
    method: "post",
    url: "https://www.english4tw.com/login_ajax",
    data: formData.formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result;
};

function* userLogin(loginData: any) {
  try {
    console.log("before userLogin");
    console.log("formData", loginData);
    const users = yield call(loginAPI, loginData);
    if (users.data.message === "Login Failed") throw new Error("Login Failed");
    console.log("after login,", users.data.data);
    yield put(setUserLoginSuccess(users.data.data));
  } catch (err) {
    yield put(setUserLoginFail(err));
  }
}
function* userLogout() {}

function* userSaga() {
  yield takeEvery("SET_USER_LOGIN", userLogin);
}

export default userSaga;
