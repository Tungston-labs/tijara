import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 30,
    tintColor: "#B3DB48",
  },
  title: {
    fontSize: 23,
    fontWeight: "500",
    marginBottom: 10,
    fontFamily: "Nunito",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    paddingBottom: 20,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: "#B3DB48",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Nunito",
  },
});

export default styles;
