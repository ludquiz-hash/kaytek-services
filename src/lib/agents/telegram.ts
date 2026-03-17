/**
 * TELEGRAM AGENT — Notifications temps réel
 * Utilisé par tous les agents pour alertes instantanées
 */

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function sendTelegram(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[TELEGRAM] Token ou Chat ID manquant — message non envoyé");
    return false;
  }

  try {
    const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}

export function formatUrgenceAlert(lead: {
  prenom: string;
  adresse: string;
  probleme: string;
  telephone: string;
  score: number;
  canal: string;
  ville?: string;
}): string {
  const emoji = lead.score >= 9 ? "🚨🚨" : lead.score >= 7 ? "🚨" : "📋";
  const urgenceLabel = lead.score >= 9 ? "CRITIQUE" : lead.score >= 7 ? "URGENCE" : "LEAD";

  return `${emoji} <b>${urgenceLabel} SERRURIER</b>

👤 <b>Prénom :</b> ${lead.prenom}
📍 <b>Adresse :</b> ${lead.adresse}
🔧 <b>Problème :</b> ${lead.probleme}
📞 <b>Téléphone :</b> ${lead.telephone}
🔥 <b>Score :</b> ${lead.score}/10
📡 <b>Canal :</b> ${lead.canal}

➡️ <b>ACTION : rappeler immédiatement</b>
📲 <a href="tel:${lead.telephone.replace(/\s/g, "")}">${lead.telephone}</a>`;
}

export function formatDailyReport(report: {
  leads_total: number;
  leads_urgents: number;
  appels_estimes: number;
  pages_top: string[];
  problemes: string[];
  actions: string[];
  taux_conversion: number;
}): string {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });

  return `📊 <b>RAPPORT KAYTEK — ${date}</b>

📥 <b>Leads reçus :</b> ${report.leads_total}
🚨 <b>Urgences qualifiées :</b> ${report.leads_urgents}
📞 <b>Appels estimés :</b> ${report.appels_estimes}
📈 <b>Taux conversion :</b> ${(report.taux_conversion * 100).toFixed(0)}%

🏆 <b>Pages performantes :</b>
${report.pages_top.map((p) => `  • ${p}`).join("\n") || "  • Données insuffisantes"}

⚠️ <b>Problèmes détectés :</b>
${report.problemes.length > 0 ? report.problemes.map((p) => `  ⚠️ ${p}`).join("\n") : "  ✅ Aucun problème"}

🎯 <b>Actions recommandées :</b>
${report.actions.map((a, i) => `  ${i + 1}. ${a}`).join("\n")}

🌐 <b>Site :</b> kaytek-services.fr`;
}
