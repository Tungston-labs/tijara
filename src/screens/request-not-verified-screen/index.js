import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
// import { checkBuyerStatusThunk } from "../../redux/slice/buyerSlice";

const RequestNotVerifiedScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, verificationStatus, loading } = useSelector(
    (state) => state.buyer
  );

  const handleButtonClick = async () => {
    try {
      if (user?._id) {
        // await dispatch(checkBuyerStatusThunk(user._id)).unwrap();

        if (verificationStatus === "approved") {
          navigation.navigate("SubscriptionDetailsScreen");
        } else {
          Alert.alert(
            "Not Verified",
            "Your account is still under review. Please try again later."
          );
        }
      } else {
        console.log("No user ID available");
        Alert.alert("Error", "Unable to check status. Please try again later.");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      Alert.alert("Error", "Error checking status. Please try again.");
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
