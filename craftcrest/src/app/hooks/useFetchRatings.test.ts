import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useRatings } from './useFetchRatings';

jest.mock('../utils/fetchRatings');
import { fetchRatings as mockFetchRatings } from '../utils/fetchRatings';

describe('useRatings hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle empty state', async () => {
    (mockFetchRatings as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useRatings());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.ratings).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockData = [{ id: 1, score: 5, comment: "Great!" }];
    (mockFetchRatings as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => useRatings());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.ratings).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('fetch error');
    (mockFetchRatings as jest.Mock).mockRejectedValue(mockError);
    const { result } = renderHook(() => useRatings());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.ratings).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });
});