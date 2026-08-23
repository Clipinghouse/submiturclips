"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { getCookieConsent, type ConsentState } from "./CookieConsent";

export default function GoogleAnalytics() {
    const [consent, setConsent] = useState<ConsentState>(null);

    useEffect(() => {
        setConsent(getCookieConsent());

        const handler = () => {
            setConsent(getCookieConsent());
        };
        window.addEventListener("cookie_consent_change", handler);
        return () => window.removeEventListener("cookie_consent_change", handler);
    }, []);

    if (consent !== "granted") return null;

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
