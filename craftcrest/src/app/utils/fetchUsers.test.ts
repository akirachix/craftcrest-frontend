import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { fetchUsers } from './fetchUsers';

describe('fetchUsers', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and return users successfully', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    fetchMock.mockResponseOnce(JSON.stringify(mockUsers));
    const result = await fetchUsers();
    expect(fetch).toHaveBeenCalledWith('/api/users');
    expect(result).toEqual(mockUsers);
  });

  it('should throw an error when response is not ok', async () => {
    fetchMock.mockResponseOnce('Not Found', { status: 404, statusText: 'Not Found' });
    await expect(fetchUsers()).rejects.toThrow('Something went wrong, Not Found');
  });

  it('should throw a descriptive error on network failure', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));
    await expect(fetchUsers()).rejects.toThrow('Failed to fetch users: Network error');
  })

const mockFetchResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('getUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns empty array when response is empty', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse([], true))) as jest.Mock;

    const data = await fetchUsers();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/users');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, name: 'User1' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await fetchUsers();

    expect(data).toEqual(mockData);
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 404))) as jest.Mock;

    await expect(fetchUsers()).rejects.toThrow('Failed to fetch users: 404');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(fetchUsers()).rejects.toThrow("Couldn't fetch usersNetwork failure");
  });
});

})
 