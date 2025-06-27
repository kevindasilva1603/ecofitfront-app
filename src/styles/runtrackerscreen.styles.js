// styles/runtrackerscreen.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faf5',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2e7d32',
    marginBottom: 20,
  },
  map: {
    width: '90%',
    height: 250,
    borderRadius: 20,
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 40,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#4caf50',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#6a8a5b',
    marginTop: 4,
  },
  buttonWrapper: {
    marginBottom: 30,
  },
  actionButton: {
    borderRadius: 70,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  stopButton: {
    backgroundColor: '#d9534f',
  },
  motivation: {
    fontSize: 16,
    color: '#558b2f',
    fontWeight: '600',
  },
});

export default styles;
