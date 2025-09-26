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