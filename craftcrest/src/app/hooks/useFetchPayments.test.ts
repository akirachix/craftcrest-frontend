<<<<<<< HEAD
import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useFetchPayments } from './useFetchPayments';
import { fetchPayments } from '../utils/fetchPayments';
import '@testing-library/jest-dom';

jest.mock('../utils/fetchPayments', () => ({
    fetchPayments: jest.fn(),
}));

const mockFetchPayments = fetchPayments as jest.Mock;

describe('useFetchPayments hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle loading state', () => {
        mockFetchPayments.mockImplementation(() => new Promise(() => { }));

        const { result } = renderHook(() => useFetchPayments());

        expect(result.current.isLoadingPayments).toBe(true);
        expect(result.current.paymentList).toEqual([]);
        expect(result.current.paymentsError).toBeNull();
    });

    it('should handle empty state', async () => {
        mockFetchPayments.mockResolvedValue([]);

        const { result } = renderHook(() => useFetchPayments());

        await waitFor(() => expect(result.current.isLoadingPayments).toBe(false));
        expect(result.current.paymentList).toEqual([]);
        expect(result.current.paymentsError).toBeNull();
    });

    it('should handle success state', async () => {
        const payments = [
            { id: 1, amount: 100, method: 'Mpesa' },
            { id: 2, amount: 50, method: 'Mpesa' },
        ];
        mockFetchPayments.mockResolvedValue(payments);
        const { result } = renderHook(() => useFetchPayments());
        expect(result.current.isLoadingPayments).toBe(true);
        await waitFor(() => expect(result.current.isLoadingPayments).toBe(false));
        expect(result.current.paymentList).toEqual(payments);
        expect(result.current.paymentsError).toBeNull();
    });

    it('should handle error state', async () => {
        const errorMessage = 'Failed to fetch payments';
        mockFetchPayments.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useFetchPayments());

        await waitFor(() => expect(result.current.isLoadingPayments).toBe(false));
        expect(result.current.paymentList).toEqual([]);
        expect(result.current.paymentsError).toEqual(new Error(errorMessage));
    });
});
=======
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
>>>>>>> develop
