'use client';
import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUsers';
import { User } from '../utils/type';

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;
