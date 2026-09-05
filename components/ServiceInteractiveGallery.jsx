"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, Eye } from "lucide-react";

export default function ServiceInteractiveGallery({
  featuredImage,
  gallery = [],
  title = "Service Artistry",
  priority = false,
}) {
  const [mainImage, setMainImage] = useState(featuredImage);
  const [thumbnails, setThumbnails] = useState(gallery);
  const [activeSwapIdx, setActiveSwapIdx] = useState(null);

  const handleSwap = (thumbIndex) => {
    setActiveSwapIdx(thumbIndex);

    const oldMain = mainImage;
    const newMain = thumbnails[thumbIndex];

    const updatedThumbs = [...thumbnails];
    updatedThumbs[thumbIndex] = oldMain;

    setMainImage(newMain);
    setThumbnails(updatedThumbs);

    setTimeout(() => {
      setActiveSwapIdx(null);
    }, 400);
  };

  return (
    <div className="space-y-4">
      {/* 1. Main Big Image (Full Uncropped Display) */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[#0B0B0B] group flex items-center justify-center">
        {/* Ambient Blurred Glow Backdrop */}
        <div className="absolute inset-0 overflow-hidden opacity-25 filter blur-2xl scale-125 pointer-events-none">
          <Image
            src={mainImage}
            alt=""
            fill
            sizes="400px"
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Main Image */}
        <Image
          key={mainImage}
          src={mainImage}
          alt={`${title} featured look`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading={priority ? "eager" : "lazy"}
          className="object-contain p-2 z-10 transition-all duration-500 animate-fade-in group-hover:scale-[1.02]"
        />

        {/* Bottom subtle gradient & interactive look badge */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#E8C8CC] border border-white/15 shadow-sm">
            Featured Look
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/80 border border-white/10">
            <ArrowLeftRight className="w-3 h-3 text-[var(--accent-blush)]" />
            <span>Tap thumbnails to swap</span>
          </span>
        </div>
      </div>

      {/* 2. Interactive Thumbnail Grid */}
      {thumbnails && thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {thumbnails.map((thumb, tIdx) => {
            const isSwapping = activeSwapIdx === tIdx;
            return (
              <button
                key={`${thumb}-${tIdx}`}
                type="button"
                onClick={() => handleSwap(tIdx)}
                aria-label={`Swap with ${title} look ${tIdx + 1}`}
                title="Click to display this look as the main view"
                className={`group relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-rose)] ${
                  isSwapping
                    ? "border-[var(--accent-rose)] scale-95 ring-2 ring-[var(--accent-rose)]/40 shadow-lg"
                    : "border-[var(--border)] hover:border-[var(--border-accent)] hover:scale-103 bg-[#0B0B0B]"
                }`}
              >
                {/* Thumbnail image */}
                <Image
                  src={thumb}
                  alt={`${title} look preview ${tIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 30vw, 15vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay with swap indicator */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-2 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 shadow-md flex items-center gap-1">
                    <ArrowLeftRight className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
                    <span className="text-[9px] uppercase tracking-wider pr-0.5">Swap</span>
                  </div>
                </div>

                <div className="absolute bottom-1.5 right-1.5 sm:hidden px-1.5 py-0.5 rounded bg-black/60 text-[8px] text-white/80">
                  #{tIdx + 1}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
