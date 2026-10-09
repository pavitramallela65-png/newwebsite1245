import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Coffee, Check, Sparkles } from 'lucide-react';
import { MENU_ITEMS, SPECIAL_COMBO_OFFER, MenuCategory, MenuItem, CartItem } from '../data/cafeData';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onGrabComboDeal: () => void;
}

const CATEGORIES: MenuCategory[] = ['All', 'Hot Coffee', 'Cold Coffee', 'Snacks'];

export const MenuSection: React.FC<MenuSectionProps> = ({
  cart,
  onAddToCart,
  onUpdateQuantity,
  onGrabComboDeal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [comboAdded, setComboAdded] = useState(false);

  const filteredItems =
    selectedCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const getCartQuantity = (id: string): number => {
    const found = cart.find((c) => c.item.id === id);
    return found ? found.quantity : 0;
  };

  const handleAddClick = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1000);
  };

  const handleComboClick = () => {
    onGrabComboDeal();
    setComboAdded(true);
    setTimeout(() => setComboAdded(false), 1400);
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#E6DCD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5B25]">
              <span>Handcrafted Menu</span>
              <span aria-hidden="true">·</span>
              <span>Roasted In-House</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A1B12] tracking-tight [text-wrap:balance]">
              Signature Espresso, Chilled Brews & Warm Pastries
            </h2>
          </div>

          {/* Interactive Category Segmented Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter menu by category"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFE6DC] border border-[#E2D6C8] rounded-xl self-start"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#2A1B12] text-[#FAF6F0] shadow-xs'
                      : 'text-[#5C493E] hover:text-[#2A1B12] hover:bg-[#FAF6F0]/60'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {filteredItems.map((item) => {
            const quantityInCart = getCartQuantity(item.id);
            const isJustAdded = recentlyAddedId === item.id;

            return (
              <article
                key={item.id}
                className="group bg-[#FAF6F0] border border-[#E2D6C8] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-4/3 w-full bg-[#EFE6DC] overflow-hidden border-b border-[#E6DCD2]">
                    {!failedImages[item.id] ? (
                      <img
                        src={item.image}
                        alt={`${item.name} - ${item.description}`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EFE6DC]">
                        <Coffee className="w-10 h-10 text-[#9A5B25] mb-2" />
                        <span className="font-serif-display text-sm text-[#2A1B12]">
                          {item.name}
                        </span>
                      </div>
                    )}

                    {/* Subtle maximum 1 text note if featured */}
                    {item.featuredNote && (
                      <div className="absolute top-3 left-3 bg-[#1E140F]/85 backdrop-blur-xs text-[#FAF6F0] px-2.5 py-1 rounded text-[11px] font-medium tracking-wide">
                        {item.featuredNote}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-2.5">
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center justify-between text-xs text-[#7A6558]">
                      <span className="uppercase tracking-wider font-medium">
                        {item.category}
                      </span>
                      <span className="font-mono tabular-nums">{item.volumeOrWeight}</span>
                    </div>

                    {/* Title & Price Row */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif-display text-lg font-semibold text-[#2A1B12]">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-[#2A1B12] tabular-nums shrink-0">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C493E] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <p className="text-[11px] text-[#8C7365] pt-0.5 truncate" title={item.tastingNotes}>
                      {item.tastingNotes}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Add to Cart or Quantity Stepper */}
                <div className="px-5 pb-5 pt-2">
                  {quantityInCart === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleAddClick(item)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        isJustAdded
                          ? 'bg-[#2E5A36] text-[#FAF6F0]'
                          : 'bg-[#2A1B12] hover:bg-[#3E291D] text-[#FAF6F0]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#E09F5A]" aria-hidden="true" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-[#EFE6DC] border border-[#D8C8B8] rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-8 h-8 rounded-lg bg-[#FAF6F0] hover:bg-[#2A1B12] hover:text-[#FAF6F0] text-[#2A1B12] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-sm font-semibold text-[#2A1B12] tabular-nums px-2">
                        {quantityInCart} in cart
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-8 h-8 rounded-lg bg-[#2A1B12] hover:bg-[#3E291D] text-[#FAF6F0] flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Section E: Special Offers Promotional Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#1E140F] text-[#FAF6F0] border border-[#3E2C22] shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E09F5A]">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>{SPECIAL_COMBO_OFFER.subtitle}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#FAF6F0]">{SPECIAL_COMBO_OFFER.savingsText}</span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#FAF6F0] [text-wrap:balance]">
                {SPECIAL_COMBO_OFFER.title}
              </h3>

              <p className="text-sm sm:text-base text-[#D8CBC0] leading-relaxed max-w-xl">
                {SPECIAL_COMBO_OFFER.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#C8B9AC] pt-1">
                {SPECIAL_COMBO_OFFER.itemsIncluded.map((inc, i) => (
                  <React.Fragment key={inc}>
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <span>{inc}</span>
                  </React.Fragment>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-bold text-[#E09F5A] tabular-nums">
                    ₹{SPECIAL_COMBO_OFFER.comboPrice}
                  </span>
                  <span className="font-mono text-sm text-[#9E8C7E] line-through tabular-nums">
                    ₹{SPECIAL_COMBO_OFFER.originalPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleComboClick}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    comboAdded
                      ? 'bg-[#2E5A36] text-[#FAF6F0]'
                      : 'bg-[#E09F5A] hover:bg-[#EAA965] text-[#1E140F]'
                  }`}
                >
                  {comboAdded ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Combo Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                      <span>Grab the Deal</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] bg-[#2A1B12]">
              <img
                src={SPECIAL_COMBO_OFFER.image}
                alt="Warm dark chocolate sea salt brownie served alongside a fresh cup of cappuccino"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1E140F] via-[#1E140F]/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
