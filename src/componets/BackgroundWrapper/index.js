import React from "react";
import { ImageBackground } from "react-native";
import styles from "./styles";

const BackgroundWrapper = ({ children, customStyle }) => {
  return (
    <ImageBackground
      source={require("../../resources/images/theme.png")} // This image is temporary replace with orginal image
      style={[styles.backgroundConatiner, customStyle]}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

export default BackgroundWrapper;
