import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardData } from './useDashboardData';
import * as paymentsHook from './useFetchPayments';
import * as ordersHook from './useFetchOrders';
import * as usersHook from './useFetchUsers';
import * as inventoryHook from './useFetchInventory';
import * as ratingsHook from './useFetchRatings';

jest.mock('./useFetchPayments');
jest.mock('./useFetchOrders');
jest.mock('./useFetchUsers');
jest.mock('./useFetchInventory');
jest.mock('./useFetchRatings');

describe('useDashboardData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    function mockAllHooks(overrides: Partial<Record<string, any>>) {
        jest.spyOn(paymentsHook, 'default').mockReturnValue({
            payments: overrides.payments ?? [],
            loading: overrides.paymentsLoading ?? false,
            error: overrides.paymentsError ?? null,
        });
        jest.spyOn(ordersHook, 'default').mockReturnValue({
            orders: overrides.orders ?? [],
            loading: overrides.ordersLoading ?? false,
            error: overrides.ordersError ?? null,
        });
        jest.spyOn(usersHook, 'default').mockReturnValue({
            users: overrides.users ?? [],
            loading: overrides.usersLoading ?? false,
            error: overrides.usersError ?? null,
        });
        jest.spyOn(inventoryHook, 'default').mockReturnValue({
            inventory: overrides.inventory ?? [],
            loading: overrides.inventoryLoading ?? false,
            error: overrides.inventoryError ?? null,
        });
        jest.spyOn(ratingsHook, 'default').mockReturnValue({
            ratings: overrides.ratings ?? [],
            loading: overrides.ratingsLoading ?? false,
            error: overrides.ratingsError ?? null,
        });

    }

    it('returns correct dashboard data when all hooks succeed', async () => {
        mockAllHooks({
            payments: [{ amount: '100' }, { amount: '50' }],
            orders: [
                {
                    id: 1,
                    total_amount: '100',
                    created_at: '2025-09-26T00:00:00Z',
                    status: 'completed',
                    payment_status: 'paid',
                    delivery_confirmed: true,
                },
                {
                    id: 2,
                    total_amount: '50',
                    created_at: '2025-09-26T00:00:00Z',
                    status: 'rejected',
                    payment_status: 'unpaid',
                    delivery_confirmed: false,
                },
            ],
            users: [
                { user_type: 'artisan', otp_verified: true },
                { user_type: 'artisan', otp_verified: false },
                { user_type: 'buyer', otp_verified: true },
            ],
            inventory: [
                { category: 'electronics' },
                { category: 'clothing' },
                { category: 'electronics' },
            ],
            ratings: [{ rating: 4 }, { rating: 2 }],
        });

        const { result } = renderHook(() => useDashboardData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBeNull();
        expect(result.current.data?.totalSales).toBe(150);
        expect(result.current.data?.totalOrders).toBe(2);
        expect(result.current.data?.verifiedSellers).toBe(1);
        expect(result.current.data?.productCategories.length).toBe(2);
    });

    it('sets error when any sub-hook errors', async () => {
        mockAllHooks({
            paymentsError: 'Payment API failed',
        });

        const { result } = renderHook(() => useDashboardData());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe('Payment API failed');
        expect(result.current.data).toBeNull();
    });

    it('shows loading when any sub-hook is loading', () => {
        mockAllHooks({
            paymentsLoading: true,
        });

        const { result } = renderHook(() => useDashboardData());

        expect(result.current.loading).toBe(true);
    });
});
