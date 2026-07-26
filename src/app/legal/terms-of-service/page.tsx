import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service - SubmitKlips',
    description: 'Terms of Service for SubmitKlips, operated by Patrick James.',
};

const legalStyles = "max-w-2xl mx-auto px-5 py-16 text-neutral-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2 [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-neutral-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_li]:text-neutral-300 [&_li]:text-[15px] [&_li]:leading-relaxed [&_strong]:text-white";

export default function TermsOfService() {
    return (
        <div className={legalStyles}>
            <Link href="/" className="text-neutral-400 hover:text-white font-medium pb-2 transition-all block mb-6">&larr; Return to SubmitKlips Form</Link>

            <h1>Terms of Service</h1>
            <p className="text-neutral-500 text-sm">Last updated: July 26, 2026</p>

            <p>
                Welcome to SubmitKlips (the "Site"), operated by Patrick James ("we," "us," "our"). These Terms of Service ("Terms") govern your use of the Site and its clip submission features. By using the Site, you agree to these Terms.
            </p>

            <h2>1. Eligibility</h2>
            <ul>
                <li>You must be at least 13 years old to use the Site.</li>
                <li>If you are under 18, you may only submit content with the consent of a parent or legal guardian, as confirmed during the submission process.</li>
                <li>By using the Site, you confirm that all information you provide (name, age confirmation, etc.) is accurate.</li>
            </ul>

            <h2>2. What the Site Does</h2>
            <p>
                The Site allows users to submit links to video clips (hosted on their own cloud storage, such as Google Drive) for possible reposting on our social media channels. We do not host or store submitted video files on our servers — we only store the link and related submission details you provide.
            </p>

            <h2>3. Acceptable Use</h2>
            <p>When using the Site, you agree not to:</p>
            <ul>
                <li>Submit content that violates our Content Submission Agreement or Content Rules (including copyrighted music/text, graphic violence, nudity, or unlawful content)</li>
                <li>Submit links that contain malware, phishing content, or anything designed to harm our systems or other users</li>
                <li>Impersonate another person or misrepresent your identity, age, or rights to submitted content</li>
                <li>Attempt to interfere with, disrupt, or gain unauthorized access to the Site or its infrastructure</li>
                <li>Use the submission form to spam, harass, or send unsolicited content unrelated to its intended purpose</li>
            </ul>

            <h2>4. Submitted Content and Licensing</h2>
            <p>
                Any Clip you submit is subject to the separate Content Submission Agreement, which explains what rights you grant us and what we may do with your Clip. By submitting through the Site, you agree to both these Terms and that agreement.
            </p>

            <h2>5. Moderation and Discretion</h2>
            <p>We review submissions before reposting. We reserve the right to:</p>
            <ul>
                <li>Accept, reject, or remove any submission for any reason, at our sole discretion</li>
                <li>Edit submitted information (e.g., formatting captions or descriptions) for clarity or consistency</li>
                <li>Suspend or block a submitter from using the Site if they violate these Terms or our Content Rules, including repeat or bad-faith violations</li>
            </ul>
            <p>
                We are not obligated to explain moderation decisions, though we're happy to answer reasonable questions.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
                Submissions rely on links to third-party cloud storage services (e.g., Google Drive) that you control. We are not responsible for:
            </p>
            <ul>
                <li>The availability, permissions, or security of your cloud storage account</li>
                <li>Changes you make to link access after submission (e.g., revoking permissions)</li>
                <li>The practices or terms of those third-party services</li>
            </ul>
            <p>
                You are responsible for keeping your submitted link accessible if you want us to be able to use the Clip.
            </p>

            <h2>7. Intellectual Property of the Site</h2>
            <p>
                The Site's design, branding, and non-user-submitted content are owned by us or our licensors. You may not copy, reproduce, or repurpose Site materials (excluding your own submitted content) without permission.
            </p>

            <h2>8. Disclaimers</h2>
            <p>
                The Site is provided "as is" and "as available," without warranties of any kind, express or implied. We do not guarantee the Site will be uninterrupted, error-free, or secure at all times.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
                To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the Site, including issues related to submitted content, third-party links, or reposted Clips. Our total liability for any claim relating to the Site will not exceed $100 USD.
            </p>

            <h2>10. Indemnification</h2>
            <p>
                You agree to indemnify and hold us harmless from any claims, damages, or expenses (including reasonable legal fees) arising from your submission of content that violates these Terms, the Content Submission Agreement, or any third party's rights.
            </p>

            <h2>11. Termination</h2>
            <p>
                We may suspend or terminate your access to the Site at any time, with or without notice, for conduct that violates these Terms or is otherwise harmful to the Site, other users, or us.
            </p>

            <h2>12. Changes to These Terms</h2>
            <p>
                We may update these Terms from time to time. We will post the updated version on this page with a new "Last updated" date. Continued use of the Site after changes means you accept the revised Terms.
            </p>

            <h2>13. Governing Law</h2>
            <p>
                These Terms are governed by the laws of [Jurisdiction], without regard to conflict-of-law principles.
            </p>

            <h2>14. Contact</h2>
            <p>
                Questions about these Terms? Reach us at <strong>submitklips@gmail.com</strong>.
            </p>
            <p className="text-sm text-gray-500">
                This document is a plain-language summary intended for our platform. It is not a substitute for legal advice.
            </p>
        </div>
    );
}
