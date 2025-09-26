import { useState, useEffect } from "react";
import { fetchOrders } from "../utils/fetchOrders";
import type { Order } from "../utils/type";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchOrders()
      .then((data) => setOrders(data))
      .catch((error) => setError(error as Error))
      .finally(() => setLoading(false));
  }, []);

  return { orders, loading, error };
};