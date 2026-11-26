import React, { useState, useMemo } from 'react';
import { MapPin, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';
import {
  MAIN_PRODUCT_GALLERY,
  PRODUCT_SPECS,
  ABOUT_BULLETS,
  INITIAL_REVIEWS,
  INITIAL_CART_ITEMS,
  RELATED_CATALOG,
  CartItem,
  CatalogItem,
  ProductReview,
} from './data/productData';
import { AmazonHeader } from './components/AmazonHeader';
import { ProductGallery } from './components/ProductGallery';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { AmazonFooter } from './components/AmazonFooter';
import { FullView360Modal } from './components/FullView360Modal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal, ConfirmedOrder } from './components/CheckoutModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import {
  LocationModal,
  SignInModal,
  CameraScanModal,
  ReviewModal,
  InfoModal,
} from './components/ActionModals';
import { SafeImage } from './components/SafeImage';

export default function App() {
  // Active product (defaults faithfully to Razer Viper V4 Pro from Stitch design)
  const [activeProduct, setActiveProduct] = useState<CatalogItem>(RELATED_CATALOG[0]);
  const isViperDefault = activeProduct.id === 'viper-v4-pro';

  // Gallery state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [fullViewOpen, setFullViewOpen] = useState(false);

  // Cart & Purchase state
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [quantity, setQuantity] = useState(1);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [checkoutIsBuyNow, setCheckoutIsBuyNow] = useState(false);

  // User, Location, Search, Wishlist, Orders, Reviews
  const [postalCode, setPostalCode] = useState('049145');
  const [userName, setUserName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('Razer Viper V4 Pro');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<ConfirmedOrder[]>([]);
  const [reviews, setReviews] = useState<ProductReview[]>(INITIAL_REVIEWS);

  // Drawers & Modals
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; message: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const galleryItems = useMemo(() => {
    if (isViperDefault) return MAIN_PRODUCT_GALLERY;
    return [
      {
        id: activeProduct.id,
        label: 'Main',
        alt: activeProduct.title,
        src: activeProduct.image,
        caption: activeProduct.shortTitle,
      },
    ];
  }, [activeProduct, isViperDefault]);

  const isWishlisted = wishlistIds.includes(activeProduct.id);
  const wishlistCatalogItems = useMemo(
    () => RELATED_CATALOG.filter((item) => wishlistIds.includes(item.id)),
    [wishlistIds]
  );

  const priceDollars = Math.floor(activeProduct.price);
  const priceCents = (activeProduct.price % 1).toFixed(2).substring(2);
  const discountPct = Math.round(
    ((activeProduct.typicalPrice - activeProduct.price) / activeProduct.typicalPrice) * 100
  );

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCatalogItem = (item: CatalogItem) => {
    setActiveProduct(item);
    setActiveGalleryIndex(0);
    setQuantity(1);
    setSearchQuery(item.shortTitle);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = () => {
    setWishlistIds((prev) => {
      const exists = prev.includes(activeProduct.id);
      const next = exists
        ? prev.filter((id) => id !== activeProduct.id)
        : [...prev, activeProduct.id];
      showToast(exists ? 'Removed from Wish List' : 'Added to your Wish List');
      return next;
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: activeProduct.shortTitle,
          text: `Check out ${activeProduct.shortTitle} on Amazon.sg`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Product link copied to clipboard');
    } catch {
      showToast('Ready to share: Amazon.sg — Razer Viper V4 Pro');
    }
  };

  const handleAddToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === activeProduct.id);
      if (existing) {
        return prev.map((i) =>
          i.id === activeProduct.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: activeProduct.id,
          title: activeProduct.title,
          price: activeProduct.price,
          quantity,
          image: activeProduct.image,
          seller: 'Razer Official Flagship',
          inStock: activeProduct.inStock,
        },
      ];
    });
    showToast(`Added ${quantity} × ${activeProduct.shortTitle} to Cart`);
    setCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    setCheckoutItems([
      {
        id: activeProduct.id,
        title: activeProduct.title,
        price: activeProduct.price,
        quantity,
        image: activeProduct.image,
        seller: 'Razer Official Flagship',
        inStock: activeProduct.inStock,
      },
    ]);
    setCheckoutIsBuyNow(true);
    setCheckoutOpen(true);
  };

  const handleProceedToCartCheckout = () => {
    setCheckoutItems(cartItems);
    setCheckoutIsBuyNow(false);
    setCartDrawerOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderConfirmed = (order: ConfirmedOrder) => {
    setOrders((prev) => [order, ...prev]);
    if (!checkoutIsBuyNow) {
      setCartItems([]);
    }
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddReview = (newReview: ProductReview) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your review has been posted.');
  };

  const totalRatingsCount = 242 + (reviews.length - INITIAL_REVIEWS.length);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#EAEDED] text-neutral-900">
      {/* Header */}
      <AmazonHeader
        cartCount={cartCount}
        postalCode={postalCode}
        userName={userName}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenMenu={() => setMenuDrawerOpen(true)}
        onOpenSignIn={() => setSignInModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenLocation={() => setLocationModalOpen(true)}
        onOpenCameraScan={() => setCameraModalOpen(true)}
        onSelectCatalogItem={handleSelectCatalogItem}
        onScrollToSection={scrollToSection}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="bg-white border-b border-gray-200"
      >
        <div className="max-w-[1440px] mx-auto px-3 lg:px-6 py-2 text-xs text-[#007185] flex items-center space-x-1 overflow-x-auto no-scrollbar whitespace-nowrap">
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="hover:underline"
          >
            Electronics
          </button>
          <span className="text-gray-400">›</span>
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="hover:underline"
          >
            Computers &amp; Accessories
          </button>
          <span className="text-gray-400">›</span>
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="hover:underline"
          >
            Computer Accessories
          </button>
          <span className="text-gray-400">›</span>
          <button
            type="button"
            onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
            className="text-gray-600 font-medium hover:underline"
          >
            {activeProduct.category}
          </button>
          {!isViperDefault && (
            <>
              <span className="text-gray-400">›</span>
              <button
                type="button"
                onClick={() => handleSelectCatalogItem(RELATED_CATALOG[0])}
                className="text-[#C7511F] font-semibold hover:underline ml-2"
              >
                ← Back to Razer Viper V4 Pro
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="flex-1 bg-white max-w-[1440px] w-full mx-auto">
        {/* Product Top Split Grid (Single-column Stitch mobile order on <lg; 3-col Amazon PDP on >=lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6 lg:px-6 lg:py-5 lg:items-start border-b border-gray-200">
          {/* BLOCK A: Brand and Title Section */}
          <section
            className="p-3 pb-1 lg:p-0 lg:col-start-6 lg:col-span-4 lg:row-start-1"
            data-purpose="product-meta"
          >
            <div className="flex items-center justify-between mb-1">
              <button
                type="button"
                onClick={() =>
                  setInfoModal({
                    title: 'Razer Official Flagship Store',
                    message:
                      'Shop authentic Razer esports peripherals fulfilled by Amazon SG with local warranty support.',
                  })
                }
                className="text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
              >
                Visit the {activeProduct.brand} Store
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('reviews-section')}
                className="flex items-center space-x-1 hover:opacity-80"
              >
                <span className="text-amber-500 text-xs" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="text-xs text-[#007185] ml-1 font-medium tabular-nums">
                  {activeProduct.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500 tabular-nums">
                  ({isViperDefault ? totalRatingsCount : activeProduct.reviewCount})
                </span>
              </button>
            </div>

            <h1 className="text-sm lg:text-xl font-semibold text-gray-900 leading-snug tracking-tight">
              {activeProduct.title}
            </h1>

            {/* Best Seller Tag */}
            <div className="mt-2.5 flex items-center flex-wrap gap-2 pb-2 lg:pb-3 lg:border-b lg:border-gray-200">
              <div className="inline-flex items-center text-[11px] font-bold">
                <span className="amazon-badge-orange px-2 py-0.5 pr-3 uppercase">
                  #1 Best Seller
                </span>
                <span className="ml-1.5 text-xs text-[#007185] font-medium">
                  in Computer {activeProduct.category}
                </span>
              </div>
              <span className="text-xs text-gray-500">500+ bought in past month</span>
            </div>
          </section>

          {/* BLOCK B: Main Product Gallery */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1 lg:row-span-3">
            <ProductGallery
              items={galleryItems}
              activeIndex={activeGalleryIndex}
              onChangeIndex={setActiveGalleryIndex}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleToggleWishlist}
              onShare={handleShare}
              onOpenFullView={() => setFullViewOpen(true)}
            />
          </div>

          {/* BLOCK C: Price and Deals Section */}
          <section
            id="pricing-section"
            className="p-4 lg:px-0 lg:py-3 border-b border-gray-200"
            data-purpose="pricing-block"
          >
            {/* Black Friday Deal Tag */}
            <div className="mb-2">
              <span className="inline-block bg-[#CC0C39] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                Black Friday Deal
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="flex items-baseline space-x-2">
              <span className="text-[#CC0C39] text-2xl font-light leading-none tabular-nums">
                -{discountPct}%
              </span>
              <div className="flex items-start tabular-nums">
                <span className="text-sm font-semibold mt-0.5">S$</span>
                <span className="text-3xl font-bold tracking-tight text-gray-900 leading-none">
                  {priceDollars}
                </span>
                <span className="text-sm font-semibold mt-0.5">{priceCents}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-1 tabular-nums">
              Typical price:{' '}
              <span className="line-through">S${activeProduct.typicalPrice.toFixed(2)}</span>
            </div>

            {/* Taxes and import notice */}
            <div className="text-xs text-gray-700 mt-2 space-y-0.5">
              <p className="font-semibold text-gray-800">All prices include GST.</p>
              <p className="text-gray-600">
                No Import Fees Deposit &amp; Free Delivery to Singapore on eligible orders.
              </p>
            </div>
          </section>

          {/* BLOCK D: Buy Box (Delivery & Stock + Purchase Actions + Brand Reputation) */}
          <div className="lg:col-start-10 lg:col-span-3 lg:row-start-1 lg:row-span-3 lg:sticky lg:top-16 space-y-0 lg:space-y-4">
            <div className="lg:border lg:border-[#D5D9D9] lg:rounded-lg lg:overflow-hidden bg-white">
              {/* Desktop Buy Box Price Header */}
              <div className="hidden lg:block px-4 pt-4 pb-1">
                <div className="flex items-start tabular-nums">
                  <span className="text-xs font-semibold mt-0.5">S$</span>
                  <span className="text-2xl font-bold tracking-tight text-gray-900 leading-none">
                    {priceDollars}
                  </span>
                  <span className="text-xs font-semibold mt-0.5">{priceCents}</span>
                </div>
              </div>

              {/* Delivery & Stock Section */}
              <section
                className="p-4 border-b border-gray-200 lg:border-b-0 text-sm space-y-3"
                data-purpose="fulfillment-info"
              >
                <div className="text-xs leading-relaxed">
                  <span className="text-teal-700 font-bold">FREE Delivery</span>{' '}
                  <span className="font-bold text-gray-900">
                    {activeProduct.deliveryDate}
                  </span>
                  . Order within{' '}
                  <span className="text-green-700 font-semibold">14 hrs 32 mins</span>
                </div>

                {/* Location Link */}
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="flex items-center text-xs text-[#007185] hover:underline text-left"
                >
                  <MapPin className="w-4 h-4 mr-1 text-gray-500 shrink-0" />
                  <span>Deliver to Singapore {postalCode}</span>
                </button>

                {/* In Stock Badge */}
                <div className="text-lg font-medium text-green-700">In Stock</div>

                {/* Seller & Fulfillment Details */}
                <div className="text-xs text-gray-600 grid grid-cols-2 gap-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Ships from</span>
                  <span className="font-medium text-gray-800">Amazon SG</span>
                  <span className="text-gray-500">Sold by</span>
                  <span className="font-medium text-gray-800">Razer Official Flagship</span>
                  <span className="text-gray-500">Returns</span>
                  <button
                    type="button"
                    onClick={() =>
                      setInfoModal({
                        title: '15-Day Refund or Replacement',
                        message:
                          'Eligible for full refund or free replacement within 15 days of receipt in original packaging via Amazon.sg Return Center.',
                      })
                    }
                    className="text-[#007185] hover:underline font-medium text-left"
                  >
                    15-day refund/replacement
                  </button>
                  <span className="text-gray-500">Payment</span>
                  <button
                    type="button"
                    onClick={() =>
                      setInfoModal({
                        title: 'Your Transaction is Secure',
                        message:
                          'Amazon.sg encrypts payment details during transmission and supports Visa, Mastercard, Amex, and PayNow SG.',
                      })
                    }
                    className="text-[#007185] hover:underline font-medium text-left"
                  >
                    Secure transaction
                  </button>
                </div>
              </section>

              {/* Purchase Actions Section */}
              <section
                className="p-4 pt-4 lg:pt-0 space-y-3 border-b border-gray-200 lg:border-b-0"
                data-purpose="cart-buy-actions"
              >
                {/* Quantity Selector */}
                <div className="w-28">
                  <label className="sr-only" htmlFor="quantity-selector">
                    Quantity
                  </label>
                  <div className="relative bg-gray-100 border border-gray-300 rounded-lg shadow-xs">
                    <select
                      id="quantity-selector"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full appearance-none bg-transparent py-2 pl-3 pr-8 text-xs font-semibold text-gray-800 border-none focus:ring-0 focus:outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          Qty: {n}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 font-medium py-3 rounded-full shadow-xs text-sm border border-[#FCD200] transition duration-150 flex items-center justify-center tracking-wide"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-[#FFA41C] hover:bg-[#FA8900] active:bg-[#E88B00] text-gray-900 font-medium py-3 rounded-full shadow-xs text-sm border border-[#F28C00] transition duration-150 flex items-center justify-center tracking-wide"
                >
                  Buy Now
                </button>

                {/* Add to List */}
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className="text-xs text-[#007185] hover:underline font-medium py-1"
                  >
                    {isWishlisted ? '✓ In your Wish List' : 'Add to Wish List'}
                  </button>
                </div>
              </section>
            </div>

            {/* Brand Reputation Badge */}
            <section className="p-3 bg-gray-50 border-b lg:border lg:rounded-lg border-gray-200 text-xs text-gray-700 flex items-center space-x-3">
              <div className="bg-gray-800 text-white font-bold text-[10px] px-2 py-0.5 rounded tracking-wide uppercase shrink-0">
                Top Brand
              </div>
              <div className="space-y-0.5">
                <p className="font-medium text-gray-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1 shrink-0 fill-green-600 text-white" />
                  <span>88% positive ratings from 500+ customers</span>
                </p>
                <p className="text-gray-500 text-[11px]">500+ recent orders from this brand</p>
              </div>
            </section>
          </div>

          {/* BLOCK E: Specifications & About This Item */}
          <div className="lg:col-start-6 lg:col-span-4 lg:row-start-3">
            {/* Product Specifications */}
            <section
              id="specs-section"
              className="p-4 lg:px-0 lg:py-4 border-b border-gray-200"
              data-purpose="product-specs-table"
            >
              <h2 className="text-base font-bold text-gray-900 mb-3">
                Product Specifications
              </h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                {(() => {
                  const specsList = isViperDefault
                    ? PRODUCT_SPECS
                    : [
                        { label: 'Brand', value: activeProduct.brand },
                        { label: 'Model', value: activeProduct.shortTitle },
                        { label: 'Category', value: activeProduct.category },
                        { label: 'Fulfillment', value: 'Amazon SG' },
                      ];
                  return specsList.map((spec, idx) => (
                    <div
                      key={spec.label}
                      className={`grid grid-cols-2 p-2.5 ${
                        idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } ${idx < specsList.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <span className="font-medium text-gray-500">{spec.label}</span>
                      <span className="font-semibold text-gray-800">{spec.value}</span>
                    </div>
                  ));
                })()}
              </div>
            </section>

            {/* About this item */}
            <section
              id="about-section"
              className="p-4 lg:px-0 lg:py-4 text-xs leading-relaxed"
              data-purpose="feature-bullets"
            >
              <h2 className="text-base font-bold text-gray-900 mb-2.5">About this item</h2>
              <ul className="list-disc pl-4 space-y-2 text-gray-800">
                {ABOUT_BULLETS.map((bullet) => (
                  <li key={bullet.lead}>
                    <span className="font-semibold">{bullet.lead}</span> – {bullet.body}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Frequently Bought Together / Related Razer Gear Strip (Desktop & Mobile compact cross-sell) */}
        <section className="p-4 lg:p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">
              Frequently bought together from Razer
            </h2>
            <span className="text-xs text-gray-500">Singapore local stock</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {RELATED_CATALOG.map((item) => {
              const isCurrent = item.id === activeProduct.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCatalogItem(item)}
                  className={`text-left p-3 rounded-lg border transition-all flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#007185] bg-teal-50/30'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div>
                    <div className="h-24 w-full flex items-center justify-center mb-2 bg-white rounded">
                      <SafeImage
                        src={item.image}
                        alt={item.shortTitle}
                        className="max-h-20 w-auto object-contain"
                      />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {item.shortTitle}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 tabular-nums">
                      S${item.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-[#007185] font-medium inline-flex items-center">
                      {isCurrent ? 'Viewing' : 'View'}
                      {!isCurrent && <ChevronRight className="w-3 h-3 ml-0.5" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Customer Reviews Summary */}
        <CustomerReviewsSection
          reviews={reviews}
          averageRating={activeProduct.rating}
          totalRatingsCount={isViperDefault ? totalRatingsCount : activeProduct.reviewCount}
          onOpenWriteReview={() => setReviewModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <AmazonFooter
        onOpenLocation={() => setLocationModalOpen(true)}
        onShowInfo={(title, message) => setInfoModal({ title, message })}
      />

      {/* Interactive Overlays & Modals */}
      <FullView360Modal
        isOpen={fullViewOpen}
        onClose={() => setFullViewOpen(false)}
        items={galleryItems}
        activeIndex={activeGalleryIndex}
        onChangeIndex={setActiveGalleryIndex}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        items={cartItems}
        postalCode={postalCode}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCartCheckout}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={checkoutItems}
        postalCode={postalCode}
        defaultName={userName}
        onOrderConfirmed={handleOrderConfirmed}
      />

      <NavigationDrawer
        isOpen={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
        userName={userName}
        wishlistItems={wishlistCatalogItems}
        orders={orders}
        onOpenSignIn={() => setSignInModalOpen(true)}
        onSelectCatalogItem={handleSelectCatalogItem}
        onScrollToSection={scrollToSection}
      />

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentPostal={postalCode}
        onSelectPostal={(p) => {
          setPostalCode(p);
          showToast(`Delivery location updated to Singapore ${p}`);
        }}
      />

      <SignInModal
        isOpen={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        userName={userName}
        onSignIn={(name) => {
          setUserName(name);
          showToast(`Welcome back, ${name}`);
        }}
        onSignOut={() => {
          setUserName(null);
          showToast('Signed out of Amazon.sg');
        }}
      />

      <CameraScanModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        defaultAuthor={userName}
        onSubmitReview={handleAddReview}
      />

      <InfoModal info={infoModal} onClose={() => setInfoModal(null)} />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#131921] text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg border border-white/15 whitespace-nowrap"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
