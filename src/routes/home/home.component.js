import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

const Home = ({ name }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello {name}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  name: state.home.name,
});

export default connect(mapStateToProps)(Home);
