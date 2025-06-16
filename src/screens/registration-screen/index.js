import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { buyerSignUpThunk } from "../../redux/slice/buyerSlice";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Feather";

const RegistrationScreen = () => {
  const route = useRoute();
  const role = route.params?.role || "buyer";
  const location = route.params?.location || null;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [profileImage, setProfileImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleIconPress = () => {
    navigation.goBack();
  };

  const requestPermissions = async () => {
    try {
      if (Platform.Version >= 33) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);
        return permissions.every(
          (p) => granted[p] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);
        return permissions.every(
          (p) => granted[p] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    } catch (error) {
      console.warn("Permission error:", error);
      return false;
    }
  };

  const handleSelectImage = async () => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert(
        "Permission Required",
        "Please grant storage permissions to select an image."
      );
      return;
    }

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

  const handleButtonClick = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert("Error", "Please fill all the fields correctly");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!profileImage) {
      Alert.alert("Validation Error", "Please upload a profile image");
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
      location,
    };

    if (role === "seller") {
      navigation.navigate("SellerRegistrationSecond", {
        form: basicFormData,
        profileImage,
      });
    } else {
      // Submit buyer registration
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("coords", JSON.stringify(basicFormData.coords));
      if (location) {
        formData.append("location", location);
      }
      formData.append("profileImage", {
        uri: profileImage.uri,
        type: profileImage.type || "image/jpeg",
        name: profileImage.name || "profile.jpg",
      });

      try {
        setLoading(true);
        await dispatch(buyerSignUpThunk(formData)).unwrap();
        navigation.navigate("RequestSentScreen");
      } catch (err) {
        const message =
          err?.message || (typeof err === "string" ? err : "An error occurred");
        Alert.alert("Signup Failed", message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackgroundWrapper style={styles.wrapperContainer}>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={`Complete your ${role === "seller" ? "Seller" : "Buyer"}`}
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
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            {role === "seller" ? (
              <TouchableOpacity
                onPress={handleButtonClick}
                disabled={loading}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <Icon
                  name="chevron-right"
                  size={24}
                  color="#fff"
                  style={styles.nextButtonIcon}
                />
              </TouchableOpacity>
            ) : (
              <Button
                label={loading ? "Submitting..." : "Submit For Verification"}
                handleButtonPress={handleButtonClick}
                disabled={loading}
              />
            )}
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreenPassword")}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;
