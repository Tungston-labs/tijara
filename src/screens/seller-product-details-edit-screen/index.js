import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import Header from "../../componets/Header";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getSellerProductByIdThunk } from "../../redux/slice/sellerProductSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const SellerProductDetailsEditScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { productId } = route.params || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const sellerProduct = useSelector(
    (state) => state.sellerProduct.selectedSellerProduct
  );
  console.log("sellerProduct", sellerProduct);
  useEffect(() => {
    console.log("Route Params:", route.params);
    if (productId && token) {
      dispatch(getSellerProductByIdThunk({ token, productId }));
    }
  }, [productId, token]);

  useFocusEffect(
  useCallback(() => {
    if (route.params?.shouldRefresh && productId && token) {
      dispatch(getSellerProductByIdThunk({ token, productId }));
      navigation.setParams({ shouldRefresh: false }); // Reset the flag
    }
  }, [route.params?.shouldRefresh, token, productId])
);

  const handleIconPress = () => {
    navigation.goBack();
  };

  const handleEditPress = () => {
    if (sellerProduct) {
      navigation.navigate("SellerEditProductScreen", {
        product: sellerProduct,
      });
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackgroundWrapper>
          
          <View style={styles.mainImageContainer}>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={sellerProduct?.itemName}
            editIcon={true}
            handleEditIconPress={handleEditPress}
          /></View>
          <View style={styles.imageContainer}>
            <Image
              source={
                sellerProduct?.images?.[selectedImageIndex]
                  ? { uri: sellerProduct.images[selectedImageIndex] }
                  : images.fruit5
              }
              style={styles.mainImage}
            />
          </View>
          <View style={styles.thumbnilImageContainer}>
            <ScrollView horizontal style={styles.thumbnailContainer}>
              {sellerProduct?.images?.map((img, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedImageIndex(i)}
                >
                  <Image
                    source={{ uri: img }}
                    style={[
                      styles.thumbnail,
                      selectedImageIndex === i && styles.selectedThumbnail, // Optional highlight
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.infoSection}>
            <View>
              <Text style={styles.productName}>{sellerProduct?.itemName}</Text>
              <Text style={styles.variant}>
                {sellerProduct?.itemSubCategory}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles?.price}>
                {sellerProduct?.pricePerKg?.AED} AED / kg
              </Text>
              <Text style={styles.qty}>
                Available Qty:
                <Text style={{ fontWeight: "700",color:"#000" }}>
                  {sellerProduct?.availableKg}kg
                </Text>
              </Text>
              <Text style={styles.expy}>Expiry date</Text>
              <Text style={{ fontWeight: "400",color:"#000" }}>
                {sellerProduct?.expiryDate
                  ? new Date(sellerProduct.expiryDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </Text>
            </View>
          </View>
          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Discription</Text>
            <Text style={styles.descriptionText}>
              {sellerProduct?.description|| "No description available."}
            </Text>
          </View>
        </BackgroundWrapper>
      </ScrollView>
    </View>
  );
};

export default SellerProductDetailsEditScreen;
