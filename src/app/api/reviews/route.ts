import { NextResponse } from "next/server";

export const revalidate = 3600; // revalide toutes les heures

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Configuration manquante" },
      { status: 500 }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=fr&reviews_sort=newest&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: `Google API: ${data.status}`, detail: data.error_message },
        { status: 502 }
      );
    }

    const result = data.result;

    // On ne retourne que les avis 4 et 5 étoiles
    const reviews = (result.reviews ?? [])
      .filter((r: { rating: number }) => r.rating >= 4)
      .map((r: {
        author_name: string;
        rating: number;
        text: string;
        relative_time_description: string;
        profile_photo_url: string;
      }) => ({
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
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erreur serveur", detail: String(err) },
      { status: 500 }
    );
  }
}
