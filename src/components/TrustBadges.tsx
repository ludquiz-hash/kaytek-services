import { BUSINESS_CONFIG } from "@/lib/config";

const badges = [
  { icon: "⚡", label: `Intervention en ${BUSINESS_CONFIG.interventionDelay}` },
  { icon: "🕐", label: "Disponible 24h/24, 7j/7" },
  { icon: "💳", label: "Devis gratuit par téléphone" },
  { icon: "✅", label: "Serrurier agréé & certifié" },
  { icon: "🔐", label: "Sans casse si possible" },
  { icon: "💰", label: `À partir de ${BUSINESS_CONFIG.priceFrom}€` },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-xs font-semibold text-gray-700 leading-tight">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
