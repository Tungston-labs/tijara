import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StatusBar,
  Pressable,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import styles from "./styles";
import TijaraHeader from "../../componets/TijaraHeader";
import SearchBar from "../../componets/SearchBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListItemScreen from "../list-item-screen";
import TradeLicenseLockScreen from "../user-list-item-lock-screen";
import TradeLicenseStatusScreen from "../tradelicense-status-screen";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import UserListItemScreen from "../user-list-item-screen";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchTradeLicenseStatusThunk } from "../../redux/slice/authSlice";
import { useIsFocused, useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const LAST_ACTIVE_TAB_KEY = "LAST_ACTIVE_TAB";

// create a single MMKV instance (you can also do this in a separate file)
const storage = new MMKV();

const HomeTabContent = ({ tradeLicenseStatus, refreshing, onRefresh }) => {
  if (tradeLicenseStatus === "approved")
    return <UserListItemScreen refreshing={refreshing} onRefresh={onRefresh} />;
  if (["pending", "rejected", "expired"].includes(tradeLicenseStatus))
    return <TradeLicenseStatusScreen />;
  return <TradeLicenseLockScreen />;
};

const TabScreens = ({
  onTabChange,
  tradeLicenseStatus,
  initialTab,
  refreshing,
  onRefresh,
}) => {
  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#B3DB48",
        tabBarInactiveTintColor: "#000000",
      }}
    >
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
      <Tab.Screen
        name="Sell"
        children={() => (
          <HomeTabContent
            tradeLicenseStatus={tradeLicenseStatus}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../../assets/seller.png")}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                tintColor: color,
                resizeMode: "contain",
              }}
            />
          ),
          tabBarLabel: "Sell",
        }}
        listeners={{
          focus: () => onTabChange("Sell"),
        }}
      />
    </Tab.Navigator>
  );
};

const SellerHomeScreen = ({ navigation }) => {
  // You can also initialize from storage directly:
  // const saved = storage.getString(LAST_ACTIVE_TAB_KEY);
  // const [activeTab, setActiveTab] = useState(saved ?? "Buy");
  const [activeTab, setActiveTab] = useState("Buy"); // default
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // for tradeLicense fetch
  const [navRestored, setNavRestored] = useState(false); // wait until nav is restored

  const dispatch = useDispatch();
  const tradeLicenseStatus = useSelector(
    (state) => state.user.user.tradeLicenseStatus
  );
  const isFocused = useIsFocused();
  const route = useRoute();

  // restore last active tab from MMKV (synchronous)
  useEffect(() => {
    try {
      const saved = storage.getString(LAST_ACTIVE_TAB_KEY);
      if (saved) {
        setActiveTab(saved);
      }
    } catch (err) {
      console.warn("Failed to read last active tab from MMKV:", err);
    } finally {
      setNavRestored(true);
    }
  }, []);

  // if route param asks to go to specific tab, update it and persist
  useEffect(() => {
    if (route.params?.goToTab) {
      const newTab = route.params.goToTab;
      setActiveTab(newTab);
      try {
        storage.set(LAST_ACTIVE_TAB_KEY, newTab);
      } catch (e) {
        console.warn("Failed to save tab to MMKV:", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.goToTab]);

  // persist tab when user changes it
  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
    try {
      storage.set(LAST_ACTIVE_TAB_KEY, tabName);
    } catch (e) {
      console.warn("Failed to save tab to MMKV:", e);
    }
  }, []);

  const handleAddItem = () => {
    navigation.navigate("SellerAddProductScreen");
  };

  const fetchStatus = async () => {
    try {
      await dispatch(fetchTradeLicenseStatusThunk());
    } catch (err) {
      console.error("Failed to fetch trade license status:", err);
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    setLoading(true);
    fetchStatus().finally(() => setLoading(false));
  }, [isFocused, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchStatus();
    setRefreshing(false);
  }, [dispatch]);

  const shouldShowSearch =
    activeTab === "Sell" && tradeLicenseStatus === "approved";

  if (!navRestored) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#B3DB48" />
      </View>
    );
  }

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
              key={activeTab}
              onTabChange={handleTabChange}
              tradeLicenseStatus={tradeLicenseStatus}
              initialTab={activeTab}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </View>
        </BackgroundWrapper>
      </View>
    </SafeAreaView>
  );
};

export default SellerHomeScreen;
