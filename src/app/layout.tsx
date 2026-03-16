import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadChatbot from "@/components/LeadChatbot";
import { BUSINESS_CONFIG } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_CONFIG.name} — Serrurier Urgence Toulouse & Baziège — ${BUSINESS_CONFIG.availability}`,
    template: `%s | ${BUSINESS_CONFIG.name}`,
  },
  description: `${BUSINESS_CONFIG.name}, serrurier à Toulouse et Baziège. Dépannage serrurier, ouverture de porte, changement de serrure et sécurisation ${BUSINESS_CONFIG.availability} autour de Toulouse et Baziège.`,
  keywords: [
    "serrurier urgence Toulouse",
    "serrurier Toulouse",
    "serrurier Baziège",
    "ouverture porte claquée Toulouse",
    "serrurier 24h Toulouse",
    "Kaytek Services",
    "serrurier Haute-Garonne",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: BUSINESS_CONFIG.name,
    url: BUSINESS_CONFIG.website,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org LocalBusiness — 2 centres de service
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: BUSINESS_CONFIG.name,
    telephone: BUSINESS_CONFIG.phone,
    email: BUSINESS_CONFIG.email,
    url: BUSINESS_CONFIG.website,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      postalCode: "31000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.6047,
      longitude: 1.4442,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "€€",
    areaServed: [
      "Toulouse", "Blagnac", "Colomiers", "Tournefeuille",
      "Baziège", "Ayguesvives", "Montgiscard", "Villefranche-de-Lauragais",
    ],
    description: `${BUSINESS_CONFIG.name}, serrurier d'urgence à Toulouse et Baziège. Intervention en ${BUSINESS_CONFIG.interventionDelay}, ${BUSINESS_CONFIG.availability}.`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "16",
      bestRating: "5",
    },
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased bg-white text-gray-900`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <LeadChatbot />
      </body>
    </html>
  );
}
