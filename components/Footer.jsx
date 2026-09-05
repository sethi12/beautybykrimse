import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/Icons";
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
              <Link href="/" className="inline-block group py-1" aria-label="Beauty By Krimse Home">
                <BrandLogo size="footer" />
              </Link>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-medium mt-1">
                {siteConfig.tagline}
              </p>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md font-light">
              {siteConfig.supportingText}
            </p>

            <div className="flex flex-col space-y-2.5 pt-2 text-xs text-[var(--text-secondary)] font-light">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0" />
                <span>{siteConfig.serviceArea}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-[var(--accent-blush)] transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-3.5 h-3.5 text-[var(--whatsapp)] shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent-blush)] transition-colors"
                >
                  {siteConfig.displayPhone} (WhatsApp)
                </a>
              </div>
            </div>

            {/* Quick Action Badges (WhatsApp, Instagram & Email) */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--whatsapp)]/30 bg-[var(--whatsapp)]/10 text-[var(--whatsapp)] text-xs font-medium hover:bg-[var(--whatsapp)]/20 transition-all shadow-sm group"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span>WhatsApp</span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E1306C]/30 bg-[#E1306C]/5 text-[#E1306C] text-xs font-medium hover:bg-[#E1306C]/15 transition-all shadow-sm group"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span>{siteConfig.instagramHandle}</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}?subject=Inquiry%20-%20Beauty%20By%20Krimse`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-secondary)] text-xs font-medium hover:bg-[var(--bg-input-focus)] hover:text-[var(--accent-blush)] transition-all shadow-sm group"
                title="Email Us"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent-blush)] transition-transform group-hover:scale-110" />
                <span>Email Us</span>
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--accent-rose)] font-semibold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs text-[var(--text-muted)] font-light">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Love Notes", href: "/reviews" },
                { name: "About Krimse", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--accent-blush)] transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent-blush)]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quicklist (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--accent-rose)] font-semibold">
              Services
            </h3>
            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-light">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-[var(--accent-blush)] transition-colors block line-clamp-1"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-faint)] font-light">
          <div>
            © {currentYear} {siteConfig.name}. All Rights Reserved. {siteConfig.serviceArea}.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--whatsapp)] transition-colors flex items-center gap-1.5 group"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[var(--whatsapp)] transition-transform group-hover:scale-110" />
              <span>WhatsApp</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition-colors flex items-center gap-1.5 group"
            >
              <InstagramIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>Instagram</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
            <Link
              href="/inquire"
              className="text-[var(--accent-blush)] hover:text-[var(--text-primary)] transition-colors"
            >
              Book Your Date
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
