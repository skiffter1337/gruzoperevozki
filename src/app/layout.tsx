import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {ReactNode} from "react";
import GoogleAnalytics from "@/analytics/GoogleAnalytics";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
        template: '%s | UrbanMoving',
        default: 'הובלות דירות ומשרדים | UrbanMoving',
    },
    icons: {
        icon: '/favicon.ico',
    },
}

type Props = {
    children: ReactNode
}

export default function RootLayout({children}: Props) {
    return (
        <html lang="he" dir="rtl">
        <head>
            <meta name="google-site-verification" content="0r38RyQh61dBoLIyxVwILq9gnyn8glbioO4hbMH0oKg"/>
        </head>
        <body className={inter.className}>{children}
        <GoogleAnalytics/>
        </body>
        </html>
    )
}