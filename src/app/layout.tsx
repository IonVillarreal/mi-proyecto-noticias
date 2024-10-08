'use client'
import React from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import theme from "@/theme";
import {AuthProvider} from "@/app/context/AuthContext";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <CssBaseline/>
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
