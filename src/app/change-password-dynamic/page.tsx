'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';

interface PasswordStrengthProps {
    password: string;
    setStrength: (strength: number) => void;
}

const DynamicPasswordStrength = dynamic<PasswordStrengthProps>(
    () => import('./components/PasswordStrengthDynamic'),
    { ssr: false, loading: () => <p>Cargando...</p> }
);

const ChangePasswordDynamic: React.FC = () => {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Cambio de contraseña enviado (Importación Dinámica)');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Cambiar Contraseña (Importación Dinámica)
            </Typography>
            <TextField
                fullWidth
                type="password"
                label="Nueva Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <DynamicPasswordStrength password={password} setStrength={setStrength} />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={strength < 3}
                sx={{ mt: 2 }}
            >
                Cambiar Contraseña
            </Button>
        </Box>
    );
};

export default ChangePasswordDynamic;
