import React from 'react';
import { Lock, BarChart, Save } from 'lucide-react';

export const metadata = {
    title: 'Cookie Policy - Submitclips',
    description: 'Cookie Policy for Submitclips — what cookies we use and why.',
};

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-xl mx-auto px-5 py-12 text-zinc-300 font-poppins">
                <a href="/" className="text-lime-500 text-sm hover:underline mb-8 inline-block font-semibold">← Back Home</a>

                <h1 className="text-3xl font-anton tracking-wide text-white mb-2">Cookie Policy</h1>
                <p className="text-zinc-500 text-xs mb-8">Last updated: August 2026</p>

                <p className="text-sm leading-relaxed mb-6">
                    This policy explains how <strong>Submitclips</strong> uses browser storage to make our site work and understand how people use it. We keep things simple and only store what we really need.
                </p>

                <h2 className="text-lg font-bold text-lime-500 mt-10 mb-4">The Storage We Use</h2>

                {/* Essential */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 shrink-0 mb-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-white" />
                            <h3 className="text-white text-sm font-semibold">Essential Settings</h3>
                        </div>
                        <span className="text-[10px] font-semibold text-black bg-lime-500 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">Always On</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                        We save a small file to remember if you've closed our cookie banner, so we don't keep asking you every time you visit. This is required for the site to function properly.
                    </p>
                </div>

                {/* Analytics */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 shrink-0 mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <BarChart className="w-4 h-4 text-white" />
                            <h3 className="text-white text-sm font-semibold">Google Analytics</h3>
                        </div>
                        <span className="text-[10px] font-semibold text-black bg-lime-500 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">Required</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                        We use Google Analytics to count visits and see which pages are popular. This data doesn't identify you personally, but it's necessary for us to understand our audience and keep the site running.
                    </p>
                </div>

                {/* Functional */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 shrink-0 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Save className="w-4 h-4 text-white" />
                            <h3 className="text-white text-sm font-semibold">Form Progress</h3>
                        </div>
                        <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-700 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">Optional</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mt-2">
                        We temporarily save what you type in the submission form. That way, if you accidentally refresh the page, you won't lose your work. You can turn this off if you prefer.
                    </p>
                </div>

                <h2 className="text-lg font-bold text-lime-500 mt-10 mb-4">Your Choices</h2>
                <p className="text-sm leading-relaxed mb-4">
                    You can change your mind about the optional "Form Progress" saving at any time. Just click the <strong>Cookie Settings</strong> link at the bottom of our website.
                </p>

                <p className="text-sm leading-relaxed mb-10">
                    If you want to clear absolutely everything, you can always do that in your browser's settings menu (by clearing site data).
                </p>

            </div>
        </div>
    );
}
