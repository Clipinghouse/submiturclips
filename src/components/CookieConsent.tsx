"use client";

import { useState, useEffect } from "react";
import { Cookie, Lock, Check } from "lucide-react";
import { getStoredConsent, hasDismissedBanner, resetConsent, setConsent } from "@/lib/consent";

export const getFunctionalConsent = () => getStoredConsent() === 'granted';
export { hasDismissedBanner, resetConsent as resetCookieConsent };

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const init = () => {
            setShowBanner(!hasDismissedBanner());
        };
        init();
        window.addEventListener("cookie_consent_change", init);
        return () => window.removeEventListener("cookie_consent_change", init);
    }, []);

    const rejectAll = () => {
        setConsent("denied");
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    const acceptAll = () => {
        setConsent("granted");
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    if (!isClient) return null;

    return (
        <>
            {/* Floating Chat-head */}
            {!showBanner && (
                <div className="pointer-events-none fixed bottom-6 inset-x-0 z-[9990] flex justify-center">
                    <div className="w-full max-w-md relative">
                        <button
                            onClick={() => setShowBanner(true)}
                            className="pointer-events-auto absolute bottom-0 left-6 w-12 h-12 bg-[#0c0c0c] text-white rounded-full flex items-center justify-center shadow-2xl border border-zinc-800 hover:scale-105 transition-transform"
                            aria-label="Cookie Settings"
                        >
                            <Cookie className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Banner */}
            {showBanner && (
                <div className="fixed bottom-4 inset-x-0 z-[9999] flex justify-center pointer-events-none">
                    <div className="w-full max-w-md px-4 pointer-events-auto text-left">
                        <div className="w-full bg-[#0c0c0c] border border-zinc-900 rounded-2xl p-5 shadow-2xl">
                            <div className="flex items-start gap-4 mb-2">
                                <Cookie className="w-6 h-6 text-white shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-white text-[15px] font-semibold mb-1 font-poppins">We value your privacy</h3>
                                    <p className="text-zinc-400 text-[13px] leading-relaxed font-poppins mb-4">
                                        We use cookies to enhance your browsing experience and analyze our traffic.
                                    </p>

                                    <div className="space-y-3 mb-2">
                                        <div className="flex items-start gap-2">
                                            <Lock className="w-[14px] h-[14px] text-zinc-500 mt-[2px]" />
                                            <div>
                                                <p className="text-white text-[13px] font-medium leading-none mb-1">Necessary</p>
                                                <p className="text-zinc-500 text-[12px] leading-tight">Essential for the site's basic functionality.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-[14px] h-[14px] rounded-[3px] border border-zinc-600 flex items-center justify-center mt-[2px]">
                                                <Check className="w-2.5 h-2.5 text-zinc-400" />
                                            </div>
                                            <div>
                                                <p className="text-white text-[13px] font-medium leading-none mb-1">Statistics</p>
                                                <p className="text-zinc-500 text-[12px] leading-tight">Allows us to analyze traffic. Optional.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={rejectAll}
                                    className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-[13px] font-semibold hover:bg-zinc-800 transition-colors font-poppins"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-[13px] font-semibold hover:bg-zinc-800 transition-colors font-poppins"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
