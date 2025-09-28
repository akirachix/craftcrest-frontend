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

  it('should reject with error message when response is not ok', async () => {
    fetchMock.mockResponseOnce('Not Found', { status: 404, statusText: 'Not Found' });

    try {
      await fetchUsers();
      throw new Error('fetchUsers did not reject');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Couldn't fetch usersSomething went wrong, 404");
      } else {
        throw e;
      }
    }
  });

  it('should reject with descriptive error message on network failure', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));

    try {
      await fetchUsers();
      throw new Error('fetchUsers did not reject');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toContain("Network error");
      } else {
        throw e;
      }
    }
  });
});

const mockFetchResponse = (data: unknown, ok = true, status = 200) => ({
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

  it('rejects with error message when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 404))) as jest.Mock;

    try {
      await fetchUsers();
      throw new Error('fetchUsers did not reject');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Couldn't fetch usersSomething went wrong, 404");
      } else {
        throw e;
      }
    }
  });

  it('rejects with error message when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    try {
      await fetchUsers();
      throw new Error('fetchUsers did not reject');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Couldn't fetch usersNetwork failure");
      } else {
        throw e;
      }
    }
  });
});