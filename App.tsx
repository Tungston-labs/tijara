// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { 
  KeyboardAvoidingView, // Import KeyboardAvoidingView
  Platform,             // Import Platform
  StyleSheet,           // Import StyleSheet
  View, 
  Text 
} from "react-native";
import MainNavigation from "./src/navigation/navigation.js";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store.js";
import { loadAuthData } from "./src/utils/mmkvStorage.js";
import { loginFromStorage } from "./src/redux/slice/authSlice.js";
import { setToken } from "./src/services/config.js";
import Toast from "react-native-toast-message";

enableScreens();

const toastConfig = {
  // custom error toast (red)
  error: ({ text1, text2, props }) => (
    <View
      style={{
        width: "95%",
        marginTop: 10,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#D93025", 
        shadowColor: "#000",
        shadowOpacity: 0.2,
        elevation: 10,
        zIndex: 9999,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 2 }}>
        {text1}
      </Text>
      {text2 ? (
        <Text style={{ color: "#fff", fontSize: 13 }}>{text2}</Text>
      ) : null}
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
        zIndex: 9999,
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", marginBottom: 2 }}>
        {text1}
      </Text>
      {text2 ? <Text style={{ color: "#fff" }}>{text2}</Text> : null}
    </View>
  ),
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* Wrap both App and Toast with the KeyboardAvoidingView */}
        <KeyboardAvoidingView
          style={styles.container} // Essential for flex: 1
          behavior={Platform.OS === "ios" ? "padding" : "height"} // Behavior based on OS
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} 
        >
          <App />
          {/* Toast needs to be rendered within the same view structure to position correctly */}
          <Toast config={toastConfig} />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, user, role } = loadAuthData();
    if (token && user) {
      dispatch(loginFromStorage({ token, user, role }));
      setToken(token);
    }
  }, []);

  return <MainNavigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppWrapper;
