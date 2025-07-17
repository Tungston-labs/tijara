import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B3DB48', // Green shade like your screenshot
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
headerText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
  position: 'absolute',
  left: 0,
  right: 0,
  textAlign: 'center',
  marginTop: 50,
    marginLeft: 16,
},

  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
    color: '#333',
    fontFamily: 'Nunito-Bold',
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 6,
    marginLeft: 10,
    fontFamily: 'Nunito-Regular',
  },
  subBullet: {
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 20,
    marginBottom: 4,
    fontFamily: 'Nunito-Regular',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
    fontFamily: 'Nunito-Regular',
  },
  note: {
    fontStyle: 'italic',
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    fontFamily: 'Nunito-Regular',
  },
  thankYou: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
    fontFamily: 'Nunito-Bold',
  },
});

export default styles;
