import { StyleSheet ,Dimensions} from "react-native";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backArrow: {
    position: "absolute",
    top: 15,
    left: 5,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    textAlign: "left",
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  ImageContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: width * 0.4,
    height: height * 0.1,
   marginBottom:40
    
  },
  input: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 14,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingRight: 15,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: "#B7E626",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
forgotContainer: {
  color: "#000",
  fontSize: 14,
  fontWeight: "500",
},

  loginButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#333",
  },
  signUpText: {
    color: "#7DBA16",
    fontWeight: "600",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
