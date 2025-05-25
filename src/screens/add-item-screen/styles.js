import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "600",
  },
  minImageText: {
    color: "red",
    textAlign: "right",
    marginBottom: 6,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderStyle: "dashed",
    borderRadius: 6,
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "#4CAF50",
    fontSize: 16,
  },
  imagePreviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
    overflow: "hidden",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
  },
  unit: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default styles;
