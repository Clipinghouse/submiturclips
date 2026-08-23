"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LegalBackButton() {
    const router = useRouter();

    return (
        <div className="mb-8 flex items-center gap-4 text-sm font-semibold">
            <button
                onClick={() => router.back()}
                className="text-zinc-400 hover:text-white hover:underline cursor-pointer"
            >
                ← Go Back
            </button>
            <span className="text-zinc-700">|</span>
            <Link
                href="/"
                className="text-zinc-400 hover:text-white hover:underline"
            >
                Home
            </Link>
        </div>
    );
}
