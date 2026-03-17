/**
 * BOUCLE D'AMÉLIORATION QUOTIDIENNE
 * GET /api/agents/cron?secret=CRON_SECRET
 *
 * Déclencher via cron externe (EasyCron, cron-job.org) :
 * - Tous les jours à 6h00 → ?task=daily_analysis
 * - Tous les lundis à 6h30 → ?task=weekly_weights
 * - 1er du mois à 7h00  → ?task=monthly_avis
 *
 * Ou via Netlify Scheduled Functions (si configuré)
 */

import { NextRequest, NextResponse } from "next/server";
import {
  runDailyAnalysis,
  runMonthlyAvisAnalysis,
  getStats,
  getImprovementLogs,
  getScoringWeights,
  updateScoringWeights,
  getLeadMemory,
  addImprovementLog,
} from "@/lib/agents/memory";

const CRON_SECRET = process.env.CRON_SECRET ?? "kaytek-cron-2026";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const task = searchParams.get("task") ?? "daily_analysis";

  // Sécuriser le cron
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  // ── Tâche 1 : Analyse quotidienne (6h00) ──────────────────────
  if (task === "daily_analysis" || task === "all") {
    const rapport = runDailyAnalysis();
    results.daily_analysis = rapport;
    addImprovementLog(`⏰ Cron 6h00 — analyse quotidienne exécutée`);
  }

  // ── Tâche 2 : Recalcul des poids hebdomadaire (lundi 6h30) ────
  if (task === "weekly_weights" || task === "all") {
    const leads = getLeadMemory();
    const weights = getScoringWeights();

    // Analyser les 7 derniers jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentLeads = leads.filter((l) => new Date(l.timestamp) >= sevenDaysAgo);

    const convertedLeads = recentLeads.filter((l) => l.resultat_reel === "converti");
    const failedHighScore = recentLeads.filter(
      (l) => l.score_attribue >= 7 && l.resultat_reel === "non_converti"
    );

    const lecons: string[] = [];

    // Augmenter poids des patterns qui convertissent
    convertedLeads.forEach((l) => {
      const patterns = l.lecon_apprise.match(/critique:(\w+)/g);
      patterns?.forEach((p) => {
        const mot = p.replace("critique:", "");
        if (weights.mots_critique[mot]) {
          weights.mots_critique[mot] = Math.min(4, weights.mots_critique[mot] + 0.5);
          lecons.push(`⬆️ Poids augmenté: ${mot}`);
        }
      });
    });

    // Réduire poids des faux positifs
    failedHighScore.forEach((l) => {
      const patterns = l.lecon_apprise.match(/haute:(\w+)/g);
      patterns?.forEach((p) => {
        const mot = p.replace("haute:", "");
        if (weights.mots_haute[mot]) {
          weights.mots_haute[mot] = Math.max(0.5, weights.mots_haute[mot] - 0.5);
          lecons.push(`⬇️ Poids réduit: ${mot}`);
        }
      });
    });

    updateScoringWeights({
      mots_critique: weights.mots_critique,
      mots_haute: weights.mots_haute,
    });

    const rapport = `Cette semaine j'ai appris :\n- ${convertedLeads.length} leads convertis analysés\n- ${failedHighScore.length} faux positifs corrigés\n${lecons.length > 0 ? "- Ajustements: " + lecons.join(", ") : "- Aucun ajustement nécessaire"}\n- Version scoring: ${weights.version + 1}`;

    results.weekly_weights = rapport;
    addImprovementLog(`📅 Rapport hebdomadaire:\n${rapport}`);
  }

  // ── Tâche 3 : Analyse mensuelle avis (1er du mois 7h00) ───────
  if (task === "monthly_avis" || task === "all") {
    const rapport = runMonthlyAvisAnalysis();
    results.monthly_avis = rapport;
    addImprovementLog(`📅 Cron 1er du mois — analyse avis exécutée`);
  }

  // ── Tâche 4 : Rapport global ──────────────────────────────────
  if (task === "stats") {
    results.stats = getStats();
    results.logs = getImprovementLogs().slice(0, 20);
    results.weights_version = getScoringWeights().version;
  }

  return NextResponse.json({
    task_executed: task,
    timestamp: new Date().toISOString(),
    results,
    stats: getStats(),
  });
}
