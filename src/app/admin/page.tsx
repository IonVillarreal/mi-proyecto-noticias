'use client'

import React, {useState} from 'react';
import {Container, Typography, Box, Button} from '@mui/material';
import {DataGrid, GridColDef, GridRenderCellParams, GridPaginationModel} from '@mui/x-data-grid';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {addNews, deleteNews, fetchNews, News, NewsResponse, updateNews} from './services/newsService';
import AddEditNewsDialog from './components/AddEditNewsDialog';
import DeleteNewsDialog from "@/app/admin/components/DeleteNewsDialog";

const Dashboard: React.FC = () => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 5,
    });
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [deletingNewsId, setDeletingNewsId] = useState<number | null>(null);

    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery<NewsResponse>({
        queryKey: ['news', paginationModel.page, paginationModel.pageSize],
        queryFn: () => fetchNews(paginationModel.page + 1, paginationModel.pageSize),
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
                        setIsAddDialogOpen(true);
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
                    rows={data?.news ?? []}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 25]}
                    pagination
                    paginationMode="server"
                    rowCount={data?.totalCount ?? 100}
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
                        if (editingNews) {
                            updateMutation.mutate(data as News);
                        } else {
                            addMutation.mutate(data as News);
                        }
                    }}
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
