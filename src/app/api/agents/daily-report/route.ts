/**
 * AGENT 4 — DAILY_REPORT_AGENT
 * GET /api/agents/daily-report?secret=CRON_SECRET
 * Déclencher via cron externe à 20h00
 */
import { NextRequest, NextResponse } from "next/server";
import { getStats, getLeadMemory, getImprovementLogs, addImprovementLog } from "@/lib/agents/memory";
import { sendTelegram, formatDailyReport } from "@/lib/agents/telegram";

const CRON_SECRET = process.env.CRON_SECRET ?? "kaytek-cron-2026";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const stats = getStats();
  const leads = getLeadMemory();

  // Leads des dernières 24h
  const yesterday = new Date();
  yesterday.setHours(yesterday.getHours() - 24);
  const leadsAujourdhui = leads.filter((l) => new Date(l.timestamp) >= yesterday);
  const urgentsAujourdhui = leadsAujourdhui.filter((l) => l.score_attribue >= 7);

  // Pages les plus actives (par ville)
  const villesCount: Record<string, number> = {};
  leadsAujourdhui.forEach((l) => {
    villesCount[l.ville] = (villesCount[l.ville] ?? 0) + 1;
  });
  const pages_top = Object.entries(villesCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([ville, count]) => `/serrurier-urgence/${ville} (${count} leads)`);

  // Détecter problèmes
  const problemes: string[] = [];
  if (stats.taux_faux_positifs > 0.1) problemes.push(`Taux faux positifs élevé: ${(stats.taux_faux_positifs * 100).toFixed(0)}%`);
  if (stats.taux_conversion < 0.3 && stats.total_leads > 5) problemes.push("Taux de conversion bas — optimiser CTA");
  if (leadsAujourdhui.length === 0) problemes.push("Aucun lead reçu aujourd'hui — vérifier tracking");

  // Actions recommandées intelligentes
  const actions: string[] = [];
  if (urgentsAujourdhui.length > 0) actions.push(`Relancer les ${urgentsAujourdhui.length} leads urgents non convertis`);
  if (stats.score_moyen_avis < 4.5 && stats.avis_recus > 0) actions.push("Répondre aux avis récents < 4 étoiles");
  actions.push("Publier 1 post Google Business Profile");
  actions.push("Vérifier position sur 'serrurier urgence toulouse'");

  const rapport = {
    leads_total: leadsAujourdhui.length,
    leads_urgents: urgentsAujourdhui.length,
    appels_estimes: Math.round(urgentsAujourdhui.length * 0.6),
    pages_top: pages_top.length > 0 ? pages_top : ["Données insuffisantes — trafic en cours d'indexation"],
    problemes,
    actions,
    taux_conversion: stats.taux_conversion,
  };

  // Envoyer sur Telegram
  const message = formatDailyReport(rapport);
  const sent = await sendTelegram(message);

  addImprovementLog(`📊 Rapport quotidien généré — ${rapport.leads_total} leads, ${rapport.leads_urgents} urgents — Telegram: ${sent ? "✅" : "❌"}`);

  return NextResponse.json({
    rapport_genere: true,
    telegram_envoye: sent,
    data: rapport,
    logs_recents: getImprovementLogs().slice(0, 10),
  });
}
