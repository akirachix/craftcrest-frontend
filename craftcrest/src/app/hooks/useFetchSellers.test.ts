import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useSellers } from './useFetchSellers';

jest.mock('../utils/fetchSellers');
import { fetchSellers as mockFetchSellers } from '../utils/fetchSellers';

describe('useSellers hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle empty state', async () => {
    (mockFetchSellers as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useSellers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.sellers).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockData = [{ id: 1, name: "John Doe", rating: 4.5 }];
    (mockFetchSellers as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => useSellers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.sellers).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('fetch error');
    (mockFetchSellers as jest.Mock).mockRejectedValue(mockError);
    const { result } = renderHook(() => useSellers());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.sellers).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });
});