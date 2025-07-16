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
import { useEffect } from "react";

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const handleResendOtp = async () => {
    if (resendLoading || timer > 0) return;

    setResendLoading(true);
    try {
      const res = await API.post(
        "/user/send-otp",
        { email },
        { withCredentials: true }
      );
      Alert.alert("Success", "OTP resent to your email.");
      setTimer(60); // Restart timer
    } catch (error) {
      console.log("Resend OTP error:", error);
      Alert.alert("Error", "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
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
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {resendLoading ? (
          <Text style={{ color: "#999", textAlign: "center" }}>
            Resending...
          </Text>
        ) : timer > 0 ? (
          <Text style={{ color: "#000", textAlign: "center" }}>
            Resend OTP in <Text style={{ color: "#999" }}>{timer}s</Text>
          </Text>
        ) : (
          <Text style={{ textAlign: "center", color: "#000" }}>
            Didn't receive code?{" "}
            <Text
              style={{ color: "#B3DB48",  }}
              onPress={handleResendOtp}
            >
              Resend OTP
            </Text>
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
