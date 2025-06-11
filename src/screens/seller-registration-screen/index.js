import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { sellerSignUpThunk } from "../../redux/slice/sellerSlice";

const SellerRegistrationScreen = () => {
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
    tradeLicenseNumber,
    tradeLicenseCopy,
    managerName,
    companyName,
  });
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleButtonClick = () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const payload = {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      location: JSON.stringify({
        latitude: 17.9156,
        longitude: 77.365,
      }),
      tradeLicenseNumber,
      tradeLicenseCopy,
      managerName,
      companyName,
    };
    dispatch(sellerSignUpThunk(payload))
      .unWrap()
      .then(() => {
        navigation.navigate("RequestSentScreen");
      })
      .catch((error) => {
        const message =
          error?.message ||
          (typeof error === "string" ? error : "An error occured");
        alert(message);
      });
    const handleIconPress = () => {
      navigation.navigate("LoginScreen");
    };
    const handleButtonClick = () => {
      navigation.navigate("BuyerPaymentInfoScreen");
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
                placeholder={"Company Name"}
                customStyle={styles.inputContainer}
                value={form.companyName}
                onChangeText={(text) => handleChange("companyName", text)}
              />
              <TextInputField
                placeholder={"Trade License Number"}
                customStyle={styles.inputContainer}
                value={FormData.tradeLicenseNumber}
                onChangeText={(text) =>
                  handleChange("tradeLicenseNumber", text)
                }
              />
              <TextInputField
                placeholder={"Manager Name"}
                customStyle={styles.inputContainer}
                value={FormData.managerName}
                onChangeText={(text) => handleChange("managerName", text)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                label={"Submit For Verification"}
                handleButtonPress={handleButtonClick}
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
          </BackgroundWrapper>
        </View>
      </ScrollView>
    );
  };
};
export default SellerRegistrationScreen;
