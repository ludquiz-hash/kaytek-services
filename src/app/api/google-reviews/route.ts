import { NextResponse } from "next/server";

// Cache 24h — se revalide une fois par jour
export const revalidate = 86400;

const PLACE_ID = "ChIJTRg52fDNYGoRB4cVn5mgoYY";
const SITE_URL = "https://www.kaytek-services.fr";

type RawReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
  time: number;
};

async function fetchViaPlacesV1(apiKey: string) {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "displayName,rating,userRatingCount,reviews",
      "Accept-Language": "fr",
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.rating) return null;

  const reviews = (data.reviews ?? [])
    .filter((r: { rating: number }) => r.rating >= 4)
    .slice(0, 5)
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

  return {
    name: data.displayName?.text ?? "Kaytek Services",
    rating: data.rating,
    total: data.userRatingCount ?? reviews.length,
    reviews,
  };
}

async function fetchViaPlacesLegacy(apiKey: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=newest&key=${apiKey}`;
  const res = await fetch(url, {
    headers: {
      Referer: SITE_URL,
      Origin: SITE_URL,
    },
    next: { revalidate: 86400 },
  });
  const data = await res.json();
  if (data.status !== "OK") return null;

  const result = data.result;
  const reviews = (result.reviews ?? [])
    .filter((r: RawReview) => r.rating >= 4)
    .slice(0, 5)
    .map((r: RawReview) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.relative_time_description,
      photo: r.profile_photo_url,
    }));

  return {
    name: result.name,
    rating: result.rating,
    total: result.user_ratings_total,
    reviews,
  };
}

export async function GET() {
  // La clé API n'est jamais exposée côté client
  const apiKey =
    process.env.GOOGLE_PLACES_API_KEY ??
    "AIzaSyAuQkiriTzvweuoLVTWMYZrv3lDCiHM3xM";

  try {
    // Tentative 1 : Places API v1 (nouvelle, sans restriction referer)
    const v1Result = await fetchViaPlacesV1(apiKey);
    if (v1Result) {
      return NextResponse.json(v1Result);
    }

    // Tentative 2 : Places API legacy avec header Referer
    const legacyResult = await fetchViaPlacesLegacy(apiKey);
    if (legacyResult) {
      return NextResponse.json(legacyResult);
    }

    return NextResponse.json(
      { error: "API indisponible", action: "remove_referer_restriction" },
      { status: 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur serveur", detail: String(err) },
      { status: 500 }
    );
  }
}
