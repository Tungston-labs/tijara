import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../../componets/Button";
import { SignUpThunk } from "../../redux/slice/authSlice";

const SellerRegistrationSecond = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { form: prevForm = {}, profileImage,countryCode } = route.params || {};

  const [form, setForm] = useState({
    companyName: "",
    tradeLicenseNumber: "",
    managerName: "",
    tradeLicenseCopy: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
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
  const handleFileUpload = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "Please grant storage permissions to upload the file."
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
        Alert.alert("Error", response.errorMessage);
        return;
      }

      const asset = response.assets?.[0];
      if (asset) {
        setForm({
          ...form,
          tradeLicenseCopy: {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
          },
        });
      }
    });
  };

  const handleRemoveFile = () => {
    setForm({ ...form, tradeLicenseCopy: null });
  };

  const handleSubmit = async () => {
    if (!form.companyName || !form.tradeLicenseNumber || !form.managerName) {
      Alert.alert("Validation Error", "Please fill all required fields");
      return;
    }

    if (!form.tradeLicenseCopy) {
      Alert.alert("Validation Error", "Please upload your trade license copy");
      return;
    }
    console.log("Seller Form Data --->", {
      name: prevForm.name,
      email: prevForm.email,
      password: prevForm.password,
      phone: prevForm.phone,
      coords: prevForm.coords,
      location: prevForm.location,
      companyName: form.companyName,
      tradeLicenseNumber: form.tradeLicenseNumber,
      managerName: form.managerName,
    });

    const formData = new FormData();

    formData.append("name", prevForm.name);
    formData.append("email", prevForm.email);
    formData.append("password", prevForm.password);
    formData.append("phone", prevForm.phone);
    formData.append("coords", JSON.stringify(prevForm.coords));

    if (prevForm.location) {
      formData.append("location", prevForm.location);
    };

    if (profileImage) {
      formData.append("profileImage", {
        uri: profileImage.uri,
        type: profileImage.type || "image/jpeg",
        name: profileImage.name || "profile.jpg",
      });
    }

    formData.append("companyName", form.companyName);
    formData.append("tradeLicenseNumber", form.tradeLicenseNumber);
    formData.append("managerName", form.managerName);
    formData.append("tradeLicenseCopy", {
      uri: form.tradeLicenseCopy.uri,
      type: form.tradeLicenseCopy.type,
      name: form.tradeLicenseCopy.name,
    });

    try {
      setLoading(true);
      const result = await dispatch(
        SignUpThunk({ formData, role: "seller" })
      ).unwrap();
      console.log("Signup success:", result);
      navigation.navigate("RequestSentScreen", {
        phone: prevForm.phone,
        from: "seller",
      });
    } catch (err) {
      console.error("Signup failed:", err);
      Alert.alert("Signup Failed", err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackgroundWrapper style={styles.wrapperContainer}>
          <Header
            handleIconPress={() =>
              navigation.navigate("RegistrationScreen", {
                prefillForm: prevForm,
                profileImage,
                countryCode
              })
            }
            icon={true}
            Title={"Complete your"}
            Subtitle={"Company Details"}
          />

          <View style={styles.textInputcontainer}>
            <TextInputField
              placeholder="Company Name"
              customStyle={styles.inputContainer}
              value={form.companyName}
              onChangeText={(text) => handleChange("companyName", text)}
            />
            <TextInputField
              placeholder="Trade License Number"
              customStyle={styles.inputContainer}
              value={form.tradeLicenseNumber}
              onChangeText={(text) => handleChange("tradeLicenseNumber", text)}
            />
            <TextInputField
              placeholder="Manager Name"
              customStyle={styles.inputContainer}
              value={form.managerName}
              onChangeText={(text) => handleChange("managerName", text)}
            />
            <View style={styles.uploadSection}>
              <Text style={styles.uploadLabel}>Upload Trade License Copy</Text>
              <TouchableOpacity
                onPress={handleFileUpload}
                style={styles.uploadBox}
              >
                <Text style={styles.uploadText}>+ Add file</Text>
              </TouchableOpacity>
              {form.tradeLicenseCopy && (
                <View style={styles.uploadedFileRow}>
                  <Text style={styles.uploadedFileName}>
                    {form.tradeLicenseCopy.name}
                  </Text>
                  <TouchableOpacity onPress={handleRemoveFile}>
                    <Text style={styles.removeFile}>✕</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              label={loading ? "Submitting..." : "Submit for Verification"}
              handleButtonPress={handleSubmit}
              disabled={loading}
            />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
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

export default SellerRegistrationSecond;
