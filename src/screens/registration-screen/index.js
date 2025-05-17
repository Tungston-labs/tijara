import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import Button from '../../componets/Button';

const RegistrationScreen = ({navigation}) => {
  const handleClick = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.textStyle}>index</Text>
      </View>
      <Button
        customStyle={styles.buttonStyle}
        label={'signup'}
        handleButtonPress={handleClick}
      />
    </View>
  );
};

export default RegistrationScreen;
