import ru from '@/locales/ru.json'
import he from '@/locales/he.json'
import en from '@/locales/en.json'

const translations = {
    ru: ru,
    he: he,
    en: en
} as const

export function getServerTranslations(lang: string) {
    return translations[lang as keyof typeof translations] || translations.he
}