// src/app/login/page.tsx (hoặc component đăng nhập của bạn)

'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    if (response.ok) {
      // Chuyển hướng đến trang chính sau khi đăng nhập thành công
      router.push("/pages/home"); // Trang home
    } else {
      const errorData = await response.json();
      alert(errorData.message); // Hiển thị thông báo lỗi
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Tài khoản (email, arc, vnId, passport, phone)"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
      />
      <button type="submit">Đăng Nhập</button>
    </form>
  );
};

export default LoginPage;
