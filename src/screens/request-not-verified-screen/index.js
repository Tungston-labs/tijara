import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import { checkStatusThunk } from "../../redux/slice/authSlice";

const RequestNotVerifiedScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { user, token, verificationStatus, loading } = useSelector(
    (state) => state.user
  );

  const handleButtonClick = async () => {
    console.log("User before navigating:", user);
    console.log("Token before navigating:", token);

    try {
      if (user?._id) {
        const res = await dispatch(checkStatusThunk(user._id)).unwrap();

        if (res.status === "approved") {
          navigation.replace("RequestSuccessScreen", {
            user,
            token,
          });
        } else {
          Alert.alert(
            "Not Verified",
            "Your account is still under review. Please try again later."
          );
        }
      } else {
        Alert.alert("Error", "Unable to check status. Please try again.");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      Alert.alert("Error", "Failed to check verification status.");
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../resources/images/DeclainedUser.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Not Verified!</Text>
            <Text style={styles.subtitle}>Your account is under review.</Text>
            <Text style={styles.subtitle}>Please check back later.</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={loading ? "Checking..." : "Check Status"}
            handleButtonPress={handleButtonClick}
            disabled={loading}
          />
        </View>
      </BackgroundWrapper>
    </View>
  );
};
export default RequestNotVerifiedScreen;
