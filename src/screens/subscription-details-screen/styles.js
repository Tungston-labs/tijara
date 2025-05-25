import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  wrapper: {
    height: height * 0.45,
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#2C2C2C",
    padding: 20,
    borderRadius: 30,
    width: width * 0.9,

    justifyContent: "flex-start",
  },
  planTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  planPrice: {
    color: "#B3DB48",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 8,
  },
  benefitsTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    color: "#fff",
    fontSize: 16,
    marginRight: 6,
  },
  benefitText: {
    color: "#fff",
    flex: 1,
    fontSize: 14,
  },
  subText: {
    fontSize: 14,
    color: "#000000",
    textAlign: "center",
    paddingHorizontal: 10,
    padding: 10,
  },
  bottomText: {
    fontSize: 14,
    color: "#000000",
    textAlign: "left",
    paddingHorizontal: 10,
    padding: 10,
  },
  buttonContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
});

export default styles;
