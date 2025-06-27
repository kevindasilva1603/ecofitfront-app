// styles/historyScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f8f5',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2e7d32',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#daf0cb',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#00000015',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  type: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    color: '#4caf50',
  },
});

export default styles;
