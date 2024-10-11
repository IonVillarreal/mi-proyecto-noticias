import React from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button
} from '@mui/material';
import Link from 'next/link';
import Grid from '@mui/material/Grid2';
import Image from 'next/image';

interface News {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getNews(): Promise<{
    news: News[];
    totalCount: number;
}> {
    const res = await fetch(`${API_URL}/news`);
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}

export default async function NewsPage() {
    const {news} = await getNews();

    return (
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Typography variant="h2" component="h1" gutterBottom>
                Últimas Noticias
            </Typography>
            <Grid container spacing={4}>
                {news.map((item) => (
                    <Grid
                        size={{xs: 12, sm: 6, md: 4}}
                        key={item.id}>
                        <Card>
                            <Image
                                src={`https://picsum.photos/id/${item.id}/500/300`}
                                alt={item.title}
                                width={500}
                                height={300}
                                layout="responsive"
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description.substring(0, 100)}...
                                </Typography>
                                <Link href={`/news/${item.id}`} passHref legacyBehavior>
                                    <Button variant="contained" color="primary" sx={{mt: 2}}>
                                        Leer más
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
