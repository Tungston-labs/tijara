import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import API from "../../services/config";

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params; // ✅ Get email from previous screen

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      Alert.alert("Error", "Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      const res = await API.post(
        "/user/verify-otp",
        { otp: enteredOtp, email },
        { withCredentials: true }
      );

      Alert.alert("Success", res.data.message);
      navigation.navigate("ResetPasswordScreen", { email });
    } catch (error) {
      console.log("OTP verification error:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to verify OTP"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>We sent a code to {email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.otpInput}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
