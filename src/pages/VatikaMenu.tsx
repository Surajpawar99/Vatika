import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, Star, Clock, MapPin, Phone, Info } from 'lucide-react';

interface MenuItem {
  name: string;
  price: number;
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
      { name: 'Tawa Chapati', price: 20 },
      { name: 'Tava Paratha', price: 23 },
      { name: 'Butter Chapati', price: 22 },
      { name: 'Butter Paratha', price: 30 },
      { name: 'Tandoori Roti (Plain)', price: 23 },
      { name: 'Tandoori Roti (Butter)', price: 30 },
      { name: 'Tandoori Paratha', price: 50 },
      { name: 'Butter Naan', price: 60 },
      { name: 'Butter Kulcha', price: 80 },
      { name: 'Garlic Naan', price: 80 },
      { name: 'Cheese Naan', price: 100 },
      { name: 'Cheese Garlic Naan', price: 115 },
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
      { name: 'Veg Manchurian', price: 160 },
      { name: 'Veg Hakka Noodles', price: 180 },
      { name: 'Chinese Bhel', price: 160 },
      { name: 'Veg Crispy', price: 180 },
      { name: 'Veg Spring Roll', price: 190 },
      { name: 'Veg Lollypop', price: 190 },
      { name: 'Cashewnut Roll', price: 190 },
      { name: 'Chana Chilli', price: 170 },
      { name: 'Paneer Manchurian', price: 210 },
      { name: 'Paneer Chilli', price: 210 },
      { name: 'Paneer 65', price: 210 },
      { name: 'Paneer Hot Pan', price: 220 },
      { name: 'Paneer Kurkure', price: 210 },
      { name: 'Paneer Kantaki', price: 220 },
      { name: 'Green Garlic Paneer', price: 210 },
      { name: 'Paneer Style', price: 210 },
      { name: 'Paneer Lemon Chilli', price: 210 },
      { name: 'Veg Stick Sizzler', price: 350 },
      { name: 'Paneer Stick Sizzler', price: 370 },
    ],
  },
  {
    id: 'paneer-main',
    name: 'PANEER MAIN COURSE',
    items: [
      { name: 'Cheese Butter Masala', price: 210 },
      { name: 'Paneer Butter Masala', price: 210 },
      { name: 'Palak Paneer', price: 210 },
      { name: 'Mutter Paneer', price: 210 },
      { name: 'Paneer Angari', price: 250 },
      { name: 'Paneer Saoji', price: 250 },
      { name: 'Paneer Bhurji', price: 250 },
      { name: 'Paneer Tikka Masala', price: 250 },
      { name: 'Paneer Hyderabadi', price: 250 },
      { name: 'Paneer Kadhai', price: 250 },
      { name: 'Paneer Handi', price: 250 },
      { name: 'Kaju Paneer Masala', price: 250 },
      { name: 'Paneer Rajdhani', price: 250 },
      { name: 'Paneer Rajwadi', price: 250 },
      { name: 'Paneer Laziz', price: 250 },
      { name: 'Achari Paneer', price: 250 },
      { name: 'Lahsooni Paneer', price: 250 },
      { name: 'Paneer Chatpata', price: 250 },
      { name: 'Paneer Hariyali', price: 250 },
      { name: 'Paneer Kabab Masala', price: 250 },
      { name: 'Paneer Lemon', price: 250 },
      { name: 'Paneer Cheese Lemon Masala', price: 250 },
    ],
  },
  {
    id: 'punjabi-veg',
    name: 'PUNJABI DISHES – VEG MAIN COURSE',
    items: [
      { name: 'Dal Fry', price: 155 },
      { name: 'Jeera Dal', price: 155 },
      { name: 'Dal Tadka', price: 160 },
      { name: 'Mix Veg', price: 190 },
      { name: 'Gobi Masala', price: 180 },
      { name: 'Gobi Fry', price: 180 },
      { name: 'Alu Mutter', price: 180 },
      { name: 'Jeera Alu', price: 180 },
      { name: 'Baingan Masala', price: 180 },
      { name: 'Bhendi Masala', price: 180 },
      { name: 'Bhendi Fry', price: 180 },
      { name: 'Green Peas Masala', price: 180 },
      { name: 'Tomato Chatani', price: 180 },
      { name: 'Mung Methi', price: 190 },
      { name: 'Garlic Methi', price: 190 },
      { name: 'Chana Masala', price: 180 },
      { name: 'Tava Besan', price: 160 },
      { name: 'Pithla', price: 160 },
      { name: 'Shev Bhaji', price: 180 },
      { name: 'Tomato Bhaji', price: 180 },
      { name: 'Shevga Masala', price: 180 },
      { name: 'Methi Malai Mutter (Sweet)', price: 210 },
      { name: 'Veg Tadka', price: 200 },
      { name: 'Veg Kolhapuri', price: 210 },
      { name: 'Shevga Handi', price: 210 },
      { name: 'Mushroom Masala', price: 220 },
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

const VatikaMenu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredMenu = menuData.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const scrollToCategory = (id: string) => {
    const element = categoryRefs.current[id];
    if (element) {
      const offset = 140; // Height of sticky header + category nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveCategory(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (const category of menuData) {
        const element = categoryRefs.current[category.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-amber-100">
      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-serif text-2xl border-2 border-amber-200 shadow-inner">
                V
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-amber-800">
                  Vatika <span className="text-stone-600 font-light italic">Pure Veg</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold">Premium Indian Cuisine</p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600" size={18} />
                <input
                  type="text"
                  placeholder="Search your favorite dish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm bg-stone-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Category Navigation */}
        <div className="bg-amber-50/50 border-t border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto no-scrollbar py-3 gap-2">
              {menuData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`whitespace-nowrap px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === category.id
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-white text-amber-800 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-40 pb-20">
        {/* Banner Section */}
        <section className="relative h-64 md:h-80 overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2072&auto=format&fit=crop"
            alt="Vatika Pure Veg Banner"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
              <div className="flex flex-wrap gap-6 text-white text-sm font-medium">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <Star className="text-amber-400 fill-amber-400" size={16} />
                  <span>4.8 (2.5k+ Reviews)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <Clock size={16} />
                  <span>30-45 mins</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <MapPin size={16} />
                  <span>Downtown, City Center</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredMenu.length > 0 ? (
              <div className="space-y-16">
                {filteredMenu.map((category) => (
                  <div
                    key={category.id}
                    ref={(el) => (categoryRefs.current[category.id] = el)}
                    className="scroll-mt-40"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 whitespace-nowrap">
                        {category.name}
                      </h2>
                      <div className="h-[1px] bg-amber-200 flex-grow"></div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        {category.items.length} Items
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={`${category.id}-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group relative overflow-hidden flex flex-col h-full"
                        >
                          {/* Dish Image */}
                          <div className="h-48 overflow-hidden relative bg-stone-100">
                            <img
                              src={`https://source.unsplash.com/600x400/?${encodeURIComponent(item.name.replace(/ /g, ','))},food,indian`}
                              alt={item.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-700 transition-colors leading-tight pr-2">
                                {item.name}
                              </h3>
                              <span className="text-lg font-serif font-bold text-amber-700 whitespace-nowrap">₹{item.price}</span>
                            </div>
                            
                            <div className="mt-auto pt-3 flex justify-between items-center border-t border-stone-50">
                               <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border border-green-600 flex items-center justify-center p-[1px]">
                                     <div className="w-full h-full bg-green-600 rounded-full"></div>
                                  </div>
                                  <div className="flex gap-0.5">
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                    <Star size={12} className="fill-amber-400 text-amber-400" />
                                  </div>
                               </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-amber-300" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">No dishes found</h3>
                <p className="text-stone-500">Try searching for something else, like "Paneer" or "Dal".</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 text-amber-600 font-bold underline underline-offset-4"
                >
                  Clear search
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Contact & Location Section */}
      <section className="py-16 bg-stone-50 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 mb-4">Contact & Location</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 mb-2">Visit Us</h3>
                    <p className="text-stone-600 leading-relaxed">
                      7R46+J2W, Vasmat Road, Near MIDC,<br />
                      Opposite Jain Dadawadi, Satkar Colony,<br />
                      Madhav Nagar, Parbhani, Maharashtra 431402
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Vatika+Pure+Veg+Parbhani+Maharashtra" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-amber-600 font-bold hover:text-amber-700 transition-colors"
                    >
                      Get Directions <ChevronRight size={16} />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 mb-2">Call Us</h3>
                    <a href="tel:09022960646" className="text-xl font-serif font-bold text-amber-700 hover:text-amber-800 transition-colors">
                      090229 60646
                    </a>
                    <p className="text-xs text-stone-500 mt-1">Available during opening hours</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100">
                <h3 className="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
                  <Star className="fill-amber-400 text-amber-400" size={20} />
                  Reviews on the Web
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-center">
                    <div className="text-red-600 font-black text-xl mb-1">Zomato</div>
                    <div className="flex justify-center items-center gap-1 mb-1">
                      <span className="font-bold text-stone-900">4.2</span>
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs text-stone-500">/ 5</span>
                    </div>
                    <p className="text-xs text-stone-500">11 votes</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 text-center">
                    <div className="text-purple-600 font-black text-xl mb-1">magicpin</div>
                    <div className="flex justify-center items-center gap-1 mb-1">
                      <span className="font-bold text-stone-900">4.2</span>
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs text-stone-500">/ 5</span>
                    </div>
                    <p className="text-xs text-stone-500">23 reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-full min-h-[400px] bg-stone-200 rounded-2xl overflow-hidden shadow-md border border-amber-100 relative">
              <iframe 
                src="https://maps.google.com/maps?q=7R46+J2W,+Vasmat+Road,+Parbhani&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Vatika Pure Veg Location"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-serif text-xl border border-amber-400">
                  V
                </div>
                <h2 className="text-xl font-serif font-bold text-white">Vatika Pure Veg</h2>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Redefining vegetarian dining with elegance and tradition. Experience the true essence of Indian flavors.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <Star size={14} className="text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <Info size={14} className="text-white" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-amber-600/30 pb-2 inline-block">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-600 shrink-0" />
                  <span>Vasmat Road, Near MIDC, Parbhani</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-amber-600 shrink-0" />
                  <span>090229 60646</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star size={18} className="text-amber-600 shrink-0" />
                  <span>Open: 11:00 AM - 11:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-amber-600/30 pb-2 inline-block">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-amber-500 transition-colors cursor-pointer">Our Story</li>
                <li className="hover:text-amber-500 transition-colors cursor-pointer">Bulk Orders</li>
                <li className="hover:text-amber-500 transition-colors cursor-pointer">Catering Services</li>
                <li className="hover:text-amber-500 transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-amber-500 transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 border-b border-amber-600/30 pb-2 inline-block">Newsletter</h4>
              <p className="text-xs mb-4">Join our elite circle for exclusive offers and culinary updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-stone-800 border-none rounded-lg px-4 py-2 text-xs w-full focus:ring-1 focus:ring-amber-600 outline-none"
                />
                <button className="bg-amber-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-700 transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-stone-800 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
              © {new Date().getFullYear()} Vatika Pure Veg. Crafted for the Connoisseur.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles for no-scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
};

export default VatikaMenu;
