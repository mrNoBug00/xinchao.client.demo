'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginHandler } from '../../service/loginHandler';
import '../../styles/globals.css'


import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
      const result = await loginHandler(email, password);
      localStorage.setItem('token', result.token);
      localStorage.setItem("username", result.userName);
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('role', result.role.name)
      router.push('/pages/home');
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  useEffect(() => {
    document.title = "Login | xinchao";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
