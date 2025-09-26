import { useState, useEffect } from "react";
import { fetchSellers } from "../utils/fetchSellers";
import type { Seller } from "../utils/type";

export const useSellers = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    setLoading(true);
    fetchSellers()
      .then((data) => setSellers(data))
      .catch((error) => setError(error as Error))
      .finally(() => setLoading(false));
  }, []);
  return { sellers, loading, error };
};

