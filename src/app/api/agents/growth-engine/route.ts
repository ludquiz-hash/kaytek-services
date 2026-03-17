/**
 * KAYTEK_GROWTH_ENGINE
 * GET  /api/agents/growth-engine           — plan SEO complet
 * POST /api/agents/growth-engine           — analyse personnalisée
 */
import { NextRequest, NextResponse } from "next/server";
import { GROWTH_ENGINE_DATA } from "@/lib/agents/seo-data";
import { addImprovementLog } from "@/lib/agents/memory";

export async function GET() {
  addImprovementLog("📊 GROWTH_ENGINE consulté");
  return NextResponse.json({
    agent: "KAYTEK_GROWTH_ENGINE",
    version: "1.0",
    objectif: "3 à 5 appels qualifiés par jour — trafic 100% gratuit",
    ...GROWTH_ENGINE_DATA,
    webhook_url: "https://www.kaytek-services.fr/api/agents/growth-engine",
    derniere_analyse: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const action = body.action ?? "plan_complet";

  if (action === "analyse_page") {
    const url: string = body.url ?? "";
    const page = GROWTH_ENGINE_DATA.pages_prioritaires.find(
      (p) => p.url === url || p.mots_cles.includes(url)
    );
    return NextResponse.json(page ?? { error: "Page non trouvée dans le plan" });
  }

  if (action === "opportunites") {
    return NextResponse.json({
      opportunites: GROWTH_ENGINE_DATA.opportunites_cachees,
      actions_immediates: GROWTH_ENGINE_DATA.actions_immediates,
    });
  }

  return NextResponse.json({
    agent: "KAYTEK_GROWTH_ENGINE",
    ...GROWTH_ENGINE_DATA,
  });
}
