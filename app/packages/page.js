import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { packages } from "@/lib/data";

export const metadata = {
  title: "Bridal Packages & Experiences",
  description: "Curated luxury bridal hair and makeup packages across Toronto & the Greater Toronto Area.",
};

export default function PackagesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader badge="Curated Collections" title="Luxury Bridal Packages" subtitle="Uncompromising Standards. Complete Morning Serenity." description="Every package is engineered to provide an effortless, high-end bridal beauty experience. With all-inclusive skin prep, custom lashes, and secure dupatta and jewelry anchoring." breadcrumbs={[{ name: "Packages" }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] hover:border-[var(--border-accent)] transition-all duration-300 flex flex-col justify-between relative group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-widest font-semibold">{pkg.badge}</span>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-faint)]">Bespoke Quote</span>
                </div>
                <div>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">{pkg.name}</h2>
                  <p className="font-editorial italic text-lg text-[var(--accent-blush)] font-normal mt-1">{pkg.subtitle}</p>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed mt-4">{pkg.description}</p>
                </div>
                <div className="pt-6 border-t border-[var(--border)] space-y-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">Package Inclusions</h3>
                  <div className="space-y-2.5">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] font-light">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-rose)] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-xs text-[var(--text-muted)] font-light">
                  <span className="text-[var(--accent-blush)] font-medium uppercase tracking-wider block mb-1">Recommended For:</span>
                  {pkg.ideal}
                </div>
              </div>
              <div className="pt-8 mt-8 border-t border-[var(--border)]">
                <Link href={pkg.href} className="w-full py-4 px-6 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all flex items-center justify-center gap-2 group shadow-lg">
                  <span>{pkg.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bridal Preview & Trial Consultations</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">Designing Your Signature Vision</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">Bridal trials take place in our private Toronto studio. During your 2.5-hour consultation, we analyze your outfit swatches, jewelry weight, veil placement, and skin undertones to craft your bespoke wedding day look with zero guesswork.</p>
          </div>
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Toronto & GTA Travel Coverage</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">The Mobile Bridal Sanctuary</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">We travel directly to your hotel suite, bridal prep venue, or residence across Toronto, Brampton, Mississauga, Vaughan, Markham, Oakville, and beyond. We arrive with professional studio lighting, makeup chairs, and sanitized luxury products.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[var(--card-gradient-from)] to-[var(--bg-card)] border border-[var(--border)] space-y-4">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">Ready to secure your bridal package?</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">Contact us with your date and guest count for an immediate proposal and timeline consultation.</p>
          <div className="pt-2">
            <Link href="/inquire" className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md">Inquire Package Availability</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
