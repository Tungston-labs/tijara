// import React from "react";
// import { View, Text } from "react-native";
// import BackgroundWrapper from "../../componets/BackgroundWrapper";

// import styles from "./styles";
// import Button from "../../componets/Button";
// import Header from "../../componets/Header";
// import { useRoute } from "@react-navigation/native"; // import useRoute

// const RoleSelectionScreen = ({ navigation }) => {
//   const route = useRoute();
//   const location = route.params?.location;
//   console.log("ksjksjsjsjsjsjs",location);
//   const handleBuyerButtonClick = () => {
//     navigation.navigate("RegistrationScreen", { role: "buyer", location });
//   };

//   const handleSellerButtonClick = () => {
//     navigation.navigate("RegistrationScreen", { role: "seller", location });
//   };

//   const handleIconPress = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <BackgroundWrapper>
//         <Header handleIconPress={handleIconPress} icon={true} />
//         <View style={styles.contentContainer}>
//           <View style={styles.textContainer}>
//             <Text style={styles.textStyle}>Who Are You?</Text>
//           </View>
//           <Button label={"Buyer"} handleButtonPress={handleBuyerButtonClick} />
//           <Button
//             label={"Seller"}
//             handleButtonPress={handleSellerButtonClick}
//             customStyle={styles.buttonStyle}
//           />
//         </View>
//       </BackgroundWrapper>
//     </View>
//   );
// };

// export default RoleSelectionScreen;
