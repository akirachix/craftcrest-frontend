'use client';
import { useState, useEffect } from "react";
import { fetchOrders as fetchOrdersAPI } from "../utils/fetchOrders";
import type { Order } from "../utils/type";
const useFetchOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrdersAPI();
      setOrders(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);
  return { orders, loading, error };
};
export default useFetchOrders;
