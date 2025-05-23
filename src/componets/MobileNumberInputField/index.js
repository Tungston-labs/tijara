import React, { useState } from "react";
import { View, TextInput } from "react-native";

import styles from "./styles";

const MobileNumberInputField = ({
  placeholder,
  onChangeText,
  customStyle,
  value,
  ...props
}) => {
  const [text, setText] = useState(value || "");

  const handleTextChange = (newText) => {
    setText(newText);
    if (onChangeText) {
      onChangeText(newText);
    }
  };

  return (
    <View style={[styles.container, customStyle]}>
      <TextInput
        style={styles.placeholder}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        onChangeText={handleTextChange}
        value={text}
        {...props}
      />
    </View>
  );
};

export default MobileNumberInputField;
