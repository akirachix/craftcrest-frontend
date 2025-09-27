import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchUsers from '../hooks/useFetchUsers';
import * as fetchUsersModule from '../utils/fetchUsers';


const mockedFetchUsers = fetchUsersModule.fetchUsers as jest.Mock;

jest.mock('../utils/fetchUsers');

describe('useFetchUsers hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show loading state initially', () => {
    const { result } = renderHook(() => useFetchUsers());
    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle successful fetch of users', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    mockedFetchUsers.mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
  });

  it('should handle error in fetchUsers', async () => {
    const errorMessage = 'Failed to load users';
    mockedFetchUsers.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });
});
