import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import notebookData from "./notebookSlice";
import viewListener from "./screenSlice";

const reducers = {
  notebookData: notebookData,
  viewListener: viewListener,
};

const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default store;
