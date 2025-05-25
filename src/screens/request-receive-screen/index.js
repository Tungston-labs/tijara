import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";

const requests = {
  "Today\n21 may": [
    {
      id: "1",
      name: "Ajay kumar",
      quantity: "200 Kg",
      date: "12 jan 2025",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ],
  "Yesterday\n20 may": [
    {
      id: "2",
      name: "Ajay kumar",
      quantity: "200 Kg",
      date: "12 jan 2025",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "3",
      name: "Ajay kumar",
      quantity: "200 Kg",
      date: "12 jan 2025",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "4",
      name: "Ajay kumar",
      quantity: "200 Kg",
      date: "12 jan 2025",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ],
};

const RequestReceiveScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <BackgroundWrapper>
        <Text style={styles.header}>Request status</Text>
        <View style={styles.wrapContainer}>
          {Object.entries(requests).map(([section, items]) => (
            <View key={section} style={styles.mainContainer}>
              <Text style={styles.sectionHeader}>{section}</Text>

              {items.map((item) => (
                <View key={item.id} style={styles.itemWrapper}>
                  <View style={styles.card}>
                    <Image source={images.profile} style={styles.avatar} />
                    <View style={styles.info}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.details}>
                        Quantity : {item.quantity}
                      </Text>
                      <Text style={styles.details}>Date : {item.date}</Text>
                    </View>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity style={styles.rejectButton}>
                      <Text style={styles.rejectText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Text style={styles.acceptText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.whatsappButton}>
                      <Icon name="whatsapp" size={22} color="#25D366" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.separator} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </BackgroundWrapper>
    </ScrollView>
  );
};
export default RequestReceiveScreen;
