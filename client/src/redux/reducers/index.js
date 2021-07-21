import { combineReducers } from "redux";
import { Reducer } from "./Reducer";
import BigReducer from "./BigReducer";

const reducers = combineReducers({
  allData: Reducer,
  bigData: BigReducer,
});

export default reducers;
