import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  minImageText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 5,
    marginTop: -70,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  uploadText: {
    color: "#7CB518",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreviewBox: {
    width: 67,
    height: 67,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 10,
  },
  horizontalImageScrollContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  horizontalImageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  formSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#222",
    marginBottom: 6,
    marginTop: 12,
    fontWeight: "400",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
    marginBottom: 8,
    justifyContent: "center",
  },
  dropdownText: {
    color: "#888",
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
    fontSize: 15,
    marginBottom: 8,
    height: 44,
    justifyContent: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
    fontSize: 15,
  },
  priceUnitBox: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  priceUnit: {
    fontSize: 15,
    color: "#888",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
    fontSize: 15,
    height: 100,
    textAlignVertical: "top",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
  },
  cancelButtonText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#e8f7d2",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#b6e388",
  },
  addButtonText: {
    color: "#7CB518",
    fontSize: 16,
    fontWeight: "bold",
  },
  fixedButtonRow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 27,
    backgroundColor: "#fff",
    borderTopColor: "#e0e0e0",
  },
  suggestionBox: {
  backgroundColor: "#fff",
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 8,
  marginTop: 4,
  maxHeight: 150,
  overflow: "hidden",
  zIndex: 999, // Ensure it renders above
  elevation: 5, // Android shadow
},

suggestionItem: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

suggestionText: {
  fontSize: 15,
  color: "#333",
},

 modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
  },
 modalTitleText: {
  fontSize: 20,
  marginBottom: 15,
  fontWeight: "600",
  textAlign: "center",
  width: "100%",           // Let it fill container
},

modalText: {
  fontSize: 14,
  marginBottom: 15,
  textAlign: "center",
  width: "100%",           // Avoid fixed marginLeft
  fontWeight: "300",
  lineHeight: 20,          // Optional: improves readability
},
  buttonRowContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButtonStyle: {
    borderColor: "#000000",
    backgroundColor: "#EEEEEE",
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
  },
  logoutButtonStyle: {
    borderColor: "#FFCCCC",
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
    marginLeft: 10,
  },
  cancelCustomLabelStyles: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    marginRight: 8,
  },
  customLabelStyles: {
    fontSize: 16,
    fontWeight: "400",
    color: "red",
    marginRight: 8,
  },

});

export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    color: "#222",
    backgroundColor: "#fafafa",
    marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    color: "#222",
    backgroundColor: "#fafafa",
    marginBottom: 8,
  },
  placeholder: {
    color: "#888",
  },
  iconContainer: { top: 10, right: 12 },
};


export default styles;
