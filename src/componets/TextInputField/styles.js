import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 16,
    color: '#999',
    marginLeft: 5,
  },
  container: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    width: '90%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 40,
  },
});
export default styles;
