import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    color: 'red',
    backgroundColor: 'blue',
    fontSize: 50,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 50,
  },
  buttonStyle: {
    backgroundColor: 'red',
    borderRadius: width * 0.2,
    width: 0.4 * width,
    height: 0.055 * height,
    alignSelf: 'center',
    justifyContent: 'center',
    elevation: 5,
    flexDirection: 'row',
    marginTop: 20,
  },
});
export default styles;
