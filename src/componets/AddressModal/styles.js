import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
  flex: 1,
  backgroundColor: "#fff",
  padding: 20,
  marginTop:40,
},

title: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 20,
},

input: {
  borderWidth: 1,
  borderColor: "#e0e0e0",
  borderRadius: 8,
  padding: 12,
  marginBottom: 15,
  backgroundColor: "#fafafa",
},

switchRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},

switchLabel: {
  fontSize: 16,
  color: "#222",
},

saveButton: {
  backgroundColor: "#7CB518",
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 10,
},

saveButtonText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 16,
},

cancelButton: {
  backgroundColor: "#f2f2f2",
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
},

cancelButtonText: {
  color: "#222",
  fontSize: 16,
},

});

export default styles;
