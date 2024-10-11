import React, { useState, useEffect } from 'react';
import { Typography, LinearProgress, CircularProgress } from '@mui/material';

interface PasswordStrengthProps {
    password: string;
    setStrength: (strength: number) => void;
}

type ZxcvbnType = (password: string) => { score: number };

const PasswordStrengthDynamic: React.FC<PasswordStrengthProps> = ({ password, setStrength }) => {
    const [zxcvbn, setZxcvbn] = useState<ZxcvbnType | null>(null);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        import('zxcvbn-typescript')
            .then((module) => {
                setZxcvbn(() => module.default as ZxcvbnType);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error loading zxcvbn:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (zxcvbn && password) {
            try {
                const result = zxcvbn(password);
                setScore(result.score);
                setStrength(result.score);
            } catch (error) {
                console.error('Error evaluating password strength:', error);
                setScore(0);
                setStrength(0);
            }
        }
    }, [zxcvbn, password, setStrength]);

    const getStrengthLabel = (score: number): string => {
        const labels = ['Muy débil', 'Débil', 'Moderada', 'Fuerte', 'Muy fuerte'];
        return labels[score] || '';
    };

    if (isLoading) return <CircularProgress />;

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

export default PasswordStrengthDynamic;
