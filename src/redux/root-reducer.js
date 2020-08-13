import { combineReducers } from "redux";

import homeReducer from "./home/home.reducer";

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
