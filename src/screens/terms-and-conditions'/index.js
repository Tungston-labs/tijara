import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={28} color="#000000" />{" "}
          </TouchableOpacity>
          <Text style={styles.headerText}>Terms & Conditions</Text>
        </View>
      

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Thijara Terms & Conditions</Text>

        <Text style={styles.sectionTitle}>A. Welcome to Thijara</Text>
        <Text style={styles.paragraph}>
          Welcome to Thijara Ventures Private Limited. Our Platform includes the
          website (thijara.in) and mobile apps (Google Play and App Store). By
          using our Platform and placing orders, you agree to these Terms. If
          you don’t agree, please exit the Platform now.
        </Text>
        <Text style={styles.paragraph}>
          Why we do this: These Terms establish expectations, protect both
          parties, and ensure clear communication from day one.
        </Text>

        <Text style={styles.sectionTitle}>B. Consent & Transparency</Text>
        <Text style={styles.bullet}>
           Agreement by use: Simply using our Platform means you agree to
          follow these Terms.
        </Text>
        <Text style={styles.bullet}>
           Active consent: We use a checkbox during checkout/registration to
          ensure you knowingly agree—aligning with "clickwrap" best practices.
        </Text>

        <Text style={styles.sectionTitle}>
          1. Clear Definitions for Easy Understanding
        </Text>
        <Text style={styles.bullet}>
           Account – Your personal login to place Orders
        </Text>
        <Text style={styles.bullet}>
           Platform – Website + Mobile App where you shop
        </Text>
        <Text style={styles.bullet}>
           Product – Items you buy, e.g., fruits and vegetables
        </Text>
        <Text style={styles.bullet}> Order – Your confirmed purchase</Text>
        <Text style={styles.bullet}>
           User Content – Reviews, photos, comments you upload
        </Text>
        <Text style={styles.bullet}>
           Thijara Content – Our branding, images, descriptions
        </Text>
        <Text style={styles.bullet}>
           Privacy, Refund, and Shipping Policies – Linked separately but
          referenced here
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility & Account Safety</Text>
        <Text style={styles.bullet}>
           Must be 18+, with accurate registration info.
        </Text>
        <Text style={styles.bullet}> Account responsibility:</Text>
        <Text style={styles.subBullet}>◦ Keep your password secure.</Text>
        <Text style={styles.subBullet}>
          ◦ Inform us of any unauthorized use.
        </Text>
        <Text style={styles.subBullet}>
          ◦ You’re responsible for all activity on your Account.
        </Text>
        <Text style={styles.bullet}> We may:</Text>
        <Text style={styles.subBullet}>
          ◦ Modify or deactivate your Account as needed, with notice.
        </Text>

        <Text style={styles.sectionTitle}>3. Orders, Prices & Payments</Text>
        <Text style={styles.bullet}>
          1. Order acceptance: Subject to availability—we may cancel or refuse
          any Order.
        </Text>
        <Text style={styles.bullet}>2. Pricing & Payment:</Text>
        <Text style={styles.subBullet}>
          ◦ Final price is displayed in INR at checkout.
        </Text>
        <Text style={styles.subBullet}>
          ◦ We support credit/debit cards, net‑banking, UPI, wallets.
        </Text>
        <Text style={styles.subBullet}>
          ◦ Payment is charged only upon Order confirmation.
        </Text>
        <Text style={styles.bullet}>3. Delivery:</Text>
        <Text style={styles.subBullet}>
          ◦ We aim to meet your selected time slot.
        </Text>
        <Text style={styles.subBullet}>
          ◦ External delays (weather, traffic, etc.) are beyond our
          control—thank you for your understanding.
        </Text>

        <Text style={styles.note}>
          Why this matters: clarity builds trust and reduces disputes
        </Text>

        <Text style={styles.sectionTitle}>
          5. Community Guidelines & Acceptable Use
        </Text>
        <Text style={styles.bullet}>
           Don’t break laws or post offensive content
        </Text>
        <Text style={styles.bullet}>
           Don’t hinder other users or tamper with our systems
        </Text>
        <Text style={styles.paragraph}>
          Violations may result in Account suspension or termination—without
          prior notice.
        </Text>

        <Text style={styles.sectionTitle}>
          6. Protecting Intellectual Property
        </Text>
        <Text style={styles.paragraph}>
          All logos, designs, software, text—they’re our property or licensed.
          Do not copy, distribute, or use these without our written consent.
        </Text>

        <Text style={styles.sectionTitle}>
          7. Warranty, Disclaimer & Liability
        </Text>
        <Text style={styles.bullet}>
           As‑is service: No warranties on Products or Platform.
        </Text>
        <Text style={styles.bullet}>
           Liability capped: Max refund equals what you paid.
        </Text>
        <Text style={styles.bullet}> No liability for indirect losses.</Text>
        <Text style={styles.note}>
          This limited liability protects both parties and upholds fairness.
        </Text>

        <Text style={styles.sectionTitle}>8. Your Promises (Indemnity)</Text>
        <Text style={styles.paragraph}>
          You agree to defend and compensate Thijara for any losses or legal
          issues if you misuse the Platform or violate these Terms.
        </Text>

        <Text style={styles.sectionTitle}>
          9. Modifications & Platform Availability
        </Text>
        <Text style={styles.bullet}>
           We may update or discontinue features anytime, with notice.
        </Text>
        <Text style={styles.bullet}>
           Suspension/termination for policy violations.
        </Text>
        <Text style={styles.bullet}>
           Surviving clauses: Indemnity, liability limits, and dispute
          resolution stay active even after termination.
        </Text>

        <Text style={styles.sectionTitle}>10. Disputes & Governing Law</Text>
        <Text style={styles.bullet}> Governed by Indian law.</Text>
        <Text style={styles.bullet}>
           Jurisdiction: Courts of Kochi, Kerala.
        </Text>

        <Text style={styles.sectionTitle}>11. Privacy & Data Security</Text>
        <Text style={styles.bullet}>
           See our Privacy Policy for full data handling details.
        </Text>
        <Text style={styles.bullet}>
           We comply with Indian privacy laws and never sell your data.
        </Text>

        <Text style={styles.sectionTitle}>12. Keeping You Updated</Text>
        <Text style={styles.bullet}>
           Term updates notified via email or in-app alerts.
        </Text>
        <Text style={styles.bullet}>
           Continued use = acceptance of latest terms.
        </Text>

        <Text style={styles.sectionTitle}>13. Contact Us Anytime</Text>
        <Text style={styles.bullet}> Email: support@thijara.in</Text>
        <Text style={styles.bullet}> Phone: [Insert phone number]</Text>
        <Text style={styles.bullet}>
           Address: [Insert full address, Kochi, Kerala]
        </Text>
        <Text style={styles.paragraph}>
          Accessible support boosts user confidence.
        </Text>

        <Text style={styles.sectionTitle}>14. Visibility & Ease of Access</Text>
        <Text style={styles.bullet}>
           Terms are linked in the footer, registration, and checkout screens
          for discoverability.
        </Text>
        <Text style={styles.bullet}>
           We use a checkbox before purchase to confirm user agreement.
        </Text>

        <Text style={styles.thankYou}>
          Thank you for choosing Thijara—your go-to destination for fresh,
          top-quality produce delivered right to your door.
        </Text>
        <Text style={styles.paragraph}>
          ● Clear and fair policies: From ordering and delivery to returns and
          data privacy.
        </Text>
        <Text style={styles.paragraph}>
          ● Your protection is our priority: These Terms are designed to empower
          you.
        </Text>
        <Text style={styles.paragraph}>
          ● Built on integrity: Trust through transparency and accessible
          support.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;
