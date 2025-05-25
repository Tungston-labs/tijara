import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  wrapContainer: {
    alignItems: "center",
  },
  mainContainer: {
    width: width * 1,
    justifyContent: "center",
    width: width * 0.9,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
  },
  itemWrapper: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#F44336",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingVertical: 8,
    alignItems: "center",
  },
  rejectText: {
    color: "#F44336",
    fontWeight: "500",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#D7E2B9",
    borderRadius: 8,
    borderColor: "#B3DB48",
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  acceptText: {
    color: "#fff",
    fontWeight: "500",
  },
  whatsappButton: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  separator: {
    borderBottomWidth: 0.8,
    borderBottomColor: "#000000",
    marginTop: 14,
  },
});

export default styles;
