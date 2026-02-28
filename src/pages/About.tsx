import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, Utensils, Users, Car, Leaf, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About = () => {
  const features = [
    { icon: Leaf, title: '100% Pure Veg', desc: 'Dedicated vegetarian kitchen ensuring purity and authentic taste.' },
    { icon: Utensils, title: 'Spacious Dining', desc: 'Comfortable seating arrangements including a beautiful lawn area.' },
    { icon: Users, title: 'Family Seating', desc: 'Private sections designed for family gatherings and celebrations.' },
    { icon: Car, title: 'Ample Parking', desc: 'Hassle-free parking facility for all our guests.' },
  ];

  const dishes = [
    { name: 'Paneer Tikka Masala', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Vatika Special Veg', img: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Rabdi Jalebi', img: 'https://images.unsplash.com/photo-1517244683847-745431342088?q=80&w=1000&auto=format&fit=crop' }, // Placeholder for dessert
    { name: 'Jeera Rice', img: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Sitafal Shake', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <SEO 
        title="About Vatika Pure Veg | Since 2010"
        description="Learn about Vatika Pure Veg's journey since 2010. Parbhani's trusted pure vegetarian family restaurant located near MIDC, Vasmat Road."
        schema={{
          "@type": "AboutPage",
          "mainEntity": {
            "@type": "Restaurant",
            "name": "Vatika Pure Veg",
            "foundingDate": "2010",
            "servesCuisine": "Vegetarian"
          }
        }}
      />
      {/* 1. HERO SECTION */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            alt="Vatika Restaurant Interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-amber-500 font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            Since 2010
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            About Vatika Pure Veg
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 w-24 bg-amber-500 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-stone-200 font-light"
          >
            Serving Parbhani with Authentic Vegetarian Taste Since 2010
          </motion.p>
        </div>
      </div>

      {/* 2. STORY SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-amber-600 mb-4">
              <MapPin size={20} />
              <span className="font-bold uppercase tracking-wider text-sm">MIDC, Vasmat Road, Parbhani</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">
              A Decade of Culinary Excellence
            </h2>
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p>
                Located near MIDC on Vasmat Road, <strong>Vatika Pure Veg</strong> has been a cornerstone of Parbhani's dining scene for over a decade. What started as a humble passion for serving quality food has grown into one of the city's most beloved family restaurants.
              </p>
              <p>
                We take pride in being a <span className="text-amber-600 font-bold">100% Pure Vegetarian</span> establishment. Our kitchen is a sanctuary of flavors where traditional Punjabi spices meet modern Chinese zest, and where every meal ends with our signature desserts.
              </p>
              <p>
                Hygiene and cleanliness are not just standards for us; they are our promise. From our kitchen to your table, we ensure every step of your dining experience is safe, fresh, and delightful.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-tl-3xl -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-stone-200 rounded-br-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant Ambience" 
              className="w-full h-[500px] object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURE SECTION */}
      <section className="bg-stone-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-stone-800/50 p-8 rounded-2xl border border-stone-700 hover:border-amber-500/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-stone-900 rounded-full flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED DISHES */}
      <section className="py-20 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Chef's Recommendations</h2>
            <p className="text-stone-600">Must-try delicacies loved by our guests</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {dishes.map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl shadow-md mb-4 aspect-square">
                  <img 
                    src={dish.img} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-center font-bold text-stone-800 group-hover:text-amber-600 transition-colors">
                  {dish.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRUST BLOCK */}
      <section className="py-16 bg-white border-y border-stone-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} size={24} className="text-amber-500 fill-amber-500" />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-8">
            "Trusted by thousands of happy guests in Parbhani."
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-bold text-stone-900 mb-1">3.9 <span className="text-amber-500 text-xl">★</span></div>
              <div className="text-sm text-stone-500 font-medium uppercase tracking-wider">Google Reviews</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-bold text-stone-900 mb-1">4.2 <span className="text-amber-500 text-xl">★</span></div>
              <div className="text-sm text-stone-500 font-medium uppercase tracking-wider">Zomato Dining</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl font-bold text-stone-900 mb-1">4.3 <span className="text-amber-500 text-xl">★</span></div>
              <div className="text-sm text-stone-500 font-medium uppercase tracking-wider">Zomato Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-20 bg-stone-900 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <Clock size={48} className="mx-auto text-amber-500 mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ready to Experience Authentic Taste?</h2>
          <p className="text-stone-400 text-lg mb-8">
            Open Daily | 11:00 AM – 11:00 PM
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-amber-500/20"
          >
            Visit Us Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
