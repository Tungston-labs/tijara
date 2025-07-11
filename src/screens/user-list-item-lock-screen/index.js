import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";

const TradeLicenseLockScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        {/* Center content */}
        <View style={styles.content}>
          <Image
            source={require("../../resources/images/lock-icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.title}>Verification Required</Text>
          <Text style={styles.subtitle}>
            Please verify your identity to {"\n"} access this content.
          </Text>
        </View>

        {/* Bottom button */}
        <View style={styles.footer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("UploadTradeLicenseScreen")}
          >
            <Text style={styles.buttonText}>Verify Now</Text>
          </Pressable>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default TradeLicenseLockScreen;
