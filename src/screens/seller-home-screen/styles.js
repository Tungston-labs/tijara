import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 1,
  },
  ImageContainer: {
    justifyContent: "center",
    alignSelf: "center",
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
