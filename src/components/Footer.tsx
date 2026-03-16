import Link from "next/link";
import { BUSINESS_CONFIG, SERVICE_ZONES, SERVICES } from "@/lib/config";

export default function Footer() {
  const mainZones = SERVICE_ZONES.slice(0, 8);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Bloc entreprise */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              {BUSINESS_CONFIG.name}
            </h3>
            <p className="text-sm leading-relaxed mb-3">
              Serrurier agréé à Toulouse. Intervention rapide{" "}
              {BUSINESS_CONFIG.interventionDelay},{" "}
              {BUSINESS_CONFIG.availability}.
            </p>
            <a
              href={BUSINESS_CONFIG.phoneHref}
              className="text-orange-400 font-bold text-lg hover:text-orange-300"
            >
              📞 {BUSINESS_CONFIG.phone}
            </a>
          </div>

          {/* Nos services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Nos services</h3>
            <ul className="space-y-1 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones intervention */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">
              Zones d&apos;intervention
            </h3>
            <ul className="space-y-1 text-sm columns-2">
              {mainZones.map((z) => (
                <li key={z.slug}>
                  <Link
                    href={`/serrurier/${z.slug}`}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {z.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>
            © {year} {BUSINESS_CONFIG.name} — Tous droits réservés
          </p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-gray-300">
              Mentions légales
            </Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
