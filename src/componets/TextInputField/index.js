import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Feather";

const TextInputField = ({
  placeholder,
  onChangeText,
  customStyle,
  value,
  icon,
  countryCode,
  setCountryCode,
  ...props
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const countries = [
    { name: "India", code: "+91" },
    { name: "UAE", code: "+971" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Qatar", code: "+974" },
    { name: "Oman", code: "+968" },
    { name: "Kuwait", code: "+965" },
    { name: "Bahrain", code: "+973" },
  ];

  return (
    <View>
      <Text style={styles.subText}>{placeholder}</Text>

      <View
        style={[
          styles.container,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        {countryCode && setCountryCode && (
          <TouchableOpacity
            style={[styles.countryCodeContainer, styles.iconContainer]}
            onPress={() => setShowPicker(!showPicker)}
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Icon
              name="chevron-down"
              size={16}
              color="#000"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        )}

        <TextInput
          style={[styles.placeholder, { flex: 1 }, customStyle]}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          onChangeText={onChangeText}
          value={value}
          // keyboardType="phone-pad"
          {...props}
        />

        {icon}
      </View>

{showPicker && (
  <View style={[styles.modalContainer, { position: 'absolute', zIndex: 100, top: 80 }]}>
    {countries.map((item) => (
      <TouchableOpacity
        key={item.code}
        style={styles.modalItem}
        onPress={() => {
          setCountryCode(item.code);
          setShowPicker(false);
        }}
      >
        <Text style={styles.modalText}>{` (${item.code})`}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}

    </View>
  );
};

export default TextInputField;
