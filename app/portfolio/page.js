"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Eye, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import PortfolioLightbox from "@/components/PortfolioLightbox";
import { portfolioCategories, portfolioItems, siteConfig } from "@/lib/data";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  return (
    <div className="space-y-16 pb-24">
      <PageHeader
        badge="Bridal Portfolio"
        title="Featured Brides Gallery"
        subtitle={siteConfig.name}
        description="Showcasing South Asian Brides, Western Brides, Reception Glam, Engagement Glam, and Bridal Party looks across Canada, the GTA & beyond."
        breadcrumbs={[{ name: "Portfolio" }]}
      />

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {portfolioCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 shrink-0 ${
                  isActive
                    ? "bg-[var(--accent-rose)] text-white shadow-lg"
                    : "bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isLandscape = item.aspect === "landscape";
            return (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item, index)}
                className={`group relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] cursor-pointer transition-all duration-500 hover:border-[var(--border-accent)] hover:-translate-y-1 shadow-xl ${
                  isLandscape ? "sm:col-span-2 aspect-[16/10]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.caption || item.title}
                  fill
                  sizes={isLandscape ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  loading={index < 6 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-widest text-[#E8C8CC] border border-white/10 font-medium">
                    {item.categoryName}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full bg-black/60 backdrop-blur-md text-[#FAF8F6] border border-white/20">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#FAF8F6] font-light leading-snug">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#FAF8F6]/75 font-light line-clamp-2 mt-1.5 group-hover:text-[#FAF8F6]/90 transition-colors">
                      {item.caption}
                    </p>
                  )}
                  <div className="pt-3 flex items-center justify-between text-[11px] text-[#E8C8CC] font-medium tracking-wider">
                    <span>Click to view in high resolution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-sm text-[var(--text-muted)]">
            No looks found in this category.
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <PortfolioLightbox
          item={selectedItem}
          items={filteredItems}
          currentIndex={selectedIndex}
          onClose={() => setSelectedItem(null)}
          onNavigate={(newIdx) => {
            setSelectedIndex(newIdx);
            setSelectedItem(filteredItems[newIdx]);
          }}
        />
      )}

      {/* Inquiry CTA from PDF */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] space-y-4 shadow-xl">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[var(--text-primary)] uppercase font-light">
            Let&apos;s Bring Your Vision to Life
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg mx-auto">
            Whether it&apos;s a wedding, special event, photoshoot, or celebration, we&apos;d love to be part of your day.
          </p>
          <div className="pt-2">
            <Link
              href="/inquire"
              className="inline-block px-8 py-3.5 rounded-full bg-[var(--accent-rose)] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[var(--accent-blush)] hover:text-[#0D0D0D] transition-all"
            >
              Book Your Date
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
