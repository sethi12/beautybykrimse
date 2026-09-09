import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Sparkles, ArrowRight, CheckCircle2, Star, ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import { InstagramIcon, GoogleIcon } from "@/components/Icons";
import LoveNotesFeed from "@/components/LoveNotesFeed";
import {
  siteConfig,
  trustPoints,
  featuredBridesGallery,
  services,
  meetKrimse,
  loveNotes,
  perfectLook,
} from "@/lib/data";

// Lazy-load VideoShowcase
const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), {
  loading: () => (
    <div className="py-24 bg-[var(--bg-section)] border-y border-[var(--border)] text-center">
      <p className="text-sm text-[var(--text-muted)]">Loading Instagram recent work showcase...</p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {/* SECTION 1 — HERO BANNER */}
      <Hero />

      {/* SECTION 2 — TRUST & LOVE NOTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-xl relative overflow-hidden space-y-12">
          {/* Trust Standards Row */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
                <span>Our Standards</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
                5-Star Client Experience
              </h2>
            </div>

            {/* 6 Trust Points from PDF */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-center flex flex-col items-center justify-center space-y-2 hover:border-[var(--border-accent)] transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--accent-rose)] shrink-0" />
                  <span className="text-xs text-[var(--text-primary)] font-light leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* LOVE NOTES PREVIEW */}
          <div className="pt-10 border-t border-[var(--border)] space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-2">
                  <GoogleIcon className="w-3 h-3" />
                  <span>Google Reviews</span>
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light tracking-wide">
                  LOVE NOTES
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light mt-1">
                  Authentic reviews and words of love from our brides on Google Reviews.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md group"
                >
                  <span>View All Love Notes</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Curated Love Notes Preview Cards (Dynamic Google Reviews) */}
            <LoveNotesFeed limit={3} initialReviews={loveNotes.slice(0, 3)} />

            {/* Bottom Google Review CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <GoogleIcon className="w-4 h-4 shrink-0" />
                <span className="font-light">
                  Loved your bridal beauty experience with Krimse? We&apos;d love to hear your story.
                </span>
              </div>

              <a
                href={siteConfig.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-accent)] text-[var(--text-primary)] hover:text-[var(--accent-blush)] text-xs font-medium uppercase tracking-wider transition-all shrink-0 shadow-sm group"
              >
                <span>Write a Review on Google</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — FEATURED BRIDES GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Featured Portfolio</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
              Featured Brides Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 font-light max-w-xl">
              Showcasing South Asian Brides, Western Brides, Reception Glam, Semi Bridal Hair & Makeup, and Bridal Party looks.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBridesGallery.map((item, idx) => {
            const isWide = item.aspect === "landscape";
            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-accent)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ${isWide ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
                  }`}
              >
                <Image
                  src={item.image}
                  alt={item.category || "Featured Bride Look"}
                  fill
                  sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  loading={idx < 3 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8C8CC] font-medium mb-1">
                    Featured Look
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#FAF8F6] font-light">
                    {item.category}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4 — SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
            OUR SERVICES
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
            Luxury hair &amp; makeup tailored<br className="hidden sm:inline" /> for every stage of your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-accent)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
                  {/* Ambient blurred glow backdrop */}
                  <div className="absolute inset-0 overflow-hidden opacity-25 filter blur-xl scale-125 pointer-events-none">
                    <Image
                      src={service.featuredImage}
                      alt=""
                      fill
                      sizes="300px"
                      className="object-cover"
                      aria-hidden="true"
                    />
                  </div>
                  <Image
                    src={service.featuredImage}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-1 z-10 transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/60 to-transparent z-10 pointer-events-none" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-editorial text-xl sm:text-2xl text-[var(--text-primary)] font-light group-hover:text-[var(--accent-blush)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed min-h-[34px]">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)]">
                    <ul className="space-y-2">
                      {service.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-light leading-snug"
                        >
                          <span className="text-[var(--accent-rose)] font-semibold shrink-0">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/services#${service.id}`}
                  className="w-full py-3 px-4 rounded-full bg-[var(--bg-input)] border border-[var(--border)] hover:border-[var(--border-accent)] hover:bg-[var(--accent-rose)] hover:text-white text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-[var(--border-accent)] shadow-sm"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — MEET KRIMSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image of Krimse working with a bride (Full Uncropped Image) */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border)] shadow-xl group bg-[#0B0B0B] flex items-center justify-center">
                {/* Ambient blurred glow backdrop */}
                <div className="absolute inset-0 overflow-hidden opacity-30 filter blur-2xl scale-125 pointer-events-none">
                  <Image
                    src={meetKrimse.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>

                {/* Main Full Uncropped Image */}
                <Image
                  src={meetKrimse.image}
                  alt="Krimse working with a bride"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2 z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Subtle Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20 pointer-events-none" />

                {/* Info Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 z-20 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8C8CC] font-medium">
                    Artistry in Motion
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-medium">
                    Beauty By Krimse
                  </span>
                </div>
              </div>
            </div>

            {/* Exact PDF Content for Meet Krimse */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
                <span>{meetKrimse.heading}</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light leading-tight">
                {meetKrimse.subheading}
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                {meetKrimse.body}
              </p>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/inquire"
                  className="px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
                >
                  Book Your Date
                </Link>

                <Link
                  href="/portfolio"
                  className="px-6 py-3.5 rounded-full border border-[var(--border-hover)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] hover:border-[var(--accent-blush)] transition-colors"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — INSTAGRAM / RECENT WORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
              <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>{siteConfig.instagramHandle}</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
              Instagram / Recent Work
            </h2>
          </div>

          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white text-xs uppercase tracking-[0.18em] transition-all shadow-sm"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow {siteConfig.instagramHandle}</span>
          </a>
        </div>

        {/* Video Showcase / Reels Player */}
        <VideoShowcase />
      </section>

      {/* SECTION 7 — SAY YES TO THE PERFECT LOOK (SIGNATURE ARTISTRY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-accent)] bg-gradient-to-br from-[#E8C8CC]/20 via-[var(--bg-card)] to-[#C9919A]/15 p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl">
          {/* Ambient rose radial blur overlay */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-radial from-[var(--accent-rose)]/25 via-[var(--accent-blush)]/10 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-radial from-[var(--accent-blush)]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Timeless Artistry</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] font-light leading-[1.15] tracking-wide">
              {perfectLook.heading}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
              {perfectLook.body}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={perfectLook.primaryCta.href}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0D0D0D] text-[#FAF8F6] border border-white/10 hover:bg-[var(--accent-rose)] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-xl group"
              >
                <span>{perfectLook.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={perfectLook.secondaryCta.href}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-hover)] hover:border-[var(--accent-blush)] hover:bg-[var(--bg-card)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] transition-all"
              >
                <span>{perfectLook.secondaryCta.label}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-gradient-to-r from-[var(--card-gradient-from)] via-[var(--bg-card)] to-[var(--card-gradient-to)] p-8 sm:p-12 md:p-16 text-center shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>{siteConfig.serviceArea}</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] uppercase font-light leading-tight">
              Let&apos;s Bring Your Vision to Life
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-xl mx-auto">
              Whether it&apos;s a wedding, special event, photoshoot, or celebration, we&apos;d love to be part of your day.
            </p>

            <div className="pt-4 flex items-center justify-center">
              <Link
                href="/inquire"
                className="px-10 py-4 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-lg"
              >
                Book Your Date
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
