import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperContainer: {
    flex: 1,
  },
  ImageContainer: {
    justifyContent: "center",
    alignSelf: "center",
    height: height * 0.25,
    width: width * 0.65,
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#6F6F6F",
  },
  buttonContainer: {
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
  },
});

export default styles;
