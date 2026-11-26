import React from 'react';
import { X, User, Heart, Package, ChevronRight, Sparkles } from 'lucide-react';
import { CatalogItem, RELATED_CATALOG } from '../data/productData';
import { ConfirmedOrder } from './CheckoutModal';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string | null;
  wishlistItems: CatalogItem[];
  orders: ConfirmedOrder[];
  onOpenSignIn: () => void;
  onSelectCatalogItem: (item: CatalogItem) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  userName,
  wishlistItems,
  orders,
  onOpenSignIn,
  onSelectCatalogItem,
  onScrollToSection,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Amazon.sg Navigation Menu"
    >
      <div className="bg-white w-80 max-w-[85vw] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Top User Greeting */}
        <div className="bg-[#232f3e] text-white px-4 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSignIn();
            }}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">
                {userName ? `Hello, ${userName}` : 'Hello, Sign in'}
              </p>
              <p className="text-[11px] text-gray-300">Amazon.sg Account</p>
            </div>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Sections */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200 text-sm">
          {/* Quick Page Jumps */}
          <div className="p-4 space-y-2">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Current Product Sections
            </h3>
            {[
              { id: 'pricing-section', label: 'Black Friday Deal & Pricing' },
              { id: 'specs-section', label: 'Product Specifications' },
              { id: 'about-section', label: 'About this item' },
              { id: 'reviews-section', label: 'Customer Reviews (4.8 ★)' },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onClose();
                  onScrollToSection(link.id);
                }}
                className="w-full flex items-center justify-between py-2 text-xs font-medium text-gray-700 hover:text-[#007185] text-left"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Razer Official Store Catalog */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c45500]" />
              <span>Razer Official Flagship</span>
            </div>
            {RELATED_CATALOG.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectCatalogItem(item);
                  onClose();
                }}
                className="w-full py-2 text-left flex items-center justify-between gap-2 text-xs text-gray-700 hover:text-[#007185]"
              >
                <span className="truncate font-medium">{item.shortTitle}</span>
                <span className="font-bold text-gray-900 tabular-nums shrink-0">
                  S${item.price.toFixed(2)}
                </span>
              </button>
            ))}
          </div>

          {/* Wish List */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-[#CC0C39]" />
              <span>Your Wish List ({wishlistItems.length})</span>
            </div>
            {wishlistItems.length === 0 ? (
              <p className="text-xs text-gray-500">
                Tap the heart icon on any item to save it here.
              </p>
            ) : (
              wishlistItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectCatalogItem(item);
                    onClose();
                  }}
                  className="w-full py-1.5 text-left text-xs text-[#007185] hover:underline truncate block"
                >
                  {item.shortTitle} — S${item.price.toFixed(2)}
                </button>
              ))
            )}
          </div>

          {/* Recent Orders */}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 uppercase tracking-wider">
              <Package className="w-3.5 h-3.5 text-[#007185]" />
              <span>Your Orders ({orders.length})</span>
            </div>
            {orders.length === 0 ? (
              <p className="text-xs text-gray-500">No recent orders placed in this session.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-2.5 bg-gray-50 border border-gray-200 rounded text-xs space-y-0.5"
                >
                  <p className="font-bold text-gray-900">Order #{order.orderId}</p>
                  <p className="text-gray-600 tabular-nums">
                    Total: S${order.total.toFixed(2)} · {order.deliveryDate}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />
    </div>
  );
};
