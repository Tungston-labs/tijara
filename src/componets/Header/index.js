import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({
  handleIconPress,
  icon,
  editIcon,
  Title,
  Subtitle,
  handleEditIconPress,
  customStyle,
  deleteIcon,
  handleDeletePress,
}) => {
  const insets = useSafeAreaInsets(); 

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top }, 
        customStyle,
      ]}
    >
      <View style={styles.rowContainer}>
        <View style={styles.iconStyle}>
          {icon && (
            <TouchableOpacity onPress={handleIconPress}>
              <Icon name="chevron-back" size={28} color="#000000" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textStyle}>
            {Title && <Text style={styles.titleStyle}>{Title}</Text>}
            {Subtitle && <Text style={styles.titleStyle}>{Subtitle}</Text>}
          </View>
        </View>
        <View style={styles.editIconContainerStyle}>
          {editIcon && (
            <TouchableOpacity onPress={handleEditIconPress}>
              <View style={styles.rowContainer}>
                <Icon name="pencil-sharp" size={18} color="#000000" />
                <Text style={styles.editText}>Edit</Text>
              </View>
            </TouchableOpacity>
          )}
          {deleteIcon && (
            <TouchableOpacity
              style={{ alignItems: "center" ,marginTop:-35 }}
              onPress={handleDeletePress}
            >
              <View
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  borderRadius: 999,
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name="trash-outline" size={20} color="red" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

Header.propTypes = {
  Title: PropTypes.string.isRequired,
  handleIconPress: PropTypes.func,
};
