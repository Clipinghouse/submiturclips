"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        // If there's browser history (came from same tab), go back
        if (window.history.length > 1) {
            router.back();
        } else {
            // Opened in new tab (from form), just go to home
            router.push("/");
        }
    };

    return (
        <button
            onClick={handleBack}
            className="text-neutral-400 hover:text-white font-medium transition-all block mb-6 cursor-pointer"
        >
            &larr; Go Back
        </button>
    );
}
