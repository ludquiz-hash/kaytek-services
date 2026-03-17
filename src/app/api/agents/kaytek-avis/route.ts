/**
 * AGENT 2 — KAYTEK_AVIS
 * Webhook : POST /api/agents/kaytek-avis
 * Expert en psychologie des avis, persuasion éthique, gestion réputation
 */

import { NextRequest, NextResponse } from "next/server";
import {
  saveAvisMemory,
  getAvisMemory,
  addImprovementLog,
  runMonthlyAvisAnalysis,
  getStats,
} from "@/lib/agents/memory";

const LIEN_AVIS =
  "https://search.google.com/local/writereview?placeid=ChIJTRg52fDNYGoRB4cVn5mgoYY";

const PHONE = "05 82 95 17 42";

// ─── Calcul fenêtre optimale ────────────────────────────────────────────────

function isFenetreOptimale(heureIntervention: string): boolean {
  const [h, m] = heureIntervention.split(":").map(Number);
  const minutesIntervention = h * 60 + m;
  const maintenant = new Date();
  const minutesMaintenant = maintenant.getHours() * 60 + maintenant.getMinutes();
  const delai = minutesMaintenant - minutesIntervention;
  // Fenêtre optimale : 2h à 4h après l'intervention
  return delai >= 90 && delai <= 300;
}

// ─── Calcul probabilité de conversion ──────────────────────────────────────

function calculerProbabiliteConversion(
  prenom: string,
  ville: string,
  heure_envoi: string,
  type_intervention: string,
  fenetre_optimale: boolean
): number {
  let proba = 0.15; // base

  // Fenêtre optimale +0.20
  if (fenetre_optimale) proba += 0.20;

  // Prénom mentionné +0.08
  if (prenom && prenom.length > 1) proba += 0.08;

  // Ville spécifique +0.05
  if (ville && ville.length > 2) proba += 0.05;

  // Apprentissage actif : analyser l'historique
  const avisHistory = getAvisMemory();
  const sameCity = avisHistory.filter(
    (a) => a.ville.toLowerCase() === ville.toLowerCase() && a.avis_recu
  );
  const sameType = avisHistory.filter(
    (a) => a.type_intervention === type_intervention && a.avis_recu
  );

  if (sameCity.length > 0) proba += 0.04 * Math.min(sameCity.length, 3);
  if (sameType.length > 0) proba += 0.03 * Math.min(sameType.length, 3);

  // Heure d'envoi optimale (14h-18h)
  const [h] = heure_envoi.split(":").map(Number);
  if (h >= 14 && h <= 18) proba += 0.06;
  else if (h >= 10 && h <= 12) proba += 0.03;

  return Math.min(0.95, Number(proba.toFixed(2)));
}

// ─── Générateur message demande d'avis ──────────────────────────────────────

function genererMessageDemandeAvis(
  prenom: string,
  ville: string,
  type_intervention: string,
  proba: number
): { objet: string; corps: string } {
  // Apprendre de l'historique : quel format convertit le mieux ?
  const avisHistory = getAvisMemory();
  const messagesReussis = avisHistory.filter((a) => a.avis_recu);

  // Template court (taux > 35%) vs long
  const useShortTemplate = proba > 0.3 || messagesReussis.length > 10;

  const typeLabel = {
    porte_claquee: "porte claquée",
    cle_cassee: "clé cassée",
    serrure_bloquee: "serrure bloquée",
    remplacement: "changement de serrure",
  }[type_intervention] ?? "intervention";

  if (useShortTemplate) {
    return {
      objet: `${prenom}, votre avis sur notre intervention à ${ville}`,
      corps: `Bonjour ${prenom},\n\nVotre ${typeLabel} à ${ville} est réglé. Votre avis nous aide beaucoup :\n👉 ${LIEN_AVIS}\n\nMerci ! Kaytek Services`,
    };
  }

  return {
    objet: `Kaytek Services — Votre retour sur notre passage à ${ville}`,
    corps: `Bonjour ${prenom},\n\nNous espérons que votre ${typeLabel} à ${ville} est bien résolu.\nSi vous avez quelques secondes, votre avis Google nous aide énormément :\n\n👉 ${LIEN_AVIS}\n\nMerci pour votre confiance.\nKaytek Services — ${PHONE}`,
  };
}

