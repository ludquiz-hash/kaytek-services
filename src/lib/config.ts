// Configuration centrale du site Kaytek Services
// Source : extraction automatique depuis kaytek-services.fr

export const BUSINESS_CONFIG = {
  name: "Kaytek Services",
  phone: "05 82 95 17 42",
  phoneHref: "tel:+33582951742",
  email: "contact@kaytek-services.fr",
  website: "https://www.kaytek-services.fr",
  address: "Toulouse, Haute-Garonne (31)",
  city: "Toulouse",
  department: "Haute-Garonne",
  departmentCode: "31",
  interventionDelay: "20 à 40 minutes",
  availability: "24h/24, 7j/7, 365j/an",
  priceFrom: "69",
  // Lien vers la page d'avis Google (à remplacer par votre vrai lien)
  googleReviewLink: "https://g.page/r/VOTRE_ID_FICHE/review",
  // URL du webhook n8n pour recevoir les leads
  n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "",
};

// ─────────────────────────────────────────────────────────────────
// ZONES D'INTERVENTION — 2 centres : Toulouse 20 km + Baziège 20 km
// ─────────────────────────────────────────────────────────────────

export type ServiceZone = {
  name: string;
  slug: string;
  centre: "Toulouse" | "Baziège";
  distanceToulouse?: number; // km approximatif depuis Toulouse
  distanceBaziege?: number;  // km approximatif depuis Baziège
};

