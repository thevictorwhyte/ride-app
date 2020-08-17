import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Home from "./routes/home/home.component";
import TrackDriver from "./routes/track-driver/track-driver.component";

const Main = () => {

  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="home" component={Home} title="Home" initial={true} />
        <Scene key="trackDriver" component={TrackDriver} title="trackDriver" />
      </Scene>
    </Router>
  );
}

export default Main;
