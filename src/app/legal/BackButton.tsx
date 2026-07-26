"use client";

export default function BackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="text-neutral-400 hover:text-white font-medium transition-all block mb-6 cursor-pointer"
        >
            &larr; Go Back
        </button>
    );
}
