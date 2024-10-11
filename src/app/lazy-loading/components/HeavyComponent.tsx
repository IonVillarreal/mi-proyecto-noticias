'use client'

import React, { useEffect, useState } from 'react';

const HeavyComponent: React.FC = () => {
    const [data, setData] = useState<string[]>([]);

    useEffect(() => {
        // Simulamos una carga pesada
        setTimeout(() => {
            setData(['Elemento 1', 'Elemento 2', 'Elemento 3']);
        }, 2000);
    }, []);

    return (
        <div>
            <h2>Componente Pesado</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default HeavyComponent;
