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
  });
});
