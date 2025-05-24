import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";

const RequestNotVerifiedScreen = ({ navigation }) => {
  const handleButtonClick = () => {
    navigation.navigate("SuccessScreen");
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../resources/images/DeclainedUser.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Not Verified!</Text>
            <Text style={styles.subtitle}>
              We’re sorry, but your account could
            </Text>
            <Text style={styles.subtitle}>
              not be verified at this time. Please{" "}
            </Text>
            <Text style={styles.subtitle}>
              review your details and try again or
            </Text>
            <Text style={styles.subtitle}>contact support for assistance.</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={"Subscribe to our annual plan"}
            handleButtonPress={handleButtonClick}
          />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default RequestNotVerifiedScreen;
