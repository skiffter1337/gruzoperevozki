import type { Metadata } from 'next'
import { ReactNode } from "react";

type Props = {
    children: ReactNode
    params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { lang } = await params;
    const { metadata } = await import(`@/locales/${lang}.json`)

    const localeMap: Record<string, string> = {
        'he': 'he_IL',
        'ru': 'ru_RU',
        'en': 'en_US'
    }

    const isHebrew = lang === 'he'
    const isEnglish = lang === 'en'

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
        ...((isHebrew || isEnglish) && {
            alternates: {
                canonical: 'https://urbanmoving.net',
                languages: {
                    'ru': 'https://urbanmoving.net/ru',
                    'he': 'https://urbanmoving.net/he',
                    'en': 'https://urbanmoving.net/en',
                }
            }
        })
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
        <div dir={directionMap[lang] || 'ltr'}>
            {children}
        </div>
    )
}