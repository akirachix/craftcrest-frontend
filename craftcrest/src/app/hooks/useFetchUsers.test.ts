import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchUsers from './useFetchUsers';
import * as fetchUsersModule from '../utils/fetchUsers';

jest.mock('../utils/fetchUsers');

const mockedFetchUsers = fetchUsersModule.fetchUsers as jest.MockedFunction<typeof fetchUsersModule.fetchUsers>;

describe('useFetchUsers hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have loading true initially', () => {
    const { result } = renderHook(() => useFetchUsers());
    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockUsers = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    mockedFetchUsers.mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    mockedFetchUsers.mockRejectedValue(new Error('Network failure'));

    const { result } = renderHook(() => useFetchUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toContain('Network failure');
  });
});