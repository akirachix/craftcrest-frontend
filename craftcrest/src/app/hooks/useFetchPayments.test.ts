import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { usePayments } from './useFetchPayments';

jest.mock('../utils/fetchPayments');
import { fetchPayments as mockFetchPayments } from '../utils/fetchPayments';

describe('usePayments hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle empty state', async () => {
    (mockFetchPayments as jest.Mock).mockResolvedValue([]);
    const { result } = renderHook(() => usePayments());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const mockData = [{ id: 1, amount: 100, status: "paid" }];
    (mockFetchPayments as jest.Mock).mockResolvedValue(mockData);
    const { result } = renderHook(() => usePayments());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.payments).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('fetch error');
    (mockFetchPayments as jest.Mock).mockRejectedValue(mockError);
    const { result } = renderHook(() => usePayments());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe(mockError);
  });
});