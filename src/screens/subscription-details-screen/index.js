import React from "react";
import { View, Text, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import styles from "./styles";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import Button from "../../componets/Button";

const PlanCard = ({ title, price, benefits }) => (
  <View style={styles.card}>
    <Text style={styles.planTitle}>{title}</Text>
    <Text style={styles.planPrice}>{price}</Text>
    <Text style={styles.benefitsTitle}>Benefits of the {title}:</Text>
    {benefits.map((benefit, index) => (
      <View key={index} style={styles.benefitItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.benefitText}>{benefit}</Text>
      </View>
    ))}
  </View>
);

const SubscriptionDetailsScreen = ({ navigation }) => {
  const annualBenefits = [
    "Unlimited product listings",
    "Direct communication with buyers and sellers",
    "Upload multiple photos per product listing",
    "Exclusive market insights and price trends",
    "Gain visibility in premium search results",
    "Notifications for buyer requests matching your inventory",
  ];

  const monthlyBenefits = [
    "Up to 100 product listings",
    "Direct chat with buyers",
    "Upload 3 photos per listing",
    "Basic market trends",
    "Moderate visibility in search results",
    "Limited buyer request alerts",
  ];

  const handleButtonClick = () => {
    navigation.navigate("BuyerPaymentInfoScreen");
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper>
        <View style={styles.contentWrapper}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Header Title={"Welcome, John"} />

            <Text style={styles.subText}>
              Unlock premium features by subscribing to a{"\n"}monthly or annual
              plan
            </Text>

            <Swiper style={styles.wrapper} loop={false} showsPagination={false}>
              <View style={styles.slide}>
                <PlanCard
                  title="Annual Plan"
                  price="100 AED/year"
                  benefits={annualBenefits}
                />
              </View>
              <View style={styles.slide}>
                <PlanCard
                  title="Monthly Plan"
                  price="10 AED/month"
                  benefits={monthlyBenefits}
                />
              </View>
            </Swiper>

            <Text style={styles.bottomText}>
              Boost your business with unlimited product listings, direct
              buyer-seller chat, and multi-image product displays. Get premium
              visibility, instant buyer alerts, and exclusive market insights to
              close deals faster and grow smarter.
            </Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              label={"Subscribe Now"}
              handleButtonPress={handleButtonClick}
            />
          </View>
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default SubscriptionDetailsScreen;
