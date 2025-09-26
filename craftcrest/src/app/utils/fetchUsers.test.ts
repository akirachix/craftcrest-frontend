import { getUsers } from './fetchUsers';

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

    const data = await getUsers();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/users');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, name: 'User1' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await getUsers();

    expect(data).toEqual(mockData);
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 404))) as jest.Mock;

    await expect(getUsers()).rejects.toThrow('Failed to fetch users: 404');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(getUsers()).rejects.toThrow("Couldn't fetch usersNetwork failure");
  });
});
