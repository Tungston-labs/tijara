// import React from "react";
// import { View, Text, FlatList, Image } from "react-native";
// import styles from "./styles";
// import BackgroundWrapper from "../../componets/BackgroundWrapper";

// const requestData = [
//   {
//     id: "1",
//     sellerName: "Ajay kumar",
//     quantity: "200 Kg",
//     date: "12 Jan 2025",
//     status: "Waiting for Response",
//     image: require("../../resources/images/profile.png"),
//   },
//   {
//     id: "2",
//     sellerName: "Ajay kumar",
//     quantity: "200 Kg",
//     date: "12 Jan 2025",
//     status: "Accepted",
//     image: require("../../resources/images/profile.png"),
//   },
//   {
//     id: "3",
//     sellerName: "Ajay kumar",
//     quantity: "200 Kg",
//     date: "12 Jan 2025",
//     status: "Rejected",
//     image: require("../../resources/images/profile.png"),
//   },
// ];

// const statusColors = {
//   Accepted: "#B3DB48",
//   "Waiting for Response": "#FFD000",
//   Rejected: "red",
// };

// const RequestStatusScreen = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Image source={item.image} style={styles.avatar} />
//       <View style={styles.details}>
//         <Text style={styles.nameText}>Seller: {item.sellerName}</Text>
//         <Text style={styles.text}>Quantity: {item.quantity}</Text>
//         <Text style={styles.text}>Date: {item.date}</Text>
//       </View>
//       <Text style={[styles.status, { color: statusColors[item.status] }]}>
//         {item.status}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <BackgroundWrapper customStyle={styles.wrapperStyle}>
//         <View style={styles.boxContainer}>
//           <Text style={styles.title}>Request Status</Text>
//           <Text style={styles.boxTitle}>Today</Text>
//           <Text style={styles.dateTitle}>21 May</Text>
//           <FlatList
//             data={requestData}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//           />
//         </View>
//       </BackgroundWrapper>
//     </View>
//   );
// };

// export default RequestStatusScreen;
