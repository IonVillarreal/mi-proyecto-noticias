'use client'

import React, {useEffect, useState} from 'react';
import {Container, Typography, Box, Button} from '@mui/material';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {addNews, deleteNews, fetchNews, updateNews} from './services/newsService';
import AddEditNewsDialog from './components/AddEditNewsDialog';
import DeleteNewsDialog from "@/app/admin/components/DeleteNewsDialog";

interface News {
    id: number;
    title: string;
    description: string;
}

const Dashboard: React.FC = () => {

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [deletingNewsId, setDeletingNewsId] = useState<number | null>(null);

    const queryClient = useQueryClient();

    const {data: news, isLoading} = useQuery({
        queryKey: ['news'],
        queryFn: fetchNews,
    });

    const addMutation = useMutation({
        mutationFn: addNews,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']}),
    });

    const updateMutation = useMutation({
        mutationFn: updateNews,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']}),
    });

    const deleteMutation = useMutation({
        mutationFn: deleteNews,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['news']}),
    });


    useEffect(() => {
        console.log(editingNews)
    }, [editingNews])

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'title', headerName: 'Título', width: 300},
        {field: 'description', headerName: 'Contenido', width: 400},
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <>
                    <Button onClick={() => {
                        setIsAddDialogOpen(true)
                        setEditingNews(params.row as News);
                    }}>Editar</Button>
                    <Button onClick={() => setDeletingNewsId(params.row.id as number)}>Eliminar</Button>
                </>
            ),
        },
    ];

    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard de Noticias
                </Typography>
                <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
                    Agregar Noticia
                </Button>
                <DataGrid
                    rows={news ?? []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {pageSize: 5, page: 0},
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    loading={isLoading}
                    autoHeight
                />
                {isAddDialogOpen && <AddEditNewsDialog
                    open={isAddDialogOpen}
                    onClose={() => {
                        setIsAddDialogOpen(false);
                        setEditingNews(null);
                    }}
                    news={editingNews}
                    onSubmit={(data) => {
                        editingNews ? updateMutation.mutate(data as News) : addMutation.mutate(data)
                    }
                    }
                />}

                <DeleteNewsDialog
                    open={!!deletingNewsId}
                    onClose={() => setDeletingNewsId(null)}
                    onConfirm={() => deletingNewsId && deleteMutation.mutate(deletingNewsId)}
                />
            </Box>
        </Container>
    );
};

export default Dashboard;
