import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styles from "./styles";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsThunk } from "../../redux/slice/productSlice"; // Adjust path if needed

const ListItemScreen = () => {
  const { products, loading, error } = useSelector((state) => state.product); // From productSlice
  const token = useSelector((state) => state.buyer.token); // Get buyer token
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      console.log("TOKEN FOUND IN ListItemScreen:", token);
      dispatch(fetchProductsThunk({ token }));
    }
  }, [token]);

  const [selectedTab, setSelectedTab] = useState("vegetables");

  const navigation = useNavigation();

const handleTileClick = (item) => {
  navigation.navigate("ItemDetailsScreen", { productId: item._id });
};


  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.boxTabContainer}>
          <View style={styles.tabContainer}>
            {["Fruits", "Vegetables"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab.toLowerCase())}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === tab.toLowerCase() && styles.activeTab,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.itemHeaderContainer}>
          <Text style={styles.itemHeader}>Popular Item</Text>
        </View>

        <View style={styles.flatListContainer}>
          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Loading...
            </Text>
          ) : error ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Failed to load products.
            </Text>
          ) : (
            <FlatList
              data={products.filter(
                (item) => item.itemCategory?.toLowerCase() === selectedTab
              )}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleTileClick(item)}>
                  <View style={styles.flatItem}>
                    <View style={styles.card}>
                      <SwiperFlatList
                        autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        showPagination
                        paginationStyle={{
                          position: "absolute",
                          bottom: 80,
                          alignSelf: "center",
                        }}
                        paginationStyleItem={{
                          width: 7,
                          height: 7,
                          borderRadius: 5,
                          marginHorizontal: 3,
                        }}
                        paginationActiveColor="#000000"
                        paginationDefaultColor="#ccc"
                        data={item.images || pictures} // fallback if no real images
                        renderItem={({ item: img }) => (
                          <View style={styles.child}>
                            <Image
                              source={{ uri: img }} // Make sure images are full URLs
                              style={{
                                width: "100%",
                                height: 200,
                                marginTop: 10,
                              }}
                              resizeMode="cover"
                            />
                          </View>
                        )}
                      />
                      <View style={styles.infoContainer}>
                        <View style={styles.rowBetween}>
                          <Text style={styles.author}>
                            {item?.addedBy?.name || "Seller"}
                          </Text>
                          <Text style={styles.title}>{item?.itemName}</Text>
                        </View>

                        <View style={styles.rowBetween}>
                          <Text style={styles.rating}>⭐ 4.8 (54)</Text>
                          <Text style={styles.subtitle}>
                            {item?.itemSubCategory}
                          </Text>
                        </View>

                        <View style={styles.rowBetween}>
                          <Text style={styles.quantity}>
                            Qty Available{"\n"}
                            <Text style={{ fontWeight: "bold" }}>
                              {item?.availableKg} Kg
                            </Text>
                          </Text>
                          <Text style={styles.price}>
                            ${item?.pricePerKg?.USD}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default ListItemScreen;
