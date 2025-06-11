import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.2:3000'; // Ton IP locale

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      await AsyncStorage.removeItem('token');
      // Gestion possible : event global ou redirection vers login (à implémenter)
    }
    return Promise.reject(error);
  }
);

export default apiClient;
