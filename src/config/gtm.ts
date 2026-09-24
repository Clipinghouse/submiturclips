export function getGtmId(): string | null {
    const id = process.env.SUBMIT_CLIPS_GTM_ID;
    if (!id || id === 'GTM-XXXXXXX') {
        if (process.env.NODE_ENV === 'development') {
            console.warn('GTM ID is missing or placeholder. Google Tag Manager will not load.');
        }
        return null;
    }
    if (!/^GTM-[A-Z0-9]+$/.test(id)) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('GTM ID is invalid. Google Tag Manager will not load.');
        }
        return null;
    }
    return id;
}
