import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Button from "../../componets/Button";
import { checkBuyerStatusThunk } from "../../redux/slice/buyerSlice";

const RequestSentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, verificationStatus, loading } = useSelector(
    (state) => state.buyer
  );

  const handleButtonClick = async () => {
    try {
      if (user?._id) {
        await dispatch(checkBuyerStatusThunk(user._id)).unwrap();

        if (verificationStatus === "approved") {
          navigation.replace("RequestSuccessScreen");
        } else if (
          verificationStatus === "rejected" ||
          verificationStatus === "pending"
        ) {
          navigation.replace("RequestNotVerifiedScreen");
        }
      } else {
        console.log("No user ID available");
        alert("Unable to check status. Please try again later.");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      alert("Error checking status. Please try again.");
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
