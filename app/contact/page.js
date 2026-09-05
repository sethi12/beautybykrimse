import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { siteConfig, serviceAreas } from "@/lib/data";

export const metadata = {
  title: "Contact | Beauty By Krimse",
  description:
    "Let's Connect. Have a question about services, availability, collaborations, or bookings? We're here to help and will get back to you within 24–48 hours.",
};

export default function ContactPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Contact Page"
        title="Let's Connect"
        subtitle={siteConfig.name}
        description="Have a question about services, availability, collaborations, or bookings? We're here to help and will get back to you within 24–48 hours."
        breadcrumbs={[{ name: "Contact" }]}
      />

      {/* Main Contact Information Cards from PDF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Email */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--border-accent)] transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-rose)]">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--accent-rose)] font-semibold">
                Email Inquiries
              </span>
              <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                Email
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Send us your questions, inspiration details, or multi-day itinerary requests.
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.email}?subject=Inquiry%20-%20Beauty%20By%20Krimse`}
              className="w-full py-3.5 px-4 rounded-full bg-[var(--bg-input)] border border-[var(--border)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] hover:border-[var(--border-accent)] hover:text-[var(--accent-blush)] transition-all text-center flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[var(--accent-blush)]" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          {/* Card 2: Instagram */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border)] hover:border-[#E1306C]/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C]">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#E1306C] font-semibold">
                Live Portfolio & Reels
              </span>
              <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                Instagram
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Follow our latest bridal transformations and recent work on Instagram.
              </p>
            </div>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full bg-[#E1306C] text-white text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 transition-all text-center shadow-md flex items-center justify-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{siteConfig.instagramHandle}</span>
            </a>
          </div>

          {/* Card 3: Service Area */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--border-accent)] transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-blush)]">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--accent-blush)] font-semibold">
                Travel Coverage
              </span>
              <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                Service Area
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                {siteConfig.serviceArea}
              </p>
            </div>

            <Link
              href="/inquire"
              className="w-full py-3.5 px-4 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all text-center shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Your Date</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS SECTION from PDF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent-rose)]" />
              <span>Coverage</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
              {serviceAreas.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceAreas.items.map((area, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] space-y-2 hover:border-[var(--border-accent)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-rose)]" />
                  <h3 className="font-editorial text-xl text-[var(--text-primary)] font-light">
                    {area.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed pl-4">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
