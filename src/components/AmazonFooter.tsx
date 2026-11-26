import React from 'react';
import { Globe } from 'lucide-react';

interface AmazonFooterProps {
  onOpenLocation: () => void;
  onShowInfo: (title: string, message: string) => void;
}

export const AmazonFooter: React.FC<AmazonFooterProps> = ({
  onOpenLocation,
  onShowInfo,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#232f3e] text-white text-xs mt-4">
      {/* Back to top trigger */}
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full block text-center py-3.5 bg-[#37475A] hover:bg-[#42546a] font-medium text-gray-200 border-b border-gray-700 active:bg-gray-600 transition-colors"
      >
        Back to top
      </button>

      {/* Footer Links Grid */}
      <div className="max-w-5xl mx-auto px-5 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 leading-relaxed">
        <div>
          <h4 className="font-bold text-white text-sm mb-2">Get to Know Us</h4>
          <ul className="space-y-1.5 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'About Amazon Singapore',
                    'Amazon.sg brings fast local Singapore delivery, GST-inclusive pricing, and flagship tech brands like Razer directly to your doorstep.'
                  )
                }
                className="hover:underline text-left"
              >
                About Amazon
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'Careers at Amazon SG',
                    'Explore engineering, operations, and retail leadership roles at our Singapore hub.'
                  )
                }
                className="hover:underline text-left"
              >
                Careers
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'Press Releases',
                    'Latest news on Singapore fulfillment, Prime Same-Day delivery, and Black Friday deals.'
                  )
                }
                className="hover:underline text-left"
              >
                Press Releases
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'Amazon Science',
                    'Research across robotics, computer vision, and supply-chain optimization.'
                  )
                }
                className="hover:underline text-left"
              >
                Amazon Science
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-2">Connect with Us</h4>
          <ul className="space-y-1.5 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo('Amazon SG on Facebook', 'Follow @AmazonSingapore for Flash Deals & new releases.')
                }
                className="hover:underline text-left"
              >
                Facebook
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo('Amazon SG on Twitter', 'Real-time updates on tech drops and delivery announcements.')
                }
                className="hover:underline text-left"
              >
                Twitter
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo('Amazon SG on Instagram', 'Curated gaming setups, desk hardware, and seasonal deals.')
                }
                className="hover:underline text-left"
              >
                Instagram
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <h4 className="font-bold text-white text-sm mb-2">Let Us Help You</h4>
          <ul className="space-y-1.5 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    '15-Day Refund & Replacement',
                    'Eligible electronics sold by Razer Official Flagship and fulfilled by Amazon SG qualify for hassle-free 15-day returns.'
                  )
                }
                className="hover:underline text-left"
              >
                Returns &amp; Replacements
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'Singapore Delivery Rates',
                    'Free local delivery to Singapore addresses on eligible orders, with transparent GST-inclusive pricing.'
                  )
                }
                className="hover:underline text-left"
              >
                Delivery Rates &amp; Policies
              </button>
            </li>
          </ul>
        </div>

        <div className="hidden lg:block">
          <h4 className="font-bold text-white text-sm mb-2">Amazon Payment</h4>
          <ul className="space-y-1.5 text-gray-300">
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'Payment Methods in Singapore',
                    'Pay securely via Visa, Mastercard, American Express, PayNow, or Amazon Gift Card.'
                  )
                }
                className="hover:underline text-left"
              >
                Shop with Points &amp; PayNow
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() =>
                  onShowInfo(
                    'GST Inclusive Pricing',
                    'All prices displayed on Amazon.sg include Singapore GST with no surprise import fees.'
                  )
                }
                className="hover:underline text-left"
              >
                GST Information
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Country / Locale Selector */}
      <div className="border-t border-gray-700 py-4 text-center">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-300">
          <button
            type="button"
            onClick={() =>
              onShowInfo('Language Preference', 'Current storefront language is English (EN-SG).')
            }
            className="flex items-center gap-1.5 px-2.5 py-1 border border-gray-600 rounded hover:border-gray-400 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-gray-600 rounded hover:border-gray-400 transition-colors"
          >
            <span aria-hidden="true">🇸🇬</span>
            <span>Singapore</span>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 px-4">
          Conditions of Use &amp; Sale &nbsp;|&nbsp; Privacy Notice &nbsp;|&nbsp; © 1996-2026,
          Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};
