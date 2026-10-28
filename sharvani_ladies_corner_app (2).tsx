import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, Search, Mic, Heart, ShoppingCart, User, Menu, X, Star, 
  Trash2, Plus, Minus, CheckCircle, Clock, Truck, Tag, ShieldCheck, 
  Languages, Filter, ChevronRight, SlidersHorizontal, ArrowLeft, Download,
  Sparkles, Lock, BarChart3, Package, Layers, Settings, Eye, Volume2, ArrowUpRight, Check, MapPin
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Kanjeevaram Pure Silk Saree with Zari Work',
    category: 'Sarees',
    price: 1899,
    originalPrice: 4999,
    discount: 62,
    rating: 4.8,
    reviewsCount: 342,
    colors: ['Royal Blue', 'Magenta Pink', 'Emerald Green'],
    sizes: ['Free Size'],
    inStock: 15,
    tag: 'Best Seller',
    likesCount: 142,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1610030469830-4e5a953e5d61?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Exquisite handcrafted Kanjeevaram silk saree with intricate gold zari woven borders and matching blouse piece. Perfect for weddings and grand festive celebrations.',
    reviews: [
      { id: 'r1', author: 'Sravanthi R.', rating: 5, date: '2026-10-20', comment: 'చాలా అందమైన పట్టు చీర! Quality was amazing and fast delivery.' },
      { id: 'r2', author: 'Lakshmi K.', rating: 4.5, date: '2026-10-18', comment: 'Loved the gold zari work. Standard is supreme.' }
    ]
  },
  {
    id: 'p2',
    name: 'Designer Anarkali Cotton Kurti Set with Dupatta',
    category: 'Kurtis',
    price: 799,
    originalPrice: 1999,
    discount: 60,
    rating: 4.5,
    reviewsCount: 189,
    colors: ['Peach Pink', 'Sky Blue', 'Mint Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: 28,
    tag: 'Trending',
    likesCount: 98,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Pure breathable cotton flared Anarkali kurti featuring delicate embroidery on the neckline, paired with printed trousers and a light chiffon dupatta.'
  },
  {
    id: 'p3',
    name: 'Floral Print Georgette Maxi Evening Dress',
    category: 'Dresses',
    price: 999,
    originalPrice: 2499,
    discount: 60,
    rating: 4.6,
    reviewsCount: 112,
    colors: ['Dusty Rose', 'Lavender', 'Soft Yellow'],
    sizes: ['M', 'L', 'XL'],
    inStock: 10,
    tag: 'New Arrival',
    likesCount: 75,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80',
    description: 'Elegant tier-styled floral print maxi gown with a tie-up waist design. Extremely soft fabric suitable for daytime outings, parties, and college wear.'
  },
  {
    id: 'p4',
    name: 'Premium Leatherette Tote Handbag with Charm',
    category: 'Handbags',
    price: 649,
    originalPrice: 1499,
    discount: 56,
    rating: 4.7,
    reviewsCount: 520,
    colors: ['Beige', 'Classic Black', 'Maroon'],
    sizes: ['Standard'],
    inStock: 40,
    tag: 'Hot Deal',
    likesCount: 210,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    description: 'Spacious multi-compartment tote handbag crafted with high-grade durable leatherette material. Comes with a gold-tone metallic charm embellishment.'
  },
  {
    id: 'p5',
    name: 'Traditional Antique Kundan Jhumka Earrings Set',
    category: 'Earrings',
    price: 349,
    originalPrice: 899,
    discount: 61,
    rating: 4.9,
    reviewsCount: 610,
    colors: ['Gold Red', 'Gold Green', 'Pearl White'],
    sizes: ['Standard'],
    inStock: 50,
    tag: 'Customer Favorite',
    likesCount: 315,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted ethnic Jhumka earrings adorned with Kundan gemstones and soft freshwater pearl drops.'
  },
  {
    id: 'p5b',
    name: 'Royal Velvet Silk Thread Bangle Set (24 Pcs)',
    category: 'Bangles',
    price: 299,
    originalPrice: 699,
    discount: 57,
    rating: 4.8,
    reviewsCount: 215,
    colors: ['Maroon Gold', 'Royal Blue', 'Green'],
    sizes: ['2.4', '2.6', '2.8'],
    inStock: 30,
    tag: 'Best Seller',
    likesCount: 180,
    image: 'https://images.unsplash.com/photo-1611591475285-a30ba4587383?auto=format&fit=crop&w=600&q=80',
    description: 'Traditional handcrafted velvet and gold zari thread bangles set suitable for weddings and festive functions.'
  },
  {
    id: 'p5c',
    name: 'Gold Plated Temple Coin Neck Chain & Choker',
    category: 'Chains',
    price: 549,
    originalPrice: 1299,
    discount: 58,
    rating: 4.7,
    reviewsCount: 178,
    colors: ['Micro Gold Polish'],
    sizes: ['Adjustable'],
    inStock: 25,
    tag: 'Trending',
    likesCount: 240,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    description: 'High-polish anti-tarnish temple design gold chain with Goddess Lakshmi coin motifs and adjustable back chain link.'
  },
  {
    id: 'p6',
    name: 'Matte Liquid Lipstick Trio Kit - Festive Nudes',
    category: 'Beauty Products',
    price: 399,
    originalPrice: 899,
    discount: 55,
    rating: 4.4,
    reviewsCount: 230,
    colors: ['Multi Matte'],
    sizes: ['15ml Set'],
    inStock: 35,
    tag: 'Top Rated',
    likesCount: 165,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    description: 'Long-lasting 12-hour transferproof liquid lipsticks enriched with Vitamin E and Argan oil for non-drying comfortable daily wear.'
  },
  {
    id: 'p7',
    name: 'Soft Satin Nightwear Robe & Nighty Set',
    category: 'Nightwear',
    price: 599,
    originalPrice: 1199,
    discount: 50,
    rating: 4.3,
    reviewsCount: 95,
    colors: ['Wine Red', 'Navy Blue', 'Blush Pink'],
    sizes: ['M', 'L', 'XL'],
    inStock: 18,
    tag: 'Special Offer',
    likesCount: 64,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
    description: 'Luxurious silky soft satin 2-piece nightgown set featuring lace detailing on sleeve cuffs and smooth breathable fabric.'
  },
  {
    id: 'p8',
    name: 'Embroidered Banarasi Organza Dupatta',
    category: 'Fashion Accessories',
    price: 349,
    originalPrice: 799,
    discount: 56,
    rating: 4.6,
    reviewsCount: 140,
    colors: ['Yellow', 'Crimson Pink', 'Pista Green'],
    sizes: ['2.25 Meters'],
    inStock: 22,
    tag: 'Trending',
    likesCount: 88,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    description: 'Lightweight crisp Organza dupatta highlighted with delicate gold zari embroidery motifs and scallop border detailing.'
  }
];

