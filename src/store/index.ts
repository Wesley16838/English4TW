import { createStore, Store } from "redux";
import reducer from "./../reducers";

const store: Store<any, any> & {
    dispatch: any;
} = createStore(reducer);

export default store;
