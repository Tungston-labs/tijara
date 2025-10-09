import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import API from "../../services/config";
import Toast from "react-native-toast-message";

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params || {};
  const [resendLoading, setResendLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const char = text.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < 5 && inputs.current[index + 1]) {
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
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0 && inputs.current[index - 1]) {
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

      Toast.show({
        type: "success",
        text1: "Success",
        text2: res?.data?.message || "OTP resent to your email.",
        position: "top",
        visibilityTime: 3000,
      });

      setTimer(60);
    } catch (error) {
      console.log("Resend OTP error:", error);
      const message = error?.response?.data?.message || "Failed to resend OTP.";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (submitLoading) return;

    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter the complete 6-digit OTP.",
        position: "top",
        visibilityTime: 3000,
      });
    }

    setSubmitLoading(true);
    try {
      const res = await API.post(
        "/user/verify-otp",
        { otp: enteredOtp, email },
        { withCredentials: true }
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: res?.data?.message || "OTP verified.",
        position: "top",
        visibilityTime: 2500,
      });

      navigation.navigate("ResetPasswordScreen", { email });
    } catch (error) {
      console.log("OTP verification error:", error);
      const message = error?.response?.data?.message || "Failed to verify OTP";
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setSubmitLoading(false);
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
            returnKeyType="next"
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, submitLoading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={submitLoading}
      >
        {submitLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
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
            <Text style={{ color: "#B3DB48" }} onPress={handleResendOtp}>
              Resend OTP
            </Text>
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen;
