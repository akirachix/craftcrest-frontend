'use client';
import { useState,useEffect} from "react";
import {getInventory } from "../utils/fetchInventory";
import type { Product } from "../utils/type";


const useFetchInventory = () => {
  const [inventory, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getInventory();
      setProducts(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return { inventory, loading, error };
};
export default useFetchInventory;