import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import TijaraHeader from "../../componets/TijaraHeader";
import SearchBar from "../../componets/SearchBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListItemScreen from "../list-item-screen";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import TradeLicenseLockScreen from "../user-list-item-lock-screen";
import UserListItemScreen from "../user-list-item-screen";
import TradeLicenseStatusScreen from "../tradelicense-status-screen";
import { fetchTradeLicenseStatusThunk } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
let SellComponent = TradeLicenseLockScreen;

const TabScreens = ({ onTabChange }) => {
  const tradeLicenseStatus = useSelector(
    (state) => state.user.user.tradeLicenseStatus
  );
  if (tradeLicenseStatus === "approved") {
    SellComponent = UserListItemScreen;
  } else if (["pending", "rejected", "expired"].includes(tradeLicenseStatus)) {
    SellComponent = TradeLicenseStatusScreen;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#B3DB48",
        tabBarInactiveTintColor: "#000000",
      }}
    >
      <Tab.Screen
        name="Home"
        component={SellComponent}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Home"),
        }}
      />
      <Tab.Screen
        name="Buy"
        component={ListItemScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart-outline" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Buy"),
        }}
      />
    </Tab.Navigator>
  );
};

const BuyerHomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        dispatch(fetchTradeLicenseStatusThunk());
      } catch (err) {
        console.error("Failed to fetch trade license status:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [activeTab]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#B3DB48" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        {activeTab !== "Request" && (
          <View style={styles.firstContainer}>
            <TijaraHeader navigation={navigation} />
            {(activeTab === "Buy" ||
              (activeTab === "Home" &&
                SellComponent === UserListItemScreen)) && <SearchBar />}
          </View>
        )}

        <View style={{ flex: 1 }}>
          <TabScreens onTabChange={setActiveTab} />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default BuyerHomeScreen;
