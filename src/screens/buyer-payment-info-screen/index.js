import { React, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import BackgroundWrapper from "../../componets/BackgroundWrapper";
import Header from "../../componets/Header";
import TextInputField from "../../componets/TextInputField";
import Button from "../../componets/Button";
import DatePicker from "react-native-date-picker";
import ModalButton from "../../componets/ModalButton";

const BuyerPaymentInfoScreen = ({ navigation }) => {
  const [plan, setPlan] = useState(null);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = () => {
    navigation.goBack();
  };

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDateConfirm = (selectedDate) => {
    setOpenDatePicker(false);
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear().toString().slice(-2);
    setExpiryDate(`${month < 10 ? "0" + month : month}/${year}`);
    setDate(selectedDate);
  };

  const handleDateSelect = () => {
    setOpenDatePicker(true);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackgroundWrapper>
        <View style={styles.wrapperContainer}>
          <Header
            Title={"Payment Details"}
            icon={true}
            handleIconPress={handleIconPress}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Select plan</Text>
          <DropDownPicker
            open={open}
            value={plan}
            items={[
              { label: "Annual plan", value: "annual" },
              { label: "Monthly plan", value: "monthly" },
            ]}
            setOpen={setOpen}
            setValue={setPlan}
            placeholder="Annual plan"
            style={styles.dropdown}
            textStyle={styles.dropdownText}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholderStyle={styles.dropdownPlaceholder}
          />

          <Text style={styles.sectionTitle}>Manager Name</Text>

          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === "card" && styles.paymentMethodButtonActive,
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <Text
                style={[
                  styles.paymentMethodText,
                  paymentMethod === "card" && styles.paymentMethodTextActive,
                ]}
              >
                Debit / Credit card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                paymentMethod === "hand" && styles.paymentMethodButtonActive,
              ]}
              onPress={() => setPaymentMethod("hand")}
            >
              <Text
                style={[
                  styles.paymentMethodText,
                  paymentMethod === "hand" && styles.paymentMethodTextActive,
                ]}
              >
                In hand
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Enter Payment Detail</Text>

          <Text style={styles.inputLabel}>Card number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter card number"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TouchableOpacity onPress={handleDateSelect}>
                <TextInput
                  style={styles.halfInput}
                  placeholder="MM/YY"
                  value={expiryDate}
                  editable={false}
                  placeholderTextColor="#999"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.halfInputContainer}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.halfInput}
                placeholder="CVV"
                keyboardType="numeric"
                secureTextEntry={true}
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button label={"Confirm"} handleButtonPress={handleButtonClick} />
        </View>

        <DatePicker
          modal
          //   open={openDatePicker}
          date={date}
          mode="date"
          minimumDate={new Date()}
          onConfirm={handleDateConfirm}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Please confirm that all entered details {"\n"}are accurate
                before proceeding.
              </Text>
              <View style={styles.rowContainer}>
                <ModalButton
                  label={"Edit"}
                  handleButtonPress={closeModal}
                  customStyle={styles.editButtonStyle}
                  customLabelStyle={styles.label}
                />
                <ModalButton label={"Confirm"} handleButtonPress={closeModal} />
              </View>
            </View>
          </View>
        </Modal>
      </BackgroundWrapper>
    </ScrollView>
  );
};
export default BuyerPaymentInfoScreen;
