import { renderHook, waitFor } from '@testing-library/react';
import useFetchUsers from './useFetchUsers';

jest.mock('../utils/fetchUsers');
import { getUsers } from '../utils/fetchUsers';

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;

describe('useFetchUsers hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    mockGetUsers.mockReturnValue(new Promise(() => {})); 
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ];
    mockGetUsers.mockResolvedValue(users);
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual(users);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty users', async () => {
    mockGetUsers.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchUsers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch');
    mockGetUsers.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchUsers());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
