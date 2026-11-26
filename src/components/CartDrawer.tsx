import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem } from '../data/productData';
import { SafeImage } from './SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  postalCode: string;
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  postalCode,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-4 py-3.5 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#febd69]" />
            <h2 className="text-base font-bold">
              Shopping Cart ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Callout */}
        <div className="px-4 py-2.5 bg-teal-50 border-b border-teal-100 text-xs text-teal-900 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <span>
            Your order qualifies for <strong>FREE Delivery</strong> to Singapore{' '}
            <span className="font-semibold">{postalCode}</span>. All prices include GST.
          </span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200 px-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Your Amazon.sg Cart is empty
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Add the Razer Viper V4 Pro or accessories to get started.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-semibold rounded-full border border-[#FCD200]"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-3">
                <div className="w-20 h-20 rounded border border-gray-200 bg-white p-1 shrink-0 flex items-center justify-center">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-green-700 font-medium mt-0.5">In Stock</p>
                  <p className="text-[11px] text-gray-500">Sold by {item.seller}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1 tabular-nums">
                    S${item.price.toFixed(2)}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-1.5 text-gray-700 hover:bg-gray-200 rounded-l-lg"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-1.5 text-gray-700 hover:bg-gray-200 rounded-r-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-medium">
                Subtotal ({totalCount} item{totalCount === 1 ? '' : 's'}):
              </span>
              <span className="text-lg font-bold text-gray-900 tabular-nums">
                S${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 font-semibold py-3 rounded-full shadow-sm text-sm border border-[#FCD200] transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
