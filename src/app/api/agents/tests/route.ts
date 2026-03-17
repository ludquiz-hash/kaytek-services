/**
 * SUITE DE TESTS AUTOMATIQUES
 * GET /api/agents/tests
 * Valide les 5 scénarios requis
 */

import { NextRequest, NextResponse } from "next/server";

interface TestResult {
  test: string;
  passed: boolean;
  expected: Record<string, unknown>;
  got: Record<string, unknown>;
  details: string;
}

async function runTest(
  name: string,
  payload: Record<string, unknown>,
  endpoint: string,
  assertions: Record<string, unknown>,
  baseUrl: string
): Promise<TestResult> {
  const isGet = payload._get === true;
  let response: Response;

  if (isGet) {
    response = await fetch(`${baseUrl}${endpoint}`);
  } else {
    response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  const data = await response.json();
  const failures: string[] = [];

  Object.entries(assertions).forEach(([key, expected]) => {
    const actual = data[key];
    if (typeof expected === "object" && expected !== null && "gte" in (expected as Record<string, unknown>)) {
      const gte = (expected as Record<string, number>).gte;
      if (typeof actual !== "number" || actual < gte) {
        failures.push(`${key}: attendu >= ${gte}, reçu ${actual}`);
      }
    } else if (typeof expected === "object" && expected !== null && "lte" in (expected as Record<string, unknown>)) {
      const lte = (expected as Record<string, number>).lte;
      if (typeof actual !== "number" || actual > lte) {
        failures.push(`${key}: attendu <= ${lte}, reçu ${actual}`);
      }
    } else if (actual !== expected) {
      failures.push(`${key}: attendu "${expected}", reçu "${actual}"`);
    }
  });

  return {
    test: name,
    passed: failures.length === 0,
    expected: assertions,
    got: Object.fromEntries(
      Object.keys(assertions).map((k) => [k, data[k]])
    ),
    details: failures.length === 0 ? "✅ Tous les critères validés" : `❌ ${failures.join(" | ")}`,
  };
}

export async function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const results: TestResult[] = [];

  // ── TEST 1 — Urgence critique nuit ────────────────────────────
  results.push(await runTest(
    "Test 1 — Urgence critique nuit (bébé bloqué)",
    {
      message: "je suis bloqué dehors porte claquée toulouse capitole il est 23h30 avec mon bébé",
      canal: "test",
    },
    "/api/agents/kaytek-urgence",
    {
      score: { gte: 9 },
      contexte_emotionnel: "panique",
      action: "APPELER_IMMÉDIAT",
      zone_valide: true,
      probleme: "porte_claquee",
      urgence_reelle: true,
    },
    baseUrl
  ));

  // ── TEST 2 — Urgence cambriolage ──────────────────────────────
  results.push(await runTest(
    "Test 2 — Urgence post-cambriolage Blagnac",
    {
      message: "on a forcé ma porte cette nuit à Blagnac je peux plus fermer",
      canal: "test",
    },
    "/api/agents/kaytek-urgence",
    {
      score: { gte: 8 },
      probleme: "post_cambriolage",
      zone_valide: true,
      urgence_reelle: true,
    },
    baseUrl
  ));

  // ── TEST 3 — Spam hors zone ───────────────────────────────────
  results.push(await runTest(
    "Test 3 — Spam Paris détecté",
    {
      message: "bonjour tarif serrurier paris 75",
      canal: "test",
    },
    "/api/agents/kaytek-urgence",
    {
      score: 0,
      zone_valide: false,
      action: "QUARANTAINE",
      urgence_reelle: false,
    },
    baseUrl
  ));

  // ── TEST 4 — Demande d'avis optimale ─────────────────────────
  results.push(await runTest(
    "Test 4 — Demande avis Sophie Ramonville",
    {
      mode: "demande_avis",
      prenom: "Sophie",
      ville: "Ramonville",
      type_intervention: "porte_claquee",
      heure_intervention: "14:00", // 3h avant (17h)
    },
    "/api/agents/kaytek-avis",
    {
      fenetre_optimale: true,
      probabilite_conversion: { gte: 0.30 },
      publier_auto: true,
    },
    baseUrl
  ));

  // ── TEST 5 — Réponse avis négatif ────────────────────────────
  results.push(await runTest(
    "Test 5 — Réponse avis négatif 2/5",
    {
      mode: "reponse_avis",
      note: 2,
      texte: "Prix trop élevé et serrurier pas aimable",
      ville: "Toulouse",
      type_intervention: "porte_claquee",
    },
    "/api/agents/kaytek-avis",
    {
      publier_auto: false,
      alerte_negative: true,
      priorite_validation: "haute",
    },
    baseUrl
  ));

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  return NextResponse.json({
    bilan: `${passed}/${total} tests réussis`,
    tous_passes: passed === total,
    resultats: results,
    timestamp: new Date().toISOString(),
  });
}
