import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles";
import Header from "../../componets/Header";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";

const SellerProductDetailsEditScreen = ({ navigation }) => {
  const handleIconPress = () => {
    navigation.navigate("BuyerHomeScreen");
  };
  const handleEditPress = () => {
    navigation.navigate("AddItemScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackgroundWrapper>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={"Cabbage"}
            editIcon={true}
            handleEditIconPress={handleEditPress}
          />

          <View style={styles.imageContainer}>
            <Image source={images.fruit5} style={styles.mainImage} />
          </View>
          <View style={styles.thumbnilImageContainer}>
            <ScrollView horizontal style={styles.thumbnailContainer}>
              {[1, 2, 3, 4].map((_, i) => (
                <Image
                  key={i}
                  source={images.fruit5}
                  style={styles.thumbnail}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.infoSection}>
            <View>
              <Text style={styles.productName}>Cabbage</Text>
              <Text style={styles.variant}>Savoy Cabbage</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>200 AED / kg</Text>
              <Text style={styles.qty}>
                Available Qty:{" "}
                <Text style={{ fontWeight: "bold" }}>1000kg</Text>
              </Text>
              <Text style={styles.expy}>Expiry date</Text>
              <Text style={{ fontWeight: "bold" }}>12 March 2025</Text>
              <Text style={{ fontWeight: "bold" }}>Fruitful Harvest</Text>
            </View>
          </View>
          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Discription</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur. Lacus sed auctor ut mauris
              in mi tellus diam volutpat. Parturient in integer congue
              volutpat.Sit mi dolor cursus eu. Egestas aliquet dui mi
              consectetur.
            </Text>
          </View>
        </BackgroundWrapper>
      </ScrollView>
    </View>
  );
};

export default SellerProductDetailsEditScreen;
