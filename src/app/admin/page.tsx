'use client'

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

interface News {
    id: number;
    title: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchNews = async (): Promise<News[]> => {
    const response = await axios.get(`${API_URL}/news`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return response.data;
};

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const { data: news, isLoading, error } = useQuery<News[], Error>({
        queryKey: ['news'],
        queryFn: fetchNews,
    });

    const addNews = async () => {
        console.log('Agregar noticia');
    };

    const updateNews = async (id: number) => {
        console.log('Actualizar noticia', id);
    };

    const deleteNews = async (id: number) => {
        console.log('Eliminar noticia', id);
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error: {error.message}</Alert>;

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Bienvenido, {user?.username}!
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Gestión de Noticias
                </Typography>
                <Button variant="contained" color="primary" onClick={addNews} sx={{ mb: 2 }}>
                    Agregar Noticia
                </Button>
                <List>
                    {news?.map((item) => (
                        <ListItem key={item.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
                            <ListItemText primary={item.title} />
                            <Button onClick={() => updateNews(item.id)} color="info" sx={{ mr: 1 }}>Actualizar</Button>
                            <Button onClick={() => deleteNews(item.id)} color="error">Eliminar</Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default Dashboard;
