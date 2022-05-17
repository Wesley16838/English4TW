import { createStore, Store, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const store: Store<any, any> & {
  dispatch: any;
} = createStore(reducer ,applyMiddleware(sagaMiddleware, createLogger()));

sagaMiddleware.run(rootSaga);
export default store;
