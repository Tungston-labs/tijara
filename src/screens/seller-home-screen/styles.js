import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //  backgroundColor: "#fff", // restored for clarity
  },
  wrapperContainer: {
    width: width * 1,
  },
  firstContainer: {
    marginTop: 35,
    marginBottom: 10,
  },
  searchbar: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  addItemContainer: {
    width: 40,
    height: 50,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "#B3DB48",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.15,
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 15,
  },
  searchbarContainer: {
    width: 40,
    height: 55,

    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.7,
    marginRight: 10,
  },
  addIconStyle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
});

export default styles;
