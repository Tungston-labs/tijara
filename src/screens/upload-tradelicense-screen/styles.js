import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputcontainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 1,
  },
  wrapperContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: width * 0.9,
  },

  label: {
    width: width * 0.9,
    color: "#000",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    textAlign: "left",
    paddingLeft: 5,
  },
  datePickerField: {
    width: width * 0.9,
    borderRadius: 6,
    justifyContent: "center",
    marginVertical: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 0,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  buttonContainer: {
    width: width * 1,
    alignItems: "center",
    marginBlockStart: "auto",
    marginBottom: 30,
  },
  ImageContainer: {
    alignSelf: "center",
    width: width * 0.4,
    height: height * 0.1,
  },
  uploadSection: {
    width: width * 0.9,
    marginTop: 10,
  },
  uploadLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#000",
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 6,
  },
  uploadText: {
    color: "#94D82D",
    fontSize: 16,
  },
  uploadedFileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  uploadedFileName: {
    flex: 1,
    color: "#000",
  },
  removeFile: {
    color: "red",
    fontSize: 20,
    marginLeft: 10,
  },
});

export default styles;
