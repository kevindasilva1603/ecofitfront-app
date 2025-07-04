import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

const getApiUrl = () => {
  if (Updates.manifest2) {
    // Expo SDK 49+
    const host = Updates.manifest2.debuggerHost?.split(':').shift();
    if (host) return `http://${host}:3000`;
  } else if (Constants.expoConfig) {
    // Expo SDK 49+ fallback
    const host = Constants.expoConfig.extra?.debuggerHost?.split(':').shift();
    if (host) return `http://${host}:3000`;
  }
  // Fallback pour dev local
  //return 'http:/10.2.104.204:3000';
  return 'http:/192.168.1.2:3000';
};

const API_URL = getApiUrl();

export default API_URL;