// ─── Générateur réponse aux avis ────────────────────────────────────────────

function genererReponseAvis(
  note: number,
  texte_avis: string,
  ville: string,
  type_intervention: string
): {
  reponse: string;
  publier_auto: boolean;
  alerte_negative: boolean;
  priorite_validation: "haute" | "normale" | "faible";
} {
  const typeLabel = {
    porte_claquee: "porte claquée",
    cle_cassee: "clé cassée",
    serrure_bloquee: "serrure bloquée",
    remplacement: "changement de serrure",
  }[type_intervention] ?? "intervention";

  if (note === 5) {
    return {
      reponse: `Ravi d'avoir pu vous dépanner rapidement${ville ? ` à ${ville}` : ""} ! N'hésitez pas à nous rappeler pour tout besoin de serrurerie. Kaytek Services`,
      publier_auto: true,
      alerte_negative: false,
      priorite_validation: "faible",
    };
  }

  if (note === 4) {
    return {
      reponse: `Merci pour votre confiance${ville ? ` à ${ville}` : ""} ! Si vous avez des suggestions pour améliorer notre service, nous sommes à l'écoute. ${PHONE}`,
      publier_auto: true,
      alerte_negative: false,
      priorite_validation: "normale",
    };
  }

  if (note === 3) {
    const isSpecifique = texte_avis.length > 30;
    return {
      reponse: `Merci pour votre retour. Votre satisfaction est notre priorité et nous sommes désolés que votre expérience n'ait pas été parfaite. N'hésitez pas à nous contacter directement au ${PHONE} pour en discuter. Kaytek Services`,
      publier_auto: !isSpecifique,
      alerte_negative: isSpecifique,
      priorite_validation: isSpecifique ? "haute" : "normale",
    };
  }

  // Note 1 ou 2
  return {
    reponse: `Bonjour, nous sommes sincèrement désolés que notre intervention ne vous ait pas satisfait(e). Nous prenons votre retour très au sérieux. Pouvez-vous nous contacter directement au ${PHONE} ? Nous souhaitons comprendre et corriger la situation. Kaytek Services`,
    publier_auto: false,
    alerte_negative: true,
    priorite_validation: "haute",
  };
}

// ─── Leçon apprise ──────────────────────────────────────────────────────────

function deduireLeconAvis(
  mode: string,
  note: number | null,
  fenetre_optimale: boolean,
  proba: number
): { lecon: string; suggestion: string | null } {
  if (mode === "demande_avis") {
    if (!fenetre_optimale) {
      return {
        lecon: "Message envoyé hors fenêtre optimale — taux de conversion réduit",
        suggestion: "Envoyer entre 2h et 4h après l'intervention pour maximiser la conversion",
      };
    }
    if (proba > 0.35) {
      return {
        lecon: "Conditions optimales réunies — fort taux de conversion attendu",
        suggestion: null,
      };
    }
    return {
      lecon: "Message dans la fenêtre mais probabilité moyenne",
      suggestion: "Personnaliser davantage avec des détails de l'intervention",
    };
  }

  // Mode réponse avis
  if (note && note <= 2) {
    return {
      lecon: "Avis négatif détecté — réponse empathique générée, validation manuelle requise",
      suggestion: "Rappeler le client dans les 24h pour comprendre la situation",
    };
  }
  if (note === 5) {
    return {
      lecon: "Avis 5 étoiles — réponse avec mot-clé SEO local générée automatiquement",
      suggestion: null,
    };
  }
  return {
    lecon: `Avis ${note}/5 — réponse neutre générée`,
    suggestion: note ? (note < 4 ? "Investiguer le point de friction" : null) : null,
  };
}

