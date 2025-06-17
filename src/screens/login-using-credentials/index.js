import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../services/config";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { sellerLoginThunk } from "../../redux/slice/sellerSlice";
import { loginThunk } from "../../redux/slice/buyerSlice";

const LoginScreen = ({ route }) => {
  const { role = "buyer" } = route.params || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) =>
    role === "buyer" ? state.buyer : state.seller
  );
const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  const credentials = { email, password };

  try {
    // Call the correct thunk, doesn't matter which — role will come from response
    const res = await dispatch(loginThunk(credentials)).unwrap();

    if (res?.accessToken) {
      setToken(res.accessToken);

      // Use role from backend response instead of route param
      const userRole = res.role;

      if (userRole === "buyer") {
        navigation.replace("BuyerHomeScreen");
      } else if (userRole === "seller") {
        navigation.replace("SellerHomeScreen");
      } else {
        alert("Unknown user role");
      }
    }
  } catch (err) {
    console.error("Login error:", err);

    // Check if not approved
    const errorStatus = err?.response?.data?.status || err?.status;
    if (errorStatus === "pending") {
      navigation.navigate("RequestNotVerifiedScreen");
      return;
    }

    alert(err?.response?.data?.message || err.message || "Login failed");
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
      {/* 
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View> */}

      <Text style={styles.heading}>Welcome back</Text>
      <Text style={styles.subHeading}>Please enter your details to Log in</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Your Email Address</Text>
        <TextInput
          placeholder="Your Email Address"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>

      {error && <Text style={styles.error}>{error.message || error}</Text>}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Logging in..." : "Log in"}
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegistrationScreen")}>
          <Text style={styles.signUpText}> Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
