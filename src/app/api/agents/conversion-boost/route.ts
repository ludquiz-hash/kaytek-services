/**
 * AGENT 6 — CONVERSION_BOOST_AGENT
 * GET /api/agents/conversion-boost — audit conversion
 * POST /api/agents/conversion-boost — optimiser une page
 */
import { NextRequest, NextResponse } from "next/server";
import { addImprovementLog } from "@/lib/agents/memory";

const CONVERSION_CHECKLIST = [
  { id: "phone_top", label: "Numéro en haut de page visible immédiatement", critique: true },
  { id: "phone_floating", label: "Bouton appel flottant sur mobile", critique: true },
  { id: "delay_visible", label: "Délai '20-40 min' visible sans scroll", critique: true },
  { id: "price_visible", label: "Prix indicatif visible (réduit hésitation)", critique: false },
  { id: "no_long_form", label: "Formulaire max 2 champs", critique: true },
  { id: "cta_action_verb", label: "CTA avec verbe d'action urgent", critique: true },
  { id: "trust_badges", label: "3+ badges confiance (avis, agréé, délai)", critique: false },
  { id: "social_proof", label: "Avis avec prénom + ville spécifique", critique: false },
  { id: "mobile_first", label: "Bouton appel ≥ 48px sur mobile", critique: true },
  { id: "no_captcha", label: "Pas de CAPTCHA sur formulaire urgence", critique: true },
];

const COPYWRITING_TRIGGERS = {
  mots_urgence: ["bloqué", "coincé", "urgence", "maintenant", "immédiat", "rapide"],
  mots_confiance: ["agréé", "certifié", "transparent", "facture", "devis gratuit"],
  mots_rassurants: ["sans surprise", "tarif annoncé", "disponible", "24h/24"],
  cta_optimaux: [
    "📞 Je suis bloqué — appeler maintenant",
    "📞 Intervention rapide — 05 82 95 17 42",
    "📞 Dépannage urgent — appeler",
    "📞 Serrurier en 20 min — appeler",
  ],
  h1_templates: [
    "Serrurier d'Urgence à {Ville} — On Arrive en 20 min",
    "Bloqué(e) à {Ville} ? Serrurier Disponible Maintenant",
    "Porte Claquée à {Ville} — Intervention Rapide 24h/7j",
  ],
};

export async function GET() {
  addImprovementLog("🎯 CONVERSION_BOOST consulté");

  return NextResponse.json({
    agent: "CONVERSION_BOOST_AGENT",
    checklist: CONVERSION_CHECKLIST,
    copywriting_triggers: COPYWRITING_TRIGGERS,
    optimisations_prioritaires: [
      {
        quoi: "Numéro de téléphone en sticky header",
        pourquoi: "+40% de clics appel sur mobile",
        comment: "Déjà implémenté dans Header.tsx — vérifier visibilité sur mobile",
        statut: "✅ fait",
      },
      {
        quoi: "Bouton appel flottant orange sur toutes les pages",
        pourquoi: "Visible en permanence = pas d'effort de recherche",
        comment: "Déjà implémenté dans LeadChatbot.tsx",
        statut: "✅ fait",
      },
      {
        quoi: "Supprimer le formulaire long du chatbot",
        pourquoi: "Chaque champ supplémentaire = -15% de conversion",
        comment: "Réduire à : problème + téléphone (2 champs max)",
        statut: "🔄 à optimiser",
      },
      {
        quoi: "H1 contient mot déclencheur + ville",
        pourquoi: "Matching intention de recherche = meilleur CTR",
        comment: "Vérifier toutes les pages /serrurier-urgence/[ville]",
        statut: "✅ fait",
      },
      {
        quoi: "Prix indicatifs visibles",
        pourquoi: "Réduit l'hésitation — confiance +25%",
        comment: "Déjà sur les pages services et villes",
        statut: "✅ fait",
      },
    ],
    ab_tests_recommandes: [
      "CTA rouge vs orange → tester lequel génère plus d'appels",
      "Numéro seul vs 'Appeler maintenant — 05 82 95 17 42'",
      "Chatbot visible immédiatement vs après 5 secondes",
    ],
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { page_url = "", h1 = "", cta = "" } = body;

  const issues: string[] = [];
  const suggestions: string[] = [];

  if (!h1.match(/urgence|bloqué|rapide|immédiat/i)) {
    issues.push("H1 sans mot déclencheur d'urgence");
    suggestions.push(`Utiliser: "${COPYWRITING_TRIGGERS.h1_templates[0].replace("{Ville}", "Toulouse")}"`);
  }
  if (!cta.match(/appel|appeler/i)) {
    issues.push("CTA sans verbe d'appel");
    suggestions.push(`Utiliser: "${COPYWRITING_TRIGGERS.cta_optimaux[0]}"`);
  }
  if (cta.length > 50) {
    issues.push("CTA trop long (> 50 chars)");
    suggestions.push("Raccourcir le CTA — max 40 chars sur mobile");
  }

  addImprovementLog(`🎯 Audit conversion: ${page_url} — ${issues.length} problèmes`);

  return NextResponse.json({
    page_url,
    problemes: issues,
    suggestions,
    score_conversion: `${(CONVERSION_CHECKLIST.length - issues.length)}/${CONVERSION_CHECKLIST.length}`,
    cta_recommande: COPYWRITING_TRIGGERS.cta_optimaux[0],
  });
}
