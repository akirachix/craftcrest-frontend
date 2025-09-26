import { useState, useEffect } from "react";
import { fetchRatings } from "../utils/fetchRatings";
import type { Rating } from "../utils/type";

export const useRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    setLoading(true);
    fetchRatings()
      .then((data) => setRatings(data))
      .catch((error) => setError(error as Error))
      .finally(() => setLoading(false));
  }, []);
  return { ratings, loading, error };
};

