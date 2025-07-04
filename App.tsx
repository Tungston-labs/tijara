// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import MainNavigation from "./src/navigation/navigation.js";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store.js";
import { loadAuthData } from "./src/utils/mmkvStorage.js";
import { loginFromStorage } from "./src/redux/slice/authSlice.js";
import { setToken } from "./src/services/config.js";

enableScreens();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <App />
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

export default AppWrapper;
