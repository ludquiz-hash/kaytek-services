/**
 * TELEGRAM AGENT — Notifications temps réel
 * Utilisé par tous les agents pour alertes instantanées
 */

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function sendTelegram(message: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("[TELEGRAM] sendTelegram appelé");
  console.log("[TELEGRAM] token présent:", !!token);
  console.log("[TELEGRAM] chatId présent:", !!chatId);

  if (!token || !chatId) {
    console.error("[TELEGRAM] ERREUR CRITIQUE — Token ou Chat ID manquant dans les variables d'environnement Netlify");
    console.error("[TELEGRAM] TELEGRAM_BOT_TOKEN:", token ? "OK" : "MANQUANT");
    console.error("[TELEGRAM] TELEGRAM_CHAT_ID:", chatId ? "OK" : "MANQUANT");
    return false;
  }

  try {
    console.log("[TELEGRAM] Envoi vers chatId:", chatId);
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
    console.log("[TELEGRAM] Réponse API:", JSON.stringify(data));
    if (!data.ok) {
      console.error("[TELEGRAM] ECHEC envoi — erreur Telegram:", data.description);
      // Tentative 2 sans parse_mode en cas d'erreur HTML
      const res2 = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message.replace(/<[^>]*>/g, ""),
        }),
      });
      const data2 = await res2.json();
      console.log("[TELEGRAM] Tentative 2:", JSON.stringify(data2));
      return data2.ok === true;
    }
    console.log("[TELEGRAM] ✅ Message envoyé avec succès");
    return true;
  } catch (err) {
    console.error("[TELEGRAM] Exception:", String(err));
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
