
import { auth } from '../security/auth';

// export const IMG_URL = "http://localhost:8080/api/v1/images";
// export const BASE_URL = "http://localhost:8080";


export const IMG_URL = "https://www.xcserver.site/api/v1/images";
export const BASE_URL = "https://www.xcserver.site";
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


