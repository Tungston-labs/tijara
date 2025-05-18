import React from "react";

import MainNavigation from "./src/navigation/navigation";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";

enableScreens();

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  );
};

export default App;
