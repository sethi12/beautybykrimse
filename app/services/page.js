import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { services } from "@/lib/data";

export const metadata = {
  title: "Bridal Services & Experiences",
  description:
    "Explore our 8 bespoke bridal and event hair & makeup services in Toronto and the GTA. South Asian bridal transformations, dupatta setting, jewelry placement, and bridal squad glam.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="Couture Offerings"
        title="Signature Services"
        subtitle="Meticulous Artistry Tailored to Every Celebration"
        description="From full-service royal bridal transformations to radiant non-bridal event glam and synchronized bridal parties across Toronto and the Greater Toronto Area."
        breadcrumbs={[{ name: "Services" }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
        {services.map((service, index) => {
          const isEven = index % 2 === 1;
          return (
            <div key={service.id} id={service.id} className="scroll-mt-32 pt-6 border-t border-[var(--border)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="space-y-4">
                    <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-card)] group">
                      <Image src={service.featuredImage} alt={`${service.title} — ${service.shortDesc}`} fill sizes="(max-width: 768px) 100vw, 40vw" loading={index < 2 ? "eager" : "lazy"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#E8C8CC] border border-white/10">
                        {service.number} • {service.category}
                      </div>
                    </div>
                    {service.gallery && service.gallery.length > 1 && (
                      <div className="grid grid-cols-3 gap-3">
                        {service.gallery.slice(1, 4).map((thumb, tIdx) => (
                          <div key={tIdx} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border)] group">
                            <Image src={thumb} alt={`${service.title} detail ${tIdx + 1}`} fill sizes="120px" loading="lazy" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`lg:col-span-7 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-2">
                    <span className="font-editorial text-4xl sm:text-5xl text-[var(--accent-rose)]/40 font-light block">{service.number}</span>
                    <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light leading-tight">{service.title}</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent-blush)] font-medium">{service.category} • Duration: {service.duration}</p>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">{service.fullDesc}</p>
                  <div className="space-y-3 pt-4 border-t border-[var(--border)]">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">What&apos;s Included In This Experience</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.included.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)] font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-rose)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-xs text-[var(--text-muted)] font-light">
                    <span className="text-[var(--accent-blush)] font-medium uppercase tracking-wider block mb-1">Ideal For:</span>
                    {service.idealFor}
                  </div>
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link href={`/inquire?service=${service.id}`} className="px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all flex items-center gap-2 shadow-md">
                      <span>Inquire This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/portfolio" className="px-6 py-3.5 rounded-full border border-[var(--border-hover)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)] hover:border-[var(--accent-blush)] transition-colors">
                      View Portfolio Looks
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">Need a custom multi-day wedding package?</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">We offer bespoke multi-day bridal packages combining Maiyan, Sangeet, Wedding, and Reception events.</p>
          <div className="pt-2">
            <Link href="/inquire" className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all">
              Request Custom Multi-Day Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
