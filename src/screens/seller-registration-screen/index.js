import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { sellerSignUpThunk } from "../../redux/slice/sellerSlice";
import Icon from "react-native-vector-icons/Feather"
import { launchImageLibrary } from "react-native-image-picker";


const SellerRegistrationScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
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
    quality: 1,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      console.log("Image Picker Error: ", response.errorMessage);
      return;
    }

    const asset = response.assets?.[0];
    if (asset) {
      setProfileImage(asset);
      // also update form data if needed
    }
  });
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
          "MV5BZGYwYTNjNTAtZTFhNS00MDQ5LThmZjUtN2I4ODQ5ZjI2NjI4DQ5ZII...",
    
      };
      console.log("Sending registration payload:", payload);
      const response = await dispatch(sellerSignUpThunk(payload)).unwrap();
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
  const handleNext = () => {
  const formData = {
    ...form,
    coords: {
      latitude: "25.276987",
      longitude: "55.296249",
    },
    profileImage: "MV5BZGYwYTNjNTAtZTFhNS00MDQ5LThmZjUtN2I4ODQ5ZjI2NjI4DQ5ZII...", // You can replace this with actual image URI if available
  };

  navigation.navigate("SellerRegistrationSecond", { formData });
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
