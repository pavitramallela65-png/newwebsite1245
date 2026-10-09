import React, { useState } from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { IMAGES } from '../data/cafeData';

interface HeroProps {
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#1E140F] text-[#FAF6F0] py-16 md:py-24 lg:py-28 border-b border-[#38271E]"
    >
      {/* Subtle warm radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(198, 125, 59, 0.35), transparent 55%), radial-gradient(circle at 80% 70%, rgba(140, 88, 44, 0.25), transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-[#D4A373]">
              <span>Brew Haven Roastery & Café</span>
              <span aria-hidden="true">·</span>
              <span>Your Daily Dose of Happiness</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.12] text-[#FAF6F0] max-w-2xl [text-wrap:balance]">
              Start Your Day with the Perfect Coffee.
            </h1>

            <p className="text-base sm:text-lg text-[#D8CBC0] leading-relaxed max-w-xl">
              Freshly brewed happiness, one cup at a time. We roast single-estate 100% Arabica beans in small batches every morning for an unforgettable, velvety pour.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#1E140F] bg-[#E09F5A] hover:bg-[#EAA965] rounded-lg transition-transform duration-150 active:scale-[0.99] whitespace-nowrap shrink-0 shadow-sm"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#FAF6F0] bg-transparent border border-[#5C4435] hover:border-[#D4A373] hover:bg-[#2A1D16] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Order Your Coffee</span>
              </button>
            </div>

            {/* Quiet Craft Credentials */}
            <div className="pt-6 border-t border-[#38271E] grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF6F0] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#B8A698] mt-1">Single-Origin Arabica</p>
              </div>
              <div>
                <p className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF6F0] tabular-nums">
                  48 hrs
                </p>
                <p className="text-xs text-[#B8A698] mt-1">Peak Roast-to-Cup</p>
              </div>
              <div>
                <p className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#FAF6F0] tabular-nums">
                  4.9 ★
                </p>
                <p className="text-xs text-[#B8A698] mt-1">1,400+ Local Guests</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Image */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[320px] sm:min-h-[400px] lg:h-full rounded-2xl overflow-hidden border border-[#3E2C22] bg-[#2A1B12] shadow-xl">
              {!imgError ? (
                <img
                  src={IMAGES.heroShowcase}
                  alt="Handcrafted cappuccino with intricate rosetta latte art on a warm walnut table by a sunlit cafe window"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#2A1B12] to-[#1E140F]">
                  <Coffee className="w-14 h-14 text-[#C67D3B] mb-3" />
                  <p className="font-serif-display text-lg text-[#FAF6F0]">Signature Rosetta Cappuccino</p>
                  <p className="text-xs text-[#B8A698] mt-1">Hand-poured daily at Brew Haven</p>
                </div>
              )}

              {/* Subtle bottom scrim with caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5">
                <div className="flex items-center justify-between text-xs text-[#E6DCD2]">
                  <span>Featured Pour · House Cappuccino</span>
                  <span className="font-mono tabular-nums text-[#E09F5A] font-semibold">₹149</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
