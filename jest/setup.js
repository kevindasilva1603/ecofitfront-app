jest.mock('expo-constants', () => ({
  default: {
    manifest: {},
    expoConfig: {},
    executionEnvironment: 'standalone',
  },
}));

jest.mock('expo-updates', () => ({
  default: {
    reloadAsync: jest.fn(),
    checkForUpdateAsync: jest.fn(),
    fetchUpdateAsync: jest.fn(),
    reload: jest.fn(),
  },
}));
// jest/setup.js
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
