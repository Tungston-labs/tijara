import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";

const SellerRegistrationScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    tradeLicenseNumber: "",
    managerName: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(false);
  const handleIconPress = () => {
    navigation.navigate("LoginScreen");
  };
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };
  const handleSelectImage = () => {
    const options = {
      mediaType: "photo",
      quality: 0.7,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.error("ImagePicker Error: ", response.errorMessage);
        return;
      }

      const asset = response.assets?.[0];
      if (asset) {
        setProfileImage({
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
        });
      }
    });
  };

  const handleNext = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const basicFormData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      coords: {
        latitude: 25.276987,
        longitude: 55.296249,
      },
    };

    navigation.navigate("SellerRegistrationSecond", {
      form: basicFormData,
      profileImage,
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
          <View style={styles.profileImageWrapper}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage.uri }
                  : require("../../resources/images/profile.png")
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.plusIconContainer}
              onPress={handleSelectImage}
            >
              <Icon name="plus-circle" size={24} color="#9AD000" />
            </TouchableOpacity>
          </View>
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
            <TouchableOpacity
              onPress={handleNext}
              disabled={loading}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}></Text>
              <Icon
                name="chevron-right"
                size={24}
                color="#fff"
                style={styles.nextButtonIcon}
              />
            </TouchableOpacity>
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
export default SellerRegistrationScreen;
