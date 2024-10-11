import React, { useEffect } from 'react';
import { Typography, LinearProgress } from '@mui/material';
import zxcvbn from 'zxcvbn-typescript';

interface PasswordStrengthProps {
    password: string;
    setStrength: (strength: number) => void;
}

const PasswordStrengthDirect: React.FC<PasswordStrengthProps> = ({ password, setStrength }) => {
    useEffect(() => {
        if (password) {
            const result = zxcvbn(password);
            setStrength(result.score);
        }
    }, [password, setStrength]);

    const getStrengthLabel = (score: number): string => {
        const labels = ['Muy débil', 'Débil', 'Moderada', 'Fuerte', 'Muy fuerte'];
        return labels[score] || '';
    };

    const score = zxcvbn(password).score;

    return (
        <div>
            <Typography variant="body2">
                Fuerza de la contraseña: {getStrengthLabel(score)}
            </Typography>
            <LinearProgress
                variant="determinate"
                value={(score / 4) * 100}
                color={score < 3 ? 'error' : 'success'}
            />
        </div>
    );
};

export default PasswordStrengthDirect;
