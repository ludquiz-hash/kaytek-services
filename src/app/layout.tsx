import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadChatbot from "@/components/LeadChatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Serrurier Urgence Toulouse — Dépannage 24h/7j | Kaytek Services",
    template: "%s | Kaytek Services",
  },
  description:
    "Serrurier urgence à Toulouse et Baziège. Intervention rapide porte claquée, clé cassée, serrure bloquée. Appelez le 05 82 95 17 42.",
  keywords: [
    "serrurier urgence Toulouse",
    "serrurier Toulouse",
    "serrurier Baziège",
    "ouverture porte claquée Toulouse",
    "serrurier 24h Toulouse",
    "Kaytek Services",
    "serrurier Haute-Garonne",
  ],
  // ── Icônes ──
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png",      sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png",      sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
  },
  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Kaytek Services",
    url: "https://www.kaytek-services.fr",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Kaytek Services — Serrurier Urgence Toulouse",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: "Kaytek Services",
    telephone: "0582951742",
    url: "https://www.kaytek-services.fr",
    areaServed: ["Toulouse", "Baziège"],
    openingHours: "Mo-Su 00:00-24:00",
    priceRange: "€€",
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
        {/* ── Google Tag Manager ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KTL57CZR');`,
          }}
        />
        {/* ── Google Ads / gtag ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11416158362" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-11416158362');
gtag('config', 'AW-11416158362/nRUOCMuhqc0bEJqB08Mq', {
  'phone_conversion_number': '05 82 95 17 42'
});`,
          }}
        />
        {/* ── Schema JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>

      <body className={`${geistSans.variable} antialiased bg-white text-gray-900`}>
        {/* ── GTM noscript ── */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KTL57CZR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <main>{children}</main>
        <Footer />
        <LeadChatbot />
      </body>
    </html>
  );
}
