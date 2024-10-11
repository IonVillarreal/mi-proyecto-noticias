import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicHeader = dynamic(() => import('./components/Header'), {
    loading: () => <p>Cargando encabezado...</p>,
});

const DynamicHeavyComponent = dynamic(() => import('./components/HeavyComponent'), {
    loading: () => <p>Cargando componente pesado...</p>,
    ssr: false, // Desactivamos SSR para este componente
});

export default function HomePage() {
    return (
        <div>
            <Suspense fallback={<p>Cargando...</p>}>
                <DynamicHeader />
            </Suspense>

            <main>
                <h2>Bienvenido a nuestra página</h2>
                <p>Este es un ejemplo de lazy loading en Next.js con App Router</p>

                <Suspense fallback={<p>Cargando componente pesado...</p>}>
                    <DynamicHeavyComponent />
                </Suspense>
            </main>
        </div>
    );
}
