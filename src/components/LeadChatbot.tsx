"use client";

import { useState } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";

type Step =
  | "welcome"
  | "problem"
  | "address"
  | "phone"
  | "confirm"
  | "done";

interface LeadData {
  problem: string;
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
    address: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleProblemSelect = (value: string) => {
    setLead({ ...lead, problem: value });
    setStep("address");
  };

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const addr = (form.elements.namedItem("address") as HTMLInputElement).value.trim();
    if (addr.length < 5) return;
    setLead({ ...lead, address: addr });
    setStep("phone");
  };

  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    if (phone.length < 10) return;
    setLead({ ...lead, phone });
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    const payload = {
      problem: lead.problem,
      address: lead.address,
      phone: lead.phone,
      timestamp: new Date().toISOString(),
      source: "chatbot_site",
    };

    // Envoi vers le webhook n8n si configuré
    if (BUSINESS_CONFIG.n8nWebhookUrl) {
      try {
        await fetch(BUSINESS_CONFIG.n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        // Silently fail — lead toujours affiché
      }
    }

    // Tracking GA4
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

            {step === "address" && (
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl rounded-tl-none p-3 text-sm text-orange-900">
                  <strong>{problemLabel}</strong> — compris.
                  <br />
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

            {step === "confirm" && (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl rounded-tl-none p-3 text-sm text-gray-800">
                  Voici le récapitulatif de votre demande :
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm space-y-1">
                  <p>
                    <strong>Problème :</strong> {problemLabel}
                  </p>
                  <p>
                    <strong>Adresse :</strong> {lead.address}
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {lead.phone}
                  </p>
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

            {step === "done" && (
              <div className="space-y-4 text-center">
                <div className="text-4xl">✅</div>
                <div className="text-sm text-gray-800">
                  <strong>Demande reçue !</strong>
                  <br />
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
