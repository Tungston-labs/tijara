import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

const TijaraHeader = ({ navigation }) => {
  const handleIconPress = () => {
    navigation.navigate("ProfileScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <Image
            source={require("../../resources/images/logotijara.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
        </View>
        <View style={styles.iconStyle}>
          <TouchableOpacity onPress={handleIconPress}>
            <Icon name="person-circle-outline" size={35} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TijaraHeader;
