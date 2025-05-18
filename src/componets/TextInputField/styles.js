import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 16,
    color: "#999",
    marginLeft: 2,
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
    paddingVertical: 12,
  },
});
export default styles;
