import React, { useState } from 'react';
import { X, CheckCircle2, Lock, MapPin, CreditCard } from 'lucide-react';
import { CartItem } from '../data/productData';
import { SafeImage } from './SafeImage';

export interface ConfirmedOrder {
  orderId: string;
  items: CartItem[];
  total: number;
  postalCode: string;
  recipientName: string;
  paymentMethod: string;
  deliveryDate: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  postalCode: string;
  defaultName: string | null;
  onOrderConfirmed: (order: ConfirmedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  postalCode,
  defaultName,
  onOrderConfirmed,
}) => {
  const [recipientName, setRecipientName] = useState(defaultName || 'Marcus Tan');
  const [phone, setPhone] = useState('+65 9123 4567');
  const [address, setAddress] = useState('12 Marina Boulevard, #18-04');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paynow' | 'cod'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order: ConfirmedOrder = {
      orderId: `SG-702-${Math.floor(1000000 + Math.random() * 9000000)}`,
      items: [...items],
      total: subtotal,
      postalCode,
      recipientName: recipientName.trim() || 'Customer',
      paymentMethod:
        paymentMethod === 'card'
          ? 'Visa ending in 4821'
          : paymentMethod === 'paynow'
          ? 'PayNow SG QR'
          : 'Cash on Delivery',
      deliveryDate: 'Friday, December 6',
    };
    setConfirmedOrder(order);
    onOrderConfirmed(order);
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Amazon.sg Checkout"
    >
      <div className="bg-white w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="px-4 py-3 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#febd69]" />
            <span className="text-sm font-bold">
              {confirmedOrder ? 'Order Confirmed' : 'Amazon.sg Checkout'}
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <CheckCircle2 className="w-6 h-6 text-green-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-green-900">
                  Order #{confirmedOrder.orderId} Confirmed — Preparing Shipment
                </h3>
                <p className="text-xs text-green-800 mt-1">
                  Arriving <strong>{confirmedOrder.deliveryDate}</strong> to Singapore{' '}
                  {confirmedOrder.postalCode}.
                </p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3.5 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Recipient</span>
                <span className="font-semibold text-gray-900">{confirmedOrder.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span className="font-semibold text-gray-900">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-700 font-bold">Order Total (GST incl.)</span>
                <span className="font-bold text-[#B12704] tabular-nums">
                  S${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-800">Items in shipment</p>
              {confirmedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs border border-gray-100 rounded p-2">
                  <SafeImage src={item.image} alt={item.title} className="w-10 h-10 object-contain shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-gray-500 tabular-nums">
                      Qty: {item.quantity} · S${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold text-sm border border-[#FCD200]"
            >
              Return to product page
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Delivery Address */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <MapPin className="w-4 h-4 text-[#007185]" />
                <span>1. Delivery Address (Singapore {postalCode})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs border border-gray-300 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-600 mb-1">
                  Street &amp; Unit Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded-md px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                <CreditCard className="w-4 h-4 text-[#007185]" />
                <span>2. Payment Method</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#007185]"
                  />
                  <span className="font-medium text-gray-800">Visa ending in 4821</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'paynow'}
                    onChange={() => setPaymentMethod('paynow')}
                    className="accent-[#007185]"
                  />
                  <span className="font-medium text-gray-800">PayNow SG Instant QR</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded border border-gray-200 cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#007185]"
                  />
                  <span className="font-medium text-gray-800">Cash on Delivery (Free Delivery Eligible)</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span>
                <span className="tabular-nums">S${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery to Singapore {postalCode}:</span>
                <span className="text-green-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#B12704] pt-1.5 border-t border-gray-200">
                <span>Order total (incl. GST):</span>
                <span className="tabular-nums">S${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-gray-900 font-semibold py-3 rounded-full shadow text-sm border border-[#F28C00] transition-colors"
            >
              Place your order
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
