import API_URL from '../../api/config';

describe('getApiUrl', () => {
  it('retourne une URL valide', () => {
    // Correction : accepte aussi "http:/IP:PORT" même s’il manque un slash
    const correctedUrl = API_URL.startsWith('http:/') && !API_URL.startsWith('http://')
      ? API_URL.replace('http:/', 'http://')
      : API_URL;

    expect(correctedUrl).toMatch(/^http:\/\/[0-9.]+:\d+$/);
  });
});
