import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Green Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={28} color="#000000" />{" "}
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy and Policy</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Thijara’s Trust-Centered Privacy Policy
        </Text>
        <Text style={styles.subtitle}>Hello and welcome to Thijara!</Text>
        <Text style={styles.paragraph}>
          Your privacy is our priority, and we’re committed to caring for your
          data with clarity and respect.
        </Text>

        {/* Sections */}
        <Text style={styles.sectionTitle}>1. What We Collect</Text>
        <Text style={styles.bullet}>
           Contact basics: name, email, phone, address
        </Text>
        <Text style={styles.bullet}>
           Purchase & payment details: order history, shipping data, invoices
        </Text>
        <Text style={styles.bullet}>
           App/website activity: cookie data, browsing behavior, language
          preferences
        </Text>
        <Text style={styles.bullet}>
           Your messages: customer support requests, surveys, feedback
        </Text>
        <Text style={styles.paragraph}>
          Everything we collect has a clear purpose—and no unnecessary extras.
        </Text>

        <Text style={styles.sectionTitle}>2. Why We Collect It</Text>
        <Text style={styles.bullet}>
           Process your orders seamlessly – from payment to delivery
        </Text>
        <Text style={styles.bullet}>
           Personalize your experience – tailored offers, product
          recommendations, relevant updates
        </Text>
        <Text style={styles.bullet}>
           Build better services – continuous improvements based on analytics
          and feedback
        </Text>
        <Text style={styles.bullet}>
           Protect you – detecting fraud and complying with legal obligations
        </Text>
        <Text style={styles.paragraph}>We never sell your data—ever.</Text>

        <Text style={styles.sectionTitle}>3. How We Protect & Share Data</Text>
        <Text style={styles.bullet}>
           Shared only with Thijara teams or trusted partners (e.g., payment
          gateways, delivery services)
        </Text>
        <Text style={styles.bullet}>
           Shared only if legally required—like in response to court orders
        </Text>
        <Text style={styles.paragraph}>
          We use robust security measures (encryption, firewalls, secure
          servers) and limit how long data is stored— only as long as needed,
          then it's safely deleted.
        </Text>

        <Text style={styles.sectionTitle}>4. Your Control, Your Right</Text>
        <Text style={styles.bullet}> View the data we hold</Text>
        <Text style={styles.bullet}> Edit or correct inaccuracies</Text>
        <Text style={styles.bullet}> Ask to delete data when legal</Text>
        <Text style={styles.bullet}> Opt out of marketing communications</Text>
        <Text style={styles.bullet}>
           Request your data or have it transferred
        </Text>
        <Text style={styles.paragraph}>
          Just contact our privacy team—we’ll guide you every step of the way.
        </Text>

        <Text style={styles.sectionTitle}>5. Cookies & Tracking</Text>
        <Text style={styles.bullet}> Keeping you logged in smoothly</Text>
        <Text style={styles.bullet}>
           Saving preferences like language and layout
        </Text>
        <Text style={styles.bullet}>
           Understanding site usage to improve features
        </Text>
        <Text style={styles.paragraph}>
          You can manage or disable cookies anytime—our setup puts you in
          control.
        </Text>

        <Text style={styles.sectionTitle}>6. Clear & Simple Language</Text>
        <Text style={styles.paragraph}>
          We use approachable, plain language—no complex legalese. Our aim is
          clarity, not obscuring details.
        </Text>

        <Text style={styles.sectionTitle}>7. Kids & Privacy</Text>
        <Text style={styles.paragraph}>
          We do not target children under 13. If you believe we’ve collected
          data from a minor, please let us know— we’ll remove it without delay.
        </Text>

        <Text style={styles.sectionTitle}>8. Policy Updates</Text>
        <Text style={styles.bullet}>
           Effective date at the top will always reflect the latest version
        </Text>
        <Text style={styles.bullet}>
           Key changes highlighted so you stay informed
        </Text>
        <Text style={styles.bullet}>
           We’ll notify you on our website—or by email for major changes
        </Text>
        <Text style={styles.paragraph}>
          We build trust by keeping you in the loop.
        </Text>

        <Text style={styles.sectionTitle}>9. International Data Transfers</Text>
        <Text style={styles.bullet}>
           We ensure legal safeguards like recognized contractual protections
        </Text>
        <Text style={styles.bullet}>
           We comply with global privacy laws (e.g., GDPR, CCPA)
        </Text>

        <Text style={styles.sectionTitle}>10. Privacy Built In</Text>
        <Text style={styles.paragraph}>
          Privacy isn't an afterthought—it’s embedded into every process and
          feature we develop. That’s our policy by design.
        </Text>

        <Text style={styles.sectionTitle}>11. Let’s Stay in Touch</Text>
        <Text style={styles.paragraph}>
          Got questions, concerns, or want to exercise your rights? We’re here
          for you
        </Text>

        <Text style={styles.paragraphBold}>Thijara Privacy Team</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.label}>Email:</Text> info@tungstonlabs.com
        </Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.paragraph}>+91 97783 77526</Text>
        <Text style={styles.paragraph}>+91 75610 49196</Text>
        <Text style={styles.paragraph}>+91 96337 01495</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.paragraph}>
          Tungston Labs, Ullampilly Building, 4th Floor,{"\n"}
          Seaport - Airport Rd, behind Olimugal Juma Masjid,{"\n"}
          Thrikkakara, Vazhakkala, Kakkanad, Kochi, Kerala 682030
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
