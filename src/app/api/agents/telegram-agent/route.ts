/**
 * AGENT 2 — TELEGRAM_AGENT
 * POST /api/agents/telegram-agent
 * Notifie instantanément sur Telegram pour chaque lead urgent
 */
import { NextRequest, NextResponse } from "next/server";
import { sendTelegram, formatUrgenceAlert, formatDailyReport } from "@/lib/agents/telegram";
import { addImprovementLog } from "@/lib/agents/memory";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mode = body.mode ?? "urgence";

    if (mode === "urgence") {
      const lead = {
        prenom: body.prenom ?? "Client",
        adresse: body.adresse ?? "Non renseignée",
        probleme: body.probleme ?? "Non précisé",
        telephone: body.telephone ?? "Non renseigné",
        score: body.score ?? 7,
        canal: body.canal ?? "site",
        ville: body.ville ?? "",
      };

      const message = formatUrgenceAlert(lead);
      const sent = await sendTelegram(message);

      addImprovementLog(
        `📲 Telegram ${sent ? "✅ envoyé" : "❌ échec"} — ${lead.prenom} score=${lead.score}`
      );

      return NextResponse.json({
        ok: sent,
        message_envoye: message,
        timestamp: new Date().toISOString(),
        note: sent ? "Alerte envoyée" : "Vérifier TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID dans Netlify",
      });
    }

    if (mode === "rapport") {
      const message = formatDailyReport({
        leads_total: body.leads_total ?? 0,
        leads_urgents: body.leads_urgents ?? 0,
        appels_estimes: body.appels_estimes ?? 0,
        pages_top: body.pages_top ?? [],
        problemes: body.problemes ?? [],
        actions: body.actions ?? ["Vérifier les leads du jour", "Répondre aux avis Google"],
        taux_conversion: body.taux_conversion ?? 0,
      });
      const sent = await sendTelegram(message);
      return NextResponse.json({ ok: sent, message_envoye: message });
    }

    if (mode === "test") {
      const sent = await sendTelegram(
        "🟢 <b>Kaytek Services — Test connexion</b>\n\nLe système d'alertes fonctionne correctement ✅\n\nAgent TELEGRAM_AGENT opérationnel."
      );
      return NextResponse.json({
        ok: sent,
        note: sent
          ? "✅ Telegram connecté — vous allez recevoir les alertes urgences"
          : "❌ Échec — vérifier TELEGRAM_BOT_TOKEN et TELEGRAM_CHAT_ID dans Netlify",
      });
    }

    return NextResponse.json({ error: "mode invalide — utiliser: urgence, rapport, test" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const hasChatId = !!process.env.TELEGRAM_CHAT_ID;
  return NextResponse.json({
    agent: "TELEGRAM_AGENT",
    status: hasToken && hasChatId ? "✅ Configuré" : "⚠️ Variables manquantes",
    TELEGRAM_BOT_TOKEN: hasToken ? "✅ défini" : "❌ manquant",
    TELEGRAM_CHAT_ID: hasChatId ? "✅ défini" : "❌ manquant",
    instruction: "Ajouter ces variables dans Netlify → Site configuration → Environment variables",
    test_url: "POST /api/agents/telegram-agent avec {mode:'test'}",
  });
}
