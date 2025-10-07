import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import API from "../../services/config";
import TextInputField from "../../componets/TextInputField";
import Toast from "react-native-toast-message";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (loading) return;

    if (!password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in both fields.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match.",
        position: "top",
        visibilityTime: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post(
        "/user/reset-password",
        { newPassword: password },
        { withCredentials: true }
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: res?.data?.message || "Password reset successfully.",
        position: "top",
        visibilityTime: 3000,
      });

      setTimeout(() => {
        navigation.navigate("LoginScreenPassword");
      }, 350);
    } catch (error) {
      console.log("Password reset error:", error);
      const message =
        error?.response?.data?.message || "Failed to reset password";

      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        visibilityTime: 4000,
      });
    } finally {
      setLoading(false);
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

      <Text style={styles.title}>Set new password</Text>
      <Text style={styles.subtitle}>Enter new password</Text>

      <View style={styles.buttonPlace}>
        <TextInputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordSecure}
          customStyle={styles.inputWide}
          icon={
            <TouchableOpacity onPress={() => setPasswordSecure(!passwordSecure)}>
              <Icon
                name={passwordSecure ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#999"
              />
            </TouchableOpacity>
          }
        />

        <TextInputField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={confirmPasswordSecure}
          customStyle={styles.inputWide}
          icon={
            <TouchableOpacity onPress={() => setConfirmPasswordSecure(!confirmPasswordSecure)}>
              <Icon
                name={confirmPasswordSecure ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#999"
              />
            </TouchableOpacity>
          }
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset password</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
