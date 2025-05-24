import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputcontainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 1,
  },
  inputBoxStyle: {
    width: width * 1,
  },
  wrapperContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: width * 0.9,
  },
  buttonContainer: {
    width: width * 1,
    alignItems: "center",
    marginBlockStart: "auto",
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});
export default styles;