const CATEGORIES = [
  'All', 'Sarees', 'Kurtis', 'Dresses', 'Nightwear', 'Western Wear', 
  'Traditional Wear', 'Handbags', 'Earrings', 'Bangles', 'Chains', 'Jewelry', 
  'Beauty Products', 'Fashion Accessories', 'New Arrivals', 'Best Sellers'
];

export default function App() {
  // App States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(['p1', 'p5']); // liked product IDs
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // WELCOME BANNER MODAL ON FIRST VISIT
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  // View Control
  const [currentView, setCurrentView] = useState('home'); // 'home', 'cart', 'checkout', 'orders', 'admin', 'wishlist'
  
  // Default user starts as Customer (No Admin controls visible by default)
  const [user, setUser] = useState({ 
    name: 'Customer Guest', 
    email: 'customer@sharvani.com', 
    mobile: '+91 9876543210', 
    isLoggedIn: false, 
    role: 'customer' 
  });
  
  const MASTER_ADMIN_EMAIL = 'kolabhargavi292@gmail.com';
  const isAdmin = user.isLoggedIn && (user.email.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() || user.role === 'developer');

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMethod, setAuthMethod] = useState('gmail'); // 'gmail', 'mobile'
  const [inputEmail, setInputEmail] = useState('');
  const [inputMobile, setInputMobile] = useState('');
  const [language, setLanguage] = useState('te'); // 'te' for Telugu, 'en' for English
  
  // Voice Assistant States
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'ORD-88231',
      date: '2026-10-25',
      items: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[4]],
      totalAmount: 2398,
      status: 'Out for Delivery',
      deliveryAddress: 'H.No 4-12, Madhapur, Jubilee Hills Road, Hyderabad, Telangana - 500081',
      paymentMethod: 'UPI (Google Pay)'
    }
  ]);

  // Filters State
  const [priceFilter, setPriceFilter] = useState(5000);
  const [sortBy, setSortBy] = useState('popular');

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // --- ENHANCED VOICE SYNTHESIS & RECOGNITION SETUP ---
  const speakText = (text, langCode = 'te-IN') => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.pitch = 1.0;
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const teVoice = voices.find(v => v.lang.includes('te') || v.lang.includes('IN'));
      if (teVoice) {
        utterance.voice = teVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log("Speech synthesis error handled gracefully:", e);
    }
  };

  // AUTO-WELCOME CUSTOMERS IN TELUGU ON FIRST USER INTERACTION OR LOAD
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasWelcomed) {
        setHasWelcomed(true);
        const welcomeText = "శర్వాణి లేడీస్ కార్నర్ కు స్వాగతం! మీ స్టైల్, మీ ఎంపిక. మీ కోసం లేటెస్ట్ చీరలు, కుర్తీలు మరియు జ్యువెలరీ ఆఫర్లలో ఉన్నాయి. మైక్రోఫోన్ నొక్కి మాట్లాడండి.";
        setVoiceFeedback(welcomeText);
        speakText(welcomeText);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [hasWelcomed]);

  const processTeluguVoiceCommand = async (command) => {
    const lowerCmd = command.toLowerCase();
    setVoiceFeedback(`మీరు చెప్పింది: "${command}"`);

    // Direct local pattern matching for fast & accurate responses
    if (lowerCmd.includes('చీర') || lowerCmd.includes('saree')) {
      setActiveCategory('Sarees');
      const msg = 'మీ కోసం పట్టు మరియు కాటన్ చీరలను వెతికి చూపిస్తున్నాను.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    if (lowerCmd.includes('కుర్తీ') || lowerCmd.includes('kurti')) {
      setActiveCategory('Kurtis');
      const msg = 'మీ కోసం ట్రెండింగ్ అనర్కలి కుర్తీలను చూపిస్తున్నాను.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    if (lowerCmd.includes('చెవిపోగు') || lowerCmd.includes('earring') || lowerCmd.includes('జూమ్కా')) {
      setActiveCategory('Earrings');
      const msg = 'మీ కోసం అందమైన కుందన్ జుంకాలు మరియు చెవిపోగులు ఇక్కడ ఉన్నాయి.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    if (lowerCmd.includes('గాజులు') || lowerCmd.includes('bangle')) {
      setActiveCategory('Bangles');
      const msg = 'మీ కోసం రాయల్ వెల్వెట్ గాజుల కలెక్షన్‌ను చూపిస్తున్నాను.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    if (lowerCmd.includes('చైన్') || lowerCmd.includes('గొలుసు') || lowerCmd.includes('chain')) {
      setActiveCategory('Chains');
      const msg = 'గోల్డ్ ప్లేటెడ్ టెంపుల్ చైన్లు మరియు చోకర్లు ఇక్కడ ఉన్నాయి.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    if (lowerCmd.includes('500') || lowerCmd.includes('ఐదు వందల')) {
      setPriceFilter(500);
      const msg = 'ఐదు వందల రూపాయల లోపు ఉన్న ఉత్తమ ఫ్యాషన్ వస్తువులను చూపిస్తున్నాను.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    if (lowerCmd.includes('కార్ట్') || lowerCmd.includes('cart')) {
      setCurrentView('cart');
      const msg = `మీ కార్ట్ తెరిచాను. ఇందులో ${cart.length} వస్తువులు ఉన్నాయి.`;
      speakText(msg);
      return;
    }

    if (lowerCmd.includes('లైక్స్') || lowerCmd.includes('లైక్') || lowerCmd.includes('wishlist') || lowerCmd.includes('like')) {
      setCurrentView('wishlist');
      const msg = `మీరు ఇష్టపడిన ${wishlist.length} ఉత్పత్తులు ఇక్కడ ఉన్నాయి.`;
      speakText(msg);
      return;
    }

    if (lowerCmd.includes('ఆర్డర్') || lowerCmd.includes('order')) {
      setCurrentView('orders');
      const msg = 'మీ ఆర్డర్ల డెలివరీ వివరాలు ఇక్కడ చూడవచ్చు.';
      speakText(msg);
      return;
    }

    if (lowerCmd.includes('పింక్') || lowerCmd.includes('pink')) {
      setSearchQuery('Pink');
      const msg = 'పింక్ రంగు దుస్తుల జాబితా ఇక్కడ ఉంది.';
      speakText(msg);
      setCurrentView('home');
      return;
    }

    // Call Gemini API for complex queries if available
    try {
      const systemPrompt = "You are a friendly Telugu retail shopping assistant for 'Sharvani Ladies Corner'. The customer said something in Telugu or English. Understand their query and output a concise response in natural conversational Telugu language. Keep response under 25 words.";
      const userQuery = `Customer query: "${command}". Standard store products available: Sarees, Kurtis, Dresses, Handbags, Jewelry, Beauty.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "మీ ప్రశ్నను అర్థం చేసుకున్నాను. శర్వాణి లేడీస్ కార్నర్‌లో కొత్త కలెక్షన్‌ను చూడండి.";
      setVoiceFeedback(reply);
      speakText(reply);
    } catch (err) {
      const fallbackMsg = "క్షమించండి, మీ వాయిస్ కమాండ్ శోధన ప్రక్రియ పూర్తి చేశాము.";
      speakText(fallbackMsg);
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("వాయిస్ శోధన మీ బ్రౌజర్‌లో అందుబాటులో లేదు. దయచేసి టైప్ చేసి వెతకండి.");
      return;
    }

    // Play prompt sound/audio asking user to speak
    speakText("వినబడుతోంది, దయచేసి మాట్లాడండి...");

    setTimeout(() => {
      const recognition = new SpeechRecognition();
      recognition.lang = 'te-IN'; // Default to Telugu
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setShowVoiceModal(true);
      setIsListening(true);
      setVoiceFeedback('మాట్లాడండి... వింటున్నాము (Listening...)');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        processTeluguVoiceCommand(transcript);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        const errText = 'క్షమించండి, సరిగ్గా వినపడలేదు. మైక్ నొక్కి మళ్లీ మాట్లాడండి.';
        setVoiceFeedback(errText);
        speakText(errText);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }, 1500);
  };

  // Cart & Wishlist Handlers
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: product.sizes[0] || 'Free Size', selectedColor: product.colors[0] || 'Default' }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Toggle Like / Wishlist for Products
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const isLiked = prev.includes(product.id);
      
      // Update the product's live likes count
      setProducts(allProducts => allProducts.map(p => {
        if (p.id === product.id) {
          return { ...p, likesCount: p.likesCount + (isLiked ? -1 : 1) };
        }
        return p;
      }));

      if (isLiked) {
        return prev.filter(id => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  // Calculate Cart Totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal > 999 || cart.length === 0 ? 0 : 60;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + deliveryCharge);

  // Filtered & Sorted Products
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' 
      ? true 
      : activeCategory === 'New Arrivals' ? p.tag === 'New Arrival'
      : activeCategory === 'Best Sellers' ? p.tag === 'Best Seller'
      : p.category === activeCategory;
    
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.colors.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPrice = p.price <= priceFilter;

    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'likes') return (b.likesCount || 0) - (a.likesCount || 0);
    return 0;
  });

  const likedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-pink-50/40 text-gray-800 font-sans flex flex-col antialiased">
      
      {/* WELCOME TO SHARVANI LADIES CORNER MODAL */}
      {showWelcomeBanner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-pink-200 text-center space-y-4 animate-in fade-in zoom-in-95 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md">
              <ShoppingBag className="w-8 h-8" />
            </div>

            <div>
              <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Official Fashion App
              </span>
              <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 mt-1">
                Welcome to Sharvani Ladies Corner!
              </h2>
              <p className="text-xs font-bold text-pink-500 uppercase tracking-widest mt-0.5">
                మీ స్టైల్, మీ ఎంపిక • Your Style, Your Choice
              </p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-pink-50/70 p-3.5 rounded-2xl border border-pink-100">
              అందమైన పట్టు చీరలు, అనర్కలి కుర్తీలు, ఫ్యాషన్ గాజులు మరియు జ్యువెలరీ అతి తక్కువ ధరలలో లభిస్తాయి. తెలుగు వాయిస్ సర్చ్ సహాయంతో తేలికగా షోపింగ్ చేయండి!
            </p>

            <button
              onClick={() => {
                setShowWelcomeBanner(false);
                speakText("శర్వాణి లేడీస్ కార్నర్ కు స్వాగతం! మీ స్టైల్, మీ ఎంపిక.");
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-2xl shadow-md text-xs transition transform hover:scale-102 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Start Shopping (షోపింగ్ ప్రారంభించండి)
            </button>
          </div>
        </div>
      )}

      {/* --- TOP BRAND HEADER BAR --- */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-pink-100">
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide flex justify-between items-center">
          <span>{language === 'te' ? '🎉 ఉచిత డెలివరీ ₹999 పైన కొనుగోలుపై! | CASH ON DELIVERY అందుబాటులో ఉంది' : '🎉 Free Delivery on orders above ₹999! | Cash on Delivery Available'}</span>
          <button 
            onClick={() => setLanguage(l => l === 'te' ? 'en' : 'te')}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-white font-semibold transition"
          >
            <Languages className="w-3.5 h-3.5" />
            {language === 'te' ? 'English' : 'తెలుగు'}
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* LOGO & BRAND */}
          <div 
            onClick={() => { setCurrentView('home'); setSelectedProduct(null); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition transform">
              <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800">
                SHARVANI
              </h1>
              <p className="text-[10px] font-bold tracking-widest text-pink-500 uppercase -mt-1">
                LADIES CORNER • {language === 'te' ? 'మీ స్టైల్, మీ ఎంపిక' : 'Your Style, Your Choice'}
              </p>
            </div>
          </div>

          {/* SEARCH BAR & TELUGU VOICE ASSISTANT BUTTON */}
          <div className="hidden md:flex flex-1 max-w-xl relative items-center">
            <input
              type="text"
              placeholder={language === 'te' ? "చీరలు, కుర్తీలు, చెవిపోగులు (Earrings), గాజులు, గొలుసులు వెతకండి..." : "Search sarees, kurtis, earrings, bangles, chains..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-pink-200 rounded-full py-2.5 pl-10 pr-24 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
            
            {/* Clear search query button */}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-28 text-gray-400 hover:text-gray-600 p-1"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {/* TELUGU MIC & VOICE OVER BUTTONS */}
            <div className="absolute right-1.5 flex items-center gap-1">
              <button
                onClick={startVoiceRecognition}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-2.5 py-1.5 rounded-full flex items-center gap-1 text-xs font-medium shadow transition hover:scale-105"
                title="Telugu Voice Search"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span>{language === 'te' ? 'వాయిస్' : 'Voice'}</span>
              </button>
              
              <button
                onClick={() => {
                  setShowVoiceModal(true);
                  speakText("శర్వాణి లేడీస్ కార్నర్ కి స్వాగతం! వాయిస్ ఓవర్ సహాయకుడు సిద్ధంగా ఉంది.");
                }}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-1.5 rounded-full flex items-center shadow-sm border border-purple-300 transition"
                title="Telugu Voice Over Player"
              >
                <Volume2 className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>

          {/* HEADER NAV ACTIONS */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* ONLY DISPLAY ADMIN DASHBOARD BUTTON IF LOGGED IN AS MASTER ADMIN */}
            {isAdmin && (
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition shadow-xs ${
                  currentView === 'admin' 
                    ? 'bg-purple-700 text-white ring-2 ring-purple-400' 
                    : 'bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-purple-600 fill-purple-200" />
                {currentView === 'admin' ? 'Customer Preview' : 'Admin Hub'}
              </button>
            )}

            {/* Orders */}
            <button 
              onClick={() => setCurrentView('orders')}
              className="hidden sm:flex flex-col items-center text-gray-600 hover:text-pink-600 text-xs font-medium"
            >
              <Package className="w-5 h-5 mb-0.5" />
              <span>{language === 'te' ? 'ఆర్డర్లు' : 'Orders'}</span>
            </button>

            {/* Wishlist / Likes Icon */}
            <button 
              onClick={() => setCurrentView('wishlist')}
              className="relative text-gray-600 hover:text-pink-600 flex flex-col items-center text-xs font-medium cursor-pointer"
            >
              <Heart className={`w-5 h-5 mb-0.5 ${wishlist.length > 0 ? 'text-pink-600 fill-pink-500' : ''}`} />
              <span className="hidden sm:inline">{language === 'te' ? 'ఇష్టమైనవి' : 'Likes'}</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => setCurrentView('cart')}
              className="relative bg-pink-50 hover:bg-pink-100 p-2 rounded-full text-pink-600 transition flex items-center"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* User Profile / Auth Toggle */}
            <div 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 cursor-pointer border-l border-gray-200 pl-3"
            >
              <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs border ${
                isAdmin 
                  ? 'bg-purple-700 text-white border-purple-800' 
                  : 'bg-pink-100 text-pink-700 border-pink-300'
              }`}>
                {user.isLoggedIn ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-gray-800 leading-none">
                  {user.isLoggedIn ? user.name : (language === 'te' ? 'లాగిన్ చేయండి' : 'Sign In')}
                </p>
                <p className="text-[10px] text-pink-600 font-bold mt-0.5">
                  {isAdmin ? 'Store Owner (Admin)' : user.isLoggedIn ? user.email : 'Account'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div className="md:hidden px-4 pb-3 pt-1 flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              placeholder={language === 'te' ? "వస్తువులు, చెవిపోగులు, గాజులు వెతకండి..." : "Search items, earrings, bangles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-pink-200 rounded-full py-2 pl-9 pr-10 text-xs focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={startVoiceRecognition}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full shadow"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setShowVoiceModal(true);
              speakText("శర్వాణి లేడీస్ కార్నర్ కి స్వాగతం!");
            }}
            className="bg-purple-100 text-purple-700 p-2 rounded-full shadow border border-purple-200"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --- CATEGORY NAVIGATION TABS --- */}
      <nav className="bg-white border-b border-pink-100 shadow-2xs overflow-x-auto no-scrollbar py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelectedProduct(null); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeCategory === cat 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full">
        
        {/* SEPARATE TELUGU VOICE-OVER PLAYER MODAL */}
        {showVoiceModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-pink-100 relative text-center space-y-4 animate-in fade-in zoom-in-95">
              <button 
                onClick={() => {
                  setShowVoiceModal(false);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-md">
                <Volume2 className={`w-8 h-8 ${isSpeaking ? 'animate-bounce' : ''}`} />
              </div>

              <div>
                <h3 className="text-base font-bold text-gray-800">తెలుగు వాయిస్ ఓవర్ అసిస్టెంట్</h3>
                <p className="text-xs text-purple-600 font-semibold mt-0.5">Telugu Voice-Over Audio Controls</p>
              </div>

              <div className="bg-pink-50 p-3.5 rounded-2xl border border-pink-100 text-xs text-gray-700 min-h-[60px] flex items-center justify-center font-medium">
                {voiceFeedback || "వస్తువు వివరాలు లేదా ఆఫర్ల వివరాలను వినడానికి వాయిస్ ప్లే నొక్కండి."}
              </div>

              {/* VOICE CONTROLS BUTTONS */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => speakText("శర్వాణి లేడీస్ కార్నర్‌లో కాటన్ చీరలు, అనర్కలి కుర్తీలు మరియు చెవిపోగులపై ఆఫర్లు ఉన్నాయి.")}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 rounded-xl shadow flex items-center justify-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" /> ఆఫర్లు వినండి
                </button>

                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                    setVoiceFeedback('వాయిస్ ఓవర్ ఆపబడింది.');
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl border border-gray-300 flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" /> ఆపివేయండి (Stop)
                </button>
              </div>

              <button
                onClick={() => {
                  setShowVoiceModal(false);
                  startVoiceRecognition();
                }}
                className="w-full bg-purple-50 text-purple-700 font-bold py-2 rounded-xl text-xs border border-purple-200 flex items-center justify-center gap-1.5"
              >
                <Mic className="w-4 h-4" /> వాయిస్ సర్చ్ మాట్లాడండి (Speak)
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW SWITCHER --- */}
        {selectedProduct ? (
          <ProductDetailsView 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={() => addToCart(selectedProduct)}
            onBuyNow={() => { addToCart(selectedProduct); setCurrentView('cart'); setSelectedProduct(null); }}
            onToggleWishlist={() => toggleWishlist(selectedProduct)}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            language={language}
            speakText={speakText}
          />
        ) : currentView === 'cart' ? (
          <CartView 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            finalTotal={finalTotal}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedDiscount={appliedDiscount}
            setAppliedDiscount={setAppliedDiscount}
            onProceedToCheckout={() => setCurrentView('checkout')}
            onContinueShopping={() => setCurrentView('home')}
            language={language}
          />
        ) : currentView === 'checkout' ? (
          <CheckoutView 
            cart={cart}
            finalTotal={finalTotal}
            user={user}
            onOrderSuccess={(order) => {
              setOrders([order, ...orders]);
              setCart([]);
              setCurrentView('orders');
            }}
            onBackToCart={() => setCurrentView('cart')}
            language={language}
          />
        ) : currentView === 'orders' ? (
          <OrdersTrackerView 
            orders={orders}
            onShopMore={() => setCurrentView('home')}
            language={language}
          />
        ) : currentView === 'admin' ? (
          <AdminDashboard 
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            developerUser={user}
          />
        ) : currentView === 'wishlist' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">
              {language === 'te' ? `మీరు ఇష్టపడిన ఉత్పత్తులు (${likedProducts.length})` : `Liked Products (${likedProducts.length})`}
            </h2>
            {likedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-pink-100">
                <Heart className="w-12 h-12 text-pink-300 mx-auto mb-3" />
                <p className="text-xs text-gray-500">మీరు ఇంకా ఏ వస్తువులను ఇష్టపడలేదు. (No liked items yet)</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {likedProducts.map(product => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onSelect={() => setSelectedProduct(product)}
                    onAddToCart={() => addToCart(product)}
                    onToggleWishlist={() => toggleWishlist(product)}
                    isWishlisted={true}
                    language={language}
                    speakText={speakText}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* HOME PAGE CATALOG VIEW */
          <div className="space-y-6">
            
            {/* BANNER PROMOTION */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
              <div className="max-w-md space-y-2 relative z-10">
                <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                  {language === 'te' ? 'ప్రత్యేక శ్రావణ దసరా సేల్' : 'Festive Dussehra Sale'}
                </span>
                <h2 className="text-2xl md:text-3xl font-black leading-tight">
                  {language === 'te' ? 'పట్టు చీరలు & కుర్తీలపై 60% వరకు తగ్గింపు!' : 'Up to 60% Off on Silk Sarees & Kurtis'}
                </h2>
                <p className="text-xs text-pink-100">
                  {language === 'te' ? 'తాజా కస్టమ్ డిజైన్లు & జ్యువెలరీ కాంబోలు అందుబాటులో ఉన్నాయి.' : 'Latest trendy festive designs & gold-finish jewelry sets.'}
                </p>
              </div>
              <Sparkles className="w-32 h-32 absolute -right-4 -bottom-4 text-white/10 pointer-events-none" />
            </div>

            {/* FILTER & SORT CONTROLS */}
            <div className="bg-white p-4 rounded-2xl border border-pink-100 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-700 flex items-center gap-1">
                  <Filter className="w-4 h-4 text-pink-600" /> Filter Max Price: ₹{priceFilter}
                </span>
                <input 
                  type="range" 
                  min="300" 
                  max="5000" 
                  step="100"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(Number(e.target.value))}
                  className="accent-pink-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-1.5 outline-none font-bold text-gray-700"
                >
                  <option value="popular">Popularity</option>
                  <option value="likes">Most Liked ❤️</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-gray-800">
                  {activeCategory} Products ({filteredProducts.length})
                </h3>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-pink-100">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-700">వస్తువులు ఏవీ దొరకలేదు (No products found)</p>
                  <p className="text-xs text-gray-400 mt-1">వేరే పేరుతో వెతకండి లేదా ఫిల్టర్ రీసెట్ చేయండి.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      onSelect={() => setSelectedProduct(product)}
                      onAddToCart={() => addToCart(product)}
                      onToggleWishlist={() => toggleWishlist(product)}
                      isWishlisted={wishlist.includes(product.id)}
                      language={language}
                      speakText={speakText}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* --- AUTHENTICATION MODAL --- */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-pink-100 relative space-y-4">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow">
                <User className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {user.isLoggedIn ? 'User Account Details' : 'Sign In / Account Access'}
              </h3>
              <p className="text-xs text-gray-500">
                {user.isLoggedIn ? `Currently logged in as ${user.email}` : 'Sign in as customer or shop administrator'}
              </p>
            </div>

            {user.isLoggedIn ? (
              <div className="space-y-3 pt-2">
                <div className="bg-pink-50 p-3.5 rounded-2xl border border-pink-100 text-xs space-y-1 text-gray-700">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-500">{user.mobile}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${isAdmin ? 'bg-purple-200 text-purple-800' : 'bg-pink-200 text-pink-800'}`}>
                    Role: {isAdmin ? 'Admin / Developer' : 'Customer'}
                  </span>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => {
                      setCurrentView('admin');
                      setShowAuthModal(false);
                    }}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 rounded-xl text-xs shadow flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-4 h-4" /> Open Admin Dashboard
                  </button>
                )}

                <button
                  onClick={() => {
                    setUser({ name: 'Customer Guest', email: 'customer@sharvani.com', mobile: '+91 9876543210', isLoggedIn: false, role: 'customer' });
                    setCurrentView('home');
                    setShowAuthModal(false);
                  }}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl text-xs border border-red-200"
                >
                  Logout Account
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 border-b border-gray-100 pb-2">
                  <button
                    onClick={() => setAuthMethod('gmail')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      authMethod === 'gmail' ? 'bg-pink-100 text-pink-700' : 'text-gray-500'
                    }`}
                  >
                    Google Email
                  </button>
                  <button
                    onClick={() => setAuthMethod('mobile')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      authMethod === 'mobile' ? 'bg-pink-100 text-pink-700' : 'text-gray-500'
                    }`}
                  >
                    Phone Number
                  </button>
                </div>

                {authMethod === 'gmail' ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder="Enter Gmail address"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                    <button
                      onClick={() => {
                        const emailToUse = inputEmail.trim() || 'customer@gmail.com';
                        const isMaster = emailToUse.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
                        setUser({ 
                          name: isMaster ? 'Kola Bhargavi (Admin)' : emailToUse.split('@')[0], 
                          email: emailToUse, 
                          mobile: '+91 9876543210', 
                          isLoggedIn: true, 
                          role: isMaster ? 'developer' : 'customer' 
                        });
                        if (isMaster) setCurrentView('admin');
                        setShowAuthModal(false);
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2.5 rounded-xl text-xs shadow"
                    >
                      Sign In with Email
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="tel"
                      value={inputMobile}
                      onChange={(e) => setInputMobile(e.target.value)}
                      placeholder="Enter Mobile Number"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-pink-500 outline-none"
                    />
                    <button
                      onClick={() => {
                        const phoneToUse = inputMobile.trim() || '+91 9876543210';
                        setUser({ name: 'Customer User', email: 'user@sharvani.com', mobile: phoneToUse, isLoggedIn: true, role: 'customer' });
                        setShowAuthModal(false);
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2.5 rounded-xl text-xs shadow"
                    >
                      Send OTP & Login
                    </button>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-100 text-center space-y-1.5">
                  <p className="text-[10px] text-purple-700 font-bold">Sign In as Admin Store Owner:</p>
                  <button
                    onClick={() => {
                      setUser({ 
                        name: 'Kola Bhargavi (Admin)', 
                        email: MASTER_ADMIN_EMAIL, 
                        mobile: '+91 9876543210', 
                        isLoggedIn: true, 
                        role: 'developer' 
                      });
                      setCurrentView('admin');
                      setShowAuthModal(false);
                    }}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-xl text-xs shadow flex items-center justify-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" /> Login as Admin ({MASTER_ADMIN_EMAIL})
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

// 1. PRODUCT CARD COMPONENT WITH TELUGU VOICE OVER BUTTON
function ProductCard({ product, onSelect, onAddToCart, onToggleWishlist, isWishlisted, language, speakText }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-pink-100/80 shadow-sm hover:shadow-md transition group flex flex-col h-full relative">
      <div className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer" onClick={onSelect}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        
        {/* INTERACTIVE LIKE BUTTON & COUNTER */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(); }}
          className={`absolute top-2.5 right-2.5 px-2.5 py-1.5 rounded-full backdrop-blur-md transition flex items-center gap-1 text-xs font-bold shadow ${
            isWishlisted 
              ? 'bg-pink-600 text-white' 
              : 'bg-white/90 text-gray-700 hover:text-pink-600 hover:bg-white'
          }`}
          title={isWishlisted ? "Unlike" : "Like"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          <span>{product.likesCount || 0}</span>
        </button>

        {/* TELUGU VOICE OVER AUDIO SPEECH BUTTON ON CARD */}
        <button
          onClick={(e) => { 
            e.stopPropagation(); 
            if (speakText) {
              speakText(`${product.name}. ధర ${product.price} రూపాయలు. ${product.discount} శాతం డిస్కౌంట్ ఉచిత డెలివరీ.`);
            }
          }}
          className="absolute bottom-2.5 right-2.5 bg-purple-700/80 hover:bg-purple-800 text-white p-1.5 rounded-full backdrop-blur-md transition shadow"
          title="TELUGU VOICE OVER AUDIO"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>

        {product.tag && (
          <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
            {product.tag}
          </span>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wide text-purple-600">{product.category}</span>
          <h4 
            onClick={onSelect}
            className="text-xs font-semibold text-gray-800 line-clamp-2 hover:text-pink-600 cursor-pointer mt-0.5"
          >
            {product.name}
          </h4>
          
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
              {product.rating} <Star className="w-2.5 h-2.5 fill-current" />
            </span>
            <span className="text-[10px] text-gray-400">({product.reviewsCount})</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-3 pt-2 border-t border-gray-100">
          <div>
            <span className="text-sm font-extrabold text-gray-900">₹{product.price}</span>
            <span className="text-[10px] text-gray-400 line-through ml-1.5">₹{product.originalPrice}</span>
          </div>
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
            {product.discount}% OFF
          </span>
        </div>

        <button
          onClick={onAddToCart}
          className="w-full mt-3 bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-pink-200"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {language === 'te' ? 'కార్ట్‌లో చేర్చు' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// 2. PRODUCT DETAILS VIEW COMPONENT WITH MULTI-PHOTO GALLERY
function ProductDetailsView({ product, onBack, onAddToCart, onBuyNow, onToggleWishlist, isWishlisted, language, speakText }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  
  // Multi-image gallery list fallback
  const productPhotos = (product.images && product.images.length > 0) 
    ? product.images 
    : [product.image];

  const [activePhoto, setActivePhoto] = useState(productPhotos[0]);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-pink-100">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-pink-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        {/* TELUGU VOICE OVER FOR DETAILS */}
        <button
          onClick={() => {
            if (speakText) {
              speakText(`${product.name}. వర్గం ${product.category}. వెల ${product.price} రూపాయలు. ${product.description}`);
            }
          }}
          className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-200 flex items-center gap-1.5 transition"
        >
          <Volume2 className="w-4 h-4 text-purple-600" /> తెలుగు వాయిస్ ఆడియో వినండి
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* MULTI-PHOTO GALLERY DISPLAY */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner relative">
            <img src={activePhoto} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
            
            <button
              onClick={onToggleWishlist}
              className={`absolute top-4 right-4 px-3 py-1.5 rounded-full backdrop-blur-md transition flex items-center gap-1.5 text-xs font-bold shadow ${
                isWishlisted 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-white/90 text-gray-700 hover:text-pink-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              <span>{product.likesCount || 0} Likes</span>
            </button>
          </div>

          {/* PHOTO THUMBNAIL SELECTOR BAR */}
          {productPhotos.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {productPhotos.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(imgUrl)}
                  className={`w-16 h-16 rounded-xl border-2 overflow-hidden flex-shrink-0 transition ${
                    activePhoto === imgUrl ? 'border-pink-600 ring-2 ring-pink-300' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS CONTENT */}
        <div className="space-y-5">
          <div>
            <span className="bg-pink-100 text-pink-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{product.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                {product.rating} <Star className="w-3 h-3 fill-current" />
              </span>
              <span className="text-xs text-gray-500 font-medium">({product.reviews ? product.reviews.length : product.reviewsCount}) Customer Reviews</span>
            </div>
          </div>

          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-gray-900">₹{product.price}</span>
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md">
              {product.discount}% OFF
            </span>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>

          {/* COLOR SELECTION */}
          {product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Select Color</label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      selectedColor === color 
                        ? 'border-pink-600 bg-pink-50 text-pink-700 font-bold' 
                        : 'border-gray-200 text-gray-600 hover:border-pink-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIZE SELECTION */}
          {product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Select Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold border flex items-center justify-center transition ${
                      selectedSize === size 
                        ? 'border-pink-600 bg-pink-50 text-pink-700' 
                        : 'border-gray-200 text-gray-600 hover:border-pink-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={onAddToCart}
              className="flex-1 bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold py-3 rounded-2xl border border-pink-300 flex items-center justify-center gap-2 text-xs transition"
            >
              <ShoppingCart className="w-4 h-4" /> Add To Cart
            </button>
            <button
              onClick={onBuyNow}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-2xl shadow flex items-center justify-center gap-2 text-xs transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* --- CUSTOMER REVIEWS SECTION UNDER PRODUCT --- */}
      <ProductReviewsSection product={product} />
    </div>
  );
}

// REVIEWS & REVIEW SUBMISSION COMPONENT
function ProductReviewsSection({ product }) {
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !newAuthor.trim()) return;

    const reviewObj = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: Number(newRating),
      date: new Date().toISOString().split('T')[0],
      comment: newComment
    };

    setReviewsList([reviewObj, ...reviewsList]);
    product.reviews = [reviewObj, ...(product.reviews || [])];
    setNewComment('');
    setNewAuthor('');
    alert("ధన్యవాదాలు! మీ రివ్యూ జతచేయబడింది. (Thank you! Your review has been added.)");
  };

  return (
    <div className="mt-10 pt-8 border-t border-pink-100 space-y-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" /> Customer Ratings & Reviews ({reviewsList.length})
      </h3>

      {/* SUBMIT A REVIEW FORM */}
      <form onSubmit={handleSubmitReview} className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 space-y-3 text-xs">
        <h4 className="font-bold text-gray-800">Write a Review for this product</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Your Name (మీ పేరు)"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
          />

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">Rating:</span>
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl p-2 font-bold outline-none"
            >
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
              <option value="3">⭐⭐⭐ 3 Stars</option>
              <option value="2">⭐⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </div>
        </div>

        <textarea
          required
          rows="2"
          placeholder="Write your opinion or experience with this item (రివ్యూ రాయండి)..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500 resize-none"
        ></textarea>

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-5 py-2 rounded-xl text-xs shadow hover:scale-102 transition"
        >
          Submit Review
        </button>
      </form>

      {/* DISPLAY REVIEWS LIST */}
      <div className="space-y-3">
        {reviewsList.length === 0 ? (
          <p className="text-xs text-gray-400 italic">ఈ వస్తువుకు ఇంకా రివ్యూలు లేవు. మొదటి రివ్యూ ఇవ్వండి! (No reviews yet. Be the first to review!)</p>
        ) : (
          reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">{rev.author}</span>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(Math.floor(rev.rating))].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-gray-600 font-bold ml-1 text-[11px]">{rev.rating} / 5</span>
              </div>
              <p className="text-gray-700 text-xs mt-1">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 3. CART VIEW COMPONENT
function CartView({ cart, updateQuantity, removeFromCart, subtotal, deliveryCharge, finalTotal, couponCode, setCouponCode, appliedDiscount, setAppliedDiscount, onProceedToCheckout, onContinueShopping, language }) {
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SHARVANI10') {
      setAppliedDiscount(Math.round(subtotal * 0.1));
    } else {
      alert("చెల్లని కూపన్ కోడ్. (Invalid Coupon Code. Try SHARVANI10)");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 max-w-lg mx-auto space-y-4">
        <ShoppingCart className="w-16 h-16 text-pink-300 mx-auto" />
        <h3 className="text-lg font-bold text-gray-800">మీ కార్ట్ ఖాళీగా ఉంది (Your Cart is Empty)</h3>
        <p className="text-xs text-gray-500">శర్వాణి లేడీస్ కార్నర్‌లో లేటెస్ట్ ఫ్యాషన్ వస్తువులను కార్ట్‌లో చేర్చండి.</p>
        <button
          onClick={onContinueShopping}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow hover:scale-105 transition"
        >
          షోపింగ్ ప్రారంభించండి (Start Shopping)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Shopping Cart ({cart.length} Items)</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-pink-100 flex gap-4 items-center shadow-xs">
              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-50" />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-extrabold text-gray-900">₹{item.price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-200 rounded text-gray-600">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-200 rounded text-gray-600">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100 space-y-4 h-fit shadow-xs">
          <h3 className="text-sm font-bold text-gray-800">Order Summary</h3>
          
          <div className="space-y-2 text-xs text-gray-600 border-b border-gray-100 pb-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">₹{subtotal}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-green-600 font-bold">
                <span>Coupon Discount</span>
                <span>-₹{appliedDiscount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>{deliveryCharge === 0 ? <span className="text-green-600 font-bold">FREE</span> : `₹${deliveryCharge}`}</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-extrabold text-gray-900">
            <span>Total Payable</span>
            <span className="text-pink-600">₹{finalTotal}</span>
          </div>

          {/* COUPON INPUT */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Coupon (Use SHARVANI10)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 outline-none uppercase font-bold"
            />
            <button onClick={applyCoupon} className="bg-purple-50 text-purple-700 font-bold px-3 py-2 rounded-xl text-xs border border-purple-200">
              Apply
            </button>
          </div>

          <button
            onClick={onProceedToCheckout}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-2xl shadow text-xs transition"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

// 4. CHECKOUT VIEW COMPONENT WITH PER-ORDER ADDRESS CAPTURE
function CheckoutView({ cart, finalTotal, user, onOrderSuccess, onBackToCart, language }) {
  const [address, setAddress] = useState({
    fullName: user.name || '',
    phone: user.mobile || '',
    doorNo: '',
    street: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    landmark: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!address.street || !address.doorNo) {
      alert("దయచేసి మీ ఇంటి నంబర్ మరియు వీధి చిరునామా ఎంటర్ చేయండి. (Please enter street address & door number)");
      return;
    }

    const fullAddressString = `${address.doorNo}, ${address.street}, ${address.landmark ? address.landmark + ', ' : ''}${address.city}, ${address.state} - ${address.pincode}`;

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart,
      totalAmount: finalTotal,
      status: 'Confirmed',
      deliveryAddress: fullAddressString,
      paymentMethod: paymentMethod,
      customerDetails: {
        name: address.fullName,
        phone: address.phone,
        email: user.email
      }
    };

    onOrderSuccess(newOrder);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 md:p-8 border border-pink-100 shadow-sm space-y-6">
      <div className="flex items-center gap-2">
        <button onClick={onBackToCart} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Checkout & Delivery Location</h2>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        
        {/* CUSTOMER & LOCATION FORM */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-pink-600 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> 1. Delivery Location Address (Required for this order)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-gray-600 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">Mobile Phone Number</label>
              <input
                type="tel"
                required
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">House / Door No / Flat</label>
              <input
                type="text"
                required
                placeholder="H.No 4-12, Flat 302"
                value={address.doorNo}
                onChange={(e) => setAddress({ ...address, doorNo: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">Street / Colony / Area</label>
              <input
                type="text"
                required
                placeholder="Madhapur, Jubilee Hills Road"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">City</label>
              <input
                type="text"
                required
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-semibold mb-1">PIN Code</label>
              <input
                type="text"
                required
                value={address.pincode}
                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-pink-600 uppercase tracking-wider">2. Payment Method</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-semibold">
            {['UPI (Google Pay / PhonePe)', 'Credit / Debit Card', 'Cash on Delivery'].map(method => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`p-3 rounded-xl border text-center transition ${
                  paymentMethod === method 
                    ? 'border-pink-600 bg-pink-50 text-pink-700 font-bold' 
                    : 'border-gray-200 text-gray-600 hover:border-pink-200'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {/* ORDER BUTTON */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Amount to Pay</span>
            <p className="text-xl font-extrabold text-pink-600">₹{finalTotal}</p>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-2xl shadow text-xs transition"
          >
            Confirm & Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

// 5. ORDERS TRACKER VIEW
function OrdersTrackerView({ orders, onShopMore, language }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800"> Your Orders & Delivery Status</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-pink-100 space-y-3">
          <Package className="w-12 h-12 text-pink-300 mx-auto" />
          <p className="text-xs text-gray-500">ఇంతవరకు ఎటువంటి ఆర్డర్లు చేయలేదు. (No orders placed yet)</p>
          <button onClick={onShopMore} className="bg-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold">
            షోపింగ్ చేయండి
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-pink-100 space-y-4 shadow-xs">
              <div className="flex flex-wrap justify-between items-center text-xs border-b border-gray-100 pb-3 gap-2">
                <div>
                  <span className="font-extrabold text-gray-800">Order ID: {order.id}</span>
                  <span className="text-gray-400 block text-[10px]">Placed on: {order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold px-2.5 py-1 rounded-full text-[10px] ${
                    order.status === 'Delivered Early' || order.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Shipped' || order.status === 'Out for Delivery'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-pink-600 text-sm">₹{order.totalAmount}</span>
                </div>
              </div>

              {/* MEESHO-STYLE DELIVERED/DELIVERY TRACKER BANNER */}
              {(order.status === 'Delivered Early' || order.status === 'Delivered') && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
                  <span className="text-sm">⚡</span>
                  <span>
                    {order.status === 'Delivered Early' 
                      ? 'Yay! Your order was delivered early.' 
                      : 'Yay! Your order has been successfully delivered.'}
                  </span>
                </div>
              )}

              <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100 text-xs text-gray-700 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Delivery Address:</p>
                  <p className="text-gray-600">{order.deliveryAddress}</p>
                </div>
              </div>

              <div className="space-y-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="font-medium text-gray-800 line-clamp-1">{item.name}</span>
                        <span className="text-[10px] text-gray-400">Size: {item.selectedSize || 'Free Size'} • Qty: {item.quantity || 1}</span>
                      </div>
                    </div>
                    <span className="font-bold text-gray-700">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 6. ADMIN DASHBOARD WITH MULTI-PHOTO UPLOAD & ORDER STATUS CHANGE
function AdminDashboard({ products, setProducts, orders, setOrders, developerUser }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Kurtis',
    price: '',
    originalPrice: '',
    discount: '50',
    description: '',
    sizesInput: 'Free Size, S, M, L, XL',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    imagesList: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80']
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  // Update order delivery status
  const handleOrderStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord));
    alert(`Order ${orderId} status updated to: ${newStatus}`);
  };

  // Handle multi-file upload
  const handleMultipleFilesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProduct(prev => ({
            ...prev,
            imagesList: [...prev.imagesList, reader.result],
            image: prev.imagesList[0] || reader.result
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput.trim()) {
      setNewProduct(prev => ({
        ...prev,
        imagesList: [...prev.imagesList, imageUrlInput.trim()],
        image: prev.imagesList[0] || imageUrlInput.trim()
      }));
      setImageUrlInput('');
    }
  };

  const removePhotoFromNewProduct = (indexToRemove) => {
    setNewProduct(prev => {
      const updatedList = prev.imagesList.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        imagesList: updatedList,
        image: updatedList[0] || ''
      };
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const mainImg = newProduct.imagesList[0] || newProduct.image;
    const parsedSizes = newProduct.sizesInput
      ? newProduct.sizesInput.split(',').map(s => s.trim()).filter(Boolean)
      : ['Free Size'];

    const item = {
      ...newProduct,
      id: `p-${Date.now()}`,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price * 2),
      discount: Number(newProduct.discount),
      image: mainImg,
      images: newProduct.imagesList.length > 0 ? newProduct.imagesList : [mainImg],
      rating: 4.8,
      reviewsCount: 0,
      likesCount: 0,
      colors: ['Default'],
      sizes: parsedSizes,
      inStock: 20,
      reviews: []
    };

    setProducts([item, ...products]);
    setNewProduct({ 
      name: '', 
      category: 'Kurtis', 
      price: '', 
      originalPrice: '', 
      discount: '50', 
      description: '', 
      sizesInput: 'Free Size, S, M, L, XL',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      imagesList: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80'] 
    });
    alert("కొత్త వస్తువు, సైజులు మరియు ఫోటోలు విజయవంతంగా జోడించబడ్డాయి! (Product, Sizes & Photos Added Successfully)");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* DEVELOPER BADGE HEADER */}
      <div className="bg-gradient-to-r from-purple-800 to-pink-700 text-white rounded-3xl p-6 shadow-md flex justify-between items-center">
        <div>
          <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Developer / Admin Console
          </span>
          <h2 className="text-xl font-bold mt-1">Logged in as: {developerUser.email}</h2>
          <p className="text-xs text-pink-200 mt-0.5">Manage catalog items, set sizes, change delivery status, and view customer order locations</p>
        </div>
        <Lock className="w-10 h-10 text-white/30" />
      </div>

      {/* CUSTOMER ORDERS & DELIVERY STATUS CONTROLLER */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 space-y-4 shadow-xs">
        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-pink-600" /> Customer Orders & Delivery Status Management (Meesho Style)
        </h3>

        {orders.length === 0 ? (
          <p className="text-xs text-gray-400">No active orders available.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold text-gray-800">
                  <span>{order.id} ({order.date})</span>
                  <span className="text-pink-600 text-sm">₹{order.totalAmount}</span>
                </div>

                <p className="text-purple-700 font-semibold">Customer: {order.customerDetails?.name || 'Customer'} ({order.customerDetails?.phone || 'N/A'})</p>
                
                <div className="bg-white p-2.5 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-700">Delivery Address: </span>
                  <span className="text-gray-600">{order.deliveryAddress}</span>
                </div>

                {/* ADMIN STATUS CONTROLLER SELECTOR */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-bold text-gray-700">Change Delivery Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                    className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5 font-bold text-purple-800 outline-none"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered Early">⚡ Delivered Early</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD NEW PRODUCT FORM WITH SIZES & MULTI-PHOTO SUPPORT */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-800"> Add New Product with Custom Sizes & Photos</h3>
        
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-gray-600 font-bold mb-1">Product Title</label>
            <input 
              type="text" 
              required
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="e.g. Designer Silk Kurti" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-bold mb-1">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none font-bold"
            >
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-bold mb-1">Selling Price (₹)</label>
            <input 
              type="number" 
              required
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="799" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
            />
          </div>

          {/* SIZES INPUT FIELD */}
          <div className="md:col-span-3">
            <label className="block text-gray-600 font-bold mb-1">Available Sizes (Comma separated)</label>
            <input 
              type="text" 
              value={newProduct.sizesInput}
              onChange={(e) => setNewProduct({ ...newProduct, sizesInput: e.target.value })}
              placeholder="e.g. Free Size, S, M, L, XL, XXL or 2.4, 2.6, 2.8" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none font-semibold text-gray-700"
            />
          </div>

          {/* MULTI-IMAGE INPUT & FILE UPLOAD */}
          <div className="md:col-span-3 space-y-2">
            <label className="block text-gray-600 font-bold">Add Multiple Product Photos (URLs or Upload Files)</label>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Paste Photo URL..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-pink-100 text-pink-700 font-bold px-3 py-2 rounded-xl border border-pink-200 hover:bg-pink-200"
              >
                + Add URL
              </button>
              
              <label className="bg-purple-100 text-purple-700 font-bold px-3 py-2 rounded-xl border border-purple-200 cursor-pointer hover:bg-purple-200 flex items-center gap-1">
                Upload Files
                <input type="file" accept="image/*" multiple onChange={handleMultipleFilesUpload} className="hidden" />
              </label>
            </div>

            {/* PREVIEW MULTIPLE PHOTOS GRID */}
            <div className="flex items-center gap-3 overflow-x-auto pt-2">
              {newProduct.imagesList.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-xl border border-gray-200 flex-shrink-0 overflow-hidden group">
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhotoFromNewProduct(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-80 hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow hover:scale-102 transition"
            >
              Save & Publish Product
            </button>
          </div>
        </form>
      </div>

      {/* PRODUCT LIST MANAGEMENT */}
      <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-gray-800"> Existing Products ({products.length})</h3>

        <div className="space-y-2">
          {products.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs">
              <div className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-gray-800 line-clamp-1">{p.name}</p>
                  <span className="text-gray-400">{p.category} • ₹{p.price} • Sizes: {p.sizes ? p.sizes.join(', ') : 'Free Size'}</span>
                </div>
              </div>

              <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}