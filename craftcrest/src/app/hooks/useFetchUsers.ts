'use client';
import { useState, useEffect } from "react";
import { getUsers as apiGetUsers } from "../utils/fetchUsers";
import type { User } from "../utils/type";

const useFetchUsers = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetUsers();
      setUsers(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
