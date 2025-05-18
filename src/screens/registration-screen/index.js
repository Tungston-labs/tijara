import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import MobileNumberInputField from "../../componets/MobileNumberInputField";
import TextInputField from "../../componets/TextInputField";

const RegistrationScreen = ({ navigation }) => {
  const handleIconPress = () => {
    navigation.navigate("LoginScreen");
  };
  const handleButtonClick = () => {
    navigation.navigate("RequestSentScreen");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <BackgroundWrapper style={styles.wrapperContainer}>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={"Complete your"}
            Subtitle={"Account Creation"}
          />

          <Image
            source={require("../../resources/images/profile.png")}
            resizeMode="contain"
            style={styles.ImageContainer}
          />

          <View style={styles.textInputcontainer}>
            <TextInputField
              placeholder={"Full Name"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Phone Number"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Email"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Password"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Confirm Password"}
              customStyle={styles.inputContainer}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={"Submit For Verification Up"}
              handleButtonPress={handleButtonClick}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;
