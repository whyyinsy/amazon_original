import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  ChevronRight,
  ShoppingCart,
  Camera,
  Search,
  MapPin,
  ChevronDown,
  X,
} from 'lucide-react';
import { CatalogItem, RELATED_CATALOG } from '../data/productData';
import { SafeImage } from './SafeImage';

interface AmazonHeaderProps {
  cartCount: number;
  postalCode: string;
  userName: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMenu: () => void;
  onOpenSignIn: () => void;
  onOpenCart: () => void;
  onOpenLocation: () => void;
  onOpenCameraScan: () => void;
  onSelectCatalogItem: (item: CatalogItem) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const AmazonHeader: React.FC<AmazonHeaderProps> = ({
  cartCount,
  postalCode,
  userName,
  searchQuery,
  onSearchChange,
  onOpenMenu,
  onOpenSignIn,
  onOpenCart,
  onOpenLocation,
  onOpenCameraScan,
  onSelectCatalogItem,
  onScrollToSection,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const normalized = searchQuery.trim().toLowerCase();
  const filteredResults = normalized
    ? RELATED_CATALOG.filter(
        (item) =>
          item.title.toLowerCase().includes(normalized) ||
          item.category.toLowerCase().includes(normalized) ||
          item.brand.toLowerCase().includes(normalized)
      )
    : RELATED_CATALOG;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(true);
  };

  return (
    <>
      {/* Sticky Top Navigation Row (compact ~50px on mobile to honor <=15% sticky height cap) */}
      <header className="bg-[#131921] text-white sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-3 lg:px-6 py-2 lg:py-2.5 gap-3 lg:gap-6">
          {/* Left: Hamburger + Brand */}
          <div className="flex items-center space-x-2.5 lg:space-x-3 shrink-0">
            <button
              aria-label="Open Navigation Menu"
              onClick={onOpenMenu}
              className="p-1.5 -ml-1 min-w-[40px] min-h-[40px] flex items-center justify-center rounded hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#febd69] text-white transition-colors"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-baseline whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#febd69] rounded px-1"
            >
              <span className="text-xl font-bold tracking-tight text-white">amazon</span>
              <span className="text-xs text-[#febd69] font-normal lowercase ml-0.5">.sg</span>
            </a>
          </div>

          {/* Desktop Location Trigger */}
          <button
            type="button"
            onClick={onOpenLocation}
            className="hidden lg:flex items-center gap-1.5 text-left px-2 py-1.5 rounded hover:bg-white/10 transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#febd69]"
          >
            <MapPin className="w-4 h-4 text-white shrink-0 mt-1" />
            <div className="leading-tight">
              <div className="text-[11px] text-gray-300">Deliver to</div>
              <div className="text-xs font-bold text-white whitespace-nowrap">
                Singapore {postalCode}
              </div>
            </div>
          </button>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-2xl relative" ref={searchWrapperRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center bg-white rounded-md shadow-sm overflow-hidden h-10 border border-gray-300 focus-within:ring-2 focus-within:ring-[#febd69]"
            >
              <input
                aria-label="Search Amazon.sg"
                className="w-full pl-3.5 pr-24 py-2 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none placeholder-gray-500 bg-transparent"
                placeholder="Search Amazon.sg"
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setSearchFocused(true);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => onSearchChange('')}
                  className="absolute right-20 p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="absolute right-0 flex items-center h-full space-x-1 pr-1.5">
                <button
                  aria-label="Scan item"
                  onClick={onOpenCameraScan}
                  className="text-gray-500 hover:text-gray-800 p-1.5 rounded"
                  type="button"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <button
                  aria-label="Submit search"
                  className="bg-[#febd69] hover:bg-[#f3a847] px-3 py-2 rounded-sm text-gray-900 transition-colors"
                  type="submit"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>

            {searchFocused && (
              <div className="absolute left-0 right-0 top-11 bg-white text-gray-900 rounded-md shadow-xl border border-gray-200 z-50 overflow-hidden">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {filteredResults.length} result{filteredResults.length === 1 ? '' : 's'} in
                    Amazon.sg Electronics
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchFocused(false)}
                    className="text-[#007185] hover:underline font-medium"
                  >
                    Close
                  </button>
                </div>
                <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectCatalogItem(item);
                            setSearchFocused(false);
                          }}
                          className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 text-left transition-colors"
                        >
                          <SafeImage
                            src={item.image}
                            alt={item.shortTitle}
                            className="w-10 h-10 object-contain shrink-0 rounded bg-white border border-gray-100"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {item.shortTitle}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.category} · ★ {item.rating.toFixed(1)} ({item.reviewCount})
                            </p>
                          </div>
                          <span className="text-sm font-bold text-gray-900 tabular-nums shrink-0">
                            S${item.price.toFixed(2)}
                          </span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-4 text-xs text-gray-500 text-center">
                      No matching items found. Try searching for &ldquo;Razer&rdquo; or &ldquo;Viper&rdquo;.
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Right User Actions: Sign In & Cart */}
          <div className="flex items-center space-x-3 lg:space-x-5 shrink-0">
            <button
              type="button"
              onClick={onOpenSignIn}
              className="text-xs font-medium text-white flex items-center min-h-[40px] px-1.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#febd69]"
            >
              <span>{userName ? `Hi, ${userName}` : 'Sign in'}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5 text-gray-400" />
            </button>
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative p-1.5 min-w-[44px] min-h-[40px] flex items-center justify-center text-white rounded hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#febd69]"
            >
              <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.8} />
              <span className="absolute top-0.5 right-0.5 bg-[#f08804] text-black font-bold text-[11px] rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center leading-none tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar + Location Bar (non-sticky so mobile scrollable area remains >= 85%) */}
      <div className="bg-[#131921] text-white lg:hidden">
        <div className="px-3 pb-2.5 pt-0.5 relative">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white rounded-md shadow-sm overflow-hidden h-10 border border-gray-300"
          >
            <input
              aria-label="Search Amazon.sg"
              className="w-full pl-3 pr-20 py-2 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none placeholder-gray-500 bg-transparent"
              placeholder="Search Amazon.sg"
              type="text"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setSearchFocused(true);
              }}
            />
            <div className="absolute right-0 flex items-center h-full space-x-1.5 pr-1.5">
              <button
                aria-label="Scan item"
                onClick={onOpenCameraScan}
                className="text-gray-500 hover:text-gray-700 p-1.5"
                type="button"
              >
                <Camera className="w-5 h-5" strokeWidth={1.8} />
              </button>
              <button
                aria-label="Submit search"
                className="bg-[#febd69] hover:bg-[#f3a847] p-2 rounded-sm text-gray-800"
                type="submit"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {searchFocused && (
            <div className="absolute left-3 right-3 top-11 bg-white text-gray-900 rounded-md shadow-xl border border-gray-200 z-40 overflow-hidden">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Quick Catalog Matches</span>
                <button
                  type="button"
                  onClick={() => setSearchFocused(false)}
                  className="text-[#007185] font-semibold"
                >
                  Done
                </button>
              </div>
              <ul className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                {filteredResults.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCatalogItem(item);
                        setSearchFocused(false);
                      }}
                      className="w-full px-3 py-2.5 flex items-center gap-3 active:bg-gray-100 text-left"
                    >
                      <SafeImage
                        src={item.image}
                        alt={item.shortTitle}
                        className="w-9 h-9 object-contain shrink-0 rounded bg-white"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {item.shortTitle}
                        </p>
                        <p className="text-[11px] text-gray-500 tabular-nums">
                          S${item.price.toFixed(2)} · ★ {item.rating.toFixed(1)}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Location Selector Bar (Mobile) */}
        <button
          type="button"
          onClick={onOpenLocation}
          className="w-full bg-[#232f3e] px-3 py-2 flex items-center text-xs text-white text-left hover:bg-[#2c3b4d] transition-colors"
        >
          <MapPin className="w-4 h-4 mr-2 text-white shrink-0" />
          <span className="truncate">Deliver to Singapore - {postalCode}</span>
          <ChevronDown className="w-3.5 h-3.5 ml-1 text-gray-300 shrink-0" />
        </button>
      </div>

      {/* Desktop Sub-Nav Strip */}
      <div className="hidden lg:block bg-[#232f3e] text-white text-xs">
        <div className="max-w-[1440px] mx-auto px-6 py-2 flex items-center justify-between">
          <nav className="flex items-center gap-6" aria-label="Primary categories">
            <button
              type="button"
              onClick={onOpenMenu}
              className="font-semibold hover:underline flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              All Categories
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('pricing-section')}
              className="hover:underline whitespace-nowrap shrink-0"
            >
              Black Friday Deals
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('specs-section')}
              className="hover:underline whitespace-nowrap shrink-0"
            >
              Specifications
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('about-section')}
              className="hover:underline whitespace-nowrap shrink-0"
            >
              About Viper V4 Pro
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('reviews-section')}
              className="hover:underline whitespace-nowrap shrink-0"
            >
              Customer Reviews
            </button>
          </nav>
          <span className="text-gray-300 whitespace-nowrap shrink-0">
            Free Delivery to Singapore on eligible orders
          </span>
        </div>
      </div>
    </>
  );
};
