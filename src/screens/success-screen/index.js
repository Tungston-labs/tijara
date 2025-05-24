import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.wrapperContainer}>
          <Image
            source={require("../../resources/images/Success.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Request sent</Text>
            <Text style={styles.subtitle}>success</Text>
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default SuccessScreen;
