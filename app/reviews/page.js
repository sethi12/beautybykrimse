import Link from "next/link";
import { Star, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import LoveNotesFeed from "@/components/LoveNotesFeed";
import { GoogleIcon } from "@/components/Icons";
import { loveNotes, siteConfig } from "@/lib/data";

export const metadata = {
  title: "Love Notes | Beauty By Krimse",
  description:
    "LOVE NOTES — Read authentic Google reviews and heartfelt testimonials from our brides across Toronto, the GTA & beyond.",
};

export default function ReviewsPage() {
  return (
    <div className="space-y-20 pb-24">
      <PageHeader
        badge="Client Testimonials"
        title="LOVE NOTES"
        subtitle={siteConfig.name}
        description="Authentic reviews and words of love from our brides on Google Reviews."
        breadcrumbs={[{ name: "Love Notes" }]}
      />

      {/* Google Reviews Verified Rating & Direct Review Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-input)] to-[var(--bg-card)] p-8 sm:p-10 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Ambient subtle glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-radial from-[var(--accent-rose)]/10 to-transparent blur-3xl pointer-events-none" />

          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>Official Google Reviews</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex items-center gap-1 text-[var(--accent-gold)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-medium">
                5.0 Star Rating
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-xl leading-relaxed">
              Every celebration is personal. Read authentic experiences from brides and clients who trusted Beauty By Krimse for their wedding day hair and luxury makeup.
            </p>
          </div>

          {/* Primary Action: Write a Review on Google */}
          <div className="relative z-10 shrink-0 text-center">
            <a
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-rose)] hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-xl group"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Write a Review on Google</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-[11px] text-[var(--text-faint)] mt-2 font-light">
              Opens Beauty By Krimse Google Business Profile
            </p>
          </div>
        </div>
      </section>

      {/* Love Notes Review Grid (Dynamic Google Reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoveNotesFeed initialReviews={loveNotes} />
      </section>

      {/* Final Booking CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>{siteConfig.serviceArea}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
            Let&apos;s Bring Your Vision to Life
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">
            Whether it&apos;s a wedding, special event, photoshoot, or celebration, we&apos;d love to be part of your day.
          </p>
          <div className="pt-2">
            <Link
              href="/inquire"
              className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
            >
              Book Your Date
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

