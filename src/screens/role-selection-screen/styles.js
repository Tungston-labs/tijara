import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    height: height * 0.88,
    alignItems: "center",
    justifyContent: "center",
    width: width * 1,
    paddingBottom: 100,
  },
  buttonStyle: {
    margin: 25,
  },
  textContainer: {
    margin: 25,
    textAlign: "center",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
  },
});
export default styles;
