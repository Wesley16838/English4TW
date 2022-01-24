import * as actionTypes from "../actionTypes";
import * as types from "../../types/word";

export const setNextPage = (page: string, parameter?: object) => ({
    type: actionTypes.SET_NEXT_PAGE,
    page,
    parameter,
});

export const resetNextPage = (page: string, parameter: object) => ({
    type: actionTypes.RESET_NEXT_PAGE,
});