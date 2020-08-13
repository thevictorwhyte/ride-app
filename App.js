import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

import Main from "./src/index";

export default function App() {
  return (
    <View style={styles.container}>
      <Main {...this.props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
