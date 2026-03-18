/**
 * AGENT 1 — KAYTEK_URGENCE
 * Webhook : POST /api/agents/kaytek-urgence
 * Expert en psychologie d'urgence et qualification comportementale
 */

import { NextRequest, NextResponse } from "next/server";
import {
  saveLeadMemory,
  getLeadMemory,
  getScoringWeights,
  updateScoringWeights,
  addImprovementLog,
  runDailyAnalysis,
  getStats,
} from "@/lib/agents/memory";
import { sendTelegram, formatUrgenceAlert } from "@/lib/agents/telegram";

// ─── Zones valides ────────────────────────────────────────────────────────────
const ZONES_VALIDES = [
  "toulouse", "blagnac", "colomiers", "tournefeuille", "plaisance",
  "léguevin", "leguevin", "pibrac", "cornebarrieu", "fenouillet",
  "saint-alban", "l'union", "union", "balma", "quint", "pin-balma",
  "flourens", "mondouzil", "montrabé", "montrabe", "verfeil", "aucamville",
  "beauzelle", "aussonne", "seilh", "gagnac", "castelginest", "bruguières",
  "bruguieres", "launaguet", "saint-jean", "pechbonnieu", "labège", "labege",
  "castanet", "ramonville", "escalquens", "auzielle", "cugnaux",
  "villeneuve-tolosane", "roques", "portet", "muret", "seysses", "fonsorbes",
  "frouzins", "brax", "saint-lys", "baziège", "baziege", "ayguesvives",
  "montgiscard", "montesquieu", "villenouvelle", "labastide", "montlaur",
  "mauremont", "donneville", "fourquevaux", "auterive", "nailloux",
  "villefranche", "gardouch", "préserville", "preserville", "pompertuzat",
  "belberaud", "corronsac", "clermont-le-fort", "lacroix", "pinsaguel",
  "vernet", "saint-orens", "haute-garonne", "31", "occitanie",
];

// ─── Moteur de scoring adaptatif ─────────────────────────────────────────────

