import React, { useState } from "react";
import { Pressable, StatusBar, Text, View } from "react-native";
import styles from "./styles";
import TijaraHeader from "../../componets/TijaraHeader";
import SearchBar from "../../componets/SearchBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListItemScreen from "../list-item-screen";
import RequestReceiveScreen from "../request-receive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import UserListItemScreen from "../user-list-item-screen";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

const TabScreens = ({ onTabChange }) => {
  // const token = useSelector((state) => state.user.token);
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
        component={UserListItemScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Home"),
        }}
      />
      {/* <Tab.Screen
        name="Buy"
        component={ListItemScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Buy"),
        }}
      /> */}
      <Tab.Screen
        name="Buy"
        children={() => <ListItemScreen />}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="cart" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Buy"),
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestReceiveScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-add-sharp" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Request"),
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

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" translucent={false} />
      <View style={styles.container}>
        <BackgroundWrapper>
          {activeTab !== "Request" && activeTab !== "Buy" && (
            <View style={styles.firstContainer}>
              <View style={styles.wrapperContainer}>
                <TijaraHeader navigation={navigation} />
              </View>
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
            <TabScreens onTabChange={setActiveTab} />
          </View>
        </BackgroundWrapper>
      </View>
    </SafeAreaView>
  );
};

export default SellerHomeScreen;
