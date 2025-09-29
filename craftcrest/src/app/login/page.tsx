'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import useLogin from '../hooks/useFetchLogin';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccessMessage(null);
  };
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const { email, password } = formData;
    if (!email.trim() || !password) {
      setSuccessMessage(null);
      return;
    }
    const result = await login({ email, password });
    if (result?.token) {
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } else {
      setSuccessMessage(null);
    }
  };
  const handleButtonClick = () => {
    if (!loading) {
      handleSubmit();
    }
  };
  return (
    <div className="flex h-screen w-screen bg-white">
      <div className="w-1/2 relative overflow-hidden">
        <Image
          src={'/images/ side-image.png'}
          alt="side shape"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full absolute"
        />
        <Image
          src={'/images/craft -logo.png'}
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="w-100 relative lg:w-[290px] xl:w-[390] m-50 xl:ml-[90px] lg:ml-[100px] "
        />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-[#FFF9F5]">
        <div className="max-w-md w-full bg-white rounded-lg p-12 space-y-6 shadow-[0_4px_15px_rgba(93,7,13,0.6)] box-border">
          <h2 className="text-3xl font-bold text-[#5D070D] text-center mb-6">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D070D] focus:outline-none transition text-black"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5D070D] focus:outline-none transition text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {successMessage && <p className="text-green-600 text-sm text-center">{successMessage}</p>}
            <div className="mt-6">
              <button
                type="submit"
                onClick={handleButtonClick}
                disabled={loading}
                className={`w-full px-3 py-3 text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D070D] transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5D070D] text-white hover:bg-[#7A0B14]'
                  }`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}