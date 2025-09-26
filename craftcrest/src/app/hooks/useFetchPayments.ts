'use client';
import { useState, useEffect } from "react";
import { fetchPayments as fetchPaymentsAPI } from "../utils/fetchPayments";
import type { Payment } from "../utils/type";

const useFetchPayments = () => {
  const [payments, setPayments] = useState<Array<Payment>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
  const loadPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPaymentsAPI();  
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
