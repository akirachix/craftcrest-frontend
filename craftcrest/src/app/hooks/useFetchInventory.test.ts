import { renderHook, waitFor } from '@testing-library/react';
import useFetchInventory from './useFetchInventory';

jest.mock('../utils/fetchInventory');
import { getInventory } from '../utils/fetchInventory';

const mockGetInventory = getInventory as jest.MockedFunction<typeof getInventory>;

describe('useFetchInventory hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    mockGetInventory.mockReturnValue(new Promise(() => {})); 
    const { result } = renderHook(() => useFetchInventory());

    expect(result.current.loading).toBe(true);
    expect(result.current.inventory).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty inventory', async () => {
    mockGetInventory.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.inventory).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockData = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 20 },
    ];
    mockGetInventory.mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetchInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.inventory).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('fetch error');
    mockGetInventory.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchInventory());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.inventory).toEqual([]);
    expect(result.current.error).toBe('fetch error');
  });
});
