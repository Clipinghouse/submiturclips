import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy - SubmitKlips',
    description: 'Privacy Policy for SubmitKlips, operated by Patrick James.',
};

const legalStyles = "max-w-2xl mx-auto px-5 py-16 text-neutral-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2 [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-neutral-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-neutral-300 [&_li]:text-[15px] [&_li]:leading-relaxed [&_strong]:text-white";

export default function PrivacyPolicy() {
    return (
        <div className={legalStyles}>
            <Link href="/" className="text-neutral-400 hover:text-white font-medium pb-2 transition-all block mb-6">&larr; Return to SubmitKlips Form</Link>

            <h1>Privacy Policy</h1>
            <p className="text-neutral-500 text-sm">Last updated: July 26, 2026</p>

            <p>
                This Privacy Policy explains how Patrick James ("we," "us," "our") collects, uses, and protects information when you use SubmitKlips (the "Site") to submit a clip.
            </p>

            <h2>1. Information We Collect</h2>
            <p>When you submit a Clip through our form, we collect:</p>
            <ul>
                <li>Name (the name you'd like credited, and/or your legal name if different)</li>
                <li>Email address (if collected, for contacting you about your submission)</li>
                <li>Clip link (a link to your video hosted on your own cloud storage, such as Google Drive)</li>
                <li>Description and filming details you provide (e.g., filming location, whether you filmed it yourself, optional caption/description)</li>
                <li>Age confirmation (18+, or guardian consent details if under 18)</li>
                <li>Basic technical data (such as IP address and browser type) automatically collected for site security and analytics purposes</li>
            </ul>

            <h2>2. What We Don't Collect</h2>
            <p>
                We do not store your video file on our servers. We only store the link you provide and access it (or download a copy solely for reposting purposes, if selected) via the permissions you set. We do not require payment information, as the Site is free to use.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
                <li>Review and consider your Clip for reposting</li>
                <li>Credit you on reposts, if you requested credit</li>
                <li>Contact you about your submission, if needed</li>
                <li>Maintain the security and functioning of the Site</li>
                <li>Comply with legal obligations (e.g., verifying age/guardian consent)</li>
            </ul>
            <p>
                We do not sell your personal information to third parties.
            </p>

            <h2>4. Third-Party Links and Services</h2>
            <p>
                Your Clip link points to a third-party cloud storage service (e.g., Google Drive) that you control. Once you paste that link into our form, our access to your Clip depends on the permissions you set. We are not responsible for the privacy practices of your chosen cloud storage provider — please review their privacy policy separately.
            </p>
            <p>
                We may use third-party service providers for site hosting (e.g., Vercel) and basic analytics. These providers may process limited technical data (such as IP address) as part of delivering the Site to you.
            </p>

            <h2>5. Data Retention</h2>
            <p>
                We retain your submission information for as long as reasonably necessary to consider, credit, and manage your Clip, or until you request deletion (see Section 6). If your Clip is not selected for reposting, we may retain basic submission records for a limited period for moderation and record-keeping purposes, after which they may be deleted.
            </p>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (note: this does not automatically remove a Clip already reposted — see our Content Submission Agreement for removal requests)</li>
                <li>Withdraw consent for future use of your information</li>
            </ul>
            <p>
                To exercise these rights, contact us at <strong>submitklips@gmail.com</strong>. We will respond within a reasonable timeframe, consistent with applicable law.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
                Submissions from users under 18 require parent or legal guardian consent, collected as part of the age gate step. We do not knowingly collect personal information from children under 13 without guardian involvement. If you believe a child has submitted information without appropriate consent, contact us at <strong>submitklips@gmail.com</strong> and we will address it.
            </p>

            <h2>8. Data Security</h2>
            <p>
                We take reasonable measures to protect the information you provide, but no method of transmission or storage is 100% secure. We cannot guarantee absolute security.
            </p>

            <h2>9. Cookies</h2>
            <p>
                We use cookies for basic site functionality and analytics. See our [Cookie Consent Notice] for details and choices.
            </p>

            <h2>10. International Users</h2>
            <p>
                If you access the Site from outside [Country/Jurisdiction], your information may be processed in [Country/Jurisdiction]. By using the Site, you consent to this transfer.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will post the updated version on this page with a new "Last updated" date.
            </p>

            <h2>12. Contact</h2>
            <p>
                Questions about this Privacy Policy or your data? Reach us at <strong>submitklips@gmail.com</strong>.
            </p>
            <p className="text-sm text-gray-500">
                This document is a general template intended for our small, non-commercial submission platform.
            </p>
        </div>
    );
}
