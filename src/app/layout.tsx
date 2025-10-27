import type { Metadata } from 'next'
import { ReactNode } from "react";
import GoogleAnalytics from "@/analytics/GoogleAnalytics";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        template: '%s | UrbanMoving',
        default: 'UrbanMoving - Moving Services',
    },
    icons: {
        icon: '/favicon.ico',
    },
}

type Props = {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html>
        <head>
            <meta name="google-site-verification" content="0r38RyQh61dBoLIyxVwILq9gnyn8glbioO4hbMH0oKg"/>
        </head>
        <body className={inter.className}>
        {children}
        <GoogleAnalytics/>
        </body>
        </html>
    )
}