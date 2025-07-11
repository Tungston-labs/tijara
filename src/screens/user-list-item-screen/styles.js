import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    container: {
    flex: 1,
    //   backgroundColor: "#fff",
  },
  firstContainer: {
    marginTop: 5,
    marginBottom: 10,
  },

  boxTabContainer: {
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
    marginInline:25,
    marginTop:10,
    marginBottom:5
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
  },
  tabText: {
    fontSize: 16,
    color: "#B3B3B3",
    paddingBottom: 6,
    textAlign: "center",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  activeTab: {
    color: "#000000",
    borderBottomWidth: 2,
    borderBottomColor: "#B3DB48",
  },
  itemHeaderContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
  itemHeader: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    fontFamily:"Nunito"
  },
  flatListContainer: {
    flex: 1,
    width: width,
  },
  flatItem: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: width * 0.9,
    elevation: 5,
    height: height * 0.3,
    padding: 10,
  },
  child: {
    width: width,
    height: height * 0.2,
    borderRadius: 10,
  },
//   negotiableTag: {
//   position: "absolute",
//   bottom: 10,
//   right: 10,
//   backgroundColor: "#d4f4cf",
//   color: "#2e7d32",
//   paddingHorizontal: 10,
//   paddingVertical: 4,
//   borderRadius: 6,
//   fontWeight: "600",
//   fontSize: 12,
//   overflow: "hidden",
// },
  imageStyle: {
    borderRadius: 10,
  },
  infoContainer: {
    padding: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 1,
  },
  author: {
    color: "#B3DB48",
    fontWeight: "600",
    fontSize: 12,
  },
  rating: {
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  quantity: {
    fontSize: 12,
    color: "#444",
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default styles;
