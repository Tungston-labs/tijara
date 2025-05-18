import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height * 0.12,
    width: width * 1,
  },
  rowContainer: {
    flexDirection: "row",
  },
  iconStyle: {
    paddingTop: 50,
    width: width * 0.2,
  },
  textContainer: {
    alignItems: "center",
    width: width * 0.6,
    paddingTop: 50,
    textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
  },
  titleStyle: {
    color: "#000000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
  },
});
export default styles;
