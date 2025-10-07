import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import { checkStatusThunk } from "../../redux/slice/authSlice";
import Toast from "react-native-toast-message";

const RequestSentScreen = () => {
    const { user,loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation();
 
const handleButtonClick = async () => {
  try {
    console.log("Current user in state:", user); // Debug

    if (user?._id) {
      const response = await dispatch(checkStatusThunk(user._id)).unwrap();

      if (response.status === "approved") {
        navigation.replace("RequestSuccessScreen", { user: response });
      } else if (response.status === "rejected" || response.status === "pending") {
        navigation.replace("RequestNotVerifiedScreen");
        Toast.show({
          type: "info",
          text1: "Not Verified",
          text2: "Your account is still under review. Please try again later.",
        });
      }
    } else {
      console.log("No user ID available");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unable to check status. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Error checking status:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Failed to check verification status. Please try again.",
    });
  }
};


  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../resources/images/Tick@2.png")}
            style={styles.ImageContainer}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Thank you!</Text>
            <Text style={styles.subtitle}>
              Your account is under review and
            </Text>
            <Text style={styles.subtitle}>
              will be verified within 24 hours. Please
            </Text>
            <Text style={styles.subtitle}>check back later.</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            label={loading ? "Checking..." : "Submit For Verification"}
            handleButtonPress={handleButtonClick}
            disabled={loading}
          />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default RequestSentScreen;
