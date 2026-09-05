import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ServiceInteractiveGallery from "@/components/ServiceInteractiveGallery";
import { services, siteConfig } from "@/lib/data";

export const metadata = {
  title: "Services | Beauty By Krimse",
  description:
    "OUR SERVICES — Luxury hair & makeup tailored for every stage of your celebration.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Tailored Artistry"
        title="OUR SERVICES"
        subtitle={siteConfig.name}
        description="Luxury hair & makeup tailored for every stage of your celebration."
        breadcrumbs={[{ name: "Services" }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 pt-8 border-t border-[var(--border)] first:border-t-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* Visual Imagery with Tap-to-Swap Feature */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <ServiceInteractiveGallery
                    featuredImage={service.featuredImage}
                    gallery={service.gallery}
                    title={service.title}
                    priority={index < 2}
                  />
                </div>

                {/* Content Details */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-3">
                    <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)]">
                    <ul className="space-y-3">
                      {service.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[var(--text-primary)] font-light"
                        >
                          <span className="text-[var(--accent-rose)] font-semibold shrink-0">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/inquire?service=${service.id}`}
                      className="px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all flex items-center gap-2 shadow-md group"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Final Booking Prompt */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>{siteConfig.serviceArea}</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
            Let&apos;s Bring Your Vision to Life
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">
            Whether it&apos;s a wedding, special event, photoshoot, or celebration, we&apos;d love to be part of your day.
          </p>
          <div className="pt-2">
            <Link
              href="/inquire"
              className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
            >
              Book Your Date
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

