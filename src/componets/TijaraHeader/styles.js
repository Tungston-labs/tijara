import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop:50
  },
  ImageContainer: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    height: height * 0.07,
    width: width * 0.46,
  },
  rowContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarContainer: {
  width: 40,
  height: 40,
  borderRadius: 20,   // makes it circular
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#ccc",

},

avatar: {
  width: "100%",
  height: "100%",
},

iconStyle: {
  paddingBottom: 15,
  marginRight: 18,  // moves it left
},

});

export default styles;
