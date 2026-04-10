import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ShoppingBag, Menu, X, Heart, Plus, Minus, Trash2, Star, Check, Truck, Shield, Package } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'cart'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: any, productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, {
        id: productId,
        name: product.name,
        price: product.priceNum,
        image: product.image,
        color: product.color,
        quantity: 1
      }];
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart => prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  if (currentPage === 'cart') {
    return <CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} setCurrentPage={setCurrentPage} />;
  }

  return <HomePage addToCart={addToCart} cart={cart} setCurrentPage={setCurrentPage} />;
}

function HomePage({ addToCart, cart, setCurrentPage }: any) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-x-hidden" dir="rtl">
      {/* Top Promotional Marquee */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1A1A1A] py-2 overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{
            x: [-1500, 0]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex gap-12 items-center">
              <span className="text-white text-xs tracking-wider" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                ✨ خصم ٣٠٪ على جميع المنتجات
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white text-xs tracking-wider" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                🎁 شحن مجاني للطلبات فوق ٢٠٠ ريال
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white text-xs tracking-wider" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                ⭐ منتجات حصرية متاحة الآن
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white text-xs tracking-wider" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                💎 جودة فاخرة مضمونة
              </span>
              <span className="text-white/40">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Top Right Leaf */}
        <svg className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <path d="M100 20C120 40 140 70 140 100C140 130 120 150 100 170C80 150 60 130 60 100C60 70 80 40 100 20Z" fill="#6B7D5C" />
        </svg>

        {/* Bottom Left Organic Shape */}
        <svg className="absolute -bottom-32 -left-32 w-[500px] h-[500px] opacity-[0.02]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#6B7D5C" />
        </svg>

        {/* Mid Right Leaf */}
        <svg className="absolute top-1/3 -right-16 w-80 h-80 opacity-[0.04] rotate-45" viewBox="0 0 200 200" fill="none">
          <path d="M100 30C115 50 130 75 130 100C130 125 115 145 100 160C85 145 70 125 70 100C70 75 85 50 100 30Z" fill="#6B7D5C" />
        </svg>

        {/* Left Side Curved Shape */}
        <svg className="absolute top-2/3 -left-24 w-96 h-96 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <path d="M40 100 Q 60 60, 100 60 T 160 100 Q 140 140, 100 140 T 40 100 Z" fill="#6B7D5C" />
        </svg>

        {/* Center Subtle Decoration */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.015]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="60" fill="none" stroke="#6B7D5C" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#6B7D5C" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-[34px] left-0 right-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E5E5E0] shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
          <div className="flex items-center gap-6 sm:gap-12">
            <h1 className="text-[2.1rem] tracking-wide text-[#1A1A1A] sm:text-3xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>نــورا</h1>
            <div className="hidden md:flex items-center gap-10" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              <a href="#new" className="text-sm text-[#1A1A1A] hover:text-[#6B7D5C] transition-colors">وصل حديثاً</a>
              <a href="#collections" className="text-sm text-[#1A1A1A] hover:text-[#6B7D5C] transition-colors">المجموعات</a>
              <a href="#shop" className="text-sm text-[#1A1A1A] hover:text-[#6B7D5C] transition-colors">تسوق</a>
              <a href="#about" className="text-sm text-[#1A1A1A] hover:text-[#6B7D5C] transition-colors">من نحن</a>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              className="relative text-[#1A1A1A] hover:text-[#6B7D5C] transition-colors"
              onClick={() => setCurrentPage('cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6B7D5C] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-[#1A1A1A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-[#FAF8F5] border-t border-[#E5E5E0] px-6 py-6"
            style={{ fontFamily: 'Tajawal, sans-serif' }}
          >
            <div className="flex flex-col gap-4">
              <a href="#new" className="text-sm text-[#1A1A1A]">وصل حديثاً</a>
              <a href="#collections" className="text-sm text-[#1A1A1A]">المجموعات</a>
              <a href="#shop" className="text-sm text-[#1A1A1A]">تسوق</a>
              <a href="#about" className="text-sm text-[#1A1A1A]">من نحن</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen overflow-hidden" style={{ position: 'relative' }}>
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#FAF8F5]/80 z-10" />

          {/* Decorative Geometric Overlay - Animated */}
          <div className="absolute inset-0 z-[5] pointer-events-none">
            <motion.svg
              className="absolute top-20 right-20 w-32 h-32 opacity-10"
              viewBox="0 0 100 100"
              fill="none"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
            </motion.svg>
            <motion.svg
              className="absolute bottom-40 left-20 w-24 h-24 opacity-10"
              viewBox="0 0 100 100"
              fill="none"
              animate={{
                rotate: [0, 90, 180, 270, 360],
                y: [0, 15, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="white" strokeWidth="0.5" fill="none" />
            </motion.svg>
          </div>

          <img
            src="https://images.unsplash.com/photo-1774486033344-e65e11a4fa29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="أزياء حجاب أنيقة"
            className="w-full h-[120%] object-cover object-center"
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 flex min-h-screen items-center pt-28 pb-10 sm:h-full sm:min-h-0 sm:pt-0 sm:pb-0"
        >
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-12">
            <div className="max-w-[650px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-3 sm:mb-4"
              >
                <span className="inline-block bg-white/90 px-3 py-2 text-xs tracking-[0.2em] text-[#1A1A1A] sm:px-4 sm:text-sm sm:tracking-widest" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  المجموعة الربيعية ٢٠٢٦
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-5 text-5xl leading-[0.95] text-white sm:mb-6 sm:text-6xl md:mb-8 md:text-8xl lg:text-9xl"
                style={{ fontFamily: 'Amiri, serif', fontWeight: 700, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
              >
                أناقة
                <br />
                لا تُنسى
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-6 max-w-[520px] text-base leading-8 text-white sm:mb-8 sm:text-lg sm:leading-relaxed md:mb-10 md:text-2xl"
                style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 400, textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
              >
                اكتشفي مجموعتنا الحصرية من الحجابات الفاخرة المصنوعة يدوياً من أجود الأقمشة العالمية
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 gap-3 sm:flex sm:gap-4"
              >
                <motion.button
                  className="relative overflow-hidden bg-[#6B7D5C] px-4 py-4 text-white shadow-lg sm:px-10 md:px-14 md:py-5"
                  style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(107, 125, 92, 0.3)"
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(107, 125, 92, 0.2)",
                      "0 10px 40px rgba(107, 125, 92, 0.4)",
                      "0 10px 30px rgba(107, 125, 92, 0.2)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{
                      x: "100%",
                      transition: { duration: 0.6 }
                    }}
                    style={{ opacity: 0.1 }}
                  />
                  <span className="relative z-[1]">تسوق الآن</span>
                </motion.button>
                <motion.button
                  className="bg-white/95 px-4 py-4 text-[#1A1A1A] shadow-lg sm:px-10 md:px-14 md:py-5"
                  style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 1)"
                  }}
                >
                  المجموعة الكاملة
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Spacer for fixed header */}
      <div className="h-[110px]" />

      {/* Features Bar */}
      <FeaturesBar />

      {/* Scrolling Text Marquee */}
      <MarqueeSection />

      {/* New Arrivals */}
      <NewArrivals addToCart={addToCart} />

      {/* Storytelling Section */}
      <StorytellingSection />

      {/* Shop Section */}
      <ShopSection addToCart={addToCart} />

      {/* Testimonials */}
      <Testimonials />

      {/* Moving Text Banner */}
      <MovingTextBanner />

      {/* Parallax Image Banner */}
      <ParallaxBanner />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Floating Images Section */}
      <FloatingImagesSection />

      {/* Instagram Grid */}
      <InstagramGrid />

      {/* Newsletter */}
      <Newsletter />

      {/* Bottom Scrolling Banner */}
      <BottomScrollingBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function MarqueeSection() {
  const marqueeText = [
    "تخفيضات تصل إلى ٣٠٪",
    "شحن مجاني",
    "منتجات حصرية",
    "جودة فائقة",
    "تصاميم عصرية",
    "خامات طبيعية"
  ];

  return (
    <div className="bg-[#6B7D5C] py-4 overflow-hidden relative z-[1]">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{
          x: [0, -2000]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }}
      >
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex gap-16">
            {marqueeText.map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-white text-sm" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {text}
                </span>
                <span className="text-white/40">•</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FeaturesBar() {
  const features = [
    { icon: Truck, text: "شحن مجاني للطلبات فوق ٢٠٠ ريال" },
    { icon: Shield, text: "ضمان الجودة لمدة سنة" },
    { icon: Package, text: "إرجاع مجاني خلال ٣٠ يوم" },
    { icon: Check, text: "منتجات أصلية ١٠٠٪" }
  ];

  return (
    <section className="bg-[#F5F1EB] border-y border-[#E8E4DD] py-5 sm:py-6 relative z-[1] overflow-hidden">
      {/* Decorative Horizontal Lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6B7D5C] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6B7D5C] to-transparent" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 justify-center">
              <feature.icon className="w-5 h-5 text-[#6B7D5C]" />
              <span className="text-sm text-[#1A1A1A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewArrivals({ addToCart }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      id: 1,
      name: "حجاب كشمير فاخر",
      price: "٢٩٥ ريال",
      priceNum: 295,
      image: "https://images.unsplash.com/photo-1758539197931-ef90ca4a3c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "زيتوني فاتح",
      badge: "جديد"
    },
    {
      id: 2,
      name: "شال حرير طبيعي",
      price: "٣٥٠ ريال",
      priceNum: 350,
      image: "https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "أسود كلاسيكي",
      badge: "حصري"
    },
    {
      id: 3,
      name: "حجاب قطن عضوي",
      price: "١٨٥ ريال",
      priceNum: 185,
      image: "https://images.unsplash.com/photo-1758900727792-e411697fc0a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "رمادي داكن",
      badge: "مستدام"
    },
    {
      id: 4,
      name: "طرحة شيفون راقية",
      price: "٢٢٠ ريال",
      priceNum: 220,
      image: "https://images.unsplash.com/photo-1764642574254-bc89c96dfae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "بيج كريمي",
      badge: "الأكثر مبيعاً"
    }
  ];

  return (
    <section ref={ref} id="new" className="py-16 sm:py-20 md:py-24 relative z-[1] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCFA] via-white to-[#FAF8F5]" />

      {/* Decorative Branch */}
      <svg className="absolute top-32 left-24 w-52 h-52 opacity-[0.035] -rotate-12" viewBox="0 0 200 200" fill="none">
        <path d="M100 60 Q 90 80, 100 100 Q 110 80, 100 60 M100 100 Q 85 110, 75 130 M100 100 Q 115 110, 125 130" stroke="#6B7D5C" strokeWidth="2" fill="none" />
      </svg>

      {/* Tree Silhouette - Right Side */}
      <motion.svg
        className="absolute bottom-0 right-12 w-64 h-96 opacity-[0.025]"
        viewBox="0 0 200 300"
        fill="none"
        animate={{
          y: [0, -15, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M100 280 L100 150" stroke="#6B7D5C" strokeWidth="8" />
        <path d="M100 150 Q 120 140, 140 130 Q 150 120, 140 100 Q 130 80, 120 70" stroke="#6B7D5C" strokeWidth="3" fill="none" />
        <path d="M100 150 Q 80 140, 60 130 Q 50 120, 60 100 Q 70 80, 80 70" stroke="#6B7D5C" strokeWidth="3" fill="none" />
        <path d="M100 180 Q 110 170, 120 165 Q 125 160, 120 150" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <path d="M100 180 Q 90 170, 80 165 Q 75 160, 80 150" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <ellipse cx="130" cy="80" rx="15" ry="25" fill="#6B7D5C" opacity="0.3" />
        <ellipse cx="70" cy="80" rx="15" ry="25" fill="#6B7D5C" opacity="0.3" />
        <ellipse cx="115" cy="160" rx="12" ry="20" fill="#6B7D5C" opacity="0.3" />
        <ellipse cx="85" cy="160" rx="12" ry="20" fill="#6B7D5C" opacity="0.3" />
      </motion.svg>

      {/* Subtle Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#6B7D5C] opacity-[0.02] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <motion.span
            className="mb-4 block text-sm tracking-widest text-[#6B7D5C]"
            style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            وصل حديثاً
          </motion.span>
          <motion.h3
            className="mb-4 text-3xl text-[#1A1A1A] sm:text-4xl md:text-6xl"
            style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            المجموعة الجديدة
          </motion.h3>
          <p className="mx-auto max-w-[600px] text-base text-[#4A4A4A] sm:text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            اكتشفي أحدث إصداراتنا من الحجابات الفاخرة المصممة خصيصاً لهذا الموسم
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <motion.div
                className="relative aspect-[3/4] bg-[#F5F3EE] overflow-hidden mb-5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                {product.badge && (
                  <span className="absolute top-4 right-4 bg-white text-[#1A1A1A] px-3 py-1 text-xs" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                    {product.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => addToCart(product, product.id)}
                    className="w-full bg-white text-[#1A1A1A] py-3 text-sm hover:bg-[#6B7D5C] hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
                  >
                    أضف للسلة
                  </button>
                </div>
                <button className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 p-2 rounded-full hover:bg-white">
                  <Heart className="w-4 h-4 text-[#1A1A1A]" />
                </button>
              </motion.div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#6B7D5C] text-[#6B7D5C]" />
                ))}
                <span className="text-xs text-[#4A4A4A] mr-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  (٤٨ تقييم)
                </span>
              </div>
              <h4 className="text-lg mb-2 text-[#1A1A1A]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                {product.name}
              </h4>
              <p className="text-sm text-[#4A4A4A] mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {product.color}
              </p>
              <p className="text-xl text-[#6B7D5C]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 600 }}>
                {product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorytellingSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-16 sm:py-24 md:py-32 overflow-hidden z-[1]" style={{ position: 'relative' }}>
      {/* Layered Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#F5F1EB] via-[#EBE7E1] to-[#F5F1EB]" />

      {/* Decorative Border Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6B7D5C]/10 to-transparent" />

      {/* Arabesque Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="arabesque" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="40" fill="none" stroke="#6B7D5C" strokeWidth="0.5"/>
              <path d="M60 20 Q 80 40, 60 60 Q 40 40, 60 20 M60 60 Q 80 80, 60 100 Q 40 80, 60 60" fill="none" stroke="#6B7D5C" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arabesque)" />
        </svg>
      </div>

      {/* Decorative Leaf Element */}
      <svg className="absolute top-20 right-12 w-64 h-64 opacity-[0.04] rotate-12" viewBox="0 0 200 200" fill="none">
        <path d="M100 40C110 55 120 75 120 95C120 115 110 130 100 145C90 130 80 115 80 95C80 75 90 55 100 40Z" fill="#6B7D5C" />
        <path d="M100 50C108 62 115 78 115 95C115 112 108 125 100 138C92 125 85 112 85 95C85 78 92 62 100 50Z" fill="none" stroke="#6B7D5C" strokeWidth="0.5" />
      </svg>

      {/* Floral Corner Decoration */}
      <svg className="absolute bottom-32 right-16 w-56 h-56 opacity-[0.025]" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="15" fill="#6B7D5C"/>
        <circle cx="100" cy="70" r="12" fill="#6B7D5C"/>
        <circle cx="130" cy="100" r="12" fill="#6B7D5C"/>
        <circle cx="100" cy="130" r="12" fill="#6B7D5C"/>
        <circle cx="70" cy="100" r="12" fill="#6B7D5C"/>
      </svg>

      {/* Decorative Tree Branch - Left Bottom */}
      <motion.svg
        className="absolute bottom-20 left-8 w-80 h-80 opacity-[0.03]"
        viewBox="0 0 200 200"
        fill="none"
        animate={{
          rotate: [0, 3, 0, -3, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M40 160 Q 60 140, 80 130 Q 100 120, 120 115" stroke="#6B7D5C" strokeWidth="4" fill="none" />
        <path d="M60 140 Q 55 120, 50 100" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <path d="M80 130 Q 85 115, 90 100" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <path d="M100 120 Q 105 105, 110 90" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <ellipse cx="48" cy="95" rx="10" ry="16" fill="#6B7D5C" opacity="0.4" transform="rotate(-20 48 95)" />
        <ellipse cx="88" cy="95" rx="11" ry="17" fill="#6B7D5C" opacity="0.4" transform="rotate(-15 88 95)" />
        <ellipse cx="108" cy="85" rx="10" ry="15" fill="#6B7D5C" opacity="0.4" transform="rotate(-10 108 85)" />
        <ellipse cx="65" cy="125" rx="9" ry="14" fill="#6B7D5C" opacity="0.4" transform="rotate(10 65 125)" />
      </motion.svg>
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-[0.06]"
      >
        <img
          src="https://images.unsplash.com/photo-1714682597753-a646ba506cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBmYWJyaWMlMjB0ZXh0aWxlJTIwYmVpZ2UlMjBjcmVhbXxlbnwxfHx8fDE3NzU3NzU3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="texture"
          className="w-full h-full object-cover opacity-50"
        />
      </motion.div>

      {/* Additional Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="aspect-[4/5] bg-[#E5E5E0] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1771646752560-40673fef0201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="التراث"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -left-4 h-28 w-28 bg-[#6B7D5C]/10 -z-10 sm:-bottom-8 sm:-left-8 sm:h-48 sm:w-48"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 block text-sm tracking-widest text-[#6B7D5C] sm:mb-6"
              style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
            >
              قصتنا
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-5 text-3xl leading-[1.2] text-[#1A1A1A] sm:mb-6 sm:text-4xl md:mb-8 md:text-6xl"
              style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}
            >
              غصن من التاريخ
            </motion.h3>
            <p className="mb-5 text-base leading-8 text-[#1A1A1A] sm:text-lg sm:leading-relaxed md:text-xl" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 400 }}>
              كل قطعة في مجموعتنا تحكي قصة من التراث والحرفية والجمال الخالد. نسعى لدمج الأصالة العربية مع التصميم العصري.
            </p>
            <p className="mb-6 text-sm leading-7 text-[#4A4A4A] sm:mb-8 sm:text-base sm:leading-relaxed lg:text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              منذ تأسيسنا عام ٢٠١٥، قمنا بصناعة أكثر من ١٠٠،٠٠٠ قطعة فنية من الحجابات، كل منها مصنوع بعناية فائقة من أجود الأقمشة المستوردة من إيطاليا وتركيا.
            </p>
            <div className="mb-8 grid grid-cols-3 gap-3 text-center sm:mb-10 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.p
                  className="mb-2 text-2xl text-[#6B7D5C] sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  ٩٨٪
                </motion.p>
                <p className="text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>رضا العملاء</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.p
                  className="mb-2 text-2xl text-[#6B7D5C] sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  ٥٠+
                </motion.p>
                <p className="text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>دولة حول العالم</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.p
                  className="mb-2 text-2xl text-[#6B7D5C] sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  ١٠٠٪
                </motion.p>
                <p className="text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>أقمشة طبيعية</p>
              </motion.div>
            </div>
            <button className="w-full bg-[#1A1A1A] px-6 py-4 text-white hover:bg-[#2C2C2C] transition-colors duration-300 sm:w-auto sm:px-12" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              اقرأ المزيد عن قصتنا
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ShopSection({ addToCart }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allProducts = [
    {
      id: 5,
      name: "حجاب حريري فاخر",
      price: "٣٨٠ ريال",
      priceNum: 380,
      image: "https://images.unsplash.com/photo-1758539197931-ef90ca4a3c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "زيتوني فاتح",
      category: "حرير"
    },
    {
      id: 6,
      name: "شال قطني ناعم",
      price: "١٩٥ ريال",
      priceNum: 195,
      image: "https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "أسود كلاسيكي",
      category: "قطن"
    },
    {
      id: 7,
      name: "حجاب شيفون راقي",
      price: "٢٤٥ ريال",
      priceNum: 245,
      image: "https://images.unsplash.com/photo-1758900727792-e411697fc0a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "رمادي داكن",
      category: "شيفون"
    },
    {
      id: 8,
      name: "حجاب جيرسي مريح",
      price: "١٦٥ ريال",
      priceNum: 165,
      image: "https://images.unsplash.com/photo-1764642574254-bc89c96dfae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "بيج كريمي",
      category: "جيرسي"
    },
    {
      id: 9,
      name: "حجاب مطرز بالورود",
      price: "٤٢٠ ريال",
      priceNum: 420,
      image: "https://images.unsplash.com/photo-1773188536669-17275a1c200c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "أبيض لؤلؤي",
      category: "مطرز"
    },
    {
      id: 10,
      name: "شال موسمي خفيف",
      price: "٢١٥ ريال",
      priceNum: 215,
      image: "https://images.unsplash.com/photo-1771646752406-00f7054fa1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "خشبي طبيعي",
      category: "موسمي"
    },
    {
      id: 11,
      name: "حجاب فوري عملي",
      price: "١٤٥ ريال",
      priceNum: 145,
      image: "https://images.unsplash.com/photo-1771646790447-35bbdff9215b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "كحلي بحري",
      category: "فوري"
    },
    {
      id: 12,
      name: "طرحة كشمير فاخرة",
      price: "٥٢٠ ريال",
      priceNum: 520,
      image: "https://images.unsplash.com/photo-1771646790518-2669c5ca7917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "كريمي دافئ",
      category: "كشمير"
    }
  ];

  return (
    <section ref={ref} id="shop" className="py-16 sm:py-20 md:py-32 relative z-[1] overflow-hidden">
      {/* Gradient Background with Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FAF8F5] to-[#F5F1EB]" />

      {/* Decorative Geometric Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #6B7D5C 1px, transparent 1px),
          linear-gradient(to bottom, #6B7D5C 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      {/* Decorative Plus Pattern */}
      <svg className="absolute bottom-32 left-20 w-48 h-48 opacity-[0.025]" viewBox="0 0 100 100" fill="none">
        <path d="M48 20 L48 80 M20 48 L80 48" stroke="#6B7D5C" strokeWidth="2" />
        <path d="M35 35 L35 65 M20 50 L50 50" stroke="#6B7D5C" strokeWidth="1.5" />
        <path d="M65 35 L65 65 M50 50 L80 50" stroke="#6B7D5C" strokeWidth="1.5" />
      </svg>

      {/* Corner Decorative Elements */}
      <svg className="absolute top-20 right-12 w-32 h-32 opacity-[0.04]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="30" stroke="#6B7D5C" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="#6B7D5C" strokeWidth="0.5" fill="none" />
      </svg>

      {/* Palm Frond Decoration - Top Left */}
      <motion.svg
        className="absolute top-40 left-0 w-72 h-72 opacity-[0.03]"
        viewBox="0 0 200 200"
        fill="none"
        animate={{
          x: [0, 15, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M20 100 Q 40 90, 60 85 Q 80 80, 100 75" stroke="#6B7D5C" strokeWidth="3" fill="none" />
        <path d="M40 90 Q 45 75, 50 60" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M60 85 Q 65 70, 70 55" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M80 80 Q 85 65, 90 50" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M40 90 Q 45 105, 50 120" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M60 85 Q 65 100, 70 115" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <ellipse cx="48" cy="70" rx="6" ry="12" fill="#6B7D5C" opacity="0.35" transform="rotate(-30 48 70)" />
        <ellipse cx="68" cy="65" rx="6" ry="12" fill="#6B7D5C" opacity="0.35" transform="rotate(-25 68 65)" />
        <ellipse cx="88" cy="60" rx="6" ry="12" fill="#6B7D5C" opacity="0.35" transform="rotate(-20 88 60)" />
      </motion.svg>

      {/* Vine Pattern - Bottom */}
      <svg className="absolute bottom-12 right-32 w-96 h-32 opacity-[0.025]" viewBox="0 0 300 100" fill="none">
        <path d="M0 50 Q 50 30, 100 50 Q 150 70, 200 50 Q 250 30, 300 50" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <ellipse cx="50" cy="40" rx="8" ry="12" fill="#6B7D5C" opacity="0.4" />
        <ellipse cx="100" cy="55" rx="8" ry="12" fill="#6B7D5C" opacity="0.4" />
        <ellipse cx="150" cy="65" rx="8" ry="12" fill="#6B7D5C" opacity="0.4" />
        <ellipse cx="200" cy="45" rx="8" ry="12" fill="#6B7D5C" opacity="0.4" />
        <ellipse cx="250" cy="35" rx="8" ry="12" fill="#6B7D5C" opacity="0.4" />
      </svg>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <span className="text-sm tracking-widest text-[#6B7D5C] mb-4 block" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            المجموعة الكاملة
          </span>
          <h3 className="mb-4 text-3xl text-[#1A1A1A] sm:text-4xl md:text-6xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            تسوقي جميع المنتجات
          </h3>
          <p className="mx-auto max-w-[600px] text-base text-[#4A4A4A] sm:text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            اكتشفي تشكيلتنا الواسعة من الحجابات الفاخرة بأفضل الأسعار
          </p>
        </motion.div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 sm:gap-6 md:mb-12 lg:grid-cols-4">
          {allProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group cursor-pointer bg-white overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#E8E4DD]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F3EE]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-white text-[#1A1A1A] px-3 py-1 text-xs" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                    {product.category}
                  </span>
                  <button className="bg-white p-2 rounded-full hover:bg-[#F5F3EE] transition-colors">
                    <Heart className="w-4 h-4 text-[#1A1A1A]" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => addToCart(product, product.id)}
                    className="w-full bg-white text-[#1A1A1A] py-3 text-sm hover:bg-[#6B7D5C] hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#6B7D5C] text-[#6B7D5C]" />
                  ))}
                </div>
                <h4 className="text-lg mb-1 text-[#1A1A1A]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {product.name}
                </h4>
                <p className="text-sm text-[#4A4A4A] mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {product.color}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-[#6B7D5C]" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 600 }}>
                    {product.price}
                  </p>
                  <span className="text-xs text-[#6B7D5C] bg-[#6B7D5C]/10 px-2 py-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    شحن مجاني
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <button className="w-full bg-[#1A1A1A] px-6 py-4 text-white hover:bg-[#2C2C2C] transition-colors duration-300 sm:w-auto sm:px-16" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            عرض المزيد من المنتجات
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "نورة العتيبي",
      location: "الرياض، السعودية",
      text: "أفضل حجابات اشتريتها على الإطلاق! الجودة ممتازة والقماش ناعم جداً. أنصح بها بشدة.",
      rating: 5
    },
    {
      name: "مريم أحمد",
      location: "دبي، الإمارات",
      text: "تجربة تسوق رائعة. المنتجات فاخرة والتوصيل سريع. سأطلب المزيد بالتأكيد.",
      rating: 5
    },
    {
      name: "فاطمة الحربي",
      location: "جدة، السعودية",
      text: "حجابات بتصاميم عصرية وجودة عالية. القماش خفيف ومريح للارتداء طوال اليوم.",
      rating: 5
    }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-32 relative z-[1] overflow-hidden">
      {/* Layered Background */}
      <div className="absolute inset-0 bg-[#F5F1EB]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#F5F1EB] via-transparent to-[#FAF8F5] opacity-60" />

      {/* Decorative Arch Pattern */}
      <div className="absolute top-0 left-0 right-0 h-64 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
          <path d="M0 200 Q 300 100, 600 200 T 1200 200" fill="#6B7D5C" />
        </svg>
      </div>

      {/* Decorative Organic Shape */}
      <svg className="absolute top-40 left-16 w-56 h-56 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
        <ellipse cx="100" cy="100" rx="70" ry="50" fill="#6B7D5C" transform="rotate(25 100 100)" />
      </svg>

      {/* Quote Marks Decoration */}
      <svg className="absolute bottom-20 right-20 w-40 h-40 opacity-[0.025]" viewBox="0 0 100 100" fill="none">
        <text x="20" y="70" fill="#6B7D5C" fontSize="80" fontFamily="serif">"</text>
      </svg>

      {/* Eucalyptus Branch - Top Left */}
      <motion.svg
        className="absolute top-16 left-12 w-48 h-64 opacity-[0.04]"
        viewBox="0 0 120 180"
        fill="none"
        animate={{
          rotate: [0, 4, 0, -4, 0],
          y: [0, -8, 0]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M60 20 Q 58 50, 60 80 Q 62 110, 60 140" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
        <ellipse cx="50" cy="35" rx="12" ry="8" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="70" cy="35" rx="12" ry="8" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="48" cy="55" rx="13" ry="9" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="72" cy="55" rx="13" ry="9" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="50" cy="75" rx="12" ry="8" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="70" cy="75" rx="12" ry="8" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="48" cy="95" rx="13" ry="9" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="72" cy="95" rx="13" ry="9" fill="#6B7D5C" opacity="0.35" />
      </motion.svg>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <span className="text-sm tracking-widest text-[#6B7D5C] mb-4 block" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            آراء العملاء
          </span>
          <h3 className="mb-4 text-3xl text-[#1A1A1A] sm:text-4xl md:text-6xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            ماذا يقول عملاؤنا
          </h3>
        </motion.div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="border border-[#E8E4DD] bg-[#FDFCFA] p-5 shadow-lg sm:p-6 md:p-8"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#6B7D5C] text-[#6B7D5C]" />
                ))}
              </div>
              <p className="text-base text-[#1A1A1A] mb-6 leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                "{testimonial.text}"
              </p>
              <div className="border-t border-[#E5E5E0] pt-4">
                <p className="text-sm text-[#1A1A1A] mb-1" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                  {testimonial.name}
                </p>
                <p className="text-xs text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {testimonial.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovingTextBanner() {
  return (
    <section className="py-12 bg-white overflow-hidden relative z-[1] border-y border-[#E8E4DD]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [-1000, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear"
          }
        }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center gap-8">
            <span className="text-6xl md:text-7xl text-[#1A1A1A]/5" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
              نــورا
            </span>
            <span className="text-2xl text-[#6B7D5C]/20">✦</span>
            <span className="text-6xl md:text-7xl text-[#1A1A1A]/5" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
              أناقة خالدة
            </span>
            <span className="text-2xl text-[#6B7D5C]/20">✦</span>
            <span className="text-6xl md:text-7xl text-[#1A1A1A]/5" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
              فخامة عربية
            </span>
            <span className="text-2xl text-[#6B7D5C]/20">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function ParallaxBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden" style={{ position: 'relative' }}>
      {/* Decorative Border Pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6B7D5C]/20 via-[#6B7D5C]/40 to-[#6B7D5C]/20 z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6B7D5C]/20 via-[#6B7D5C]/40 to-[#6B7D5C]/20 z-30" />

      {/* Tree Silhouettes Overlay */}
      <motion.svg
        className="absolute left-0 bottom-0 w-80 h-full opacity-[0.08] z-20"
        viewBox="0 0 200 400"
        fill="none"
        animate={{
          x: [0, 10, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M50 380 L50 200" stroke="white" strokeWidth="6" />
        <path d="M50 200 Q 70 180, 90 160 Q 100 140, 90 110" stroke="white" strokeWidth="3" fill="none" />
        <path d="M50 200 Q 30 180, 10 160 Q 0 140, 10 110" stroke="white" strokeWidth="3" fill="none" />
        <ellipse cx="80" cy="130" rx="20" ry="35" fill="white" opacity="0.15" />
        <ellipse cx="20" cy="130" rx="20" ry="35" fill="white" opacity="0.15" />
        <ellipse cx="50" cy="100" rx="25" ry="40" fill="white" opacity="0.15" />
      </motion.svg>

      <motion.svg
        className="absolute right-0 bottom-0 w-80 h-full opacity-[0.08] z-20"
        viewBox="0 0 200 400"
        fill="none"
        animate={{
          x: [0, -10, 0]
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M150 380 L150 220" stroke="white" strokeWidth="6" />
        <path d="M150 220 Q 130 200, 110 180 Q 100 160, 110 130" stroke="white" strokeWidth="3" fill="none" />
        <path d="M150 220 Q 170 200, 190 180 Q 200 160, 190 130" stroke="white" strokeWidth="3" fill="none" />
        <ellipse cx="120" cy="150" rx="22" ry="38" fill="white" opacity="0.15" />
        <ellipse cx="180" cy="150" rx="22" ry="38" fill="white" opacity="0.15" />
      </motion.svg>

      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1716110260836-b9827c6afc57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYWJyaWMlMjB0ZXh0aWxlJTIwYmVpZ2UlMjBjcmVhbXxlbnwxfHx8fDE3NzU3NzU3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="أقمشة فاخرة"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-20 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-white px-6 max-w-[800px]"
        >
          <h3 className="text-6xl md:text-7xl mb-6" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            صُنع بعناية فائقة
          </h3>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            نختار أقمشتنا بعناية من أفضل المصانع الإيطالية والتركية لنضمن لك الجودة الاستثنائية
          </p>
          <button className="bg-white text-[#1A1A1A] px-12 py-4 hover:bg-[#F5F3EE] transition-colors duration-300" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            اكتشف المزيد
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    { name: "شيفون", description: "خفيف ومنسدل", count: "٢٤ منتج" },
    { name: "قطن", description: "راحة تدوم", count: "٣٢ منتج" },
    { name: "حرير", description: "فخامة لا مثيل لها", count: "١٨ منتج" },
    { name: "فوري", description: "جاهز للارتداء", count: "١٦ منتج" }
  ];

  return (
    <section ref={ref} id="collections" className="py-32 relative z-[1] overflow-hidden">
      {/* Diagonal Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCFA] via-white to-[#F5F1EB]" />

      {/* Diagonal Stripes Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 100px,
          #6B7D5C 100px,
          #6B7D5C 101px
        )`
      }} />

      {/* Decorative Dots Pattern */}
      <svg className="absolute top-20 right-32 w-40 h-40 opacity-[0.04]" viewBox="0 0 100 100" fill="none">
        <circle cx="20" cy="20" r="3" fill="#6B7D5C" />
        <circle cx="50" cy="20" r="3" fill="#6B7D5C" />
        <circle cx="80" cy="20" r="3" fill="#6B7D5C" />
        <circle cx="20" cy="50" r="3" fill="#6B7D5C" />
        <circle cx="50" cy="50" r="3" fill="#6B7D5C" />
        <circle cx="80" cy="50" r="3" fill="#6B7D5C" />
        <circle cx="20" cy="80" r="3" fill="#6B7D5C" />
        <circle cx="50" cy="80" r="3" fill="#6B7D5C" />
        <circle cx="80" cy="80" r="3" fill="#6B7D5C" />
      </svg>

      {/* Diamond Shapes */}
      <svg className="absolute bottom-32 left-24 w-48 h-48 opacity-[0.02]" viewBox="0 0 100 100" fill="none">
        <path d="M50 10 L70 50 L50 90 L30 50 Z" fill="#6B7D5C" />
        <path d="M50 30 L60 50 L50 70 L40 50 Z" fill="white" />
      </svg>

      {/* Botanical Corner - Top Right */}
      <motion.svg
        className="absolute top-12 right-8 w-56 h-72 opacity-[0.035]"
        viewBox="0 0 150 200"
        fill="none"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M120 20 L120 100" stroke="#6B7D5C" strokeWidth="3" />
        <path d="M120 40 Q 110 35, 100 40" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M120 40 Q 130 35, 140 40" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M120 60 Q 108 55, 95 60" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M120 60 Q 132 55, 145 60" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M120 80 Q 105 75, 90 80" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <ellipse cx="105" cy="42" rx="9" ry="15" fill="#6B7D5C" opacity="0.4" transform="rotate(-30 105 42)" />
        <ellipse cx="135" cy="42" rx="9" ry="15" fill="#6B7D5C" opacity="0.4" transform="rotate(30 135 42)" />
        <ellipse cx="100" cy="62" rx="10" ry="16" fill="#6B7D5C" opacity="0.4" transform="rotate(-35 100 62)" />
        <ellipse cx="140" cy="62" rx="10" ry="16" fill="#6B7D5C" opacity="0.4" transform="rotate(35 140 62)" />
      </motion.svg>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-12 md:mb-16"
        >
          <span className="text-sm tracking-widest text-[#6B7D5C] mb-4 block" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            المجموعات
          </span>
          <h3 className="mb-4 text-3xl text-[#1A1A1A] sm:text-4xl md:text-6xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            تسوقي حسب نوع القماش
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer bg-white p-10 text-center hover:bg-[#6B7D5C] transition-all duration-500 border border-[#E8E4DD]"
            >
              <h4 className="text-3xl mb-2 text-[#1A1A1A] group-hover:text-white transition-colors" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
                {category.name}
              </h4>
              <p className="text-sm text-[#4A4A4A] group-hover:text-white/90 transition-colors mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {category.description}
              </p>
              <p className="text-xs text-[#4A4A4A] group-hover:text-white/80 transition-colors" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {category.count}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingImagesSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden z-[1]" style={{ position: 'relative' }}>
      {/* Botanical Frame - Top */}
      <motion.svg
        className="absolute top-0 left-1/4 w-96 h-48 opacity-[0.03]"
        viewBox="0 0 300 120"
        fill="none"
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M50 60 Q 100 40, 150 60 Q 200 80, 250 60" stroke="#6B7D5C" strokeWidth="3" fill="none" />
        <ellipse cx="80" cy="50" rx="10" ry="16" fill="#6B7D5C" opacity="0.4" transform="rotate(-20 80 50)" />
        <ellipse cx="120" cy="45" rx="11" ry="17" fill="#6B7D5C" opacity="0.4" transform="rotate(-10 120 45)" />
        <ellipse cx="180" cy="70" rx="10" ry="16" fill="#6B7D5C" opacity="0.4" transform="rotate(15 180 70)" />
        <ellipse cx="220" cy="55" rx="11" ry="17" fill="#6B7D5C" opacity="0.4" transform="rotate(20 220 55)" />
      </motion.svg>

      {/* Fern Leaf - Bottom Left */}
      <motion.svg
        className="absolute bottom-20 left-8 w-52 h-64 opacity-[0.035]"
        viewBox="0 0 140 180"
        fill="none"
        animate={{
          rotate: [0, -5, 0, 5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M70 20 L70 160" stroke="#6B7D5C" strokeWidth="2.5" />
        <path d="M70 40 Q 50 35, 35 40" stroke="#6B7D5C" strokeWidth="1.5" fill="none" />
        <path d="M70 40 Q 90 35, 105 40" stroke="#6B7D5C" strokeWidth="1.5" fill="none" />
        <path d="M70 60 Q 48 55, 30 60" stroke="#6B7D5C" strokeWidth="1.5" fill="none" />
        <path d="M70 60 Q 92 55, 110 60" stroke="#6B7D5C" strokeWidth="1.5" fill="none" />
        <path d="M70 80 Q 45 75, 25 80" stroke="#6B7D5C" strokeWidth="1.5" fill="none" />
        <path d="M70 80 Q 95 75, 115 80" stroke="#6B7D5C" strokeWidth="1.5" fill="none" />
        <ellipse cx="42" cy="40" rx="8" ry="5" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="98" cy="40" rx="8" ry="5" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="39" cy="60" rx="9" ry="6" fill="#6B7D5C" opacity="0.35" />
        <ellipse cx="101" cy="60" rx="9" ry="6" fill="#6B7D5C" opacity="0.35" />
      </motion.svg>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
          <motion.div
            style={{ y: y1 }}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1758539197931-ef90ca4a3c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Collection"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="relative aspect-[3/4] overflow-hidden mt-8 sm:mt-12"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1758900728025-3d70604871c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Collection"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <motion.div
            style={{ y: y3 }}
            className="relative aspect-[3/4] overflow-hidden mt-16 sm:mt-24"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1758900727792-e411697fc0a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoaWphYiUyMGZhc2hpb24lMjBlbGVnYW50JTIwd29tYW58ZW58MXx8fHwxNzc1Nzc1NzE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Collection"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center sm:mt-16 md:mt-20"
        >
          <h3 className="mb-4 text-3xl text-[#1A1A1A] sm:mb-6 sm:text-4xl md:text-5xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            جمال في كل التفاصيل
          </h3>
          <p className="mx-auto max-w-[600px] text-base text-[#4A4A4A] sm:text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            نؤمن بأن الجمال يكمن في التفاصيل الصغيرة، ولذلك نولي اهتماماً خاصاً لكل خياطة وكل تطريز
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function InstagramGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = [
    "https://images.unsplash.com/photo-1773188536669-17275a1c200c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1771646752406-00f7054fa1b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1771646790447-35bbdff9215b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1771646790518-2669c5ca7917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtdXNsaW0lMjB3b21hbiUyMG1vZGVzdCUyMGZhc2hpb24lMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc1Nzc1NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  return (
    <section ref={ref} className="py-32 relative z-[1] overflow-hidden">
      {/* Soft Radial Gradient Background */}
      <div className="absolute inset-0 bg-[#F5F1EB]" />
      <div className="absolute inset-0 bg-radial-gradient from-white via-transparent to-transparent opacity-40" style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 70%)'
      }} />

      {/* Honeycomb Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="honeycomb" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <path d="M30 0 L45 13 L45 39 L30 52 L15 39 L15 13 Z" fill="none" stroke="#6B7D5C" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb)" />
        </svg>
      </div>

      {/* Decorative Curved Lines */}
      <svg className="absolute bottom-20 right-24 w-72 h-72 opacity-[0.025]" viewBox="0 0 200 200" fill="none">
        <path d="M50 50 Q 100 75, 150 50" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M50 100 Q 100 125, 150 100" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M50 150 Q 100 175, 150 150" stroke="#6B7D5C" strokeWidth="2" fill="none" />
      </svg>

      {/* Camera Icon Decoration */}
      <svg className="absolute top-24 left-16 w-32 h-32 opacity-[0.03]" viewBox="0 0 100 100" fill="none">
        <rect x="20" y="30" width="60" height="45" rx="5" stroke="#6B7D5C" strokeWidth="2" fill="none"/>
        <circle cx="50" cy="52" r="12" stroke="#6B7D5C" strokeWidth="2" fill="none"/>
        <rect x="40" y="20" width="20" height="10" rx="2" fill="#6B7D5C"/>
      </svg>

      {/* Willow Branches - Right Side */}
      <motion.svg
        className="absolute top-0 right-0 w-64 h-96 opacity-[0.03]"
        viewBox="0 0 180 280"
        fill="none"
        animate={{
          x: [0, -10, 0],
          y: [0, 15, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M160 20 Q 150 50, 145 80 Q 140 110, 138 140" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M140 20 Q 135 50, 130 80 Q 125 110, 120 140" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <path d="M120 20 Q 118 50, 115 80 Q 112 110, 108 140" stroke="#6B7D5C" strokeWidth="2" fill="none" />
        <ellipse cx="143" cy="70" rx="6" ry="12" fill="#6B7D5C" opacity="0.4" transform="rotate(10 143 70)" />
        <ellipse cx="128" cy="75" rx="6" ry="12" fill="#6B7D5C" opacity="0.4" transform="rotate(5 128 75)" />
        <ellipse cx="113" cy="72" rx="6" ry="12" fill="#6B7D5C" opacity="0.4" transform="rotate(-5 113 72)" />
        <ellipse cx="136" cy="110" rx="7" ry="13" fill="#6B7D5C" opacity="0.4" transform="rotate(12 136 110)" />
        <ellipse cx="123" cy="115" rx="7" ry="13" fill="#6B7D5C" opacity="0.4" transform="rotate(8 123 115)" />
      </motion.svg>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-widest text-[#6B7D5C] mb-4 block" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
            تابعونا على إنستغرام
          </span>
          <h3 className="text-5xl md:text-6xl mb-4 text-[#1A1A1A]" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            @nura_hijab
          </h3>
          <p className="text-base text-[#4A4A4A] sm:text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            شاركي لحظاتك معنا واستخدمي الوسم #نورا_حجاب
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotate: index % 2 === 0 ? 2 : -2,
                transition: { duration: 0.3 }
              }}
              className="relative aspect-square bg-[#E5E5E0] overflow-hidden group cursor-pointer"
            >
              <motion.img
                src={image}
                alt={`إنستغرام ${index + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.7 }}
              />
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#1A1A1A] relative overflow-hidden">
      {/* Decorative Wave Pattern Top */}
      <svg className="absolute top-0 left-0 w-full h-24 opacity-[0.05]" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
        <path d="M0 50 Q 300 20, 600 50 T 1200 50 L1200 0 L0 0 Z" fill="#6B7D5C" />
      </svg>

      {/* Decorative Wave Pattern Bottom */}
      <svg className="absolute bottom-0 left-0 w-full h-24 opacity-[0.05]" viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none">
        <path d="M0 50 Q 300 80, 600 50 T 1200 50 L1200 100 L0 100 Z" fill="#6B7D5C" />
      </svg>

      {/* Radial Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#6B7D5C] opacity-[0.05] blur-3xl rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#6B7D5C] opacity-[0.05] blur-3xl rounded-full pointer-events-none -translate-y-1/2" />

      {/* Envelope Icon Decoration - Animated */}
      <motion.svg
        className="absolute top-20 left-12 w-20 h-20 opacity-[0.08]"
        viewBox="0 0 100 100"
        fill="none"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <rect x="15" y="30" width="70" height="50" rx="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M15 30 L50 60 L85 30" stroke="white" strokeWidth="2" fill="none"/>
      </motion.svg>

      <motion.svg
        className="absolute bottom-20 right-12 w-20 h-20 opacity-[0.08]"
        viewBox="0 0 100 100"
        fill="none"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <rect x="15" y="30" width="70" height="50" rx="3" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M15 30 L50 60 L85 30" stroke="white" strokeWidth="2" fill="none"/>
      </motion.svg>

      <div className="max-w-[800px] mx-auto px-6 text-center relative z-[1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 text-3xl text-white sm:mb-6 sm:text-4xl md:text-5xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            اشتركي في نشرتنا البريدية
          </h3>
          <p className="mb-8 text-base text-white/80 sm:mb-10 sm:text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            احصلي على خصم ١٥٪ على أول طلب واطلعي على آخر العروض والمجموعات الجديدة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-[500px] mx-auto">
            <input
              type="email"
              placeholder="أدخلي بريدك الإلكتروني"
              className="flex-1 px-6 py-4 bg-white text-[#1A1A1A] text-right"
              style={{ fontFamily: 'Tajawal, sans-serif' }}
            />
            <button className="bg-[#6B7D5C] text-white px-10 py-4 hover:bg-[#5A6B4D] transition-colors duration-300 whitespace-nowrap" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
              اشترك الآن
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BottomScrollingBanner() {
  const items = ["حجابات فاخرة", "تصاميم حصرية", "جودة عالمية", "شحن سريع", "خدمة مميزة"];

  return (
    <div className="bg-[#F5F1EB] py-8 overflow-hidden border-y border-[#E8E4DD] relative z-[1]">
      <motion.div
        className="flex gap-20 whitespace-nowrap"
        animate={{
          x: [0, -1500]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex gap-20">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-6"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-3xl text-[#1A1A1A]" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
                  {item}
                </span>
                <motion.span
                  className="text-2xl text-[#6B7D5C]"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✦
                </motion.span>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F0F0F] py-16 text-white sm:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
        <div className="mb-12 grid gap-10 sm:mb-16 md:grid-cols-4 md:gap-12">
          <div>
            <h4 className="text-3xl mb-6 text-white" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>نــورا</h4>
            <p className="text-white/70 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              الأناقة الخالدة تلتقي بالتصميم العصري في كل قطعة نصنعها. نسعى لتقديم حجابات فاخرة بأعلى معايير الجودة.
            </p>
            <p className="text-white/50 text-xs" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              الرياض، المملكة العربية السعودية
            </p>
          </div>

          <div style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <h5 className="text-sm mb-6 text-white" style={{ fontWeight: 500 }}>تسوق</h5>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">وصل حديثاً</a></li>
              <li><a href="#" className="hover:text-white transition-colors">المجموعات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأكثر مبيعاً</a></li>
              <li><a href="#" className="hover:text-white transition-colors">التخفيضات</a></li>
              <li><a href="#" className="hover:text-white transition-colors">بطاقات الهدايا</a></li>
            </ul>
          </div>

          <div style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <h5 className="text-sm mb-6 text-white" style={{ fontWeight: 500 }}>خدمة العملاء</h5>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الشحن والتوصيل</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الإرجاع والاستبدال</a></li>
              <li><a href="#" className="hover:text-white transition-colors">دليل المقاسات</a></li>
            </ul>
          </div>

          <div style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <h5 className="text-sm mb-6 text-white" style={{ fontWeight: 500 }}>تابعينا</h5>
            <ul className="space-y-3 text-sm text-white/70 mb-6">
              <li><a href="#" className="hover:text-white transition-colors">إنستغرام</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تيك توك</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تويتر</a></li>
              <li><a href="#" className="hover:text-white transition-colors">يوتيوب</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-white/50" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            © ٢٠٢٦ نورا. جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-col gap-3 text-sm text-white/50 sm:flex-row sm:gap-8" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
            <a href="#" className="hover:text-white transition-colors">سياسة الإرجاع</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CartPage({ cart, updateQuantity, removeFromCart, setCurrentPage }: any) {
  const subtotal = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#FAF8F5] relative overflow-x-hidden" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#F5F1EB] opacity-40" />

        {/* Decorative Shapes - Animated */}
        <motion.svg
          className="absolute top-32 right-12 w-64 h-64 opacity-[0.03]"
          viewBox="0 0 200 200"
          fill="none"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path d="M100 40C110 55 120 75 120 95C120 115 110 130 100 145C90 130 80 115 80 95C80 75 90 55 100 40Z" fill="#6B7D5C" />
        </motion.svg>
        <motion.svg
          className="absolute bottom-32 left-16 w-80 h-80 opacity-[0.025]"
          viewBox="0 0 200 200"
          fill="none"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="100" cy="100" r="60" fill="#6B7D5C" />
        </motion.svg>

        {/* Tree Branches - Top Left */}
        <motion.svg
          className="absolute top-20 left-0 w-96 h-96 opacity-[0.04]"
          viewBox="0 0 200 200"
          fill="none"
          animate={{
            x: [0, -10, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M20 100 Q 40 80, 60 100 M60 100 Q 70 90, 80 100 M60 100 Q 70 110, 80 120" stroke="#6B7D5C" strokeWidth="3" fill="none" />
          <path d="M60 100 Q 50 85, 40 80 M40 80 Q 35 75, 30 70" stroke="#6B7D5C" strokeWidth="2" fill="none" />
          <ellipse cx="30" cy="65" rx="8" ry="12" fill="#6B7D5C" opacity="0.3" />
          <ellipse cx="45" cy="75" rx="10" ry="15" fill="#6B7D5C" opacity="0.3" />
          <ellipse cx="75" cy="90" rx="9" ry="14" fill="#6B7D5C" opacity="0.3" />
        </motion.svg>

        {/* Olive Branch - Bottom Right */}
        <motion.svg
          className="absolute bottom-40 right-0 w-72 h-72 opacity-[0.035]"
          viewBox="0 0 200 200"
          fill="none"
          animate={{
            rotate: [0, 5, 0, -5, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M180 100 Q 160 95, 140 100 Q 120 105, 100 100" stroke="#6B7D5C" strokeWidth="2.5" fill="none" />
          <ellipse cx="165" cy="90" rx="8" ry="15" fill="#6B7D5C" opacity="0.4" transform="rotate(-30 165 90)" />
          <ellipse cx="165" cy="110" rx="8" ry="15" fill="#6B7D5C" opacity="0.4" transform="rotate(30 165 110)" />
          <ellipse cx="145" cy="92" rx="7" ry="13" fill="#6B7D5C" opacity="0.4" transform="rotate(-25 145 92)" />
          <ellipse cx="145" cy="108" rx="7" ry="13" fill="#6B7D5C" opacity="0.4" transform="rotate(25 145 108)" />
          <ellipse cx="125" cy="95" rx="9" ry="14" fill="#6B7D5C" opacity="0.4" transform="rotate(-20 125 95)" />
          <ellipse cx="125" cy="105" rx="9" ry="14" fill="#6B7D5C" opacity="0.4" transform="rotate(20 125 105)" />
        </motion.svg>

        {/* Small Leaves Cluster - Mid Right */}
        <motion.svg
          className="absolute top-2/3 right-24 w-48 h-48 opacity-[0.03]"
          viewBox="0 0 100 100"
          fill="none"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path d="M50 50C55 40, 65 35, 70 40C65 45, 60 48, 50 50Z" fill="#6B7D5C" opacity="0.5" />
          <path d="M50 50C45 40, 35 35, 30 40C35 45, 40 48, 50 50Z" fill="#6B7D5C" opacity="0.5" />
          <path d="M50 50C55 60, 65 65, 70 60C65 55, 60 52, 50 50Z" fill="#6B7D5C" opacity="0.5" />
          <path d="M50 50C45 60, 35 65, 30 60C35 55, 40 52, 50 50Z" fill="#6B7D5C" opacity="0.5" />
        </motion.svg>

        {/* Shopping Bag Icon Decoration - Animated */}
        <motion.svg
          className="absolute top-1/3 left-20 w-40 h-40 opacity-[0.02]"
          viewBox="0 0 100 100"
          fill="none"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M25 35 L75 35 L70 85 L30 85 Z" stroke="#6B7D5C" strokeWidth="2" fill="none"/>
          <path d="M35 35 L35 25 Q35 15, 50 15 Q65 15, 65 25 L65 35" stroke="#6B7D5C" strokeWidth="2" fill="none"/>
        </motion.svg>

        {/* Decorative Plus Grid - Animated */}
        <motion.div
          className="absolute top-1/2 right-16 opacity-[0.025]"
          animate={{
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M20 20 L20 40 M10 30 L30 30" stroke="#6B7D5C" strokeWidth="2" />
            <path d="M60 20 L60 40 M50 30 L70 30" stroke="#6B7D5C" strokeWidth="2" />
            <path d="M100 20 L100 40 M90 30 L110 30" stroke="#6B7D5C" strokeWidth="2" />
            <path d="M20 60 L20 80 M10 70 L30 70" stroke="#6B7D5C" strokeWidth="2" />
            <path d="M60 60 L60 80 M50 70 L70 70" stroke="#6B7D5C" strokeWidth="2" />
            <path d="M100 60 L100 80 M90 70 L110 70" stroke="#6B7D5C" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E5E5E0] shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-12">
          <div className="flex items-center gap-6 sm:gap-12">
            <h1
              className="cursor-pointer text-[2.1rem] tracking-wide text-[#1A1A1A] sm:text-3xl"
              style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}
              onClick={() => setCurrentPage('home')}
            >
              نــورا
            </h1>
          </div>
          <button
            onClick={() => setCurrentPage('home')}
            className="text-[#1A1A1A] hover:text-[#6B7D5C] transition-colors"
            style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Cart Content */}
      <div className="pt-24 pb-14 sm:pt-28 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-[1]">
          <h2 className="mb-8 text-3xl text-[#1A1A1A] sm:mb-10 sm:text-4xl md:mb-12 md:text-6xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
            سلة التسوق
          </h2>

          {cart.length === 0 ? (
            <div className="py-16 text-center sm:py-20">
              <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-[#E5E5E0] sm:h-20 sm:w-20" />
              <p className="mb-8 text-xl text-[#4A4A4A] sm:text-2xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                سلة التسوق فارغة
              </p>
              <button
                onClick={() => setCurrentPage('home')}
                className="w-full bg-[#6B7D5C] px-6 py-4 text-white hover:bg-[#5A6B4D] transition-colors duration-300 sm:w-auto sm:px-12"
                style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
              >
                تسوق الآن
              </button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {cart.map((item: CartItem) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 border border-[#E8E4DD] bg-[#FDFCFA] p-4 sm:gap-6 sm:p-6"
                    >
                      <div className="h-24 w-24 flex-shrink-0 bg-[#F5F3EE] sm:h-32 sm:w-32">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <h4 className="mb-1 text-base text-[#1A1A1A] sm:text-lg lg:text-xl" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                              {item.name}
                            </h4>
                            <p className="text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                              {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#4A4A4A] hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-[#F5F3EE] flex items-center justify-center hover:bg-[#E5E5E0] transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-base sm:text-lg" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-[#F5F3EE] flex items-center justify-center hover:bg-[#E5E5E0] transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-lg text-[#6B7D5C] sm:text-xl" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 600 }}>
                            {item.price * item.quantity} ريال
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="sticky top-24 border border-[#E8E4DD] bg-[#FDFCFA] p-5 shadow-lg sm:top-32 sm:p-8">
                  <h3 className="mb-6 text-xl text-[#1A1A1A] sm:text-2xl" style={{ fontFamily: 'Amiri, serif', fontWeight: 700 }}>
                    ملخص الطلب
                  </h3>
                  <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E5E0]">
                    <div className="flex justify-between text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      <span>المجموع الفرعي</span>
                      <span>{subtotal} ريال</span>
                    </div>
                    <div className="flex justify-between text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      <span>الشحن</span>
                      <span>{shipping === 0 ? 'مجاني' : `${shipping} ريال`}</span>
                    </div>
                    {subtotal < 200 && (
                      <p className="text-xs text-[#6B7D5C] bg-[#6B7D5C]/10 p-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                        أضف {200 - subtotal} ريال للحصول على شحن مجاني
                      </p>
                    )}
                  </div>
                  <div className="mb-8 flex justify-between text-lg text-[#1A1A1A] sm:text-xl" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 600 }}>
                    <span>الإجمالي</span>
                    <span>{total} ريال</span>
                  </div>
                  <button className="w-full bg-[#6B7D5C] text-white py-4 mb-4 hover:bg-[#5A6B4D] transition-colors duration-300" style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}>
                    إتمام الطلب
                  </button>
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="w-full border border-[#E5E5E0] text-[#1A1A1A] py-4 hover:bg-[#F5F3EE] transition-colors duration-300"
                    style={{ fontFamily: 'Tajawal, sans-serif', fontWeight: 500 }}
                  >
                    متابعة التسوق
                  </button>

                  <div className="mt-8 pt-8 border-t border-[#E5E5E0] space-y-4">
                    <div className="flex items-center gap-3 text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      <Truck className="w-5 h-5 text-[#6B7D5C]" />
                      <span>توصيل خلال ٢-٤ أيام عمل</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      <Shield className="w-5 h-5 text-[#6B7D5C]" />
                      <span>دفع آمن ومشفر</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[#4A4A4A]" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      <Package className="w-5 h-5 text-[#6B7D5C]" />
                      <span>إرجاع مجاني خلال ٣٠ يوم</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
