import React from "react";
import { Text } from "react-native";
import { Footer, FooterTab, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./footer.styles";

const FooterContainer = ({ logo }) => {
  // tab bar items
  const tabs = [
    {
      title: "Car",
      subTitle: "Book a ride",
      icon: "car",
    },
    {
      title: "Car share",
      subTitle: "Share a ride",
      icon: "slideshare",
    },
    {
      title: "Bus",
      subTitle: "Book a bus seat",
      icon: "bus",
    },
    {
      title: "Train",
      subTitle: "Book a train",
      icon: "train",
    },
  ];
  return (
    <Footer style={styles.footerMain} >
      <FooterTab style={styles.footerContainer} iosBarStyle="light-content">
        {tabs.map((tab, i) => {
          return (
            <Button key={i}>
              <FontAwesome
                size={20}
                name={tab.icon}
                color={i === 0 ? "#5C5393" : "#bdbbbb"}
              />
              <Text
                style={{ fontSize: 15, color: i === 0 ? "#5C5393" : "#bdbbbb" }}
              >
                {tab.title}
              </Text>
              <Text style={styles.subText}>{tab.subTitle}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default FooterContainer;
