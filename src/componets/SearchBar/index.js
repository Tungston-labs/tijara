import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/slice/searchSlice";
import styles from "./styles";

const SearchBar = ({ ...props }) => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const handleTextChange = (newText) => {
    dispatch(setSearchQuery(newText));
  };

  const height = Platform.OS === "ios" ? 50 : 25; // higher on iOS, lower on Android
  const iconSize = Platform.OS === "ios" ? 40 : 25;

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.rowContainer}>
        <View style={[styles.boxContainer, { height }]}>
          <View style={styles.iconStyle}>
            <TouchableOpacity>
              <Icon name="search-outline" size={iconSize} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={[styles.textInput, { height }]}>
            <TextInput
              onChangeText={handleTextChange}
              value={query}
              style={{ height, paddingVertical: 0 }} // ensures input fills container
              {...props}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
