import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";

const SellerHomeScreenEmptybox = () => {
  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.wrapperContainer}>
          <Image
            source={require("../../resources/images/Empty.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>No items yet -start by adding</Text>
            <Text style={styles.title}>one to see them here!</Text>
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default SellerHomeScreenEmptybox;
