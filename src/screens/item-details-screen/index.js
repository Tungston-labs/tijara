import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import styles from "./styles";
import Header from "../../componets/Header";
import images from "../../config/images";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import ModalButton from "../../componets/ModalButton";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { getProductByIdThunk } from "../../redux/slice/productSlice";
import { createOrderThunk } from "../../redux/slice/orderSlice";
import { Alert } from "react-native";

const ItemDetailsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(100);

  const token = useSelector((state) => state.buyer.token);
  const dispatch = useDispatch();
  const route = useRoute();
  const { productId } = route.params;

  const product = useSelector((state) => state.product.selectedProduct);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (productId && token) {
      console.log("Token from Redux:", token);
      dispatch(getProductByIdThunk({ token, productId }));
    }
    console.log(getProductByIdThunk);
  }, [productId, token]);

  const decrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const increase = () => setQuantity((prev) => prev + 1);

  const handleIconPress = () => {
    navigation.goBack();
  };

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const { loading, order, error } = useSelector((state) => state.order);

const handleOrderRequest = async () => {
  try {
    console.log("Dispatching createOrderThunk");

    const res = await dispatch(
      createOrderThunk({ token, productId, quantity })
    ).unwrap();

    navigation.navigate("SuccessScreen", {
      orderId: res.order._id,
    });

  } catch (err) {
    console.error("Error placing order:", err);
    Alert.alert("Error", err.message || "Failed to place order");
  }
};

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackgroundWrapper>
          <Header
            handleIconPress={handleIconPress}
            icon={true}
            Title={product?.itemName || "Loading..."}
          />

          <View style={styles.imageContainer}>
            <Image
              source={
                product?.images?.[selectedImageIndex]
                  ? { uri: product.images[selectedImageIndex] }
                  : images.fruit5
              }
              style={styles.mainImage}
            />
          </View>

          <View style={styles.thumbnilImageContainer}>
            <ScrollView horizontal style={styles.thumbnailContainer}>
              {product?.images?.map((img, i) => (
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
              <Text style={styles.productName}>{product?.itemName}</Text>
              <Text style={styles.variant}>{product?.itemSubCategory}</Text>
              <Text style={styles.rating}>⭐ 4.8 • {product?.country}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {product?.pricePerKg?.AED} AED / kg
              </Text>
              <Text style={styles.qty}>
                Available Qty:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {product?.availableKg}kg
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button label={"Request"} handleButtonPress={handleButtonClick} />
          </View>

          <View style={styles.alignContent}>
            <View style={styles.dataContainer}>
              <View style={styles.sellerBox}>
                <Image source={images.profile} style={styles.sellerImage} />
                <View style={styles.textContainer}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.sellerName}>Sold by Admin</Text>
                    <Image source={images.verify} style={styles.verifyImage} />
                  </View>
                  <Text style={styles.sellerStats}>Sold over 2K+ Tons</Text>
                </View>
              </View>
              <Text style={styles.sellerRating}>⭐ 4.8</Text>
            </View>
          </View>

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {product?.description || "No description available."}
            </Text>
          </View>

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <View style={styles.modalContentContainer}>
                  <Text style={styles.title}>Enter Required Quantity</Text>
                  <Text style={styles.subtitle}>in kilograms</Text>
                  <View style={styles.quantityDataContainer}>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity
                        onPress={decrease}
                        style={styles.adjustButton}
                      >
                        <Text style={styles.adjustButtonText}>−</Text>
                      </TouchableOpacity>
                      <View style={styles.quantityContainer}>
                        <Text style={styles.quantityText}>{quantity} Kg</Text>
                      </View>
                      <TouchableOpacity
                        onPress={increase}
                        style={styles.adjustButton}
                      >
                        <Text style={styles.adjustButtonText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <ModalButton
                    label={"Cancel"}
                    handleButtonPress={closeModal}
                    customStyle={styles.editButtonStyle}
                    customLabelStyle={styles.label}
                  />
                  <ModalButton
                    label={loading ? "Placing..." : "Submit"}
                    handleButtonPress={handleOrderRequest}
                    disabled={loading}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </BackgroundWrapper>
      </ScrollView>
    </View>
  );
};

export default ItemDetailsScreen;
