import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";

const RequestSentScreen = () => {
  const handleButtonClick = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.wrapperContainer}>
          <Image
            source={require("../../resources/images/Tick@2.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Thank you!</Text>
            <Text style={styles.subtitle}>
              Your account is under review and
            </Text>
            <Text style={styles.subtitle}>
              willBe verified within 24 hours. Please
            </Text>
            <Text style={styles.subtitle}>check back later. </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={"Submit For Verification Up"}
              handleButtonPress={handleButtonClick}
            />
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default RequestSentScreen;
