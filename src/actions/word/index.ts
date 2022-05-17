import * as actionTypes from "../actionTypes";
import * as types from "../../types/pages/word";

export const setDailyWord = (word: string) => ({
  type: actionTypes.SET_DAILY_WORD,
  word,
});
