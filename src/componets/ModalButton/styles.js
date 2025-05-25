import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#B3DB48",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffff",
    marginRight: 8,
  },
  iconButton: {
    marginLeft: width * 0.01,
    paddingTop: "3.5%",
    paddingBottom: "4%",
  },
});
export default styles;
