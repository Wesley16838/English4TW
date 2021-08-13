import * as actionTypes from "./../../actions/actionTypes";
const initialState: any = {
    isLoggedIn: false
};

const userReducer = (
    state: any = initialState,
    action: any
): any => {
    switch (action.type) {
        case actionTypes.SET_USER_LOGIN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
    }
    return state;
};

export default userReducer;
