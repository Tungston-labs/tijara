import { View, TextInput, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

const SearchBar = ({
  onChangeText,

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
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.iconStyle}>
            <TouchableOpacity>
              <Icon name="search-outline" size={25} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.textInput}>
            <TextInput
              onChangeText={handleTextChange}
              value={text}
              {...props}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
