import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const Header = ({handleIconPress, icon}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.iconStyle}>
          <TouchableOpacity onPress={() => handleIconPress()}>
            {/* <Text style={styles.label}>{label}</Text> */}
            {icon && <Icon name="chevron-back" size={28} color="#000000" />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

Header.propTypes = {
  label: PropTypes.string.isRequired,
  handleIconPress: PropTypes.func,
};
