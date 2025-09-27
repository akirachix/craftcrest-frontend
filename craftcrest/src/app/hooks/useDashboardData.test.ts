import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardData } from './useDashboardData';
import * as paymentsHook from './useFetchPayments';
import * as ordersHook from './useFetchOrders';
import * as usersHook from './useFetchUsers';
import * as inventoryHook from './useFetchInventory';
import * as ratingsHook from './useFetchRatings';

import type {
  Payment,
  Order,
  User,
  Product,
  Rating,
} from '../utils/type';

jest.mock('./useFetchPayments');
jest.mock('./useFetchOrders');
jest.mock('./useFetchUsers');
jest.mock('./useFetchInventory');
jest.mock('./useFetchRatings');

type HookOverrides = {
  payments?: Payment[];
  paymentsLoading?: boolean;
  paymentsError?: string | null;
  orders?: Order[];
  ordersLoading?: boolean;
  ordersError?: string | null;
  users?: User[];
  usersLoading?: boolean;
  usersError?: string | null;
  inventory?: Product[];
  inventoryLoading?: boolean;
  inventoryError?: string | null;
  ratings?: Rating[];
  ratingsLoading?: boolean;
  ratingsError?: string | null;
};

describe('useDashboardData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function mockAllHooks(overrides: HookOverrides) {
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
      payments: [
        {
          id: 1,
          artisan: "1",
          amount: "100",
          order: "1",
          status: "Released",
          date: "2025-09-26T00:00:00Z",
          transaction_code: "TXN1",
          paid_at: "2025-09-26T01:00:00Z",
        },
        {
          id: 2,
          artisan: "2",
          amount: "50",
          order: "2",
          status: "Held",
          date: "2025-09-26T00:00:00Z",
          transaction_code: "TXN2",
          paid_at: "2025-09-26T02:00:00Z",
        },
      ],
      orders: [
        {
          id: 1,
          order_type: 'purchase',
          quantity: 1,
          total_amount: "100",
          status: 'completed',
          created_at: '2025-09-26T00:00:00Z',
          updated_at: '2025-09-26T01:00:00Z',
          rejection_reason: null,
          delivery_confirmed: true,
          rejection_date: null,
          payment_status: 'paid',
          cart: [],
          buyer: 3,
          artisan: 1,
        },
        {
          id: 2,
          order_type: 'purchase',
          quantity: 1,
          total_amount: "50",
          status: 'rejected',
          created_at: '2025-09-26T00:00:00Z',
          updated_at: '2025-09-26T01:00:00Z',
          rejection_reason: "Out of stock",
          delivery_confirmed: false,
          rejection_date: '2025-09-26T01:00:00Z',
          payment_status: 'unpaid',
          cart: [],
          buyer: 4,
          artisan: 2,
        },
      ],
      users: [
        {
          id: 1,
          user_type: 'artisan',
          otp_verified: true,
        },
        {
          id: 2,
          user_type: 'artisan',
          otp_verified: false,
        },
        {
          id: 3,
          user_type: 'buyer',
          otp_verified: true,
        },
      ],
      inventory: [
        {
          id: "1",
          product_name: "Vase",
          description: "A beautiful vase",
          category: "pottery",
          price: 40,
          stock_quantity: 10,
          image: null,
          is_customizable: false,
        },
        {
          id: "2",
          product_name: "Scarf",
          description: "A warm scarf",
          category: "weaving",
          price: 20,
          stock_quantity: 15,
          image: null,
          is_customizable: true,
        },
        {
          id: "3",
          product_name: "Basket",
          description: "Handwoven basket",
          category: "basketry",
          price: 15,
          stock_quantity: 20,
          image: null,
          is_customizable: false,
        },
      ],
      ratings: [
        {
          id: 1,
          rating: 4,
        },
        {
          id: 2,
          rating: 2,
        },
      ],
    });

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.data?.totalSales).toBe(150);
    expect(result.current.data?.totalOrders).toBe(2);
    expect(result.current.data?.verifiedSellers).toBe(1);
    expect(result.current.data?.productCategories.length).toBe(3);
  });

  it('sets error when sub-hook errors', async () => {
    mockAllHooks({
      paymentsError: 'Payment API failed',
    });

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe('Payment API failed');
    expect(result.current.data).toBeNull();
  });

  it('shows loading when sub-hook is loading', () => {
    mockAllHooks({
      paymentsLoading: true,
    });

    const { result } = renderHook(() => useDashboardData());

    expect(result.current.loading).toBe(true);
  });
});