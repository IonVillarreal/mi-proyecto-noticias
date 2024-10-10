
'use client'

import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Typography, Box } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'firstName', headerName: 'Nombre', width: 130 },
    { field: 'lastName', headerName: 'Apellido', width: 130 },
    { field: 'age', headerName: 'Edad', type: 'number', width: 90 },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 5, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 6, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 7, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 8, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 9, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
];

export default function DataGridExamplePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Ejemplo de DataGrid Básico
                </Typography>
                <div style={{ height: 800, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                        pageSizeOptions={[10]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </div>
            </Box>
        </Container>
    );
}
