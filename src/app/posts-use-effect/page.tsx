'use client'

import React, { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
}

export default function PostsPageWithUseEffect() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((data: Post[]) => {
                setPosts(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div>Cargando...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <>
            <h1>Posts (usando useEffect)</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </>
    );
}
