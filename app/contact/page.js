import Link from "next/link";
import { MessageCircle, Mail, MapPin, Clock, Sparkles, ShieldCheck, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: "Contact & Studio Concierge",
  description:
    "Get in touch with BeautyByKrimse for bridal booking inquiries, private consultations, and on-location hair & makeup services across Toronto and the GTA.",
};

const serviceCities = [
  "Toronto & Downtown Core",
  "Brampton & Caledon",
  "Mississauga & Streetsville",
  "Vaughan & Woodbridge",
  "Markham & Richmond Hill",
  "Oakville & Burlington",
  "Niagara-on-the-Lake & Hamilton",
  "Destination Weddings Worldwide"
];

export default function ContactPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Direct Concierge"
        title="Connect & Inquire"
        subtitle="We Are Delighted to Hear From You"
        description="Whether you have questions about your wedding morning timeline, bridal party sizing, or trial sessions, our concierge team is here to assist across WhatsApp, Instagram, and Email."
        breadcrumbs={[{ name: "Contact" }]}
      />

      {/* Main Contact & Social Channels Grid (4 Channels) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: WhatsApp Concierge */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border)] hover:border-[var(--whatsapp)]/40 transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[var(--whatsapp)]/10 border border-[var(--whatsapp)]/30 flex items-center justify-center text-[var(--whatsapp)]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--whatsapp)] font-semibold">
                Fastest Response
              </span>
              <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                WhatsApp
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Connect directly for rapid date availability checks, portfolio questions, and instant quotes.
              </p>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                "Hi Krimse! I'd love to check availability for bridal hair & makeup services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-full bg-[var(--whatsapp)] text-[#0D0D0D] text-xs font-bold uppercase tracking-[0.16em] hover:brightness-110 transition-all text-center shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 2: Instagram Direct Message & Portfolio */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border)] hover:border-[#E1306C]/40 transition-all duration-300 flex flex-col justify-between space-y-6">
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
                Watch behind-the-scenes bride transformations, daily stories, and DM our team.
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

          {/* Card 3: Studio Email */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border)] hover:border-[var(--border-accent)] transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-rose)]">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--accent-rose)] font-semibold">
                Formal Proposals
              </span>
              <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                Studio Email
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Send us wedding mood boards, photographer timelines, and multi-day itinerary requests.
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.email}?subject=Bridal%20Inquiry%20-%20BeautyByKrimse`}
              className="w-full py-3.5 px-4 rounded-full bg-[var(--bg-input)] border border-[var(--border)] text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-all text-center flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[var(--accent-blush)]" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          {/* Card 4: Online Multi-Step Booking Form */}
          <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-blush)]">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--accent-blush)] font-semibold">
                5-Step Guided Form
              </span>
              <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                Online Inquiry
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                Fill out our detailed form with ready-by time and party count for an immediate bespoke quote.
              </p>
            </div>

            <Link
              href="/inquire"
              className="w-full py-3.5 px-4 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all text-center shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Booking Form</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--border)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Travel Coverage</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
                Serving the Greater Toronto Area & Beyond
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">
                Our mobile bridal team brings the luxury salon experience directly to your hotel suite, bridal venue, or residence across Ontario.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {serviceCities.map((city, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[var(--bg-input)] border border-[var(--border)] flex items-center gap-3 text-xs text-[var(--text-secondary)] font-light"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-rose)]" />
                  <span>{city}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studio Hours & Response Time */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-start gap-4">
            <Clock className="w-5 h-5 text-[var(--accent-rose)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-editorial text-xl text-[var(--text-primary)] font-light">
                Operating Schedule
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light">
                {siteConfig.hours}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-[var(--accent-rose)] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-editorial text-xl text-[var(--text-primary)] font-light">
                Response Guarantee
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light">
                All WhatsApp, Instagram DM, and email inquiries receive a personalized reply within 24 business hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
