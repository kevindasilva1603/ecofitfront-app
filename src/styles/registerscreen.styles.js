// styles/registerscreen.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 25,
    textAlign: 'center',
    color: '#388e3c',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#43a047',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  link: {
    color: '#1b5e20',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;
