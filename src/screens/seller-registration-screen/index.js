import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";

const SellerRegistrationScreen = ({ navigation }) => {
  const handleIconPress = () => {
    navigation.navigate("LoginScreen");
  };
  const handleButtonClick = () => {
    navigation.navigate("BuyerPaymentInfoScreen");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <BackgroundWrapper style={styles.wrapperContainer}>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
          />

          <View style={styles.textInputcontainer}>
            <TextInputField
              placeholder={"Company Name"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Trade License Number"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Manager Name"}
              customStyle={styles.inputContainer}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={"Submit For Verification"}
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

export default SellerRegistrationScreen;
