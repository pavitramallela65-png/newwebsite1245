import React, { useState } from 'react';
import { Coffee, Flame, Award, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { IMAGES } from '../data/cafeData';

export const AboutSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [storyExpanded, setStoryExpanded] = useState(false);

  const features = [
    {
      title: 'Freshly Roasted Beans',
      description:
        'Sourced directly from shade-grown estates in Chikmagalur and Coorg, drum-roasted in micro-batches every 48 hours for peak crema and aroma.',
      icon: Flame,
    },
    {
      title: 'Expert Baristas',
      description:
        'Our Specialty Coffee Association trained baristas calibrate grind size, water mineral balance, and 9-bar extraction pressure before every shift.',
      icon: Award,
    },
    {
      title: 'Premium Ingredients',
      description:
        'We pair our espresso with organic farm-fresh A2 milk, 70% single-origin dark Belgian couverture chocolate, and house-cooked Madagascar vanilla syrups.',
      icon: Sparkles,
    },
    {
      title: 'Cozy Café Experience',
      description:
        'Designed with warm walnut timber, soft acoustic jazz, natural daylight, and dedicated power outlets for unhurried conversations or deep work.',
      icon: Heart,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#E6DCD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Part 1: About Us Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Barista Image Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E6DCD2] bg-[#F3ECE3] aspect-4/3 shadow-sm">
              {!imgError ? (
                <img
                  src={IMAGES.baristaCraft}
                  alt="Expert barista pouring steamed milk into a ceramic cup with a brass espresso machine in the background"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F3ECE3] text-[#2A1B12]">
                  <Coffee className="w-12 h-12 text-[#C67D3B] mb-2" />
                  <span className="font-serif-display text-lg">Artisanal Barista Craft</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#1E140F]/90 backdrop-blur-xs text-[#FAF6F0] px-4 py-3 rounded-xl border border-[#3E2C22]">
                <p className="text-xs font-medium text-[#E09F5A]">Est. 2019 · Indiranagar</p>
                <p className="text-sm font-serif-display mt-0.5">Small-Batch Roastery & Lounge</p>
              </div>
            </div>
          </div>

          {/* Story Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A5B25]">
              <span>Our Heritage</span>
              <span aria-hidden="true">·</span>
              <span>Crafted With Intention</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A1B12] tracking-tight leading-tight [text-wrap:balance]">
              Where Every Cup Tells a Story of Soil, Roast, and Craft.
            </h2>

            <p className="text-base text-[#5C493E] leading-relaxed">
              Brew Haven began with a simple belief: your daily coffee should never feel rushed or ordinary. We partner directly with third-generation family growers in Southern India to bring harvest-fresh Arabica cherries straight to our in-house roastery.
            </p>

            <p className="text-base text-[#5C493E] leading-relaxed">
              From the first morning espresso pulled at 7:00 AM to the last warm sea-salt brownie served at dusk, our café is built as a warm sanctuary where neighbors, readers, and creators feel right at home.
            </p>

            {/* Expandable Story Drawer triggered by "Discover Our Story" */}
            {storyExpanded && (
              <div className="p-5 rounded-xl bg-[#F3ECE3] border border-[#E2D6C8] space-y-3 text-sm text-[#4A3A30] transition-all">
                <h3 className="font-serif-display text-base font-semibold text-[#2A1B12]">
                  The Brew Haven Roasting Philosophy
                </h3>
                <p className="leading-relaxed">
                  Unlike commercial chains that store roasted beans for months, our cast-iron drum roaster operates every Tuesday, Thursday, and Saturday. We rest our beans for exactly 48 hours to allow natural CO₂ degassing, unlocking notes of toasted hazelnut, dark cacao, and wild honey without harsh acidity.
                </p>
                <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-[#7A5C48]">
                  <span>Elevation: 1,250m – 1,450m</span>
                  <span>·</span>
                  <span>Process: Washed & Sun-Dried</span>
                  <span>·</span>
                  <span>Water: Triple-Stage Remineralized</span>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setStoryExpanded(!storyExpanded)}
                aria-expanded={storyExpanded}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#FAF6F0] bg-[#2A1B12] hover:bg-[#3E291D] rounded-lg transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{storyExpanded ? 'Hide Roasting Details' : 'Discover Our Story'}</span>
                {storyExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#C67D3B]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#C67D3B]" />
                )}
              </button>

              <a
                href="#menu"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#2A1B12] hover:text-[#9A5B25] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Browse Handwritten Menu →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Part 2: Why Choose Us (4 Feature Cards) */}
        <div className="space-y-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5B25]">
              <span>Why Choose Us</span>
              <span aria-hidden="true">·</span>
              <span>The Brew Haven Standard</span>
            </div>
            <h2 className="mt-2 font-serif-display text-2xl sm:text-3xl font-semibold text-[#2A1B12] tracking-tight [text-wrap:balance]">
              Four Pillars Behind Every Unforgettable Pour
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-[#F3ECE3]/80 border border-[#E6DCD2] hover:bg-[#F3ECE3] hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] border border-[#E2D6C8] flex items-center justify-center text-[#9A5B25] group-hover:bg-[#2A1B12] group-hover:text-[#E09F5A] transition-colors duration-150">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-serif-display text-lg font-semibold text-[#2A1B12]">
                      0{index + 1}. {feature.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#5C493E] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
