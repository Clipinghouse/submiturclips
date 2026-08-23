import React from 'react';

export const metadata = {
    title: 'Cookie Policy - Submitclips',
    description: 'Cookie Policy for Submitclips — what cookies we use and why.',
};

const legalStyles = "max-w-2xl mx-auto px-5 py-16 text-zinc-300 font-poppins " +
    "[&_h1]:text-4xl [&_h1]:font-anton [&_h1]:tracking-wide [&_h1]:text-white [&_h1]:mb-2 " +
    "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-lime-500 [&_h2]:mt-10 [&_h2]:mb-3 " +
    "[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-2 " +
    "[&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm " +
    "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-sm [&_li]:leading-relaxed [&_strong]:text-white";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-black">
            <div className={legalStyles}>
                <a href="/" className="text-lime-500 text-sm hover:underline mb-8 inline-block font-semibold">← Back Home</a>

                <h1>Cookie Policy</h1>
                <p className="text-zinc-500 text-sm mb-8">Last updated: August 2026</p>

                <p>
                    This Cookie Policy explains what cookies are, what types of cookies we place on your device when you visit <strong>Submitclips</strong>, and how you can control them.
                </p>

                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device (computer, phone, or tablet) when you visit a website. They help websites remember information about your visit — for example, your preferences or session data — so you don't have to re-enter it each time.
                </p>
                <p>
                    In addition to cookies, this site also uses <strong>localStorage</strong> (browser storage) to persist certain preferences and form data between sessions. It works similarly to cookies and is subject to this same policy.
                </p>

                <h2>2. Cookie Categories We Use</h2>
                <p>We use the following categories of cookies and browser storage on Submitclips:</p>

                {/* Essential */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="!mt-0 !mb-0">🔒 Essential Cookies</h3>
                        <span className="text-[10px] font-semibold text-black bg-lime-500 px-2 py-0.5 rounded-full uppercase tracking-wider">Always On</span>
                    </div>
                    <p className="!mb-3 text-zinc-400">
                        These are required for the site to function. Without them, core features such as the submission form and navigation would not work. You cannot opt out of these.
                    </p>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-700">
                                <th className="text-left text-zinc-400 font-medium py-2 pr-4">Name</th>
                                <th className="text-left text-zinc-400 font-medium py-2 pr-4">Type</th>
                                <th className="text-left text-zinc-400 font-medium py-2">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-300">
                            <tr className="border-b border-zinc-800/60">
                                <td className="py-2 pr-4 font-mono">cookie_consent</td>
                                <td className="py-2 pr-4">localStorage</td>
                                <td className="py-2">Stores your cookie preference (granted/denied) so we don't show the banner on every visit.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Analytics */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="!mt-0 !mb-0">📊 Analytics Cookies</h3>
                        <span className="text-[10px] font-semibold text-black bg-lime-500 px-2 py-0.5 rounded-full uppercase tracking-wider">Required</span>
                    </div>
                    <p className="!mb-3 text-zinc-400">
                        We use <strong>Google Analytics 4 (GA4)</strong> to understand how visitors use the site — such as which pages are visited and how long users stay. This data is aggregated and anonymous; we cannot identify you personally from it. GA4 is required to operate this site and cannot be disabled.
                    </p>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-700">
                                <th className="text-left text-zinc-400 font-medium py-2 pr-4">Name</th>
                                <th className="text-left text-zinc-400 font-medium py-2 pr-4">Provider</th>
                                <th className="text-left text-zinc-400 font-medium py-2">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-300">
                            <tr className="border-b border-zinc-800/60">
                                <td className="py-2 pr-4 font-mono">_ga</td>
                                <td className="py-2 pr-4">Google</td>
                                <td className="py-2">Distinguishes unique users (expires in 2 years).</td>
                            </tr>
                            <tr className="border-b border-zinc-800/60">
                                <td className="py-2 pr-4 font-mono">_ga_*</td>
                                <td className="py-2 pr-4">Google</td>
                                <td className="py-2">Maintains session state for GA4 (expires in 2 years).</td>
                            </tr>
                            <tr>
                                <td className="py-2 pr-4 font-mono">_gid</td>
                                <td className="py-2 pr-4">Google</td>
                                <td className="py-2">Distinguishes users within a 24-hour period.</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="!mt-3 !mb-0 text-xs text-zinc-500">
                        Google's privacy policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:underline">policies.google.com/privacy</a>
                    </p>
                </div>

                {/* Functional */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="!mt-0 !mb-0">⚙️ Functional Storage</h3>
                        <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Optional</span>
                    </div>
                    <p className="!mb-3 text-zinc-400">
                        These are used to improve your experience by remembering information you've entered. Disabling them will not break the site, but you may lose any form progress between sessions.
                    </p>
                    <table className="w-full text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-700">
                                <th className="text-left text-zinc-400 font-medium py-2 pr-4">Name</th>
                                <th className="text-left text-zinc-400 font-medium py-2 pr-4">Type</th>
                                <th className="text-left text-zinc-400 font-medium py-2">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="text-zinc-300">
                            <tr>
                                <td className="py-2 pr-4 font-mono">submission_*</td>
                                <td className="py-2 pr-4">localStorage</td>
                                <td className="py-2">Temporarily saves your partial form entries so you don't lose them if you navigate away.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>3. How to Control Cookies</h2>
                <p>
                    You can review and update your cookie preferences at any time by clicking <strong>"Cookie Settings"</strong> in the footer of any page on this site.
                </p>
                <p>
                    You can also control cookies directly through your browser settings. Most browsers let you view, delete, or block cookies. Note that blocking all cookies may affect site functionality.
                </p>
                <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:underline">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:underline">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:underline">Apple Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:underline">Microsoft Edge</a></li>
                </ul>
                <p>
                    To opt out of Google Analytics specifically across all websites, you can install the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:underline">
                        Google Analytics Opt-out Browser Add-on
                    </a>.
                </p>

                <h2>4. Changes to This Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date.
                </p>

                <h2>5. Contact</h2>
                <p>Questions about this policy? Contact us at <strong>submitklips@gmail.com</strong>.</p>
            </div>
        </div>
    );
}
