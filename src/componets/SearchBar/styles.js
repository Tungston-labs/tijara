import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 5,
   
  },
  rowContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
boxContainer: {
  backgroundColor: "#fff",
  borderRadius: 12,
  width: "90%",
  paddingHorizontal: 16,
  paddingVertical: 10,
  flexDirection: "row",
  alignItems: "center",
 elevation: 5,
  borderWidth: 1,
  borderColor: "#ccc",

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},


  iconStyle: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
  
});

export default styles;
