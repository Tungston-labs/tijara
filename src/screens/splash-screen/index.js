import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import BackgroundWrapper from '../../componets/BackgroundWrapper';

import styles from './styles';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    handleNavigation();
    return () => {
      clearTimeout(navigationTimeout);
    };
  }, []);

  const handleNavigation = () => {
    const routeKey = 'CreateAccountScreen';

    navigationTimeout = setTimeout(() => {
      navigation.replace(routeKey);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <BackgroundWrapper customStyle={styles.wrapperContainer}>
        <Image
          source={require('../../resources/images/tijara-logo.png')}
          style={styles.ImageContainer}
          resizeMode="contain"
        />
      </BackgroundWrapper>
    </View>
  );
};

export default SplashScreen;
