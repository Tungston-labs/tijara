import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/login-screen";
import RegistrationScreen from "../screens/registration-screen";
import SplashScreen from "../screens/splash-screen";
import CreateAccountScreen from "../screens/create-account-screen";
import RoleSelectionScreen from "../screens/role-selection-screen";
import RequestSentScreen from "../screens/request-sent-screen";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
        <Stack.Screen
          name="RoleSelectionScreen"
          component={RoleSelectionScreen}
        />
        <Stack.Screen name="RequestSentScreen" component={RequestSentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
