'use client';
import { useState } from 'react';
import { fetchLogin } from '../utils/fetchLogin';

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: Credentials): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLogin(credentials);
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
