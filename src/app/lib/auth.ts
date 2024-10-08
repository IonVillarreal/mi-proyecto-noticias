import axios from 'axios';

interface LoginResponse {
    token: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
            username,
            password
        });
        return response.data.token;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
