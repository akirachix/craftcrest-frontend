'use client';
import { useEffect, useState } from "react";
import { fetchPayments } from "../utils/fetchPayments";
import type { Payment } from "../utils/type";

export const useFetchPayments = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [paymentsError, setPaymentsError] = useState<Error | null>(null);
  const [payments, setPayments] = useState<Array<Payment>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPayments();  
      setPayments(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return { payments, loading, error };
};

export default useFetchPayments;