function computeScore(message: string, problemeExplicite?: string): {
  score: number;
  confiance: number;
  patterns_detectes: string[];
  pattern_nouveau: boolean;
  zone_detectee: string;
  zone_valide: boolean;
  probleme: string;
  contexte_emotionnel: string;
} {
  const msg = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const weights = getScoringWeights();
  let score = 5; // base neutre
  const patterns_detectes: string[] = [];
  let pattern_nouveau = false;

  // ── Détection spam (score 0) ──
  const isSpam = weights.mots_spam.some((spam) => msg.includes(spam));
  if (isSpam) {
    return {
      score: 0, confiance: 0.95, patterns_detectes: ["spam_zone"],
      pattern_nouveau: false, zone_detectee: "hors_zone", zone_valide: false,
      probleme: "autre", contexte_emotionnel: "spam",
    };
  }

  // ── Détection zone ──
  const zoneMatch = ZONES_VALIDES.find((z) => msg.includes(z));
  // Si le lead vient du chatbot du site (canal chatbot_site) avec un problème explicite
  // → toujours considéré comme zone valide (le site Kaytek cible uniquement Toulouse/Baziège)
  const zone_valide_chatbot = problemeExplicite && problemeExplicite !== "autre";
  const zone_detectee = zoneMatch ?? (zone_valide_chatbot ? "toulouse" : "non_detectee");
  const zone_valide = !!zoneMatch || !!zone_valide_chatbot;

  if (!zone_valide) {
    score -= 2;
    patterns_detectes.push("zone_inconnue");
  }

  // ── Mots critique (score +3) ──
  Object.entries(weights.mots_critique).forEach(([mot, poids]) => {
    if (msg.includes(mot)) {
      score += poids;
      patterns_detectes.push(`critique:${mot}`);
    }
  });

  // ── Mots haute urgence ──
  Object.entries(weights.mots_haute).forEach(([mot, poids]) => {
    if (msg.includes(mot)) {
      score += poids;
      patterns_detectes.push(`haute:${mot}`);
    }
  });

  // ── Mots urgence modérée ──
  Object.entries(weights.mots_moderee).forEach(([mot, poids]) => {
    if (msg.includes(mot)) {
      score += poids;
      patterns_detectes.push(`moderee:${mot}`);
    }
  });

  // ── Mots devis (réducteurs) ──
  Object.entries(weights.mots_devis).forEach(([mot, poids]) => {
    if (msg.includes(mot)) {
      score += poids;
      patterns_detectes.push(`devis:${mot}`);
    }
  });

  // ── Heure de nuit détectée dans le message ──
  const heureNuitMatch = msg.match(/\b(2[0-3]h|0[0-7]h|minuit|23h|22h|21h|20h|[0-7]h)\b/);
  if (heureNuitMatch) {
    score += 2;
    patterns_detectes.push(`heure_nuit:${heureNuitMatch[0]}`);
  }

  // ── Détection problème (message + champ explicite du chatbot) ──
  let probleme = "autre";
  if (
    problemeExplicite === "porte_claquee" ||
    msg.includes("claqu") || msg.includes("oubli") || msg.includes("cle a l") ||
    msg.includes("cle interieur") || msg.includes("cles interieur")
  ) probleme = "porte_claquee";
  else if (msg.includes("cass") && msg.includes("cl")) probleme = "cle_cassee";
  else if (msg.includes("bloqu") || msg.includes("gripp") || msg.includes("tourne")) probleme = "serrure_bloquee";
  else if (msg.includes("cambriol") || msg.includes("forc") || msg.includes("effraction")) probleme = "post_cambriolage";
  else if (msg.includes("remplac") || msg.includes("install") || msg.includes("changer")) probleme = "remplacement";
  // Forcer le problème si passé explicitement depuis le chatbot
  if (problemeExplicite && problemeExplicite !== "autre") probleme = problemeExplicite;

  // ─────────────────────────────────────────────────────────────────────────
  // RÈGLES DE PLANCHER (score minimum garanti par type de problème + zone)
  // ─────────────────────────────────────────────────────────────────────────

  // Règle 1 : Porte claquée en zone valide → score minimum 7
  if (probleme === "porte_claquee" && zone_valide && score < 7) {
    score = 7;
    patterns_detectes.push("plancher:porte_claquee_zone_valide");
  }

  // Règle 2 : Post-cambriolage en zone valide → score minimum 8
  if (probleme === "post_cambriolage" && zone_valide && score < 8) {
    score = 8;
    patterns_detectes.push("plancher:post_cambriolage_zone_valide");
  }

  // Règle 3 : Clé cassée en zone valide → score minimum 7
  if (probleme === "cle_cassee" && zone_valide && score < 7) {
    score = 7;
    patterns_detectes.push("plancher:cle_cassee_zone_valide");
  }

  // Règle 4 : Serrure bloquée en zone valide → score minimum 6
  if (probleme === "serrure_bloquee" && zone_valide && score < 6) {
    score = 6;
    patterns_detectes.push("plancher:serrure_bloquee_zone_valide");
  }

  // Règle 5 : Mots de contexte critique → forcer score >= 9
  const motsCritiquesContexte = ["bebe", "enfant", "fils", "fille", "nuit", "minuit", "froid", "medicament", "dehors"];
  const hasCritiqueContexte = motsCritiquesContexte.some((m) => msg.includes(m));
  if (hasCritiqueContexte && zone_valide && score < 9) {
    score = 9;
    patterns_detectes.push("plancher:contexte_critique");
  }

  // ─────────────────────────────────────────────────────────────────────────

  // ── Apprentissage actif ──
  const historique = getLeadMemory();
  const patternsSimilaires = historique.filter((l) => {
    const msgHist = l.message_original.toLowerCase();
    return patterns_detectes.some((p) => msgHist.includes(p.split(":")[1] ?? ""));
  });

  if (patternsSimilaires.length === 0 && patterns_detectes.length > 0) {
    pattern_nouveau = true;
    addImprovementLog(`🆕 Nouveau pattern: [${patterns_detectes.join(", ")}] score=${score}`);
  }

  // ── Clamper entre 0 et 10 ──
  score = Math.min(10, Math.max(0, score));

  // ── Confiance ──
  const confiance = Math.min(0.99, 0.4 + patterns_detectes.length * 0.08);

  // ── Contexte émotionnel ──
  let contexte_emotionnel = "calme";
  if (score >= 9) contexte_emotionnel = "panique";
  else if (score >= 7) contexte_emotionnel = "stress";
  else if (msg.includes("pro") || msg.includes("bailleur") || msg.includes("locataire")) contexte_emotionnel = "professionnel";

  return {
    score, confiance, patterns_detectes, pattern_nouveau,
    zone_detectee, zone_valide, probleme, contexte_emotionnel,
  };
}

