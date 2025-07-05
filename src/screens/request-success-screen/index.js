import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../componets/Button";

const RequestSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;

  const handleLoginPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreenPassword" }],
    });
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.wrapperContainer}>
          <View style={styles.contentContainer}>
            <Image
              source={require("../../resources/images/VerifiedUser@3.png")}
              style={styles.ImageContainer}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Congratulations!</Text>
              <Text style={styles.subtitle}>
                Your {user?.role === "buyer" ? "Buyer" : "Seller"} account has been
              </Text>
              <Text style={styles.subtitle}>successfully verified and activated.</Text>
              <Text style={styles.subtitle2}>
                You're all set to start {user?.role === "buyer" ? "buying" : "selling"}!
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button label="Login" handleButtonPress={handleLoginPress} />
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default RequestSuccessScreen;
