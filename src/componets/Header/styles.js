import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height * 0.12,
    width: width * 1,
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: "row",
  },
  iconStyle: {
    width: width * 0.2,
    marginTop:-35,
  },
  editIconContainerStyle: {
    width: width * 0.2,
  },
  editText: {
    fontSize: 16,
    fontWeight: "500",
  },
  textContainer: {
    alignItems: "center",
    width: width * 0.6,
    textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    marginTop:-35
  },
  titleStyle: {
    color: "#000000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default styles;
