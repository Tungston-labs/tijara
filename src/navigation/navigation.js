import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { loadAuthData } from "../utils/mmkvStorage";
import { loginFromStorage } from "../redux/slice/authSlice";
import { setToken } from "../services/config";
// import LoginScreen from "../screens/login-screen";
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
// import SellerHomeScreenEmptybox from "../screens/seller-home-screen-emptybox";
import RequestReceiveScreen from "../screens/request-receive-screen";
import AddItemScreen from "../screens/add-item-screen";
import SellerProductDetailsEditScreen from "../screens/seller-product-details-edit-screen";
import SellerRegistrationSecond from "../screens/seller-registration-two";
import LoginScreenWithPassword from "../screens/login-using-credentials";
import UserListItemScreen from "../screens/user-list-item-screen";
import SellerAddProductScreen from "../screens/add-item-screen";
import SellerEditProductScreen from "../screens/edit-item-screen";
import ForgetPasswordScreen from "../screens/forget-password-screen";
import OTPVerificationScreen from "../screens/forget-password-verification";
import ResetPasswordScreen from "../screens/reset-password-screen";
import TradeLicenseLockScreen from "../screens/user-list-item-lock-screen";
import UploadTradeLicenseScreen from "../screens/upload-tradelicense-screen";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      const { token, user, role } = loadAuthData();
      console.log("token from mmkv", { token, user, role });

      if (token && user) {
        dispatch(loginFromStorage({ token, user, role }));
        setToken(token);
      }
      setLoading(false);
    };
    bootstrapAsync();
  }, [dispatch]);
  const getInitialRoute = () => {
    return "SplashScreen";
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="SplashScreen" 
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          {token ? (
            // 🔑 Logged in Stack
            role === "buyer" ? (
              <>
                <Stack.Screen
                  name="BuyerHomeScreen"
                  component={BuyerHomeScreen}
                />
                <Stack.Screen
                  name="ItemDetailsScreen"
                  component={ItemDetailsScreen}
                />
                <Stack.Screen
                  name="BuyerPaymentInfoScreen"
                  component={BuyerPaymentInfoScreen}
                />
                <Stack.Screen
                  name="SubscriptionDetailsScreen"
                  component={SubscriptionDetailsScreen}
                />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                {/* Add other buyer screens */}
              </>
            ) : (
              <>
                <Stack.Screen
                  name="SellerHomeScreen"
                  component={SellerHomeScreen}
                />
                <Stack.Screen
                  name="TradeLicenseLockScreen"
                  component={TradeLicenseLockScreen}
                />
                 <Stack.Screen
                name="UploadTradeLicenseScreen"
                component={UploadTradeLicenseScreen}
              />
                <Stack.Screen name="AddItemScreen" component={AddItemScreen} />
                <Stack.Screen
                  name="RequestReceiveScreen"
                  component={RequestReceiveScreen}
                />
                <Stack.Screen
                  name="SellerProductDetailsEditScreen"
                  component={SellerProductDetailsEditScreen}
                />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen
                  name="UserListItemScreen"
                  component={UserListItemScreen}
                />
                <Stack.Screen
                  name="SellerAddProductScreen"
                  component={SellerAddProductScreen}
                />
                <Stack.Screen
                  name="SellerEditProductScreen"
                  component={SellerEditProductScreen}
                />
                <Stack.Screen
                  name="ItemDetailsScreen"
                  component={ItemDetailsScreen}
                />
              </>
            )
          ) : (
            // 🔒 Auth Stack
            <>
              {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
              <Stack.Screen
                name="LoginScreenPassword"
                component={LoginScreenWithPassword}
              />
              {/* <Stack.Screen
                name="LoginScreenPassword"
                component={LoginScreen}
              /> */}
              <Stack.Screen
                name="RegistrationScreen"
                component={RegistrationScreen}
              />
              <Stack.Screen
                name="CreateAccountScreen"
                component={CreateAccountScreen}
              />
              {/* <Stack.Screen
                name="RoleSelectionScreen"
                component={RoleSelectionScreen}
              /> */}
              <Stack.Screen
                name="SellerRegistrationSecond"
                component={SellerRegistrationSecond}
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
              <Stack.Screen
                name="ForgetPasswordScreen"
                component={ForgetPasswordScreen}
              />
              <Stack.Screen
                name="OTPVerificationScreen"
                component={OTPVerificationScreen}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
