import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import MobileNumberInputField from "../../componets/MobileNumberInputField";
import TextInputField from "../../componets/TextInputField";

const BuyerPaymentInfoScreen = ({ navigation }) => {
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
            Title={"Payment Details"}
          />

          <View style={styles.textInputcontainer}>
            <TextInputField
              placeholder={"Select Plan"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Manager Name"}
              customStyle={styles.inputContainer}
            />
            <TextInputField
              placeholder={"Enter Payment Details"}
              customStyle={styles.inputContainer}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={"Confirm"}
              handleButtonPress={handleButtonClick}
            />
          </View>
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default BuyerPaymentInfoScreen;
