import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#f0f4f2',
  },

  profileHeader: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#e8f5e9',
    padding: 24,
    borderRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#c8e6c9',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2e7d32',
  },
  imc: {
    fontSize: 16,
    color: '#388e3c',
    marginTop: 6,
  },

  section: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2e7d32',
  },
  input: {
    backgroundColor: '#e0f2f1',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 14,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },

  textValue: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4e7d48',
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badge: {
    backgroundColor: '#c8e6c9',
    color: '#1b5e20',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    fontWeight: '600',
    marginRight: 10,
    marginBottom: 10,
  },

  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
});

export default styles;
