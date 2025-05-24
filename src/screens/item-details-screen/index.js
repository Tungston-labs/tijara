import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Header from "../../componets/Header";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";

const ItemDetailsScreen = ({ navigation }) => {
  const handleIconPress = () => {
    navigation.navigate("BuyerHomeScreen");
  };
  const handleButtonClick = () => {
    navigation.navigate("BuyerHomeScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackgroundWrapper>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={"Cabbage"}
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
              <Text style={styles.rating}>⭐ 4.8 • USA</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>200 AED / kg</Text>
              <Text style={styles.qty}>
                Available Qty:{" "}
                <Text style={{ fontWeight: "bold" }}>1000kg</Text>
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button label={"Request"} handleButtonPress={handleButtonClick} />
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.sellerBox}>
              <Image source={images.profile} style={styles.sellerImage} />
              <View style={styles.textContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.sellerName}>Sold by Ajay Kumar </Text>
                  <Image source={images.verify} style={styles.verifyImage} />
                </View>
                <Text style={styles.sellerStats}>Sold over 2K+ Tons</Text>
              </View>
              <Text style={styles.sellerRating}>⭐ 4.8</Text>
            </View>
          </View>
          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Discription</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet consectetur. Lacus sed auctor ut mauris
              in mi tellus diam volutpat. Parturient in integer congue volutpat.
              Sit mi dolor cursus eu. Egestas aliquet dui mi consectetur.
            </Text>
          </View>
        </BackgroundWrapper>
      </ScrollView>
    </View>
  );
};

export default ItemDetailsScreen;
