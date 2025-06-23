import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
  },
  mainImage: {
    width: "90%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnilImageContainer: {
    width: "100%",
    backgroundColor: "#EEF0E9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  thumbnailContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
    marginLeft: 15,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    width: width * 1,
    padding: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  variant: {
    color: "#888",
    fontSize: 13,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
imageContainer: {
  justifyContent: "center",
  alignItems: "center",
  width: "100%", 
},

mainImage: {
  width: 320,
  height: 177,
  borderRadius: 7,
  resizeMode: "cover", 
  backgroundColor: "lightgray", 
  overflow: "hidden", 
},

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  qty: {
    fontSize: 13,
    color: "#757575",
  },
  expy: {
    fontSize: 12,
    color: "#757575",
  },
  descriptionBox: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  descriptionText: {
    backgroundColor: "#EEF0E9",
    padding: 5,
    borderRadius: 10,
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    margin: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
  textContainer: {
    textAlign: "left",
  },
});

export default styles;
