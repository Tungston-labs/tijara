import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import { setToken } from "../../services/config";
import { userLoginThunk } from "../../redux/slice/authSlice";
import { saveAuthData } from "../../utils/mmkvStorage";

const LoginScreenWithPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const location = route?.params?.location;
  const { loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (location) {
      console.log("Location received in login:", location);
    }
  }, [location]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    const credentials = { email, password };

    try {
      const res = await dispatch(userLoginThunk(credentials)).unwrap();

      if (res?.accessToken) {
        setToken(res.accessToken);
        saveAuthData(res.accessToken, res, res.role);

        const userRole = res.role;

        if (userRole === "buyer") {
          navigation.replace("BuyerHomeScreen");
        } else if (userRole === "seller") {
          navigation.replace("SellerHomeScreen");
        } else {
          alert("Unknown user role");
        }
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      const errorStatus = err?.status || err?.response?.data?.status;
      const errorMessage =
        err?.message ||
        err?.response?.data?.message ||
        "Login failed. Please try again.";

      if (errorStatus === "pending") {
        navigation.navigate("RequestNotVerifiedScreen");
        return;
      }

      alert(typeof errorMessage === "string" ? errorMessage : "Login failed.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../resources/images/logotijara.png")}
        style={styles.ImageContainer}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

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
        onPress={() => navigation.navigate("ForgetPasswordScreen")}
        style={{ alignSelf: "flex-end", marginTop: 8 }}
      >
        <Text style={styles.forgotContainer}>Forgot password?</Text>
      </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RoleSelectionScreen", { location })
          }
        >
          <Text style={styles.signUpText}> Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreenWithPassword;
