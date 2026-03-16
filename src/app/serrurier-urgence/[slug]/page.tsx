import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PhoneButton from "@/components/PhoneButton";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import {
  BUSINESS_CONFIG,
  SERVICE_ZONES_UNIQUE,
  ZONES_TOULOUSE,
  ZONES_BAZIEGE,
  SERVICES,
} from "@/lib/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_ZONES_UNIQUE.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const zone = SERVICE_ZONES_UNIQUE.find((z) => z.slug === slug);
  if (!zone) return {};

  const centreLabel =
    zone.centre === "Toulouse"
      ? "intervention rapide depuis Toulouse"
      : "intervention rapide depuis Baziège";

  return {
    title: `Serrurier urgence ${zone.name} – Dépannage porte claquée & clé cassée`,
    description: `${BUSINESS_CONFIG.name}, serrurier d'urgence à ${zone.name}. Porte claquée, clé cassée, serrure bloquée — ${centreLabel}. Appelez le ${BUSINESS_CONFIG.phone}, disponible ${BUSINESS_CONFIG.availability}.`,
    alternates: {
      canonical: `${BUSINESS_CONFIG.website}/serrurier-urgence/${slug}`,
    },
  };
}

export default async function LocalPage({ params }: PageProps) {
  const { slug } = await params;
  const zone = SERVICE_ZONES_UNIQUE.find((z) => z.slug === slug);
  if (!zone) notFound();

  const isToulouse = zone.centre === "Toulouse";
  const centreLabel = isToulouse ? "Toulouse" : "Baziège";
  const centreDistance = isToulouse
    ? `${zone.distanceToulouse ?? "moins de 20"} km de Toulouse`
    : `${zone.distanceBaziege ?? "moins de 20"} km de Baziège`;

  // Zones proches du même centre (liens maillage interne)
  const sameZones = (isToulouse ? ZONES_TOULOUSE : ZONES_BAZIEGE)
    .filter((z) => z.slug !== zone.slug)
    .slice(0, 8);

  // Schema.org LocalBusiness
  const schema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: `${BUSINESS_CONFIG.name} — Serrurier ${zone.name}`,
    telephone: BUSINESS_CONFIG.phone,
    url: `${BUSINESS_CONFIG.website}/serrurier-urgence/${slug}`,
    areaServed: zone.name,
    description: `Serrurier d'urgence à ${zone.name}. ${BUSINESS_CONFIG.name} intervient depuis ${centreLabel}, ${BUSINESS_CONFIG.availability}.`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  const faqItems = [
    {
      question: `Quel est le délai d'intervention d'un serrurier à ${zone.name} ?`,
      answer: `${BUSINESS_CONFIG.name} intervient à ${zone.name} depuis ${centreLabel}, soit environ ${centreDistance}. Comptez ${BUSINESS_CONFIG.interventionDelay} après votre appel. Nous sommes disponibles ${BUSINESS_CONFIG.availability}.`,
    },
    {
      question: `Quel est le prix d'un serrurier à ${zone.name} ?`,
      answer: `L'intervention d'un serrurier à ${zone.name} commence à partir de ${BUSINESS_CONFIG.priceFrom}€ (extraction clé cassée). L'ouverture de porte claquée est à partir de 89€. Le tarif définitif est toujours communiqué avant intervention.`,
    },
    {
      question: `Intervenez-vous la nuit à ${zone.name} ?`,
      answer: `Oui, ${BUSINESS_CONFIG.name} intervient ${BUSINESS_CONFIG.availability} à ${zone.name}, y compris la nuit, les week-ends et jours fériés. Un supplément de nuit peut s'appliquer, toujours annoncé avant déplacement.`,
    },
    {
      question: `Pouvez-vous ouvrir une porte sans l'abîmer à ${zone.name} ?`,
      answer: `Dans la très grande majorité des cas de porte claquée à ${zone.name}, notre serrurier ouvre sans casse grâce aux techniques de crochetage professionnel. Si la serrure est endommagée, nous proposons un remplacement sur place.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* HERO */}
      <section className="bg-gray-900 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          {/* Fil d'Ariane */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-orange-400">Accueil</Link>
            <span>/</span>
            <Link href="/#zones" className="hover:text-orange-400">Zones d&apos;intervention</Link>
            <span>/</span>
            <span className="text-gray-300">Serrurier {zone.name}</span>
          </nav>

          <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Rattaché à {centreLabel}
          </div>

          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            Serrurier d&apos;urgence à {zone.name}
          </h1>

          <p className="text-gray-300 text-lg mb-6 max-w-2xl">
            <strong className="text-white">{BUSINESS_CONFIG.name}</strong> intervient à{" "}
            <strong className="text-white">{zone.name}</strong> pour tous vos dépannages de
            serrurerie : porte claquée, clé cassée, serrure bloquée. Intervention rapide
            depuis {centreLabel} ({centreDistance}), disponible{" "}
            <strong className="text-white">{BUSINESS_CONFIG.availability}</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <PhoneButton
              variant="primary"
              size="lg"
              text={`📞 Appeler — ${BUSINESS_CONFIG.phone}`}
            />
            <div className="text-sm text-gray-400 flex items-center gap-2 py-2">
              <span className="text-green-400 text-lg">⚡</span>
              Intervention en {BUSINESS_CONFIG.interventionDelay}
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* CONTENU LOCAL SEO */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Serrurier agréé à {zone.name} — Dépannage urgence
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Vous êtes bloqué à <strong>{zone.name}</strong> et avez besoin d&apos;un
              serrurier d&apos;urgence ? <strong>{BUSINESS_CONFIG.name}</strong> est
              votre serrurier de confiance, disponible{" "}
              <strong>{BUSINESS_CONFIG.availability}</strong>. Nous intervenons à{" "}
              <strong>{zone.name}</strong> et dans toutes les communes voisines pour
              tous vos dépannages : <strong>porte claquée</strong>,{" "}
              <strong>clé cassée dans la serrure</strong>,{" "}
              <strong>serrure bloquée ou endommagée</strong>.
            </p>
            <p>
              Notre serrurier part depuis {centreLabel} dès réception de votre appel
              et arrive à <strong>{zone.name}</strong> en{" "}
              <strong>{BUSINESS_CONFIG.interventionDelay}</strong> en moyenne. Avant
              toute intervention, nous vous communiquons le{" "}
              <strong>tarif définitif par téléphone</strong> — aucune surprise sur la
              facture.
            </p>
            <p>
              Que vous ayez besoin d&apos;une simple ouverture de porte ou d&apos;un
              remplacement complet de serrure à {zone.name},{" "}
              {BUSINESS_CONFIG.name} est équipé pour tout type de serrure (cylindre
              européen, serrure 3 points, serrure blindée, serrure haute sécurité).
            </p>
            <p className="font-semibold text-gray-900">
              Appelez le{" "}
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="text-orange-600 hover:text-orange-700 underline"
              >
                {BUSINESS_CONFIG.phone}
              </a>{" "}
              pour un dépannage serrurier d&apos;urgence à {zone.name}{" "}
              (intervention rapide depuis {centreLabel}).
            </p>
          </div>

          {/* Tarifs rapides */}
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">Tarifs indicatifs à {zone.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Porte claquée</p>
                <p className="font-black text-orange-600">à partir de 89€</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Clé cassée</p>
                <p className="font-black text-orange-600">à partir de 69€</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Serrure bloquée</p>
                <p className="font-black text-orange-600">à partir de 79€</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Remplacement serrure</p>
                <p className="font-black text-orange-600">à partir de 129€</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              * Tarifs donnés à titre indicatif. Prix définitif communiqué avant intervention.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Nos services à {zone.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-4 flex items-start gap-3 transition-all"
              >
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{service.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{service.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ locale */}
      <FAQSection items={faqItems} />

      {/* MAILLAGE INTERNE — autres communes du même centre */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Serrurier urgence dans les communes proches de {zone.name}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Nous intervenons également dans toutes ces communes (zone {centreLabel})
          </p>
          <div className="flex flex-wrap gap-2">
            {sameZones.map((z) => (
              <Link
                key={z.slug}
                href={`/serrurier-urgence/${z.slug}`}
                className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 text-sm px-3 py-2 rounded-lg transition-colors"
              >
                Serrurier {z.name}
              </Link>
            ))}
            <Link
              href="/#zones"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-2 rounded-lg transition-colors"
            >
              Voir toutes les zones →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-3">
            Serrurier urgence à {zone.name} — Appel direct
          </h2>
          <p className="text-gray-400 mb-6">
            {BUSINESS_CONFIG.availability} — Intervention depuis {centreLabel} — Devis gratuit
          </p>
          <PhoneButton
            variant="primary"
            size="lg"
            text={`📞 ${BUSINESS_CONFIG.phone}`}
          />
        </div>
      </section>
    </>
  );
}
