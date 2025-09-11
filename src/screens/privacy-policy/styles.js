import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backArrow: {
    marginTop: 50,
    marginLeft: 2,
  },

  headerContainer: {
    backgroundColor: "#B3DB48",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    left: 0,
    marginTop: 40,
    marginLeft: 16,
    right: 0,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Nunito",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Nunito",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 12,
  },
  bullet: {
    marginTop: 6,
    fontSize: 14,
  },
  paragraphBold: {
    marginTop: 12,
  },
  paragraph: {
    marginTop: 12,
  },
  label: {
    marginTop: 2,
  },
});

export default styles;
