import { NextResponse } from "next/server";

export const revalidate = 3600;

// Clés hardcodées en fallback si les variables d'env ne sont pas définies
const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "AIzaSyAuQkiriTzvweuoLVTWMYZrv3lDCiHM3xM";
const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? "ChIJTRg52fDNYGoRB4cVn5mgoYY";
const SITE_URL = "https://www.kaytek-services.fr";

type RawReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
};

export async function GET() {
  // ── Tentative 1 : Places API v1 (nouvelle API, sans restriction referer) ──
  try {
    const v1Url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
    const v1Res = await fetch(v1Url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
        "Accept-Language": "fr",
      },
      next: { revalidate: 3600 },
    });

    if (v1Res.ok) {
      const v1Data = await v1Res.json();
      if (v1Data.rating) {
        const reviews = (v1Data.reviews ?? [])
          .filter((r: { rating: number }) => r.rating >= 4)
          .map((r: {
            authorAttribution?: { displayName?: string; photoUri?: string };
            rating: number;
            text?: { text?: string };
            relativePublishTimeDescription?: string;
          }) => ({
            author: r.authorAttribution?.displayName ?? "Client",
            rating: r.rating,
            text: r.text?.text ?? "",
            time: r.relativePublishTimeDescription ?? "",
            photo: r.authorAttribution?.photoUri ?? "",
          }));

        return NextResponse.json({
          name: v1Data.displayName?.text ?? "Kaytek Services",
          rating: v1Data.rating,
          total: v1Data.userRatingCount ?? reviews.length,
          reviews,
          source: "v1",
        });
      }
    }
  } catch {
    // Passe à la tentative suivante
  }

  // ── Tentative 2 : Places API legacy avec Referer header ──
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=newest&key=${API_KEY}`;

    const res = await fetch(url, {
      headers: {
        "Referer": SITE_URL,
        "Origin": SITE_URL,
        "User-Agent": "Mozilla/5.0 (compatible; KaytekBot/1.0)",
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    if (data.status === "OK") {
      const result = data.result;
      const reviews = (result.reviews ?? [])
        .filter((r: RawReview) => r.rating >= 4)
        .map((r: RawReview) => ({
          author: r.author_name,
          rating: r.rating,
          text: r.text,
          time: r.relative_time_description,
          photo: r.profile_photo_url,
        }));

      return NextResponse.json({
        name: result.name,
        rating: result.rating,
        total: result.user_ratings_total,
        reviews,
        source: "legacy",
      });
    }

    // ── Retourne l'erreur Google pour diagnostic ──
    return NextResponse.json(
      { error: `Google API: ${data.status}`, detail: data.error_message, action: "fix_api_key" },
      { status: 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur serveur", detail: String(err) },
      { status: 500 }
    );
  }
}
