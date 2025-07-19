import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height * 0.12,
    width: width,
    justifyContent: "center",
    // backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 2,
  },
  iconStyle: {
    width: width * 0.2,
    alignItems: "flex-start",
  },
  editIconContainerStyle: {
    width: width * 0.2,
  },
  editText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
  },
  textContainer: {
    width: width * 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    color: "#000000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;
