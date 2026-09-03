import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, MessageCircle, Star, ShieldCheck } from "lucide-react";
import { siteConfig, heroMedia } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
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
              <span>Toronto & GTA • Luxury Bridal Artistry</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-3.5xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.04em] text-[var(--text-primary)] uppercase leading-[1.08]">
              Timeless Elegance. <br />
              <span className="font-editorial italic font-normal text-[var(--accent-blush)] lowercase">
                bespoke
              </span>{" "}
              Bridal Artistry.
            </h1>

            {/* Subheading / Brand Statement */}
            <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transforming your sacred wedding morning into a serene, high-fashion editorial experience. Specializing in radiant South Asian & Western bridal looks, bespoke dupatta draping, and jewelry architecture engineered for 4K cameras and 18+ hours of wear.
            </p>

            {/* Call to Actions (Horizontal flex row on all screen sizes) */}
            <div className="pt-2 flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-3.5 md:gap-4 max-w-lg mx-auto lg:mx-0 w-full sm:w-auto">
              <Link
                href="/inquire"
                className="flex-1 sm:flex-none px-3.5 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full bg-[var(--accent-rose)] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all duration-300 hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] hover:shadow-[0_0_30px_var(--shadow-accent)] flex items-center justify-center gap-1.5 sm:gap-2 group shadow-lg text-center whitespace-nowrap"
              >
                <span>Reserve <span className="hidden sm:inline">Your </span>Date</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
              </Link>

              <Link
                href="/portfolio"
                className="flex-1 sm:flex-none px-3.5 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full border border-[var(--border-hover)] bg-[var(--bg-input)] text-[var(--text-primary)] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-all duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[var(--accent-blush)] flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-sm text-center whitespace-nowrap"
              >
                <span><span className="hidden sm:inline">View </span>Portfolio</span>
              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Krimse! I'd love to check bridal availability for my upcoming wedding."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instant WhatsApp message"
                className="flex-shrink-0 p-3 sm:p-3.5 md:p-4 rounded-full border border-[var(--whatsapp)]/40 text-[var(--whatsapp)] bg-[var(--whatsapp)]/10 hover:bg-[var(--whatsapp)]/20 transition-all duration-300 flex items-center justify-center shadow-md"
                title="Instant WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges / Stats Bar */}
            <div className="pt-6 sm:pt-8 border-t border-[var(--border)] grid grid-cols-3 gap-2 sm:gap-6 text-center lg:text-left">
              <div>
                <div className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                  200+
                </div>
                <div className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--accent-rose)] font-medium mt-0.5">
                  Radiant Brides
                </div>
              </div>

              <div>
                <div className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                  18h+
                </div>
                <div className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--accent-rose)] font-medium mt-0.5">
                  Longwear Hold
                </div>
              </div>

              <div>
                <div className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
                  GTA Wide
                </div>
                <div className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.18em] text-[var(--accent-rose)] font-medium mt-0.5">
                  Mobile Studio
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Visual Showcase (Top column on mobile, Right column on desktop) */}
          <div className="order-1 lg:order-2 w-full lg:col-span-5 relative px-2 sm:px-4 lg:px-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Primary Large Image Card */}
              <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl group bg-[var(--bg-card)]">
                <Image
                  src={heroMedia.primaryImage}
                  alt="BeautyByKrimse Signature South Asian Bridal — regal crimson lehenga with emerald polki choker, intricate mathapatti, and velvet soft-glam complexion"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 450px, 45vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />

                {/* Floating Caption on Primary */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#E8C8CC] mb-1">
                      <span>Signature South Asian Bridal</span>
                      <span className="flex items-center gap-1 text-[#C5A880]">
                        <Star className="w-3 h-3 fill-current" />
                        <span>5.0</span>
                      </span>
                    </div>
                    <p className="font-editorial text-base sm:text-lg text-[#FAF8F6] font-light">
                      Regal Crimson & Kundan Placement
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Secondary Image Badge */}
              <div className="absolute -bottom-4 -left-3 sm:-bottom-6 sm:-left-6 w-28 sm:w-40 lg:w-44 aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[var(--border-hover)] shadow-2xl z-20 group animate-float bg-black">
                <Image
                  src={heroMedia.secondaryImage}
                  alt="Bridal close-up showing luminous skin finish, seamless foundation blend, and precision eye artistry"
                  fill
                  sizes="(max-width: 640px) 120px, 180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 text-[8px] sm:text-[9px] uppercase tracking-wider text-white font-medium bg-black/70 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-center">
                  Luminous Skin
                </div>
              </div>

              {/* Floating Squad Badge */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-card)]/95 backdrop-blur-md border border-[var(--border)] shadow-xl z-20">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[var(--text-primary)]">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--accent-rose)]" />
                  <span className="font-medium tracking-wide">Elite Mobile Studio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
