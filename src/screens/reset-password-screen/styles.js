  import { StyleSheet, Dimensions } from "react-native";

  const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
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
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    color: "#333",
    fontSize: 14,
    marginLeft: 5,
  },

  buttonPlace: {
    alignItems: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#C5EF4D",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 18,
    width: "90%",
    alignSelf: "center",
  },

  inputWide: {
    width: "90%",
    alignSelf: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});


  export default styles;
