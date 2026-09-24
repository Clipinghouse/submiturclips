export type ConsentState = 'granted' | 'denied';

const STORAGE_KEY = 'cookie_consent_dismissed';
const ANALYTICS_KEY = 'cookie_consent_analytics';

export function getStoredConsent(): ConsentState {
    try {
        if (typeof window === 'undefined') return 'denied';
        const val = window.localStorage.getItem(ANALYTICS_KEY);
        if (val === 'granted' || val === 'denied') {
            return val;
        }
    } catch (_e) {
        // Ignore Storage Blocked Error
    }
    return 'denied';
}

export function setConsent(choice: ConsentState) {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(ANALYTICS_KEY, choice);
            window.localStorage.setItem(STORAGE_KEY, 'true');
        }
    } catch (e) { }

    if (typeof window !== 'undefined') {
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        function gtag() { win.dataLayer.push(arguments); }
        // @ts-ignore
        gtag('consent', 'update', { analytics_storage: choice });
    }
}

export function initConsent() {
    if (typeof window === 'undefined') return;
    const choice = getStoredConsent();
    if (choice === 'granted') {
        const win = window as any;
        win.dataLayer = win.dataLayer || [];
        function gtag() { win.dataLayer.push(arguments); }
        // @ts-ignore
        gtag('consent', 'update', { analytics_storage: 'granted' });
    }
}

export function resetConsent() {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(STORAGE_KEY);
            window.localStorage.removeItem(ANALYTICS_KEY);
        }
    } catch (e) { }
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event("cookie_consent_change"));
    }
}

export function hasDismissedBanner(): boolean {
    try {
        if (typeof window === 'undefined') return true;
        return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (_e) {
        return true;
    }
}
