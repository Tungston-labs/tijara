import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import Header from "../../componets/Header";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateAccountScreen = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    navigation.navigate("RoleSelectionScreen");
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <Header />
        <View style={styles.contentContainer}>
          <Image
            source={require("../../resources/images/tijara-logo.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>for a Personalized Experience</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Location</Text>
            <Text style={styles.inputText}>Dubai</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={"Sign Up"}
              icon={true}
              handleButtonPress={handleButtonClick}
              customStyle={styles.buttonStyle}
              IconColor={"#fff"}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default CreateAccountScreen;
