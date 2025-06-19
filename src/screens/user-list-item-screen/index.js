import React, { useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProductsThunk } from "../../redux/slice/sellerProductSlice";

const UserListItemScreen = () => {
  // const route = useRoute();
const passedToken = useSelector((state)=>state.user.token);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { products, loading, error } = useSelector((state) => ({
    products: state.sellerProduct.sellerProducts,
    loading: state.sellerProduct.loading,
    error: state.sellerProduct.error,
  }));

  // const sellerToken = useSelector((state) => state.seller.token);

  useEffect(() => {
    if (passedToken) {
      dispatch(
        fetchSellerProductsThunk({
          token: passedToken,
          page: 1,
          limit: 10,
        })
      ).then((res) => {
        console.log("Response from thunk:", res?.payload);
      });
    }
  }, [dispatch, passedToken]);

  const handleTileClick = (product) => {
    navigation.navigate("ItemDetailsScreen", { product }); // pass full product
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
          data={item.images}
          renderItem={({ item: imageUri }) => (
            <View style={styles.child}>
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 5,
                }}
                resizeMode="cover"
              />
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
            <Text style={styles.price}>₹{item.pricePerKg?.INR}</Text>
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

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <View style={styles.flatListContainer}>
            <FlatList
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </BackgroundWrapper>
    </View>
  );
};

export default UserListItemScreen;
