import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperContainer: {
    alignItems: "center",
    marginTop: 70,
  },
  ImageContainer: {
    height: height * 0.25,
    width: width * 0.65,
  },
  textContainer: {
    // marginTop: 5,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#000000",
  },
});
export default styles;
