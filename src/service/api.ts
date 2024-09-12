
import { auth } from '../security/auth';

export const IMG_URL = "https://xcserver.site:443/api/v1/images";
export const BASE_URL = "https://xcserver.site:443";

interface FetchOptions extends RequestInit {
    headers?: HeadersInit;
}

export const fetchData = async (url: string, options: FetchOptions = {}): Promise<any> => {
    const headers = {
        ...options.headers,
        ...auth.getAuthHeaders(),
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return response.json();
};


