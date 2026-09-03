import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle, Star, Heart, ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import { siteConfig, services, packages, portfolioItems, reviews, faqList, aboutPhilosophy } from "@/lib/data";

// Lazy-load VideoShowcase
const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"), {
  loading: () => (
    <div className="py-24 bg-[var(--bg-section)] border-y border-[var(--border)] text-center">
      <p className="text-sm text-[var(--text-muted)]">Loading cinematic showcase...</p>
    </div>
  ),
});

export default function HomePage() {
  const featuredServices = services.slice(0, 4);
  const featuredPortfolio = portfolioItems.slice(0, 6);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. BRAND STATEMENT & PHILOSOPHY */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-radial from-[var(--accent-rose)]/10 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
                <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
                <span>The Art of Bridal Beauty</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light leading-tight">
                Beauty, with <span className="italic lowercase text-[var(--accent-blush)]">intention.</span>
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed">
                Bridal beauty should never feel like a mask. We honor your heritage, facial structure, and personal style to create a timeless, luminous look that feels unmistakably *you*—from the first morning tear to the final dance floor exit.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent-blush)] hover:text-[var(--text-primary)] transition-colors group"
                >
                  <span>Read Our Full Story & Philosophy</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {aboutPhilosophy.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] hover:border-[var(--border-accent)] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-3 group"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">
                    0{index + 1}
                  </div>
                  <h3 className="font-editorial text-lg text-[var(--text-primary)] font-normal group-hover:text-[var(--accent-blush)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Bespoke Offerings</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
              Signature Bridal Services
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-hover)] hover:border-[var(--accent-blush)] hover:bg-[var(--bg-card)] text-xs uppercase tracking-[0.2em] text-[var(--text-primary)] transition-all duration-300 shadow-sm"
          >
            <span>View All 8 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, idx) => (
            <div
              key={service.id}
              className="group bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-accent)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--shadow-accent)] transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={service.featuredImage}
                  alt={`${service.title} — ${service.shortDesc}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  loading={idx < 2 ? "eager" : "lazy"}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-widest text-[#E8C8CC] border border-white/10">
                  {service.number} • {service.category}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light group-hover:text-[var(--accent-blush)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-faint)] font-light">{service.duration}</span>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-[var(--accent-blush)] hover:text-[var(--text-primary)] font-medium tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED EDITORIAL PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Real Brides & Artistry</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
              The Editorial Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 font-light max-w-xl">
              Real brides, authentic celebrations, and unretouched skin radiance captured across the Greater Toronto Area.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>Explore Full Gallery ({portfolioItems.length}+)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPortfolio.map((item, idx) => {
            const isWide = item.aspect === "landscape";
            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-accent)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ${
                  isWide ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.caption || item.title}
                  fill
                  sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  loading={idx < 3 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#E8C8CC] font-medium mb-1">
                    <span>{item.categoryName}</span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#FAF8F6] font-light">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#FAF8F6]/75 font-light line-clamp-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CINEMATIC VIDEO SHOWCASE */}
      <VideoShowcase />

      {/* 6. CURATED PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>Curated Experiences</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
            Luxury Bridal Packages
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 font-light max-w-xl mx-auto">
            Comprehensive packages tailored for peace of mind, all-inclusive morning care, and cohesive group pampering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--border-accent)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative group"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[9px] uppercase tracking-widest font-semibold mb-4">
                  {pkg.badge}
                </div>
                <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light mb-1 group-hover:text-[var(--accent-blush)] transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[var(--accent-blush)] font-normal mb-4">
                  {pkg.subtitle}
                </p>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[var(--border)] mb-8">
                  {pkg.features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={pkg.href}
                className="w-full text-center py-3 px-4 rounded-full bg-[var(--bg-input)] border border-[var(--border)] text-xs uppercase tracking-[0.16em] text-[var(--text-primary)] hover:bg-[var(--accent-rose)] hover:text-white hover:border-[var(--accent-rose)] transition-all duration-300 shadow-sm"
              >
                Inquire Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LOVE NOTES & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
              <Heart className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Real Client Experiences</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
              Love Notes From Our Brides
            </h2>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent-blush)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span>Read All Client Reviews ({reviews.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border)] flex flex-col justify-between relative group hover:border-[var(--border-accent)] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[var(--accent-gold)]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--accent-rose)]">
                    {rev.date}
                  </span>
                </div>

                <blockquote className="font-editorial text-base sm:text-lg text-[var(--text-secondary)] font-light italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-6 border-t border-[var(--border)] mt-6 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={rev.avatar}
                    alt={`${rev.clientName} — ${rev.role}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-[var(--text-primary)] font-normal leading-tight">
                    {rev.clientName}
                  </h4>
                  <p className="text-[11px] text-[var(--accent-blush)] font-light">
                    {rev.role} • {rev.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BRIDAL FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>Essential Details</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light tracking-wide">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqList.slice(0, 4).map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-colors duration-300 space-y-2"
            >
              <h3 className="font-editorial text-xl text-[var(--text-primary)] font-light">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.2em] text-[var(--accent-blush)] hover:text-[var(--text-primary)] transition-colors"
          >
            Have more questions? Contact our bridal concierge →
          </Link>
        </div>
      </section>

      {/* 9. HIGH-CONVERSION BOOKING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-gradient-to-r from-[var(--card-gradient-from)] via-[var(--bg-card)] to-[var(--card-gradient-to)] p-8 sm:p-12 md:p-16 text-center shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent-rose)] font-semibold">
              Toronto & Greater Toronto Area
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] uppercase font-light leading-tight">
              Begin Your Bridal Journey
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed max-w-xl mx-auto">
              Dates for the current and upcoming wedding seasons fill rapidly. Contact us today to check availability and reserve your bespoke bridal morning.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
              <Link
                href="/inquire"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-lg"
              >
                Inquire Your Date
              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Krimse! I'd love to check availability for my wedding date."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-[var(--whatsapp)] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.18em] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-[#E1306C]/40 bg-[#E1306C]/10 text-[#E1306C] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#E1306C] hover:text-white transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Follow {siteConfig.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
