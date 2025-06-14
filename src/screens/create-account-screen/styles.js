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
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  wrapperContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ImageContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: width * 0.4,
    height: height * 0.1,
  },
  textContainer: {
    marginTop: 60,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#6F6F6F",
  },
  inputContainer: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    width: "90%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    fontSize: 16,
    color: "#999",
  },

  inputText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },

  buttonContainer: {
    width: width * 1,
    alignItems: "center",
    marginTop: "auto",
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 25,
    width: "100%",
  },
  loginText: {
    color: "#000000",
  },
  loginLink: {
    color: "#94D82D",
    fontWeight: "600",
  },
});
export default styles;
