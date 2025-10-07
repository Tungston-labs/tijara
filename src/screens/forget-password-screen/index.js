import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../../services/config";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter your email address.",
      });
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const res = await API.post(
        "user/send-otp",
        { email },
        { withCredentials: true }
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: res.data.message || "OTP sent successfully.",
      });

      navigation.navigate("OTPVerificationScreen", { email });
    } catch (error) {
      console.error("Error sending OTP:", error?.response?.data);

      const message =
        error?.response?.data?.message || "Failed to send reset OTP";

      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.navigate("LoginScreenPassword")}
      >
        <Icon name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot password?</Text>
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

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPasswordScreen;
