import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 16,
    marginLeft: 2,
     color: "#000",
  },
  subText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    width: "90%",
    paddingHorizontal: 16,
  },
});
export default styles;
