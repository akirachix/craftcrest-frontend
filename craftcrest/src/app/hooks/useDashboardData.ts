'use client'
import { useState, useEffect } from 'react';
import useFetchPayments from './useFetchPayments';
import useFetchOrders from './useFetchOrders';
import useFetchUsers from './useFetchUsers';
import useFetchInventory from './useFetchInventory';
import useFetchRatings from './useFetchRatings';
import type { Payment, Order, User, Product, Rating } from '../utils/type';

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  verifiedSellers: number;
  salesTrends: Array<{
    month: string;
    value: number;
  }>;
  sellerVerification: {
    verified: number;
    unverified: number;
    verificationRate: number;
  };
  productCategories: Array<{
    name: string;
    percentage: number;
  }>;
  performanceStats: {
    rejectionRate: number;
    paidOrders: number;
    averageRating: number;
    fulfillmentRate: number;
  };
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { payments, loading: paymentsLoading, error: paymentsError } = useFetchPayments();
  const { orders, loading: ordersLoading, error: ordersError } = useFetchOrders();
  const { users, loading: usersLoading, error: usersError } = useFetchUsers();
  const { inventory, loading: inventoryLoading, error: inventoryError } = useFetchInventory();
  const { ratings, loading: ratingsLoading, error: ratingsError } = useFetchRatings();

  useEffect(() => {
    const allLoading = paymentsLoading || ordersLoading || usersLoading || inventoryLoading || ratingsLoading;
    const anyError = paymentsError || ordersError || usersError || inventoryError || ratingsError;

    if (!allLoading) {
      try {
        if (anyError) {
          setError(anyError);
          setLoading(false);
          return;
        }
        const totalSales = payments.reduce((amount: number, payment: Payment) => amount + parseFloat(payment.amount), 0);
        const totalOrders = orders.length;
        const verifiedSellers = users.filter(user => user.user_type === 'artisan' && user.otp_verified).length;
        const salesByMonth = orders.reduce((acc, order) => {
          const month = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short' });
          acc[month] = (acc[month] || 0) + Number(order.total_amount);
          return acc;
        }, {} as { [key: string]: number });
        
        const salesTrends = Object.entries(salesByMonth).map(([month, value]) => ({
          month,
          value: Math.round(value)
        }));

        const totalSellers = users.filter(user => user.user_type === 'artisan').length;
        const verified = verifiedSellers;
        const unverified = totalSellers - verified;
        const verificationRate = totalSellers > 0 ? Math.round((verified / totalSellers) * 100 * 10) / 10 : 0;

        const categoryCount = inventory.reduce((acc, product) => {
          const category = product.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number });

        const totalProducts = inventory.length;
        const productCategories = Object.entries(categoryCount).map(([name, count]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          percentage: totalProducts > 0 ? Math.round((count / totalProducts) * 100) : 0
        }));

        const rejectedOrders = orders.filter(order => order.status === 'rejected').length;
        const rejectionRate = totalOrders > 0 ? Math.round((rejectedOrders / totalOrders) * 100 * 10) / 10 : 0;

        const paidOrders = orders.filter(order => order.payment_status === 'paid').length;

        const averageRating = ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + (rating.rating || 0), 0) / ratings.length
          : 0;

        const fulfilledOrders = orders.filter(order => order.delivery_confirmed).length;
        const fulfillmentRate = totalOrders > 0 ? Math.round((fulfilledOrders / totalOrders) * 100 * 10) / 10 : 0;

        const transformedData: DashboardStats = {
          totalSales,
          totalOrders,
          verifiedSellers,
          salesTrends,
          sellerVerification: {
            verified,
            unverified,
            verificationRate
          },
          productCategories,
          performanceStats: {
            rejectionRate,
            paidOrders,
            averageRating: Math.round(averageRating * 10) / 10,
            fulfillmentRate
          }
        };

        setData(transformedData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
  }, [payments, orders, users, inventory, ratings, paymentsLoading, ordersLoading, usersLoading, inventoryLoading, ratingsLoading, paymentsError, ordersError, usersError, inventoryError, ratingsError]);

  return { data, loading, error };
};