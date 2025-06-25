import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },

backArrow: {
    position: "absolute",
    top: 5,
    left: 20,
    zIndex: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#000",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },

  label: {
    marginBottom: 8,
    color: "#333",
    fontSize: 14,
    marginLeft: 5,
  },

  input: {
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    color: "#000",
  },

  button: {
    backgroundColor: "#C5EF4D",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
