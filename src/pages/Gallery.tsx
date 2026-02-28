import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Users, Clock, Utensils, Car } from 'lucide-react';
import SEO from '../components/SEO';

// Types
type GalleryItem = {
  id: number;
  src: string;
  category: string;
  title: string;
  height: string; // Tailwind height class or arbitrary value
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Gallery Data - Optimized for masonry
  const galleryItems: GalleryItem[] = [
    { id: 1, category: 'Dining', title: 'Luxury Main Hall', src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', height: 'h-[400px]' },
    { id: 2, category: 'Food', title: 'Signature Thali', src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', height: 'h-[300px]' },
    { id: 3, category: 'Lawn', title: 'Garden Dining', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', height: 'h-[500px]' },
    { id: 4, category: 'Events', title: 'Banquet Hall', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop', height: 'h-[350px]' },
    { id: 5, category: 'Family', title: 'Private Room', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop', height: 'h-[300px]' },
    { id: 6, category: 'Food', title: 'Paneer Tikka', src: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop', height: 'h-[400px]' },
    { id: 7, category: 'Dining', title: 'Elegant Ambience', src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop', height: 'h-[300px]' },
    { id: 8, category: 'Lawn', title: 'Night View', src: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1200&auto=format&fit=crop', height: 'h-[350px]' },
    { id: 9, category: 'Events', title: 'Celebration Setup', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop', height: 'h-[450px]' },
    { id: 10, category: 'Food', title: 'Dessert Platter', src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop', height: 'h-[300px]' },
    { id: 11, category: 'Family', title: 'Cozy Corner', src: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=800&auto=format&fit=crop', height: 'h-[350px]' },
    { id: 12, category: 'Dining', title: 'Premium Seating', src: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1200&auto=format&fit=crop', height: 'h-[400px]' },
  ];

  const categories = ['All', 'Dining', 'Food', 'Events', 'Family', 'Lawn'];
  
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Lightbox Handlers
  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setSelectedImage((selectedImage + 1) % filteredItems.length);
      if (e.key === 'ArrowLeft') setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredItems]);

  return (
    <div className="min-h-screen bg-stone-50">
      <SEO 
        title="Photo Gallery | Vatika Pure Veg Ambience & Food"
        description="View photos of Vatika Pure Veg's luxury dining hall, garden seating, banquet hall, and delicious vegetarian dishes. Experience the best ambience in Parbhani."
        schema={{
          "@type": "ImageGallery",
          "name": "Vatika Pure Veg Gallery",
          "image": galleryItems.map(item => item.src)
        }}
      />
      {/* 1. MINIMAL HERO */}
      <div className="pt-28 pb-8 text-center bg-white border-b border-stone-100">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">Our Gallery</h1>
          <p className="text-stone-500 mt-2 text-xs md:text-sm uppercase tracking-[0.2em]">Moments at Vatika</p>
        </motion.div>

        {/* Minimal Stats Strip */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-8 px-4">
          {[
            { icon: Users, label: 'Happy Guests', value: '50k+' },
            { icon: Clock, label: 'Years', value: '15+' },
            { icon: Utensils, label: 'Pure Veg', value: '100%' },
            { icon: Car, label: 'Parking', value: 'Yes' },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-stone-400">
              <stat.icon size={14} className="text-amber-500" />
              <span className="text-xs font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. STICKY FILTER BAR */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex justify-start md:justify-center gap-2 px-4 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wide
                ${activeCategory === cat 
                  ? 'bg-stone-900 text-white' 
                  : 'bg-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. FULL WIDTH MASONRY GRID */}
      <div className="w-full px-2 md:px-4 py-4">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-4 space-y-2 md:space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid"
              >
                <div 
                  className="group relative rounded-lg md:rounded-xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-lg transition-all duration-300 bg-stone-200"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={item.src} 
                    alt={item.title}
                    loading="lazy"
                    className={`w-full ${item.height} object-cover transition-transform duration-700 group-hover:scale-105`}
                  />
                  
                  {/* Minimal Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Icon Only on Hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                      <ZoomIn size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. CINEMATIC LIGHTBOX */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-50"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all z-50 hidden md:block"
              onClick={prevImage}
            >
              <ChevronLeft size={40} />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all z-50 hidden md:block"
              onClick={nextImage}
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div 
              className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                src={filteredItems[selectedImage].src}
                alt={filteredItems[selectedImage].title}
                className="max-h-full max-w-full object-contain shadow-2xl"
              />
              
              {/* Minimal Caption */}
              <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                <h3 className="text-white/90 text-lg font-serif tracking-wide">
                  {filteredItems[selectedImage].title}
                </h3>
                <span className="text-amber-500/80 text-xs font-bold uppercase tracking-widest mt-1 block">
                  {filteredItems[selectedImage].category}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
