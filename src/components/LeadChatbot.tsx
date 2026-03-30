"use client";

import { useState } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";

// Étapes : problem → prenom → address → phone → confirm → done
type Step =
  | "welcome"
  | "problem"
  | "prenom"
  | "address"
  | "phone"
  | "confirm"
  | "done";

interface LeadData {
  problem: string;
  prenom: string;
  address: string;
  phone: string;
}

const PROBLEMS = [
  { label: "Porte claquée / clé à l'intérieur", value: "porte_claquee" },
  { label: "Clé cassée dans la serrure", value: "cle_cassee" },
  { label: "Serrure bloquée / grippée", value: "serrure_bloquee" },
  { label: "Effraction / porte forcée", value: "effraction" },
  { label: "Autre problème de serrure", value: "autre" },
];

export default function LeadChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [lead, setLead] = useState<LeadData>({
    problem: "",
    prenom: "",
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Étape 1 : choix du problème
  const handleProblemSelect = (value: string) => {
    setLead({ ...lead, problem: value });
    setStep("prenom");
  };

  // Étape 2 : prénom (fortement encouragé, fallback "Client")
  const handlePrenomSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const val = (form.elements.namedItem("prenom") as HTMLInputElement).value.trim();
    setLead({ ...lead, prenom: val || "Client" });
    setStep("address");
  };

  // Étape 3 : adresse
  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const addr = (form.elements.namedItem("address") as HTMLInputElement).value.trim();
    if (addr.length < 5) return;
    setLead({ ...lead, address: addr });
    setStep("phone");
  };

  // Étape 4 : téléphone
  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    if (phone.length < 10) return;
    setLead({ ...lead, phone });
    setStep("confirm");
  };

  // Étape 5 : confirmation + envoi
  const handleConfirm = async () => {
    setIsLoading(true);

    const payload = {
      prenom: lead.prenom,
      problem: lead.problem,
      address: lead.address,
      phone: lead.phone,
      timestamp: new Date().toISOString(),
      source: "chatbot_site",
    };

    // 1. Envoi vers l'agent KAYTEK_URGENCE (qualification + Telegram)
    // Timeout 10s + retry x3 pour gérer le cold start Netlify
    const sendLead = async (retryCount = 0): Promise<void> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const res = await fetch("/api/agents/kaytek-urgence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            message: `${lead.prenom} a un problème : ${lead.problem}. Adresse : ${lead.address}. Téléphone : ${lead.phone}`,
            prenom: lead.prenom,
            adresse: lead.address,
            telephone: lead.phone,
            probleme: lead.problem,
            canal: "chatbot_site",
          }),
        });
        clearTimeout(timeoutId);
        if (!res.ok && retryCount < 2) {
          console.warn("[CHATBOT] HTTP", res.status, "— retry", retryCount + 1, "dans 3s");
          await new Promise(r => setTimeout(r, 3000));
          return sendLead(retryCount + 1);
        }
      } catch (err) {
        const isTimeout = err instanceof Error && err.name === "AbortError";
        console.error("[CHATBOT]", isTimeout ? "TIMEOUT 10s" : "Erreur réseau", "— retry", retryCount + 1);
        if (retryCount < 2) {
          await new Promise(r => setTimeout(r, 3000));
          return sendLead(retryCount + 1);
        }
        console.error("[CHATBOT] Échec définitif après 3 tentatives");
      }
    };
    await sendLead();

    // 2. Envoi vers le webhook n8n si configuré (optionnel — non bloquant)
    if (BUSINESS_CONFIG.n8nWebhookUrl) {
      try {
        await fetch(BUSINESS_CONFIG.n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("[CHATBOT] Webhook n8n non disponible:", err);
      }
    }

    // 3. Tracking GA4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "lead_qualified", {
        event_category: "lead",
        event_label: lead.problem,
      });
    }

    setIsLoading(false);
    setStep("done");
  };

  const problemLabel =
    PROBLEMS.find((p) => p.value === lead.problem)?.label || lead.problem;

  const prenomDisplay = lead.prenom && lead.prenom !== "Client" ? lead.prenom : null;

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl text-2xl transition-all duration-200 hover:scale-105"
        aria-label="Ouvrir le chat d'urgence"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Fenêtre chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-orange-500 text-white px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
              🔐
            </div>
            <div>
              <p className="font-bold text-sm">Serrurier d&apos;urgence</p>
              <p className="text-xs text-orange-100">
                Réponse instantanée • {BUSINESS_CONFIG.interventionDelay}
              </p>
            </div>
            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Corps */}
          <div className="p-4 max-h-96 overflow-y-auto">

            {/* ÉTAPE 1 — Problème */}
            {step === "welcome" && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm text-gray-800">
                  Bonjour ! Je suis là pour vous mettre en contact avec notre
                  serrurier en urgence. Quel est votre problème ?
                </div>
                <div className="space-y-2">
                  {PROBLEMS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => handleProblemSelect(p.value)}
                      className="w-full text-left text-sm bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg px-3 py-2.5 transition-colors font-medium text-orange-800"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ÉTAPE 2 — Prénom */}
            {step === "prenom" && (
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl rounded-tl-none p-3 text-sm text-orange-900">
                  <strong>{problemLabel}</strong> — compris.
                  <br />
                  Comment vous appelez-vous ?
                </div>
                <form onSubmit={handlePrenomSubmit} className="space-y-2">
                  <input
                    name="prenom"
                    type="text"
                    placeholder="Votre prénom (ex: Julie)"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    autoFocus
                    maxLength={40}
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-sm font-bold hover:bg-orange-600"
                  >
                    Continuer →
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLead({ ...lead, prenom: "Client" }); setStep("address"); }}
                    className="w-full text-xs text-gray-400 hover:text-gray-600 py-1"
                  >
                    Passer cette étape
                  </button>
                </form>
              </div>
            )}

            {/* ÉTAPE 3 — Adresse */}
            {step === "address" && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm text-gray-800">
                  {prenomDisplay ? `Merci ${prenomDisplay} !` : "Compris !"}<br />
                  Quelle est votre adresse exacte (rue + ville) ?
                </div>
                <form onSubmit={handleAddressSubmit} className="space-y-2">
                  <input
                    name="address"
                    type="text"
                    placeholder="Ex: 12 rue des Fleurs, Toulouse"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    autoFocus
                    required
                    minLength={5}
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-sm font-bold hover:bg-orange-600"
                  >
                    Continuer →
                  </button>
                </form>
              </div>
            )}

            {/* ÉTAPE 4 — Téléphone */}
            {step === "phone" && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm text-gray-800">
                  Adresse notée ✓<br />
                  Notre serrurier sera envoyé chez vous. Quel est votre numéro
                  de téléphone pour confirmer ?
                </div>
                <form onSubmit={handlePhoneSubmit} className="space-y-2">
                  <input
                    name="phone"
                    type="tel"
                    placeholder="06 XX XX XX XX"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    autoFocus
                    required
                    minLength={10}
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white rounded-lg py-2.5 text-sm font-bold hover:bg-orange-600"
                  >
                    Confirmer →
                  </button>
                </form>
              </div>
            )}

            {/* ÉTAPE 5 — Récapitulatif */}
            {step === "confirm" && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm text-gray-800">
                  Récapitulatif de votre demande :
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm space-y-1">
                  {prenomDisplay && (
                    <p><strong>Prénom :</strong> {lead.prenom}</p>
                  )}
                  <p><strong>Problème :</strong> {problemLabel}</p>
                  <p><strong>Adresse :</strong> {lead.address}</p>
                  <p><strong>Téléphone :</strong> {lead.phone}</p>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className="w-full bg-orange-500 text-white rounded-lg py-3 text-sm font-bold hover:bg-orange-600 disabled:opacity-60"
                  >
                    {isLoading ? "Envoi en cours..." : "✅ Confirmer ma demande"}
                  </button>
                  <a
                    href={BUSINESS_CONFIG.phoneHref}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 text-sm font-bold hover:bg-gray-800 flex items-center justify-center"
                  >
                    📞 Appeler directement — {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>
            )}

            {/* ÉTAPE 6 — Confirmation */}
            {step === "done" && (
              <div className="space-y-4 text-center">
                <div className="text-4xl">✅</div>
                <div className="text-sm text-gray-800">
                  {prenomDisplay
                    ? <><strong>Merci {lead.prenom} !</strong><br /></>
                    : <><strong>Demande reçue !</strong><br /></>
                  }
                  Notre serrurier vous rappelle dans les{" "}
                  <strong>5 minutes</strong>. Restez disponible au {lead.phone}.
                </div>
                <p className="text-xs text-gray-500">
                  Vous préférez appeler directement ?
                </p>
                <a
                  href={BUSINESS_CONFIG.phoneHref}
                  className="w-full bg-orange-500 text-white rounded-lg py-3 text-sm font-bold hover:bg-orange-600 flex items-center justify-center"
                >
                  📞 {BUSINESS_CONFIG.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
