import { Suspense } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { whyBookWithUs, siteConfig } from "@/lib/data";

export const metadata = {
  title: "Book Your Date | Beauty By Krimse",
  description:
    "Let's Bring Your Vision to Life. Whether it's a wedding, special event, photoshoot, or celebration, we'd love to be part of your day.",
};

export default function InquirePage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Booking Page"
        title="Let's Bring Your Vision to Life"
        subtitle={siteConfig.name}
        description="Whether it's a wedding, special event, photoshoot, or celebration, we'd love to be part of your day."
        breadcrumbs={[{ name: "Book Your Date" }]}
      />

      {/* Main Interactive Form with Suspense Boundary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="w-full max-w-3xl mx-auto bg-[var(--bg-card)] rounded-3xl p-12 text-center text-[var(--text-muted)] border border-[var(--border)]">
              Loading booking form...
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </section>

      {/* Why Book With Beauty By Krimse Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Our Standards</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
              Why Book With Beauty By Krimse
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyBookWithUs.map((point, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] flex items-center gap-3.5 hover:border-[var(--border-accent)] transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-rose)] shrink-0" />
                <span className="text-sm text-[var(--text-primary)] font-light leading-snug">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
