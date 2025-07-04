import React, { useEffect } from "react";
import { View, Image } from "react-native";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import styles from "./styles";
import { loadAuthData } from "../../utils/mmkvStorage";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      const { token, user, role } = loadAuthData();

      if (token && user) {
        if (role === "buyer") {
          navigation.replace("BuyerHomeScreen");
        } else if (role === "seller") {
          navigation.replace("SellerHomeScreen");
        } else {
          navigation.replace("LoginScreenPassword");
        }
      } else {
        navigation.replace("LoginScreenPassword");
      }
    }, 1500); 

    return () => clearTimeout(navigationTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundWrapper customStyle={styles.wrapperContainer}>
        <Image
          source={require("../../resources/images/logotijara.png")}
          style={styles.ImageContainer}
          resizeMode="contain"
        />
      </BackgroundWrapper>
    </View>
  );
};

export default SplashScreen;
