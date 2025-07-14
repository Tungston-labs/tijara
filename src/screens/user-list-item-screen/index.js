import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerProductsThunk,
  resetSellerProducts,
} from "../../redux/slice/sellerProductSlice";
import debounce from "lodash.debounce";

const UserListItemScreen = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const searchQuery = useSelector((state) => state.search.query);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const { sellerProducts, loadingSeller, errorSeller, page, totalPages } =
    useSelector((state) => state.sellerProduct);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    handler();

    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  useEffect(() => {
    if (token) {
      dispatch(resetSellerProducts());
      dispatch(
        fetchSellerProductsThunk({
          token,
          filters: { search: debouncedSearch },
          page: 1,
          limit: 10,
        })
      );
    }
  }, [dispatch, token, debouncedSearch]);

  const handleTileClick = (product) => {
    navigation.navigate("SellerProductDetailsEditScreen", {
      productId: product._id,
    });
  };

  const handleLoadMore = () => {
    if (!loadingSeller && page < totalPages) {
      dispatch(fetchSellerProductsThunk({ token, page: page + 1, limit: 10 }));
    }
  };

  const renderItem = ({ item }) => (
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
              bottom: 70,
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
            renderItem={({ item: imageUri }) => (
              <View style={styles.child}>
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: "100%", height: 200, marginTop: 5 }}
                  resizeMode="cover"
                />
                 {/* <Text style={styles.negotiableTag}>Price Negotiable</Text> */}
              </View>
            )}
          />

          <View style={styles.infoContainer}>
            <View style={styles.rowBetween}>
              <Text style={styles.quantity}>
                Qty Available{"\n"}
                <Text style={{ fontWeight: "bold" }}>
                  {item.availableKg} Kg
                </Text>
              </Text>
              <Text style={styles.title}>{item.itemName}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text />
              <Text style={styles.subtitle}>{item.itemSubCategory}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text />
              <Text style={styles.price}>AED {item.pricePerKg?.AED?item.pricePerKg?.AED:"---"}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.boxTabContainer}>
          <Text style={styles.itemHeader}>All Items</Text>
        </View>

        {loadingSeller && page === 1 ? (
          <ActivityIndicator size="large" color="#000" />
        ) : errorSeller ? (
          <Text style={{ color: "red", textAlign: "center" }}>
            {errorSeller}
          </Text>
        ) : (
          <View style={styles.flatListContainer}>
            <FlatList
              data={sellerProducts}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loadingSeller && page > 1 ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : null
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </BackgroundWrapper>
    </View>
  );
};

export default UserListItemScreen;
