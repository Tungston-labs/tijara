import { StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstContainer: {
    marginTop: 5,
    marginBottom: 10,
  },
    searchbarContainer: {
    width: 40,
    height: 55,

    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.76,
    marginRight: 10,
  },
});

export default styles;
