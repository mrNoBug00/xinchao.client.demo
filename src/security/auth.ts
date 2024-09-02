
export const auth = {
    getToken: (): string | null => {
        return localStorage.getItem('token');
    },
    getAuthHeaders: (): HeadersInit => {
        const token = localStorage.getItem('token');
        return {
            Authorization: `Bearer ${token}`,
        };
    },
};
