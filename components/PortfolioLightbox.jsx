"use client";

import { useEffect } from "react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl">
      {/* Top Bar with Brand & Close Button */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="font-editorial text-lg tracking-[0.2em] text-[#FAF8F6] uppercase font-light">
            BEAUTYBYKRIMSE
          </span>
          <span className="text-white/30">•</span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#E8C8CC]">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F6] transition-all hover:rotate-90 duration-300"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-[#FAF8F6] transition-all duration-300 backdrop-blur-sm hidden sm:block"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-[#FAF8F6] transition-all duration-300 backdrop-blur-sm hidden sm:block"
        aria-label="Next Image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container & Editorial Sidebar */}
      <div className="w-full h-full max-w-6xl max-h-[88vh] mx-auto p-4 sm:p-8 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
        {/* Image Frame */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-full md:flex-1 flex items-center justify-center">
          <div className="relative w-full h-full max-h-full">
            <Image
              src={current.image}
              alt={current.caption || current.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-contain rounded-sm drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Sidebar Info — always dark for contrast */}
        <div className="w-full md:w-80 lg:w-96 bg-[#141414]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between shrink-0 max-h-[40vh] md:max-h-full overflow-y-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9919A]/15 border border-[#C9919A]/30 text-[#E8C8CC] text-[10px] uppercase tracking-[0.2em] font-medium">
              <Sparkles className="w-3 h-3 text-[#C9919A]" />
              <span>{current.categoryName || "Editorial Look"}</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-[#FAF8F6] font-light leading-tight">
              {current.title}
            </h3>

            {current.caption && (
              <p className="text-xs sm:text-sm text-[#FAF8F6]/75 font-light leading-relaxed">
                {current.caption}
              </p>
            )}

            {current.tags && current.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
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

          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3">
            <Link
              href={`/inquire?look=${encodeURIComponent(current.title)}`}
              onClick={onClose}
              className="w-full py-3 px-4 rounded-full bg-[#FAF8F6] text-[#0D0D0D] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#E8C8CC] transition-colors flex items-center justify-center gap-2"
            >
              <span>Inquire For This Look</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onClose}
              className="text-center text-xs text-[#FAF8F6]/50 hover:text-[#FAF8F6] transition-colors py-1"
            >
              Back to Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
