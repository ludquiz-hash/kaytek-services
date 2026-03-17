import Link from "next/link";
import Image from "next/image";
import PhoneButton from "./PhoneButton";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/phone";

export default function Header() {
  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 shadow-2xl">
      {/* Bandeau urgence */}
      <div className="bg-orange-500 text-white text-center py-2 text-sm font-bold tracking-wide">
        🔐 Disponible 24h/24 — 7j/7 — 365j/an · Intervention en 20 à 40 min
      </div>

      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo + nom */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Kaytek Services — Serrurier Toulouse"
            width={44}
            height={44}
            className="rounded-xl"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black text-white tracking-tight">
              Kaytek Services
            </span>
            <span className="text-orange-400 text-xs font-semibold">
              Serrurier urgence · Toulouse &amp; Baziège
            </span>
          </div>
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
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black px-5 py-3 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-orange-300 text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
            </svg>
            Appeler
          </a>
        </div>
      </div>
    </header>
  );
}
