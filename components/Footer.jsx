import Link from "next/link";
import { Sparkles, MessageCircle, Mail, MapPin, ArrowUpRight, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import BrandLogo from "@/components/BrandLogo";
import { siteConfig, services } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] relative overflow-hidden text-[var(--text-primary)]">
      {/* Subtle background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-radial from-[var(--accent-rose)]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[var(--border)]">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <Link href="/" className="inline-block group py-1" aria-label="BeautyByKrimse Home">
                <BrandLogo size="footer" />
              </Link>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md font-light">
              Elevated bridal and event beauty crafted with deliberate artistry, high-definition longevity, and serene morning presence across Toronto, the Greater Toronto Area, and destination weddings worldwide.
            </p>

            <div className="flex flex-col space-y-2.5 pt-2 text-xs text-[var(--text-secondary)] font-light">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0" />
                <span>Toronto & Greater Toronto Area, Ontario, Canada</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0" />
                <a href={`tel:${siteConfig.whatsappNumber}`} className="hover:text-[var(--accent-blush)] transition-colors">
                  {siteConfig.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0" />
                <span>On-Location Bridal Artistry • Private Studio Appointments</span>
              </div>
            </div>

            {/* Quick Action Badges (Instagram, WhatsApp, Email) */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E1306C]/30 bg-[#E1306C]/5 text-[#E1306C] text-xs font-medium hover:bg-[#E1306C]/15 transition-colors"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>{siteConfig.instagramHandle}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Krimse! I'd like to inquire about bridal dates and rates."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--whatsapp)]/30 bg-[var(--whatsapp)]/5 text-[var(--whatsapp)] text-xs font-medium hover:bg-[var(--whatsapp)]/15 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}?subject=Bridal%20Inquiry%20-%20BeautyByKrimse`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-input-focus)] transition-colors"
                title="Email Us"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent-blush)]" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--accent-rose)] font-semibold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs text-[var(--text-muted)] font-light">
              {[
                { name: "Portfolio Gallery", href: "/portfolio" },
                { name: "Signature Services", href: "/services" },
                { name: "Curated Packages", href: "/packages" },
                { name: "Love Notes & Reviews", href: "/reviews" },
                { name: "The Philosophy", href: "/about" },
                { name: "Contact & Studio", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[var(--accent-blush)] transition-colors flex items-center gap-1 group">
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent-blush)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quicklist (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--accent-rose)] font-semibold">
              Offerings
            </h3>
            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-light">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-[var(--accent-blush)] transition-colors block line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-[var(--accent-blush)] font-normal hover:underline pt-1 inline-block"
                >
                  View All 8 Experiences →
                </Link>
              </li>
            </ul>
          </div>

          {/* Booking CTA Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--accent-rose)] font-semibold">
              Reserve
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
              Dates for the upcoming wedding season fill rapidly. Secure your bridal suite early.
            </p>
            <Link
              href="/inquire"
              className="inline-block w-full text-center py-2.5 px-4 rounded-full bg-[var(--accent-rose)] text-white text-[11px] font-semibold uppercase tracking-[0.16em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
            >
              Inquire Now
            </Link>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-faint)] font-light">
          <div>
            © {currentYear} {siteConfig.name}. All Rights Reserved. Toronto, Ontario, Canada.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors flex items-center gap-1.5"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--whatsapp)] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <Link href="/inquire" className="text-[var(--accent-blush)]/80 hover:text-[var(--accent-blush)] transition-colors">
              Book Your Date
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
