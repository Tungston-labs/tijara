import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";

const RequestSuccessScreen = ({ navigation }) => {
  const route = useRoute();
const passedUser = route.params?.user;

  const handleButtonClick = () => {
    navigation.navigate("RequestNotVerifiedScreen");
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../resources/images/VerifiedUser@3.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subtitle}>Your Seller account has been</Text>
            <Text style={styles.subtitle}>
              successfully verified and activated.
            </Text>
            <Text style={styles.subtitle2}>
              You're all set to start buying!
            </Text>
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

export default RequestSuccessScreen;
