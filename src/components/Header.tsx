import Link from "next/link";
import PhoneButton from "./PhoneButton";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white sticky top-0 z-40 shadow-xl">
      {/* Bande urgence */}
      <div className="bg-orange-500 text-white text-center py-1.5 text-sm font-semibold tracking-wide">
        🔐 Urgence 24h/24 — 7j/7 — Intervention en {BUSINESS_CONFIG.interventionDelay}
      </div>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-black text-white">
            {BUSINESS_CONFIG.name}
          </span>
          <span className="text-orange-400 text-xs font-medium">
            Toulouse &amp; périphérie — Agréé &amp; certifié
          </span>
        </Link>
        <PhoneButton variant="primary" size="md" />
      </div>
    </header>
  );
}
