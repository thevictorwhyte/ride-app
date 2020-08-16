import React from "react";
import { Text, Image } from "react-native";
import { Header, Left, Body, Right, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./header.styles";

const HeaderContainer = ({ logo }) => {
  return (
    <Header style={{ backgroundColor: "#0f083b" }} iosBarStyle="light-content">
      <Left>
        <Button transparent>
          <FontAwesome name="navicon" style={styles.icon} />
        </Button>
      </Left>

      <Body>
        <Image resizeMode="contain" style={styles.logo} source={logo} />
      </Body>

      <Right>
        <Button transparent>
          <FontAwesome name="location-arrow" style={styles.icon} />
        </Button>
      </Right>
    </Header>
  );
};

export default HeaderContainer;
