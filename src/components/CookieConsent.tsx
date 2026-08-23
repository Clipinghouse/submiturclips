"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Lock, Check, ChevronDown, ChevronUp } from "lucide-react";

const STORAGE_KEY = "cookie_consent";
const FUNCTIONAL_KEY = "cookie_functional";

export function getFunctionalConsent(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(FUNCTIONAL_KEY) !== "denied";
}

export function hasDismissedBanner(): boolean {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(STORAGE_KEY) === "dismissed";
}

export function resetCookieConsent() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("cookie_consent_change"));
}

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [functional, setFunctional] = useState(true);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const init = () => {
            const dismissed = localStorage.getItem(STORAGE_KEY) === "dismissed";
            setShowBanner(!dismissed);
            setFunctional(localStorage.getItem(FUNCTIONAL_KEY) !== "denied");
        };
        init();
        window.addEventListener("cookie_consent_change", init);
        return () => window.removeEventListener("cookie_consent_change", init);
    }, []);

    const withdrawConsent = () => {
        setFunctional(false);
        localStorage.setItem(STORAGE_KEY, "dismissed");
        localStorage.setItem(FUNCTIONAL_KEY, "denied");
        setShowPanel(false);
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    const changeConsent = () => {
        localStorage.setItem(STORAGE_KEY, "dismissed");
        localStorage.setItem(FUNCTIONAL_KEY, functional ? "granted" : "denied");
        setShowPanel(false);
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    const acceptAll = () => {
        setFunctional(true);
        localStorage.setItem(STORAGE_KEY, "dismissed");
        localStorage.setItem(FUNCTIONAL_KEY, "granted");
        setShowPanel(false);
        setShowBanner(false);
        window.dispatchEvent(new Event("cookie_consent_change"));
    };

    if (!isClient) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] flex justify-center w-full h-full">
            <div className="w-full max-w-md h-full relative pointer-events-none">

                {/* Floating Chat-head */}
                {!showBanner && !showPanel && (
                    <button
                        onClick={() => setShowPanel(true)}
                        className="absolute bottom-6 left-6 pointer-events-auto z-[9990] w-12 h-12 bg-[#0c0c0c] text-white rounded-full flex items-center justify-center shadow-2xl border border-zinc-800 hover:scale-105 transition-transform"
                        aria-label="Cookie Settings"
                    >
                        <Cookie className="w-5 h-5" />
                    </button>
                )}

                {/* Overlay */}
                {showPanel && (
                    <div
                        className="absolute inset-0 bg-black/60 pointer-events-auto z-[9995] backdrop-blur-sm"
                        onClick={() => setShowPanel(false)}
                    />
                )}

                {/* Initial Banner */}
                {showBanner && !showPanel && (
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-auto z-[9999]">
                        <div className="w-full bg-[#0c0c0c] border border-zinc-900 rounded-2xl p-5 shadow-2xl">
                            <div className="flex items-start gap-4 mb-5">
                                <Cookie className="w-6 h-6 text-white shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="text-white text-[15px] font-semibold mb-1 font-poppins">We value your privacy</h3>
                                    <p className="text-zinc-400 text-[13px] leading-relaxed font-poppins">
                                        We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowPanel(true)}
                                    className="flex-1 py-3.5 rounded-xl bg-transparent border border-zinc-800 text-white text-[13px] font-semibold hover:bg-zinc-900 transition-colors font-poppins"
                                >
                                    Custom
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="flex-1 py-3.5 rounded-xl bg-white text-black text-[13px] font-bold hover:bg-zinc-200 transition-colors font-poppins"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Configurable Settings Panel */}
                {showPanel && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[350px] max-h-[85vh] pointer-events-auto z-[9999] bg-[#0c0c0c] border border-zinc-900 rounded-xl overflow-hidden shadow-2xl font-poppins flex flex-col">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-900 shrink-0">
                            <h2 className="text-white text-[14px] font-bold tracking-wide">Cookie settings</h2>
                            <button onClick={() => setShowPanel(false)} className="text-zinc-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5 flex-1 overflow-y-auto">
                            <h3 className="text-white text-[14px] font-bold tracking-wide mb-5">Your current state</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-white text-[14px]">
                                    <Lock className="w-[18px] h-[18px] text-zinc-300 stroke-[1.5]" />
                                    <span className="font-medium">Necessary</span>
                                </div>
                                <div className="flex items-center gap-3 text-white text-[14px]">
                                    <Check className="w-[18px] h-[18px] text-zinc-300 stroke-[1.5]" />
                                    <span className="font-medium">Statistics</span>
                                </div>
                                <div
                                    className="flex items-center gap-3 text-white text-[14px] group cursor-pointer w-full"
                                    onClick={() => setFunctional(!functional)}
                                    role="checkbox"
                                    aria-checked={functional}
                                >
                                    <div className="w-[18px] h-[18px] rounded-[4px] border border-zinc-600 flex items-center justify-center transition-colors group-hover:border-zinc-400 pointer-events-none bg-transparent">
                                        {functional && <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
                                    </div>
                                    <span className="font-medium">Preferences</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setDetailsOpen(!detailsOpen)}
                                className="flex items-center gap-2 text-white text-[14px] font-bold hover:opacity-80 transition-opacity mb-2"
                            >
                                Show details
                                {detailsOpen ? <ChevronUp className="w-4 h-4 text-zinc-300" /> : <ChevronDown className="w-4 h-4 text-zinc-300" />}
                            </button>

                            {detailsOpen && (
                                <div className="space-y-5 text-[13px] pr-2 overflow-y-auto custom-scrollbar mt-4 mb-2">
                                    <div>
                                        <p className="text-white font-semibold mb-1">Necessary (Always active)</p>
                                        <p className="text-zinc-500 leading-relaxed">Essential for the site's basic functionality, like remembering your consent settings.</p>
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold mb-1">Statistics (Required)</p>
                                        <p className="text-zinc-500 leading-relaxed">Allows us to analyze traffic via Google Analytics. All data is aggregated.</p>
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold mb-1">Preferences</p>
                                        <p className="text-zinc-500 leading-relaxed">Remembers your form progress so you don't lose data on page refreshes.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-zinc-900 flex gap-3 shrink-0 bg-[#0c0c0c]">
                            <button
                                onClick={withdrawConsent}
                                className="flex-1 py-3 px-3 bg-[#111] border border-zinc-800 text-white text-[13px] font-bold rounded-lg hover:bg-zinc-800 transition-colors text-center"
                            >
                                Withdraw
                            </button>
                            <button
                                onClick={changeConsent}
                                className="flex-1 py-3 px-3 bg-white text-black text-[13px] font-bold rounded-lg hover:bg-zinc-200 transition-colors text-center"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #27272a;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
