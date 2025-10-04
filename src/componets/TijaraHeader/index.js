import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const TijaraHeader = ({ navigation }) => {
    const { user } = useSelector((state) => state.user);

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
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.image }}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TijaraHeader;
