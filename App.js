import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import { Provider } from "react-redux";
import store from "./src/redux/store";

import Main from "./src/index";

const App = () => {

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Main {...this.props} />
      </View>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;