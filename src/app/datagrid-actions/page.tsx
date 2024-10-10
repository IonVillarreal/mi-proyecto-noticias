
'use client'

import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Container, Typography, Box } from '@mui/material';

const handleEdit = (id: number) => {
    console.log(`Editando fila ${id}`);
  // Aquí iría la lógica para editar
};

const handleDelete = (id: number) => {
  console.log(`Eliminando fila ${id}`);
  // Aquí iría la lógica para eliminar
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre', width: 130 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 200,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Button
          onClick={() => handleEdit(params.row.id)}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginRight: 8 }}
        >
          Editar
        </Button>
        <Button
          onClick={() => handleDelete(params.row.id)}
          variant="contained"
          color="secondary"
          size="small"
        >
          Eliminar
        </Button>
      </>
    ),
  },
];

const rows = [
  { id: 1, name: 'Jon Snow' },
  { id: 2, name: 'Cersei Lannister' },
  { id: 3, name: 'Jaime Lannister' },
];

export default function DataGridActionsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          DataGrid con Acciones Personalizadas
        </Typography>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Container>
  );
}
