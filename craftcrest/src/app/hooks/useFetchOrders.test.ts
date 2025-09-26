import { renderHook, waitFor } from '@testing-library/react';
import useFetchOrders from './useFetchOrders';

jest.mock('../utils/fetchOrders');
import { getOrders } from '../utils/fetchOrders';

const mockGetOrders = getOrders as jest.MockedFunction<typeof getOrders>;

describe('useFetchOrders hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    mockGetOrders.mockReturnValue(new Promise(() => {})); 
    const { result } = renderHook(() => useFetchOrders());

    expect(result.current.loading).toBe(true);
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('Should handle success state', async () => {
    const orders = [
      { id: 1, product: 'Product 1', quantity: 2 },
      { id: 2, product: 'Product 2', quantity: 1 },
    ];
    mockGetOrders.mockResolvedValue(orders);
    const { result } = renderHook(() => useFetchOrders());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.orders).toEqual(orders);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty orders', async () => {
    mockGetOrders.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchOrders());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch');
    mockGetOrders.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchOrders());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
