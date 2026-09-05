"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import LoveNoteCard from "@/components/LoveNoteCard";
import { Sparkles, X, ChevronLeft, ChevronRight, Star, CheckCircle2, ArrowUpRight } from "lucide-react";
import { GoogleIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/data";

export default function LoveNotesFeed({ limit = null, initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [error, setError] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to fetch Google reviews");
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (err) {
        console.error("[LoveNotesFeed] Fetch error:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayReviews = limit ? reviews.slice(0, limit) : reviews;

  // Filter all reviews with photos for the lightbox gallery
  const imageReviews = reviews.filter((r) => Boolean(r.makeupImage));

  const handlePrevImage = useCallback(() => {
    setSelectedIdx((prev) => {
      if (prev === null || imageReviews.length === 0) return null;
      return (prev - 1 + imageReviews.length) % imageReviews.length;
    });
  }, [imageReviews.length]);

  const handleNextImage = useCallback(() => {
    setSelectedIdx((prev) => {
      if (prev === null || imageReviews.length === 0) return null;
      return (prev + 1) % imageReviews.length;
    });
  }, [imageReviews.length]);

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (selectedIdx === null) return;
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextImage();
      }
    }

    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIdx, handlePrevImage, handleNextImage]);

  const openLightboxForReview = (rev) => {
    const idx = imageReviews.findIndex(
      (r) =>
        r.id === rev.id ||
        (r.authorName && rev.authorName && r.authorName.trim().toLowerCase() === rev.authorName.trim().toLowerCase())
    );
    setSelectedIdx(idx !== -1 ? idx : 0);
  };

  const selectedReview = selectedIdx !== null && imageReviews[selectedIdx] ? imageReviews[selectedIdx] : null;

  // 1. Loading Skeleton State
  if (loading) {
    const skeletonCount = limit || 3;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(skeletonCount)].map((_, i) => (
          <div
            key={i}
            className="bg-[var(--bg-card)] rounded-3xl p-6 sm:p-8 border border-[var(--border)] animate-pulse space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bg-input)]" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[var(--bg-input)] rounded w-24" />
                  <div className="h-3 bg-[var(--bg-input)] rounded w-16" />
                </div>
              </div>
              <div className="h-36 bg-[var(--bg-input)] rounded-2xl w-full" />
              <div className="space-y-2">
                <div className="h-3 bg-[var(--bg-input)] rounded w-full" />
                <div className="h-3 bg-[var(--bg-input)] rounded w-5/6" />
                <div className="h-3 bg-[var(--bg-input)] rounded w-4/6" />
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)] h-6 bg-[var(--bg-input)] rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  // 2. Empty State
  if (!loading && displayReviews.length === 0) {
    return (
      <div className="text-center py-16 bg-[var(--bg-card)] rounded-3xl border border-[var(--border)] p-8 sm:p-12 space-y-4">
        <Sparkles className="w-8 h-8 text-[var(--accent-rose)] mx-auto animate-pulse-slow" />
        <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
          Love Notes are currently being updated.
        </h3>
        <p className="text-sm text-[var(--text-muted)] font-light max-w-md mx-auto">
          Please check back soon, or be the first to leave a review on Google!
        </p>
        <div className="pt-2">
          <a
            href={siteConfig.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
          >
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>Write a Review on Google</span>
          </a>
        </div>
      </div>
    );
  }

  // 3. Render Reviews & Lightbox Modal
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayReviews.map((review, idx) => (
          <LoveNoteCard
            key={review.id || idx}
            review={review}
            index={idx}
            priority={idx < 3}
            onImageClick={(rev) => openLightboxForReview(rev)}
          />
        ))}
      </div>

      {/* Interactive Luxury Lightbox Modal */}
      {selectedReview && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in transition-all"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-accent)] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-10 max-h-[92vh] flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close image preview"
              className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-black text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Full Resolution Bridal Transformation Image (Uncropped) */}
            <div className="relative w-full md:w-3/5 min-h-[320px] md:min-h-[520px] bg-black/90 overflow-hidden flex items-center justify-center p-3 group">
              {/* Blurred ambient background */}
              {selectedReview.makeupImage && (
                <div className="absolute inset-0 overflow-hidden opacity-30 filter blur-2xl scale-125 pointer-events-none">
                  <Image
                    src={selectedReview.makeupImage}
                    alt=""
                    fill
                    sizes="400px"
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>
              )}

              {selectedReview.makeupImage && (
                <div className="relative w-full h-full min-h-[320px] md:min-h-[520px] flex items-center justify-center z-10">
                  <Image
                    src={selectedReview.makeupImage}
                    alt={`${selectedReview.authorName} bridal transformation`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain"
                  />
                </div>
              )}

              {/* Prev / Next Arrows on Image */}
              {imageReviews.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    aria-label="Previous bride photo (ArrowLeft)"
                    title="Previous (← ArrowLeft)"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5 text-[var(--accent-blush)]" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    aria-label="Next bride photo (ArrowRight)"
                    title="Next (→ ArrowRight)"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5 text-[var(--accent-blush)]" />
                  </button>
                </>
              )}

              {/* Photo Count Indicator */}
              {imageReviews.length > 1 && selectedIdx !== null && (
                <div className="absolute bottom-3 left-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white/90 uppercase tracking-widest font-mono">
                  {selectedIdx + 1} / {imageReviews.length}
                </div>
              )}
            </div>

            {/* Right: Client Details & Authentic Review */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[520px] space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                  <div>
                    <h4 className="font-editorial text-2xl text-[var(--text-primary)] font-normal">
                      {selectedReview.authorName}
                    </h4>
                    {(selectedReview.role || selectedReview.location) && (
                      <p className="text-[11px] uppercase tracking-wider text-[var(--accent-blush)] font-light mt-0.5">
                        {selectedReview.role} {selectedReview.location ? `• ${selectedReview.location}` : ""}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[var(--accent-gold)] shrink-0">
                    {[...Array(selectedReview.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="font-editorial text-base text-[var(--text-secondary)] font-light italic leading-relaxed whitespace-pre-line">
                  &ldquo;{selectedReview.reviewText}&rdquo;
                </blockquote>
              </div>

              {/* Modal Bottom Controls & Actions */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[var(--accent-blush)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-rose)] shrink-0" />
                  <span>Verified Client</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Prev / Next Text Navigation for Mobile & Accessibility */}
                  {imageReviews.length > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        aria-label="Previous bride look"
                        className="p-1.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--badge-bg)] text-[var(--text-muted)] hover:text-white border border-[var(--border)] transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label="Next bride look"
                        className="p-1.5 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--badge-bg)] text-[var(--text-muted)] hover:text-white border border-[var(--border)] transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {selectedReview.googleReviewUrl && (
                    <a
                      href={selectedReview.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--bg-input)] hover:bg-[var(--badge-bg)] text-xs text-[var(--text-primary)] hover:text-[var(--accent-blush)] border border-[var(--border)] transition-colors"
                    >
                      <GoogleIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">Google</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
