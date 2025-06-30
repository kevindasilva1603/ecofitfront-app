// styles/statsscreen.styles.js
import { StyleSheet } from 'react-native';

const statsScreenStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f8f5',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2e7d32',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  statCard: {
    backgroundColor: '#daf0cb',
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 3,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#386635',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4caf50',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 12,
    marginTop: 16,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 16,
    marginBottom: 20,
  },
});

export default statsScreenStyles;
