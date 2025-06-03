import React from "react";
import { Provider } from "react-redux"; 

import MainNavigation from "./src/navigation/navigation";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store";

enableScreens();

const App = () => {
  return (
    <Provider store={store}> 
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
