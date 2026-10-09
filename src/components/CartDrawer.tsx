import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { CartItem } from '../data/cafeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  comboDiscountApplied: boolean;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

interface CheckoutForm {
  customerName: string;
  phone: string;
  orderType: 'Dine-In Table Service' | 'In-Store Pickup' | 'Local Delivery';
  tableOrAddress: string;
  notes: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  comboDiscountApplied,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [form, setForm] = useState<CheckoutForm>({
    customerName: '',
    phone: '',
    orderType: 'Dine-In Table Service',
    tableOrAddress: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string>('');
  const [confirmedReceipt, setConfirmedReceipt] = useState<{
    items: CartItem[];
    total: number;
    customerName: string;
    orderType: string;
  } | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  // Check if cart has at least 1 Cappuccino and 1 Chocolate Brownie for the ₹49 combo savings
  const hasCappuccino = cart.some((c) => c.item.id === 'cappuccino' && c.quantity >= 1);
  const hasBrownie = cart.some((c) => c.item.id === 'chocolate-brownie' && c.quantity >= 1);
  const discountAmount = (comboDiscountApplied || (hasCappuccino && hasBrownie)) ? 49 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const validateCheckout = (): boolean => {
    const nextErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 2) {
      nextErrors.customerName = 'Please enter your name.';
    }
    const cleanPhone = form.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      nextErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!form.tableOrAddress.trim()) {
      nextErrors.tableOrAddress =
        form.orderType === 'Dine-In Table Service'
          ? 'Please enter your table number (e.g., Table 4).'
          : form.orderType === 'In-Store Pickup'
          ? 'Please enter preferred pickup time (e.g., In 15 mins).'
          : 'Please enter your delivery address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCompleteDemoOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckout()) return;

    const randomOrderNum = `BH-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderNumber(randomOrderNum);
    setConfirmedReceipt({
      items: [...cart],
      total: finalTotal,
      customerName: form.customerName,
      orderType: form.orderType,
    });
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('cart');
      setConfirmedReceipt(null);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart and Checkout"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={handleCloseDrawer}
    >
      <div
        className="relative w-full max-w-md bg-[#FAF6F0] text-[#2A1B12] h-full flex flex-col justify-between shadow-2xl border-l border-[#E2D6C8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E2D6C8] flex items-center justify-between bg-[#F3ECE3]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#9A5B25]" aria-hidden="true" />
            <h2 className="font-serif-display text-xl font-semibold text-[#2A1B12]">
              {step === 'cart' && 'Your Coffee Order'}
              {step === 'checkout' && 'Checkout Demo'}
              {step === 'confirmed' && 'Demo Order Summary'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close cart drawer"
            className="p-2 rounded-lg text-[#5C493E] hover:text-[#2A1B12] hover:bg-[#E6DCD2] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {step === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F3ECE3] border border-[#E2D6C8] flex items-center justify-center mx-auto text-[#9A5B25]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif-display text-lg font-semibold text-[#2A1B12]">
                      Your cup is currently empty
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E5A4F] max-w-xs mx-auto">
                      Explore our freshly roasted espresso drinks, cold brews, and warm brownies to begin your order.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="px-5 py-2.5 rounded-xl bg-[#2A1B12] text-[#FAF6F0] text-xs font-semibold hover:bg-[#3E291D] transition-colors cursor-pointer"
                  >
                    Browse Coffee Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#6E5A4F] pb-2 border-b border-[#E6DCD2]">
                    <span>{cart.reduce((acc, c) => acc + c.quantity, 0)} items selected</span>
                    <button
                      type="button"
                      onClick={onClearCart}
                      className="text-[#B93829] hover:underline font-medium cursor-pointer"
                    >
                      Clear Cart
                    </button>
                  </div>

                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#F3ECE3]/80 border border-[#E2D6C8] flex items-center justify-between gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover border border-[#D8C8B8] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif-display text-base font-semibold text-[#2A1B12] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#6E5A4F] font-mono tabular-nums">
                          ₹{item.price} × {quantity} ={' '}
                          <span className="font-semibold text-[#2A1B12]">
                            ₹{item.price * quantity}
                          </span>
                        </p>

                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-7 h-7 rounded-md bg-[#FAF6F0] border border-[#D8C8B8] flex items-center justify-center text-[#2A1B12] hover:bg-[#2A1B12] hover:text-[#FAF6F0] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-semibold tabular-nums px-1.5">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-7 h-7 rounded-md bg-[#FAF6F0] border border-[#D8C8B8] flex items-center justify-center text-[#2A1B12] hover:bg-[#2A1B12] hover:text-[#FAF6F0] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="p-2 text-[#7A6558] hover:text-[#B93829] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {discountAmount > 0 && (
                    <div className="p-3.5 rounded-xl bg-[#2E5A36]/10 border border-[#2E5A36]/30 text-xs text-[#2E5A36] flex items-center justify-between">
                      <span className="font-medium">Coffee + Brownie Combo Applied</span>
                      <span className="font-mono font-bold tabular-nums">-₹{discountAmount}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <form id="checkout-demo-form" onSubmit={handleCompleteDemoOrder} noValidate className="space-y-4">
              {/* Explicit Demo Notice Banner */}
              <div className="p-3.5 rounded-xl bg-[#EFE6DC] border border-[#D8C8B8] flex items-start gap-2.5 text-xs text-[#5C493E]">
                <Info className="w-4 h-4 text-[#9A5B25] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">
                  <strong className="text-[#2A1B12]">Interactive Checkout Demo:</strong> This form simulates placing an order at Brew Haven. No real payment or charge is processed.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => {
                    setForm({ ...form, customerName: e.target.value });
                    if (errors.customerName) setErrors({ ...errors, customerName: undefined });
                  }}
                  placeholder="e.g., Vikramaditya Rao"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3ECE3] border border-[#D8C8B8] text-sm text-[#2A1B12] focus:outline-none focus:border-[#C67D3B]"
                />
                {errors.customerName && (
                  <p className="mt-1 text-xs text-[#B93829] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.customerName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3ECE3] border border-[#D8C8B8] text-sm text-[#2A1B12] font-mono tabular-nums focus:outline-none focus:border-[#C67D3B]"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#B93829] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-1.5">
                  Service Preference
                </label>
                <select
                  value={form.orderType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      orderType: e.target.value as CheckoutForm['orderType'],
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3ECE3] border border-[#D8C8B8] text-sm text-[#2A1B12] focus:outline-none focus:border-[#C67D3B]"
                >
                  <option value="Dine-In Table Service">Dine-In Table Service</option>
                  <option value="In-Store Pickup">In-Store Express Pickup</option>
                  <option value="Local Delivery">Indiranagar Local Delivery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-1.5">
                  {form.orderType === 'Dine-In Table Service'
                    ? 'Table Number *'
                    : form.orderType === 'In-Store Pickup'
                    ? 'Pickup Window *'
                    : 'Delivery Address *'}
                </label>
                <input
                  type="text"
                  value={form.tableOrAddress}
                  onChange={(e) => {
                    setForm({ ...form, tableOrAddress: e.target.value });
                    if (errors.tableOrAddress)
                      setErrors({ ...errors, tableOrAddress: undefined });
                  }}
                  placeholder={
                    form.orderType === 'Dine-In Table Service'
                      ? 'e.g., Window Table 04'
                      : form.orderType === 'In-Store Pickup'
                      ? 'e.g., Arrive in 15 mins'
                      : 'House/Flat No, Street, Indiranagar'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3ECE3] border border-[#D8C8B8] text-sm text-[#2A1B12] focus:outline-none focus:border-[#C67D3B]"
                />
                {errors.tableOrAddress && (
                  <p className="mt-1 text-xs text-[#B93829] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.tableOrAddress}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A3A30] mb-1.5">
                  Barista Notes (Optional)
                </label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="e.g., Oat milk, extra hot, less sugar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F3ECE3] border border-[#D8C8B8] text-sm text-[#2A1B12] focus:outline-none focus:border-[#C67D3B]"
                />
              </div>

              {/* Itemized Mini Summary */}
              <div className="p-4 rounded-xl bg-[#F3ECE3] border border-[#E2D6C8] space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E5A4F]">
                  Order Summary
                </p>
                {cart.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between text-xs text-[#2A1B12]">
                    <span>
                      {quantity}× {item.name}
                    </span>
                    <span className="font-mono tabular-nums">₹{item.price * quantity}</span>
                  </div>
                ))}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-[#2E5A36] font-medium">
                    <span>Combo Savings</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#D8C8B8] flex justify-between text-sm font-bold text-[#2A1B12]">
                  <span>Total Payable (Demo)</span>
                  <span className="font-mono tabular-nums">₹{finalTotal}</span>
                </div>
              </div>
            </form>
          )}

          {step === 'confirmed' && confirmedReceipt && (
            <div className="py-6 space-y-6">
              <div className="p-5 rounded-2xl bg-[#2E5A36]/10 border border-[#2E5A36]/30 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#2E5A36] mx-auto" />
                <p className="text-xs font-mono uppercase tracking-wider text-[#2E5A36] font-semibold">
                  Demo Order Reference · {confirmedOrderNumber}
                </p>
                <h3 className="font-serif-display text-2xl font-semibold text-[#2A1B12]">
                  Demo Order Recorded!
                </h3>
                <p className="text-xs text-[#5C493E] leading-relaxed">
                  This is a demonstration checkout preview for <strong className="text-[#2A1B12]">{confirmedReceipt.customerName}</strong> ({confirmedReceipt.orderType}). No real payment or live kitchen ticket was dispatched.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3ECE3] border border-[#E2D6C8] space-y-3">
                <h4 className="font-serif-display text-base font-semibold text-[#2A1B12]">
                  Receipt Preview
                </h4>
                <div className="space-y-2 text-xs text-[#5C493E]">
                  {confirmedReceipt.items.map(({ item, quantity }) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {quantity}× {item.name}
                      </span>
                      <span className="font-mono tabular-nums">₹{item.price * quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-[#D8C8B8] flex justify-between text-sm font-bold text-[#2A1B12]">
                  <span>Demo Total</span>
                  <span className="font-mono tabular-nums">₹{confirmedReceipt.total}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-full py-3 px-4 rounded-xl bg-[#2A1B12] text-[#FAF6F0] text-sm font-semibold hover:bg-[#3E291D] transition-colors cursor-pointer"
              >
                Return to Brew Haven
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer Controls */}
        {cart.length > 0 && step !== 'confirmed' && (
          <div className="p-6 border-t border-[#E2D6C8] bg-[#F3ECE3] space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#6E5A4F]">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">₹{rawSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex items-center justify-between text-xs text-[#2E5A36]">
                  <span>Combo Deal Discount</span>
                  <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-base font-bold text-[#2A1B12] pt-1">
                <span>Total</span>
                <span className="font-mono text-lg tabular-nums">₹{finalTotal}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-5 rounded-xl bg-[#2A1B12] hover:bg-[#3E291D] text-[#FAF6F0] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Checkout (Demo)</span>
                <ArrowRight className="w-4 h-4 text-[#E09F5A]" />
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3.5 rounded-xl border border-[#D8C8B8] bg-[#FAF6F0] text-[#2A1B12] text-xs font-semibold hover:bg-[#E6DCD2] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  form="checkout-demo-form"
                  className="flex-1 py-3.5 px-5 rounded-xl bg-[#C67D3B] hover:bg-[#B06A2B] text-[#FAF6F0] text-sm font-semibold transition-colors cursor-pointer"
                >
                  Place Demo Order · ₹{finalTotal}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
