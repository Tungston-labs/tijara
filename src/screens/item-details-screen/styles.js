import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
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
    marginHorizontal: 15,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
  },
  variant: {
    color: "#888",
    fontSize: 13,
  },
  rating: {
    marginTop: 4,
    color: "#444",
    fontSize: 13,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  alignContent: {
    width: width * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    width: width * 0.9,
    marginBottom: 20,
    borderRadius: 10,
  },
  selectedThumbnail: {
    borderColor: "#B3DB48",
    borderWidth: 2,
  },
  sellerBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  textContainer: {
    flex: 1,
  },

  sellerRating: {
    fontSize: 14,
    color: "#000",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  qty: {
    fontSize: 13,
    color: "#444",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  // sellerName: {
  //   fontWeight: "600",
  // },
  // verifyImage: {
  //   height: 20,
  //   width: 20,
  // },
  sellerStats: {
    fontSize: 12,
    color: "#666",
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
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  descriptionText: {
    backgroundColor: "#EEF0E9",
    padding: 5,
    borderRadius: 10,
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    margin: 10,
    minHeight:100
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: width * 0.85,
    alignItems: "center",
    justifyContent: "center", // <-- Add this
  },

  modalText: {
    fontSize: 16,
    marginBottom: 15,
    width: width * 0.9,
    textAlign: "center",
  },
  editButtonStyle: {
    backgroundColor: "#F0F0F0",
    color: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginRight: 8,
  },
  // quantityContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#f5f5f5",
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  //   borderRadius: 12,
  // },
  quantityDataContainer: {
    width: width * 0.6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  adjustButton: {
    backgroundColor: "#B3DB48",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  adjustButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  // quantityText: {
  //   fontSize: 20,
  //   fontWeight: "400",
  //   color: "#757575",
  // },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#f0f0f0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: "#C9E769",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#e60b2c",
  },
  submitText: {
    color: "#000",
    fontWeight: "bold",
  },
  modalContentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // optional spacing below the input block
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    minWidth: 20,
  },

  sellerInfoContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
  },

  sellerLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },

  sellerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sellerName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },

  verifyImage: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },

  inputWithUnit: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    height: 60,
    marginHorizontal: 8,
  },

  quantityInput: {
    minWidth: 50,
    maxWidth:150,
    height: 60,
    fontSize: 20,
    fontWeight: "400",
    color: "#757575",
    textAlign: "center",
    margin: 0,
  },

  kgLabel: {
    fontSize: 20,
    color: "#444",
    color: "#757575",
    textAlign: "left",
  },
});

export default styles;
