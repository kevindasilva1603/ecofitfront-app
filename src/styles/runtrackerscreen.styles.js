import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8f5',
  },
  map: {
    flex: 1,
    width: '100%',
    height: height * 0.6,
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  motivation: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: '600',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2e7d32',
  },
  statLabel: {
    fontSize: 14,
    color: '#7ea47e',
    marginTop: 4,
  },
  buttonWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  actionButton: {
    width: 100,
    height: 100,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  stopButton: {
    backgroundColor: '#d32f2f',
  },
});

export default styles;
