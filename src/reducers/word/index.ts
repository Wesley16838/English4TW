import * as actionTypes from "./../../actions/actionTypes";
const initialState: any = {
  dailyword: "",
};

const word = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.SET_DAILY_WORD:
      return {
        ...state,
        dailyword: action.word,
      };
  }
  return state;
};

export default word;
