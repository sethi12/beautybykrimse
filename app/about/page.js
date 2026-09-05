import Image from "next/image";
import Link from "next/link";
import { Sparkles, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { meetKrimse, trustPoints, siteConfig } from "@/lib/data";

export const metadata = {
  title: "About Krimse | Beauty By Krimse",
  description:
    "Meet Krimse. Timeless, elevated hair and makeup looks that enhance natural beauty while ensuring clients feel confident and comfortable.",
};

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Meet Your Artist"
        title="Hi, I'm Krimse"
        subtitle={siteConfig.name}
        description={siteConfig.subheading}
        breadcrumbs={[{ name: "About" }]}
      />

      {/* Artist Section with PDF content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait / Working Image (Full Uncropped Image) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[3/2] w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-card)] group">
              <Image
                src={meetKrimse.image}
                alt="Krimse working with a bride"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#E8C8CC] font-medium">
                  {siteConfig.serviceArea}
                </p>
                <h3 className="font-editorial text-2xl text-[#FAF8F6] font-light">
                  {siteConfig.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Exact PDF Narrative */}
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

            {/* Standards / Trust Points Grid from PDF */}
            <div className="pt-6 border-t border-[var(--border)]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold mb-4">
                Our Standards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trustPoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border)] flex items-center gap-2.5 text-xs text-[var(--text-primary)] font-light"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent-rose)] shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

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
      </section>

      {/* Booking CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4 shadow-xl">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
            Let&apos;s Bring Your Vision to Life
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">
            Whether it&apos;s a wedding, special event, photoshoot, or celebration, we&apos;d love to be part of your day.
          </p>
          <div className="pt-2">
            <Link
              href="/inquire"
              className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all"
            >
              Book Your Date
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
