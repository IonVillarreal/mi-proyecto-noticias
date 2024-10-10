
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface News {
    id?: number;
    title: string;
    description: string;
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
    },
});

export const fetchNews = async (): Promise<News[]> => {
    const response = await api.get('/news');
    return response.data;
};

export const addNews = async (news: Omit<News, 'id'>): Promise<News> => {
    const response = await api.post('/news', news);
    return response.data;
};

export const updateNews = async (news: News): Promise<News> => {
    const response = await api.put(`/news/${news.id}`, news);
    return response.data;
};

export const deleteNews = async (id: number): Promise<void> => {
    await api.delete(`/news/${id}`);
};
