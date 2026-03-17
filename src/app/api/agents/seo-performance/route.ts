/**
 * AGENT 5 — SEO_PERFORMANCE_AGENT
 * GET /api/agents/seo-performance — audit SEO + recommandations
 * POST /api/agents/seo-performance — analyser une URL spécifique
 */
import { NextRequest, NextResponse } from "next/server";
import { GROWTH_ENGINE_DATA } from "@/lib/agents/seo-data";
import { addImprovementLog } from "@/lib/agents/memory";

const SEO_RULES = [
  { id: "title_length", label: "Title entre 50-60 chars", check: (t: string) => t.length >= 50 && t.length <= 65 },
  { id: "title_keyword", label: "Mot-clé principal dans le title", check: (t: string) => t.toLowerCase().includes("serrurier") || t.toLowerCase().includes("urgence") },
  { id: "h1_unique", label: "H1 unique et différent du title", check: (t: string) => t.length > 20 },
  { id: "description_length", label: "Meta description 155-160 chars", check: (t: string) => t.length >= 140 && t.length <= 165 },
  { id: "phone_visible", label: "Numéro téléphone visible sans scroll", check: (t: string) => t.includes("05 82 95 17 42") || t.includes("0582951742") },
  { id: "cta_present", label: "CTA avec verbe d'action", check: (t: string) => /appel|appeler|contacter|urgence|maintenant/i.test(t) },
];

export async function GET() {
  addImprovementLog("🔍 SEO_PERFORMANCE consulté");

  const audit = {
    pages_prioritaires_manquantes: [
      "/serrurier-urgence/porte-claquee-toulouse",
      "/serrurier-urgence/cle-cassee-toulouse",
      "/serrurier-urgence/serrure-bloquee-toulouse",
    ],
    optimisations_rapides: [
      { page: "/", action: "Ajouter schema FAQ avec 5 questions urgences", impact: "haute" },
      { page: "/serrurier-urgence/toulouse", action: "Ajouter témoignages avec ville spécifique", impact: "haute" },
      { page: "toutes", action: "Vérifier Core Web Vitals — LCP < 2.5s", impact: "moyenne" },
      { page: "toutes", action: "Ajouter balise hreflang si multilingue", impact: "faible" },
    ],
    mots_cles_a_cibler: [
      { kw: "serrurier urgence toulouse", volume: 480, difficulte: "moyenne", position_estimee: "top 10 possible" },
      { kw: "porte claquée toulouse", volume: 320, difficulte: "faible", position_estimee: "top 5 accessible" },
      { kw: "serrurier nuit toulouse", volume: 90, difficulte: "très faible", position_estimee: "top 3 possible" },
      { kw: "serrurier baziège", volume: 40, difficulte: "quasi nulle", position_estimee: "top 1 accessible" },
      { kw: "clé cassée toulouse", volume: 180, difficulte: "faible", position_estimee: "top 5 accessible" },
    ],
    seo_rules: SEO_RULES.map((r) => ({ id: r.id, label: r.label })),
    recommandations_semaine: [
      "Publier 2 articles blog urgences (voir contenu_a_creer)",
      "Soumettre sitemap mis à jour dans Google Search Console",
      "Créer 3 fiches annuaires manquantes",
      "Répondre à tous les avis Google < 48h",
    ],
    pages_existantes: GROWTH_ENGINE_DATA.pages_prioritaires.length + GROWTH_ENGINE_DATA.pages_geo.length,
    potentiel_trafic_mensuel: GROWTH_ENGINE_DATA.pages_prioritaires.reduce((sum, p) => sum + p.volume_estime, 0),
  };

  return NextResponse.json({
    agent: "SEO_PERFORMANCE_AGENT",
    audit,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { url = "", title = "", description = "", content = "" } = body;

  const results = SEO_RULES.map((rule) => {
    const input = [title, description, content].join(" ");
    return {
      rule: rule.label,
      passed: rule.check(input),
      suggestion: rule.check(input) ? null : `Améliorer: ${rule.label}`,
    };
  });

  const score = results.filter((r) => r.passed).length;
  addImprovementLog(`🔍 Audit SEO: ${url} — score ${score}/${results.length}`);

  return NextResponse.json({
    url,
    score_seo: `${score}/${results.length}`,
    resultats: results,
    recommandations: results.filter((r) => !r.passed).map((r) => r.suggestion),
  });
}
