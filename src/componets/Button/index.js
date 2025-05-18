import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";
//import ToolTip from '../Tooltip';
import styles from "./styles";

const Button = ({
  label,
  handleButtonPress,
  customStyle,
  showToolTip,
  toolTipMessage,
  disabled,
  icon,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled ? true : false}
      onPress={() => handleButtonPress()}
      style={[styles.button, customStyle]}
    >
      <Text style={styles.label}>{label}</Text>
      {/* {showToolTip && <ToolTip message={toolTipMessage} />} */}
      {icon && <Icon name="chevron-forward" size={20} color="#fff" />}
    </TouchableOpacity>
  );
};
export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleButtonPress: PropTypes.func,
};
