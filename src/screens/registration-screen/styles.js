import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInputcontainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 1,
    marginTop: -20,
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
    color: "#000",
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
  profileImageWrapper: {
    position: "relative",
    alignSelf: "center",
    marginVertical: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
  },

  plusIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#B3DB48",
    width: width * 0.9,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.9, // Match other input fields
    marginBottom: 12,
  },

  countryCodeInput: {
    width:  width * 0.9,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8", // Same as other input background
  },

  phoneNumberInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#F8F8F8",
    marginLeft: 10,
  },

  nextButtonIcon: {
    marginLeft: 48,
  },
});
export default styles;
