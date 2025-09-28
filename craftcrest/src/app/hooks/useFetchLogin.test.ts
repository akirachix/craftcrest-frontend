import { fetchLogin } from '../utils/fetchLogin';

const mockFetchResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('fetchLogin', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should handle success state', async () => {
    const mockData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;
    const result = await fetchLogin({ email: '', password: '' });
    expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('should handle error state', async () => {
    const errorData = { error: 'Failed to fetch login credentials: 404' };
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(errorData, false, 404))) as jest.Mock;
    await expect(fetchLogin({ email: '', password: '' })).rejects.toThrow(
      'Failed to fetch login credentials: 404'
    );
  });

  it('should handle network failure error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;
    await expect(fetchLogin({ email: '', password: '' })).rejects.toThrow('Network failure');
  });
});