"use client";

import { useEffect, useState } from "react";
import { BUSINESS_CONFIG } from "@/lib/config";

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
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-400 font-bold text-sm tracking-tight">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
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
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Squelette de chargement
  if (loading) {
    return (
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-yellow-400 text-3xl mb-2">★★★★★</div>
            <div className="h-7 bg-gray-200 rounded w-64 mx-auto animate-pulse mb-2" />
            <div className="h-4 bg-gray-100 rounded w-48 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                    <div className="h-3 bg-gray-100 rounded w-20" />
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

  // Fallback si erreur API
  if (error || !data) {
    return (
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-yellow-400 text-3xl mb-3">★★★★★</div>
          <p className="text-gray-700 font-bold text-xl mb-2">5/5 — 16 avis clients Google</p>
          <a
            href={BUSINESS_CONFIG.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-orange-600 hover:text-orange-700 text-sm underline"
          >
            Voir nos avis sur Google →
          </a>
        </div>
      </section>
    );
  }

  const displayRating = data.rating?.toFixed(1) ?? "5.0";
  const displayTotal = data.total ?? data.reviews.length;

  return (
    <section className="py-14 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* En-tête */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-3xl ${i < Math.round(data.rating) ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
            {displayRating}/5 — {displayTotal} avis clients Google
          </h2>
          <p className="text-gray-500 text-sm mb-3">
            Avis vérifiés et mis à jour en temps réel depuis Google
          </p>
          <a
            href={BUSINESS_CONFIG.googleReviewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
            </svg>
            Laisser un avis sur Google
          </a>
        </div>

        {/* Grille des avis */}
        {data.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.reviews.map((review, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col gap-3"
              >
                {/* Auteur */}
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
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600 font-black text-lg">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {review.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-gray-400">{review.time}</span>
                    </div>
                  </div>
                  {/* Logo Google */}
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>

                {/* Texte de l'avis */}
                {review.text ? (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Avis sans commentaire
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            Aucun avis disponible pour le moment.
          </p>
        )}

      </div>
    </section>
  );
}
