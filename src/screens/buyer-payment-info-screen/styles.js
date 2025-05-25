import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  wrapperContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    marginTop: 20,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownPlaceholder: {
    color: "#999",
  },
  dropdownContainer: {
    backgroundColor: "#f8f8f8",
    borderColor: "#ddd",
    marginTop: 5,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethodButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    width: "48%",
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  paymentMethodButtonActive: {
    borderColor: "#007AFF",
    backgroundColor: "#e6f2ff",
  },
  paymentMethodText: {
    fontSize: 16,
    color: "#666",
  },
  paymentMethodTextActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  halfInputContainer: {
    width: "48%",
  },
  halfInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 20,
    backgroundColor: "#E8E8ED",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    width: width * 0.9,
    textAlign: "center",
  },
  editButtonStyle: {
    backgroundColor: "#fff",
    color: "black",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginRight: 8,
  },
  rowContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default styles;
