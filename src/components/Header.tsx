import Link from "next/link";
import PhoneButton, { PHONE_DISPLAY, PHONE_HREF } from "./PhoneButton";

export default function Header() {
  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 shadow-2xl">
      {/* Bandeau urgence */}
      <div className="bg-orange-500 text-white text-center py-2 text-sm font-bold tracking-wide">
        🔐 Disponible 24h/24 — 7j/7 — 365j/an · Intervention en 20 à 40 min
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo / nom */}
        <Link href="/" className="flex flex-col leading-tight flex-shrink-0">
          <span className="text-xl font-black text-white tracking-tight">
            Kaytek Services
          </span>
          <span className="text-orange-400 text-xs font-semibold">
            Serrurier urgence · Toulouse &amp; Baziège
          </span>
          </Link>

          {/* Numéro + bouton — visibles immédiatement */}
        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden sm:flex flex-col items-end leading-tight"
          >
            <span className="text-orange-400 text-xs font-semibold uppercase tracking-wide">
              Appel urgence
            </span>
            <span className="text-white font-black text-lg">{PHONE_DISPLAY}</span>
          </a>
          <PhoneButton variant="primary" size="md" text="📞 Appeler" />
        </div>
      </div>
    </header>
  );
}
