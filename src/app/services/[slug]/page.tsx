import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PhoneButton from "@/components/PhoneButton";
import FAQSection from "@/components/FAQSection";
import TrustBadges from "@/components/TrustBadges";
import { BUSINESS_CONFIG, SERVICES } from "@/lib/config";

// Contenu détaillé par service
const serviceDetails: Record<
  string,
  {
    h1: string;
    intro: string;
    steps: { title: string; desc: string }[];
    why: string[];
    faq: { question: string; answer: string }[];
    schema: object;
  }
> = {
  "ouverture-porte-claquee-toulouse": {
    h1: "Ouverture de porte claquée à Toulouse — Serrurier 24h/24",
    intro: `Vous avez claqué votre porte avec les clés à l'intérieur ? C'est l'une des situations les plus fréquentes auxquelles nous répondons à Toulouse. Notre serrurier intervient en ${BUSINESS_CONFIG.interventionDelay}, avec le matériel adapté à votre type de serrure, et vous communique le tarif définitif avant de commencer.`,
    steps: [
      {
        title: "Appelez-nous",
        desc: `Composez le ${BUSINESS_CONFIG.phone}. Notre serrurier vous demande votre adresse et le type de porte/serrure. Il vous annonce le tarif définitif avant de se déplacer.`,
      },
      {
        title: "Intervention rapide",
        desc: `Arrivée en ${BUSINESS_CONFIG.interventionDelay}. Le serrurier évalue votre serrure et utilise la méthode adaptée à votre type de porte pour intervenir avec un minimum de dommages.`,
      },
      {
        title: "Ouverture & conseil",
        desc: "Porte ouverte, vous êtes chez vous. Le serrurier peut vous conseiller si votre serrure mérite d'être renforcée pour éviter une prochaine situation similaire.",
      },
    ],
    why: [
      `Intervention en ${BUSINESS_CONFIG.interventionDelay} sur Toulouse`,
      "Intervention soignée, minimum de dommages",
      "Tarif annoncé avant intervention — aucune surprise",
      `Disponible ${BUSINESS_CONFIG.availability}`,
      "Serrurier agréé, facture détaillée remise",
    ],
    faq: [
      {
        question:
          "Puis-je ouvrir ma porte claquée moi-même avant d'appeler le serrurier ?",
        answer:
          "Si vous n'avez pas de double clé accessible chez un voisin ou un proche, ne tentez pas de forcer la porte vous-même : vous risquez d'abîmer la serrure ou la porte, ce qui augmentera significativement le coût de la réparation. Appelez directement notre serrurier.",
      },
      {
        question:
          "Combien coûte l'ouverture d'une porte claquée à Toulouse ?",
        answer: `L'ouverture d'une porte claquée commence à partir de ${BUSINESS_CONFIG.priceFrom}€. Le tarif exact dépend du type de serrure, de l'heure (nuit/week-end) et de la complexité. Nous l'annonçons toujours avant intervention.`,
      },
      {
        question: "Faut-il remplacer la serrure après une ouverture de porte ?",
        answer:
          "Pas systématiquement. Si votre serrure est en bon état et que la porte s'est simplement claquée, aucun remplacement n'est nécessaire après l'intervention. En revanche, si le cylindre est usé ou endommagé, nous pouvons le remplacer sur place lors de la même visite.",
      },
      {
        question: "Intervenez-vous dans tout Toulouse ?",
        answer:
          "Oui, nous couvrons Toulouse intra-muros et toute la périphérie : Blagnac, Colomiers, Ramonville, Balma, Tournefeuille, Muret, Castanet-Tolosan et plus encore.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Ouverture de porte claquée Toulouse",
      description:
        "Service d'ouverture de porte claquée à Toulouse, disponible 24h/24 7j/7. Intervention rapide avec le matériel adapté.",
      provider: {
        "@type": "Locksmith",
        name: BUSINESS_CONFIG.name,
        telephone: BUSINESS_CONFIG.phone,
      },
      areaServed: "Toulouse",
      serviceType: "Locksmith",
    },
  },
  "cle-cassee-serrure-toulouse": {
    h1: "Clé cassée dans la serrure à Toulouse — Extraction urgente",
    intro:
      "La clé s'est cassée dans la serrure et vous êtes bloqué ? Ce problème peut survenir à tout moment, sur une vieille clé usée ou une serrure grippée. Notre serrurier à Toulouse extrait la clé cassée et remplace le cylindre si nécessaire, dans la même intervention.",
    steps: [
      {
        title: "N'essayez pas de retirer la clé vous-même",
        desc: "Pousser ou tordre davantage la clé cassée risque d'enfoncer le morceau plus profondément dans le barillet. Appelez-nous immédiatement.",
      },
      {
        title: "Extraction professionnelle",
        desc: "Avec des outils spécialisés, notre serrurier extrait le morceau de clé cassé du barillet en quelques minutes, en préservant la serrure dans la majorité des cas.",
      },
      {
        title: "Remplacement si nécessaire",
        desc: "Si le cylindre est endommagé (clé cassée ayant forcé le mécanisme), nous le remplaçons sur place avec un cylindre de sécurité équivalent ou supérieur.",
      },
    ],
    why: [
      "Extraction de clé cassée sans remplacement systématique",
      "Cylindres de remplacement disponibles en stock",
      `Intervention en ${BUSINESS_CONFIG.interventionDelay}`,
      "Tarif transparent annoncé avant intervention",
      `Disponible ${BUSINESS_CONFIG.availability}`,
    ],
    faq: [
      {
        question: "Peut-on ouvrir avec une clé cassée dans la serrure ?",
        answer:
          "Oui. Notre serrurier extrait d'abord la partie cassée, puis ouvre la porte. Si le cylindre est intact, vous pourrez utiliser votre double clé normalement après l'intervention.",
      },
      {
        question: "Faut-il forcément changer la serrure si la clé est cassée ?",
        answer:
          "Pas nécessairement. Si la clé s'est cassée proprement et que le cylindre n'est pas endommagé, il suffit d'extraire le morceau. Le remplacement n'est nécessaire que si le barillet est abîmé.",
      },
      {
        question: "Pourquoi ma clé s'est-elle cassée ?",
        answer:
          "Les causes principales sont : clé ancienne et fatigiguée par l'usure, serrure grippée ou mal lubrifiée, clé de mauvaise qualité (copie cheap). Nous pouvons diagnostiquer la cause lors de l'intervention.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Extraction clé cassée dans serrure Toulouse",
      description:
        "Extraction professionnelle de clé cassée dans serrure à Toulouse. Remplacement de cylindre si nécessaire.",
      provider: {
        "@type": "Locksmith",
        name: BUSINESS_CONFIG.name,
        telephone: BUSINESS_CONFIG.phone,
      },
      areaServed: "Toulouse",
    },
  },
  "serrure-bloquee-toulouse": {
    h1: "Serrure bloquée à Toulouse — Déblocage d'urgence",
    intro:
      "Votre serrure ne tourne plus, le pêne ne se rétracte pas, ou la clé ne rentre plus ? Une serrure bloquée peut avoir plusieurs causes : serrure grippée, tentative d'effraction, cylindre usé, ou pêne mal aligné. Notre serrurier diagostique et débloque sur place.",
    steps: [
      {
        title: "Diagnostic téléphonique",
        desc: "En nous appelant, décrivez les symptômes. Selon le type de blocage, notre serrurier apporte déjà le matériel adapté.",
      },
      {
        title: "Intervention et déblocage",
        desc: "Lubrifaction, déblocage mécanique, ou extraction du mécanisme bloqué. Le serrurier choisit la technique la moins invasive.",
      },
      {
        title: "Remise en état ou remplacement",
        desc: "Si la serrure est trop usée ou endommagée, remplacement sur place avec un cylindre de qualité équivalente ou supérieure.",
      },
    ],
    why: [
      "Diagnostic précis avant d'intervenir",
      "Déblocage sans remplacement si possible",
      "Stock de cylindres de remplacement",
      `Intervention en ${BUSINESS_CONFIG.interventionDelay}`,
      "Garantie sur les pièces posées",
    ],
    faq: [
      {
        question: "Ma serrure est grippée, est-ce grave ?",
        answer:
          "Pas nécessairement. Une serrure grippée peut souvent être débloquée avec un lubrifiant adapté (graphite, pas d'huile WD40 !). Si le grippage est dû à l'usure avancée du cylindre, un remplacement sera recommandé.",
      },
      {
        question: "Ma serrure est bloquée car ma porte a gonflé, que faire ?",
        answer:
          "Le gonflement de porte (bois humide, réglage insuffisant) peut bloquer le pêne dans la gâche. Ce n'est pas un problème de serrure mais de menuiserie. Nous pouvons quand même débloquer la porte, mais il faudra aussi faire régler la porte.",
      },
      {
        question: "Quelqu'un a tenté d'entrer chez moi, que faire ?",
        answer:
          "En cas de tentative d'effraction avérée (rayures sur le cylindre, cylindre arraché, pêne forcé), appelez-nous immédiatement. Nous remplacerons le cylindre par un modèle haute sécurité et vous aiderons à sécuriser votre porte.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Déblocage serrure Toulouse",
      description:
        "Déblocage et réparation de serrure bloquée à Toulouse. Intervention rapide, diagnostic gratuit.",
      provider: {
        "@type": "Locksmith",
        name: BUSINESS_CONFIG.name,
        telephone: BUSINESS_CONFIG.phone,
      },
      areaServed: "Toulouse",
    },
  },
  "remplacement-serrure-toulouse": {
    h1: "Remplacement de serrure à Toulouse — Installation serrure sécurité",
    intro:
      "Besoin de remplacer une serrure vieillissante, d'installer une serrure 3 points ou une serrure anti-effraction ? Notre serrurier à Toulouse intervient pour sécuriser votre habitation avec les meilleures serrures du marché.",
    steps: [
      {
        title: "Audit de sécurité",
        desc: "Avant tout remplacement, notre serrurier évalue le niveau de sécurité actuel de votre porte et vous propose la solution adaptée à votre besoin et votre budget.",
      },
      {
        title: "Choix de la serrure",
        desc: "Nous travaillons avec les grandes marques : Fichet, Vachette, Bricard, Mul-T-Lock. Serrure à cylindre européen, 3 points, blindée, connectée — nous avons le stock.",
      },
      {
        title: "Installation professionnelle",
        desc: "Pose dans les règles de l'art, alignement parfait, remise des clés et conseils d'entretien.",
      },
    ],
    why: [
      "Toutes marques disponibles en stock",
      "Pose garantie",
      "Conseil personnalisé selon votre porte",
      "Devis gratuit et sans engagement",
      "Tarif transparent",
    ],
    faq: [
      {
        question: "Quelle serrure choisir pour une porte d'entrée ?",
        answer:
          "Pour une porte d'entrée, nous recommandons a minima une serrure 3 points avec cylindre européen A2P. Pour un niveau supérieur, une serrure blindée avec cylindre A2P*** ou Fichet. Tout dépend de votre niveau d'exposition.",
      },
      {
        question:
          "Mon assurance demande une serrure certifiée A2P, vous en avez ?",
        answer:
          "Oui. Nous posons des serrures certifiées A2P 1*, 2* et 3*. La certification A2P est souvent exigée par les assurances pour couvrir le vol par effraction. Nous vous remettons l'attestation de pose.",
      },
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Remplacement serrure Toulouse",
      description:
        "Remplacement et installation de serrures à Toulouse. Serrures 3 points, anti-effraction, blindées, certifiées A2P.",
      provider: {
        "@type": "Locksmith",
        name: BUSINESS_CONFIG.name,
        telephone: BUSINESS_CONFIG.phone,
      },
      areaServed: "Toulouse",
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "ouverture-porte-claquee-toulouse" },
    { slug: "cle-cassee-serrure-toulouse" },
    { slug: "serrure-bloquee-toulouse" },
    { slug: "remplacement-serrure-toulouse" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) return {};

  return {
    title: `${service.name} à Toulouse — ${BUSINESS_CONFIG.name}`,
    description: `${detail.intro.slice(0, 155)}...`,
    alternates: {
      canonical: `https://serrurier-express-toulouse.fr/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];

  if (!service || !detail) {
    notFound();
  }

  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(detail.schema) }}
      />

      {/* Hero service */}
      <section className="bg-gray-900 text-white py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-orange-400">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-gray-300">{service.name}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-4">
            {detail.h1}
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl">{detail.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <PhoneButton
              variant="primary"
              size="lg"
              text={`📞 Appeler maintenant — ${BUSINESS_CONFIG.phone}`}
            />
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-green-400 text-lg">⚡</span>
              Intervention en {BUSINESS_CONFIG.interventionDelay}
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Comment ça se passe */}
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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="py-10 bg-orange-50 border-y border-orange-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Pourquoi choisir notre serrurier à Toulouse ?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {detail.why.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-orange-500 font-black mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ service */}
      <FAQSection items={detail.faq} />

      {/* Autres services */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Autres interventions disponibles à Toulouse
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-gray-50 hover:bg-orange-50 border border-gray-200 rounded-lg p-4 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all"
              >
                {s.icon} {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-3">
            Besoin de ce service maintenant ?
          </h2>
          <p className="text-gray-400 mb-6">
            Appelez directement — devis gratuit, tarif annoncé avant toute
            intervention.
          </p>
          <PhoneButton
            variant="primary"
            size="lg"
            text={`📞 ${BUSINESS_CONFIG.phone} — ${BUSINESS_CONFIG.availability}`}
          />
        </div>
      </section>
    </>
  );
}
