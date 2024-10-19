// src/app/api/login/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();

  // Kiểm tra nếu identifier hoặc password không có giá trị
  if (!identifier || !password) {
    return NextResponse.json(
      { message: "Vui lòng nhập tài khoản và mật khẩu." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: identifier, // Có thể sử dụng email, arc, vnId, passport, phone
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Đăng nhập không thành công" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
