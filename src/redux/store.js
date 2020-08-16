import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from 'redux-socket.io';
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import io from "socket.io-client/dist/socket.io";

import rootReducer from "./root-reducer";

let socket = io('https://ride-server.herokuapp.com/', { jsonp: false });
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const log = createLogger({ diff: true, collapsed: true });
const middlewares = [thunk, socketIoMiddleware];

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
