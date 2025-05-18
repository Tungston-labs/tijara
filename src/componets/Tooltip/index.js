import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
import Tooltip from "react-native-walkthrough-tooltip";

import styles from "./styles";

const CustomToolTip = ({ message }) => {
  const [toolTipVisible, setToolTipVisiblity] = useState(false);
  return (
    <Tooltip
      isVisible={toolTipVisible}
      content={
        <View style={styles.card}>
          <Text style={styles.label}>{message}</Text>
        </View>
      }
      placement="top"
      onClose={() => setToolTipVisiblity(false)}
    >
      <TouchableOpacity
        onPress={() => setToolTipVisiblity(true)}
        style={styles.iconButton}
      >
        <Icon name="info-circle" color="red" size={15} />
      </TouchableOpacity>
    </Tooltip>
  );
};
export default CustomToolTip;

CustomToolTip.propTypes = {
  message: PropTypes.string.isRequired,
};
