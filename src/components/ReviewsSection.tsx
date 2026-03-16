const reviews = [
  {
    name: "Marie T.",
    city: "Toulouse",
    note: 5,
    text: "Porte claquée un dimanche soir à 22h. Appelé, arrivé en 25 minutes, ouverture sans casse en 5 minutes. Tarif annoncé au téléphone respecté. Je recommande vivement !",
    service: "Ouverture porte claquée",
  },
  {
    name: "Jean-Pierre M.",
    city: "Blagnac",
    note: 5,
    text: "Clé cassée dans la serrure un matin avant d'aller travailler. Intervention rapide, extraction propre, cylindre changé dans la foulée. Très professionnel.",
    service: "Clé cassée",
  },
  {
    name: "Sophie L.",
    city: "Colomiers",
    note: 5,
    text: "Serrure bloquée depuis la veille, impossible d'entrer chez moi. Appel à 8h, intervention à 8h35. Problème résolu, prix raisonnable et transparent.",
    service: "Serrure bloquée",
  },
  {
    name: "Ahmed B.",
    city: "Toulouse",
    note: 5,
    text: "Excellent service, équipe réactive. J'avais peur d'être arnaqué comme des fois qu'on voit dans la presse, mais tarif honnête et devis respecté à la lettre.",
    service: "Ouverture porte",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-yellow-400 text-3xl mb-2">
            ★★★★★
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            5/5 — 16 avis clients Google
          </h2>
          <p className="text-gray-500">
            Serrurier de confiance plébiscité par les Toulousains
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">
                    {r.city} — {r.service}
                  </p>
                </div>
                <span className="text-yellow-400 font-bold text-sm">
                  {"★".repeat(r.note)}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
