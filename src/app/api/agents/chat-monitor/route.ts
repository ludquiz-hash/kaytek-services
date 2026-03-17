/**
 * AGENT 3 — CHAT_MONITOR
 * POST /api/agents/chat-monitor
 * Surveille le chat du site, qualifie en temps réel, alerte si urgence
 */
import { NextRequest, NextResponse } from "next/server";
import { sendTelegram, formatUrgenceAlert } from "@/lib/agents/telegram";
import { addImprovementLog } from "@/lib/agents/memory";

const URGENCE_KEYWORDS = [
  "bloqué", "bloque", "dehors", "claquée", "claquee", "urgence",
  "coincé", "coincee", "bébé", "bebe", "enfant", "nuit", "cassée",
  "cassee", "forcée", "forcee", "cambriolage", "froid", "pleuvoir",
];

const EXTRACTION_PATTERNS = {
  prenom: /(?:je suis|c'est|bonjour,?\s*)([A-ZÀ-Ÿ][a-zà-ÿ]+)/i,
  telephone: /(?:\+33|0)[1-9](?:[\s.-]?\d{2}){4}/,
  adresse: /(\d+[,\s]+(?:rue|avenue|allée|impasse|boulevard|place|chemin)[^,\n]+)/i,
};

function extractLeadData(message: string) {
  const prenomMatch = message.match(EXTRACTION_PATTERNS.prenom);
  const telMatch = message.match(EXTRACTION_PATTERNS.telephone);
  const adresseMatch = message.match(EXTRACTION_PATTERNS.adresse);

  const msg = message.toLowerCase();
  const urgenceScore = URGENCE_KEYWORDS.filter((k) => msg.includes(k)).length;

  let probleme = "autre";
  if (msg.includes("claqu") || msg.includes("dehors")) probleme = "porte_claquee";
  else if (msg.includes("cass") && msg.includes("cl")) probleme = "cle_cassee";
  else if (msg.includes("bloqu") || msg.includes("gripp")) probleme = "serrure_bloquee";
  else if (msg.includes("cambriol") || msg.includes("forc")) probleme = "post_cambriolage";

  return {
    prenom: prenomMatch?.[1] ?? "Client",
    telephone: telMatch?.[0] ?? "Non fourni",
    adresse: adresseMatch?.[1] ?? "Non fournie",
    probleme,
    urgence_score: Math.min(10, urgenceScore * 2 + 4),
    is_urgence: urgenceScore >= 2,
  };
}

function generateChatResponse(score: number, probleme: string): {
  message: string;
  show_call_button: boolean;
  call_button_text: string;
} {
  if (score >= 7) {
    return {
      message: `Je comprends l'urgence ! Notre serrurier peut être chez vous dans **20 à 40 minutes**. Pour une intervention immédiate, appelez directement :`,
      show_call_button: true,
      call_button_text: "📞 Appeler maintenant — intervention rapide",
    };
  }
  if (score >= 5) {
    return {
      message: `Votre demande concernant votre ${probleme.replace("_", " ")} a bien été prise en compte. Souhaitez-vous une intervention rapide ? Nos serruriers sont disponibles 24h/24.`,
      show_call_button: true,
      call_button_text: "📞 Appeler le 05 82 95 17 42",
    };
  }
  return {
    message: `Merci pour votre message. Pour un devis gratuit et une réponse immédiate, notre équipe est disponible par téléphone.`,
    show_call_button: false,
    call_button_text: "📞 05 82 95 17 42",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = body.message ?? body.text ?? "";
    const sessionId: string = body.session_id ?? "unknown";

    if (!message.trim()) {
      return NextResponse.json({ error: "message requis" }, { status: 400 });
    }

    const lead = extractLeadData(message);
    const response = generateChatResponse(lead.urgence_score, lead.probleme);

    // Si urgence → alerter via Telegram immédiatement
    if (lead.is_urgence && lead.urgence_score >= 6) {
      const telegramMsg = formatUrgenceAlert({
        prenom: lead.prenom,
        adresse: lead.adresse,
        probleme: lead.probleme,
        telephone: lead.telephone,
        score: lead.urgence_score,
        canal: "chat",
      });
      const sent = await sendTelegram(telegramMsg);
      addImprovementLog(
        `💬 Chat urgence détectée — session=${sessionId} score=${lead.urgence_score} telegram=${sent ? "✅" : "❌"}`
      );
    }

    return NextResponse.json({
      session_id: sessionId,
      lead_detecte: lead,
      reponse_chat: response,
      webhook_n8n_triggered: lead.is_urgence,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
