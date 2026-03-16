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
    question: "Comment se passe une ouverture de porte ?",
    answer: "Dès votre appel, notre serrurier se déplace avec le matériel adapté à votre type de serrure. Sur place, il évalue la situation et choisit la méthode la moins invasive possible. Dans la majorité des cas de porte claquée, la porte est ouverte rapidement et sans dommage. Si la serrure est endommagée, nous proposons un remplacement sur place.",
  },
  {
    question: "Quelles sont vos garanties de sérieux ?",
    answer: `${BUSINESS_CONFIG.name} est une entreprise déclarée, inscrite au registre du commerce. Nous vous communiquons systématiquement le tarif définitif AVANT de commencer l'intervention — sans mauvaise surprise. Une facture détaillée vous est remise à la fin de chaque intervention. Vous pouvez vérifier nos avis clients Google avant de faire appel à nous.`,
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
