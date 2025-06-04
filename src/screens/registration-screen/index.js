import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useDispatch } from "react-redux";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { buyerSignUpThunk } from "../../redux/slice/buyerSlice";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { location, role } = route.params || {};
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: JSON.stringify({
      latitude: 17.9156,
      longitude: 77.365,
    }),
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleIconPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleButtonClick = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: form.fullName,
      phone: form.phone,
      email: form.email,
      password: form.password,
      location: JSON.stringify({
        latitude: 17.9156,
        longitude: 77.365,
      }),
    };

    dispatch(buyerSignUpThunk(payload))
      .unwrap()
      .then(() => {
        navigation.navigate("RequestSentScreen");
      })
      .catch((err) => {
        const message =
          err?.message || (typeof err === "string" ? err : "An error occurred");
        alert(message);
      });
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
              value={form.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
            />
            <TextInputField
              placeholder="Phone Number"
              customStyle={styles.inputContainer}
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
            />
            <TextInputField
              placeholder="Email"
              customStyle={styles.inputContainer}
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
            />
            <TextInputField
              placeholder="Password"
              customStyle={styles.inputContainer}
              value={form.password}
              secureTextEntry
              onChangeText={(text) => handleChange("password", text)}
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
              label={"Submit For Verification Up"}
              handleButtonPress={handleButtonClick}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleIconPress}>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;
