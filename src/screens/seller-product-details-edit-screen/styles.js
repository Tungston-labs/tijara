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
  mainImageContainer: {
    marginHorizontal: 10,
  },
  thumbnilImageContainer: {
    width: "100%",
    backgroundColor: "#EEF0E9",
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,

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
    // width: width * 1,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
  },
  variant: {
    color: "#888",
    fontSize: 13,
        fontWeight: "400",

  },
  priceContainer: {
    alignItems: "flex-end",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    marginHorizontal: 20,
  },

  mainImage: {
    width: 320,
    height: 177,
    width: "100%",
    borderRadius: 7,
    resizeMode: "cover",
    backgroundColor: "lightgray",
    overflow: "hidden",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  qty: {
        marginTop:2,

    fontSize: 13,
    color: "#757575",
  },
  expy: {
    marginTop:2,
    fontSize: 12,
    color: "#757575",
    fontWeight:"400"
  },
  descriptionBox: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal:10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    // marginTop:0
  },
  descriptionText: {
    backgroundColor: "#EEF0E9",
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    marginHorizontal: 10,
    minHeight: 100,
  },
  rowContainer: {
    flexDirection: "row",
  },
  textContainer: {
    textAlign: "left",
  },
});

export default styles;
