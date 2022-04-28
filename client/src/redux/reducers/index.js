import { combineReducers } from "redux";
import map from "./mapReducer";

const rootReducer = combineReducers({
  map: map,
});

export default rootReducer;
