import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, Platform, StatusBar, View } from "react-native";
import LoginScreen from "../screens/login-screen";
import RegistrationScreen from "../screens/registration-screen";
import SplashScreen from "../screens/splash-screen";
import CreateAccountScreen from "../screens/create-account-screen";
import RoleSelectionScreen from "../screens/role-selection-screen";
import RequestSentScreen from "../screens/request-sent-screen";
import RequestSuccessScreen from "../screens/request-success-screen";
import RequestNotVerifiedScreen from "../screens/request-not-verified-screen";
import SuccessScreen from "../screens/success-screen";
import BuyerHomeScreen from "../screens/buyer-home-screen";
import ItemDetailsScreen from "../screens/item-details-screen";
import SellerHomeScreen from "../screens/seller-home-screen";
import BuyerPaymentInfoScreen from "../screens/buyer-payment-info-screen";
import SubscriptionDetailsScreen from "../screens/subscription-details-screen";
import ProfileScreen from "../screens/profile-screen";
import SellerHomeScreenEmptybox from "../screens/seller-home-screen-emptybox";
import RequestReceiveScreen from "../screens/request-receive-screen";
import AddItemScreen from "../screens/add-item-screen";
import SellerProductDetailsEditScreen from "../screens/seller-product-details-edit-screen";
import SellerRegistrationSecond from "../screens/seller-registration-two";
import LoginScreenWithPassword from "../screens/login-using-credentials";
import UserListItemScreen from "../screens/user-list-item-screen";
import SellerAddProductScreen from "../screens/add-item-screen";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === "android" && (
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: "#fff",
          }}
        />
      )}
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
            <Stack.Screen
            name="UserListItemScreen"
            component={UserListItemScreen}
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
          <Stack.Screen
            name="RequestSentScreen"
            component={RequestSentScreen}
          />
          <Stack.Screen
            name="RequestSuccessScreen"
            component={RequestSuccessScreen}
          />
          <Stack.Screen
            name="RequestNotVerifiedScreen"
            component={RequestNotVerifiedScreen}
          />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="BuyerHomeScreen" component={BuyerHomeScreen} />
          <Stack.Screen
            name="ItemDetailsScreen"
            component={ItemDetailsScreen}
          />
       
          <Stack.Screen
            name="LoginScreenPassword"
            component={LoginScreenWithPassword}
          />
          <Stack.Screen
            name="SellerRegistrationSecond"
            component={SellerRegistrationSecond}
          />
          <Stack.Screen name="SellerHomeScreen" component={SellerHomeScreen} />
          <Stack.Screen
            name="BuyerPaymentInfoScreen"
            component={BuyerPaymentInfoScreen}
          />
          <Stack.Screen
            name="SubscriptionDetailsScreen"
            component={SubscriptionDetailsScreen}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="SellerHomeScreenEmptybox"
            component={SellerHomeScreenEmptybox}
          />
          <Stack.Screen
            name="RequestReceiveScreen"
            component={RequestReceiveScreen}
          />
           <Stack.Screen
            name="SellerAddProductScreen"
            component={SellerAddProductScreen}
          />
          <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
          <Stack.Screen
            name="SellerProductDetailsEditScreen"
            component={SellerProductDetailsEditScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
