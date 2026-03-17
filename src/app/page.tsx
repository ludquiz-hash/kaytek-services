import type { Metadata } from "next";
import Link from "next/link";
import PhoneButton, { PHONE_DISPLAY, PHONE_HREF } from "@/components/PhoneButton";
import TrustBadges from "@/components/TrustBadges";
import GoogleReviews from "@/components/GoogleReviews";
import FAQSection from "@/components/FAQSection";
import { SERVICE_ZONES_UNIQUE, ZONES_TOULOUSE, ZONES_BAZIEGE, SERVICES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Serrurier Urgence Toulouse — Dépannage 24h/7j | Kaytek Services",
  description:
    "Serrurier urgence à Toulouse et Baziège. Intervention rapide porte claquée, clé cassée, serrure bloquée. Appelez le 05 82 95 17 42.",
  alternates: { canonical: "https://www.kaytek-services.fr" },
};

function UrgenceBadge() {
  return (
    <span className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
      <span className="w-2 h-2 bg-white rounded-full animate-ping inline-block" />
      Urgence 24h/7j
    </span>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-black flex items-center justify-center text-lg">
        {n}
      </div>
      <div>
        <p className="font-bold text-gray-900 mb-0.5">{title}</p>
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-20 text-center">
          <UrgenceBadge />
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Serrurier Urgence Toulouse<br />
            <span className="text-orange-400">Intervention Rapide 24h/7j</span>
          </h1>
          <p className="mt-5 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Porte claquée, clé cassée, serrure bloquée ?<br />
            <strong className="text-white">Kaytek Services</strong> intervient à Toulouse,
            Baziège et dans un rayon de 20 km.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xl md:text-2xl px-10 py-5 rounded-2xl shadow-2xl transition-all focus:ring-4 focus:ring-orange-300"
            >
              <span className="text-2xl">📞</span>
              {PHONE_DISPLAY}
            </a>
            <div className="text-sm text-gray-400 text-center">
              <p className="font-semibold text-white">Réponse immédiate</p>
              <p>Tarif annoncé avant intervention</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> Devis gratuit</span>
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> Tarif fixé avant intervention</span>
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> Facture remise</span>
            <span className="flex items-center gap-1"><span className="text-green-400">✓</span> 5★ sur Google</span>
          </div>
        </div>
      </section>

      {/* ═══ 2. TRUST BADGES ═══ */}
      <TrustBadges />

      {/* ═══ 3. BARRE RAPPEL NUMÉRO ═══ */}
      <div className="bg-orange-500 py-5">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold text-lg text-center sm:text-left">
            Vous êtes bloqué(e) maintenant ?
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black text-lg px-8 py-3 rounded-xl shadow-lg hover:bg-orange-50 active:scale-95 transition-all"
          >
            📞 {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* ═══ 4. SERVICES ═══ */}
      <section className="py-16 bg-white" id="services">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-2">
            Nos interventions d&apos;urgence
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Toulouse, Baziège et un rayon de 20 km
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-start gap-4 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-2xl p-6 transition-all"
              >
                <span className="text-4xl flex-shrink-0">{s.icon}</span>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 group-hover:text-orange-600 text-lg mb-1">
                    {s.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-bold text-sm">{s.price}</span>
                    <span className="text-xs text-gray-400 group-hover:text-orange-500">En savoir plus →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg active:scale-95 transition-all"
            >
              📞 Appeler le {PHONE_DISPLAY}
            </a>
            <p className="text-gray-500 text-sm mt-3">Disponible 24h/24 · 7j/7 · 365j/an</p>
          </div>
        </div>
      </section>

      {/* ═══ 5. COMMENT ÇA MARCHE ═══ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-10">
            Comment se passe une intervention ?
          </h2>
          <div className="space-y-7">
            <Step
              n={1}
              title={`Vous appelez le ${PHONE_DISPLAY}`}
              desc="Disponible 24h/24, 7j/7. Notre serrurier décroche immédiatement, vous demande votre adresse et le type de problème."
            />
            <Step
              n={2}
              title="Le tarif vous est annoncé avant tout déplacement"
              desc="Pas de mauvaise surprise : le prix définitif est fixé par téléphone avant que notre serrurier parte. Vous acceptez, ou vous ne devez rien."
            />
            <Step
              n={3}
              title="Intervention en 20 à 40 minutes"
              desc="Notre serrurier arrive avec le matériel adapté à votre type de serrure et intervient rapidement."
            />
            <Step
              n={4}
              title="Facture détaillée remise sur place"
              desc="À la fin de l'intervention, vous recevez une facture complète. Payable par carte, espèces ou virement."
            />
          </div>
          <div className="mt-10 text-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-xl active:scale-95 transition-all"
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 6. ZONES ═══ */}
      <section className="py-16 bg-white" id="zones">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-gray-900 mb-2">
            Zones d&apos;intervention
          </h2>
          <p className="text-center text-gray-500 mb-10">
            {SERVICE_ZONES_UNIQUE.length} communes couvertes — Toulouse &amp; Baziège + 20 km
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                  Centre Toulouse
                </span>
                <span className="text-sm text-gray-500">{ZONES_TOULOUSE.length} communes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ZONES_TOULOUSE.map((z) => (
                  <Link
                    key={z.slug}
                    href={`/serrurier-urgence/${z.slug}`}
                    className="text-xs bg-white hover:bg-orange-100 border border-orange-200 text-orange-800 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {z.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gray-800 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
                  Centre Baziège
                </span>
                <span className="text-sm text-gray-500">{ZONES_BAZIEGE.length} communes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ZONES_BAZIEGE.map((z) => (
                  <Link
                    key={z.slug}
                    href={`/serrurier-urgence/${z.slug}`}
                    className="text-xs bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-semibold px-2.5 py-1 rounded-lg transition-colors"
                  >
                    {z.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. AVIS GOOGLE ═══ */}
      <GoogleReviews />

      {/* ═══ 8. FAQ ═══ */}
      <FAQSection />

      {/* ═══ 9. CTA FINAL ═══ */}
      <section className="py-20 bg-gray-950 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <UrgenceBadge />
          <h2 className="mt-5 text-3xl md:text-4xl font-black leading-tight">
            Toujours bloqué(e) ?<br />
            <span className="text-orange-400">Appelez maintenant.</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Notre serrurier décroche immédiatement et part chez vous.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-8 inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-2xl px-12 py-6 rounded-2xl shadow-2xl transition-all"
          >
            📞 {PHONE_DISPLAY}
          </a>
          <p className="mt-4 text-gray-500 text-sm">
            Disponible 24h/24 · 7j/7 · 365j/an · Devis gratuit
          </p>
        </div>
      </section>
    </>
  );
}
