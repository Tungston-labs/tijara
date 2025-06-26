import React, { useState, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./styles";

const TextInputField = ({
  placeholder,
  onChangeText,
  customStyle,
  value,
  icon,
  ...props
}) => {
  const [text, setText] = useState(value || "");

  useEffect(() => {
    setText(value || "");
  }, [value]);

  const handleTextChange = (newText) => {
    setText(newText);
    if (onChangeText) {
      onChangeText(newText);
    }
  };

  return (
    <View>
      <Text style={styles.subText}>{placeholder}</Text>

      <View style={[styles.container, { flexDirection: "row", alignItems: "center" }]}>
        <TextInput
          style={[styles.placeholder, { flex: 1 }, customStyle]}
          placeholder={placeholder}
          placeholderTextColor="#A9A9A9"
          onChangeText={handleTextChange}
          value={text}
          {...props}
        />
        {icon}
      </View>
    </View>
  );
};

export default TextInputField;
