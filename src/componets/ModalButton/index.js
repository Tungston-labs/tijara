import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";

const ModalButton = ({
  label,
  handleButtonPress,
  customStyle,
  showToolTip,
  toolTipMessage,
  disabled,
  customLabelStyle,
  icon,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled ? true : false}
      onPress={() => handleButtonPress()}
      style={[styles.button, customStyle]}
    >
      <Text style={[styles.label, customLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};
export default ModalButton;

ModalButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleButtonPress: PropTypes.func,
};
