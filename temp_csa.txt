import React from 'react';
import BackButton from '../BackButton';

export const metadata = {
    title: 'Content Submission Agreement - SubmitKlips',
    description: 'Content Submission Agreement for submitting clips to Patrick James.',
};

const legalStyles = "max-w-2xl mx-auto px-5 py-16 text-neutral-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2 [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-neutral-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-neutral-300 [&_li]:text-[15px] [&_li]:leading-relaxed [&_strong]:text-white";

export default function ContentSubmissionAgreement() {
    return (
        <div className={legalStyles}>
            <BackButton />

            <h1>Content Submission Agreement</h1>
            <p className="text-neutral-500 text-sm">Last updated: July 26, 2026</p>

            <p>
                Thank you for submitting a clip to Patrick James ("we," "us," "the Channel"). Before you submit, please read this agreement carefully. By submitting a clip through this website, you agree to the terms below.
            </p>

            <h2>1. What You're Agreeing To</h2>
            <p>
                By submitting a video clip ("Clip") through our submission form, you grant us a non-exclusive, worldwide, royalty-free license to use, edit, repost, and share your Clip on our social media channels (including Instagram Reels and similar platforms), for as long as this permission remains in effect.
            </p>
            <p>
                This is not an exclusive agreement. You keep full ownership of your Clip and are free to post it anywhere else, at any time, including before or after we repost it.
            </p>

            <h2>2. No Payment</h2>
            <p>
                Submissions are made on a voluntary, credit-only basis. There is no payment, revenue share, or compensation of any kind for submitting or having your Clip reposted. If you are not comfortable with this, please do not submit.
            </p>

            <h2>3. Credit</h2>
            <p>
                If you selected on-screen credit during submission, we will make a reasonable effort to credit you (e.g., your provided name and/or Instagram handle) when we repost your Clip. Credit format and placement are at our discretion, and technical or human error may occasionally result in missing or incorrect credit — we'll correct this if you let us know.
            </p>
            <p>
                If you did not request credit, your Clip may be reposted without attribution.
            </p>

            <h2>4. Your Confirmations</h2>
            <p>By submitting a Clip, you confirm that:</p>
            <ul>
                <li>You either filmed the Clip yourself, or, if you did not film it, you have personally and substantially edited the footage (e.g., trimmed, captioned, arranged, or otherwise transformed it) and have the legal right and permission to share it and grant this license (e.g., you have the filmed person's/persons' consent, or you own/have rights to any footage you didn't personally shoot). Raw, unedited footage submitted by someone other than the person who filmed it will not be accepted.</li>
                <li>The Clip — regardless of who filmed it — does not contain copyrighted music, copyrighted sound, copyrighted text overlays, or other copyrighted material you don't have rights to use. This applies to the full Clip, including any footage you didn't personally shoot.</li>
                <li>The Clip does not contain graphic violence, nudity, or sexually explicit content.</li>
                <li>The Clip does not otherwise violate any law or infringe on anyone else's rights (including privacy or publicity rights of anyone shown in it).</li>
                <li>You are 18 years of age or older, or if you are under 18, a parent or legal guardian has reviewed and consented to this submission on your behalf.</li>
                <li>The information you provide in the submission form (including any cloud storage link) is accurate and that you have set sharing permissions so we can access and download the Clip.</li>
            </ul>

            <h2>5. What We Can Do With Your Clip</h2>
            <p>Under this license, we may:</p>
            <ul>
                <li>Repost your Clip, in whole or in part, on our channels</li>
                <li>Make minor edits (e.g., cropping, adding captions, trimming length) for formatting purposes</li>
                <li>Choose not to use a submitted Clip for any reason, at our sole discretion</li>
            </ul>
            <p>
                We will not sell your Clip to third parties or license it to unrelated businesses outside of reposting on our own channels.
            </p>

            <h2>6. Removal Requests</h2>
            <p>
                You may request that we stop using your Clip or take down a repost at any time by contacting us at <strong>submitklips@gmail.com</strong>. We will honor removal requests on a going-forward basis as soon as reasonably possible, though we can't guarantee removal from platforms, caches, or third-party reposts/screenshots outside our control once content has been public.
            </p>

            <h2>7. No Guarantee of Use</h2>
            <p>
                Submitting a Clip does not guarantee it will be posted. We may decline submissions for any reason, including content quality, fit with the Channel, or violation of our Content Rules / Terms of Service.
            </p>

            <h2>8. Liability</h2>
            <p>
                You agree to be responsible for any claims, damages, or disputes arising from your Clip's content or from your lack of rights to share it (for example, if someone featured in the Clip did not actually consent to being filmed or shared). We are not responsible for verifying the accuracy of your confirmations in Section 4 beyond what you tell us.
            </p>

            <h2>9. Changes to This Agreement</h2>
            <p>
                We may update this agreement from time to time. Continued submissions after an update means you accept the revised terms. Clips already licensed under a prior version remain governed by the terms in effect at the time of that submission, unless we agree otherwise.
            </p>

            <h2>10. Contact</h2>
            <p>
                Questions about this agreement? Reach us at <strong>submitklips@gmail.com</strong>.
            </p>
            <p className="text-sm text-gray-500">
                This document is a plain-language summary intended for our platform. It is not a substitute for legal advice.
            </p>
        </div>
    );
}
