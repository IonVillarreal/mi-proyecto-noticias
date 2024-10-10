'use client'

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Container, Typography, Box, Card, CardContent, Button, CircularProgress } from '@mui/material';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PageData {
    data: Post[];
    nextCursor: number | null;
}

const fetchPosts = async ({ pageParam = 1 }): Promise<PageData> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Post[] = await res.json();
    return {
        data,
        nextCursor: pageParam < 10 ? pageParam + 1 : null
    };
};

export default function InfinitePostsPage() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Lista Infinita de Posts
                </Typography>
                {status === 'pending' ? (
                    <CircularProgress />
                ) : status === 'error' ? (
                    <Typography color="error">Error al cargar los posts</Typography>
                ) : (
                    <>
                        {data?.pages.map((page, i) => (
                            <React.Fragment key={i}>
                                {page.data.map((post: Post) => (
                                    <Card key={post.id} sx={{ mb: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6">{post.title}</Typography>
                                            <Typography variant="body2">{post.body}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </React.Fragment>
                        ))}
                        <Button
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            {isFetchingNextPage
                                ? 'Cargando más...'
                                : hasNextPage
                                    ? 'Cargar Más'
                                    : 'No hay más posts'}
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
}
