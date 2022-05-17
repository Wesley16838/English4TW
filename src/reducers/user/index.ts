import * as actionTypes from "./../../actions/actionTypes";

const initialState: any = {
  isLoggedIn: false,
  users: null,
  loading: false,
  error: null,
};

const user = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.IS_USER_AUTHENTICATED:
      return {
        ...state,
        isLoggedIn: action.data.isLoggedIn,
        users: action.data.users,
      };
    case actionTypes.SET_USER_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        users: action.users,
      };
    case actionTypes.SET_USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.message,
      };
    case actionTypes.SET_USER_LOGOUT:
      return {
        ...state,
        users: null,
        loading: false,
        isLoggedIn: false,
        error: action.message,
      };
  }
  return state;
};

export default user;
