
import { Typography, Container, Paper } from '@mui/material';

interface NewsDetail {
    id: number;
    title: string;
    description: string;
    date: string;
}

async function getNews(id: string): Promise<NewsDetail> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch news');
    }
    return res.json();
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
    const news = await getNews(params.id);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {news.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Fecha: {new Date(news.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                    {news.description}
                </Typography>
            </Paper>
        </Container>
    );
}
