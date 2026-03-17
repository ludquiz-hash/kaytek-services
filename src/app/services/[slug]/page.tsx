import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PhoneButton from "@/components/PhoneButton";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/phone";
import FAQSection from "@/components/FAQSection";
import TrustBadges from "@/components/TrustBadges";
import { SERVICES } from "@/lib/config";

// ─── Slugs alignés avec config.ts ────────────────────────────────
const serviceDetails: Record<string, {
  h1: string;
  intro: string;
  steps: { title: string; desc: string }[];
  why: string[];
  faq: { question: string; answer: string }[];
  schema: object;
}> = {

  // ── 1. Ouverture porte claquée ──────────────────────────────────
  "ouverture-porte-claquee": {
    h1: "Ouverture de porte claquée à Toulouse — Kaytek Services 24h/7j",
    intro: "Vous avez claqué votre porte avec les clés à l'intérieur ? Kaytek Services intervient en 20 à 40 minutes sur Toulouse, Baziège et toute la zone couverte. Tarif communiqué avant déplacement, facture remise après intervention.",
    steps: [
      {
        title: `Appelez le ${PHONE_DISPLAY}`,
        desc: "Notre serrurier décroche immédiatement. Il vous demande votre adresse et le type de porte/serrure, et vous annonce le tarif définitif avant de partir.",
      },
      {
        title: "Arrivée en 20 à 40 minutes",
        desc: "Notre serrurier arrive avec le matériel adapté à votre type de serrure et intervient rapidement.",
      },
      {
        title: "Porte ouverte — facture remise",
        desc: "Une fois la porte ouverte, vous recevez une facture détaillée. Payable par carte, espèces ou virement.",
      },
    ],
    why: [
      "Intervention en 20 à 40 min sur Toulouse & Baziège",
      "Tarif annoncé avant tout déplacement",
      "Aucune surprise sur la facture",
      "Disponible 24h/24, 7j/7, 365j/an",
      "Serrurier agréé, facture détaillée remise",
    ],
    faq: [
      {
        question: "Combien coûte l'ouverture d'une porte claquée ?",
        answer: "L'ouverture d'une porte claquée commence à partir de 89€. Le tarif définitif dépend du type de serrure et de l'heure d'intervention. Il vous est toujours communiqué par téléphone avant que notre serrurier se déplace.",
      },
      {
        question: "Faut-il remplacer la serrure après une ouverture de porte ?",
        answer: "Non, pas systématiquement. Si votre serrure est en bon état, aucun remplacement n'est nécessaire. En revanche, si le cylindre est usé ou endommagé, nous pouvons le remplacer sur place lors de la même visite.",
      },
      {
        question: "Intervenez-vous la nuit et les week-ends ?",
        answer: "Oui, Kaytek Services intervient 24h/24, 7j/7, 365j/an sur Toulouse, Baziège et la zone couverte. Un supplément de nuit peut s'appliquer, toujours annoncé avant intervention.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Ouverture de porte claquée Toulouse",
      description: "Service d'ouverture de porte claquée à Toulouse et Baziège, disponible 24h/24 7j/7. Intervention rapide avec le matériel adapté.",
      provider: { "@type": "Locksmith", name: "Kaytek Services", telephone: "0582951742" },
      areaServed: ["Toulouse", "Baziège"],
      serviceType: "Locksmith",
    },
  },

  // ── 2. Clé cassée ───────────────────────────────────────────────
  "cle-cassee-serrure": {
    h1: "Clé cassée dans la serrure à Toulouse — Extraction urgente",
    intro: "La clé s'est cassée dans la serrure et vous êtes bloqué ? Kaytek Services extrait la clé cassée et remplace le cylindre si nécessaire, lors de la même intervention. Disponible 24h/24 sur Toulouse et Baziège.",
    steps: [
      {
        title: "N'essayez pas de retirer la clé vous-même",
        desc: "Pousser ou tordre davantage la clé risque d'enfoncer le morceau plus profondément dans le barillet. Appelez-nous immédiatement.",
      },
      {
        title: "Extraction avec outillage professionnel",
        desc: "Notre serrurier utilise des outils spécialisés pour extraire le morceau de clé du barillet en quelques minutes, en préservant la serrure dans la majorité des cas.",
      },
      {
        title: "Remplacement du cylindre si nécessaire",
        desc: "Si le barillet est endommagé, nous le remplaçons sur place avec un cylindre de qualité équivalente ou supérieure.",
      },
    ],
    why: [
      "Extraction sans remplacement systématique",
      "Cylindres de remplacement en stock",
      "Intervention en 20 à 40 min",
      "Tarif transparent annoncé avant déplacement",
      "Disponible 24h/24, 7j/7",
    ],
    faq: [
      {
        question: "Peut-on ouvrir la porte avec une clé cassée dans la serrure ?",
        answer: "Oui. Notre serrurier extrait d'abord la partie cassée, puis ouvre la porte. Si le cylindre est intact, vous pourrez utiliser votre double clé normalement après l'intervention.",
      },
      {
        question: "Faut-il changer la serrure si la clé est cassée ?",
        answer: "Pas forcément. Si la clé s'est cassée proprement et que le cylindre n'est pas endommagé, l'extraction suffit. Le remplacement n'est nécessaire que si le barillet est abîmé.",
      },
      {
        question: "Pourquoi ma clé s'est-elle cassée ?",
        answer: "Les causes principales sont une clé ancienne et usée, une serrure grippée ou mal entretenue, ou une clé de mauvaise qualité. Notre serrurier peut diagnostiquer la cause lors de l'intervention.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Extraction clé cassée dans serrure Toulouse",
      description: "Extraction professionnelle de clé cassée dans serrure à Toulouse et Baziège. Remplacement de cylindre si nécessaire.",
      provider: { "@type": "Locksmith", name: "Kaytek Services", telephone: "0582951742" },
      areaServed: ["Toulouse", "Baziège"],
    },
  },

  // ── 3. Serrure bloquée ──────────────────────────────────────────
  "serrure-bloquee": {
    h1: "Serrure bloquée à Toulouse — Déblocage d'urgence",
    intro: "Votre serrure ne tourne plus, le pêne ne se rétracte pas, ou la clé ne rentre plus ? Kaytek Services diagnostique et débloque votre serrure sur place, avec remplacement si nécessaire. Intervention rapide depuis Toulouse et Baziège.",
    steps: [
      {
        title: "Diagnostic téléphonique",
        desc: "Décrivez-nous les symptômes. Selon le type de blocage, notre serrurier apporte déjà le matériel adapté.",
      },
      {
        title: "Intervention et déblocage",
        desc: "Lubrification, déblocage mécanique ou extraction du mécanisme bloqué. Notre serrurier choisit la technique la mieux adaptée à votre situation.",
      },
      {
        title: "Remise en état ou remplacement",
        desc: "Si la serrure est trop usée ou endommagée, remplacement sur place avec un cylindre de qualité équivalente ou supérieure.",
      },
    ],
    why: [
      "Diagnostic précis avant d'intervenir",
      "Déblocage sans remplacement si possible",
      "Cylindres de remplacement en stock",
      "Intervention en 20 à 40 min",
      "Garantie sur les pièces posées",
    ],
    faq: [
      {
        question: "Ma serrure est grippée, est-ce grave ?",
        answer: "Pas nécessairement. Une serrure grippée peut souvent être débloquée avec un lubrifiant adapté (graphite). Si le grippage est dû à l'usure avancée du cylindre, un remplacement sera recommandé.",
      },
      {
        question: "Ma porte a gonflé et la serrure est bloquée, que faire ?",
        answer: "Le gonflement de la porte (bois humide) peut bloquer le pêne dans la gâche. Nous pouvons débloquer la porte, mais il faudra aussi faire régler la menuiserie.",
      },
      {
        question: "Quelqu'un a tenté d'entrer chez moi, que faire ?",
        answer: "En cas de tentative d'effraction (rayures sur le cylindre, pêne forcé), appelez-nous immédiatement. Nous remplacerons le cylindre par un modèle haute sécurité.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Déblocage serrure Toulouse",
      description: "Déblocage et réparation de serrure bloquée à Toulouse et Baziège. Intervention rapide, diagnostic sur place.",
      provider: { "@type": "Locksmith", name: "Kaytek Services", telephone: "0582951742" },
      areaServed: ["Toulouse", "Baziège"],
    },
  },

  // ── 4. Remplacement de serrure ──────────────────────────────────
  "remplacement-serrure": {
    h1: "Remplacement de serrure à Toulouse — Installation & Sécurité",
    intro: "Besoin de remplacer une serrure vieillissante, d'installer une serrure 3 points ou une serrure haute sécurité ? Kaytek Services intervient sur Toulouse et Baziège pour sécuriser votre habitation avec les meilleures solutions du marché.",
    steps: [
      {
        title: "Audit de sécurité",
        desc: "Notre serrurier évalue le niveau de sécurité actuel de votre porte et vous propose la solution adaptée à votre besoin et votre budget.",
      },
      {
        title: "Choix de la serrure",
        desc: "Nous travaillons avec les grandes marques : Fichet, Vachette, Bricard, Mul-T-Lock. Serrure à cylindre européen, 3 points, haute sécurité — nous avons le stock.",
      },
      {
        title: "Installation professionnelle",
        desc: "Pose soignée, alignement parfait, remise des clés et conseils d'entretien. Garantie sur les pièces posées.",
      },
    ],
    why: [
      "Grandes marques disponibles en stock",
      "Pose garantie",
      "Conseil personnalisé selon votre porte",
      "Devis gratuit et sans engagement",
      "Tarif transparent annoncé à l'avance",
    ],
    faq: [
      {
        question: "Quelle serrure choisir pour une porte d'entrée ?",
        answer: "Pour une porte d'entrée, nous recommandons a minima une serrure 3 points avec cylindre européen A2P. Pour un niveau supérieur, une serrure haute sécurité avec cylindre A2P*** ou Fichet. Tout dépend de votre niveau d'exposition.",
      },
      {
        question: "Mon assurance demande une serrure certifiée A2P, vous en avez ?",
        answer: "Oui. Nous posons des serrures certifiées A2P 1*, 2* et 3*. La certification A2P est souvent exigée par les assurances pour couvrir le vol par effraction. Nous vous remettons l'attestation de pose.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Remplacement serrure Toulouse",
      description: "Remplacement et installation de serrures à Toulouse et Baziège. Serrures 3 points, haute sécurité, certifiées A2P.",
      provider: { "@type": "Locksmith", name: "Kaytek Services", telephone: "0582951742" },
      areaServed: ["Toulouse", "Baziège"],
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return {};

  return {
    title: `${service.name} à Toulouse & Baziège — Kaytek Services`,
    description: detail.intro.slice(0, 160),
    alternates: {
      canonical: `https://www.kaytek-services.fr/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];

  if (!service || !detail) notFound();

  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(detail.schema) }}
      />

      {/* ── HERO ── */}
      <section className="bg-gray-950 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-orange-400">Accueil</Link>
            <span>/</span>
            <span className="text-gray-300">{service.name}</span>
          </nav>
          <div className="inline-block bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Urgence 24h/7j
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            {detail.h1}
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl">{detail.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-xl transition-all"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
              <span className="text-green-400 text-lg">⚡</span>
              Intervention en 20 à 40 minutes
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ── ÉTAPES ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-8">
            Comment se déroule l&apos;intervention ?
          </h2>
          <div className="space-y-6">
            {detail.steps.map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI NOUS ── */}
      <section className="py-10 bg-orange-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Pourquoi choisir Kaytek Services ?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {detail.why.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-orange-500 font-black mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection items={detail.faq} />

      {/* ── AUTRES SERVICES ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Nos autres interventions à Toulouse &amp; Baziège
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-center gap-3 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-4 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all"
              >
                <span className="text-2xl">{s.icon}</span>
                <span>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-14 bg-gray-950 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-3">
            Besoin de ce service maintenant ?
          </h2>
          <p className="text-gray-400 mb-6">
            Devis gratuit — tarif annoncé avant toute intervention — disponible 24h/24, 7j/7
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
