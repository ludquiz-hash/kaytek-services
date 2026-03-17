import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PhoneButton from "@/components/PhoneButton";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/phone";
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

// ─── Intros uniques par ville (éviter duplicate content) ──────────────────
const INTROS: Record<string, string> = {
  toulouse: "Capitale de l'Occitanie, Toulouse concentre des milliers d'interventions serrurier chaque année. Que vous soyez dans le Capitole, à Saint-Cyprien, aux Minimes ou à Rangueil, Kaytek Services vous répond immédiatement et arrive en moins de 40 minutes.",
  blagnac: "À deux pas de l'aéroport Toulouse-Blagnac, notre équipe couvre Blagnac et ses quartiers résidentiels (Andromède, Plein Sud, centre-ville). Résidents comme professionnels, nous intervenons jour et nuit.",
  colomiers: "Deuxième ville de Haute-Garonne, Colomiers est une zone à forte densité résidentielle. Kaytek Services intervient dans tous les quartiers de Colomiers, du centre aux Ramassiers, en moins de 35 minutes depuis Toulouse.",
  tournefeuille: "Ville résidentielle de l'ouest toulousain, Tournefeuille fait partie de notre zone prioritaire. Notre serrurier part de Toulouse pour atteindre Tournefeuille en moins de 30 minutes, quelle que soit l'heure.",
  "plaisance-du-touch": "Plaisance-du-Touch, à l'ouest de Toulouse, est couverte par notre équipe en moins de 40 minutes. Interventions toutes urgences : porte claquée, clé cassée ou serrure endommagée.",
  leguevin: "Léguevin, aux portes de la métropole toulousaine, bénéficie de notre service d'urgence. Nous intervenons depuis Toulouse en moins de 40 minutes sur toute la commune.",
  pibrac: "Pibrac et ses environs sont dans notre rayon d'action habituel. Notre serrurier arrive en moins de 35 minutes pour tout dépannage urgent à Pibrac.",
  cornebarrieu: "Proche de l'aéroport, Cornebarrieu est desservie rapidement par Kaytek Services. Intervention toutes urgences en moins de 30 minutes depuis notre base toulousaine.",
  fenouillet: "Fenouillet, au nord de Toulouse, est dans notre zone d'intervention rapide. Nous couvrons toute la commune pour tout problème de serrure, 24h/24.",
  "saint-alban": "Saint-Alban est une commune résidentielle du nord-est toulousain. Kaytek Services y intervient en moins de 25 minutes pour vos urgences serrurie.",
  "l-union": "L'Union, à l'est de Toulouse, est l'une de nos zones d'intervention les plus fréquentes. Notre serrurier arrive en moins de 25 minutes pour débloquer votre situation.",
  balma: "Balma et le secteur de Gramont font partie de notre zone prioritaire est. Intervention rapide de Kaytek Services en moins de 25 minutes sur toute la commune.",
  "quint-fonsegrives": "Quint-Fonsegrives est une commune résidentielle à l'est de Toulouse. Nous y intervenons en moins de 30 minutes pour toutes urgences serrurier.",
  "pin-balma": "Pin-Balma, commune proche de Balma, est intégrée à notre zone est. Notre serrurier vous rejoint en moins de 30 minutes.",
  flourens: "Flourens est une petite commune à l'est de Toulouse, incluse dans notre rayon d'intervention. Délai moyen : 35 minutes depuis Toulouse.",
  mondouzil: "Mondouzil, commune rurale de l'est toulousain, est dans notre périmètre d'intervention. Nous nous déplaçons jusqu'à Mondouzil pour toute urgence serrurier.",
  montrabe: "Montrabé est une commune résidentielle de l'est toulousain. Kaytek Services y intervient en moins de 30 minutes pour vos urgences serrurerie.",
  verfeil: "Verfeil, à la limite du rayon de 20 km, reste dans notre zone de desserte. Intervention serrurier sur Verfeil sous 40 minutes.",
  aucamville: "Aucamville est une commune du nord de Toulouse avec une forte densité résidentielle. Nos serruriers interviennent à Aucamville en moins de 25 minutes.",
  beauzelle: "Beauzelle, commune en bord de Garonne, est dans notre zone nord-ouest. Intervention rapide en moins de 30 minutes depuis Toulouse.",
  aussonne: "Aussonne est une commune du nord-ouest toulousain couverte par Kaytek Services. Délai d'intervention moyen : 35 minutes.",
  seilh: "Seilh, près de l'aéroport, fait partie de notre zone nord. Nous intervenons à Seilh pour tout dépannage serrurier en moins de 35 minutes.",
  "gagnac-sur-garonne": "Gagnac-sur-Garonne est une commune du nord toulousain dans notre rayon d'intervention. Kaytek Services arrive en moins de 35 minutes.",
  castelginest: "Castelginest est une commune résidentielle du nord de Toulouse. Notre serrurier arrive en moins de 25 minutes sur toute la commune.",
  bruguieres: "Bruguières est à la limite nord de notre zone de desserte. Malgré la distance, Kaytek Services s'engage à intervenir en moins de 40 minutes.",
  launaguet: "Launaguet, au nord de Toulouse, fait partie de nos zones d'intervention régulières. Délai moyen : moins de 25 minutes.",
  "saint-jean": "Saint-Jean est une commune du nord-est toulousain. Kaytek Services y intervient en moins de 35 minutes pour vos urgences serrurier.",
  pechbonnieu: "Pechbonnieu est une commune résidentielle du nord de Toulouse. Notre serrurier arrive en moins de 35 minutes pour tout problème de serrure.",
  labege: "Labège, commune de l'est toulousain proche de l'Innopole, est couverte par notre service. Interventions rapides en moins de 30 minutes.",
  "castanet-tolosan": "Castanet-Tolosan est l'une des communes les plus peuplées du sud-est toulousain. Kaytek Services y intervient en moins de 35 minutes, toute l'année.",
  "ramonville-saint-agne": "Ramonville-Saint-Agne, terminus de la ligne B du métro, est dans notre zone prioritaire. Notre serrurier arrive en moins de 25 minutes.",
  escalquens: "Escalquens est une commune résidentielle du sud-est toulousain. Kaytek Services couvre toute la commune en moins de 35 minutes.",
  auzielle: "Auzielle est une commune rurale à l'est de Toulouse. Nous intervenons à Auzielle en moins de 40 minutes pour tout dépannage serrurier urgent.",
  cugnaux: "Cugnaux, au sud-ouest de Toulouse, est une commune résidentielle que nous couvrons régulièrement. Intervention en moins de 35 minutes.",
  "villeneuve-tolosane": "Villeneuve-Tolosane est une commune du sud-ouest toulousain dans notre zone de desserte. Délai d'intervention : moins de 35 minutes.",
  roques: "Roques est une commune industrielle et résidentielle du sud. Kaytek Services intervient à Roques en moins de 35 minutes.",
  "portet-sur-garonne": "Portet-sur-Garonne, commune au sud de Toulouse sur les bords de Garonne, est couverte par notre service d'urgence. Délai : moins de 30 minutes.",
  muret: "Muret, sous-préfecture de Haute-Garonne, est notre point le plus au sud dans la zone Toulouse. Notre serrurier y arrive en moins de 40 minutes.",
  seysses: "Seysses est une commune du sud toulousain, à la limite de notre zone de desserte. Nous y intervenons pour toute urgence serrurier en moins de 40 minutes.",
  fonsorbes: "Fonsorbes est une commune résidentielle à l'ouest de Toulouse. Kaytek Services intervient à Fonsorbes en moins de 40 minutes.",
  frouzins: "Frouzins est une petite commune au sud-ouest de Toulouse. Nous couvrons Frouzins pour toute urgence serrurier dans notre rayon de 20 km.",
  "sainte-foy-de-peyrolieres": "Sainte-Foy-de-Peyrolières est une commune rurale à l'ouest de Toulouse. Malgré la distance, Kaytek Services intervient en moins de 40 minutes.",
  brax: "Brax est une commune résidentielle à l'ouest de Toulouse. Notre serrurier arrive à Brax en moins de 40 minutes pour tout problème de serrure.",
  "saint-lys": "Saint-Lys est une commune à la limite ouest de notre zone. Nous intervenons à Saint-Lys pour toutes les urgences serrurier dans notre rayon de 20 km.",
  // ── Zone Baziège ──
  baziege: "Baziège est notre second centre d'intervention, idéalement situé sur l'axe Toulouse-Castelnaudary. Kaytek Services est basé à Baziège et peut intervenir en moins de 15 minutes sur la commune et ses alentours immédiats.",
  ayguesvives: "Ayguesvives est une commune voisine de Baziège, distante de seulement 4 km. Notre serrurier arrive en moins de 10 minutes pour toute urgence à Ayguesvives.",
  montgiscard: "Montgiscard est une commune proche de Baziège (5 km). Kaytek Services y intervient en moins de 15 minutes pour tout dépannage serrurier.",
  "montesquieu-lauragais": "Montesquieu-Lauragais est une commune du Lauragais dans notre rayon Baziège. Intervention en moins de 20 minutes pour vos urgences serrurerie.",
  villenouvelle: "Villenouvelle est une petite commune du Lauragais à 10 km de Baziège. Notre serrurier y arrive en moins de 20 minutes.",
  "labastide-beauvoir": "Labastide-Beauvoir, commune du Lauragais, est dans notre zone Baziège. Kaytek Services intervient en moins de 20 minutes.",
  montlaur: "Montlaur est une commune du Lauragais à 11 km de Baziège. Nous couvrons Montlaur pour toutes les urgences serrurier.",
  mauremont: "Mauremont est une commune rurale proche de Baziège. Notre serrurier arrive en moins de 25 minutes pour tout problème de serrure.",
  donneville: "Donneville est une commune à 6 km de Baziège. Kaytek Services intervient à Donneville en moins de 15 minutes.",
  fourquevaux: "Fourquevaux est une commune du Lauragais dans notre zone Baziège. Intervention urgence serrurier en moins de 20 minutes.",
  auterive: "Auterive est une commune plus éloignée, à 18 km de Baziège. Nous y intervenons pour toute urgence serrurier en moins de 35 minutes.",
  nailloux: "Nailloux, connue pour son outlet shopping, est à 15 km de Baziège. Kaytek Services intervient à Nailloux en moins de 30 minutes.",
  "villefranche-de-lauragais": "Villefranche-de-Lauragais, commune historique du Lauragais, est dans notre zone Baziège. Intervention en moins de 25 minutes.",
  gardouch: "Gardouch est une commune du Lauragais à 9 km de Baziège. Notre serrurier arrive en moins de 20 minutes.",
  preserville: "Préserville est une commune proche de Baziège (6 km). Kaytek Services intervient à Préserville en moins de 15 minutes.",
  pompertuzat: "Pompertuzat est une commune résidentielle à 5 km de Baziège. Intervention rapide en moins de 15 minutes.",
  belberaud: "Belberaud est une commune à 7 km de Baziège dans notre zone de desserte. Délai d'intervention : moins de 20 minutes.",
  corronsac: "Corronsac est une commune à 8 km de Baziège. Nous intervenons à Corronsac pour toute urgence serrurier en moins de 20 minutes.",
  "clermont-le-fort": "Clermont-le-Fort est une commune au sud-est de Baziège, à 12 km. Intervention urgence serrurier en moins de 25 minutes.",
  "lacroix-falgarde": "Lacroix-Falgarde est une commune en bord de l'Ariège, à 14 km de Baziège. Notre serrurier arrive en moins de 30 minutes.",
  pinsaguel: "Pinsaguel est une commune au confluent de la Garonne et de l'Ariège, à 15 km de Baziège. Intervention en moins de 30 minutes.",
  vernet: "Vernet est une petite commune proche de Baziège. Kaytek Services intervient à Vernet pour toute urgence serrurerie.",
  "saint-orens-de-gameville": "Saint-Orens-de-Gameville est une grande commune résidentielle du sud-est de Toulouse, à 13 km de Baziège. Notre serrurier arrive en moins de 25 minutes.",
};

