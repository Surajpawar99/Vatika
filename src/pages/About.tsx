import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Story Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Our Story</h1>
            <div className="space-y-4 text-stone-600 text-lg leading-relaxed">
              <p>
                Founded in 2010, Vatika Pure Veg began with a simple mission: to bring authentic, soul-warming flavors to our community. What started as a small family kitchen has grown into a beloved culinary destination.
              </p>
              <p>
                Our philosophy is rooted in respect for ingredients. We partner with local farmers and artisans to source the freshest seasonal produce, ensuring that every dish tells a story of the land it comes from.
              </p>
              <p>
                Under the guidance of Executive Chef Marco Rossi, our kitchen combines traditional techniques with modern innovation, creating a menu that is both familiar and exciting.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop" 
              alt="Chefs cooking" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Meet The Team</h2>
          <p className="text-stone-600">The passionate individuals behind your dining experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Marco Rossi', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2080&auto=format&fit=crop' },
            { name: 'Sarah Jenkins', role: 'Head Sommelier', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
            { name: 'David Chen', role: 'Restaurant Manager', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }
          ].map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 border-4 border-stone-100 shadow-lg">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">{member.name}</h3>
              <p className="text-orange-600 font-medium text-sm uppercase tracking-wider">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
