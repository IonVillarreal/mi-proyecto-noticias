'use client'

import React from 'react';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {Container, Typography, Box} from '@mui/material';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'firstName', headerName: 'Nombre', width: 130},
    {field: 'lastName', headerName: 'Apellido', width: 130},
    {
        field: 'fullName',
        headerName: 'Nombre completo',
        description: 'Esta columna no es ordenable ni filtrable.',
        sortable: false,
        filterable: false,
        width: 160,
        renderCell: (params: GridRenderCellParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon'},
    {id: 2, lastName: 'Lannister', firstName: 'Cersei'},
    {id: 3, lastName: 'Lannister', firstName: 'Jaime'},
    {id: 4, lastName: 'Stark', firstName: 'Arya'},
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys'},
];

export default function DataGridAdvancedPage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    DataGrid con Ordenamiento y Filtrado
                </Typography>
                <Box sx={{width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {pageSize: 5, page: 0},
                            },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </Box>
        </Container>
    );
}
