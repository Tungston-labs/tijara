import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  wrapperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width * 0.4,
    height: height * 0.1,
  },
  textContainer: {
    marginTop: 60,
    width: width * 0.9,
  },

  title: {
    fontSize: 25,
    fontWeight: '500',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#6F6F6F',
  },
  inputContainer: {
    width: width * 0.9,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  placeholder: {
    fontSize: 16,
    color: '#999',
  },

  inputText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },

  buttonContainer: {
    width: width * 1,
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 10,
  },

  loginText: {
    color: '#000000',
  },
  loginLink: {
    color: '#94D82D',
    fontWeight: '600',
  },
});
export default styles;
