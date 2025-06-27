// styles/homescreen.styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 60,
    marginBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
  },
  email: {
    color: '#558b2f',
  },
  pointsPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a5d6a7',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 28,
    shadowColor: '#4caf50',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  pointsText: {
    color: '#2e7d32',
    fontSize: 18,
    marginLeft: 14,
    flex: 1,
    fontWeight: '600',
  },
  pointsNumber: {
    fontWeight: '900',
    fontSize: 22,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
    color: '#4a7c3b',
  },
  activitiesList: {
    marginBottom: 10,
  },
  runButton: {
    position: 'absolute',
    bottom: 80,
    left: 24,
    right: 24,
    flexDirection: 'row',
    backgroundColor: '#66bb6a',
    paddingVertical: 18,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#438839',
    shadowOpacity: 0.45,
    shadowRadius: 12,
  },
  runButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 20,
    marginLeft: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#388e3c',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    shadowColor: '#2a5d22',
    shadowOpacity: 0.5,
    shadowRadius: 14,
  },
});

export default styles;
