// Configuration centrale du site serrurier
// Modifier ces valeurs pour personnaliser le site

export const BUSINESS_CONFIG = {
  name: "Serrurier Express Toulouse",
  phone: "06 00 00 00 00",
  phoneHref: "tel:+33600000000",
  email: "contact@serrurier-express-toulouse.fr",
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

export const SERVICE_ZONES = [
  { name: "Toulouse", slug: "toulouse", arrondissement: "Centre-ville" },
  { name: "Blagnac", slug: "blagnac", arrondissement: "Nord-Ouest" },
  { name: "Colomiers", slug: "colomiers", arrondissement: "Ouest" },
  { name: "Ramonville", slug: "ramonville", arrondissement: "Sud-Est" },
  { name: "Balma", slug: "balma", arrondissement: "Est" },
  { name: "Tournefeuille", slug: "tournefeuille", arrondissement: "Ouest" },
  { name: "Muret", slug: "muret", arrondissement: "Sud" },
  { name: "Castanet-Tolosan", slug: "castanet-tolosan", arrondissement: "Sud-Est" },
  { name: "Cugnaux", slug: "cugnaux", arrondissement: "Sud-Ouest" },
  { name: "Portet-sur-Garonne", slug: "portet-sur-garonne", arrondissement: "Sud" },
  { name: "L'Union", slug: "l-union", arrondissement: "Nord-Est" },
  { name: "Labège", slug: "labege", arrondissement: "Sud-Est" },
  { name: "Saint-Orens", slug: "saint-orens", arrondissement: "Sud-Est" },
  { name: "Plaisance-du-Touch", slug: "plaisance-du-touch", arrondissement: "Ouest" },
];

export const SERVICES = [
  {
    name: "Ouverture de porte claquée",
    slug: "ouverture-porte-claquee-toulouse",
    icon: "🔑",
    description: "Porte fermée sans clé, clé oubliée à l'intérieur — intervention rapide sans casse.",
    price: "à partir de 69€",
  },
  {
    name: "Clé cassée dans la serrure",
    slug: "cle-cassee-serrure-toulouse",
    icon: "🗝️",
    description: "Extraction de clé cassée, remplacement de cylindre si nécessaire.",
    price: "à partir de 89€",
  },
  {
    name: "Serrure bloquée",
    slug: "serrure-bloquee-toulouse",
    icon: "🔒",
    description: "Diagnostic et déblocage de serrure grippée, forcée ou défectueuse.",
    price: "à partir de 79€",
  },
  {
    name: "Remplacement de serrure",
    slug: "remplacement-serrure-toulouse",
    icon: "🛡️",
    description: "Installation de serrures 3 points, anti-effraction, blindées.",
    price: "sur devis",
  },
];
