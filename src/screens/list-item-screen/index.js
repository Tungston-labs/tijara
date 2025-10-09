import React, { useState, useEffect } from "react";
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
import {
  fetchProductsThunk,
  resetProducts,
} from "../../redux/slice/productSlice";
import debounce from "lodash.debounce";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();
const LAST_BUY_CATEGORY_KEY = "LAST_BUY_CATEGORY";

const ListItemScreen = ({ refreshing, onRefresh }) => {
  const searchQuery = useSelector((state) => state.search.query);
  const { products, loading, error, page, totalPages } = useSelector(
    (state) => state.product
  );
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // restore category from MMKV synchronously (fallback to 'vegetables')
  const savedCategory = storage.getString(LAST_BUY_CATEGORY_KEY);
  const [selectedTab, setSelectedTab] = useState(
    savedCategory ?? "vegetables"
  );
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  // Fetch on tab/category change
  useEffect(() => {
    if (token) {
      dispatch(resetProducts());
      dispatch(
        fetchProductsThunk({
          token,
          filters: { itemCategory: selectedTab, search: debouncedSearch },
          page: 1,
        })
      );
    }
  }, [selectedTab, token, debouncedSearch, dispatch]);

  const handleTileClick = (item) => {
    navigation.navigate("ItemDetailsScreen", { productId: item._id });
  };

  const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      dispatch(
        fetchProductsThunk({
          token,
          filters: { itemCategory: selectedTab },
          page: page + 1,
        })
      );
    }
  };

  // central handler so we save to MMKV when user switches
  const selectTab = (tabLower) => {
    if (tabLower === selectedTab) return;
    setSelectedTab(tabLower);
    try {
      storage.set(LAST_BUY_CATEGORY_KEY, tabLower);
    } catch (e) {
      console.warn("Failed to save buy category to MMKV:", e);
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.boxTabContainer}>
          <View style={styles.tabContainer}>
            {["Fruits", "Vegetables"].map((tab) => {
              const tabKey = tab.toLowerCase();
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => selectTab(tabKey)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === tabKey && styles.activeTab,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.itemHeaderContainer}>
          <Text style={styles.itemHeader}>Popular Items</Text>
        </View>

        <View style={styles.flatListContainer}>
          {loading && page === 1 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Loading...
            </Text>
          ) : error ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Failed to load products.
            </Text>
          ) : products.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No items found.
            </Text>
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && page > 1 ? (
                  <Text style={{ textAlign: "center" }}>Loading more...</Text>
                ) : null
              }
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
                          bottom: 10,
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
                        data={item.images}
                        renderItem={({ item: img }) => (
                          <View style={styles.child}>
                            <Image
                              source={{ uri: img }}
                              style={styles.imageStyle}
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
                            AED{" "}
                            {item?.pricePerKg?.AED
                              ? item?.pricePerKg?.AED
                              : "---"}
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
