import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useOrders } from './useFetchOrders';

jest.mock('../utils/fetchOrders');
import { fetchOrders as mockFetchOrders } from '../utils/fetchOrders';

describe('useOrders hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle empty state', async () => {
    (mockFetchOrders as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockData = [{ id: 1, item: 'item1' }];
    (mockFetchOrders as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.orders).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('fetch error');
    (mockFetchOrders as jest.Mock).mockRejectedValue(mockError);
    const { result } = renderHook(() => useOrders());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });
});