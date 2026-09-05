import { siteConfig, loveNotes as fallbackLoveNotes, reviewMakeupImageMap } from "@/lib/data";

/**
 * Normalizes a Google Places review item into the standard Beauty By Krimse review shape.
 * Required fields: authorName, reviewText
 * Optional fields: rating, profilePhoto, makeupImage, relativeTime, googleReviewUrl
 */
export function normalizeGoogleReview(raw, index = 0) {
  if (!raw) return null;

  const authorName = raw.author_name || raw.authorName || "Verified Client";
  const reviewText = raw.text || raw.reviewText || "";

  if (!reviewText.trim()) {
    return null; // Don't show empty reviews
  }

  // Look up mapped makeup image for this client if legitimately associated
  const makeupImage =
    raw.makeupImage ||
    reviewMakeupImageMap[authorName] ||
    reviewMakeupImageMap[raw.id] ||
    null;

  const role = raw.role || null;
  const location = raw.location || null;

  return {
    id: raw.id || (raw.time ? `g-${raw.time}-${index}` : `g-rev-${index + 1}`),
    authorName,
    role,
    location,
    reviewText,
    rating: typeof raw.rating === "number" ? raw.rating : 5,
    profilePhoto: raw.profile_photo_url || raw.profilePhoto || null,
    makeupImage,
    relativeTime: raw.relative_time_description || raw.relativeTime || "Google Review",
    source: "Google",
    googleReviewUrl: raw.author_url || siteConfig.googleReviewUrl,
  };
}

/**
 * Fetches reviews from Google Places API if credentials are provided in environment,
 * otherwise returns the normalized fallback store.
 */
export async function getLoveNotes() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (apiKey && placeId) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        placeId
      )}&fields=name,rating,reviews,user_ratings_total&key=${encodeURIComponent(apiKey)}`;

      const res = await fetch(url, {
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === "OK" && data.result && Array.isArray(data.result.reviews)) {
          const normalized = data.result.reviews
            .map((r, i) => normalizeGoogleReview(r, i))
            .filter(Boolean);

          if (normalized.length > 0) {
            return {
              reviews: normalized,
              rating: data.result.rating || 5.0,
              totalRatings: data.result.user_ratings_total || normalized.length,
              source: "Google Places API",
            };
          }
        }
      }
    } catch (err) {
      // Log technical error safely on server side without exposing credentials
      console.error("[Reviews API] Error fetching from Google Places:", err.message);
    }
  }

  // Fallback to normalized authentic Google review data
  const normalizedFallback = (fallbackLoveNotes || [])
    .map((r, i) => normalizeGoogleReview(r, i))
    .filter(Boolean);

  return {
    reviews: normalizedFallback,
    rating: 5.0,
    totalRatings: normalizedFallback.length,
    source: "Google Reviews",
  };
}
