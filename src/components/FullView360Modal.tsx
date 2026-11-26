import React, { useState, useRef } from 'react';
import { X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { GalleryItem } from '../data/productData';
import { SafeImage } from './SafeImage';

interface FullView360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
}

export const FullView360Modal: React.FC<FullView360ModalProps> = ({
  isOpen,
  onClose,
  items,
  activeIndex,
  onChangeIndex,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const [mode, setMode] = useState<'gallery' | '360'>('gallery');
  const [rotationAngle, setRotationAngle] = useState(0);
  const dragStartX = useRef<number | null>(null);

  if (!isOpen) return null;

  const currentItem = items[activeIndex] || items[0];

  const handlePointerDown = (e: React.PointerEvent) => {
    if (mode !== '360') return;
    dragStartX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (mode !== '360' || dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) >= 25) {
      const step = delta > 0 ? 1 : -1;
      const nextIdx = (activeIndex + step + items.length) % items.length;
      onChangeIndex(nextIdx);
      setRotationAngle((prev) => prev + (delta > 0 ? 45 : -45));
      dragStartX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    dragStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Product full view and 360 degree viewer"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('gallery')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                mode === 'gallery'
                  ? 'bg-[#131921] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Images
            </button>
            <button
              type="button"
              onClick={() => setMode('360')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-colors ${
                mode === '360'
                  ? 'bg-[#131921] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              360° Spin View
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close full view"
              className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image Stage */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`relative flex-1 min-h-[320px] sm:min-h-[420px] bg-white flex flex-col items-center justify-center p-6 select-none overflow-hidden ${
            mode === '360' ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          <div
            className="transition-transform duration-200 flex items-center justify-center"
            style={{
              transform: `scale(${zoomed ? 1.45 : 1})`,
            }}
          >
            <SafeImage
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-h-[320px] sm:max-h-[380px] w-auto object-contain pointer-events-none"
            />
          </div>

          {mode === '360' && (
            <div className="mt-4 flex items-center gap-3 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
              <RotateCw className="w-3.5 h-3.5 text-[#007185]" />
              <span>Drag horizontally or scrub slider to rotate ({((rotationAngle % 360) + 360) % 360}°)</span>
            </div>
          )}

          {mode === '360' && (
            <div className="w-64 mt-3">
              <input
                type="range"
                aria-label="Rotate product angle"
                min={0}
                max={items.length - 1}
                value={activeIndex}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  onChangeIndex(idx);
                  setRotationAngle(idx * 72);
                }}
                className="w-full accent-[#007185]"
              />
            </div>
          )}
        </div>

        {/* Caption & Thumbnails */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-700 text-center mb-2.5">
            {currentItem.caption || currentItem.alt}
          </p>
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeIndex(idx)}
                className={`w-12 h-12 rounded p-0.5 bg-white shrink-0 ${
                  idx === activeIndex
                    ? 'border-2 border-[#007185]'
                    : 'border border-gray-200 hover:border-gray-400'
                }`}
              >
                <SafeImage src={item.src} alt={item.label} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
