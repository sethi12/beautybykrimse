import Image from "next/image";
import Link from "next/link";
import { Star, Quote, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { reviews, siteConfig } from "@/lib/data";

export const metadata = {
  title: "Love Notes & Client Reviews",
  description:
    "Read genuine testimonials and reviews from our radiant brides across Toronto and the GTA. Unforgettable bridal transformations, calm morning presence, and immovable 18-hour holds.",
};

export default function ReviewsPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Love Notes"
        title="Words From Our Brides"
        subtitle="Cherished Memories & Unfiltered Gratitude"
        description="There is no greater honor than being invited into a bride's sacred morning. Read authentic experiences from real brides across Toronto and the Greater Toronto Area."
        breadcrumbs={[{ name: "Love Notes" }]}
      />

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-10 border border-[var(--border)] flex flex-col justify-between relative group hover:border-[var(--border-accent)] transition-all duration-300 shadow-xl"
            >
              <div className="space-y-6">
                {/* Top Quote Icon & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[var(--accent-gold)]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--accent-rose)] font-semibold">
                    {rev.date}
                  </span>
                </div>

                {/* Highlight Badge */}
                {rev.highlight && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[10px] uppercase tracking-wider text-[var(--accent-blush)] font-medium">
                    ★ {rev.highlight}
                  </div>
                )}

                {/* Testimonial Quote */}
                <blockquote className="font-editorial text-lg text-[var(--text-secondary)] font-light italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              {/* Bride Profile / Footer */}
              <div className="pt-6 border-t border-[var(--border)] mt-8 flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[var(--border-hover)] shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.clientName}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-editorial text-xl text-[var(--text-primary)] font-normal leading-tight">
                    {rev.clientName}
                  </h3>
                  <p className="text-xs text-[var(--accent-blush)] font-light mt-0.5">
                    {rev.role}
                  </p>
                  <p className="text-[11px] text-[var(--text-faint)] font-light">
                    {rev.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <Quote className="w-10 h-10 text-[var(--accent-rose)]/40 mx-auto" />
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-[var(--text-primary)] font-light italic leading-snug">
              &ldquo;My goal is that when you look in the mirror, you don&apos;t see makeup. You see the most radiant, breathtaking version of who you already are.&rdquo;
            </h2>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent-rose)] font-medium pt-2">
              — Krimse, Lead Artist & Founder
            </p>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
            Become a BeautyByKrimse Bride
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">
            Reserve your wedding date or bridal party session early to ensure complete morning exclusivity.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/inquire"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
            >
              Inquire Your Date
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                "Hi Krimse! I loved reading the bride reviews and would love to check availability."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[var(--whatsapp)]/40 text-[var(--whatsapp)] text-xs font-medium tracking-wider hover:bg-[var(--whatsapp)]/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
