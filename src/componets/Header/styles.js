import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.15,
    width: width * 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  iconStyle: {
    paddingTop: 35,
    paddingLeft: 10,
  },
});
export default styles;
