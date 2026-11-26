import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { ProductReview, RATING_DISTRIBUTION } from '../data/productData';

interface CustomerReviewsSectionProps {
  reviews: ProductReview[];
  averageRating: number;
  totalRatingsCount: number;
  onOpenWriteReview: () => void;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  reviews,
  averageRating,
  totalRatingsCount,
  onOpenWriteReview,
}) => {
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [helpfulIds, setHelpfulIds] = useState<Record<string, boolean>>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filteredReviews = selectedStarFilter
    ? reviews.filter((r) => r.rating === selectedStarFilter)
    : reviews;

  const visibleReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  const toggleHelpful = (id: string) => {
    setHelpfulIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderStars = (count: number) => (
    <span className="inline-flex items-center text-amber-500" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      <span className="text-gray-300">{'★'.repeat(5 - count)}</span>
    </span>
  );

  return (
    <section
      id="reviews-section"
      className="p-4 lg:p-6 border-b border-gray-200 bg-white"
      data-purpose="customer-reviews"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Summary & Breakdown Bars */}
        <div className="lg:col-span-4">
          <h2 className="text-base lg:text-lg font-bold text-gray-900 mb-2">Customer reviews</h2>

          {/* Average Rating Header */}
          <div className="flex items-center space-x-2 mb-1.5">
            <div className="text-amber-500 text-sm tracking-tight" aria-hidden="true">
              ★★★★★
            </div>
            <span className="text-sm font-bold text-gray-900 tabular-nums">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4 tabular-nums">
            {totalRatingsCount} global ratings
          </p>

          {/* Rating Breakdown Bars */}
          <div className="space-y-2 text-xs">
            {RATING_DISTRIBUTION.map((row) => {
              const isActive = selectedStarFilter === row.stars;
              return (
                <button
                  key={row.stars}
                  type="button"
                  onClick={() =>
                    setSelectedStarFilter(isActive ? null : row.stars)
                  }
                  className={`w-full flex items-center space-x-2 rounded px-1 py-0.5 transition-colors text-left ${
                    isActive ? 'bg-amber-50 ring-1 ring-amber-300' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="w-10 text-[#007185] hover:underline shrink-0 font-medium">
                    {row.stars} star
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-amber-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-500 tabular-nums">
                    {row.percent}%
                  </span>
                </button>
              );
            })}
          </div>

          {selectedStarFilter && (
            <div className="mt-3 flex items-center justify-between text-xs bg-gray-50 border border-gray-200 rounded px-2.5 py-1.5">
              <span className="text-gray-700">
                Showing <strong>{selectedStarFilter} star</strong> reviews
              </span>
              <button
                type="button"
                onClick={() => setSelectedStarFilter(null)}
                className="text-[#007185] hover:underline font-medium"
              >
                Clear filter
              </button>
            </div>
          )}

          {/* Review this product CTA */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-900 mb-1">Review this product</h3>
            <p className="text-xs text-gray-600 mb-3">
              Share your thoughts with other customers in Singapore
            </p>
            <button
              type="button"
              onClick={onOpenWriteReview}
              className="w-full py-2 px-4 text-xs font-medium text-gray-900 bg-white border border-[#D5D9D9] rounded-lg shadow-xs hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Write a customer review
            </button>
          </div>
        </div>

        {/* Right Column: Customer Review Feed */}
        <div className="lg:col-span-8 mt-6 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-900">
              Top reviews from Singapore
            </h3>
            <span className="text-xs text-gray-500 tabular-nums">
              {filteredReviews.length} review{filteredReviews.length === 1 ? '' : 's'}
            </span>
          </div>

          {visibleReviews.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">
                No written reviews match the {selectedStarFilter}-star filter yet.
              </p>
              <button
                type="button"
                onClick={() => setSelectedStarFilter(null)}
                className="text-xs text-[#007185] hover:underline font-semibold"
              >
                View all reviews
              </button>
            </div>
          ) : (
            <div className="space-y-5 divide-y divide-gray-100">
              {visibleReviews.map((review, index) => {
                const isHelpful = Boolean(helpfulIds[review.id]);
                const displayHelpful = review.helpfulCount + (isHelpful ? 1 : 0);

                return (
                  <article
                    key={review.id}
                    className={index > 0 ? 'pt-5' : ''}
                  >
                    <div className="flex items-center space-x-2 mb-1.5">
                      <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600 text-xs shrink-0">
                        {review.initial}
                      </div>
                      <span className="text-xs font-semibold text-gray-800">
                        {review.author}
                      </span>
                    </div>

                    <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs mb-1">
                      {renderStars(review.rating)}
                      <span className="font-bold text-gray-900">{review.title}</span>
                    </div>

                    <p className="text-[11px] text-gray-500 mb-1">
                      Reviewed in {review.location} on {review.date}
                    </p>

                    {review.verified && (
                      <span className="text-[11px] font-semibold text-[#c45500] block">
                        Verified Purchase
                      </span>
                    )}

                    <p className="text-xs text-gray-700 mt-1.5 leading-relaxed">
                      {review.body}
                    </p>

                    <div className="mt-2.5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleHelpful(review.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                          isHelpful
                            ? 'bg-teal-50 border-[#007185] text-[#007185]'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{isHelpful ? 'Helpful ✓' : 'Helpful'}</span>
                      </button>
                      <span className="text-[11px] text-gray-500 tabular-nums">
                        {displayHelpful} {displayHelpful === 1 ? 'person' : 'people'} found this helpful
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {filteredReviews.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAllReviews((prev) => !prev)}
              className="mt-5 text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
            >
              {showAllReviews
                ? 'Show fewer reviews'
                : `See all ${filteredReviews.length} Singapore reviews ›`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
