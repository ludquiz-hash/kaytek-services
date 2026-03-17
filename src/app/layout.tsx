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
  metadataBase: new URL("https://www.kaytek-services.fr"),
  title: {
    default: "Serrurier Urgence Toulouse — Dépannage 24h/7j | Kaytek Services",
    template: "%s | Kaytek Services",
  },
  description:
    "Serrurier urgence à Toulouse et Baziège. Intervention en 20 à 40 min, 24h/24 7j/7. Porte claquée, clé cassée, serrure bloquée. Devis gratuit : 05 82 95 17 42.",
  keywords: [
    "serrurier urgence Toulouse",
    "serrurier Toulouse",
    "serrurier Baziège",
    "ouverture porte claquée Toulouse",
    "serrurier 24h Toulouse",
    "Kaytek Services",
    "serrurier Haute-Garonne",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Kaytek Services",
    url: "https://www.kaytek-services.fr",
    title: "Serrurier Urgence Toulouse 24h/7j | Kaytek Services",
    description:
      "Intervention rapide 20-40 min. Porte claquée, clé cassée. 05 82 95 17 42.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Kaytek Services — Serrurier urgence Toulouse et Baziège",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ── Schema JSON-LD complet Locksmith ──────────────────────────
  const schema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: "Kaytek Services",
    image: "https://www.kaytek-services.fr/logo.png",
    telephone: "+330582951742",
    url: "https://www.kaytek-services.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toulouse",
      addressRegion: "Occitanie",
      postalCode: "31000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.5354974,
      longitude: 1.4924266,
    },
    openingHours: "Mo-Su 00:00-24:00",
    priceRange: "€€",
    areaServed: [
      "Toulouse", "Baziège", "Blagnac", "Colomiers",
      "Castanet-Tolosan", "Ramonville-Saint-Agne",
      "Muret", "Saint-Orens-de-Gameville", "Labège",
      "Escalquens", "Tournefeuille", "Portet-sur-Garonne",
      "Balma", "L'Union", "Launaguet", "Cugnaux",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "16",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.google.com/maps?cid=9664734764436464391",
    ],
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
        {/* ── Schema JSON-LD Locksmith ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {/* ── Suppression badge Kilo ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  function removeKiloBadge(){
    var selectors=['[data-kilo-badge]','[class*="kilo"]','[id*="kilo"]','a[href*="kilo.ai"]','a[href*="kilocode"]'];
    selectors.forEach(function(sel){document.querySelectorAll(sel).forEach(function(el){var txt=el.innerText||el.textContent||'';if(txt.toLowerCase().indexOf('kilo')!==-1||txt.toLowerCase().indexOf('made with')!==-1){el.style.cssText='display:none!important;visibility:hidden!important;opacity:0!important;';}});});
    document.querySelectorAll('*').forEach(function(el){if(window.getComputedStyle(el).position==='fixed'){var txt=el.innerText||el.textContent||'';if(txt.toLowerCase().indexOf('made with kilo')!==-1){el.style.cssText='display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;';}}});
  }
  document.addEventListener('DOMContentLoaded',removeKiloBadge);
  setTimeout(removeKiloBadge,500);setTimeout(removeKiloBadge,1500);
  var obs=new MutationObserver(removeKiloBadge);
  document.addEventListener('DOMContentLoaded',function(){obs.observe(document.body,{childList:true,subtree:true});});
})();`,
          }}
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
