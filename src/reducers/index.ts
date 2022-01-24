import { combineReducers } from "redux";
import user from "./user";
import word from "./word";
import page from "./page";
export default combineReducers({
  user,
  word,
  page,
});
