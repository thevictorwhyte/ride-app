import { combineReducers } from "redux";

import homeReducer from "./home/home.reducer";
import trackDriverReducer from "./trackDriver/trackDriver.reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  trackDriver: trackDriverReducer
});

export default rootReducer;
