'use client'

import Script from 'next/script'

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=AW-17662495482"
            />
            <Script
                id="google-analytics-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17662495482');
          `,
                }}
            />
        </>
    )
}

export default GoogleAnalytics