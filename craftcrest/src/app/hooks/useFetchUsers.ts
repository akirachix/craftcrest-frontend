'use client';
import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUsers';
import { User } from '../utils/type';

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await fetchUsers();
        if (isMounted) setUsers(data);
      } catch (error) {
        if (isMounted) setError((error as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return { users, loading, error };
};

export default useFetchUsers;