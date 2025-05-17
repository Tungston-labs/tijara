import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: height * 0.2,
    width: width * 0.55,
  },
});
export default styles;
