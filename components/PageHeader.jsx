import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function PageHeader({
  badge = "Editorial Artistry",
  title,
  subtitle,
  description,
  breadcrumbs = [],
}) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden border-b border-[var(--border)]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial from-[var(--accent-rose)]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center justify-center space-x-2 text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)] mb-6">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center space-x-2">
                <span>/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[var(--text-primary)] transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-[var(--accent-blush)]">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] text-[var(--accent-blush)] text-[11px] uppercase tracking-[0.25em] font-medium mb-6">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.06em] text-[var(--text-primary)] uppercase leading-[1.1] max-w-4xl mx-auto">
          {title}
        </h1>

        {/* Subtitle / Tagline */}
        {subtitle && (
          <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[var(--accent-blush)] font-normal tracking-wide mt-3 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm sm:text-base text-[var(--text-muted)] font-light leading-relaxed max-w-2xl mx-auto mt-5">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
