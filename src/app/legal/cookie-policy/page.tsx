import React from 'react';
import LegalBackButton from '@/components/LegalBackButton';

export const metadata = {
    title: 'Cookie Policy - Submitclips',
    description: 'Cookie Policy for Submitclips — what cookies we use and why.',
};

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-2xl mx-auto px-5 py-16 text-zinc-300 font-poppins [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-wide [&_h1]:text-white [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-zinc-100 [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-sm [&_li]:leading-relaxed [&_strong]:text-white">
                <LegalBackButton />

                <h1>Cookie Policy</h1>
                <p className="text-zinc-500 text-xs mb-8">Last updated: August 2026</p>

                <p>
                    This policy explains how <strong>Submitclips</strong> uses browser storage to make our site work and understand how people use it. We keep things simple and only store what we really need.
                </p>

                <h2>The Storage We Use</h2>

                <p><strong>Essential Settings (Always On)</strong></p>
                <p>
                    We save a small file to remember if you've closed our cookie banner, so we don't keep asking you every time you visit. This is required for the site to function properly.
                </p>

                <p><strong>Google Analytics (Required)</strong></p>
                <p>
                    We use Google Analytics to count visits and see which pages are popular. This data doesn't identify you personally, but it's necessary for us to understand our audience and keep the site running.
                </p>

                <p><strong>Form Progress (Optional)</strong></p>
                <p>
                    We temporarily save what you type in the submission form. That way, if you accidentally refresh the page, you won't lose your work. You can turn this off if you prefer.
                </p>

                <h2>Your Choices</h2>
                <p>
                    You can change your mind about the optional "Form Progress" saving at any time. Just click the <strong>Cookie Settings</strong> link at the bottom of our website.
                </p>

                <p>
                    If you want to clear absolutely everything, you can always do that in your browser's settings menu (by clearing site data).
                </p>

            </div>
        </div>
    );
}
