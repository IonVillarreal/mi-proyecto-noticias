'use client'

import { useState } from 'react'
import {keepPreviousData, useQuery} from '@tanstack/react-query'
import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Pagination,
    CircularProgress,
    Alert
} from '@mui/material'

interface Post {
    id: number;
    title: string;
    body: string;
}

async function fetchPosts(page: number): Promise<Post[]> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
}

export default function PostList() {
    const [page, setPage] = useState(1)
    const { data, isLoading, error, isPlaceholderData } = useQuery({
        queryKey: ['posts', page],
        queryFn: () => fetchPosts(page),
        placeholderData: keepPreviousData,
    })

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) return <CircularProgress />
    if (error) return <Alert severity="error">Error: {error.message}</Alert>

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Lista de Posts
            </Typography>
            <Grid container spacing={3}>
                {data?.map(post => (
                    <Grid item xs={12} key={post.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={10}
                page={page}
                onChange={handleChange}
                sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
                disabled={isPlaceholderData}
            />
        </Container>
    )
}
