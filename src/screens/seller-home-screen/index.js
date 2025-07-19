import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import styles from "./styles";
import TijaraHeader from "../../componets/TijaraHeader";
import SearchBar from "../../componets/SearchBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListItemScreen from "../list-item-screen";
import RequestReceiveScreen from "../request-receive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import UserListItemScreen from "../user-list-item-screen";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import TradeLicenseLockScreen from "../user-list-item-lock-screen";
import TradeLicenseStatusScreen from "../tradelicense-status-screen";
import { fetchTradeLicenseStatusThunk } from "../../redux/slice/authSlice";
import { useFocusEffect ,useIsFocused} from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const HomeTabContent = ({ tradeLicenseStatus }) => {
  if (tradeLicenseStatus === "approved") return <UserListItemScreen />;
  if (["pending", "rejected", "expired"].includes(tradeLicenseStatus))
    return <TradeLicenseStatusScreen />;
  return <TradeLicenseLockScreen />;
};
const TabScreens = ({ onTabChange, tradeLicenseStatus }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#B3DB48",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        name="Buy"
        children={() => <ListItemScreen />}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart-outline" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Buy"),
        }}
      />
      <Tab.Screen
        name="Home"
        children={() => (
          <HomeTabContent tradeLicenseStatus={tradeLicenseStatus} />
        )}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Home"),
        }}
      />
    </Tab.Navigator>
  );
};

const SellerHomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const handleAddItem = () => {
    navigation.navigate("SellerAddProductScreen");
  };

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tradeLicenseStatus = useSelector(
    (state) => state.user.user.tradeLicenseStatus
  );

 const isFocused = useIsFocused();

useEffect(() => {
  if (!isFocused) return;

  const fetchStatus = async () => {
    setLoading(true);
    try {
      await dispatch(fetchTradeLicenseStatusThunk());
    } catch (err) {
      console.error("Failed to fetch trade license status:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStatus();
}, [isFocused, dispatch]);


  const shouldShowSearch =
    activeTab === "Home" && tradeLicenseStatus === "approved";

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#B3DB48" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={"#F1F1F1"}
        translucent={false}
      />
      <View style={styles.container}>
        <BackgroundWrapper>
          {activeTab !== "Request" && activeTab !== "Buy" && (
            <View style={styles.firstContainer}>
              <View style={styles.wrapperContainer}>
                <TijaraHeader navigation={navigation} />
              </View>
              {shouldShowSearch && (
                <View style={styles.rowContainer}>
                  <View style={styles.searchbarContainer}>
                    <SearchBar />
                  </View>
                  <Pressable onPress={handleAddItem}>
                    <View style={styles.addItemContainer}>
                      <Text style={styles.addIconStyle}>+</Text>
                    </View>
                  </Pressable>
                </View>
              )}
            </View>
          )}

          {activeTab === "Buy" && (
            <View style={styles.firstContainer}>
              <TijaraHeader navigation={navigation} />
              <View style={{ marginTop: 10 }}>
                <SearchBar />
              </View>
            </View>
          )}

          <View style={{ flex: 1 }}>
            <TabScreens
              onTabChange={setActiveTab}
              tradeLicenseStatus={tradeLicenseStatus}
            />
          </View>
        </BackgroundWrapper>
      </View>
    </SafeAreaView>
  );
};

export default SellerHomeScreen;
