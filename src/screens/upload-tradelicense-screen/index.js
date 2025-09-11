import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import Button from "../../componets/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../../services/config";
import { uploadTradeLicenseThunk } from "../../redux/slice/authSlice";

const UploadTradeLicenseScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const role = useSelector((state) => state.user.role);

  const [form, setForm] = useState({
    companyName: "",
    tradeLicenseNumber: "",
    managerName: "",
    tradeLicenseCopy: null,
    tradeLicenseExpiry: null, // New field
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

 const requestPermissions = async () => {
  try {
    if (Platform.OS === "android") {
      if (Platform.Version >= 33) {
        // Android 13+ → only request image permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        // Android 12 and below
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true; // iOS handles it via Info.plist
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
      "Please grant photo permissions to upload the file."
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
          name: asset.fileName || "trade_license.jpg",
          type: asset.type || "image/jpeg",
        },
      });
    }
  });
};


  const handleRemoveFile = () => {
    setForm({ ...form, tradeLicenseCopy: null });
  };

  const handleSubmit = async () => {
    if (
      !form.companyName ||
      !form.tradeLicenseNumber ||
      !form.managerName ||
      !form.tradeLicenseExpiry
    ) {
      Alert.alert("Validation Error", "Please fill all required fields");
      return;
    }

    if (!form.tradeLicenseCopy) {
      Alert.alert("Validation Error", "Please upload your trade license copy");
      return;
    }

    const formData = new FormData();
    formData.append("companyName", form.companyName);
    formData.append("tradeLicenseNumber", form.tradeLicenseNumber);
    formData.append("managerName", form.managerName);
    formData.append("tradeLicenseExpiry", form.tradeLicenseExpiry);
    formData.append("tradeLicenseCopy", {
      uri: form.tradeLicenseCopy.uri,
      type: form.tradeLicenseCopy.type,
      name: form.tradeLicenseCopy.name,
    });
    try {
      setLoading(true);
      await dispatch(uploadTradeLicenseThunk(formData)).unwrap();
      // navigation.navigate(role==="buyer"?"BuyerHomeScreen":"SellerHomeScreen");
      navigation.navigate("SellerHomeScreen");
    } catch (err) {
      const status = err?.response?.status;
      const backendMessage = err?.response?.data?.message;
      if (status === 400 && backendMessage) {
        Alert.alert("Upload Failed", backendMessage);
      } else {
        Alert.alert("Upload Failed", "Something went wrong");
      }
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
              navigation.goBack()
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

            {/* Expiry Date Picker */}
            <Text style={styles.label}>Expiry date</Text>

            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerField}
            >
              <Text
                style={{ color: form.tradeLicenseExpiry ? "#000" : "#aaa" }}
              >
                {form.tradeLicenseExpiry
                  ? new Date(form.tradeLicenseExpiry).toLocaleDateString()
                  : "Select Expiry Date"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={
                  form.tradeLicenseExpiry
                    ? new Date(form.tradeLicenseExpiry)
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (event.type === "set") {
                    handleChange(
                      "tradeLicenseExpiry",
                      selectedDate.toISOString()
                    );
                  }
                }}
              />
            )}

            {/* Upload Section */}
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
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default UploadTradeLicenseScreen;
