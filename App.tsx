// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Text,
} from "react-native";
import MainNavigation from "./src/navigation/navigation.js";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store.js";
import { loadAuthData } from "./src/utils/mmkvStorage.js";
import { loginFromStorage } from "./src/redux/slice/authSlice.js";
import { setToken } from "./src/services/config.js";
import Toast from "react-native-toast-message";
import { getAddressesThunk } from "./src/redux/slice/addressSlice";

enableScreens();

const toastConfig = {
  error: ({ text1, text2 }) => (
    <View
      style={{
        width: "95%",
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#D93025",
        elevation: 10,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>{text1}</Text>
      {text2 && (
        <Text style={{ color: "#fff", fontSize: 13 }}>{text2}</Text>
      )}
    </View>
  ),

  success: ({ text1, text2 }) => (
    <View
      style={{
        width: "95%",
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#B3DB48",
        elevation: 10,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>{text1}</Text>
      {text2 && <Text style={{ color: "#fff" }}>{text2}</Text>}
    </View>
  ),
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <App />
          <Toast config={toastConfig} />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const { token, user, role } = loadAuthData();
    if (token && user) {
      dispatch(loginFromStorage({ token, user, role }));
      setToken(token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getAddressesThunk(token));
    }
  }, [dispatch, token]);

  return <MainNavigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppWrapper;
