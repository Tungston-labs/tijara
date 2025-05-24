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
    elevation: 5,
    width: "90%",
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
  },
});

export default styles;
