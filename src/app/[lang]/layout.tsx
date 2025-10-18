import type { Metadata } from 'next'
import { ReactNode } from "react";
import GoogleAnalytics from "@/analytics/GoogleAnalytics";

type Props = {
    children: ReactNode
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;

    if (lang === 'he') {
        return {
            title: 'Urban Moving',
            description: 'Professional moving services in Israel',
        }
    }

    const { metadata } = await import(`@/locales/${lang}.json`)

    const localeMap: Record<string, string> = {
        'he': 'he_IL',
        'ru': 'ru_RU',
        'en': 'en_US'
    }

    return {
        title: metadata.title,
        description: metadata.description,
        keywords: metadata.keywords,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            type: 'website',
            locale: localeMap[lang] || 'en_US',
        },
        robots: 'index, follow',
        alternates: {
            canonical: `https://urbanmoving.net/${lang === 'he' ? '' : lang}`,
            languages: {
                'ru': 'https://urbanmoving.net/ru',
                'he': 'https://urbanmoving.net',
                'en': 'https://urbanmoving.net/en',
            }
        }
    }
}

export default async function LangLayout({
                                             children,
                                             params
                                         }: Props) {
    const { lang } = await params;

    const directionMap: Record<string, 'rtl' | 'ltr'> = {
        'he': 'rtl',
        'ru': 'ltr',
        'en': 'ltr'
    }

    return (
        <html lang={lang} dir={directionMap[lang] || 'ltr'}>
        <body>{children}
        <GoogleAnalytics/>
        </body>
        </html>
    )
}