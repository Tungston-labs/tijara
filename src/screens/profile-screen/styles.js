import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: "#B3DB48",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitleContainer: {
    marginTop: 55,
  },
  customHeader: {
  backgroundColor: "#B3DB48",
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 40,
  paddingBottom: 50,
  paddingHorizontal: 20,
  position: "relative",
  justifyContent: "center",
},

backIcon: {
  position: "absolute",
  left: 5,
  top: 25,
},

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },
  optionsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    width: width * 0.85,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },

  logoutText: {
    color: "#FF4D4D",
    fontSize: 16,
  },
  buttonStyle: {
    borderColor: "#FFCCCC",
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "400",
    color: "red",
    marginRight: 8,
  },
  buttonContainer: {
    paddingBottom: 20,
    alignItems: "center",
    marginTop: 30,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 10,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 10,
    // alignItems: "center",
  },
  modalTitleText: {
    fontSize: 20,
    marginBottom: 15,
    width: width * 0.9,
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    width: width * 0.9,
    textAlign: "left",
    marginLeft: 15,
  },
  editButtonStyle: {
    borderColor: "#000000",
    backgroundColor: "#EEEEEE",
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginRight: 8,
  },
  buttonRowContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customLabelStyles: {
    fontSize: 16,
    fontWeight: "400",
    color: "red",
    marginRight: 8,
  },
  cancelCustomLabelStyles: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    marginRight: 8,
  },
  logoutButtonStyle: {
    borderColor: "#FFCCCC",
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
    marginLeft: 5,
  },
  cancelButtonStyle: {
    borderColor: "#000000",
    backgroundColor: "EEEEEE",
    borderWidth: 1,
    flexDirection: "row",
    padding: 20,
    marginLeft:-10
  },
});

export default styles;
