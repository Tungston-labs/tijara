import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../componets/Button";
import { useSelector } from "react-redux";

const TradeLicenseStatusScreen = () => {
  const navigation = useNavigation();

  const status = useSelector((state) => state.user.user.tradeLicenseStatus);
  const role = useSelector((state) => state.user.role);
  const handleBtnPress = (nav) => {
    navigation.navigate(nav);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "rejected":
        return {
          title: "Not Verified!",
          icon: require("../../resources/images/status/not_verified.png"),
          subtitle:
            "We're sorry, but your license could not be verified at this time.Please review your details or contact support for assistance.",
          subtitle2: null,
          buttonText: null,
        };
      case "pending":
        return {
          title: "Thank you for your patience!",
          icon: require("../../resources/images/status/tick.png"),
          subtitle:
            "Your account is under review and will be verified within 24 hours.Please check back later.",
          subtitle2: null,
          buttonText: null,
        };
      case "expired":
        return {
          title: "Trade Licence Expired",
          icon: require("../../resources/images/status/warning.png"),
          subtitle:
            "Your account licence has expired. Please renew it to restore access and continue using our services without interruption.",
          subtitle2: null,
          buttonText: "Upload New License",
          nav: "UploadTradeLicenseScreen",
        };
      case "approved":
        return {
          title: "Congratulations!",
          icon: require("../../resources/images/status/user_tick.png"),
          subtitle:
            "Your Seller account has been successfully verified and activated.",
          subtitle2: "You're all set to start selling!",
          buttonText: "Get started",
          nav:"UserListItemScreen"
        };
      default:
        return {
          title: "Thank you!",
          icon: require("../../resources/images/status/tick.png"),
          subtitle:
            "Your account is under review and willBe verified within 24 hours. Please check back later. ",
          subtitle2: null,
          buttonText: "Go Back",
          nav:role==="buyer"?"BuyerHomeScreen":"SellerHomeScreen"
        };
    }
  };

  const statusContent = getStatusDisplay(status);

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.wrapperContainer}>
          <View style={styles.contentContainer}>
            <Image
              source={statusContent.icon}
              style={styles.ImageContainer}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{statusContent.title}</Text>
              <Text style={styles.subtitle}>{statusContent.subtitle}</Text>
              <Text style={styles.subtitle}>{statusContent.subtitle2}</Text>
            </View>
          </View>

          {statusContent.buttonText && (
            <View style={styles.buttonContainer}>
              <Button
                label={statusContent.buttonText}
                handleButtonPress={() => handleBtnPress(statusContent?.nav)}
              />
            </View>
          )}
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default TradeLicenseStatusScreen;
