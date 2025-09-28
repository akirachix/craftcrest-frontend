import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchOrders from '../hooks/useFetchOrders';
import * as fetchOrdersModule from '../utils/fetchOrders';

jest.mock('../utils/fetchOrders');

const mockedFetchOrders = fetchOrdersModule.fetchOrders as jest.MockedFunction<typeof fetchOrdersModule.fetchOrders>;

describe('useFetchOrders hook', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should have loading true initially', () => {
    const { result } = renderHook(() => useFetchOrders());
    expect(result.current.loading).toBe(true);
    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockOrders = [{ id: 1, item: 'Item1' }, { id: 2, item: 'Item2' }];
    mockedFetchOrders.mockResolvedValue(mockOrders);

    const { result } = renderHook(() => useFetchOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual(mockOrders);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const errorMessage = "Couldn't fetch ordersNetwork failure";
    mockedFetchOrders.mockRejectedValue(new Error('Network failure'));

    const { result } = renderHook(() => useFetchOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toEqual([]);
    expect(result.current.error).toContain('Network failure');
  });
});
