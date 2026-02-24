import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MetaSkills.ai - Learn Abilities That Never Expire",
  description: "In a world where technical skills become obsolete every 5 years, meta-skills are your lifelong competitive advantage. Take our assessment to discover your unique ability profile.",
  keywords: ["meta-skills", "personal development", "lifelong learning", "growth mindset", "self-awareness", "critical thinking", "emotional intelligence"],
  authors: [{ name: "MetaSkills Team" }],
  creator: "MetaSkills",
  publisher: "MetaSkills",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://metaskills.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'MetaSkills',
    title: 'MetaSkills.ai - Learn Abilities That Never Expire',
    description: 'In a world where technical skills become obsolete every 5 years, meta-skills are your lifelong competitive advantage.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MetaSkills - Learn Abilities That Never Expire',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetaSkills.ai - Learn Abilities That Never Expire',
    description: 'In a world where technical skills become obsolete every 5 years, meta-skills are your lifelong competitive advantage.',
    images: ['/og-image.png'],
    creator: '@metaskills',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'verification_code',
    // yandex: 'verification_code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        >
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
