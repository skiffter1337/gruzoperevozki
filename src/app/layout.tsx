import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
        template: '%s | UrbanMoving',
        default: 'Грузоперевозки и переезды | UrbanMoving',
    },
}

type Props = {
    children: ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="ru">
        <head>
            <meta name="google-site-verification" content="0r38RyQh61dBoLIyxVwILq9gnyn8glbioO4hbMH0oKg" />
            <title>UrbanMoving</title>
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}