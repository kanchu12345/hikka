import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/db';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyMobileBar from '@/components/StickyMobileBar';

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();

  return {
    title: {
      default: `${settings.businessName} | ${settings.tagline}`,
      template: `%s | ${settings.businessName}`,
    },
    description: settings.heroDescription,
    keywords: [
      'Surf school Hikkaduwa',
      'Surf lessons Hikkaduwa',
      'Surfing Hikkaduwa Sri Lanka',
      'Beginner surf lessons Hikkaduwa',
      'Private surf lessons Hikkaduwa',
      'Hikkaduwa snorkeling',
      'Turtle snorkeling Hikkaduwa',
      'Hikkaduwa fishing tours',
      'Hikkaduwa boat tours',
      'Things to do in Hikkaduwa',
      'Sri Lanka tours from Hikkaduwa',
      'Hikkaduwa airport transfer',
    ],
    authors: [{ name: settings.businessName }],
    creator: settings.businessName,
    metadataBase: new URL('https://hikkasurfschool.com'),
    openGraph: {
      title: `${settings.businessName} | ${settings.tagline}`,
      description: settings.heroDescription,
      url: 'https://hikkasurfschool.com',
      siteName: settings.businessName,
      images: [
        {
          url: settings.heroMedia.url,
          width: 1200,
          height: 630,
          alt: `${settings.businessName} - Surfing in Hikkaduwa`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.businessName} | ${settings.tagline}`,
      description: settings.heroDescription,
      images: [settings.heroMedia.url],
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getSiteSettings();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://hikkasurfschool.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-surf-500 selection:text-white">
        <Navbar settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} />
        <StickyMobileBar settings={settings} />
      </body>
    </html>
  );
}
