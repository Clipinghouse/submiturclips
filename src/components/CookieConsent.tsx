"use client";

import { useState, useEffect } from "react";
import { Cookie, Lock, BarChart, Save } from "lucide-react";

const STORAGE_KEY = "cookie_consent";
const FUNCTIONAL_KEY = "cookie_functional";

// ── Public helpers ──────────────────────────────────────────────────────────

/** GA is always required — returns true unconditionally */
export function getAnalyticsConsent(): boolean {
    return true;
}

/** Whether optional functional storage is enabled */
export function getFunctionalConsent(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(FUNCTIONAL_KEY) !== "denied";
}

/** Has the user seen and dismissed the banner? */
export function hasDismissedBanner(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "dismissed";
}

/** Called by the "Cookie Settings" footer button */
export function resetCookieConsent() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("cookie_consent_change"));
}

// ── Toggle component ────────────────────────────────────────────────────────

function Toggle({
    checked,
    onChange,
    disabled = false,
    id,
}: {
    checked: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
    id: string;
}) {
    return (
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange?.(!checked)}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none ${disabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                } ${checked ? "bg-lime-500" : "bg-zinc-700"}`}
        >
            <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-4" : "translate-x-1"
                    }`}
            />
        </button>
    );
}

// ── Category row ────────────────────────────────────────────────────────────

function CategoryRow({
    icon,
    title,
    description,
    badge,
    checked,
    onChange,
    disabled,
    toggleId,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    badge: { label: string; color: string };
    checked: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
    toggleId: string;
}) {
    return (
        <div className="flex items-start justify-between gap-3 py-4 border-b border-zinc-800 last:border-0">
            <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-base leading-none text-white shrink-0">{icon}</span>
                    <span className="text-white text-sm font-semibold leading-none">{title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap ${badge.color}`}>
                        {badge.label}
                    </span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">{description}</p>
            </div>
            <div className="shrink-0 pt-1">
                <Toggle id={toggleId} checked={checked} onChange={onChange} disabled={disabled} />
            </div>
        </div>
    );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [functional, setFunctional] = useState(true);

    useEffect(() => {
        const init = () => {
            setShowBanner(!hasDismissedBanner());
            setFunctional(getFunctionalConsent());
        };
        init();
        window.addEventListener("cookie_consent_change", init);
        return () => window.removeEventListener("cookie_consent_change", init);
    }, []);

    const saveAndClose = () => {
        localStorage.setItem(STORAGE_KEY, "dismissed");
        localStorage.setItem(FUNCTIONAL_KEY, functional ? "granted" : "denied");
        setShowBanner(false);
        setShowSettings(false);
    };

    const acceptAll = () => {
        setFunctional(true);
        localStorage.setItem(STORAGE_KEY, "dismissed");
        localStorage.setItem(FUNCTIONAL_KEY, "granted");
        setShowBanner(false);
        setShowSettings(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Overlay (settings panel open) */}
            {showSettings && (
                <div
                    className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm"
                    onClick={() => setShowSettings(false)}
                />
            )}

            {/* Main container */}
            <div
                className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center pointer-events-none"
                role="dialog"
                aria-label="Cookie preferences"
            >
                <div className="w-full max-w-md pointer-events-auto mx-auto w-full">

                    {/* ── Settings Panel (expanded) ── */}
                    {showSettings && (
                        <div className="mx-3 mb-3 rounded-2xl border border-zinc-800 bg-zinc-950 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
                            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/30">
                                <div className="flex items-center gap-2">
                                    <Cookie className="w-5 h-5 text-white" />
                                    <h3 className="text-white text-sm font-semibold font-poppins leading-none pt-0.5">Cookie Settings</h3>
                                </div>
                                <a
                                    href="/legal/cookie-policy"
                                    className="text-xs text-lime-500 hover:text-lime-400 transition-colors font-poppins font-medium"
                                >
                                    Read Policy ↗
                                </a>
                            </div>

                            <div className="px-5 font-poppins max-h-[60vh] overflow-y-auto">
                                <CategoryRow
                                    icon={<Lock className="w-4 h-4 text-white" />}
                                    title="Essential"
                                    description="Required to remember if you closed this banner."
                                    badge={{ label: "Always On", color: "bg-zinc-700 text-zinc-300" }}
                                    checked={true}
                                    disabled={true}
                                    toggleId="toggle-essential"
                                />
                                <CategoryRow
                                    icon={<BarChart className="w-4 h-4 text-white" />}
                                    title="Analytics"
                                    description="Google Analytics. Helps us count visits and see which pages are popular. Required to operate the site."
                                    badge={{ label: "Required", color: "bg-lime-500 text-black" }}
                                    checked={true}
                                    disabled={true}
                                    toggleId="toggle-analytics"
                                />
                                <CategoryRow
                                    icon={<Save className="w-4 h-4 text-white" />}
                                    title="Form Progress"
                                    description="Saves your typed form entries so you don't lose them if you reload the page."
                                    badge={{ label: "Optional", color: "bg-zinc-700 text-zinc-300" }}
                                    checked={functional}
                                    onChange={setFunctional}
                                    disabled={false}
                                    toggleId="toggle-functional"
                                />
                            </div>

                            <div className="p-4 flex gap-3 border-t border-zinc-800 bg-zinc-900/30">
                                <button
                                    id="cookie-save-btn"
                                    onClick={saveAndClose}
                                    className="flex-1 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-all cursor-pointer font-poppins"
                                >
                                    Save
                                </button>
                                <button
                                    id="cookie-accept-all-btn"
                                    onClick={acceptAll}
                                    className="flex-1 py-3 rounded-xl border border-lime-500/30 bg-lime-500 text-black text-xs font-bold hover:bg-lime-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(132,204,22,0.2)] font-poppins"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Banner (compact) ── */}
                    {!showSettings && (
                        <div className="m-3 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] p-4 font-poppins">
                            <div className="flex items-start gap-3 mb-4">
                                <Cookie className="w-6 h-6 text-white shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white text-sm font-semibold mb-1">Our Site Uses Cookies</h3>
                                    <p className="text-zinc-400 text-xs leading-relaxed">
                                        We use storage to keep the site running and use analytics to understand traffic.{" "}
                                        <a href="/legal/cookie-policy" className="text-lime-500 underline underline-offset-2 hover:text-lime-400 transition-colors">
                                            Learn more
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    id="cookie-settings-btn"
                                    onClick={() => setShowSettings(true)}
                                    className="flex-1 py-2.5 px-3 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-all cursor-pointer"
                                >
                                    Privacy Settings
                                </button>
                                <button
                                    id="cookie-accept-btn"
                                    onClick={acceptAll}
                                    className="flex-1 py-2.5 px-3 rounded-xl border border-lime-500/30 bg-lime-500 text-black text-xs font-bold hover:bg-lime-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(132,204,22,0.2)]"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
