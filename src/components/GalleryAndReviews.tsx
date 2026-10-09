import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Star, Coffee } from 'lucide-react';
import { GALLERY_ITEMS, TESTIMONIALS, GalleryItem } from '../data/cafeData';

export const GalleryAndReviews: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
            : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null ? GALLERY_ITEMS[activeLightboxIndex] : null;

  return (
    <>
      {/* Section G: Gallery Section */}
      <section id="gallery" className="py-20 md:py-28 bg-[#F3ECE3] border-b border-[#E6DCD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5B25]">
                <span>Visual Atmosphere</span>
                <span aria-hidden="true">·</span>
                <span>Inside Brew Haven</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A1B12] tracking-tight [text-wrap:balance]">
                Moments of Craft, Steam, and Quiet Conversation
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6E5A4F]">
              Select any photograph to inspect in full resolution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative text-left rounded-2xl overflow-hidden bg-[#2A1B12] border border-[#E2D6C8] aspect-4/3 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C67D3B]"
              >
                {!failedImages[item.id] ? (
                  <img
                    src={item.image}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                    }
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-106"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#2A1B12] text-[#FAF6F0]">
                    <Coffee className="w-10 h-10 text-[#E09F5A] mb-2" />
                    <span className="font-serif-display text-base">{item.title}</span>
                  </div>
                )}

                {/* Measured gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-[#E09F5A]">
                        {item.category}
                      </p>
                      <h3 className="font-serif-display text-lg font-medium text-[#FAF6F0] mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                    <span className="w-9 h-9 rounded-lg bg-[#FAF6F0]/15 backdrop-blur-xs text-[#FAF6F0] flex items-center justify-center group-hover:bg-[#E09F5A] group-hover:text-[#1E140F] transition-colors shrink-0">
                      <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section H: Customer Reviews Section */}
      <section id="reviews" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#E6DCD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5B25]">
              <span>Guest Testimonials</span>
              <span aria-hidden="true">·</span>
              <span>Community Voices</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A1B12] tracking-tight [text-wrap:balance]">
              Loved by Daily Regulars & Specialty Coffee Connoisseurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                className="p-7 rounded-2xl bg-[#F3ECE3]/75 border border-[#E2D6C8] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Star Rating + Regular Order Metadata */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#C67D3B] text-[#C67D3B]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#7A6558]">{t.favoriteOrder}</span>
                  </div>

                  <blockquote className="text-sm sm:text-base text-[#3A281E] leading-relaxed">
                    “{t.review}”
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[#E2D6C8] flex items-center justify-between">
                  <div>
                    <p className="font-serif-display text-base font-semibold text-[#2A1B12]">
                      {t.name}
                    </p>
                    <p className="text-xs text-[#6E5A4F] mt-0.5">
                      {t.role} · {t.organization}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1E140F] border border-[#3E2C22] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#38271E] text-[#FAF6F0]">
              <div className="flex items-center gap-2 text-xs text-[#D4A373]">
                <span>{activeItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {activeLightboxIndex + 1} / {GALLERY_ITEMS.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close lightbox"
                className="p-1.5 rounded-lg text-[#D8CBC0] hover:text-[#FAF6F0] hover:bg-[#2A1B12] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative aspect-16/9 bg-[#120C09] flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.caption}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-full object-contain"
              />

              {/* Prev / Next Controls */}
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + GALLERY_ITEMS.length) %
                      GALLERY_ITEMS.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E140F]/80 hover:bg-[#E09F5A] text-[#FAF6F0] hover:text-[#1E140F] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex + 1) % GALLERY_ITEMS.length
                  )
                }
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E140F]/80 hover:bg-[#E09F5A] text-[#FAF6F0] hover:text-[#1E140F] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="p-5 bg-[#1E140F] text-[#FAF6F0]">
              <h3 className="font-serif-display text-lg font-semibold">
                {activeItem.title}
              </h3>
              <p className="text-sm text-[#C8B9AC] mt-1">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
