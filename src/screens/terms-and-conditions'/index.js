// /screens/TermsAndConditions/index.js

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Terms & Conditions</Text>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Tijara. By using this app, you agree to comply with and be bound by the following terms and conditions.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of the App</Text>
        <Text style={styles.paragraph}>
          You agree to use the app only for lawful purposes and in a way that does not infringe the rights of others.
        </Text>

        <Text style={styles.sectionTitle}>3. Account Responsibilities</Text>
        <Text style={styles.paragraph}>
          You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content included in this app is the property of Tijara or its licensors and is protected by copyright laws.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          Tijara is not liable for any indirect, incidental, or consequential damages resulting from the use of this app.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. Continued use of the app signifies your acceptance of the updated terms.
        </Text>

        <Text style={styles.paragraph}>
          For questions, please contact support@tijara.com.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;
