export const i18nConfig = {
    locales: ['ru', 'he', 'en'] as const,
    defaultLocale: 'he',
} as const;

export type Locale = typeof i18nConfig.locales[number];