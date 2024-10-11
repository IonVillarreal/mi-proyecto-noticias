'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, Container, TextField, Button } from '@mui/material';

const DynamicMap = dynamic(() => import('../components/Map'), {
    ssr: false,
    loading: () => <p>Cargando mapa...</p>
});

const ContactPage: React.FC = () => {
    // Coordenadas de La Paz, Bolivia
    const laPazCoordinates: [number, number] = [-16.5000, -68.1500];

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Contáctanos en Bolivia
                </Typography>
                <Typography variant="body1" paragraph>
                    Estamos ubicados en La Paz, Bolivia. Puedes visitarnos o contactarnos por teléfono o email.
                </Typography>
                <Box sx={{ height: 400, width: '100%', my: 2 }}>
                    <DynamicMap center={laPazCoordinates} zoom={13} />
                </Box>
                <Typography variant="h4" component="h2" gutterBottom>
                    Formulario de Contacto
                </Typography>
                <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                    <TextField fullWidth label="Nombre" margin="normal" />
                    <TextField fullWidth label="Email" type="email" margin="normal" />
                    <TextField fullWidth label="Mensaje" multiline rows={4} margin="normal" />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Enviar Mensaje
                    </Button>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1">
                        Dirección: Av. 16 de Julio 1490, La Paz, Bolivia
                    </Typography>
                    <Typography variant="body1">
                        Teléfono: +591 2 2123456
                    </Typography>
                    <Typography variant="body1">
                        Email: contacto@ejemplo.com.bo
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ContactPage;
