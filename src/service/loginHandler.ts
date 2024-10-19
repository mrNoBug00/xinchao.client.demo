
import { apiPath } from "../utils/apiPath";

interface LoginResponse {
  token: string;
  expiresIn: number;
  userId: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
  userName: string;
}



export async function loginHandler(
  identifier: string,
  password: string
): Promise<LoginResponse> {
  const apiUrl = apiPath.login;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    // Kiểm tra phản hồi từ server
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung phản hồi lỗi từ server
      console.error("Error response data from server:", errorData);
      throw new Error(errorData.message || "Failed to login"); // Truyền message từ server nếu có
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw error; // Ném lại lỗi để xử lý phía ngoài
  }
}
