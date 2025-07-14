import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
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
    fontSize: 23,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#6F6F6F",
    fontWeight: "400",
    marginHorizontal: 25,
    marginTop: 10,
  },
  buttonContainer: {
    paddingBottom: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  subtitle2: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
  },
});

export default styles;
