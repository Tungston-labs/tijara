import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  ImageContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: height * 0.07,
    // width: width * 0.55,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconStyle: {
    width: width * 0.13,
    paddingBottom: 15,
    alignSelf: "flex-end",
  },
});

export default styles;
