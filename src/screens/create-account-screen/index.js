import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import Header from "../../componets/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUserLocation } from "../../utils/geoLocation";
import { Alert } from "react-native";

const CreateAccountScreen = ({  }) => {
  const route = useRoute();
  const navigation=useNavigation();
  const [loading, setLoading] = useState(false);

const handleButtonClick = async () => {
    setLoading(true);
    try {
      const coords = await getUserLocation();
      // Pass actual coordinates to next screen
      navigation.navigate("RoleSelectionScreen", {
        location: coords,
        role: route.params?.role || "buyer",
      });
    } catch (error) {
      Alert.alert(
        "Location Error",
        "Could not fetch your location. Using default location.",
        [{ text: "OK" }]
      );
      // Fallback to default coordinates if permission denied or error
      navigation.navigate("RoleSelectionScreen", {
        location: {
          latitude: 25.276987,
          longitude: 55.296249,
        },
        role: route.params?.role || "buyer",
      });
    } finally {
      setLoading(false);
    }
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
            <TouchableOpacity>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default CreateAccountScreen;