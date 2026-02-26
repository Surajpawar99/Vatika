import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Contact Us</h1>
        <p className="text-stone-600 max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our menu, need assistance with a reservation, or just want to say hello.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {[
          { icon: MapPin, title: 'Visit Us', details: ['123 Culinary Avenue', 'New York, NY 10012'] },
          { icon: Phone, title: 'Call Us', details: ['(555) 123-4567', '(555) 987-6543'] },
          { icon: Mail, title: 'Email Us', details: ['hello@vatikapureveg.com', 'events@vatikapureveg.com'] }
        ].map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center"
          >
            <div className="w-12 h-12 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">{item.title}</h3>
            {item.details.map((line, i) => (
              <p key={i} className="text-stone-600">{line}</p>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 text-white">
            <h2 className="text-3xl font-serif font-bold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-400 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="relative h-full min-h-[400px] bg-stone-800">
             {/* Placeholder for Map */}
             <div className="absolute inset-0 flex items-center justify-center text-stone-500">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Map Integration Placeholder</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
