import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import Header from "../../componets/Header";
import { useRoute } from "@react-navigation/native";
import { fetchLocationThunk } from "../../redux/slice/locationSlice";
import { useDispatch } from "react-redux";

const CreateAccountScreen = ({ navigation }) => {
  const route = useRoute();
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();
  const handleSearch = async () => {
    console.log("Searching for location:", searchText);
    try {
      const resultAction = await dispatch(fetchLocationThunk(searchText));
      console.log("Thunk result action:", resultAction);

      if (fetchLocationThunk.fulfilled.match(resultAction)) {
        const locations = resultAction.payload;
        console.log("Locations found:", locations);
        if (locations.length > 0) {
          setLocation(locations[0]);
        } else {
          setLocation(null);
        }
      } else {
        console.log("Thunk rejected or something else happened");
        setLocation(null);
      }
    } catch (error) {
      console.error("Location search error:", error);
      setLocation(null);
    }
    Keyboard.dismiss();
  };

  const handleButtonClick = () => {
    if (!location) {
      alert("Please search and select a valid location");
      return;
    }
    navigation.navigate("RoleSelectionScreen", {
      location: {
        latitude: location.coordinates.coordinates[1],
        longitude: location.coordinates.coordinates[0],
      },
      role: route.params?.role || "buyer",
    });
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

            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder=""
              style={styles.inputText}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <Text style={[styles.inputText, { marginTop: 10 }]}>
              {location
                ? `${location?.name}, ${location?.country}`
                : "No location selected"}
            </Text>
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
