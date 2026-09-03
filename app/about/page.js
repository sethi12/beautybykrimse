import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, Shield, Camera, Palette } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "About Krimse & The Bridal Philosophy",
  description:
    "Learn about BeautyByKrimse, our intentional approach to luxury bridal artistry, prestigious international kit formulas, and on-location services across Toronto & the GTA.",
};

const kitBrands = [
  { name: "Charlotte Tilbury", role: "Skin Glow & Magic Creams" },
  { name: "Dior Backstage", role: "Weightless Foundations" },
  { name: "NARS Pro", role: "High-Pigment Radiant Concealers" },
  { name: "Natasha Denona", role: "Couture Mineral Eyeshadows" },
  { name: "Hourglass Cosmetics", role: "Ambient Lighting Powders" },
  { name: "Patrick Ta Beauty", role: "Dimensional Creme & Powder Blushes" },
  { name: "Tom Ford", role: "Luxury Lip Sculpting & Shimmers" },
  { name: "Laura Mercier", role: "Translucent Locking Powders" }
];

const pillars = [
  {
    icon: Sparkles,
    title: "Heritage Meets High Fashion",
    desc: "We celebrate the rich traditions of South Asian weddings and the clean lines of Western bridal aesthetics. Whether draping heavy Banarasi dupattas or tailoring a French lace veil, our artistry bridges cultural depth with modern editorial refinement."
  },
  {
    icon: Shield,
    title: "18-Hour Immovable Longevity",
    desc: "Weddings are emotional marathons. We utilize waterproof setting systems, micro-layering techniques, and secure hair anchoring pins that withstand tears, tight embraces, outdoor heat, and non-stop dancing."
  },
  {
    icon: Heart,
    title: "A Calming Presence in the Suite",
    desc: "Your wedding morning shouldn't feel chaotic. We maintain an immaculate, serene workspace, stick strictly to your morning timeline, and ensure you feel relaxed and completely pampered."
  },
  {
    icon: Camera,
    title: "Engineered for 4K & Flash Photography",
    desc: "We formulate coverage that looks flawless to the naked eye while eliminating flashback, cakey texture, and harsh lines under ultra-high definition wedding cameras and videography lenses."
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      <PageHeader
        badge="The Philosophy"
        title="Beauty, With Intention"
        subtitle="The Heart & Craft Behind BeautyByKrimse"
        description="Crafting timeless bridal beauty across Toronto and the GTA with personalized artistry, luxury kit standards, and an unwavering devotion to your peace of mind."
        breadcrumbs={[{ name: "About" }]}
      />

      {/* Founder / Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Showcase */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-card)] group">
              <Image
                src="/mainimages/IMG_7657.jpg"
                alt="BeautyByKrimse Lead Artistry"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#E8C8CC] font-medium">
                  Toronto & GTA Bridal Artist
                </p>
                <h3 className="font-editorial text-2xl text-[#FAF8F6] font-light">
                  Bespoke Bridal Elegance
                </h3>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
              <span>Our Story & Mission</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light leading-tight">
              Honoring Your Essence on the Most Sacred Morning
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] font-light leading-relaxed">
              <p>
                At BeautyByKrimse, we believe that true luxury lies in personal attention. A wedding is not just another event—it is a sacred rite of passage surrounded by family, love, and emotion.
              </p>
              <p>
                Based in the Greater Toronto Area, we specialize in high-end bridal beauty for South Asian and Western brides who appreciate sophisticated skin work, immovable hair engineering, and a calm, joyful morning atmosphere.
              </p>
              <p>
                We reject heavy, mask-like makeup trends in favor of radiant, multidimensional complexion work that allows your skin to breathe and your natural features to take center stage.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <div className="border-l-2 border-[var(--accent-rose)] pl-4">
                <div className="font-editorial text-2xl text-[var(--text-primary)]">200+</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Brides Styled</div>
              </div>
              <div className="border-l-2 border-[var(--accent-rose)] pl-4">
                <div className="font-editorial text-2xl text-[var(--text-primary)]">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Sanitized Luxury Kit</div>
              </div>
              <div className="border-l-2 border-[var(--accent-rose)] pl-4">
                <div className="font-editorial text-2xl text-[var(--text-primary)]">GTA Wide</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Mobile Studio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--accent-blush)] text-[10px] uppercase tracking-[0.25em] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[var(--accent-rose)]" />
            <span>Our Standards</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[var(--text-primary)] uppercase font-light tracking-wide">
            The BeautyByKrimse Promise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--badge-bg)] border border-[var(--badge-border)] flex items-center justify-center text-[var(--accent-rose)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-2xl text-[var(--text-primary)] font-light">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Luxury Kit Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--bg-card)] rounded-3xl p-8 sm:p-12 border border-[var(--border)] relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--accent-rose)] font-semibold">
              <Palette className="w-3.5 h-3.5" />
              <span>International Luxury Formulas</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
              Inside The Bridal Kit
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light">
              We never compromise on product quality. Only the most prestigious, dermatologist-tested formulas touch your skin.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {kitBrands.map((brand, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[var(--bg-input)] border border-[var(--border)] text-center space-y-1"
              >
                <div className="font-editorial text-lg text-[var(--text-primary)] font-normal">
                  {brand.name}
                </div>
                <div className="text-[10px] text-[var(--accent-blush)] font-light tracking-wide">
                  {brand.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
            Let&apos;s Create Something Unforgettable
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">
            Contact us today to check date availability for your Toronto, GTA, or destination wedding.
          </p>
          <div className="pt-2">
            <Link
              href="/inquire"
              className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all shadow-md"
            >
              Inquire Your Date
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
