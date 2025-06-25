import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
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
        children={() => <ListItemScreen searchQuery={searchQuery} />}
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
  const [searchQuery, setSearchQuery] = useState("");
  const handleAddItem = () => {
    navigation.navigate("SellerAddProductScreen");
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        {activeTab !== "Request" && activeTab !== "Buy" && (
          <View style={styles.firstContainer}>
            <View style={styles.wrapperContainer}>
              <TijaraHeader navigation={navigation} />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.searchbarContainer}>
                <SearchBar
                  style={styles.searchbar}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                />
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
            <SearchBar
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <TabScreens onTabChange={setActiveTab} searchQuery={searchQuery} />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default SellerHomeScreen;
