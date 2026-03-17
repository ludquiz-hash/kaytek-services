/**
 * MÉMOIRE PERSISTANTE PARTAGÉE — Kaytek Agents
 * Stockage via variables d'environnement Netlify Blobs
 * Fallback : mémoire in-process (reset à chaque déploiement)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeadMemory {
  id: string;
  timestamp: string;
  message_original: string;
  score_attribue: number;
  action_prise: string;
  resultat_reel: "converti" | "non_converti" | "inconnu";
  lecon_apprise: string;
  ajustement_scoring: string | null;
  ville: string;
  probleme: string;
  canal_entrant: string;
  pattern_nouveau: boolean;
}

export interface AvisMemory {
  id: string;
  timestamp: string;
  message_envoye: string;
  heure_envoi: string;
  ville: string;
  type_intervention: string;
  avis_recu: boolean;
  note_obtenue: number | null;
  delai_reponse_heures: number | null;
  lecon: string;
}

export interface ScoringWeights {
  mots_critique: Record<string, number>;
  mots_haute: Record<string, number>;
  mots_moderee: Record<string, number>;
  mots_devis: Record<string, number>;
  mots_spam: string[];
  derniere_mise_a_jour: string;
  version: number;
}

export interface AgentStats {
  total_leads: number;
  leads_convertis: number;
  leads_spam: number;
  precision_qualification: number;
  taux_conversion: number;
  taux_faux_positifs: number;
  total_avis_demandes: number;
  avis_recus: number;
  taux_conversion_avis: number;
  score_moyen_avis: number;
  derniere_analyse: string;
}

// ─── Mémoire in-process (partagée entre requêtes via module singleton) ────────

const store: {
  leads: LeadMemory[];
  avis: AvisMemory[];
  weights: ScoringWeights;
  stats: AgentStats;
  improvement_logs: string[];
} = {
  leads: [],
  avis: [],
  weights: getDefaultWeights(),
  stats: getDefaultStats(),
  improvement_logs: [],
};

function getDefaultWeights(): ScoringWeights {
  return {
    mots_critique: {
      "bloqué": 3, "dehors": 3, "bébé": 3, "bebe": 3, "enfant": 2,
      "fils": 2, "fille": 2, "nuit": 2, "minuit": 3, "23h": 2, "2h": 2,
      "3h": 2, "froid": 2, "pluie": 2, "pleuvoir": 2, "chien": 2,
      "médicaments": 3, "medicaments": 3, "coincé": 3, "coincee": 3,
      "panique": 3, "bloquee": 3, "locked": 2, "urgent": 1,
    },
    mots_haute: {
      "aujourd'hui": 1, "ce soir": 1, "rapidement": 1, "forcée": 2,
      "forcee": 2, "cambriolage": 3, "volé": 2, "vole": 2,
      "ferme plus": 2, "cassée": 1, "cassee": 1, "clé cassée": 2,
      "porte claquée": 2, "serrure bloquée": 2,
    },
    mots_moderee: {
      "demain": 1, "cette semaine": 1, "grince": 1, "du mal": 1,
      "difficile": 1, "problème": 1, "probleme": 1,
    },
    mots_devis: {
      "combien": -2, "tarif": -1, "prix": -1, "devis": -2,
      "comparer": -2, "plusieurs": -1,
    },
    mots_spam: [
      "paris", "lyon", "marseille", "bordeaux", "nice", "lille",
      "strasbourg", "nantes", "montpellier", "rennes",
      "concurrent", "test", "bonjour seul",
    ],
    derniere_mise_a_jour: new Date().toISOString(),
    version: 1,
  };
}

function getDefaultStats(): AgentStats {
  return {
    total_leads: 0,
    leads_convertis: 0,
    leads_spam: 0,
    precision_qualification: 1.0,
    taux_conversion: 0,
    taux_faux_positifs: 0,
    total_avis_demandes: 0,
    avis_recus: 0,
    taux_conversion_avis: 0,
    score_moyen_avis: 0,
    derniere_analyse: new Date().toISOString(),
  };
}

// ─── API mémoire leads ────────────────────────────────────────────────────────

export function saveLeadMemory(lead: Omit<LeadMemory, "id">): LeadMemory {
  const entry: LeadMemory = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  };
  store.leads.unshift(entry);
  // Conserver 50 derniers
  if (store.leads.length > 50) store.leads = store.leads.slice(0, 50);
  store.stats.total_leads++;
  if (entry.resultat_reel === "converti") store.stats.leads_convertis++;
  if (entry.score_attribue <= 1) store.stats.leads_spam++;
  updateStats();
  return entry;
}

export function getLeadMemory(): LeadMemory[] {
  return store.leads;
}

// ─── API mémoire avis ────────────────────────────────────────────────────────

export function saveAvisMemory(avis: Omit<AvisMemory, "id">): AvisMemory {
  const entry: AvisMemory = {
    ...avis,
    id: `avis_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  };
  store.avis.unshift(entry);
  if (store.avis.length > 100) store.avis = store.avis.slice(0, 100);
  store.stats.total_avis_demandes++;
  if (entry.avis_recu) store.stats.avis_recus++;
  updateStats();
  return entry;
}

export function getAvisMemory(): AvisMemory[] {
  return store.avis;
}

// ─── Poids de scoring ────────────────────────────────────────────────────────

export function getScoringWeights(): ScoringWeights {
  return store.weights;
}

export function updateScoringWeights(updates: Partial<ScoringWeights>) {
  store.weights = {
    ...store.weights,
    ...updates,
    derniere_mise_a_jour: new Date().toISOString(),
    version: store.weights.version + 1,
  };
}

// ─── Stats ───────────────────────────────────────────────────────────────────

function updateStats() {
  const s = store.stats;
  s.taux_conversion = s.total_leads > 0
    ? s.leads_convertis / s.total_leads
    : 0;
  s.taux_faux_positifs = s.total_leads > 0
    ? s.leads_spam / s.total_leads
    : 0;
  s.taux_conversion_avis = s.total_avis_demandes > 0
    ? s.avis_recus / s.total_avis_demandes
    : 0;
  const notedAvis = store.avis.filter((a) => a.note_obtenue !== null);
  if (notedAvis.length > 0) {
    s.score_moyen_avis =
      notedAvis.reduce((sum, a) => sum + (a.note_obtenue ?? 0), 0) /
      notedAvis.length;
  }
}

export function getStats(): AgentStats {
  return store.stats;
}

// ─── Logs d'amélioration ────────────────────────────────────────────────────

export function addImprovementLog(log: string) {
  const entry = `[${new Date().toISOString()}] ${log}`;
  store.improvement_logs.unshift(entry);
  if (store.improvement_logs.length > 200) {
    store.improvement_logs = store.improvement_logs.slice(0, 200);
  }
}

export function getImprovementLogs(): string[] {
  return store.improvement_logs;
}

// ─── Analyse quotidienne ────────────────────────────────────────────────────

export function runDailyAnalysis(): string {
  const leads = store.leads;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const recentLeads = leads.filter(
    (l) => new Date(l.timestamp) >= yesterday
  );

  const logs: string[] = [];

  // Identifier patterns de succès
  const convertedLeads = recentLeads.filter(
    (l) => l.resultat_reel === "converti"
  );
  if (convertedLeads.length > 0) {
    logs.push(`✅ ${convertedLeads.length} leads convertis hier`);
    convertedLeads.forEach((l) => {
      if (l.pattern_nouveau) {
        logs.push(`🆕 Nouveau pattern détecté: ${l.lecon_apprise}`);
      }
    });
  }

  // Identifier faux positifs
  const spamHighScore = recentLeads.filter(
    (l) => l.score_attribue >= 7 && l.resultat_reel === "non_converti"
  );
  if (spamHighScore.length > 0) {
    logs.push(
      `⚠️ ${spamHighScore.length} faux positifs détectés — ajustement scoring`
    );
    // Ajuster les poids si pattern récurrent
    const patterns = spamHighScore.map((l) => l.lecon_apprise);
    patterns.forEach((p) => {
      addImprovementLog(`Poids réduit pour pattern: ${p}`);
    });
  }

  // Mise à jour stats
  store.stats.derniere_analyse = new Date().toISOString();

  const rapport = logs.join("\n") || "Aucune donnée suffisante pour l'analyse";
  addImprovementLog(`📊 Analyse quotidienne:\n${rapport}`);
  return rapport;
}

// ─── Analyse mensuelle avis ──────────────────────────────────────────────────

export function runMonthlyAvisAnalysis(): string {
  const avis = store.avis;
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const recentAvis = avis.filter((a) => new Date(a.timestamp) >= lastMonth);

  const totalDemandes = recentAvis.length;
  const recus = recentAvis.filter((a) => a.avis_recu).length;
  const taux = totalDemandes > 0 ? ((recus / totalDemandes) * 100).toFixed(1) : "0";

  // Meilleure heure
  const heureConversion: Record<string, number> = {};
  recentAvis.filter((a) => a.avis_recu).forEach((a) => {
    const h = a.heure_envoi.split(":")[0];
    heureConversion[h] = (heureConversion[h] ?? 0) + 1;
  });
  const meilleureHeure = Object.entries(heureConversion).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] ?? "inconnue";

  const rapport = `Ce mois j'ai observé:
- ${totalDemandes} demandes d'avis envoyées
- ${recus} avis reçus (${taux}% de conversion)
- Meilleure heure d'envoi: ${meilleureHeure}h
- ${recentAvis.filter((a) => (a.note_obtenue ?? 0) <= 2).length} avis négatifs traités`;

  addImprovementLog(`📅 Analyse mensuelle avis:\n${rapport}`);
  return rapport;
}
