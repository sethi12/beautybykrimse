import Image from "next/image";
import { Star, CheckCircle2, Eye, MapPin } from "lucide-react";
import { GoogleIcon } from "@/components/Icons";

export default function LoveNoteCard({ review, index = 0, priority = false, onImageClick = null }) {
  if (!review) return null;

  const {
    authorName = "Verified Client",
    role = null,
    location = null,
    reviewText = "",
    rating = 5,
    profilePhoto = null,
    makeupImage = null,
    relativeTime = "Google Review",
    googleReviewUrl = null,
  } = review;

  // Extract initial for graceful fallback avatar if no customer photo is available
  const initial = authorName ? authorName.trim().charAt(0).toUpperCase() : "B";

  return (
    <div
      className="group bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border)] hover:border-[var(--border-accent)] hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(201,145,154,0.18)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${(index % 6) * 90}ms` }}
    >
      {/* Decorative ambient subtle top glow with pulse on hover */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-radial from-[var(--accent-rose)]/15 via-[var(--accent-blush)]/5 to-transparent blur-3xl pointer-events-none group-hover:scale-150 group-hover:opacity-100 opacity-60 transition-all duration-700" />

      <div className="space-y-6 relative z-10">
        {/* 1. Customer Image & Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {profilePhoto ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] shrink-0 bg-[var(--bg-input)] shadow-md group-hover:border-[var(--accent-rose)] transition-colors duration-300">
                <Image
                  src={profilePhoto}
                  alt={`${authorName} Google review profile`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--badge-bg)] to-[var(--bg-input)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-blush)] font-editorial text-xl font-medium shrink-0 shadow-inner group-hover:scale-105 group-hover:border-[var(--accent-rose)] transition-all duration-300">
                {initial}
              </div>
            )}

            <div>
              <h3 className="font-editorial text-lg sm:text-xl text-[var(--text-primary)] font-normal leading-tight group-hover:text-[var(--accent-blush)] transition-colors duration-300">
                {authorName}
              </h3>

              {(role || location) && (
                <p className="text-[10.5px] uppercase tracking-wider text-[var(--accent-blush)] font-light mt-0.5">
                  {role} {location ? `• ${location}` : ""}
                </p>
              )}

              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center gap-0.5 text-[var(--accent-gold)]">
                  {[...Array(rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-current transition-transform duration-300 group-hover:scale-110"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-[var(--text-faint)] font-light">
                  • {relativeTime}
                </span>
              </div>
            </div>
          </div>

          {/* Google Attribution Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--bg-input)] border border-[var(--border)] shrink-0 group-hover:border-[var(--border-accent)] transition-colors duration-300 shadow-sm"
            title="Verified Google Review"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-medium hidden xs:inline">
              Google
            </span>
          </div>
        </div>

        {/* 2. Makeup / Bridal Transformation Image (Full Uncropped Display) */}
        {makeupImage && (
          <div
            onClick={() => onImageClick && onImageClick(review)}
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onImageClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onImageClick(review);
              }
            }}
            className={`relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--border)] shadow-md bg-[#0B0B0B] group-hover:border-[var(--border-accent)] transition-all duration-500 flex items-center justify-center ${
              onImageClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-rose)]" : ""
            }`}
          >
            {/* Ambient blurred backdrop so letterboxing has a glowing luxury aesthetic */}
            <div className="absolute inset-0 overflow-hidden opacity-25 filter blur-xl scale-125 pointer-events-none">
              <Image
                src={makeupImage}
                alt=""
                fill
                sizes="300px"
                className="object-cover"
                aria-hidden="true"
              />
            </div>

            {/* Main Full Image with no cropping */}
            <Image
              src={makeupImage}
              alt={`${authorName} bridal makeup artistry by Beauty By Krimse`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading={priority ? "eager" : "lazy"}
              className="object-contain p-1 z-10 transition-transform duration-700 group-hover:scale-[1.03]"
            />

            {/* Gradient overlay for bottom badge visibility */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
              <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[9px] uppercase tracking-widest text-[#E8C8CC] border border-white/15 shadow-sm">
                Bridal Look
              </span>

              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-[10px] flex items-center gap-1.5 shadow-lg">
                <Eye className="w-3 h-3 text-[var(--accent-blush)]" />
                <span className="text-[9px] font-medium tracking-wide">Expand</span>
              </span>
            </div>
          </div>
        )}

        {/* 3. Customer Review */}
        <blockquote className="font-editorial text-base sm:text-lg text-[var(--text-secondary)] font-light italic leading-relaxed whitespace-pre-line">
          &ldquo;{reviewText}&rdquo;
        </blockquote>
      </div>

      {/* Card Footer with Verified Badge & Google Link */}
      <div className="pt-4 mt-6 border-t border-[var(--border)] flex items-center justify-between text-xs relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent-blush)] font-light">
          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0" />
          <span>Verified Client</span>
        </div>

        {googleReviewUrl && (
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-light flex items-center gap-1 group/link"
          >
            <span className="group-hover/link:underline underline-offset-2">View on Google</span>
          </a>
        )}
      </div>
    </div>
  );
}

