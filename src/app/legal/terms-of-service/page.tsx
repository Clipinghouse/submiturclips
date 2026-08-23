import React from 'react';
import LegalBackButton from '@/components/LegalBackButton';

export const metadata = {
    title: 'Terms of Service - Submitclips',
    description: 'Terms of Service for Submitclips.',
};

const legalStyles = "max-w-2xl mx-auto px-5 py-16 text-zinc-300 font-poppins " +
    "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-wide [&_h1]:text-white [&_h1]:mb-2 " +
    "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-zinc-100 [&_h2]:mt-10 [&_h2]:mb-3 " +
    "[&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-sm " +
    "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-sm [&_li]:leading-relaxed [&_strong]:text-white";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black">
            <div className={legalStyles}>
                <LegalBackButton />

                <h1>Terms of Service</h1>
                <p className="text-zinc-500 text-sm mb-8">Last updated: August 2026</p>

                <p>Welcome to Submitclips (the "Site"), operated by Patrick James ("we," "us," "our"). These Terms of Service ("Terms") govern your use of the Site and its clip submission features. By using the Site, you agree to these Terms.</p>

                <h2>1. Eligibility</h2>
                <ul>
                    <li>You must be at least 13 years old to use the Site.</li>
                    <li>If you are under 18, you may only submit content with the consent of a parent or legal guardian, as confirmed during the submission process.</li>
                    <li>By using the Site, you confirm that all information you provide is accurate.</li>
                </ul>

                <h2>2. What the Site Does</h2>
                <p>The Site allows users to submit links to video clips (hosted on their own cloud storage, such as Google Drive) for possible reposting on our social media channels. We do not host or store submitted video files on our servers — we only store the link and related submission details you provide.</p>

                <h2>3. Acceptable Use</h2>
                <p>When using the Site, you agree not to submit content that violates our Content Submission Agreement (including copyrighted music/text, graphic violence, or unlawful content), not to submit links containing malware, and not to impersonate another person.</p>

                <h2>4. Submitted Content and Licensing</h2>
                <p>Any Clip you submit is subject to the separate Content Submission Agreement, which explains what rights you grant us and what we may do with your Clip.</p>

                <h2>5. Moderation and Discretion</h2>
                <p>We review submissions before reposting. We reserve the right to accept, reject, or remove any submission for any reason, at our sole discretion, and we may edit submitted information for clarity.</p>

                <h2>6. Third-Party Links</h2>
                <p>Submissions rely on links to third-party cloud storage services that you control. We are not responsible for the availability, permissions, or security of your cloud storage account.</p>

                <h2>7. Intellectual Property of the Site</h2>
                <p>The Site's design, branding, and non-user-submitted content are owned by us or our licensors.</p>

                <h2>8. Disclaimers</h2>
                <p>The Site is provided "as is" and "as available," without warranties of any kind, express or implied.</p>

                <h2>9. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the Site.</p>

                <h2>10. Indemnification</h2>
                <p>You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your submission of content that violates these Terms or any third party's rights.</p>

                <h2>11. Termination</h2>
                <p>We may suspend or terminate your access to the Site at any time, with or without notice.</p>

                <h2>12. Changes to These Terms</h2>
                <p>We may update these Terms from time to time. Continued use of the Site after changes means you accept the revised Terms.</p>

                <h2>13. Contact</h2>
                <p>Questions about these Terms? Reach us at <strong>submitklips@gmail.com</strong>.</p>
            </div>
        </div>
    );
}
