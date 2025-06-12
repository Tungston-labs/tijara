import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import images from "../../config/images";
import TextInputField from "../../componets/TextInputField";

import { buyerSignUpThunk } from "../../redux/slice/buyerSlice";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleIconPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleButtonClick = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {

      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        password: form.password,
        coords: {
          latitude: "25.276987",
          longitude: "55.296249",
        },
        profileImage:
          "MV5BZGYwYTNjNTAtZTFhNS00MDQ5LThmZjUtN2I4ODQ5ZjI2NjI4DQ5ZII...", // Mock image data
      };

      console.log("Sending registration payload:", payload);
      const response = await dispatch(buyerSignUpThunk(payload)).unwrap();
      console.log("Registration response:", response);

      navigation.navigate("RequestSentScreen");
    } catch (err) {
      const message =
        err?.message || (typeof err === "string" ? err : "An error occurred");
      Alert.alert("Signup Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackgroundWrapper style={styles.wrapperContainer}>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={"Complete your"}
            Subtitle={"Account Creation"}
          />
          <Image
            source={require("../../resources/images/profile.png")}
            resizeMode="contain"
            style={styles.ImageContainer}
          />
          <View style={styles.textInputcontainer}>
            <TextInputField
              placeholder="Full Name"
              customStyle={styles.inputContainer}
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <TextInputField
              placeholder="Phone Number"
              customStyle={styles.inputContainer}
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
              keyboardType="phone-pad"
            />
            <TextInputField
              placeholder="Email"
              customStyle={styles.inputContainer}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
            />
            <TextInputField
              placeholder="Password"
              customStyle={styles.inputContainer}
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry
            />
            <TextInputField
              placeholder="Confirm Password"
              customStyle={styles.inputContainer}
              value={form.confirmPassword}
              secureTextEntry
              onChangeText={(text) => handleChange("confirmPassword", text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label={loading ? "Submitting..." : "Submit For Verification"}
              handleButtonPress={handleButtonClick}
              disabled={loading}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleIconPress}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;
