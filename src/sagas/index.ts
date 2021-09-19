import { all } from "redux-saga/effects";
import userSaga from "./useSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
