import React, { useState } from 'react';
import { motion } from 'motion/react';
import ReviewSection from '../components/ReviewSection';

interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Initial dummy reviews
  const [reviews, setReviews] = useState<Record<number, Review[]>>({
    1: [
      { username: 'Alice', rating: 5, comment: 'Best arancini I have ever had!', date: '2024-05-15' },
      { username: 'Bob', rating: 4, comment: 'Very flavorful, but a bit small.', date: '2024-05-10' }
    ],
    3: [
      { username: 'Charlie', rating: 5, comment: 'Perfectly cooked salmon.', date: '2024-05-12' }
    ]
  });

  const handleAddReview = (itemId: number, newReview: Review) => {
    setReviews(prev => ({
      ...prev,
      [itemId]: [newReview, ...(prev[itemId] || [])]
    }));
  };

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const menuItems = [
    {
      id: 1,
      name: 'Truffle Arancini',
      description: 'Crispy risotto balls with truffle oil and mozzarella.',
      price: 12,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Burrata Salad',
      description: 'Fresh burrata, heirloom tomatoes, basil pesto.',
      price: 16,
      category: 'Starters',
      image: 'https://images.unsplash.com/photo-1529312266912-b33cf6227e2f?q=80&w=1976&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Pan-Seared Salmon',
      description: 'Atlantic salmon, asparagus, lemon butter sauce.',
      price: 28,
      category: 'Mains',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Wagyu Beef Burger',
      description: 'Wagyu patty, brioche bun, caramelized onions, gruyere.',
      price: 24,
      category: 'Mains',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers.',
      price: 10,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2022&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Artisan Cocktails',
      description: 'Selection of handcrafted seasonal cocktails.',
      price: 14,
      category: 'Drinks',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Our Menu</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Discover our carefully curated selection of dishes, prepared with the finest ingredients and passion for culinary excellence.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category
                ? 'bg-stone-900 text-white shadow-md'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow group flex flex-col h-full"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-stone-900">
                ${item.price}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif font-bold text-stone-900">{item.name}</h3>
              </div>
              <p className="text-stone-500 text-sm mb-4 line-clamp-2">{item.description}</p>

              {/* Review Section */}
              <ReviewSection 
                itemId={item.id} 
                reviews={reviews[item.id] || []} 
                onAddReview={handleAddReview} 
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
