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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  loginText: {
    color: "#000000",
  },
  loginLink: {
    color: "#94D82D",
    fontWeight: "600",
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
  ImageContainer: {
    alignSelf: "center",
    width: width * 0.4,
    height: height * 0.1,
  },
  
});
export default styles;
