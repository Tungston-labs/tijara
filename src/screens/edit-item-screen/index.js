// SellerEditProductScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import styles, { pickerSelectStyles } from "./styles";
import Header from "../../componets/Header";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateSellerProductThunk } from "../../redux/slice/sellerProductSlice";
import API from "../../services/config";
import debounce from "lodash/debounce";

const SellerEditProductScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [category, setCategory] = useState(product.itemCategory || null);
  const [country, setCountry] = useState(product.country || null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState(
    product.expiryDate ? new Date(product.expiryDate) : null
  );
  const [images, setImages] = useState(
    product.images.map((url) => ({ uri: url })) || []
  );
  const [itemName, setItemName] = useState(product.itemName);
  const [description, setDescription] = useState(product.description);
  const [priceAED, setPriceAED] = useState(
    String(product.pricePerKg?.AED || "")
  );
  const [subCategoryText, setSubCategoryText] = useState(
    product.itemSubCategory
  );
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [subCategorySuggestions, setSubCategorySuggestions] = useState([]);
  const [loadingSubCategory, setLoadingSubCategory] = useState(false);
  const [showSubCategorySuggestions, setShowSubCategorySuggestions] =
    useState(false);

  const fetchSuggestions = debounce(async (query) => {
    if (!query.trim()) return;
    setLoadingSuggestions(true);
    try {
      const res = await API.get(`/product/item-names?search=${query}`);
      setSuggestions(res.data.itemNames || []);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoadingSuggestions(false);
    }
  }, 500);

  useEffect(() => {
    fetchSuggestions(itemName);
  }, [itemName]);

  const fetchSubCategories = debounce(async (query) => {
    if (!itemName || !query.trim()) return;
    setLoadingSubCategory(true);
    try {
      const res = await API.get(
        `/product/item-sub-category/${itemName}?search=${query}`
      );
      setSubCategorySuggestions(res.data.subCategories || []);
    } catch (e) {
      console.error("Sub-cat fetch error:", e);
    } finally {
      setLoadingSubCategory(false);
    }
  }, 500);

  useEffect(() => {
    fetchSubCategories(subCategoryText);
  }, [subCategoryText, itemName]);

  const handleSelectImages = async () => {
    const options = {
      mediaType: "photo",
      quality: 0.7,
      selectionLimit: 10,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.errorCode) return;

      if (response.assets && response.assets.length > 0) {
        const newImages = response.assets;

        // Append new images to existing ones (up to 10 total)
        setImages((prevImages) => {
          const combined = [...prevImages, ...newImages];
          const unique = combined.slice(0, 10); // Limit to 10 images if needed
          return unique;
        });
      }
    });
  };

  const handleUpdateProduct = async () => {
    if (
      !category ||
      !itemName.trim() ||
      !subCategoryText.trim() ||
      !country ||
      !priceAED ||
      !expiryDate
    ) {
      return Alert.alert("Error", "Please fill all fields correctly.");
    }

    const formData = new FormData();
    images.forEach((img, index) => {
      if (!img.uri.startsWith("http")) {
        formData.append("images", {
          uri: img.uri,
          name: img.fileName || `image_${index}.jpg`,
          type: img.type || "image/jpeg",
        });
      }
    });
    formData.append("itemCategory", category);
    formData.append("itemName", itemName);
    formData.append("itemSubCategory", subCategoryText);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("priceAED", priceAED);
    formData.append("expiryDate", expiryDate.toISOString());
    console.log("form", formData);
    try {
      await dispatch(
        updateSellerProductThunk({ productId: product._id, formData, token })
      ).unwrap();
      Alert.alert("Success", "Product updated successfully");
      navigation.navigate("SellerProductDetailsEditScreen", {
        productId: product._id,
        shouldRefresh: true,
      });
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to update product");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowSuggestions(false);
        setShowSubCategorySuggestions(false);
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
          >
            <BackgroundWrapper>
              <Header Title="Edit Item" />
              <Text style={styles.minImageText}>*Min 4 Image</Text>
              <TouchableOpacity
                style={styles.uploadBox}
                onPress={handleSelectImages}
              >
                <Text style={styles.uploadText}>+ Upload image</Text>
              </TouchableOpacity>
              <View style={styles.horizontalImageRow}>
                {images.map((img, i) => (
                  <View
                    key={i}
                    style={{
                      ...styles.imagePreviewBox,
                      marginRight: 10,
                      marginLeft: i === 0 ? 20 : 0,
                    }}
                  >
                    <Image
                      source={{ uri: img.uri }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 10,
                      }}
                    />
                    {/* Remove Button */}
                    <TouchableOpacity
                      onPress={() => {
                        const filtered = [...images];
                        filtered.splice(i, 1);
                        setImages(filtered);
                      }}
                      style={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: 10,
                        padding: 4,
                        zIndex: 10,
                      }}
                    >
                      <Icon name="close" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.formSection}>
                {/* Category Picker */}
                <Text style={styles.label}>Item Category</Text>
                <View style={styles.input}>
                  <RNPickerSelect
                    onValueChange={setCategory}
                    items={[
                      { label: "Fruits", value: "fruits" },
                      { label: "Vegetables", value: "vegetables" },
                    ]}
                    value={category}
                    placeholder={{ label: "Item Category", value: null }}
                    // style={pickerSelectStyles}
                    style={{
                      inputIOS: {
                        color: "#222",
                        fontSize: 15,
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        backgroundColor: "transparent",
                        borderWidth: 0,
                      },
                      inputAndroid: {
                        color: "#222",
                        fontSize: 15,
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        backgroundColor: "transparent",
                        borderWidth: 0,
                      },
                      placeholder: { color: "#888" },
                      iconContainer: { top: 16, right: 12 },
                    }}
                    Icon={() => (
                      <Icon name="arrow-drop-down" size={24} color="#888" />
                    )}
                  />
                </View>
                {/* Item Name */}
                <View>
                  <Text style={styles.label}>Item name</Text>

                  <View style={{ position: "relative" }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Item name"
                      value={itemName}
                      onChangeText={(text) => {
                        setItemName(text);
                        setShowSuggestions(true);
                      }}
                    />

                    {showSuggestions &&
                      (loadingSuggestions || suggestions.length > 0) && (
                        <View
                          style={{
                            position: "absolute",
                            top: 44, // height of input + spacing
                            left: 0,
                            right: 0,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 6,
                            maxHeight: 200,
                            zIndex: 1000,
                            elevation: 5,
                            overflow: "hidden",
                          }}
                        >
                          {loadingSuggestions ? (
                            <View
                              style={{
                                padding: 20,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <ActivityIndicator size="small" color="#888" />
                            </View>
                          ) : (
                            <ScrollView
                              keyboardShouldPersistTaps="handled"
                              style={{ maxHeight: 200 }}
                              nestedScrollEnabled={true}
                            >
                              {suggestions.map((item, idx) => (
                                <TouchableOpacity
                                  key={idx}
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    setItemName(item);
                                    setShowSuggestions(false);
                                  }}
                                  style={{
                                    padding: 10,
                                    borderBottomColor: "#eee",
                                    borderBottomWidth: 1,
                                  }}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              ))}
                            </ScrollView>
                          )}
                        </View>
                      )}
                  </View>
                </View>
                {/* Sub-Category */}
                <View>
                  <Text style={styles.label}>Item Sub-Category</Text>

                  <View style={{ position: "relative" }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Sub-category"
                      value={subCategoryText}
                      onChangeText={(text) => {
                        setSubCategoryText(text);
                        setShowSubCategorySuggestions(true);
                      }}
                    />

                    {showSubCategorySuggestions &&
                      (loadingSubCategory ||
                        subCategorySuggestions.length > 0) && (
                        <View
                          style={{
                            position: "absolute",
                            top: 44,
                            left: 0,
                            right: 0,
                            backgroundColor: "#fff",
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 6,
                            maxHeight: 200,
                            zIndex: 1000,
                            elevation: 5,
                            overflow: "hidden",
                          }}
                        >
                          {loadingSubCategory ? (
                            <View
                              style={{
                                padding: 20,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <ActivityIndicator size="small" color="#888" />
                            </View>
                          ) : (
                            <ScrollView
                              keyboardShouldPersistTaps="handled"
                              nestedScrollEnabled={true}
                              style={{ maxHeight: 200 }}
                            >
                              {subCategorySuggestions.map((item, idx) => (
                                <TouchableOpacity
                                  key={idx}
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    setSubCategoryText(item);
                                    setShowSubCategorySuggestions(false);
                                  }}
                                  style={{
                                    padding: 10,
                                    borderBottomColor: "#eee",
                                    borderBottomWidth: 1,
                                  }}
                                >
                                  <Text>{item}</Text>
                                </TouchableOpacity>
                              ))}
                            </ScrollView>
                          )}
                        </View>
                      )}
                  </View>
                </View>
                {/* Country */}
                <Text style={styles.label}>Country</Text>
                <View style={styles.input}>
                  <RNPickerSelect
                    onValueChange={setCountry}
                    items={[
                      { label: "UAE", value: "uae" },
                      { label: "India", value: "india" },
                      { label: "USA", value: "usa" },
                    ]}
                    value={country}
                    placeholder={{ label: "Select Country", value: null }}
                    // style={pickerSelectStyles}
                    style={{
                      inputIOS: {
                        color: "#222",
                        fontSize: 15,
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        backgroundColor: "transparent",
                        borderWidth: 0,
                      },
                      inputAndroid: {
                        color: "#222",
                        fontSize: 15,
                        paddingVertical: 0,
                        paddingHorizontal: 0,
                        backgroundColor: "transparent",
                        borderWidth: 0,
                      },
                      placeholder: { color: "#888" },
                      iconContainer: { top: 16, right: 12 },
                    }}
                    Icon={() => (
                      <Icon name="arrow-drop-down" size={24} color="#888" />
                    )}
                  />
                </View>
                {/* Expiry */}
                <Text style={styles.label}>Expiry date</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.dropdown}
                >
                  <Text style={styles.dropdownText}>
                    {expiryDate
                      ? expiryDate.toDateString()
                      : "Select Expiry Date"}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={expiryDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      setShowDatePicker(false);
                      if (date) setExpiryDate(date);
                    }}
                  />
                )}
                {/* Price */}
                <Text style={styles.label}>Price/KG</Text>
                <View style={styles.priceRow}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="Enter price"
                    keyboardType="numeric"
                    value={priceAED}
                    onChangeText={setPriceAED}
                  />
                  <View style={styles.priceUnitBox}>
                    <Text style={styles.priceUnit}>AED/Kg</Text>
                  </View>
                </View>
                {/* Description */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={styles.descriptionInput}
                  multiline
                  placeholder="Discription"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
            </BackgroundWrapper>
          </ScrollView>
          <View style={styles.fixedButtonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleUpdateProduct}
            >
              <Text style={styles.addButtonText}>Update Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SellerEditProductScreen;
