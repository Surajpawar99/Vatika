import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" 
            alt="Restaurant Interior" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 font-bold tracking-tight"
          >
            Taste the Extraordinary
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-stone-200 mb-10 font-light"
          >
            A culinary journey through flavors, textures, and aromas.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/book" 
              className="px-8 py-4 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition-colors"
            >
              Book a Table
            </Link>
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-colors"
            >
              View Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Michelin Quality", desc: "Award-winning chefs crafting perfection." },
            { icon: Clock, title: "Fast Delivery", desc: "Hot and fresh to your doorstep within 30 mins." },
            { icon: MapPin, title: "Prime Location", desc: "Located in the heart of the city's culinary district." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{feature.title}</h3>
              <p className="text-stone-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Dish Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden h-[500px]"
          >
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
              alt="Signature Dish" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-orange-600 font-medium tracking-wider uppercase text-sm">Signature Dish</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-2 mb-6">
              Roasted Lamb with Herbs
            </h2>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Experience the tender, succulent flavors of our slow-roasted lamb, seasoned with a secret blend of organic herbs and spices. Served with a side of roasted root vegetables and a red wine reduction.
            </p>
            <Link 
              to="/order" 
              className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors group"
            >
              Order Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
