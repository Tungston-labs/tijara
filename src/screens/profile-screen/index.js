import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import Button from "../../componets/Button";
import ModalButton from "../../componets/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import API from "../../services/config";
import { Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { setUser } from "../../redux/slice/authSlice";
const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await API.delete("/user/delete-account");

      dispatch(logout());

      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreenPassword" }],
      });
    } catch (error) {
      console.log("Delete account error:", error?.response?.data || error.message);

      Alert.alert(
        "Delete Failed",
        error?.response?.data?.message || "Unable to delete account. Please try again."
      );
    }
  };

  const handleEditProfileImage = async () => {
    const options = {
      mediaType: "photo",
      quality: 0.7,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) return;

      if (response.errorCode) {
        Alert.alert("Error", response.errorMessage);
        return;
      }

      const image = response.assets[0];
      console.log("IMAGE:", image);
      const formData = new FormData();
      formData.append("profileImage", {
        uri: image.uri,
        type: image.type,
        name: image.fileName || "profile.jpg",
      });

      try {
        const res = await API.put("/user/update-profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        Alert.alert("Success", "Profile image updated!");

       dispatch(setUser(res.data.user));
      } catch (error) {
        console.log("Upload error:", error?.response?.data || error.message);
        Alert.alert("Error", "Failed to update profile image");
      }
    });
  };
  const handleButtonClick = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleLogout = async () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreenPassword" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
       <TouchableOpacity onPress={handleEditProfileImage}>
  <Image
    source={{
      uri: (user?.profileImage || user?.image || "") + `?t=${Date.now()}`,
    }}
    style={styles.avatar}
  />

  <Text style={{ textAlign: "center", marginTop: 5, color: "#000" }}>
    Edit Photo
  </Text>
</TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("TermsAndConditions")}
        >
          <Text style={styles.optionText}>Terms And Conditions</Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          <Text style={styles.optionText}>Privacy and policy</Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("AddressScreen")}
        >
          <Text style={styles.optionText}>My addresses</Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={[styles.optionText, { color: "red" }]}>
            Delete Account
          </Text>
          <Icon name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>


      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleText}>Delete Account?</Text>
            <Text style={styles.modalText}>
              This will permanently delete your account and all associated data.
              This action cannot be undone.
            </Text>

            <View style={styles.buttonRowContainer}>
              <ModalButton
                label="Cancel"
                handleButtonPress={() => setDeleteModalVisible(false)}
                customStyle={styles.cancelButtonStyle}
                customLabelStyle={styles.cancelCustomLabelStyles}
              />
              <ModalButton
                label="Delete"
                handleButtonPress={handleDeleteAccount}
                customStyle={styles.logoutButtonStyle}
                customLabelStyle={styles.customLabelStyles}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button
          label={"Log Out"}
          icon={true}
          customStyle={styles.buttonStyle}
          customLabelStyle={styles.label}
          IconColor={"red"}
          handleButtonPress={handleButtonClick}
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleText}>Confirm log out ?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to log out ?
            </Text>
            <View style={styles.buttonRowContainer}>
              <ModalButton
                label={"Cancel"}
                handleButtonPress={closeModal}
                customStyle={styles.cancelButtonStyle}
                customLabelStyle={styles.cancelCustomLabelStyles}
              />
              <ModalButton
                label={"Log out"}
                handleButtonPress={handleLogout}
                customStyle={styles.logoutButtonStyle}
                customLabelStyle={styles.customLabelStyles}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
