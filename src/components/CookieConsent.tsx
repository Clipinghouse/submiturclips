"use client";

import { useState, useEffect } from "react";

export type ConsentState = "granted" | "denied" | null;

const STORAGE_KEY = "cookie_consent";

export function getCookieConsent(): ConsentState {
    if (typeof window === "undefined") return null;
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === "granted" || val === "denied") return val;
    return null;
}

export function resetCookieConsent() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("cookie_consent_change"));
}

export default function CookieConsent() {
    const [consent, setConsent] = useState<ConsentState>("granted"); // default to hide banner during SSR
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const stored = getCookieConsent();
        setConsent(stored);
        if (stored === null) setVisible(true);

        const handler = () => {
            const updated = getCookieConsent();
            setConsent(updated);
            if (updated === null) setVisible(true);
        };
        window.addEventListener("cookie_consent_change", handler);
        return () => window.removeEventListener("cookie_consent_change", handler);
    }, []);

    const handleAccept = () => {
        localStorage.setItem(STORAGE_KEY, "granted");
        setConsent("granted");
        setVisible(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    const handleReject = () => {
        localStorage.setItem(STORAGE_KEY, "denied");
        setConsent("denied");
        setVisible(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    if (!visible || consent !== null) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center pointer-events-none"
            role="dialog"
            aria-label="Cookie consent"
        >
            <div className="w-full max-w-md pointer-events-auto mx-auto">
                <div className="m-3 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] p-5 font-poppins">
                    <div className="flex items-start gap-3 mb-4">
                        <span className="text-xl leading-none mt-0.5">🍪</span>
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-1">Cookie Preferences</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                We use cookies for site functionality and analytics (Google Analytics) to improve your experience.
                                Read our{" "}
                                <a
                                    href="/legal/privacy-policy"
                                    className="text-lime-500 underline underline-offset-2 hover:text-lime-400 transition-colors"
                                >
                                    Privacy Policy
                                </a>{" "}
                                for details.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            id="cookie-reject-btn"
                            onClick={handleReject}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-300 text-xs font-medium hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                        >
                            Reject
                        </button>
                        <button
                            id="cookie-accept-btn"
                            onClick={handleAccept}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-lime-500/30 bg-lime-500 text-black text-xs font-semibold hover:bg-lime-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(132,204,22,0.2)]"
                        >
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
