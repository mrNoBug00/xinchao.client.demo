
// import { apiPath } from '../utils/apiPath';

// interface LoginResponse {
//   token: string;
//   expiresIn: number;
//   userId: string;
//   role: {
//     id: number;
//     name: string;
//     description: string;
//   };
//   userName: string;
// }

// export async function loginHandler(email: string, password: string): Promise<LoginResponse> {
//   const apiUrl = apiPath.login; // Lấy API URL từ file apiPath.ts

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
      
//     });

//     if (!response.ok) {
//       throw new Error('Failed to login');
//     }

//     const data: LoginResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// }

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
  const apiUrl = apiPath.login; // Lấy API URL từ file apiPath.ts

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }), // Gửi identifier thay vì email
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
