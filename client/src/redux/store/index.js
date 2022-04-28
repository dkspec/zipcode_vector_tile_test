import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const withDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  withDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
