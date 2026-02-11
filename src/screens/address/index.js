import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Modal,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import {
  getAddressesThunk,
  deleteAddressThunk,
} from "../../redux/slice/addressSlice";
import AddressModal from "../../componets/AddressModal";
import styles from "./styles";

const AddressScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const { addresses } = useSelector((state) => state.addresses);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(getAddressesThunk(token));
    }
  }, [token]);

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            dispatch(deleteAddressThunk({ token, addressId: id })),
        },
      ]
    );
  };

  const renderItem = useCallback(({ item }) => {
    const fullAddress = `${item.street}, ${item.area || ""}, ${
      item.city
    }, ${item.state} - ${item.postalCode}, ${item.country}`;

    return (
      <View style={styles.addressCard}>
        <View style={styles.headerRow}>
          <Text style={styles.label}>{item.label}</Text>

          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>DEFAULT</Text>
            </View>
          )}
        </View>

        <Text style={styles.name}>{item.fullName}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.addressText}>{fullAddress}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => {
              setSelectedAddress(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      
      {/* ✅ HEADER OUTSIDE FLATLIST */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerText}>My Addresses</Text>
      </View>

      {/* Address List */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={addresses}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => {
          setSelectedAddress(null);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <AddressModal
          close={() => setModalVisible(false)}
          address={selectedAddress}
        />
      </Modal>
    </View>
  );
};

export default AddressScreen;
