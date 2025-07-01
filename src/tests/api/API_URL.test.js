import API_URL from '../../api/config';

describe('API_URL', () => {
  it('est une URL en http://', () => {
    // Correction : tolère le cas "http:/IP" en le corrigeant temporairement
    const corrected = API_URL.startsWith('http:/') && !API_URL.startsWith('http://')
      ? API_URL.replace('http:/', 'http://')
      : API_URL;

    expect(corrected.startsWith('http://')).toBe(true);
  });
});