export async function generateStaticParams() {
  return SERVICE_ZONES_UNIQUE.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const zone = SERVICE_ZONES_UNIQUE.find((z) => z.slug === slug);
  if (!zone) return {};

  const centreLabel = zone.centre === "Toulouse" ? "Toulouse" : "Baziège";

  return {
    title: `Serrurier Urgence ${zone.name} — Intervention Rapide 24h/7j`,
    description: `Serrurier urgence à ${zone.name}. Intervention 20-40 min, 24h/24 7j/7. Porte claquée, clé cassée, serrure bloquée. Appelez le ${BUSINESS_CONFIG.phone}. Intervention rapide depuis ${centreLabel}.`,
    alternates: {
      canonical: `https://www.kaytek-services.fr/serrurier-urgence/${slug}`,
    },
    openGraph: {
      title: `Serrurier Urgence ${zone.name} 24h/7j | Kaytek Services`,
      description: `Serrurier d'urgence à ${zone.name}. Intervention en 20-40 min depuis ${centreLabel}. Appelez le ${BUSINESS_CONFIG.phone}.`,
      url: `https://www.kaytek-services.fr/serrurier-urgence/${slug}`,
      locale: "fr_FR",
      type: "website",
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

  const introUnique =
    INTROS[slug] ??
    `${zone.name} est couverte par Kaytek Services dans un rayon de 20 km autour de ${centreLabel}. Notre serrurier intervient à ${zone.name} (${centreDistance}) pour toute urgence serrurerie, ${BUSINESS_CONFIG.availability}.`;

  const sameZones = (isToulouse ? ZONES_TOULOUSE : ZONES_BAZIEGE)
    .filter((z) => z.slug !== zone.slug)
    .slice(0, 8);

  // ── Schema LocalBusiness unique par ville ──────────────────────
  const schema = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: `Kaytek Services — Serrurier ${zone.name}`,
    image: "https://www.kaytek-services.fr/logo.png",
    telephone: "+330582951742",
    url: `https://www.kaytek-services.fr/serrurier-urgence/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: zone.name,
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: zone.name,
    },
    openingHours: "Mo-Su 00:00-24:00",
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "16",
      bestRating: "5",
    },
  };

  const faqItems = [
    {
      question: `Quel est le délai d'intervention d'un serrurier à ${zone.name} ?`,
      answer: `Kaytek Services intervient à ${zone.name} depuis ${centreLabel}, soit environ ${centreDistance}. Comptez ${BUSINESS_CONFIG.interventionDelay} après votre appel. Nous sommes disponibles ${BUSINESS_CONFIG.availability}.`,
    },
    {
      question: `Pourquoi choisir Kaytek Services à ${zone.name} ?`,
      answer: `Kaytek Services est votre serrurier de proximité à ${zone.name} : tarif annoncé avant déplacement, facturation détaillée, disponible ${BUSINESS_CONFIG.availability}. Nous intervenons depuis ${centreLabel} (${centreDistance}) pour toute urgence serrurerie à ${zone.name}.`,
    },
    {
      question: `Quel est le prix d'un serrurier à ${zone.name} ?`,
      answer: `L'intervention d'un serrurier à ${zone.name} commence à partir de 69€ (extraction clé cassée). L'ouverture de porte claquée à ${zone.name} est à partir de 89€. Le tarif définitif est toujours communiqué par téléphone avant tout déplacement.`,
    },
    {
      question: `Intervenez-vous la nuit et le week-end à ${zone.name} ?`,
      answer: `Oui, Kaytek Services intervient ${BUSINESS_CONFIG.availability} à ${zone.name}. Que ce soit en pleine nuit, un dimanche ou un jour férié, notre serrurier se déplace à ${zone.name} depuis ${centreLabel} pour résoudre votre urgence.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── HERO ── */}
      <section className="bg-gray-950 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-orange-400">Accueil</Link>
            <span>/</span>
            <Link href="/#zones" className="hover:text-orange-400">Zones d&apos;intervention</Link>
            <span>/</span>
            <span className="text-gray-300">Serrurier {zone.name}</span>
          </nav>

          <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            {slug === "toulouse"
              ? "Basé à Toulouse — intervention immédiate"
              : `Zone ${centreLabel} — ${centreDistance}`}
          </div>

          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            Serrurier Urgence {zone.name}<br />
            <span className="text-orange-400">Intervention Rapide 24h/7j</span>
          </h1>

          <p className="text-gray-300 text-lg mb-6 max-w-2xl">
            <strong className="text-white">Kaytek Services</strong> intervient à{" "}
            <strong className="text-white">{zone.name}</strong> pour tous vos
            dépannages : porte claquée, clé cassée, serrure bloquée.{" "}
            {slug === "toulouse"
              ? <>Basé à Toulouse, disponible <strong className="text-white">{BUSINESS_CONFIG.availability}</strong>.</>
              : <>Depuis {centreLabel} ({centreDistance}), disponible <strong className="text-white">{BUSINESS_CONFIG.availability}</strong>.</>
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ── CONTENU LOCAL UNIQUE ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Serrurier d&apos;urgence à {zone.name} — Dépannage 24h/7j
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>{introUnique}</p>
            <p>
              Vous êtes bloqué à <strong>{zone.name}</strong> suite à une{" "}
              <strong>porte claquée</strong>, une{" "}
              <strong>clé cassée dans la serrure</strong> ou une{" "}
              <strong>serrure bloquée</strong> ? Appelez directement le{" "}
              <a href={PHONE_HREF} className="text-orange-600 font-bold hover:underline">
                {PHONE_DISPLAY}
              </a>
              . Notre serrurier vous communique le tarif définitif avant de se déplacer
              — aucune surprise sur la facture.
            </p>
          </div>

          {/* Section unique "Pourquoi nous à [Ville]" */}
          <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <h3 className="font-black text-gray-900 text-lg mb-4">
              Pourquoi choisir Kaytek Services à {zone.name} ?
            </h3>
            <ul className="space-y-2">
              {[
                `Intervention en ${BUSINESS_CONFIG.interventionDelay} depuis ${centreLabel} (${centreDistance})`,
                `Disponible ${BUSINESS_CONFIG.availability} — nuit, week-end, jours fériés`,
                "Tarif communiqué avant déplacement — aucune surprise",
                "Facture détaillée remise après chaque intervention",
                "Serrurier agréé — toutes serrures (cylindre, 3 points, haute sécurité)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-orange-500 font-black mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tarifs */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">
              Tarifs indicatifs à {zone.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Porte claquée", price: "à partir de 89€" },
                { label: "Clé cassée", price: "à partir de 69€" },
                { label: "Serrure bloquée", price: "à partir de 79€" },
                { label: "Remplacement serrure", price: "à partir de 129€" },
              ].map((t) => (
                <div key={t.label} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{t.label}</p>
                  <p className="font-black text-orange-600 text-sm">{t.price}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Tarifs indicatifs. Prix définitif annoncé par téléphone avant intervention.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Nos interventions à {zone.name}
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

      {/* ── FAQ UNIQUE PAR VILLE ── */}
      <FAQSection items={faqItems} />

      {/* ── MAILLAGE INTERNE ── */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Serrurier urgence dans les communes proches de {zone.name}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Zone {centreLabel} — interventions rapides dans toutes ces communes
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
              Toutes les zones →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-12 bg-gray-950 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-3">
            Serrurier urgence à {zone.name} — Appel direct
          </h2>
          <p className="text-gray-400 mb-6">
            {BUSINESS_CONFIG.availability} — Depuis {centreLabel} ({centreDistance}) — Devis gratuit
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-2xl px-10 py-5 rounded-2xl shadow-2xl transition-all"
          >
            📞 {PHONE_DISPLAY}
          </a>
        </div>
      </section>
    </>
  );
}
