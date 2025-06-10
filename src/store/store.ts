import { createStore, combineReducers } from "redux";
import notebookData from "./notebookSlice";
import viewListener from "./screenSlice";

const rootReducer = combineReducers({
  notebookData: notebookData,
  viewListener: viewListener,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
