import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    padding: '1%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  label: {
    color: '#223263',
    fontSize: 0.017 * height,
    fontFamily: 'Montserrat-Regular',
  },
  iconButton: {
    marginLeft: width * 0.01,
  },
});

export default styles;
