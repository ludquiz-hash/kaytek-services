import Link from "next/link";
import { ZONES_TOULOUSE, ZONES_BAZIEGE, SERVICES } from "@/lib/config";
import { PHONE_DISPLAY, PHONE_HREF } from "./PhoneButton";

export default function Footer() {
  const year = new Date().getFullYear();
  const toulousePreview = ZONES_TOULOUSE.slice(0, 10);
  const baziegePreview = ZONES_BAZIEGE.slice(0, 10);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Bloc entreprise */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-3">Kaytek Services</h3>
            <p className="text-sm leading-relaxed mb-3">
              Serrurier urgence à Toulouse et Baziège. Intervention 20 à 40 min, 24h/24, 7j/7, 365j/an.
            </p>
            <a href={PHONE_HREF} className="text-orange-400 font-bold text-lg hover:text-orange-300">
              📞 {PHONE_DISPLAY}
            </a>
          </div>

          {/* Nos services */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Nos services</h3>
            <ul className="space-y-1 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-orange-400 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone Toulouse */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Zone Toulouse (20 km)</h3>
            <ul className="space-y-1 text-xs">
              {toulousePreview.map((z) => (
                <li key={z.slug}>
                  <Link href={`/serrurier-urgence/${z.slug}`} className="hover:text-orange-400 transition-colors">
                    {z.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#zones" className="text-orange-400 hover:text-orange-300 text-xs">
                  Voir toutes les villes →
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone Baziège */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Zone Baziège (20 km)</h3>
            <ul className="space-y-1 text-xs">
              {baziegePreview.map((z) => (
                <li key={z.slug}>
                  <Link href={`/serrurier-urgence/${z.slug}`} className="hover:text-orange-400 transition-colors">
                    {z.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#zones" className="text-orange-400 hover:text-orange-300 text-xs">
                  Voir toutes les villes →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Toutes les villes — SEO */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-400">Zones d&apos;intervention Toulouse :</strong>{" "}
            {ZONES_TOULOUSE.map((z, i) => (
              <span key={z.slug}>
                <Link href={`/serrurier-urgence/${z.slug}`} className="hover:text-orange-400">{z.name}</Link>
                {i < ZONES_TOULOUSE.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mt-2">
            <strong className="text-gray-400">Zones d&apos;intervention Baziège :</strong>{" "}
            {ZONES_BAZIEGE.map((z, i) => (
              <span key={z.slug}>
                <Link href={`/serrurier-urgence/${z.slug}`} className="hover:text-orange-400">{z.name}</Link>
                {i < ZONES_BAZIEGE.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {year} Kaytek Services — Tous droits réservés</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-gray-300">Mentions légales</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
