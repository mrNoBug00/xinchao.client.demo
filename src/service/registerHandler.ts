import { apiPath } from '../utils/apiPath';

interface RegisterData {
  username: string;
  password: string;
  email: string;
  phone: string;
  vnId: string;
  arc: string;
  passport: string;
  address: string;
}

export async function registerHandler(data: RegisterData): Promise<void> {
  const apiUrl = apiPath.register;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to register');
    }
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}
