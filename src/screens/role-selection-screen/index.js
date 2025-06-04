import React from "react";
import { View, Image, Text } from "react-native";
import BackgroundWrapper from "../../componets/BackgroundWrapper";

import styles from "./styles";
import Button from "../../componets/Button";
import Header from "../../componets/Header";

const RoleSelectionScreen = ({ navigation }) => {
  const handleButtonClick = () => {
    navigation.navigate("SellerRegistrationScreen",{ role: "seller" });
  };

  const handleIconPress = () => {
    navigation.navigate("CreateAccountScreen");
  };

const handleBuyerButtonClick = () => {
  navigation.navigate("RegistrationScreen", { role: "buyer" });
};



  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <Header handleIconPress={handleIconPress} icon={true} />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>Who Are You?</Text>
          </View>
          <Button label={"Buyer"} handleButtonPress={handleBuyerButtonClick} />
          <Button
            label={"Seller"}
            handleButtonPress={handleButtonClick}
            customStyle={styles.buttonStyle}
          />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default RoleSelectionScreen;
