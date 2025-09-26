import { useState, useEffect } from "react";
import { fetchPayments } from "../utils/fetchPayments";
import type { Payment } from "../utils/type";

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    setLoading(true);
    fetchPayments()
      .then((data) => setPayments(data))
      .catch((error) => setError(error as Error))
      .finally(() => setLoading(false));
  }, []);
  return { payments, loading, error };
};
