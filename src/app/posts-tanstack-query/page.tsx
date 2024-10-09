'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Post {
    id: number;
    title: string;
}

async function fetchPosts(): Promise<Post[]> {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
}

export default function PostsPageWithTanStackQuery() {
    const { data: posts, isLoading, error } = useQuery<Post[], Error>({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            <h1>Posts (usando TanStack Query)</h1>
            <ul>
                {posts?.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    );
}
