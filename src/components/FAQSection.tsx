"use client";

import { useState } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items?: FAQItem[];
}

const defaultFAQ: FAQItem[] = [
  {
    question: "Quel est le délai d'intervention à Toulouse ?",
    answer: `Notre délai moyen d'intervention est de ${BUSINESS_CONFIG.interventionDelay} sur Toulouse et sa périphérie. Nous sommes disponibles ${BUSINESS_CONFIG.availability}. Dès votre appel, notre serrurier le plus proche est dépêché sur place.`,
  },
  {
    question: "Combien coûte l'ouverture d'une porte claquée ?",
    answer: `L'ouverture d'une porte claquée commence à partir de ${BUSINESS_CONFIG.priceFrom}€. Le prix exact dépend du type de serrure, de l'heure d'intervention et de la complexité. Nous vous communiquons toujours le tarif définitif avant toute intervention.`,
  },
  {
    question: "Travaillez-vous la nuit, les week-ends et jours fériés ?",
    answer: `Oui, nous intervenons ${BUSINESS_CONFIG.availability}. Le tarif de nuit (entre 20h et 8h), week-end et jours fériés peut faire l'objet d'un supplément, toujours annoncé avant intervention.`,
  },
  {
    question: "Pouvez-vous ouvrir une porte sans l'abîmer ?",
    answer: "Dans la grande majorité des cas (porte claquée, serrure non forcée), nous ouvrons sans aucune casse grâce à des techniques de crochetage professionnel. Si la porte a été forcée ou la serrure endommagée, un remplacement du cylindre peut être nécessaire.",
  },
  {
    question: "Comment savoir si vous n'êtes pas un serrurier arnaqueur ?",
    answer: "Nous sommes un serrurier agréé, inscrit au registre du commerce, et nous annonçons systématiquement le tarif définitif AVANT de commencer l'intervention. Nous vous remettons une facture détaillée. Méfiez-vous des serruriers qui refusent de donner un prix à l'avance.",
  },
  {
    question: "Quelles serrures pouvez-vous remplacer ou installer ?",
    answer: "Nous intervenons sur tous types de serrures : serrures à cylindre, serrures 3 points, serrures blindées, serrures anti-effraction. Nous travaillons avec les grandes marques (Fichet, Vachette, Bricard, Mul-T-Lock).",
  },
];

export default function FAQSection({ items = defaultFAQ }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-2">
          Questions fréquentes
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Tout ce que vous devez savoir avant d&apos;appeler un serrurier
        </p>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="text-orange-500 text-xl flex-shrink-0 ml-3">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
