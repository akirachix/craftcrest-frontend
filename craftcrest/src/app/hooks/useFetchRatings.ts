
'use client';
import { useState, useEffect } from "react";
import { fetchRatings as apiGetRatings } from "../utils/fetchRatings";
import type { Rating } from "../utils/type";

const useFetchRatings = () => {
  const [ratings, setRatings] = useState<Array<Rating>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRatings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetRatings();
      setRatings(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return { ratings, loading, error };
};

export default useFetchRatings;




