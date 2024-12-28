"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginHandler } from "../../../service/loginHandler";
import "../../../styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";


const LoginPage = () => {
  const router = useRouter();
  const [identifier, setIdentifier] = useState(""); // Chuyển từ email sang identifier
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState(""); // Trạng thái lỗi cho Identifier
  const [passwordError, setPasswordError] = useState(""); // Trạng thái lỗi cho Password
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State cho loader
  const t = useTranslations("Login");
  const handleLogin = async () => {
    // Reset lỗi mỗi khi bấm login
    setIdentifierError("");
    setPasswordError("");
    setIsLoading(true);

    try {
      const result = await loginHandler(identifier, password);
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.userName);
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("role", result.role.name);
      router.push("/admin/home"); // Điều hướng tới trang home
    } catch (error: any) {
      setIsLoading(false);
      // Kiểm tra lỗi và cập nhật vào các trạng thái lỗi tương ứng
      if (error.message === "Invalid account") {
        setIdentifierError("Identifier is incorrect Please check your input");
      } else if (error.message === "Invalid password") {
        setPasswordError("Password is incorrect Please try again"); 
      } else {
        setIdentifierError("Failed to login Please check your credentials");
      }
    }
  };

  useEffect(() => {
    document.title = "Login | xinchao";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-purple-900">
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {t("Login Page")}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}>
          <div className="mb-4">
            <label className="block text-gray-700">{t("Account")}:</label>
            <input
              type="text" // Sử dụng input kiểu text để người dùng có thể nhập bất kỳ loại thông tin nào
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                identifierError ? "border-red-500" : ""
              }`} // Thêm class 'border-red-500' khi có lỗi
              placeholder="Email, ARC, VNID, Passport, Phone"
              required
            />
            {identifierError && (
              <p className="text-red-500 text-sm mt-2">{t(identifierError)}</p> // Hiển thị lỗi cho identifier
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">{t("Password")}:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                passwordError ? "border-red-500" : ""
              }`} // Thêm class 'border-red-500' khi có lỗi
              required
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
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{t(passwordError)}</p> // Hiển thị lỗi cho password
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400">
            {t("Login")}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {t("Do not have an account?")}{" "}
          <Link href="/register" className="hover:text-red-400">
            {t("Register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
