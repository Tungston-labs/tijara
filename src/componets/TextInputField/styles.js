import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 16,
    marginLeft: 2,
    color: "#000",
  },
  subText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 12,
    width: "90%",
    paddingHorizontal: 16,
  },
  countryCodeContainer: {
    backgroundColor: "#F6F6F6",
    width: width * 0.15,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
  backgroundColor: '#fff',
  position: 'absolute',
  top: 50,  
  left: 0,
  // width: 120,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  zIndex: 100,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
},

modalItem: {
  paddingVertical: 10,
  paddingHorizontal: 15,
},

modalText: {
  fontSize: 16,
  color: '#333',
},

});

export default styles;