// ─── Handler principal ───────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mode: "demande_avis" | "reponse_avis" = body.mode ?? "demande_avis";

    // ── Mode 1 : Demande d'avis post-intervention ──
    if (mode === "demande_avis") {
      const prenom: string = body.prenom ?? "";
      const ville: string = body.ville ?? "";
      const type_intervention: string = body.type_intervention ?? "autre";
      const heure_intervention: string = body.heure_intervention ?? "12:00";
      const heure_envoi = new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit", minute: "2-digit",
      });

      const fenetre_optimale = isFenetreOptimale(heure_intervention);
      const proba = calculerProbabiliteConversion(
        prenom, ville, heure_envoi, type_intervention, fenetre_optimale
      );

      const { objet: email_objet, corps: email_corps } = genererMessageDemandeAvis(
        prenom, ville, type_intervention, proba
      );

      const { lecon, suggestion } = deduireLeconAvis("demande_avis", null, fenetre_optimale, proba);

      // Mémoriser
      saveAvisMemory({
        timestamp: new Date().toISOString(),
        message_envoye: email_corps,
        heure_envoi,
        ville,
        type_intervention,
        avis_recu: false, // mis à jour plus tard
        note_obtenue: null,
        delai_reponse_heures: null,
        lecon,
      });

      addImprovementLog(
        `📨 Demande avis envoyée — ${prenom} ${ville} — proba=${proba} — fenetre=${fenetre_optimale}`
      );

      return NextResponse.json({
        mode: "demande_avis",
        email_objet,
        email_corps,
        longueur_chars: email_corps.length,
        fenetre_optimale,
        probabilite_conversion: proba,
        publier_auto: true,
        priorite_validation: fenetre_optimale ? "normale" : "haute",
        alerte_negative: false,
        lecon_apprentissage: lecon,
        suggestion_amelioration: suggestion,
        lien_avis: LIEN_AVIS,
      });
    }

    // ── Mode 2 : Répondre à un avis reçu ──
    if (mode === "reponse_avis") {
      const note: number = body.note ?? 5;
      const texte_avis: string = body.texte ?? "";
      const ville: string = body.ville ?? "";
      const type_intervention: string = body.type_intervention ?? "autre";

      const {
        reponse, publier_auto, alerte_negative, priorite_validation,
      } = genererReponseAvis(note, texte_avis, ville, type_intervention);

      const { lecon, suggestion } = deduireLeconAvis("reponse_avis", note, false, 0);

      // Mémoriser l'avis reçu
      saveAvisMemory({
        timestamp: new Date().toISOString(),
        message_envoye: reponse,
        heure_envoi: new Date().toLocaleTimeString("fr-FR"),
        ville,
        type_intervention,
        avis_recu: true,
        note_obtenue: note,
        delai_reponse_heures: 0,
        lecon,
      });

      if (alerte_negative) {
        addImprovementLog(`🚨 ALERTE avis négatif ${note}/5 à ${ville}: "${texte_avis.slice(0, 80)}"`);
      }

      return NextResponse.json({
        mode: "reponse_avis",
        email_objet: null,
        email_corps: reponse,
        longueur_chars: reponse.length,
        fenetre_optimale: false,
        probabilite_conversion: 0,
        publier_auto,
        priorite_validation,
        alerte_negative,
        lecon_apprentissage: lecon,
        suggestion_amelioration: suggestion,
      });
    }

    return NextResponse.json({ error: "mode invalide — utiliser demande_avis ou reponse_avis" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "Erreur agent", detail: String(err) }, { status: 500 });
  }
}

// ─── GET : stats + analyse mensuelle ────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  if (action === "analyse_mensuelle") {
    const rapport = runMonthlyAvisAnalysis();
    return NextResponse.json({ rapport, stats: getStats() });
  }

  return NextResponse.json({
    agent: "KAYTEK_AVIS",
    stats: getStats(),
    avis_en_memoire: getAvisMemory().length,
    webhook_url: "https://www.kaytek-services.fr/api/agents/kaytek-avis",
    endpoints: {
      "POST {mode:'demande_avis', prenom, ville, type_intervention, heure_intervention}": "Générer demande d'avis",
      "POST {mode:'reponse_avis', note, texte, ville, type_intervention}": "Générer réponse à un avis",
      "GET?action=analyse_mensuelle": "Déclencher analyse mensuelle",
    },
  });
}
