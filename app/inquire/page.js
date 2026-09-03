import { Suspense } from "react";
import { Sparkles, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Inquire Bridal Date & Custom Quote",
  description:
    "Check wedding date availability and receive a tailored bridal hair & makeup proposal from BeautyByKrimse in Toronto & GTA. Instant WhatsApp concierge and email booking.",
};

const steps = [
  {
    step: "01",
    title: "Submit Your Event Details",
    desc: "Fill out our booking form with your wedding date, getting-ready location, and service requirements."
  },
  {
    step: "02",
    title: "Receive Proposal Within 24h",
    desc: "We confirm date availability and provide a transparent, bespoke pricing proposal tailored to your bridal party."
  },
  {
    step: "03",
    title: "Secure Your Date",
    desc: "Sign your bridal contract and submit the retainer to lock in exclusive artist coverage for your wedding morning."
  },
  {
    step: "04",
    title: "Bridal Trial & Schedule",
    desc: "Join us in studio for your bridal preview, finalize your vision, and receive your coordinated morning timeline."
  }
];

export default function InquirePage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Bridal Concierge"
        title="Check Availability"
        subtitle="Reserve Your Sacred Wedding Morning"
        description="Please provide your event date, location, and service details below. We accommodate on-location bridal bookings across Toronto, the GTA, and worldwide destinations."
        breadcrumbs={[{ name: "Inquire" }]}
      />

      {/* Main Interactive Form with Suspense Boundary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="w-full max-w-4xl mx-auto bg-[var(--bg-card)] rounded-3xl p-12 text-center text-[var(--text-muted)] border border-[var(--border)]">
              Loading inquiry concierge...
            </div>
          }
        >
          <BookingForm />
        </Suspense>
      </section>

      {/* The 4-Step Booking Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>The Booking Journey</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
            What Happens After You Inquire
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 font-light max-w-xl mx-auto">
            A seamless, transparent booking process designed to remove all stress from your wedding planning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <div
              key={item.step}
              className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] flex flex-col justify-between space-y-4 hover:border-[var(--border-accent)] transition-colors"
            >
              <div className="space-y-3">
                <span className="font-editorial text-4xl text-[var(--accent-rose)]/40 font-light block">
                  {item.step}
                </span>
                <h3 className="font-editorial text-xl text-[var(--text-primary)] font-normal">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct WhatsApp Concierge Prompt */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--whatsapp)]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--whatsapp)] font-semibold">
              <MessageCircle className="w-4 h-4" />
              <span>Prefer Instant Messaging?</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--text-primary)] font-light">
              Chat With Our Bridal Concierge
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-light">
              Send us a direct WhatsApp message to check last-minute dates or ask quick questions.
            </p>
          </div>

          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
              "Hi Krimse! I'd like to check availability for my wedding date."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[var(--whatsapp)] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.18em] hover:brightness-110 transition-all shrink-0 shadow-lg"
          >
            Launch WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
