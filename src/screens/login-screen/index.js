import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import Header from "../../componets/Header";
import MobileNumberInputField from "../../componets/MobileNumberInputField";

const LoginScreen = ({ navigation }) => {
  const handleButtonClick = () => {
    navigation.navigate("RegistrationScreen");
  };
  const handleIconPress = () => {
    navigation.navigate("RoleSelectionScreen");
  };
  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <Header icon={true} handleIconPress={handleIconPress} />
        <View style={styles.contentContainer}>
          <View style={styles.wrapperContainer}>
            <View>
              <Image
                source={require("../../resources/images/tijara-logo.png")}
                style={styles.ImageContainer}
                resizeMode="contain"
              />

              <View style={styles.textContainer}>
                <Text style={styles.title}>Enter your mobile number</Text>
                <Text style={styles.subtitle}>
                  Please confirm your country code and
                </Text>
                <Text style={styles.subtitle}>enter your mobile number</Text>
              </View>
              <MobileNumberInputField
                customStyle={styles.inputContainer}
                placeholder={"Mobile Number"}
              />
              {/* <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Location</Text>
                <Text style={styles.inputText}>Dubai</Text>
              </View> */}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                label={"Log In"}
                handleButtonPress={handleButtonClick}
                customStyle={styles.buttonStyle}
              />
            </View>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Don’t have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.loginLink}> Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}> Now </Text>
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default LoginScreen;
