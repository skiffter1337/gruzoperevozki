import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ru', 'he', 'en'] as const
const defaultLocale = 'he'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.match(/\.(png|PNG|jpg|JPG|jpeg|gif|ico|svg|css|js)$/)) {
        return NextResponse.next()
    }

    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
        const newPathname = pathname === `/${defaultLocale}` ? '/' : pathname.replace(`/${defaultLocale}`, '')
        const newUrl = new URL(newPathname, request.url)
        return NextResponse.redirect(newUrl)
    }

    if (pathnameHasLocale) {
        return NextResponse.next()
    }

    if (pathname === '/') {
        return NextResponse.next()
    }

    const acceptLanguage = request.headers.get('accept-language') || ''
    let locale: string = defaultLocale

    if (acceptLanguage.includes('ru')) locale = 'ru'
    else if (acceptLanguage.includes('en')) locale = 'en'

    if (locale === defaultLocale) {
        return NextResponse.next()
    }

    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}