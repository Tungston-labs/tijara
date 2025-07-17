import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backArrow: {
    marginTop: 50,
    marginLeft: 16,
  },
//   header: {
//     fontSize: 0,
//     fontWeight: 'bold',
//     alignSelf: 'center',
//     justifyContent:'center',
//     alignItems:"center",
//     color: '#4CAF50',
//     marginVertical: 10,
//   },
  headerContainer: {
  backgroundColor: '#B3DB48', 
  paddingTop: 50,
  paddingBottom: 12,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
},
headerText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
  position: 'absolute',
  left: 0,
  marginTop: 50,
    marginLeft: 16,
  right: 0,
  textAlign: 'center',
},

  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
    color: '#333',
  },
  bullet: {
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  paragraphBold: {
  fontSize: 14,
  fontWeight: 'bold',
  marginBottom: 8,
},
label: {
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 8,
}

});

export default styles;

