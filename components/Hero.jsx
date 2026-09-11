"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { siteConfig, heroMedia, services } from "@/lib/data";

export default function Hero() {
  // Build slide items from services alternating across each service
  const slides = useMemo(() => {
    if (!services || services.length === 0) {
      return [
        {
          image: heroMedia.primaryImage,
          title: "Signature Luxury Bridal",
          number: "01",
          description: "South Asian & Western Artistry",
          serviceId: "bridal-hair-makeup",
        },
      ];
    }

    const serviceBuckets = services.map((s) => {
      const allImgs = [s.featuredImage, ...(s.gallery || [])].filter(Boolean);
      return allImgs.map((img) => ({
        image: img,
        title: s.title,
        number: s.number,
        description: s.description,
        serviceId: s.id,
      }));
    });

    const maxLen = Math.max(...serviceBuckets.map((b) => b.length));
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      for (let s = 0; s < serviceBuckets.length; s++) {
        if (serviceBuckets[s][i]) {
          result.push(serviceBuckets[s][i]);
        }
      }
    }
    return result;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState("right"); // "right" | "left"
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goToSlide = useCallback(
    (newIndex, dir = "right") => {
      if (newIndex === currentIndex) return;
      setDirection(dir);
      setPrevIndex(currentIndex);
      setCurrentIndex(newIndex);
      setIsTransitioning(true);
    },
    [currentIndex]
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((curr) => {
        const nextIdx = (curr + 1) % slides.length;
        setDirection("right");
        setPrevIndex(curr);
        setIsTransitioning(true);
        return nextIdx;
      });
    }, 3000);
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIdx, "left");
    resetTimer();
  };

  const handleNext = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % slides.length;
    goToSlide(nextIdx, "right");
    resetTimer();
  };

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Ambient Radial Glow for background atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] lg:w-[800px] h-[350px] sm:h-[500px] bg-radial from-[var(--accent-rose)]/15 via-[var(--accent-gold)]/5 to-transparent blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Editorial Headline & Copy (Below image on mobile, Left column on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left animate-fade-in-up">
            {/* Location & Luxury Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--accent-blush)] text-[10.5px] sm:text-[11px] uppercase tracking-[0.25em] font-medium backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent-rose)]" />
              <span>{siteConfig.serviceArea}</span>
            </div>

            {/* Main Heading from PDF */}
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.04em] text-[var(--text-primary)] uppercase leading-[1.08]">
              {siteConfig.name}
            </h1>

            {/* Subheading from PDF */}
            <h2 className="font-editorial text-lg sm:text-xl md:text-2xl text-[var(--accent-blush)] font-normal leading-snug">
              {siteConfig.subheading}
            </h2>

            {/* Supporting Text from PDF */}
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {siteConfig.supportingText}
            </p>

            {/* Call to Actions from PDF (Book Your Date | View Portfolio in horizontal flex row) */}
            <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0 w-full sm:w-auto">
              <Link
                href="/inquire"
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all duration-300 hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] hover:shadow-[0_0_30px_var(--shadow-accent)] flex items-center justify-center gap-2 group shadow-lg text-center whitespace-nowrap"
              >
                <span>Book Your Date</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
              </Link>

              <Link
                href="/portfolio"
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[var(--border-hover)] bg-[var(--bg-input)] text-[var(--text-primary)] text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-blush)] flex items-center justify-center gap-2 backdrop-blur-sm text-center whitespace-nowrap"
              >
                <span>View Portfolio</span>
              </Link>
            </div>
          </div>

          {/* Editorial Visual Showcase (Top column on mobile, Right column on desktop) */}
          <div className="order-1 lg:order-2 w-full lg:col-span-5 relative px-2 sm:px-4 lg:px-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Primary Slideshow Card — dark solid container */}
              <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl group bg-[#0D0B0B] select-none">
                {/* Physical Slide Replacement (Outgoing slides out, Incoming slides in) */}
                {slides.map((slide, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isPrevious = idx === prevIndex;

                  // Render only the current and previous slide during transitions for peak 60fps performance
                  if (!isCurrent && !isPrevious) return null;

                  let animClass = "translate-x-0 z-10";
                  if (isTransitioning) {
                    if (isCurrent) {
                      animClass =
                        direction === "right"
                          ? "animate-slide-in-right z-20"
                          : "animate-slide-in-left z-20";
                    } else if (isPrevious) {
                      animClass =
                        direction === "right"
                          ? "animate-slide-out-left z-10"
                          : "animate-slide-out-right z-10";
                    }
                  }

                  return (
                    <div
                      key={`${slide.serviceId}-${slide.image}-${idx}`}
                      onAnimationEnd={() => {
                        if (isCurrent) {
                          setIsTransitioning(false);
                          setPrevIndex(null);
                        }
                      }}
                      className={`absolute inset-0 w-full h-full ${animClass}`}
                    >
                      <Image
                        src={slide.image}
                        alt={`${slide.title} - Beauty By Krimse`}
                        fill
                        priority
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 450px, 45vw"
                        className="object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
                    </div>
                  );
                })}

                {/* Left Navigation Arrow */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl group/btn cursor-pointer focus:outline-none"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F6] transition-transform group-hover/btn:-translate-x-0.5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 active:scale-95 shadow-xl group/btn cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FAF8F6] transition-transform group-hover/btn:translate-x-0.5" />
                </button>

                {/* Floating Caption with Word-by-Word Reveal */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 pointer-events-none">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#E8C8CC] mb-1.5">
                      <span key={`badge-${currentIndex}`} className="animate-fade-in">
                        Service {currentSlide.number} • Luxury Artistry
                      </span>
                      <span className="flex items-center gap-1 text-[#C5A880]">
                        <Star className="w-3 h-3 fill-current" />
                        <span>5.0</span>
                      </span>
                    </div>

                    {/* Word-by-word animated title */}
                    <p className="font-editorial text-base sm:text-lg text-[#FAF8F6] font-light flex flex-wrap min-h-[1.75rem] items-center">
                      {currentSlide.title.split(" ").map((word, wIdx) => (
                        <span
                          key={`word-${currentIndex}-${word}-${wIdx}`}
                          className="inline-block mr-[0.28em] animate-word-reveal"
                          style={{
                            animationDelay: `${wIdx * 100}ms`,
                            animationFillMode: "backwards",
                          }}
                        >
                          {word}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Secondary Image Badge */}
              {/* <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 w-28 sm:w-40 lg:w-44 aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[var(--border-hover)] shadow-2xl z-20 group animate-float bg-black">
                <Image
                  src={heroMedia.secondaryImage}
                  alt="Bridal close-up showing luminous skin and precision eye artistry"
                  fill
                  sizes="(max-width: 640px) 120px, 180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 text-[8px] sm:text-[9px] uppercase tracking-wider text-white font-medium bg-black/70 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-center">
                  Luminous Finish
                </div>
              </div> */}

              {/* Floating Squad Badge */}
              {/* <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl z-20">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[var(--text-primary)]">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-rose)]" />
                  <span className="font-medium tracking-wide">Mobile Services</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
