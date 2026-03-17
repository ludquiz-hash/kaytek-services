/**
 * KAYTEK_GROWTH_ENGINE — Données SEO & Concurrence
 * Analyse concurrents, stratégie pages, optimisations
 */

export const GROWTH_ENGINE_DATA = {

  // ── Analyse concurrents Toulouse (top 10 serruriers) ──────────
  concurrents_analyses: [
    {
      nom: "Serrurier Toulouse Express",
      points_forts: ["Présent sur toutes les requêtes urgence", "Avis Google > 200", "Téléphone en header sticky"],
      faiblesses: ["Pas de pages par quartier", "Contenu dupliqué sur 80% des pages", "Pas de schema FAQ"],
      mots_cles_cibles: ["serrurier urgence toulouse", "ouverture porte toulouse", "serrurier 24h toulouse"],
      strategie_pour_faire_mieux: "Créer pages par quartier + schema FAQ + contenu 100% unique + vitesse mobile"
    },
    {
      nom: "Dépannage Serrurerie 31",
      points_forts: ["Bon positionnement Google Maps", "Photos de qualité sur GBP"],
      faiblesses: ["Site non responsive", "Pas de contenu blog", "0 page géographique secondaire"],
      mots_cles_cibles: ["serrurier blagnac", "serrurier colomiers", "clé cassée toulouse"],
      strategie_pour_faire_mieux: "Mobile-first + 30+ pages géo + blog urgences"
    },
    {
      nom: "Serrurier Pro Toulouse",
      points_forts: ["Domain authority correct", "Backlinks annuaires"],
      faiblesses: ["CTA peu visible", "Pas de chat", "Formulaire complexe"],
      mots_cles_cibles: ["serrurier toulouse pas cher", "remplacement serrure toulouse"],
      strategie_pour_faire_mieux: "Bouton appel immédiat + chat qualify + formulaire 1 champ"
    }
  ],

  // ── Pages prioritaires urgence ────────────────────────────────
  pages_prioritaires: [
    {
      url: "/serrurier-urgence-toulouse",
      titre_seo: "Serrurier Urgence Toulouse — Intervention en 20 min | 24h/24 7j/7",
      h1: "Serrurier d'Urgence à Toulouse — Disponible Maintenant",
      h2s: [
        "Intervention en 20 à 40 minutes sur Toulouse",
        "Porte claquée, clé cassée, serrure bloquée",
        "Tarif annoncé avant déplacement — zéro surprise",
        "Plus de 16 avis 5/5 sur Google"
      ],
      cta_principal: "📞 Appeler maintenant — 05 82 95 17 42",
      mots_cles: ["serrurier urgence toulouse", "serrurier toulouse 24h", "dépannage serrurier toulouse"],
      intention: "urgence_immediat",
      volume_estime: 480,
      difficulte: "moyenne"
    },
    {
      url: "/serrurier-urgence/porte-claquee-toulouse",
      titre_seo: "Porte Claquée Toulouse — Serrurier Urgence en 20 min",
      h1: "Votre Porte est Claquée à Toulouse ? On Arrive en 20 min",
      h2s: [
        "Bloqué(e) dehors ? Appelez immédiatement",
        "Ouverture de porte sans casse dans 95% des cas",
        "Disponible la nuit, week-end et jours fériés",
        "Tarif ouverture porte claquée Toulouse"
      ],
      cta_principal: "📞 Je suis bloqué — appeler le 05 82 95 17 42",
      mots_cles: ["porte claquée toulouse", "ouverture porte toulouse", "bloqué dehors toulouse"],
      intention: "urgence_immediat",
      volume_estime: 320,
      difficulte: "faible"
    },
    {
      url: "/serrurier-urgence/cle-cassee-toulouse",
      titre_seo: "Clé Cassée dans la Serrure Toulouse — Extraction Rapide",
      h1: "Clé Cassée dans la Serrure à Toulouse — Extraction en 30 min",
      h2s: [
        "N'essayez pas de retirer la clé vous-même",
        "Extraction professionnelle — cylindre préservé",
        "Remplacement sur place si nécessaire",
        "Prix extraction clé cassée Toulouse"
      ],
      cta_principal: "📞 Extraction urgente — 05 82 95 17 42",
      mots_cles: ["clé cassée toulouse", "extraction clé cassée toulouse", "clé coincée serrure toulouse"],
      intention: "urgence_haute",
      volume_estime: 180,
      difficulte: "faible"
    },
    {
      url: "/serrurier-urgence/serrure-bloquee-toulouse",
      titre_seo: "Serrure Bloquée Toulouse — Déblocage Urgent 24h/24",
      h1: "Serrure Bloquée ou Grippée à Toulouse ? Intervention Rapide",
      h2s: [
        "Serrure qui ne tourne plus — que faire ?",
        "Diagnostic sur place — réparation ou remplacement",
        "Toutes marques de serrures",
        "Prix déblocage serrure Toulouse"
      ],
      cta_principal: "📞 Dépannage serrure — 05 82 95 17 42",
      mots_cles: ["serrure bloquée toulouse", "déblocage serrure toulouse", "serrure grippée toulouse"],
      intention: "urgence_haute",
      volume_estime: 140,
      difficulte: "faible"
    }
  ],

  // ── Pages géographiques ───────────────────────────────────────
  pages_geo: [
    { ville: "Blagnac", slug: "blagnac", volume: 90, distance: "8km", priorite: 1 },
    { ville: "Colomiers", slug: "colomiers", volume: 85, distance: "10km", priorite: 2 },
    { ville: "Balma", slug: "balma", volume: 60, distance: "7km", priorite: 3 },
    { ville: "Ramonville-Saint-Agne", slug: "ramonville-saint-agne", volume: 65, distance: "9km", priorite: 4 },
    { ville: "Labège", slug: "labege", volume: 45, distance: "11km", priorite: 5 },
    { ville: "Tournefeuille", slug: "tournefeuille", volume: 70, distance: "9km", priorite: 6 },
    { ville: "Muret", slug: "muret", volume: 55, distance: "18km", priorite: 7 },
    { ville: "Castanet-Tolosan", slug: "castanet-tolosan", volume: 50, distance: "12km", priorite: 8 },
  ],

  // ── Optimisations Google Maps ─────────────────────────────────
  optimisations_maps: [
    "Compléter à 100% : catégories, services, horaires, photos (min 20)",
    "Ajouter catégories secondaires : Locksmith, Emergency Locksmith, Security System Supplier",
    "Publier 1 post Google par semaine (urgences réelles + conseils)",
    "Répondre à TOUS les avis sous 24h (même les négatifs)",
    "Activer messagerie Google Business",
    "Ajouter Q&A pré-remplies : prix, délai, zone",
    "Photos géolocalisées Toulouse + communes",
    "Utiliser attribut 'Disponible 24h/24'",
  ],

  // ── Stratégie 50 avis Google ──────────────────────────────────
  strategie_avis: [
    "Envoyer SMS 90min après chaque intervention avec lien direct",
    "Former le technicien à demander l'avis oralement en partant",
    "Message SMS : 'Bonjour [Prénom], votre [problème] à [Ville] est réglé. Si tout est ok, 30 secondes pour un avis : [LIEN]'",
    "Objectif : 5 avis/mois = 50 avis en 10 mois",
    "Ne jamais acheter d'avis — risque de suspension GBP",
    "Répondre à chaque avis avec mots-clés SEO naturels",
  ],

  // ── Backlinks locaux gratuits ─────────────────────────────────
  backlinks: [
    { source: "Pages Jaunes", url: "pagesjaunes.fr", type: "annuaire", priorite: 1, gratuit: true },
    { source: "Yelp France", url: "yelp.fr", type: "annuaire", priorite: 2, gratuit: true },
    { source: "Habitissimo", url: "habitissimo.fr", type: "artisan", priorite: 3, gratuit: true },
    { source: "Houzz", url: "houzz.fr", type: "artisan", priorite: 4, gratuit: true },
    { source: "Allovoisins", url: "allovoisins.com", type: "local", priorite: 5, gratuit: true },
    { source: "Hoodspot", url: "hoodspot.fr", type: "local", priorite: 6, gratuit: true },
    { source: "Kompass", url: "kompass.com", type: "b2b", priorite: 7, gratuit: true },
    { source: "Cylex", url: "cylex.fr", type: "annuaire", priorite: 8, gratuit: true },
    { source: "Infobel", url: "infobel.fr", type: "annuaire", priorite: 9, gratuit: true },
    { source: "Syndics copropriétés Toulouse", type: "partenariat", priorite: 2, gratuit: true },
    { source: "Agences immobilières Toulouse", type: "partenariat", priorite: 3, gratuit: true },
    { source: "Groupes Facebook Toulouse Entraide", type: "social", priorite: 4, gratuit: true },
  ],

  // ── Contenu à créer (blog/articles urgences) ─────────────────
  contenu_a_creer: [
    {
      titre: "Porte claquée à Toulouse : que faire dans les 10 premières minutes ?",
      mots_cles: ["porte claquée toulouse", "que faire porte claquée"],
      intention: "urgence + conseil",
      appel_action: "Appelez le 05 82 95 17 42 immédiatement",
      volume_estime: 250
    },
    {
      titre: "Prix serrurier Toulouse 2026 : grille tarifaire officielle",
      mots_cles: ["prix serrurier toulouse", "tarif serrurier toulouse"],
      intention: "devis + confiance",
      appel_action: "Devis gratuit par téléphone",
      volume_estime: 380
    },
    {
      titre: "Serrurier arnaque Toulouse : comment les reconnaître et les éviter",
      mots_cles: ["serrurier arnaque toulouse", "faux serrurier toulouse"],
      intention: "confiance + différenciation",
      appel_action: "Kaytek Services : tarif annoncé avant intervention",
      volume_estime: 290
    },
    {
      titre: "Clé cassée dans la serrure : les 3 erreurs qui aggravent tout",
      mots_cles: ["clé cassée serrure que faire", "clé cassée toulouse"],
      intention: "urgence + conseil",
      appel_action: "N'aggravez pas — appelez un pro",
      volume_estime: 160
    },
  ],

  // ── Optimisations conversion ──────────────────────────────────
  optimisations_conversion: [
    "Numéro de téléphone en header sticky sur TOUTES les pages",
    "Bouton appel flottant orange visible dès le scroll",
    "H1 contient toujours un mot déclencheur : bloqué, urgence, rapide",
    "3 premières lignes : empathie + solution + numéro",
    "Badge '20-40 min' visible sans scroll sur mobile",
    "Supprimer tout formulaire avec > 2 champs",
    "Chat : première réponse < 30 secondes",
    "Ajouter prix indicatifs pour réduire l'hésitation",
    "Témoignages avec ville spécifique (pas générique)",
    "Schema FAQ sur toutes les pages = featured snippets",
  ],

  // ── Actions immédiates (impact rapide) ───────────────────────
  actions_immediates: [
    { action: "Enregistrer la fiche GBP à 100%", impact: "critique", delai: "24h" },
    { action: "Poster 1 photo/jour sur GBP pendant 30 jours", impact: "haute", delai: "immédiat" },
    { action: "Créer les fiches annuaires (Pages Jaunes, Yelp)", impact: "haute", delai: "48h" },
    { action: "Ajouter schema FAQ sur pages urgences", impact: "haute", delai: "24h" },
    { action: "Demander avis aux 5 derniers clients", impact: "haute", delai: "immédiat" },
    { action: "Activer Google Messages sur GBP", impact: "moyenne", delai: "1h" },
    { action: "Créer page /porte-claquee-toulouse dédiée", impact: "haute", delai: "48h" },
    { action: "Rejoindre 3 groupes Facebook Toulouse", impact: "moyenne", delai: "1j" },
  ],

  // ── Opportunités cachées ──────────────────────────────────────
  opportunites_cachees: [
    "Requête 'serrurier nuit toulouse' : volume 90/mois, quasi 0 concurrence directe",
    "Questions Google 'que faire porte claquée' : featured snippet accessible",
    "Requêtes Baziège + Lauragais : aucun serrurier positionné = domination facile",
    "Syndicats de copropriété Toulouse : partenariat = 5-10 interventions/mois garanties",
    "Forums locaux Toulouse (Reddit, Facebook) : présence conseil = notoriété gratuite",
    "TikTok/Reels : 1 vidéo 'porte claquée que faire' = viralité locale possible",
    "Google Local Services Ads : pas encore pris par concurrents locaux",
  ],

  priorite_globale: "haute" as const,
};
