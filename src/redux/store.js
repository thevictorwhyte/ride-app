import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";

const log = createLogger({ diff: true, collapsed: true });
const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(log);
}

const enhancers = [];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
  ...enhancers
);

export default store;