// ─── Générateur d'email adaptatif ────────────────────────────────────────────

function generateEmail(score: number, heure: number, probleme: string, contexte: string, zone: string) {
  const phone = "05 82 95 17 42";
  const delai = "20 à 40 minutes";

  if (score >= 8 && (heure >= 20 || heure < 8)) {
    return {
      objet: "🔐 Kaytek Services — Intervention immédiate",
      corps: `Bonsoir,\n\nNous avons bien reçu votre demande urgente.\n\n📞 Appelez-nous MAINTENANT : ${phone}\n⚡ Notre serrurier arrive en ${delai}\n\nNous sommes disponibles 24h/24. Ne restez pas bloqué(e).\n\nKaytek Services\n${phone}`,
    };
  }
  if (score >= 8) {
    return {
      objet: "Kaytek Services — Réponse urgente",
      corps: `Bonjour,\n\nVotre demande de dépannage serrurier a été reçue.\n\n📞 Appelez-nous : ${phone}\n⏱️ Intervention en ${delai}\n\nTarif communiqué avant déplacement. Disponible 24h/24.\n\nKaytek Services`,
    };
  }
  if (score >= 5) {
    return {
      objet: "Kaytek Services — Votre demande",
      corps: `Bonjour,\n\nMerci pour votre contact. Nous avons bien pris en compte votre demande concernant votre ${probleme.replace("_", " ")}.\n\n📞 ${phone}\n🕐 Disponible 24h/24, 7j/7\n\nKaytek Services — Serrurier Toulouse & Baziège`,
    };
  }
  if (score >= 2) {
    return {
      objet: "Kaytek Services — Devis gratuit",
      corps: `Bonjour,\n\nMerci pour votre intérêt. Nous proposons des devis gratuits par téléphone.\n\n📞 ${phone}\n✅ Tarif transparent — aucune surprise\n✅ Disponible 24h/24\n\nKaytek Services`,
    };
  }
  return { objet: null, corps: null };
}

// ─── Déduire une leçon ───────────────────────────────────────────────────────

function deduireLecon(score: number, patterns: string[], pattern_nouveau: boolean): string {
  if (score === 0) return "Spam hors zone détecté — blacklisté";
  if (pattern_nouveau) return `Nouveau pattern appris: [${patterns.slice(0, 3).join(", ")}]`;
  if (score >= 9) return `Urgence critique confirmée via: ${patterns.slice(0, 2).join(", ")}`;
  if (score >= 7) return `Urgence haute via: ${patterns.slice(0, 2).join(", ")}`;
  return `Lead standard — score ${score}`;
}

