import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Star, Clock, MapPin, Phone, Info, ArrowUp, ArrowDown, Filter, X, Check, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

const menuData: Category[] = [
  {
    id: 'roti',
    name: 'ROTI',
    items: [
      { name: 'Tawa Chapati', price: 20, description: 'Whole wheat flatbread cooked on a griddle' },
      { name: 'Tava Paratha', price: 23, description: 'Layered flatbread cooked on a griddle' },
      { name: 'Butter Chapati', price: 22, description: 'Soft chapati topped with butter' },
      { name: 'Butter Paratha', price: 30, description: 'Flaky paratha served with butter' },
      { name: 'Tandoori Roti (Plain)', price: 23, description: 'Traditional clay oven baked bread' },
      { name: 'Tandoori Roti (Butter)', price: 30, description: 'Clay oven baked bread with butter' },
      { name: 'Tandoori Paratha', price: 50, description: 'Crispy layered bread from tandoor' },
      { name: 'Butter Naan', price: 60, description: 'Soft leavened bread with butter' },
      { name: 'Butter Kulcha', price: 80, description: 'Mildly leavened flatbread with butter' },
      { name: 'Garlic Naan', price: 80, description: 'Naan bread infused with garlic flavor' },
      { name: 'Cheese Naan', price: 100, description: 'Naan stuffed with melted cheese' },
      { name: 'Cheese Garlic Naan', price: 115, description: 'Garlic naan with generous cheese stuffing' },
    ],
  },
  {
    id: 'rice',
    name: 'RICE',
    items: [
      { name: 'Steam Rice', price: 140 },
      { name: 'Jeera Rice', price: 160 },
      { name: 'Veg Pulav', price: 180 },
      { name: 'Veg Biryani', price: 190 },
      { name: 'Dal Khichadi', price: 180 },
      { name: 'Butter Dal Khichadi', price: 195 },
      { name: 'Curd Rice', price: 170 },
      { name: 'Veg Fried Rice', price: 180 },
      { name: 'Schezwan Fried Rice', price: 220 },
    ],
  },
  {
    id: 'fasting-special',
    name: 'FASTING SPECIAL',
    items: [
      { name: 'Sabudana Khichadi', price: 90 },
      { name: 'Sabudana Vada', price: 90 },
      { name: 'Finger Chips', price: 90 },
    ],
  },
  {
    id: 'chinese-starters',
    name: 'CHINESE STARTERS',
    items: [
      { name: 'Veg Manchurian', price: 160, description: 'Vegetable balls in spicy chinese sauce' },
      { name: 'Veg Hakka Noodles', price: 180, description: 'Stir-fried noodles with vegetables' },
      { name: 'Chinese Bhel', price: 160, description: 'Crispy fried noodles with tangy sauce' },
      { name: 'Veg Crispy', price: 180, description: 'Crispy fried mixed vegetables' },
      { name: 'Veg Spring Roll', price: 190, description: 'Crispy rolls stuffed with vegetables' },
      { name: 'Veg Lollypop', price: 190, description: 'Vegetable mix shaped as lollipops' },
      { name: 'Cashewnut Roll', price: 190, description: 'Rolls filled with cashew and veggies' },
      { name: 'Chana Chilli', price: 170, description: 'Spicy chickpeas stir-fry' },
      { name: 'Paneer Manchurian', price: 210, description: 'Paneer cubes in manchurian sauce' },
      { name: 'Paneer Chilli', price: 210, description: 'Spicy paneer with bell peppers' },
      { name: 'Paneer 65', price: 210, description: 'Spicy deep-fried paneer appetizer' },
      { name: 'Paneer Hot Pan', price: 220, description: 'Sizzling paneer in spicy sauce' },
      { name: 'Paneer Kurkure', price: 210, description: 'Crunchy fried paneer snack' },
      { name: 'Paneer Kantaki', price: 220, description: 'Crispy paneer fingers' },
      { name: 'Green Garlic Paneer', price: 210, description: 'Paneer in fresh green garlic sauce' },
      { name: 'Paneer Style', price: 210, description: 'Chef special paneer preparation' },
      { name: 'Paneer Lemon Chilli', price: 210, description: 'Tangy and spicy paneer dish' },
      { name: 'Veg Stick Sizzler', price: 350, description: 'Sizzling platter with veg cutlets' },
      { name: 'Paneer Stick Sizzler', price: 370, description: 'Sizzling platter with paneer sticks' },
    ],
  },
  {
    id: 'paneer-main',
    name: 'PANEER MAIN COURSE',
    items: [
      { name: 'Cheese Butter Masala', price: 210, description: 'Rich tomato gravy with cheese and butter' },
      { name: 'Paneer Butter Masala', price: 210, description: 'Cottage cheese in rich buttery tomato gravy' },
      { name: 'Palak Paneer', price: 210, description: 'Paneer cubes in smooth spinach gravy' },
      { name: 'Mutter Paneer', price: 210, description: 'Green peas and paneer in spiced gravy' },
      { name: 'Paneer Angari', price: 250, description: 'Smoked spicy paneer curry' },
      { name: 'Paneer Saoji', price: 250, description: 'Spicy Maharashtrian style paneer' },
      { name: 'Paneer Bhurji', price: 250, description: 'Scrambled paneer with spices' },
      { name: 'Paneer Tikka Masala', price: 250, description: 'Grilled paneer in spicy gravy' },
      { name: 'Paneer Hyderabadi', price: 250, description: 'Paneer in spicy green gravy' },
      { name: 'Paneer Kadhai', price: 250, description: 'Paneer cooked with bell peppers and spices' },
      { name: 'Paneer Handi', price: 250, description: 'Creamy paneer curry cooked in a pot' },
      { name: 'Kaju Paneer Masala', price: 250, description: 'Cashews and paneer in rich gravy' },
      { name: 'Paneer Rajdhani', price: 250, description: 'Rich and creamy royal paneer dish' },
      { name: 'Paneer Rajwadi', price: 250, description: 'Royal Rajasthani style paneer curry' },
      { name: 'Paneer Laziz', price: 250, description: 'Delicious creamy paneer preparation' },
      { name: 'Achari Paneer', price: 250, description: 'Paneer cooked with pickling spices' },
      { name: 'Lahsooni Paneer', price: 250, description: 'Garlic flavored paneer curry' },
      { name: 'Paneer Chatpata', price: 250, description: 'Tangy and spicy paneer dish' },
      { name: 'Paneer Hariyali', price: 250, description: 'Paneer in fresh coriander and mint gravy' },
      { name: 'Paneer Kabab Masala', price: 250, description: 'Paneer kababs in spicy masala gravy' },
      { name: 'Paneer Lemon', price: 250, description: 'Paneer with a hint of lemon zest' },
      { name: 'Paneer Cheese Lemon Masala', price: 250, description: 'Cheesy paneer with lemon flavor' },
    ],
  },
  {
    id: 'punjabi-veg',
    name: 'PUNJABI DISHES – VEG MAIN COURSE',
    items: [
      { name: 'Dal Fry', price: 155, description: 'Yellow lentils tempered with spices' },
      { name: 'Jeera Dal', price: 155, description: 'Lentils tempered with cumin seeds' },
      { name: 'Dal Tadka', price: 160, description: 'Yellow lentils with aromatic tempering' },
      { name: 'Mix Veg', price: 190, description: 'Assorted vegetables in spiced gravy' },
      { name: 'Gobi Masala', price: 180, description: 'Cauliflower florets in spicy masala' },
      { name: 'Gobi Fry', price: 180, description: 'Fried cauliflower with spices' },
      { name: 'Alu Mutter', price: 180, description: 'Potatoes and green peas curry' },
      { name: 'Jeera Alu', price: 180, description: 'Potatoes tossed with cumin seeds' },
      { name: 'Baingan Masala', price: 180, description: 'Spicy eggplant curry' },
      { name: 'Bhendi Masala', price: 180, description: 'Okra cooked with onions and spices' },
      { name: 'Bhendi Fry', price: 180, description: 'Crispy fried okra' },
      { name: 'Green Peas Masala', price: 180, description: 'Green peas in rich gravy' },
      { name: 'Tomato Chatani', price: 180, description: 'Spicy tomato relish' },
      { name: 'Mung Methi', price: 190, description: 'Moong beans and fenugreek leaves curry' },
      { name: 'Garlic Methi', price: 190, description: 'Fenugreek leaves with garlic flavor' },
      { name: 'Chana Masala', price: 180, description: 'Spicy chickpea curry' },
      { name: 'Tava Besan', price: 160, description: 'Gram flour curry cooked on griddle' },
      { name: 'Pithla', price: 160, description: 'Traditional Maharashtrian gram flour curry' },
      { name: 'Shev Bhaji', price: 180, description: 'Spicy curry topped with crispy sev' },
      { name: 'Tomato Bhaji', price: 180, description: 'Tangy tomato curry' },
      { name: 'Shevga Masala', price: 180, description: 'Drumstick curry in spicy masala' },
      { name: 'Methi Malai Mutter (Sweet)', price: 210, description: 'Fenugreek and peas in creamy sweet gravy' },
      { name: 'Veg Tadka', price: 200, description: 'Mixed vegetables with spicy tempering' },
      { name: 'Veg Kolhapuri', price: 210, description: 'Spicy mixed vegetable curry' },
      { name: 'Shevga Handi', price: 210, description: 'Drumstick curry cooked in a pot' },
      { name: 'Mushroom Masala', price: 220, description: 'Mushrooms in spicy gravy' },
    ],
  },
  {
    id: 'koftas',
    name: 'KOFTAS',
    items: [
      { name: 'Veg Kofta', price: 250 },
      { name: 'Malai Kofta (Sweet)', price: 250 },
    ],
  },
  {
    id: 'salad-raita',
    name: 'SALAD & RAITA',
    items: [
      { name: 'Green Salad', price: 60 },
      { name: 'Plain Curd', price: 50 },
      { name: 'Vegetable Raita', price: 110 },
    ],
  },
  {
    id: 'papad',
    name: 'PAPAD',
    items: [
      { name: 'Roasted Papad', price: 25 },
      { name: 'Fry Papad', price: 30 },
      { name: 'Masala Papad', price: 40 },
    ],
  },
  {
    id: 'indian-starters',
    name: 'INDIAN STARTERS',
    items: [
      { name: 'Onion Pakoda', price: 120 },
      { name: 'Paneer Pakoda', price: 170 },
      { name: 'Veg Hara Bhara Kabab', price: 180 },
      { name: 'Alu Kurkure', price: 180 },
    ],
  },
  {
    id: 'tandoori-starters',
    name: 'TANDOORI STARTERS',
    items: [
      { name: 'Paneer Tikka', price: 280 },
      { name: 'Paneer Pahadi', price: 280 },
      { name: 'Paneer Banjara', price: 280 },
      { name: 'Paneer Hariyali Tikka', price: 280 },
      { name: 'Malai Tikka', price: 280 },
      { name: 'Peri Peri Paneer Tikka', price: 280 },
      { name: 'Mushroom Tikka', price: 280 },
      { name: 'Vatika Special Tikka', price: 380 },
    ],
  },
  {
    id: 'special-veg',
    name: 'SPECIAL VEG MAIN COURSE',
    items: [
      { name: 'Vatika Special Veg', price: 280 },
      { name: 'Kaju Curry (Sweet)', price: 250 },
      { name: 'Kaju Waradi', price: 240 },
      { name: 'Veg Waradi', price: 240 },
      { name: 'Veg Angari', price: 240 },
      { name: 'Veg Tava', price: 240 },
      { name: 'Veg Jaipuri', price: 240 },
      { name: 'Veg Hyderabadi', price: 240 },
      { name: 'Veg Kadhai', price: 240 },
      { name: 'Veg Handi', price: 240 },
      { name: 'Methi Kabab Handi', price: 240 },
      { name: 'Mushroom Handi', price: 240 },
      { name: 'Veg Kofta Handi', price: 240 },
      { name: 'Veg Patiala', price: 240 },
      { name: 'Veg Rajdhani', price: 240 },
      { name: 'Veg Kheema Hariyali', price: 240 },
      { name: 'Veg Kolhapuri (Special)', price: 240 },
      { name: 'Veg Shaam Savera', price: 240 },
      { name: 'Fresh Corn Kabab Masala', price: 240 },
      { name: 'Fresh Corn Kaju Kabab Handi', price: 240 },
    ],
  },
  {
    id: 'beverages',
    name: 'BEVERAGES',
    items: [
      { name: 'Bottled Water (1L)', price: 20 },
      { name: 'Fresh Lime Water', price: 30 },
      { name: 'Fresh Lime Soda', price: 45 },
      { name: 'Butter Milk', price: 30 },
      { name: 'Readymade Tea', price: 20 },
      { name: 'Readymade Coffee', price: 30 },
    ],
  },
  {
    id: 'breakfast',
    name: 'BREAKFAST (11 AM to 6 PM)',
    items: [
      { name: 'Upma', price: 70 },
      { name: 'Dahi Poha', price: 70 },
      { name: 'Puri Bhaji', price: 100 },
      { name: 'Aloo Paratha', price: 110 },
      { name: 'Gobi Paratha', price: 110 },
      { name: 'Paneer Paratha', price: 130 },
    ],
  },
  {
    id: 'soups',
    name: 'SOUPS',
    items: [
      { name: 'Cream of Tomato Soup', price: 115 },
      { name: 'Manchow Soup', price: 115 },
      { name: 'Hot & Sour Soup', price: 115 },
      { name: 'Sweet Corn Soup', price: 115 },
      { name: 'Lemon Coriander Soup', price: 115 },
    ],
  },
  {
    id: 'indian-desserts',
    name: 'INDIAN DESSERTS',
    items: [
      { name: 'Rabdi Jalebi (100gm)', price: 90 },
      { name: 'Kashmiri Jamun (100gm)', price: 90 },
      { name: 'Rabdi Malpua (100gm)', price: 90 },
      { name: 'Gulab Jamun (100gm)', price: 75 },
      { name: 'Rabdi Malai (100gm)', price: 90 },
      { name: 'Kesar Jalebi (60gm)', price: 55 },
      { name: 'Malpua (100gm)', price: 75 },
      { name: 'Fruit Salad (100gm)', price: 100 },
      { name: 'Fruit Salad with Ice Cream', price: 120 },
    ],
  },
  {
    id: 'chocolate-desserts',
    name: 'CHOCOLATE DESSERTS',
    items: [
      { name: 'Cold Coffee', price: 60 },
      { name: 'Cold Chocolate', price: 80 },
      { name: 'Devil’s Own', price: 120 },
      { name: 'Oreo Shake', price: 110 },
      { name: 'Mocha Choco Delight', price: 120 },
      { name: 'Dark Passion', price: 120 },
      { name: 'Sizzling Brownie', price: 140 },
    ],
  },
  {
    id: 'fruity',
    name: 'SOMETHING FRUITY',
    items: [
      { name: 'Mosambi Juice', price: 60 },
      { name: 'Apple Juice', price: 90 },
      { name: 'Pineapple Juice', price: 70 },
      { name: 'Orange Juice', price: 90 },
      { name: 'Banana Shake', price: 60 },
      { name: 'Pineapple Shake', price: 99 },
      { name: 'Kala Jamun Shake', price: 99 },
      { name: 'Mango Shake', price: 99 },
      { name: 'Strawberry Shake', price: 99 },
      { name: 'Sitafal Shake', price: 99 },
      { name: 'Kala Jamun Mastani', price: 140 },
      { name: 'Mango Mastani', price: 140 },
      { name: 'Sitafal Mastani', price: 140 },
    ],
  },
  {
    id: 'mocktails',
    name: 'VIRGIN MOCKTAILS',
    items: [
      { name: 'Virgin Mojito', price: 90 },
      { name: 'Blue Curacao Mojito', price: 90 },
      { name: 'Kiwi Mojito', price: 90 },
      { name: 'Watermelon Mojito', price: 90 },
      { name: 'Green Apple Mojito', price: 90 },
    ],
  },
];

