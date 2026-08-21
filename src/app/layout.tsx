import type { Metadata } from "next";
import { Poppins, Poor_Story, Anton } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poorStory.variable} ${anton.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full bg-zinc-950 flex flex-col items-center">
        <div className="w-full max-w-md min-h-screen bg-[var(--color-background)] border-x border-zinc-800 shadow-2xl flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
