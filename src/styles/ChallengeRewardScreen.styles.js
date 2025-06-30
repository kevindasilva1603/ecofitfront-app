import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
  paddingTop: 60, // au lieu de 30
  paddingBottom: 40,
  backgroundColor: '#f7faf5',
},
  header: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2e7d32',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  points: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4caf50',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pointsNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2e7d32',
  },
  subHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4caf50',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  challengeCard: {
    backgroundColor: '#dcedc8',
    borderRadius: 20,
    padding: 20,
    marginRight: 20,
    width: width * 0.75,
    shadowColor: '#2e7d32',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
  },
  challengeCompleted: {
    backgroundColor: '#a5d6a7',
  },
  challengeTitle: {
    fontWeight: '900',
    fontSize: 22,
    color: '#2e7d32',
    marginBottom: 8,
  },
  challengeDesc: {
    fontSize: 14,
    color: '#53753f',
    marginBottom: 15,
  },
  challengeGoal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#33691e',
  },
  challengePoints: {
    fontSize: 14,
    fontWeight: '700',
    color: '#558b2f',
    marginBottom: 15,
  },
  challengeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 15,
  },
  challengeButtonText: {
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#8bc34a',
  },
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#2e7d32',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    alignItems: 'center',
  },
  rewardLocked: {
    opacity: 0.5,
  },
  rewardName: {
    fontWeight: '900',
    fontSize: 20,
    color: '#2e7d32',
  },
  rewardDesc: {
    fontSize: 14,
    color: '#558b2f',
  },
  pointsRequired: {
    fontWeight: '800',
    marginTop: 8,
    fontSize: 14,
    color: '#4caf50',
  },
  redeemButton: {
    marginTop: 10,
    backgroundColor: '#4caf50',
    borderRadius: 15,
    paddingVertical: 8,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
    textAlign: 'center',
  },
  lockedText: {
    marginTop: 10,
    color: '#8bc34a',
    fontWeight: '700',
    fontStyle: 'italic',
  },
});

export default styles;
