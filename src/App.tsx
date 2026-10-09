/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { MENU_ITEMS, MenuItem, CartItem } from './data/cafeData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { GalleryAndReviews } from './components/GalleryAndReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

const CART_STORAGE_KEY = 'brew_haven_cart_v1';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to empty cart if localStorage is unavailable
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [comboDiscountApplied, setComboDiscountApplied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  const totalItemsCount = cart.reduce((acc, entry) => acc + entry.quantity, 0);
  const totalCartPrice = cart.reduce(
    (acc, entry) => acc + entry.item.price * entry.quantity,
    0
  );

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.item.id === id ? { ...c, quantity: c.quantity + delta } : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    setComboDiscountApplied(false);
  };

  const handleGrabComboDeal = () => {
    const cappuccino = MENU_ITEMS.find((m) => m.id === 'cappuccino');
    const brownie = MENU_ITEMS.find((m) => m.id === 'chocolate-brownie');
    if (!cappuccino || !brownie) return;

    setCart((prev) => {
      let updated = [...prev];
      const capIndex = updated.findIndex((c) => c.item.id === 'cappuccino');
      if (capIndex > -1) {
        updated[capIndex] = {
          ...updated[capIndex],
          quantity: updated[capIndex].quantity + 1,
        };
      } else {
        updated.push({ item: cappuccino, quantity: 1 });
      }

      const browIndex = updated.findIndex((c) => c.item.id === 'chocolate-brownie');
      if (browIndex > -1) {
        updated[browIndex] = {
          ...updated[browIndex],
          quantity: updated[browIndex].quantity + 1,
        };
      } else {
        updated.push({ item: brownie, quantity: 1 });
      }

      return updated;
    });

    setComboDiscountApplied(true);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2A1B12]">
      <Navbar cartCount={totalItemsCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero onOpenCart={() => setIsCartOpen(true)} />
        <AboutSection />
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onGrabComboDeal={handleGrabComboDeal}
        />
        <GalleryAndReviews />
        <ContactSection />
      </main>

      <Footer />

      {/* Floating Cart Button when items are in cart and drawer is closed */}
      {totalItemsCount > 0 && !isCartOpen && (
        <div className="fixed bottom-5 right-5 z-30">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`View cart with ${totalItemsCount} items`}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#2A1B12] hover:bg-[#3E291D] text-[#FAF6F0] shadow-xl border border-[#3E2C22] transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-[#E09F5A]" aria-hidden="true" />
            <span className="text-sm font-semibold">
              {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
            </span>
            <span aria-hidden="true" className="text-[#7A6558]">
              ·
            </span>
            <span className="font-mono text-sm font-bold text-[#E09F5A] tabular-nums">
              ₹{totalCartPrice}
            </span>
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        comboDiscountApplied={comboDiscountApplied}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
