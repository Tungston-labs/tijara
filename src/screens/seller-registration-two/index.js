import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Button from "../../componets/Button";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const SellerRegistrationSecond = () => {
    const dispatch = useDispatch(); 

  const navigation = useNavigation();
  const [form, setForm] = useState({
    companyName: "",
    tradeLicenseNumber: "",
    managerName: "",
    tradeLicenseCopy: null,
  });
  const route = useRoute();
const formData = route?.params?.formData ?? {}; 

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileUpload = () => {
    const mockFile = {
      name: "dsderg-124.jpg",
      uri: "mock/path/to/dsderg-124.jpg",
      type: "image/jpeg",
    };
    setForm({ ...form, tradeLicenseCopy: mockFile });
  };

  const handleRemoveFile = () => {
    setForm({ ...form, tradeLicenseCopy: null });
  };

const handleSubmit = async () => {
  const payload = {
    ...formData, // from screen 1
    companyName: form.companyName,
    tradeLicenseNumber: form.tradeLicenseNumber,
    managerName: form.managerName,
    tradeLicenseCopy: form.tradeLicenseCopy?.uri ?? null,
  };
console.log("Final Payload:", payload);

  try {
    setLoading(true);
    const response = await dispatch(sellerSignUpThunk(payload)).unwrap();
    console.log("Registration successful:", response);
    navigation.navigate("RequestSentScreen");
  } catch (err) {
    Alert.alert("Signup Failed", err?.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};



  return (
    <ScrollView>
      <View style={styles.container}>
        <BackgroundWrapper style={styles.wrapperContainer}>
          <Header
            handleIconPress={() => navigation.navigate("SellerRegistrationScreen")}
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
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </BackgroundWrapper>
      </View>
    </ScrollView>
  );
};

export default SellerRegistrationSecond;
