import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E6DCD2] shadow-xs'
          : 'bg-[#FAF6F0] border-b border-[#E6DCD2]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#2A1B12] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C67D3B] rounded-md"
        >
          <Coffee className="w-6 h-6 text-[#C67D3B] shrink-0" aria-hidden="true" />
          <span className="font-serif-display text-2xl font-semibold tracking-tight">Brew Haven</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C493E]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#2A1B12] relative py-1 transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C67D3B] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open order cart with ${cartCount} items`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#FAF6F0] bg-[#2A1B12] hover:bg-[#3E291D] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#C67D3B]" aria-hidden="true" />
            <span>Order Now</span>
            <span className="ml-0.5 px-1.5 py-0.5 text-xs font-mono tabular-nums bg-[#C67D3B] text-[#FAF6F0] rounded">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2.5 text-[#2A1B12] hover:bg-[#F3ECE3] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#E6DCD2] px-4 pt-3 pb-6 space-y-2">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 text-base font-medium text-[#2A1B12] hover:bg-[#F3ECE3] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E6DCD2] flex items-center justify-between text-xs text-[#6E5A4F] px-3">
            <span>Open Daily: 7:00 AM – 10:00 PM</span>
            <span>Indiranagar, Bengaluru</span>
          </div>
        </div>
      )}
    </header>
  );
};
