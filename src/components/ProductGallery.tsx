import React from 'react';
import { Share2, Heart, ZoomIn, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GalleryItem } from '../data/productData';
import { SafeImage } from './SafeImage';

interface ProductGalleryProps {
  items: GalleryItem[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onShare: () => void;
  onOpenFullView: () => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  items,
  activeIndex,
  onChangeIndex,
  isWishlisted,
  onToggleWishlist,
  onShare,
  onOpenFullView,
}) => {
  const currentItem = items[activeIndex] || items[0];

  const handlePrev = () => {
    onChangeIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onChangeIndex((activeIndex + 1) % items.length);
  };

  return (
    <section
      className="relative bg-white pt-2 pb-4 border-b border-gray-100 lg:border-b-0 lg:sticky lg:top-16"
      data-purpose="product-gallery"
    >
      {/* Top Action Floating Buttons (Share & Wishlist) */}
      <div className="absolute right-3 top-3 z-10 flex flex-col space-y-2">
        <button
          aria-label="Share product"
          onClick={onShare}
          type="button"
          className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 active:scale-95 transition-transform focus-visible:outline-2 focus-visible:outline-[#007185]"
        >
          <Share2 className="w-4 h-4" />
        </button>
        <button
          aria-label={isWishlisted ? 'Remove from wish list' : 'Add to wish list'}
          onClick={onToggleWishlist}
          type="button"
          className={`w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[#007185] ${
            isWishlisted ? 'text-[#CC0C39] border-[#CC0C39]/30' : 'text-gray-600 hover:text-[#CC0C39]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#CC0C39]' : ''}`} />
        </button>
      </div>

      {/* Main Showcase Image Container */}
      <div className="relative group w-full flex items-center justify-center px-6 min-h-[320px] lg:min-h-[420px] bg-white rounded-lg">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous product image"
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:text-gray-900 opacity-80 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onOpenFullView}
          className="w-full flex flex-col items-center justify-center cursor-zoom-in focus:outline-none"
          aria-label="Open full view and 360 degree viewer"
        >
          <SafeImage
            src={currentItem.src}
            alt={currentItem.alt}
            fallbackLabel={currentItem.caption || currentItem.alt}
            className="max-h-[300px] lg:max-h-[390px] w-auto object-contain mx-auto transition-opacity duration-200 rounded"
          />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next product image"
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:text-gray-900 opacity-80 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Full-view click prompt */}
      <div className="text-center mt-2">
        <button
          onClick={onOpenFullView}
          className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline font-medium inline-flex items-center min-h-[32px] px-2"
          type="button"
        >
          <ZoomIn className="w-3.5 h-3.5 mr-1 text-gray-400" />
          Click to see full view &amp; 360°
        </button>
      </div>

      {/* Carousel Pagination Dots */}
      <div className="flex items-center justify-center space-x-1.5 mt-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            aria-label={`View image ${idx + 1}: ${item.label}`}
            onClick={() => onChangeIndex(idx)}
            className={`h-2 rounded-full transition-all duration-200 ${
              idx === activeIndex ? 'bg-[#007185] w-4' : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Gallery Preview Thumbnails */}
      <div className="flex items-center justify-center space-x-2 px-4 mt-3 overflow-x-auto no-scrollbar py-1">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeIndex(idx)}
              className={`relative w-13 h-13 rounded p-0.5 shrink-0 bg-white transition-all flex flex-col items-center justify-center overflow-hidden ${
                isActive
                  ? 'border-2 border-[#007185] shadow-sm'
                  : 'border border-gray-200 hover:border-gray-400'
              }`}
              aria-label={`Select ${item.label} view`}
            >
              <SafeImage
                src={item.src}
                alt={item.label}
                className="w-full h-full object-contain"
              />
              {item.isVideoSpotlight && (
                <span className="absolute bottom-0.5 right-0.5 bg-black/75 text-white rounded-full p-0.5">
                  <Play className="w-2.5 h-2.5 fill-white" />
                </span>
              )}
              <span className="sr-only">{item.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
