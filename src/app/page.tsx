import type { Metadata } from "next";
import Link from "next/link";
import PhoneButton from "@/components/PhoneButton";
import TrustBadges from "@/components/TrustBadges";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import { BUSINESS_CONFIG, SERVICE_ZONES, SERVICES } from "@/lib/config";

export const metadata: Metadata = {
  title: `Serrurier Urgence Toulouse — Intervention ${BUSINESS_CONFIG.interventionDelay} — 24h/24 7j/7`,
  description: `Serrurier d'urgence à Toulouse. Porte claquée, clé cassée, serrure bloquée. Intervention en ${BUSINESS_CONFIG.interventionDelay}, ${BUSINESS_CONFIG.availability}. Devis gratuit. Appel direct : ${BUSINESS_CONFIG.phone}`,
  alternates: {
    canonical: "https://serrurier-express-toulouse.fr",
  },
};

export default function HomePage() {
  return (
    <>
      {/* HERO — section principale mobile-first */}
      <section className="bg-gray-900 text-white py-10 md:py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Urgence serrurier Toulouse
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
            Serrurier à Toulouse<br />
            <span className="text-orange-400">
              en {BUSINESS_CONFIG.interventionDelay}
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Porte claquée, clé cassée, serrure bloquée ?<br />
            Serrurier agréé disponible{" "}
            <strong className="text-white">{BUSINESS_CONFIG.availability}</strong>.
            Devis gratuit avant intervention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <PhoneButton
              variant="primary"
              size="lg"
              text={`📞 Appeler — ${BUSINESS_CONFIG.phone}`}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-400">
            <span>✅ Tarif annoncé à l&apos;avance</span>
            <span>✅ Sans surprise</span>
            <span>✅ Facture remise</span>
            <span>✅ Serrurier agréé</span>
          </div>
        </div>
      </section>

      {/* Badges de confiance */}
      <TrustBadges />

      {/* SERVICES */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2 text-gray-900">
            Nos interventions d&apos;urgence
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Tous types de dépannages serrure à Toulouse et périphérie
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-6 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{service.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 group-hover:text-orange-600 text-lg mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-bold text-sm">
                        {service.price}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-orange-500">
                        En savoir plus →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE + DÉLAI */}
      <section className="py-14 bg-orange-500 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Intervention en {BUSINESS_CONFIG.interventionDelay} sur Toulouse
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto">
            Basé à Toulouse, nous intervenons dans toute l&apos;agglomération
            toulousaine. Disponible{" "}
            <strong className="text-white">{BUSINESS_CONFIG.availability}</strong>.
          </p>
          <PhoneButton
            variant="secondary"
            size="lg"
            text={`📞 Appeler maintenant — ${BUSINESS_CONFIG.phone}`}
          />
        </div>
      </section>

      {/* ZONES GÉOGRAPHIQUES */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2 text-gray-900">
            Zones d&apos;intervention autour de Toulouse
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Serrurier d&apos;urgence disponible dans toute la métropole toulousaine
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SERVICE_ZONES.map((zone) => (
              <Link
                key={zone.slug}
                href={`/serrurier/${zone.slug}`}
                className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all text-center"
              >
                Serrurier {zone.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <ReviewsSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA FINAL */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Besoin d&apos;un serrurier maintenant ?
          </h2>
          <p className="text-gray-300 mb-8">
            Ne restez pas bloqué. Appelez-nous, notre serrurier part
            immédiatement chez vous.
          </p>
          <PhoneButton
            variant="primary"
            size="lg"
            text={`📞 Appeler — ${BUSINESS_CONFIG.phone}`}
            className="text-xl px-10 py-5"
          />
          <p className="text-gray-500 text-sm mt-4">
            Disponible {BUSINESS_CONFIG.availability} — Devis gratuit
          </p>
        </div>
      </section>
    </>
  );
}
