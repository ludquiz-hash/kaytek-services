import type { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-2xl font-black text-gray-900 mb-8">Mentions légales</h1>
      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700">
        <section>
          <h2 className="text-lg font-bold text-gray-900">Éditeur du site</h2>
          <p>
            <strong>{BUSINESS_CONFIG.name}</strong><br />
            {BUSINESS_CONFIG.address}<br />
            Téléphone : {BUSINESS_CONFIG.phone}<br />
            Email : {BUSINESS_CONFIG.email}
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-900">Hébergement</h2>
          <p>Ce site est hébergé par Netlify, Inc. — 44 Montgomery Street, Suite 300, San Francisco, California 94104.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-900">Données personnelles</h2>
          <p>
            Les informations collectées via le formulaire de contact ou le chatbot sont utilisées uniquement pour vous contacter en réponse à votre demande d&apos;intervention. Elles ne sont pas transmises à des tiers. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en nous contactant à {BUSINESS_CONFIG.email}.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-gray-900">Cookies</h2>
          <p>Ce site utilise Google Analytics pour mesurer l&apos;audience. Vous pouvez désactiver ces cookies via les paramètres de votre navigateur.</p>
        </section>
      </div>
    </div>
  );
}
