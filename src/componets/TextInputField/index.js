import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";

import styles from "./styles";

const TextInputField = ({
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
    <View>
      <Text style={styles.subText}>{placeholder}</Text>
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
    </View>
  );
};

export default TextInputField;
