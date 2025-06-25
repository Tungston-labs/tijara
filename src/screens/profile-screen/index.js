import { React, useState } from "react";
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
import Header from "../../componets/Header";
import images from "../../config/images";
import Button from "../../componets/Button";
import ModalButton from "../../componets/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {user} = useSelector((state) => state.user);
console.log("user",user)
  const dispatch=useDispatch();
  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
 const handleIconPress = () => {
    navigation.goBack();
  };
const handleLogout=async()=>{
  
    dispatch(logout)
    navigation.navigate("LoginScreenPassword")

}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header
          Title={"Profile"}
          icon={true}
          handleIconPress={handleIconPress}
          customStyle={styles.headerTitleContainer}
        />
      </View>

      <View style={styles.avatarContainer}>
        <Image source={{uri:user.profileImage}} style={styles.avatar} />
        {/* <Image source={images.profile} style={styles.avatar} /> */}
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Edit profile</Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Text style={styles.optionText}>Privacy and policy</Text>
          <Icon name="chevron-forward" size={20} />
        </TouchableOpacity>
      </View>
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
                // handleButtonPress={closeModal}
                customStyle={styles.logoutButtonStyle}
                customLabelStyle={styles.customLabelStyles}
                handleButtonPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
