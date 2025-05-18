import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundConatiner: {
    flex: 1,
    width: width * 1,
    height: height * 1,
  },
});

export default styles;
