import { View, TextInput, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/slice/searchSlice";

// const SearchBar = ({
//   onChangeText,

//   value,
//   ...props
// }) => {
  // const [text, setText] = useState(value || "");

  // const handleTextChange = (newText) => {
  //   setText(newText);
  //   if (onChangeText) {
  //     onChangeText(newText);
  //   }
  // };
const SearchBar = (props) => {
   const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const handleTextChange = (newText) => {
    dispatch(setSearchQuery(newText));
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
              value={query}
              {...props}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
