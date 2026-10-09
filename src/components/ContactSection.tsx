import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    topic: 'Table Reservation / Group Visit',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormState> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      topic: 'Table Reservation / Group Visit',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F3ECE3] border-b border-[#E6DCD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9A5B25]">
            <span>Visit or Write to Us</span>
            <span aria-hidden="true">·</span>
            <span>Indiranagar Sanctuary</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#2A1B12] tracking-tight [text-wrap:balance]">
            Drop By for a Fresh Pour or Send Us a Note
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Café Details & Interactive Map Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-[#FAF6F0] border border-[#E2D6C8] space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE3] border border-[#E2D6C8] flex items-center justify-center text-[#9A5B25] shrink-0">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-semibold text-[#2A1B12]">
                    Café Address
                  </h3>
                  <p className="text-sm text-[#5C493E] mt-1 leading-relaxed">
                    428, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE3] border border-[#E2D6C8] flex items-center justify-center text-[#9A5B25] shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-semibold text-[#2A1B12]">
                    Opening Hours
                  </h3>
                  <p className="text-sm text-[#5C493E] mt-1">
                    Monday – Friday: <span className="font-mono tabular-nums">7:00 AM – 10:00 PM</span>
                  </p>
                  <p className="text-sm text-[#5C493E]">
                    Saturday – Sunday: <span className="font-mono tabular-nums">7:30 AM – 11:00 PM</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE3] border border-[#E2D6C8] flex items-center justify-center text-[#9A5B25] shrink-0">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-semibold text-[#2A1B12]">
                    Direct Line & WhatsApp Orders
                  </h3>
                  <p className="text-sm font-mono tabular-nums text-[#5C493E] mt-1">
                    +91 80 4123 8940 · +91 98450 67210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F3ECE3] border border-[#E2D6C8] flex items-center justify-center text-[#9A5B25] shrink-0">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-semibold text-[#2A1B12]">
                    Email Concierge
                  </h3>
                  <p className="text-sm text-[#5C493E] mt-1">hello@brewhaven.coffee</p>
                </div>
              </div>
            </div>

            {/* Architectural Neighborhood Map Placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#E2D6C8] bg-[#2A1B12] text-[#FAF6F0] p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#E09F5A] font-semibold">
                    Neighborhood Map
                  </span>
                  <h4 className="font-serif-display text-lg">12th Main · Indiranagar</h4>
                </div>
                <span className="text-xs font-mono tabular-nums text-[#D8CBC0]">
                  12.9716° N, 77.6412° E
                </span>
              </div>

              {/* Stylized SVG street map illustration */}
              <div className="relative h-44 rounded-xl bg-[#1E140F] border border-[#3E2C22] overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 400 180"
                  className="w-full h-full opacity-45"
                  aria-hidden="true"
                >
                  <line x1="0" y1="45" x2="400" y2="45" stroke="#5C4435" strokeWidth="2" />
                  <line x1="0" y1="95" x2="400" y2="95" stroke="#8C6239" strokeWidth="4" />
                  <line x1="0" y1="145" x2="400" y2="145" stroke="#5C4435" strokeWidth="2" />
                  <line x1="85" y1="0" x2="85" y2="180" stroke="#5C4435" strokeWidth="2" />
                  <line x1="210" y1="0" x2="210" y2="180" stroke="#8C6239" strokeWidth="5" />
                  <line x1="320" y1="0" x2="320" y2="180" stroke="#5C4435" strokeWidth="2" />
                  <rect x="95" y="55" width="105" height="32" rx="4" fill="#2A1B12" />
                  <rect x="220" y="103" width="90" height="34" rx="4" fill="#2A1B12" />
                </svg>

                <div className="absolute flex flex-col items-center">
                  <div className="px-3 py-1.5 rounded-lg bg-[#E09F5A] text-[#1E140F] text-xs font-bold shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Brew Haven Roastery</span>
                  </div>
                  <span className="text-[11px] text-[#D8CBC0] mt-1.5 bg-[#1E140F]/90 px-2 py-0.5 rounded">
                    2 mins from Indiranagar Metro · Valet Parking Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF6F0] border border-[#E2D6C8] shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#2E5A36]/15 text-[#2E5A36] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif-display text-2xl font-semibold text-[#2A1B12]">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-sm text-[#5C493E] max-w-md mx-auto leading-relaxed">
                    We have received your message regarding <span className="font-medium text-[#2A1B12]">{formData.topic}</span>. Our café manager will reply to <span className="font-mono text-xs">{formData.email}</span> within a few hours.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-lg bg-[#2A1B12] text-[#FAF6F0] text-xs font-semibold hover:bg-[#3E291D] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#2A1B12]">
                      Send a Message or Reserve a Table
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5A4F] mt-1">
                      Planning a coffee tasting, book club meetup, or have feedback on your brew? Let us know below.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g., Ananya Sharma"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F3ECE3]/70 border text-sm text-[#2A1B12] placeholder-[#9E8C7E] focus:outline-none focus:bg-[#FAF6F0] transition-colors ${
                          errors.name
                            ? 'border-[#B93829] focus:border-[#B93829]'
                            : 'border-[#D8C8B8] focus:border-[#C67D3B]'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-[#B93829] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="ananya@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#F3ECE3]/70 border text-sm text-[#2A1B12] placeholder-[#9E8C7E] focus:outline-none focus:bg-[#FAF6F0] transition-colors ${
                          errors.email
                            ? 'border-[#B93829] focus:border-[#B93829]'
                            : 'border-[#D8C8B8] focus:border-[#C67D3B]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-[#B93829] flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-2"
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="contact-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F3ECE3]/70 border border-[#D8C8B8] text-sm text-[#2A1B12] focus:outline-none focus:border-[#C67D3B] focus:bg-[#FAF6F0] transition-colors"
                    >
                      <option value="Table Reservation / Group Visit">Table Reservation / Group Visit</option>
                      <option value="Whole Bean Wholesale Inquiry">Whole Bean Wholesale Inquiry</option>
                      <option value="Private Coffee Tasting Workshop">Private Coffee Tasting Workshop</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Tell us your preferred date, time, or question..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#F3ECE3]/70 border text-sm text-[#2A1B12] placeholder-[#9E8C7E] focus:outline-none focus:bg-[#FAF6F0] transition-colors ${
                        errors.message
                          ? 'border-[#B93829] focus:border-[#B93829]'
                          : 'border-[#D8C8B8] focus:border-[#C67D3B]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-[#B93829] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#2A1B12] hover:bg-[#3E291D] text-[#FAF6F0] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Send className="w-4 h-4 text-[#E09F5A]" aria-hidden="true" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
