import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PhoneButton from "@/components/PhoneButton";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import { BUSINESS_CONFIG, SERVICE_ZONES_UNIQUE, SERVICES } from "@/lib/config";

// Données spécifiques par ville (repères locaux, délais estimés)
const zoneData: Record<
  string,
  {
    delai: string;
    repere: string;
    quartiers?: string[];
    descriptionSup?: string;
  }
> = {
  toulouse: {
    delai: "20 à 35 minutes",
    repere: "du capitole, de Saint-Cyprien, de Rangueil ou des Minimes",
    quartiers: ["Capitole", "Saint-Cyprien", "Rangueil", "Minimes", "Lardenne", "Bonnefoy", "Croix-Daurade"],
    descriptionSup: "Toulouse est notre zone principale. Nous connaissons parfaitement les quartiers toulousains et optimisons nos déplacements pour arriver le plus vite possible chez vous.",
  },
  blagnac: {
    delai: "20 à 30 minutes",
    repere: "du centre de Blagnac ou de la zone aéroportuaire",
    quartiers: ["Centre Blagnac", "Aéroport", "Andromède", "Plein Sud"],
  },
  colomiers: {
    delai: "25 à 35 minutes",
    repere: "du centre-ville de Colomiers",
    quartiers: ["Centre", "Ramassiers", "Terrefort"],
  },
  ramonville: {
    delai: "25 à 40 minutes",
    repere: "de Ramonville-Saint-Agne ou du bord du canal",
    quartiers: ["Centre", "Port Sud"],
  },
  balma: {
    delai: "25 à 40 minutes",
    repere: "de Balma ou de Gramont",
    quartiers: ["Centre Balma", "Gramont", "Balma Vidailhan"],
  },
  tournefeuille: {
    delai: "25 à 40 minutes",
    repere: "de Tournefeuille ou de Lardenne",
    quartiers: ["Centre", "L'Arène"],
  },
  muret: {
    delai: "30 à 45 minutes",
    repere: "du centre de Muret",
    quartiers: ["Centre Muret", "Seysses"],
  },
  "castanet-tolosan": {
    delai: "30 à 45 minutes",
    repere: "de Castanet-Tolosan",
  },
  cugnaux: {
    delai: "30 à 45 minutes",
    repere: "de Cugnaux",
  },
  "portet-sur-garonne": {
    delai: "30 à 45 minutes",
    repere: "de Portet-sur-Garonne",
  },
  "l-union": {
    delai: "25 à 40 minutes",
    repere: "de L'Union ou de Gramont",
  },
  labege: {
    delai: "30 à 45 minutes",
    repere: "de Labège ou de la zone Innopole",
  },
  "saint-orens": {
    delai: "30 à 45 minutes",
    repere: "de Saint-Orens-de-Gameville",
  },
  "plaisance-du-touch": {
    delai: "30 à 45 minutes",
    repere: "de Plaisance-du-Touch",
  },
};

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

  return {
    title: `Serrurier Urgence ${zone.name} — Intervention rapide 24h/24`,
    description: `Serrurier d'urgence à ${zone.name}. Porte claquée, clé cassée, serrure bloquée. Intervention en ${zoneData[slug]?.delai || BUSINESS_CONFIG.interventionDelay}. Disponible ${BUSINESS_CONFIG.availability}. Appel : ${BUSINESS_CONFIG.phone}`,
    alternates: {
      canonical: `https://www.kaytek-services.fr/serrurier-urgence/${slug}`,
    },
  };
}

