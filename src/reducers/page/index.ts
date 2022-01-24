import * as actionTypes from "./../../actions/actionTypes";
const initialState: any = {
    nextPage: '',
    parameter: {}
};

const page = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.SET_NEXT_PAGE:
        return({
            ...state,
            nextPage: action.page,
            parameter: action.parameter || state.parameter
        })
    case actionTypes.RESET_NEXT_PAGE:
        return({
            ...state,
            nextPage: '',
            parameter: {}
        })
  }
  return state;
};

export default page;
