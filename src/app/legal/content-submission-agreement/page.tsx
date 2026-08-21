import React from 'react';

export const metadata = {
    title: 'Content Submission Agreement - Submitclips',
    description: 'Content Submission Agreement for submitting clips.',
};

const legalStyles = "max-w-2xl mx-auto px-5 py-16 text-zinc-300 font-poppins " +
    "[&_h1]:text-4xl [&_h1]:font-anton [&_h1]:tracking-wide [&_h1]:text-white [&_h1]:mb-2 " +
    "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-lime-500 [&_h2]:mt-10 [&_h2]:mb-3 " +
    "[&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm " +
    "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-sm [&_li]:leading-relaxed [&_strong]:text-white";

export default function ContentSubmissionAgreement() {
    return (
        <div className="min-h-screen bg-black">
            <div className={legalStyles}>
                <a href="/" className="text-lime-500 text-sm hover:underline mb-8 inline-block font-semibold">← Back Home</a>

                <h1>Content Submission Agreement</h1>
                <p className="text-zinc-500 text-sm mb-8">Last updated: August 2026</p>

                <p>Thank you for submitting a clip to Patrick James ("we," "us," "the Channel"). Before you submit, please read this agreement carefully. By submitting a clip through this website, you agree to the terms below.</p>

                <h2>1. What You're Agreeing To</h2>
                <p>By submitting a video clip ("Clip") through our submission form, you grant us a non-exclusive, worldwide, royalty-free license to use, edit, repost, and share your Clip on our social media channels (including Instagram Reels and similar platforms), for as long as this permission remains in effect. You keep full ownership of your Clip.</p>

                <h2>2. No Payment</h2>
                <p>Submissions are made on a voluntary, credit-only basis. There is no payment, revenue share, or compensation of any kind for submitting or having your Clip reposted.</p>

                <h2>3. Credit</h2>
                <p>If you selected on-screen credit during submission, we will make a reasonable effort to credit you when we repost your Clip. Credit format and placement are at our discretion.</p>

                <h2>4. Your Confirmations</h2>
                <p>By submitting a Clip, you confirm that:</p>
                <ul>
                    <li>You either filmed the Clip yourself, or you have personally and substantially edited the footage and have the legal right and permission to share it.</li>
                    <li>The Clip does not contain copyrighted music, copyrighted sound, copyrighted text overlays, or other copyrighted material you don't have rights to use.</li>
                    <li>The Clip does not contain graphic violence, nudity, or sexually explicit content.</li>
                    <li>The Clip does not otherwise violate any law or infringe on anyone else's rights.</li>
                    <li>You are 18 years of age or older, or if you are under 18, a parent or legal guardian has reviewed and consented.</li>
                </ul>

                <h2>5. What We Can Do With Your Clip</h2>
                <p>Under this license, we may repost your Clip, make minor edits for formatting purposes, or choose not to use a submitted Clip for any reason. We will not sell your Clip to third parties.</p>

                <h2>6. Removal Requests</h2>
                <p>You may request that we stop using your Clip or take down a repost at any time by contacting us at <strong>submitklips@gmail.com</strong>.</p>

                <h2>7. No Guarantee of Use</h2>
                <p>Submitting a Clip does not guarantee it will be posted.</p>

                <h2>8. Liability</h2>
                <p>You agree to be responsible for any claims, damages, or disputes arising from your Clip's content or from your lack of rights to share it.</p>

                <h2>9. Changes to This Agreement</h2>
                <p>We may update this agreement from time to time. Continued submissions after an update means you accept the revised terms.</p>

                <h2>10. Contact</h2>
                <p>Questions about this agreement? Reach us at <strong>submitklips@gmail.com</strong>.</p>
            </div>
        </div>
    );
}
