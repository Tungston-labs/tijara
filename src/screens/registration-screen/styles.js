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
    width: width,
    paddingBottom:20
  },
  inputContainer: {
    width: width * 0.9,
    color: "#000",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    color: "#000000",
  },
  loginLink: {
    color: "#94D82D",
    fontWeight: "600",
  },
  buttonContainer: {
    width: width,
    alignItems: "center",
    
  },
  wrapperContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  nextButtonIcon: {
    marginLeft: 48,
  },
  phoneFieldContainer: {
    width: width * 0.9,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },



  codeText: {
    fontSize: 16,
    color: "#000",
  },

phoneInputWrapper: {
  // marginTop:50,
  // flexDirection: "row",
  // alignItems: "center",
  // borderColor: "#ccc",
  // borderRadius: 10,
  // backgroundColor: "#f5f5f5",
  // // width: width * 0.9,
  // height: 50,
  // paddingHorizontal: 10,
  // marginBottom: 15,
},

countryCodeContainer: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 8,
  paddingVertical: 6,
  borderRightWidth: 1,
  borderRightColor: "#ccc",
  marginRight: 8,
},



countryCodeText: {
  fontSize: 16,
  color: "#000",
  marginRight: 4,
},

phoneInput: {
  flex: 1,
  fontSize: 24,
  color: "#52eb34",
  height: 0,
// marginTop:-50,
},

  
});
export default styles;
