import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// 👉 On crée un faux client axios avec le bon shape
const mockAxiosInstance = {
  get: jest.fn(),
  interceptors: {
    response: {
      use: jest.fn((success, error) => {
        // Stocke les handlers pour les tester plus tard
        mockAxiosInstance._errorHandler = error;
        return true;
      }),
    },
  },
};

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  removeItem: jest.fn(),
}));

beforeEach(() => {
  axios.create.mockReturnValue(mockAxiosInstance);
});

describe('apiClient', () => {
  it('devrait appeler la bonne URL en GET', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({ data: 'ok' });

    const apiClient = require('../../api/apiClient').default;

    const response = await apiClient.get('/test');
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test');
    expect(response.data).toBe('ok');
  });

  it('supprime le token en cas de 401 ou 403', async () => {
    require('../../api/apiClient'); // force la création avec les interceptors

    const error401 = { response: { status: 401 } };
    try {
      await mockAxiosInstance._errorHandler(error401);
    } catch (e) {
      // Ignoré volontairement
    }

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
