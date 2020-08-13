import React from "react";
import { Router, Scene } from "react-native-router-flux";

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./routes/home/home.component";

const Main = () => {
  return (
    <Provider store={store}>
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} initial={true} />
        </Scene>
      </Router>
    </Provider>
  );
};

export default Main;