"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginHandler } from "../../../service/loginHandler";
import "../../../styles/globals.css";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await loginHandler(email, password);
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.userName);
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("role", result.role.name);
      router.push("/pages/home");
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  useEffect(() => {
    document.title = "Login | xinchao";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-gray-500">
              <Image
                src={showPassword ? "/eye-slash.svg" : "/eye.svg"}
                alt={showPassword ? "Hide Password" : "Show Password"}
                width={20}
                height={20}
                
              />
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400">
            Login
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center text-gray-600">
          Do not have an account?{" "}
          <Link href="/register" className="hover:text-red-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