const getCategoryGroup = (id: string): string => {
  if (id.includes('paneer') || id === 'koftas' || id === 'tandoori-starters') return 'Paneer';
  if (id.includes('chinese')) return 'Chinese';
  if (id.includes('punjabi') || id === 'roti' || id === 'rice' || id === 'special-veg') return 'Punjabi';
  if (id.includes('dessert')) return 'Desserts';
  if (id === 'beverages' || id === 'mocktails' || id === 'fruity') return 'Beverages';
  if (id === 'breakfast') return 'South Indian';
  return 'Others';
};

const getPriceRange = (price: number): string => {
  if (price <= 150) return '0-150';
  if (price <= 250) return '150-250';
  return '250+';
};

const MenuSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white rounded-xl border border-stone-100 shadow-sm overflow-hidden h-full animate-pulse">
        <div className="h-48 bg-stone-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 w-3/4 bg-stone-200 rounded"></div>
          <div className="h-4 w-full bg-stone-200 rounded"></div>
          <div className="flex justify-between pt-2">
            <div className="h-6 w-20 bg-stone-200 rounded"></div>
            <div className="h-8 w-24 bg-stone-200 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const VatikaMenu: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('price-asc');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Flatten menu data for easier filtering
  const allItems = React.useMemo(() => {
    return menuData.flatMap(category => 
      category.items.map(item => ({
        ...item,
        categoryGroup: getCategoryGroup(category.id),
        priceRange: getPriceRange(item.price),
        originalCategory: category.name
      }))
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and Sort Logic
  const filteredItems = React.useMemo(() => {
    let result = allItems;

    // 1. Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(item => selectedCategories.includes(item.categoryGroup));
    }

    // 3. Price Filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter(item => selectedPriceRanges.includes(item.priceRange));
    }

    // 4. Sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });

    return result;
  }, [allItems, searchQuery, selectedCategories, selectedPriceRanges, sortOption]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const togglePriceRange = (range: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearchQuery('');
  };

  const categories = ['Paneer', 'Chinese', 'Punjabi', 'South Indian', 'Desserts', 'Beverages', 'Others'];
  const priceRanges = [
    { label: '₹0 – ₹150', value: '0-150' },
    { label: '₹150 – ₹250', value: '150-250' },
    { label: '₹250+', value: '250+' }
  ];

  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Mobile Header & Controls */}
      <div className="sticky top-0 z-40 bg-white border-b border-amber-100 shadow-sm lg:hidden">
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="p-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 relative"
            >
              <SlidersHorizontal size={20} />
              {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto lg:hidden"
            >
              <div className="p-5 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-serif font-bold text-stone-800">Filters</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Filter Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.value} className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 hover:bg-amber-50 cursor-pointer transition-colors">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedPriceRanges.includes(range.value) ? 'bg-amber-600 border-amber-600' : 'border-stone-300 bg-white'}`}>
                            {selectedPriceRanges.includes(range.value) && <Check size={14} className="text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedPriceRanges.includes(range.value)}
                            onChange={() => togglePriceRange(range.value)}
                          />
                          <span className="text-stone-700 font-medium">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 hover:bg-amber-50 cursor-pointer transition-colors">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(category) ? 'bg-amber-600 border-amber-600' : 'border-stone-300 bg-white'}`}>
                            {selectedCategories.includes(category) && <Check size={14} className="text-white" />}
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                          />
                          <span className="text-stone-700 font-medium">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100">
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 text-amber-600 font-bold hover:bg-amber-50 rounded-xl transition-colors mb-3"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200 hover:bg-amber-700 transition-colors"
                  >
                    Show {filteredItems.length} Results
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-24 h-fit">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-serif font-bold text-stone-800 flex items-center gap-2">
                  <Filter size={18} className="text-amber-600" /> Filters
                </h2>
                {(selectedCategories.length > 0 || selectedPriceRanges.length > 0) && (
                  <button onClick={clearFilters} className="text-xs font-bold text-amber-600 hover:text-amber-700">
                    Clear All
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedPriceRanges.includes(range.value) ? 'bg-amber-600 border-amber-600' : 'border-stone-300 bg-white group-hover:border-amber-400'}`}>
                        {selectedPriceRanges.includes(range.value) && <Check size={12} className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedPriceRanges.includes(range.value)}
                        onChange={() => togglePriceRange(range.value)}
                      />
                      <span className={`text-sm ${selectedPriceRanges.includes(range.value) ? 'text-stone-900 font-medium' : 'text-stone-600'}`}>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(category) ? 'bg-amber-600 border-amber-600' : 'border-stone-300 bg-white group-hover:border-amber-400'}`}>
                        {selectedCategories.includes(category) && <Check size={12} className="text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span className={`text-sm ${selectedCategories.includes(category) ? 'text-stone-900 font-medium' : 'text-stone-600'}`}>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Banner Ad / Promo */}
            <div className="bg-amber-600 rounded-2xl p-6 text-white text-center shadow-lg shadow-amber-200">
              <Star className="w-8 h-8 mx-auto mb-3 text-amber-200 fill-amber-200" />
              <h3 className="font-serif font-bold text-lg mb-2">Vatika Special</h3>
              <p className="text-amber-100 text-sm mb-4">Try our signature Thali today!</p>
              <button className="bg-white text-amber-700 text-xs font-bold px-4 py-2 rounded-full hover:bg-amber-50 transition-colors">
                View Offer
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Header */}
            <div className="hidden lg:flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-stone-100">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm transition-all"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-stone-500 font-medium">{filteredItems.length} items found</span>
                <div className="h-6 w-[1px] bg-stone-200"></div>
                <div className="relative group">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="appearance-none bg-transparent pl-2 pr-8 py-1 text-sm font-bold text-stone-700 cursor-pointer focus:outline-none"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Mobile Sort & Count */}
            <div className="lg:hidden flex justify-between items-center mb-4 px-2">
              <span className="text-sm text-stone-500 font-medium">{filteredItems.length} results</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent text-sm font-bold text-stone-700 focus:outline-none"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <MenuSkeleton />
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredItems.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredItems.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        key={item.name}
                        className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all group overflow-hidden flex flex-col h-full"
                        data-price={item.price}
                        data-category={item.categoryGroup}
                        data-name={item.name}
                      >
                        <div className="h-48 overflow-hidden relative bg-stone-100">
                          <img
                            src={`https://loremflickr.com/600/400/indian,food?lock=${getHash(item.name)}`}
                            alt={item.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-stone-600 shadow-sm">
                            {item.originalCategory}
                          </div>
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-tight pr-2">
                              {item.name}
                            </h3>
                            <span className="text-lg font-serif font-bold text-amber-700 whitespace-nowrap">₹{item.price}</span>
                          </div>
                          
                          {item.description && (
                            <p className="text-sm text-stone-500 mb-4 line-clamp-2">{item.description}</p>
                          )}
                          
                          <div className="mt-auto pt-4 flex justify-between items-center border-t border-stone-50">
                            <div className="flex items-center gap-1">
                              <Star size={12} className="fill-amber-400 text-amber-400" />
                              <span className="text-xs font-bold text-stone-600">4.2</span>
                              <span className="text-xs text-stone-400">(20+)</span>
                            </div>
                            <button className="text-xs font-bold text-white bg-amber-600 px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors shadow-sm shadow-amber-200">
                              Add to Order
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-2xl border border-stone-100"
                  >
                    <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={32} className="text-stone-300" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">No items found</h3>
                    <p className="text-stone-500 mb-6">Try adjusting your filters or search query.</p>
                    <button 
                      onClick={clearFilters}
                      className="text-amber-600 font-bold underline underline-offset-4 hover:text-amber-700"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VatikaMenu;
