/**
 * CONNEXION INTER-AGENTS
 * POST /api/agents/trigger-avis
 *
 * Déclenché par KAYTEK_URGENCE 3h après une intervention confirmée.
 * Appelle KAYTEK_AVIS pour générer la demande d'avis.
 *
 * Body : { lead_id, prenom, ville, type_intervention, heure_intervention }
 */

import { NextRequest, NextResponse } from "next/server";
import { addImprovementLog, getLeadMemory } from "@/lib/agents/memory";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead_id, prenom, ville, type_intervention, heure_intervention } = body;

    // Vérifier que le lead existe en mémoire
    const leads = getLeadMemory();
    const lead = leads.find((l) => l.id === lead_id);

    if (!lead) {
      addImprovementLog(`⚠️ trigger-avis: lead_id ${lead_id} non trouvé — avis non déclenché`);
      return NextResponse.json({ error: "Lead introuvable" }, { status: 404 });
    }

    // Marquer le lead comme converti
    lead.resultat_reel = "converti";

    // Appeler l'agent KAYTEK_AVIS
    const baseUrl = req.nextUrl.origin;
    const avisResponse = await fetch(`${baseUrl}/api/agents/kaytek-avis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "demande_avis",
        prenom: prenom ?? "vous",
        ville: ville ?? lead.ville,
        type_intervention: type_intervention ?? lead.probleme,
        heure_intervention: heure_intervention ?? "12:00",
      }),
    });

    const avisData = await avisResponse.json();

    addImprovementLog(
      `🔗 Flux URGENCE→AVIS: lead ${lead_id} converti — demande avis générée pour ${prenom} à ${ville}`
    );

    return NextResponse.json({
      ok: true,
      lead_id,
      lead_marque_converti: true,
      avis_genere: avisData,
      message: `Demande d'avis générée pour ${prenom} à ${ville}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Erreur connexion inter-agents", detail: String(err) }, { status: 500 });
  }
}