export const SERVICE_ZONES: ServiceZone[] = [
  // ── TOULOUSE centre et agglo immédiate ──
  { name: "Toulouse", slug: "toulouse", centre: "Toulouse", distanceToulouse: 0 },
  { name: "Blagnac", slug: "blagnac", centre: "Toulouse", distanceToulouse: 8 },
  { name: "Colomiers", slug: "colomiers", centre: "Toulouse", distanceToulouse: 10 },
  { name: "Tournefeuille", slug: "tournefeuille", centre: "Toulouse", distanceToulouse: 9 },
  { name: "Plaisance-du-Touch", slug: "plaisance-du-touch", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Léguevin", slug: "leguevin", centre: "Toulouse", distanceToulouse: 19 },
  { name: "Pibrac", slug: "pibrac", centre: "Toulouse", distanceToulouse: 13 },
  { name: "Cornebarrieu", slug: "cornebarrieu", centre: "Toulouse", distanceToulouse: 11 },
  { name: "Fenouillet", slug: "fenouillet", centre: "Toulouse", distanceToulouse: 11 },
  { name: "Saint-Alban", slug: "saint-alban", centre: "Toulouse", distanceToulouse: 9 },
  { name: "L'Union", slug: "l-union", centre: "Toulouse", distanceToulouse: 8 },
  { name: "Balma", slug: "balma", centre: "Toulouse", distanceToulouse: 7 },
  { name: "Quint-Fonsegrives", slug: "quint-fonsegrives", centre: "Toulouse", distanceToulouse: 9 },
  { name: "Pin-Balma", slug: "pin-balma", centre: "Toulouse", distanceToulouse: 11 },
  { name: "Flourens", slug: "flourens", centre: "Toulouse", distanceToulouse: 13 },
  { name: "Mondouzil", slug: "mondouzil", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Montrabé", slug: "montrabe", centre: "Toulouse", distanceToulouse: 10 },
  { name: "Verfeil", slug: "verfeil", centre: "Toulouse", distanceToulouse: 20 },
  { name: "Aucamville", slug: "aucamville", centre: "Toulouse", distanceToulouse: 7 },
  { name: "Beauzelle", slug: "beauzelle", centre: "Toulouse", distanceToulouse: 10 },
  { name: "Aussonne", slug: "aussonne", centre: "Toulouse", distanceToulouse: 13 },
  { name: "Seilh", slug: "seilh", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Gagnac-sur-Garonne", slug: "gagnac-sur-garonne", centre: "Toulouse", distanceToulouse: 13 },
  { name: "Castelginest", slug: "castelginest", centre: "Toulouse", distanceToulouse: 9 },
  { name: "Bruguières", slug: "bruguieres", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Launaguet", slug: "launaguet", centre: "Toulouse", distanceToulouse: 8 },
  { name: "Saint-Jean", slug: "saint-jean", centre: "Toulouse", distanceToulouse: 13 },
  { name: "Pechbonnieu", slug: "pechbonnieu", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Labège", slug: "labege", centre: "Toulouse", distanceToulouse: 11 },
  { name: "Castanet-Tolosan", slug: "castanet-tolosan", centre: "Toulouse", distanceToulouse: 12 },
  { name: "Ramonville-Saint-Agne", slug: "ramonville-saint-agne", centre: "Toulouse", distanceToulouse: 9 },
  { name: "Escalquens", slug: "escalquens", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Auzielle", slug: "auzielle", centre: "Toulouse", distanceToulouse: 15 },
  { name: "Cugnaux", slug: "cugnaux", centre: "Toulouse", distanceToulouse: 12 },
  { name: "Villeneuve-Tolosane", slug: "villeneuve-tolosane", centre: "Toulouse", distanceToulouse: 11 },
  { name: "Roques", slug: "roques", centre: "Toulouse", distanceToulouse: 14 },
  { name: "Portet-sur-Garonne", slug: "portet-sur-garonne", centre: "Toulouse", distanceToulouse: 10 },
  { name: "Muret", slug: "muret", centre: "Toulouse", distanceToulouse: 18 },
  { name: "Seysses", slug: "seysses", centre: "Toulouse", distanceToulouse: 20 },
  { name: "Fonsorbes", slug: "fonsorbes", centre: "Toulouse", distanceToulouse: 18 },
  { name: "Frouzins", slug: "frouzins", centre: "Toulouse", distanceToulouse: 15 },
  { name: "Sainte-Foy-de-Peyrolières", slug: "sainte-foy-de-peyrolieres", centre: "Toulouse", distanceToulouse: 20 },
  { name: "Brax", slug: "brax", centre: "Toulouse", distanceToulouse: 17 },
  { name: "Saint-Lys", slug: "saint-lys", centre: "Toulouse", distanceToulouse: 20 },

  // ── BAZIÈGE centre et communes dans 20 km ──
  { name: "Baziège", slug: "baziege", centre: "Baziège", distanceBaziege: 0 },
  { name: "Ayguesvives", slug: "ayguesvives", centre: "Baziège", distanceBaziege: 4 },
  { name: "Montgiscard", slug: "montgiscard", centre: "Baziège", distanceBaziege: 5 },
  { name: "Montesquieu-Lauragais", slug: "montesquieu-lauragais", centre: "Baziège", distanceBaziege: 8 },
  { name: "Villenouvelle", slug: "villenouvelle", centre: "Baziège", distanceBaziege: 10 },
  { name: "Labastide-Beauvoir", slug: "labastide-beauvoir", centre: "Baziège", distanceBaziege: 7 },
  { name: "Montlaur", slug: "montlaur", centre: "Baziège", distanceBaziege: 11 },
  { name: "Mauremont", slug: "mauremont", centre: "Baziège", distanceBaziege: 9 },
  { name: "Donneville", slug: "donneville", centre: "Baziège", distanceBaziege: 6 },
  { name: "Fourquevaux", slug: "fourquevaux", centre: "Baziège", distanceBaziege: 8 },
  { name: "Auterive", slug: "auterive", centre: "Baziège", distanceBaziege: 18 },
  { name: "Nailloux", slug: "nailloux", centre: "Baziège", distanceBaziege: 15 },
  { name: "Villefranche-de-Lauragais", slug: "villefranche-de-lauragais", centre: "Baziège", distanceBaziege: 12 },
  { name: "Gardouch", slug: "gardouch", centre: "Baziège", distanceBaziege: 9 },
  { name: "Préserville", slug: "preserville", centre: "Baziège", distanceBaziege: 6 },
  { name: "Pompertuzat", slug: "pompertuzat", centre: "Baziège", distanceBaziege: 5 },
  { name: "Belberaud", slug: "belberaud", centre: "Baziège", distanceBaziege: 7 },
  { name: "Corronsac", slug: "corronsac", centre: "Baziège", distanceBaziege: 8 },
  { name: "Clermont-le-Fort", slug: "clermont-le-fort", centre: "Baziège", distanceBaziege: 12 },
  { name: "Lacroix-Falgarde", slug: "lacroix-falgarde", centre: "Baziège", distanceBaziege: 14 },
  { name: "Pinsaguel", slug: "pinsaguel", centre: "Baziège", distanceBaziege: 15 },
  { name: "Vernet", slug: "vernet", centre: "Baziège", distanceBaziege: 10 },
  { name: "Saint-Orens-de-Gameville", slug: "saint-orens-de-gameville", centre: "Baziège", distanceBaziege: 13 },
  { name: "Castanet-Tolosan", slug: "castanet-tolosan-baziege", centre: "Baziège", distanceBaziege: 11 },
  { name: "Escalquens", slug: "escalquens-baziege", centre: "Baziège", distanceBaziege: 10 },
];

// Liste dédupliquée par slug pour la navigation et le sitemap
// (certaines communes sont dans les deux rayons — on garde le centre principal)
export const SERVICE_ZONES_UNIQUE: ServiceZone[] = (() => {
  const seen = new Set<string>();
  const deduped: ServiceZone[] = [];
  for (const z of SERVICE_ZONES) {
    // Utiliser le slug de base (sans suffixe -baziege pour doublons)
    const baseSlug = z.slug.replace(/-baziege$/, "");
    if (!seen.has(baseSlug)) {
      seen.add(baseSlug);
      deduped.push({ ...z, slug: baseSlug });
    }
  }
  return deduped;
})();

export const ZONES_TOULOUSE = SERVICE_ZONES_UNIQUE.filter((z) => z.centre === "Toulouse");
export const ZONES_BAZIEGE = SERVICE_ZONES_UNIQUE.filter((z) => z.centre === "Baziège");

// ─────────────────────────────────────────────────────────────────
// SERVICES (données Kaytek réelles)
// ─────────────────────────────────────────────────────────────────

export const SERVICES = [
  {
    name: "Ouverture de porte claquée",
    slug: "ouverture-porte-claquee",
    icon: "🔑",
    description: "Porte fermée sans clé, clé oubliée à l'intérieur — intervention rapide sans casse.",
    price: "à partir de 89€",
  },
  {
    name: "Extraction clé cassée",
    slug: "cle-cassee-serrure",
    icon: "🗝️",
    description: "Extraction de clé cassée dans le barillet, remplacement de cylindre si nécessaire.",
    price: "à partir de 69€",
  },
  {
    name: "Déblocage serrure",
    slug: "serrure-bloquee",
    icon: "🔒",
    description: "Diagnostic et déblocage de serrure grippée, endommagée ou usée.",
    price: "à partir de 79€",
  },
  {
    name: "Remplacement de serrure",
    slug: "remplacement-serrure",
    icon: "🛡️",
    description: "Installation de serrures 3 points, haute sécurité, connectées.",
    price: "à partir de 129€",
  },
];