export default async function ZonePage({ params }: PageProps) {
  const { slug } = await params;
  const zone = SERVICE_ZONES_UNIQUE.find((z) => z.slug === slug);
  const data = zoneData[slug];

  if (!zone) {
    notFound();
  }

  const delai = data?.delai || BUSINESS_CONFIG.interventionDelay;
  const repere = data?.repere || `de ${zone.name}`;

  // Schema.org LocalBusiness pour cette zone
  const zoneSchema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: `${BUSINESS_CONFIG.name} — ${zone.name}`,
    telephone: BUSINESS_CONFIG.phone,
    areaServed: zone.name,
    description: `Serrurier d'urgence à ${zone.name}. Intervention en ${delai}, ${BUSINESS_CONFIG.availability}.`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  const faqZone = [
    {
      question: `Quel est le délai d'intervention d'un serrurier à ${zone.name} ?`,
      answer: `Notre délai moyen d'intervention à ${zone.name} est de ${delai}. Dès votre appel, le serrurier le plus proche est dépêché depuis ${repere}.`,
    },
    {
      question: `Intervenez-vous la nuit à ${zone.name} ?`,
      answer: `Oui, nous intervenons ${BUSINESS_CONFIG.availability} à ${zone.name}. Les interventions de nuit (entre 20h et 8h) peuvent faire l'objet d'un supplément qui est toujours annoncé avant intervention.`,
    },
    {
      question: `Quel est le prix d'un serrurier à ${zone.name} ?`,
      answer: `Le prix d'intervention d'un serrurier à ${zone.name} commence à partir de ${BUSINESS_CONFIG.priceFrom}€ pour une ouverture de porte standard. Le tarif définitif est communiqué avant toute intervention.`,
    },
  ];

  const otherZones = SERVICE_ZONES_UNIQUE.filter((z) => z.slug !== slug).slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zoneSchema) }}
      />

      {/* Hero zone */}
      <section className="bg-gray-900 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-orange-400">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-gray-300">Serrurier {zone.name}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            Serrurier urgence {zone.name}<br />
            <span className="text-orange-400">Intervention en {delai}</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl">
            Vous êtes bloqué à {zone.name} ? Notre serrurier intervient en{" "}
            <strong className="text-white">{delai}</strong>{" "}
            {repere}. Disponible{" "}
            <strong className="text-white">{BUSINESS_CONFIG.availability}</strong>.
            Devis gratuit avant intervention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <PhoneButton
              variant="primary"
              size="lg"
              text={`📞 Appeler — ${BUSINESS_CONFIG.phone}`}
            />
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span className="text-green-400 text-lg">⚡</span>
              Départ immédiat après votre appel
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Contenu local */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Serrurier de confiance à {zone.name}
          </h2>
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Vous cherchez un <strong>serrurier à {zone.name}</strong> disponible
              immédiatement ? Notre équipe intervient sur{" "}
              <strong>{zone.name} et ses environs</strong> pour tous vos dépannages
              de serrurerie d&apos;urgence : porte claquée, clé cassée dans la
              serrure, serrure bloquée, ou remplacement de serrure.
            </p>
            <p>
              Basés à Toulouse, nous couvrons{" "}
               <strong>{zone.name} ({zone.centre === "Toulouse" ? "région Toulouse" : "secteur Baziège"})</strong> avec
              un délai moyen d&apos;intervention de <strong>{delai}</strong>. Nous
              intervenons <strong>{BUSINESS_CONFIG.availability}</strong>, y compris
              la nuit, les week-ends et les jours fériés.
            </p>
            {data?.descriptionSup && <p>{data.descriptionSup}</p>}
            <p>
              Avant toute intervention, notre serrurier vous communique le{" "}
              <strong>tarif définitif par téléphone</strong>. Aucune surprise sur
              la facture — nous vous remettons une facture détaillée à l&apos;issue
              de l&apos;intervention.
            </p>
          </div>

          {data?.quartiers && data.quartiers.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-gray-900 mb-3">
                Quartiers et zones couverts à {zone.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.quartiers.map((q) => (
                  <span
                    key={q}
                    className="bg-orange-50 border border-orange-200 text-orange-800 text-sm px-3 py-1 rounded-full"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services disponibles */}
      <section className="py-12 bg-gray-50">
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
                  <p className="font-semibold text-gray-900 text-sm">
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{service.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ zone */}
      <FAQSection items={faqZone} />

      {/* Autres villes */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Serrurier dans les communes voisines
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherZones.map((z) => (
              <Link
                key={z.slug}
                href={`/serrurier/${z.slug}`}
                className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 text-sm px-3 py-2 rounded-lg transition-colors"
              >
                Serrurier {z.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-3">
            Serrurier urgence à {zone.name} — Appel direct
          </h2>
          <p className="text-gray-400 mb-6">
            Intervention en {delai} — {BUSINESS_CONFIG.availability} — Devis
            gratuit
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
