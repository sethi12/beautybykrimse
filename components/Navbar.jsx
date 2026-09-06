"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, ArrowRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import { useTheme } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/data";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Love Notes", href: "/reviews" },
  { name: "About Krimse", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[var(--glass-bg)] backdrop-blur-md py-3 border-b border-[var(--glass-border)] shadow-xl"
          : "bg-gradient-to-b from-[var(--bg-primary)]/90 via-[var(--bg-primary)]/50 to-transparent py-3.5 sm:py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Brand Logo */}
            <Link
              href="/"
              aria-label="Beauty By Krimse Home"
              className="focus:outline-none shrink-0 flex items-center"
              onClick={handleLinkClick}
            >
              <img
                src={isDark ? "/logo-white.png" : "/logo.png"}
                alt={siteConfig.name}
                className="h-14 sm:h-15 w-auto object-contain transition-opacity duration-300"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8 shrink-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[11px] xl:text-xs uppercase tracking-[0.16em] xl:tracking-[0.18em] font-medium transition-all duration-200 relative py-1 whitespace-nowrap ${isActive
                      ? "text-[var(--accent-blush)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent-blush)] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right CTA Bar (ThemeToggle + Book Your Date) */}
            <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3.5 shrink-0">
              <ThemeToggle />

              <Link
                href="/inquire"
                className="relative group overflow-hidden px-5 xl:px-6 py-2 xl:py-2.5 rounded-full bg-[var(--accent-rose)] text-white text-[10.5px] xl:text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-all duration-200 hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] hover:shadow-[0_0_20px_var(--shadow-accent)] whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>Book Your Date</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>

            {/* Mobile Controls (Theme Toggle + Menu Toggle Button) */}
            <div className="flex items-center space-x-2.5 lg:hidden">
              <ThemeToggle />

              <Link
                href="/inquire"
                onClick={handleLinkClick}
                className="px-3.5 py-1.5 rounded-full bg-[var(--accent-rose)] text-white text-[10.5px] font-semibold uppercase tracking-wider shrink-0"
              >
                Book
              </Link>

              {/* Mobile Menu Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
                aria-expanded={isOpen}
                className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors focus:outline-none"
              >
                {isOpen ? <X className="w-5 h-5 text-[var(--accent-rose)]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Smooth Side-Menu Drawer & Backdrop for Mobile Screen */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-visibility duration-300 ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none delay-300"
          }`}
      >
        {/* Backdrop Fade Overlay */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in Side Drawer from Right */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-[310px] sm:w-[350px] max-w-[85vw] bg-[var(--bg-card)] border-l border-[var(--border)] p-6 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Drawer Top Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <Link
                href="/"
                aria-label="Beauty By Krimse Home"
                className="focus:outline-none shrink-0"
                onClick={handleLinkClick}
              >
                <img
                  src={isDark ? "/logo-white.png" : "/logo.png"}
                  alt={siteConfig.name}
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links with Instant Close on Click */}
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-rose)] font-semibold mb-1">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`text-lg font-editorial tracking-[0.08em] py-2 px-2 rounded-xl transition-all flex items-center justify-between ${isActive
                      ? "bg-[var(--badge-bg)] text-[var(--accent-blush)] font-medium pl-3 border border-[var(--badge-border)]"
                      : "text-[var(--text-primary)] hover:text-[var(--accent-blush)] hover:bg-[var(--bg-input)]"
                      }`}
                  >
                    <span>{link.name}</span>
                    {isActive ? (
                      <Sparkles className="w-4 h-4 text-[var(--accent-rose)]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--text-faint)]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Inquire CTA Button */}
            <div className="pt-2 space-y-2.5">
              <Link
                href="/inquire"
                onClick={handleLinkClick}
                className="w-full text-center py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] shadow-lg hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-colors block"
              >
                Book Your Date
              </Link>
            </div>
          </div>

          {/* Drawer Bottom Quick Social / Contact Info */}
          <div className="pt-6 border-t border-[var(--border)] mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#E1306C]/30 bg-[#E1306C]/5 text-[#E1306C] text-[11px] font-medium hover:bg-[#E1306C]/15 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Krimse! I'd love to check bridal hair and makeup availability."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[var(--whatsapp)]/30 bg-[var(--whatsapp)]/5 text-[var(--whatsapp)] text-[11px] font-medium hover:bg-[var(--whatsapp)]/15 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="text-[11px] text-[var(--text-muted)] font-light space-y-1 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 text-[var(--accent-rose)]" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[var(--accent-rose)]" />
                <span>{siteConfig.serviceArea}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
