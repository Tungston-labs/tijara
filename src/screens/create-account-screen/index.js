import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import { useNavigation } from "@react-navigation/native";
import { getCurrentLocation } from "../../utils/geoLocation";
import Icon from "react-native-vector-icons/Ionicons";
import { OPENCAGE_API_KEY } from "@env";
import axios from "axios";

const CreateAccountScreen = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchLocation = async () => {
    setIsFetching(true);
    try {
      const position = await getCurrentLocation();

      if (!position) {
        setIsFetching(false);
        return;
      }

      const { latitude, longitude } = position;
      setCoords({ latitude, longitude });

      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`;
      const response = await axios.get(url);

      const components = response.data?.results?.[0]?.components;
      const name =
        components?.city ||
        components?.town ||
        components?.village ||
        response.data?.results?.[0]?.formatted ||
        "Selected Location";

      setLocation(name);
    } catch (err) {
      console.warn("Location fetch failed:", err);
      Alert.alert(
        "Location Optional",
        "You can continue without location and add delivery address later."
      );
    } finally {
      setIsFetching(false);
    }
  };

  const handleButtonClick = () => {
    navigation.navigate("RegistrationScreen", {
      coords: coords || null,
      locationName: location || null,
    });
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
            <Text style={styles.subtitle}>
              Location helps us show nearby sellers (optional)
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.placeholder}>Location</Text>
            <Text style={styles.inputText}>
              {location || "Not selected"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={fetchLocation}
            style={{ alignSelf: "center", marginTop: 10 }}
          >
            {isFetching ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: "#B3DB48", fontSize: 14 }}>
                Use My Location
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleButtonClick}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Sign Up</Text>
                <Icon name="chevron-forward" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 12,
              color: "#888",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            You can add or change your delivery address later.
          </Text>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
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
