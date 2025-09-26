import { renderHook, waitFor } from '@testing-library/react';
import useFetchPayments from "./useFetchPayments";

import { fetchPayments } from '../utils/fetchPayments';

jest.mock('../utils/fetchPayments');

const mockGetPayments = fetchPayments as jest.MockedFunction<typeof fetchPayments>;

describe('useFetchPayments hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    // Return a promise that never resolves to simulate loading
    mockGetPayments.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFetchPayments());
    expect(result.current.loading).toBe(true);
  });

  it('should handle success state', async () => {
    const payments = [
      { id: 1, amount: 100, method: 'Mpesa' },
      { id: 2, amount: 50, method: 'Mpesa' },
    ];
    mockGetPayments.mockResolvedValue(payments);
    const { result } = renderHook(() => useFetchPayments());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual(payments);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty payments array', async () => {
    mockGetPayments.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchPayments());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch');
    mockGetPayments.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchPayments());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});

describe('usePayments hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    mockGetPayments.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFetchPayments());
    expect(result.current.loading).toBe(true);
  });

  it('should handle success state', async () => {
    const mockData = [
      { id: 1, amount: 100, status: "paid" },
    ];
    mockGetPayments.mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetchPayments());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty state', async () => {
    mockGetPayments.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchPayments());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('fetch error');
    mockGetPayments.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchPayments());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe(mockError.message || mockError);
  });
});
