import React, { useState } from 'react';
import { X, MapPin, Camera, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { SINGAPORE_LOCATIONS, ProductReview } from '../data/productData';

/* 1. Location Modal */
interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPostal: string;
  onSelectPostal: (postal: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentPostal,
  onSelectPostal,
}) => {
  const [customPostal, setCustomPostal] = useState(currentPostal);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customPostal.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setError('Please enter a valid 6-digit Singapore postal code.');
      return;
    }
    setError('');
    onSelectPostal(cleaned);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your Singapore delivery location"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Choose your location</h3>
          <button type="button" onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-xs text-gray-600">
            Delivery options and delivery speeds may vary for different Singapore districts.
          </p>

          <div className="space-y-1.5">
            {SINGAPORE_LOCATIONS.map((loc) => (
              <button
                key={loc.postal}
                type="button"
                onClick={() => {
                  onSelectPostal(loc.postal);
                  onClose();
                }}
                className={`w-full px-3 py-2 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                  currentPostal === loc.postal
                    ? 'border-[#007185] bg-teal-50/60 text-gray-900 font-semibold'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#007185]" />
                  <span>{loc.district}</span>
                </span>
                <span className="tabular-nums font-bold">{loc.postal}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleApply} className="pt-2 border-t border-gray-100 space-y-2">
            <label className="block text-xs font-semibold text-gray-800">
              Or enter a Singapore postal code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={customPostal}
                onChange={(e) => setCustomPostal(e.target.value)}
                placeholder="e.g. 049145"
                className="flex-1 text-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-semibold rounded-md border border-[#FCD200]"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-[11px] text-[#CC0C39]">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

/* 2. Sign-In Modal */
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string | null;
  onSignIn: (name: string) => void;
  onSignOut: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  userName,
  onSignIn,
  onSignOut,
}) => {
  const [nameInput, setNameInput] = useState('Marcus');
  const [emailInput, setEmailInput] = useState('marcus.tan@example.sg');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onSignIn(nameInput.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to Amazon.sg"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#131921] text-white flex items-center justify-between">
          <span className="text-sm font-bold">
            amazon<span className="text-xs text-[#febd69] font-normal">.sg</span> Account
          </span>
          <button type="button" onClick={onClose} className="p-1 text-gray-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {userName ? (
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm font-bold text-gray-900">Signed in as {userName}</p>
                <p className="text-xs text-gray-500">Amazon.sg Prime Eligible</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full py-2.5 text-xs font-semibold border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <h3 className="text-base font-bold text-gray-900">Sign in</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email or mobile phone number
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-semibold rounded-lg border border-[#FCD200]"
            >
              Continue
            </button>
            <p className="text-[11px] text-gray-500">
              By continuing, you agree to Amazon.sg&apos;s Conditions of Use and Privacy Notice.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

/* 3. Camera Visual Scan Modal */
interface CameraScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CameraScanModal: React.FC<CameraScanModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Amazon Lens Barcode & Product Scan"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-4 py-3 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#febd69]" />
            <span className="text-sm font-bold">Amazon Lens Visual Search</span>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-gray-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 text-center space-y-3">
          <div className="h-40 rounded-lg bg-neutral-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
            <div className="w-48 h-24 border-2 border-[#febd69]/80 rounded-lg flex items-center justify-center">
              <span className="text-[11px] text-[#febd69] font-medium">
                EAN / Product Match Active
              </span>
            </div>
            <p className="text-[11px] text-gray-300 mt-2">
              Matched: Razer Viper V4 Pro (RZ01-05120100)
            </p>
          </div>
          <p className="text-xs text-gray-600">
            You are currently viewing the verified Amazon.sg flagship listing for this item.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-semibold rounded-full border border-[#FCD200]"
          >
            Back to product
          </button>
        </div>
      </div>
    </div>
  );
};

/* 4. Write a Review Modal */
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAuthor: string | null;
  onSubmitReview: (review: ProductReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  defaultAuthor,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState(defaultAuthor || '');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAuthor = author.trim() || 'Verified Buyer';
    onSubmitReview({
      id: `rev-${Date.now()}`,
      author: cleanAuthor,
      initial: cleanAuthor.charAt(0).toUpperCase(),
      rating,
      title: title.trim() || 'Great wireless gaming mouse',
      date: '25 November 2026',
      location: 'Singapore',
      verified: true,
      body: body.trim(),
      helpfulCount: 0,
    });
    setTitle('');
    setBody('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Write a customer review"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Create Review</h3>
          <button type="button" onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-gray-800 mb-1.5">Overall rating</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`${star} stars`}
                  className="p-1"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Your name</label>
            <input
              type="text"
              required
              placeholder="e.g. Kenneth L."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Add a headline</label>
            <input
              type="text"
              required
              placeholder="What's most important to know?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-800 mb-1">Add a written review</label>
            <textarea
              required
              rows={3}
              placeholder="Share your experience with weight, 8K polling, and battery life..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#007185]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-semibold rounded-full border border-[#FCD200]"
          >
            Submit review
          </button>
        </form>
      </div>
    </div>
  );
};

/* 5. Generic Info Popover Modal */
interface InfoModalProps {
  info: { title: string; message: string } | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ info, onClose }) => {
  if (!info) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#007185]" />
            <h3 className="text-sm font-bold text-gray-900">{info.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <p className="text-xs text-gray-700 leading-relaxed">{info.message}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-semibold rounded-full border border-[#FCD200]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
