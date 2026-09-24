import type { Metadata } from "next";
import { Poppins, Poor_Story, Anton } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { getGtmId } from "@/config/gtm";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poorStory = Poor_Story({
  variable: "--font-poor-story",
  subsets: ["latin"],
  weight: "400",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SubmitUrClips",
  description: "Submit your best clips to our platform easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = getGtmId();
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poorStory.variable} ${anton.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
try {
  var val = localStorage.getItem('cookie_consent_analytics');
  if (val === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch(e) {}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
      </head>
      <body className="min-h-full bg-zinc-950 flex flex-col items-center">
        {gtmId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            }}
          />
        )}
        <CookieConsent />
        <div className="w-full max-w-md min-h-screen bg-[var(--color-background)] border-x border-zinc-800 shadow-2xl flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
