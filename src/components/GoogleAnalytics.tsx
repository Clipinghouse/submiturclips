import Script from "next/script";

// Google Analytics is a required service for this site.
// It loads unconditionally on every page.
export default function GoogleAnalytics() {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-M48QV3DHZ2"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-M48QV3DHZ2');
                `}
            </Script>
        </>
    );
}
