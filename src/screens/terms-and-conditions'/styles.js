import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backArrow: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
  },
  paragraph: {
    fontSize: 14,
    marginTop: 8,
    color: "#444",
    lineHeight: 20,
  },
});

export default styles;