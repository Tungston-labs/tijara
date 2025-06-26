import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import API from "../../services/config";
import TextInputField from "../../componets/TextInputField";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const res = await API.post(
        "/user/reset-password",
        { newPassword: password },
        { withCredentials: true }
      );

      Alert.alert("Success", res.data.message);
      navigation.navigate("LoginScreenPassword");
    } catch (error) {
      console.log("Password reset error:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to reset password"
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
          <TouchableOpacity
            onPress={() => setConfirmPasswordSecure(!confirmPasswordSecure)}
          >
            <Icon
              name={confirmPasswordSecure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        }
      />
</View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
