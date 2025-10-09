import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  AppState,
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
import Icon from "react-native-vector-icons/FontAwesome";
 import Toast from "react-native-toast-message";
import { Linking } from "react-native";
const ItemDetailsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState("100");

  const token = useSelector((state) => state.user.token);
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

  const increase = () => {
    setQuantity((prev) => {
      const num = parseFloat(prev) || 0;
      return (num + 1).toString();
    });
  };

  const decrease = () => {
    setQuantity((prev) => {
      const num = parseFloat(prev) || 0;
      return num > 0 ? (num - 1).toString() : "0";
    });
  };

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

    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: "Your order has been placed successfully.",
    });

    navigation.navigate("SuccessScreen", {
      orderId: res.order._id,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: err.message || "Failed to place order.",
    });
  }
};

const handleWhatsAppRequest = () => {
  const message = `Hello, I would like to request ${quantity} Kg of ${
    product?.itemName || "this product"
  }. Please let me know the next steps.`;

  const phoneNumber = product?.addedBy?.phone;

  if (!phoneNumber) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Seller phone number not available.",
    });
    return;
  }

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Could not open WhatsApp. Please make sure it's installed.",
    });
  });
};


  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      setModalVisible(false);
    }
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 150,
      }}
      showsVerticalScrollIndicator={false}
    >
      <BackgroundWrapper>
        <Header
          handleIconPress={handleIconPress}
          icon={true}
          Title={product?.itemName || "Loading..."}
          iconContainerStyle={{ marginLeft: 10 }}
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
                    selectedImageIndex === i && styles.selectedThumbnail,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.background}>
          <View style={styles.infoSection}>
            <View>
              <Text style={styles.productName}>{product?.itemName}</Text>
              <Text style={styles.variant}>{product?.itemSubCategory}</Text>
              <Text style={styles.rating}>⭐ 4.8 • {product?.country}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {product?.pricePerKg?.AED ? product?.pricePerKg?.AED : "---"}{" "}
                AED / kg
              </Text>
              <Text style={styles.qty}>
                Available Qty:
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
                <Image
                  source={{ uri: product?.addedBy?.profileImage }}
                  style={styles.sellerImage}
                />
                {/* <Image source={images.profile} style={styles.sellerImage} /> */}
                <View style={styles.textContainer}>
                  <View style={styles.sellerInfoContainer}>
                    <Text style={styles.sellerLabel}>Sold by</Text>
                    <View style={styles.sellerRow}>
                      <Text style={styles.sellerName}>
                        {product?.addedBy?.name || "Seller"}
                      </Text>
                      <Image
                        source={images.verify}
                        style={styles.verifyImage}
                      />
                    </View>
                  </View>

                  <Text style={styles.sellerStats}>Sold over 2K+ Tons</Text>
                </View>
              </View>
              <Text style={styles.sellerRating}>⭐ 4.8</Text>
            </View>
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
                    <View style={styles.inputWithUnit}>
                      <TextInput
                        style={styles.quantityInput}
                        keyboardType="decimal-pad"
                        value={quantity}
                        onChangeText={(text) => {
                          const cleaned = text.replace(/[^0-9.]/g, "");

                          const valid = cleaned.replace(/(\..*?)\..*/g, "$1");

                          setQuantity(valid);
                        }}
                      />
                      <Text style={styles.kgLabel}>Kg</Text>
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
                <View style={styles.cancelText}>
                  <ModalButton
                    label={"Cancel"}
                    style={styles.cancelButton}
                    handleButtonPress={closeModal}
                    customStyle={styles.editButtonStyle}
                    customLabelStyle={styles.label}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleWhatsAppRequest}
                  style={[styles.whatsappButton, loading && { opacity: 0.5 }]}
                  disabled={loading}
                >
                  <Icon name="whatsapp" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </BackgroundWrapper>
    </ScrollView>
  );
};

export default ItemDetailsScreen;
