import * as actionTypes from "../actionTypes";
import * as types from "../../types/word";

export const getDayWord = (word: types.IWord) => ({
  type: actionTypes.GET_DAY_WORD,
  word,
});