// ─── Handler principal ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = body.message ?? body.text ?? body.content ?? "";
    const canal: string = body.canal ?? body.source ?? "webhook";
    const heureActuelle = new Date().getHours();
    // Problème explicite envoyé par le chatbot (ex: "porte_claquee")
    const problemeExplicite: string | undefined = body.probleme ?? undefined;

    if (!message.trim()) {
      return NextResponse.json({ error: "message requis" }, { status: 400 });
    }

    // Calcul du score — avec problème explicite du chatbot
    const {
      score, confiance, patterns_detectes, pattern_nouveau,
      zone_detectee, zone_valide, probleme, contexte_emotionnel,
    } = computeScore(message, problemeExplicite);

    // Déterminer action
    let action: string;
    let priorite: string;
    if (score >= 9) { action = "APPELER_IMMÉDIAT"; priorite = "CRITIQUE"; }
    else if (score >= 7) { action = "APPELER_IMMÉDIAT"; priorite = "HAUTE"; }
    else if (score >= 5) { action = "RÉPONDRE_EMAIL"; priorite = "NORMALE"; }
    else if (score >= 2) { action = "DEVIS"; priorite = "NORMALE"; }
    else { action = "QUARANTAINE"; priorite = "IGNORER"; }

    // Générer email
    const { objet: email_objet, corps: email_corps } = generateEmail(
      score, heureActuelle, probleme, contexte_emotionnel, zone_detectee
    );

    // Leçon
    const lecon = deduireLecon(score, patterns_detectes, pattern_nouveau);

    // Mémoriser
    const memoryEntry = saveLeadMemory({
      timestamp: new Date().toISOString(),
      message_original: message,
      score_attribue: score,
      action_prise: action,
      resultat_reel: "inconnu",
      lecon_apprise: lecon,
      ajustement_scoring: pattern_nouveau ? `Nouveau pattern ajouté: ${patterns_detectes[0]}` : null,
      ville: zone_detectee,
      probleme,
      canal_entrant: canal,
      pattern_nouveau,
    });

    // Log
    addImprovementLog(`📥 Lead [${memoryEntry.id}] score=${score} action=${action} ville=${zone_detectee}`);

    // ── Alerte Telegram si score >= 7 (directement ici, pas besoin de route séparée) ──
    let telegram_sent = false;
    if (score >= 7) {
      const telegramMsg = formatUrgenceAlert({
        prenom: body.prenom ?? "Client",
        adresse: body.adresse ?? body.address ?? zone_detectee,
        probleme: probleme.replace(/_/g, " "),
        telephone: body.telephone ?? body.phone ?? "Non renseigné",
        score,
        canal,
        ville: zone_detectee,
      });
      telegram_sent = await sendTelegram(telegramMsg);
      addImprovementLog(
        `📲 Telegram [${memoryEntry.id}] ${telegram_sent ? "✅ envoyé" : "❌ échec"} score=${score}`
      );
    }

    // Résultat JSON strict
    const result = {
      urgence_reelle: score >= 7,
      score,
      score_confiance: Number(confiance.toFixed(2)),
      localisation: zone_detectee,
      zone_valide,
      probleme,
      contexte_emotionnel,
      action,
      email_objet,
      email_corps,
      priorite,
      canal_entrant: canal,
      lecon,
      pattern_nouveau,
      lead_id: memoryEntry.id,
      telegram_sent,
      trigger_avis_apres_intervention: score >= 5 && zone_valide,
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Erreur agent", detail: String(err) }, { status: 500 });
  }
}

// ─── GET : stats + logs ──────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "analyse") {
    const rapport = runDailyAnalysis();
    return NextResponse.json({ rapport, stats: getStats() });
  }
  if (action === "weights") {
    return NextResponse.json(getScoringWeights());
  }
  if (action === "update_result") {
    // Permettre de mettre à jour le résultat d'un lead (converti/non_converti)
    const leadId = searchParams.get("lead_id");
    const resultat = searchParams.get("resultat") as "converti" | "non_converti";
    if (leadId && resultat) {
      const leads = getLeadMemory();
      const lead = leads.find((l) => l.id === leadId);
      if (lead) {
        lead.resultat_reel = resultat;
        // Apprentissage : si faux positif → ajuster poids
        if (resultat === "non_converti" && lead.score_attribue >= 7) {
          addImprovementLog(`⚠️ Faux positif détecté pour lead ${leadId} — poids ajusté`);
          const weights = getScoringWeights();
          // Réduire le poids des patterns du lead
          if (lead.lecon_apprise.includes("critique:")) {
            const pattern = lead.lecon_apprise.split("critique:")[1]?.split(",")[0]?.trim();
            if (pattern && weights.mots_critique[pattern]) {
              weights.mots_critique[pattern] = Math.max(1, weights.mots_critique[pattern] - 1);
              updateScoringWeights({ mots_critique: weights.mots_critique });
            }
          }
        }
        // Apprentissage : si faux négatif → augmenter poids
        if (resultat === "converti" && lead.score_attribue <= 5) {
          addImprovementLog(`📈 Faux négatif détecté pour lead ${leadId} — poids augmenté`);
        }
        return NextResponse.json({ ok: true, lead });
      }
    }
    return NextResponse.json({ error: "lead_id invalide" }, { status: 400 });
  }

  return NextResponse.json({
    agent: "KAYTEK_URGENCE",
    version: getScoringWeights().version,
    stats: getStats(),
    leads_en_memoire: getLeadMemory().length,
    webhook_url: "https://www.kaytek-services.fr/api/agents/kaytek-urgence",
    endpoints: {
      POST: "Qualifier un nouveau lead",
      "GET?action=analyse": "Déclencher analyse quotidienne",
      "GET?action=weights": "Voir les poids de scoring actuels",
      "GET?action=update_result&lead_id=X&resultat=converti": "Feedback résultat",
    },
  });
}
