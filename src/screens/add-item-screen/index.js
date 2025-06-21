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
} from "react-native";
import styles from "./styles";
import Header from "../../componets/Header";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { pickerSelectStyles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { addSellerProductThunk } from "../../redux/slice/sellerProductSlice";
import debounce from "lodash/debounce";
import API from "../../services/config";
import { ActivityIndicator } from "react-native";

const SellerAddProductScreen = ({ navigation }) => {
  const [category, setCategory] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [expiryDate, setExpiryDate] = React.useState(null);
  const [images, setImages] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [priceAED, setPriceAED] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [subCategoryText, setSubCategoryText] = useState("");
  const [subCategorySuggestions, setSubCategorySuggestions] = useState([]);
  const [loadingSubCategory, setLoadingSubCategory] = useState(false);
  const [showSubCategorySuggestions, setShowSubCategorySuggestions] =
    useState(false);

  const fetchSuggestions = debounce(async (query) => {
    if (!query.trim()) return;

    setLoadingSuggestions(true);
    try {
      const res = await API.get(`/product/item-names?search=${query}`);
      console.log(res);
      setSuggestions(res.data.itemNames || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
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
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    } finally {
      setLoadingSubCategory(false);
    }
  }, 500);

  useEffect(() => {
    fetchSubCategories(subCategoryText);
  }, [subCategoryText, itemName]);

  const requestPermissions = async () => {
    try {
      if (Platform.Version >= 33) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);
        return permissions.every(
          (p) => granted[p] === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);
        return permissions.every(
          (p) => granted[p] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    } catch (error) {
      console.warn("Permission error:", error);
      return false;
    }
  };

  const handleSelectImages = async () => {
    const hasPermissions = await requestPermissions();

    if (!hasPermissions) {
      Alert.alert(
        "Permission Required",
        "Please grant storage permissions to select images."
      );
      return;
    }

    const options = {
      mediaType: "photo",
      quality: 0.7,
      selectionLimit: 10,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.error("ImagePicker Error: ", response.errorMessage);
        return;
      }
      const assets = response.assets || [];
      setImages(assets);
    });
  };
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token); // Adjust path to your auth slice

  const handleAddProduct = async () => {
    if (images.length < 1) {
      Alert.alert("Validation Error", "At least one image is required.");
      return;
    }

    const formData = new FormData();

    // Append images
    images.forEach((img, index) => {
      formData.append("images", {
        uri: img.uri,
        name: img.fileName || `image_${index}.jpg`,
        type: img.type || "image/jpeg",
      });
    });

    // Append other fields
    formData.append("itemCategory", category);
    formData.append("itemName", itemName);
    formData.append("itemSubCategory", subCategoryText);
    formData.append("country", country);
    formData.append("description", description);
    // formData.append("availableKg", 100);

    formData.append("priceAED", priceAED);
    formData.append("expiryDate", expiryDate?.toISOString());

    try {
      await dispatch(addSellerProductThunk({ token, formData })).unwrap();
      Alert.alert("Success", "Product added successfully");
      navigation.goBack();
    } catch (err) {
      console.error("Error adding product:", err);

      const message =
        typeof err === "string"
          ? err
          : typeof err?.message === "string"
          ? err.message
          : "Failed to add product";

      Alert.alert("Error", message);
    }
  };

  const renderImagePreview = () => (
    <View style={styles.horizontalImageScrollContainer}>
      <ScrollView>
        <View style={styles.horizontalImageRow}>
          {images.map((image, i) => (
            <View key={i} style={styles.imagePreviewBox}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
        >
          <BackgroundWrapper>
            <Header Title="Add new item" />

            <Text style={styles.minImageText}>*Min 4 Image</Text>
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handleSelectImages}
            >
              <Text style={styles.uploadText}>+ Upload image</Text>
            </TouchableOpacity>

            {renderImagePreview()}

            <View style={styles.formSection}>
              <Text style={styles.label}>Item Category</Text>
              <View style={styles.input}>
                <RNPickerSelect
                  onValueChange={setCategory}
                  items={[
                    { label: "Fruits", value: "fruits" },
                    { label: "Vegetables", value: "vegetables" },
                    { label: "Dairy", value: "dairy" },
                  ]}
                  placeholder={{ label: "Item Category", value: null }}
                  value={category}
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

              {/* <Text style={styles.label}>Item name</Text>
            <TextInput
              style={styles.input}
              placeholder="Item name"
              value={itemName}
              onChangeText={setItemName}
            /> */}

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

              <Text style={styles.label}>Country</Text>
              <View style={styles.input}>
                <RNPickerSelect
                  onValueChange={setCountry}
                  items={[
                    { label: "UAE", value: "uae" },
                    { label: "India", value: "india" },
                    { label: "USA", value: "usa" },
                  ]}
                  placeholder={{ label: "Select Country", value: null }}
                  value={country}
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
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setExpiryDate(date);
                  }}
                />
              )}

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

              <Text style={styles.label}>Discription</Text>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Discription"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
              />
            </View>

            {/* <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddProduct}
            >
              <Text style={styles.addButtonText}>Add item</Text>
            </TouchableOpacity>
          </View> */}
          </BackgroundWrapper>
        </ScrollView>
        <View style={styles.fixedButtonRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <Text style={styles.addButtonText}>Add item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SellerAddProductScreen;
