"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

export default function PortfolioLightbox({
  item,
  items = [],
  currentIndex = 0,
  onClose,
  onNavigate,
}) {
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % items.length);
      if (e.key === "ArrowLeft")
        onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!item) return null;

  const current = items[currentIndex] || item;

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      onNavigate((currentIndex + 1) % items.length);
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Image
      onNavigate((currentIndex - 1 + items.length) % items.length);
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar with Brand & Close Button */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-editorial text-sm sm:text-lg tracking-[0.2em] text-[#FAF8F6] uppercase font-light">
            BEAUTYBYKRIMSE
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#E8C8CC] font-mono">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-[#FAF8F6] border border-white/20 transition-all hover:rotate-90 duration-300 shadow-lg cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrow — Left (Visible on Both Mobile & Desktop) */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + items.length) % items.length);
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3.5 rounded-full bg-black/70 sm:bg-white/10 hover:bg-black/90 sm:hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Previous Image"
          title="Previous Image (← Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-blush)]" />
        </button>
      )}

      {/* Navigation Arrow — Right (Visible on Both Mobile & Desktop) */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % items.length);
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3.5 rounded-full bg-black/70 sm:bg-white/10 hover:bg-black/90 sm:hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Next Image"
          title="Next Image (→ Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-blush)]" />
        </button>
      )}

      {/* Main Image Container & Editorial Sidebar */}
      <div className="w-full h-full max-w-6xl max-h-[92vh] sm:max-h-[88vh] mx-auto p-4 sm:p-8 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-10 pt-16 sm:pt-8 overflow-y-auto md:overflow-hidden">
        {/* Image Frame (Uncropped) */}
        <div className="relative w-full h-[50vh] sm:h-[65vh] md:h-full md:flex-1 flex items-center justify-center">
          <div className="relative w-full h-full max-h-full flex items-center justify-center lightbox-image-container select-none" data-protect-image>
            <Image
              key={current.image}
              src={current.image}
              alt={current.title || current.categoryName || "Portfolio Look"}
              fill
              priority
              draggable={false}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-contain rounded-sm drop-shadow-2xl transition-opacity duration-300 animate-fade-in pointer-events-none select-none"
            />
            {/* Transparent overlay protecting image from context save & drag */}
            <div className="absolute inset-0 z-20 cursor-default" />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full md:w-80 lg:w-96 bg-[#141414]/90 border border-white/10 rounded-2xl p-5 sm:p-8 backdrop-blur-md flex flex-col justify-between shrink-0 max-h-[35vh] md:max-h-full overflow-y-auto">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9919A]/15 border border-[#C9919A]/30 text-[#E8C8CC] text-[10px] uppercase tracking-[0.2em] font-medium">
              <Sparkles className="w-3 h-3 text-[#C9919A]" />
              <span>{current.categoryName || "Editorial Look"}</span>
            </div>

            <h3 className="font-editorial text-xl sm:text-2xl sm:text-3xl text-[#FAF8F6] font-light leading-tight">
              {current.title || current.categoryName || "Bridal Artistry"}
            </h3>

            {current.caption && (
              <p className="text-xs sm:text-sm text-[#FAF8F6]/75 font-light leading-relaxed">
                {current.caption}
              </p>
            )}

            {current.tags && current.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                {current.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-[#FAF8F6]/60 font-light border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 sm:pt-6 border-t border-white/10 mt-4 sm:mt-6 flex flex-col gap-2.5 sm:gap-3">
            <Link
              href={`/inquire?look=${encodeURIComponent(current.title || current.categoryName || "Portfolio Look")}`}
              onClick={onClose}
              className="w-full py-3 px-4 rounded-full bg-[#FAF8F6] text-[#0D0D0D] hover:bg-[#E8C8CC] text-xs font-semibold uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Inquire For This Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="text-center text-xs text-[#FAF8F6]/50 hover:text-[#FAF8F6] transition-colors py-1 cursor-pointer"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
