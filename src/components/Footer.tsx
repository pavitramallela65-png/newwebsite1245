import React from 'react';
import { Coffee, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E140F] text-[#D8CBC0] border-t border-[#38271E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#38271E]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#home"
              className="inline-flex items-center gap-2.5 text-[#FAF6F0] font-serif-display text-2xl font-semibold tracking-tight"
            >
              <Coffee className="w-6 h-6 text-[#E09F5A]" aria-hidden="true" />
              <span>Brew Haven</span>
            </a>
            <p className="text-sm text-[#E09F5A] font-serif-display italic">
              “Your Daily Dose of Happiness.”
            </p>
            <p className="text-sm text-[#B8A698] max-w-sm leading-relaxed">
              Specialty small-batch coffee roastery and neighborhood lounge serving 100% single-origin Indian Arabica, hand-poured espresso, and artisanal bakes.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FAF6F0]">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-[#E09F5A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E09F5A] transition-colors">
                  Our Story & Craft
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#E09F5A] transition-colors">
                  Coffee & Pastry Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E09F5A] transition-colors">
                  Café Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#E09F5A] transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E09F5A] transition-colors">
                  Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social Details */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FAF6F0]">
              Visit Brew Haven
            </h3>
            <div className="space-y-2.5 text-sm text-[#B8A698]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E09F5A] shrink-0 mt-1" aria-hidden="true" />
                <span>428, 12th Main Road, Indiranagar, Bengaluru 560038</span>
              </p>
              <p className="flex items-center gap-2.5 font-mono tabular-nums">
                <Phone className="w-4 h-4 text-[#E09F5A] shrink-0" aria-hidden="true" />
                <span>+91 80 4123 8940</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E09F5A] shrink-0" aria-hidden="true" />
                <span>hello@brewhaven.coffee</span>
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-3 flex items-center gap-4 text-xs font-medium text-[#D8CBC0]">
              <a
                href="#contact"
                aria-label="Brew Haven on Instagram"
                className="hover:text-[#E09F5A] transition-colors underline underline-offset-4"
              >
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#contact"
                aria-label="Brew Haven on Facebook"
                className="hover:text-[#E09F5A] transition-colors underline underline-offset-4"
              >
                Facebook
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#contact"
                aria-label="Brew Haven on X"
                className="hover:text-[#E09F5A] transition-colors underline underline-offset-4"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E8C7E]">
          <p>© {new Date().getFullYear()} Brew Haven Roastery & Café. All rights reserved.</p>
          <p>Freshly roasted in Bengaluru · Crafted for coffee lovers.</p>
        </div>
      </div>
    </footer>
  );
};
