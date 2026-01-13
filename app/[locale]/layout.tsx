import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import "@/styles/globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: {
      default: "Sa7a Box — Premium High-Protein Meals for Athletes & Hustlers",
      template: "%s | Sa7a Box",
    },
    description: "Premium high-protein meals designed for athletes and hustlers. Gym pickup and fast delivery across Tunisia. Fuel your body with Sa7a Box.",
    keywords: [
      "high protein meals Tunisia",
      "fitness meals Tunisia",
      "healthy meal delivery Tunisia",
      "gym meals Tunisia",
      "performance nutrition Tunisia",
      "meal prep Tunisia",
      "athlete meals Tunisia",
      "healthy food gym",
      "bodybuilding meals Tunisia",
      "clean eating Tunisia",
      "macro meals Tunisia",
      "Sa7a Box",
      "Sa7abox",
      "Sa7a nutrition",
      "Sa7a meals",
    ],
    authors: [{ name: "Sa7a Box" }],
    creator: "Sa7a Box",
    publisher: "Sa7a Box",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://sa7abox.tn"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "fr-TN": "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["fr_TN"],
      url: "https://sa7abox.tn",
      siteName: "Sa7a Box",
      title: "Sa7a Box — Premium High-Protein Meals",
      description: "Fuel your hustle with premium high-protein meals. Gym pickup & fast delivery across Tunisia.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Sa7a Box — Premium High-Protein Meals",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sa7a Box — Fuel Your Hustle",
      description: "Premium high-protein meals for athletes. Gym pickup & fast delivery across Tunisia.",
      images: ["/og-image.jpg"],
      creator: "@sa7abox",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
    },
  };
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Sa7a Box",
    description: "Premium high-protein meals for athletes and hustlers with gym pickup and fast delivery across Tunisia.",
    servesCuisine: "Healthy, Fitness, High-Protein",
    brand: "Sa7a Box",
    slogan: "Fuel Your Hustle",
    url: "https://sa7abox.tn",
    sameAs: [
      "https://instagram.com/sa7abox",
      "https://tiktok.com/@sa7abox",
    ],
    areaServed: "Tunisia",
  };

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
 
  const validLocale = locale as Locale;
  const messages = await getMessages({ locale: validLocale });

  return (
    <html lang={validLocale} className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={validLocale} >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}