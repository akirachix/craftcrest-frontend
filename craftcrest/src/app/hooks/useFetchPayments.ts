'use client';
import { useEffect, useState } from "react";
import { fetchPayments } from "../utils/fetchPayments";
import type { Payment } from "../utils/type";

export const useFetchPayments = () => {
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [paymentsError, setPaymentsError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoadingPayments(true);
    fetchPayments()
      .then((payment) => setPaymentList(payment))
      .catch((error) => setPaymentsError(error as Error))
      .finally(() => setIsLoadingPayments(false));
  }, []);

  return { paymentList, isLoadingPayments, paymentsError };
};