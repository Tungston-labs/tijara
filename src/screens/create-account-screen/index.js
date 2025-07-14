import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentLocation } from "../../utils/geoLocation";
// import Icon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/Ionicons";

const CreateAccountScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    setIsFetching(true);
    try {
      const { latitude, longitude } = await getCurrentLocation();
      const loc = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      setLocation(loc);
    } catch (err) {
      console.error("Location error:", err);
      setLocation("Unable to fetch location");
    } finally {
      setIsFetching(false);
    }
  };

  const handleButtonClick = () => {
    if (isFetching || !location || location === "Unable to fetch location")
      return;
    navigation.navigate("RegistrationScreen", { location });
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <Header />
        <View style={styles.contentContainer}>
          <Image
            source={require("../../resources/images/logotijara.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>for a Personalized Experience</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Location</Text>
            <Text style={styles.inputText}>{location || "Fetching..."}</Text>
          </View>

          {!isFetching && location === "Unable to fetch location" && (
            <TouchableOpacity
              onPress={fetchLocation}
              style={{ alignSelf: "center", marginTop: 10 }}
            >
              <Text style={{ color: "#B3DB48", fontSize: 14 }}>
                Retry Fetch Location
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                (isFetching || location === "Unable to fetch location") && {
                  opacity: 0.5,
                },
              ]}
              onPress={handleButtonClick}
              disabled={isFetching || location === "Unable to fetch location"}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Sign Up</Text>
                {isFetching ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Icon name="chevron-forward" size={20} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreenPassword")}
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
