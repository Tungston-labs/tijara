import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Feather";
import { setTemporaryUser, SignUpThunk } from "../../redux/slice/authSlice";
import EyeIcon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const RegistrationScreen = () => {
  const route = useRoute();
  const role = route.params?.role || "buyer";

  const coordsParam = route.params?.coords || null; 
  const locationString = route.params?.location || null;
  const locationName =
    route.params?.locationName || route.params?.locationNameFromOther || null;

  const getLatLngFromParams = () => {
    if (
      coordsParam &&
      typeof coordsParam.latitude === "number" &&
      typeof coordsParam.longitude === "number"
    ) {
      return { latitude: coordsParam.latitude, longitude: coordsParam.longitude };
    }

    if (typeof locationString === "string" && locationString.includes(",")) {
      const parts = locationString.split(",").map((p) => p.trim());
      const lat = parseFloat(parts[0]);
      const lng = parseFloat(parts[1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        return { latitude: lat, longitude: lng };
      }
    }

    return null;
  };

  const resolvedCoords = getLatLngFromParams();

  const prefillForm = route.params?.prefillForm || null;
  const prefillImage = route.params?.profileImage || null;
  const prefillCountryCode = route.params?.countryCode || "+971";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { user, token } = useSelector((state) => state.user);
  console.log("token", token);

  useEffect(() => {
    if (prefillForm) {
      let rawPhone = prefillForm.phone || "";

      if (rawPhone.startsWith(prefillCountryCode)) {
        rawPhone = rawPhone.slice(prefillCountryCode.length);
      }
      setForm({
        name: prefillForm.name || "",
        phone: rawPhone,
        email: prefillForm.email || "",
        password: prefillForm.password || "",
        confirmPassword: prefillForm.password || "",
      });
    }

    if (prefillImage) {
      setProfileImage(prefillImage);
    }
    if (prefillCountryCode) {
      setCountryCode(prefillCountryCode);
    }
  }, [prefillForm, prefillImage, prefillCountryCode]);

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleIconPress = () => {
    navigation.goBack();
  };
  const [countryCode, setCountryCode] = useState("+971");

 
const handleSelectImage = async () => {
  const options = {
    mediaType: "photo",
    quality: 0.7,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) return;

    if (response.errorCode) {
      console.error("ImagePicker Error:", response.errorMessage);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to open image picker.",
      });
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

  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) && 
      /[a-z]/.test(password) && 
      /[0-9]/.test(password) && 
      /[^A-Za-z0-9]/.test(password) 
    );
  };
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isValidPhone = (phone) => /^\d{7,15}$/.test(phone);

 const handleButtonClick = async () => {
  const fullPhoneNumber = `${countryCode}${form.phone}`;

  if (
    !form.name ||
    !form.phone ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Please fill all required fields.",
    });
    return;
  }

  if (!isStrongPassword(form.password)) {
    Toast.show({
      type: "error",
      text1: "Weak Password",
      text2:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    });
    return;
  }

  if (!isValidEmail(form.email)) {
    Toast.show({
      type: "error",
      text1: "Invalid Email",
      text2: "Please enter a valid email address.",
    });
    return;
  }

  if (!isValidPhone(form.phone)) {
    Toast.show({
      type: "error",
      text1: "Invalid Phone Number",
      text2: "Please enter a valid phone number (7-15 digits).",
    });
    return;
  }

  if (form.password !== form.confirmPassword) {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: "Passwords do not match.",
    });
    return;
  }

  if (!profileImage) {
    Toast.show({
      type: "error",
      text1: "Missing Image",
      text2: "Please select a profile image.",
    });
    return;
  }

  if (!resolvedCoords) {
    Toast.show({
      type: "error",
      text1: "Location Error",
      text2: "Please set a valid location.",
    });
    return;
  }

  const basicFormData = {
    name: form.name,
    phone: fullPhoneNumber,
    email: form.email,
    password: form.password,
    coords: {
      latitude: resolvedCoords.latitude,
      longitude: resolvedCoords.longitude,
    },
    location:
      locationName ||
      `${resolvedCoords.latitude},${resolvedCoords.longitude}`,
  };

  // Seller registration second screen
  if (role === "seller") {
    navigation.navigate("SellerRegistrationSecond", {
      form: basicFormData,
      profileImage,
      countryCode,
    });
    return;
  }

  const formData = new FormData();
  formData.append("name", basicFormData.name);
  formData.append("phone", basicFormData.phone);
  formData.append("email", basicFormData.email);
  formData.append("password", basicFormData.password);
  formData.append("coords", JSON.stringify(basicFormData.coords));
  formData.append("location", basicFormData.location);
  formData.append("profileImage", {
    uri: profileImage.uri,
    type: profileImage.type || "image/jpeg",
    name: profileImage.name || "profile.jpg",
  });

  try {
    setLoading(true);
    const result = await dispatch(SignUpThunk({ formData, role })).unwrap();

    if (result?.status !== "approved") {
      dispatch(setTemporaryUser(result));
      navigation.navigate("RequestSentScreen");
      return;
    }

    Toast.show({
      type: "success",
      text1: "Welcome!",
      text2: "Your account has been created successfully.",
    });
    navigation.navigate("HomeScreen");
  } catch (err) {
    console.error("Signup Failed:", err);
    Toast.show({
      type: "error",
      text1: "Signup Failed",
      text2: err?.message || "Something went wrong. Please try again.",
    });
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
            Title={`Complete your ${role === "seller" ? "Seller" : "Buyer"}`}
            Subtitle={"Account Creation"}
          />

          {/* show resolved location name for clarity */}
          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            {/* <Text style={{ color: "#555", fontSize: 14 }}>
              Location: {locationName || (resolvedCoords ? `${resolvedCoords.latitude.toFixed(5)}, ${resolvedCoords.longitude.toFixed(5)}` : "Not set")}
            </Text> */}
          </View>

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
              countryCode={countryCode}
              setCountryCode={setCountryCode}
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
              key={passwordSecure ? "password-hidden" : "password-visible"}
              placeholder="Password"
              customStyle={styles.inputContainer}
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={passwordSecure}
              icon={
                <TouchableOpacity
                  onPress={() => setPasswordSecure(!passwordSecure)}
                >
                  <EyeIcon
                    name={passwordSecure ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              }
            />

            <TextInputField
              key={confirmPasswordSecure ? "confirm-hidden" : "confirm-visible"}
              placeholder="Confirm Password"
              customStyle={styles.inputContainer}
              value={form.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry={confirmPasswordSecure}
              icon={
                <TouchableOpacity
                  onPress={() =>
                    setConfirmPasswordSecure(!confirmPasswordSecure)
                  }
                >
                  <EyeIcon
                    name={
                      confirmPasswordSecure ? "eye-off-outline" : "eye-outline"
                    }
                    size={22}
                    color="#999"
                  />
                </TouchableOpacity>
              }
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
