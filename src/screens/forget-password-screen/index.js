import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../services/config";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      const res = await API.post(
        "user/send-otp", 
        { email },
        { withCredentials: true }
      );

      Alert.alert("Success", res.data.message);
      navigation.navigate("OTPVerificationScreen", { email });
    } catch (error) {
      console.log("Error sending OTP:", error?.response?.data);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to send reset OTP"
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot password ?</Text>
      <Text style={styles.subtitle}>
        No worries, we will send you reset instructions
      </Text>

      <Text style={styles.label}>Your Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Email Address"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordScreen;
