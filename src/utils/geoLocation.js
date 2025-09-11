import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location for registration.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; 
  }
};

export const getCurrentLocation = async () => {
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    throw new Error('Location permission not granted');
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        console.warn('Cached location unavailable, trying fresh fetch:', error);

        Geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (err) => reject(err.message),
          {
            enableHighAccuracy: true,
            timeout: 7000,  
            maximumAge: 0,   
          }
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000, 
      }
    );
  });
};
