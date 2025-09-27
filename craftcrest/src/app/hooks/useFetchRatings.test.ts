import { renderHook, waitFor } from '@testing-library/react';
import useFetchRatings from './useFetchRatings';

jest.mock('../utils/fetchRatings');
import { fetchRatings } from '../utils/fetchRatings';

const mockGetRatings = fetchRatings as jest.MockedFunction<typeof fetchRatings>;

describe('useFetchRatings hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    mockGetRatings.mockReturnValue(new Promise(() => {})); 
    const { result } = renderHook(() => useFetchRatings());

    expect(result.current.loading).toBe(true);
    expect(result.current.ratings).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success error', async () => {
    const ratings = [
      { id: 1, score: 5, comment: 'Excellent' },
      { id: 2, score: 3, comment: 'Average' },
    ];
    mockGetRatings.mockResolvedValue(ratings);
    const { result } = renderHook(() => useFetchRatings());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.ratings).toEqual(ratings);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty ratings', async () => {
    mockGetRatings.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchRatings());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.ratings).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch');
    mockGetRatings.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchRatings());

    expect(result.current.loading).toBe(true); 
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.ratings).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
