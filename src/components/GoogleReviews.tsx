"use client";

import { useEffect, useState } from "react";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Kaytek.Services+%E2%80%93+Serrurier/@43.5356279,1.3276206,11z/data=!3m1!4b1!4m6!3m5!1s0x860fcdf0d439184d:0x861fa0999f158707!8m2!3d43.5354974!4d1.4924266!16s%2Fg%2F11zkd821bb?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";
const GOOGLE_REVIEW_LINK =
  "https://www.google.com/maps/place/Kaytek.Services+%E2%80%93+Serrurier/@43.5356279,1.3276206,11z/data=!3m1!4b1!4m6!3m5!1s0x860fcdf0d439184d:0x861fa0999f158707!8m2!3d43.5354974!4d1.4924266!16s%2Fg%2F11zkd821bb?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";

interface Review {
  author: string;
  rating: number;
  text: string;
  time: string;
  photo: string;
}

interface ReviewsData {
  name: string;
  rating: number;
  total: number;
  reviews: Review[];
  source?: string;
}

function Stars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-3xl" };
  return (
    <span className={`${sizes[size]} tracking-tight`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </span>
  );
}

function GoogleLogo() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// Squelette de chargement
function Skeleton() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-yellow-400 text-3xl mb-3">★★★★★</div>
          <div className="h-7 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse mb-2" />
          <div className="h-4 bg-gray-100 rounded w-48 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
                <div className="h-3 bg-gray-100 rounded w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Fallback statique avec vrais données connues
function StaticFallback() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <Stars rating={5} size="lg" />
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-1">
            5/5 — 16 avis clients Google
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Kaytek Services — Serrurier Toulouse &amp; Baziège
          </p>
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <GoogleLogo />
            Voir nos avis sur Google
          </a>
        </div>

        {/* Avis statiques de secours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { author: "Marie T.", rating: 5, time: "il y a 2 semaines", text: "Porte claquée un dimanche soir à 22h. Arrivé en 25 minutes, porte ouverte rapidement. Tarif annoncé au téléphone respecté. Je recommande vivement !" },
            { author: "Jean-Pierre M.", rating: 5, time: "il y a 1 mois", text: "Clé cassée dans la serrure un matin avant d'aller travailler. Intervention rapide, extraction propre, cylindre changé dans la foulée. Très professionnel." },
            { author: "Sophie L.", rating: 5, time: "il y a 3 semaines", text: "Serrure bloquée depuis la veille. Appel à 8h, intervention à 8h35. Problème résolu, prix raisonnable et transparent. Merci !" },
            { author: "Ahmed B.", rating: 5, time: "il y a 2 mois", text: "Tarif honnête et devis respecté à la lettre. Serrurier ponctuel et efficace. Je n'hésiterai pas à refaire appel à Kaytek Services." },
          ].map((r, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-lg flex-shrink-0">
                  {r.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{r.author}</p>
                  <div className="flex items-center gap-2">
                    <Stars rating={r.rating} size="sm" />
                    <span className="text-xs text-gray-400">{r.time}</span>
                  </div>
                </div>
                <GoogleLogo />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(true);
        } else {
          setData(d);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (error || !data) return <StaticFallback />;

  const displayRating = data.rating?.toFixed(1) ?? "5.0";
  const displayTotal = data.total ?? data.reviews.length;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* En-tête */}
        <div className="text-center mb-10">
          <Stars rating={data.rating} size="lg" />
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-2 mb-1">
            {displayRating}/5 — {displayTotal} avis Google
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Avis vérifiés depuis Google — mis à jour automatiquement
          </p>
          <a
            href={GOOGLE_REVIEW_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
          >
            <GoogleLogo />
            Laisser un avis sur Google
          </a>
        </div>

        {/* Grille avis */}
        {data.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {review.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.photo}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-black text-lg flex-shrink-0">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{review.author}</p>
                    <div className="flex items-center gap-2">
                      <Stars rating={review.rating} size="sm" />
                      <span className="text-xs text-gray-400">{review.time}</span>
                    </div>
                  </div>
                  <GoogleLogo />
                </div>
                {review.text ? (
                  <p className="text-sm text-gray-700 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                ) : (
                  <p className="text-sm text-gray-400 italic">Avis sans commentaire</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm">Aucun avis disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
}
