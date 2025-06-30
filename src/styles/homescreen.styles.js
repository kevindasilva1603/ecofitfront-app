import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2fdf4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
  },
  email: {
    fontWeight: '900',
  },
  pointsPanel: {
    backgroundColor: '#d0efdc',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  pointsText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#388e3c',
    fontWeight: '600',
  },
  pointsNumber: {
    fontWeight: '900',
    fontSize: 20,
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 10,
  },
  activitiesList: {
    flexGrow: 0,
  },
  buttonRow: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  runButton: {
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#66bb6a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  runButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default styles;
