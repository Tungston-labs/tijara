import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import TijaraHeader from "../../componets/TijaraHeader";
import SearchBar from "../../componets/SearchBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListItemScreen from "../list-item-screen";
import RequestStatusScreen from "../request-status-screen";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundWrapper from "../../componets/BackgroundWrapper";

const Tab = createBottomTabNavigator();

const TabScreens = ({ onTabChange }) => {
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
        component={ListItemScreen}
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
        name="Request"
        component={RequestStatusScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="person-add-sharp" size={25} color={color} />
          ),
        }}
        listeners={{
          focus: () => onTabChange("Request"),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const BuyerHomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        {activeTab !== "Request" && (
          <View style={styles.firstContainer}>
            <TijaraHeader navigation={navigation} />
            <SearchBar />
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
