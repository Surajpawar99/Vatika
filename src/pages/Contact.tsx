import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Star, Navigation, Calendar, ArrowRight, Send } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, subject, message } = formData;
    const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    window.open(`https://wa.me/919022960646?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <SEO 
        title="Contact Vatika Pure Veg | Parbhani"
        description="Get in touch with Vatika Pure Veg. Call us at 090229 60646 or visit us at Vasmat Road, Parbhani. Open daily 11 AM - 11 PM."
        schema={{
          "@type": "ContactPage",
          "mainEntity": {
            "@type": "Restaurant",
            "name": "Vatika Pure Veg",
            "telephone": "+919022960646",
            "address": "Parbhani"
          }
        }}
      />
      {/* 1. HERO SECTION */}
      <div className="bg-stone-900 text-white pt-32 pb-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Vatika Pure Veg</h1>
          <p className="text-stone-400 text-lg font-light">We’re happy to serve you. Reach out anytime.</p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* 2. LEFT SIDE: CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:border-amber-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Our Location</h3>
                  <p className="text-stone-600 leading-relaxed">
                    7R46+J2W, Vasmat Road,<br />
                    Parbhani, Maharashtra 431402
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Vatika+Pure+Veg+Parbhani" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-amber-600 font-bold mt-4 hover:text-amber-700 transition-colors"
                  >
                    Open in Google Maps <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:border-amber-200 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Contact Number</h3>
                  <p className="text-stone-600 text-lg font-medium">090229 60646</p>
                  <a 
                    href="tel:09022960646" 
                    className="inline-flex items-center gap-2 text-amber-600 font-bold mt-4 hover:text-amber-700 transition-colors"
                  >
                    Call Now <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-2xl shadow-md border border-stone-100">
                  <div className="flex items-center gap-3 mb-3 text-stone-900 font-bold">
                    <Clock size={20} className="text-amber-500" /> Working Hours
                  </div>
                  <p className="text-stone-600">Open Daily</p>
                  <p className="text-stone-900 font-medium">11:00 AM – 11:00 PM</p>
               </div>
               
               <div className="bg-white p-6 rounded-2xl shadow-md border border-stone-100">
                  <div className="flex items-center gap-3 mb-3 text-stone-900 font-bold">
                    <Star size={20} className="text-amber-500" /> Ratings
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-xs text-stone-500 uppercase">Google</span>
                      <span className="font-bold text-lg">3.9 ★</span>
                    </div>
                    <div className="h-8 w-px bg-stone-200"></div>
                    <div>
                      <span className="block text-xs text-stone-500 uppercase">Zomato</span>
                      <span className="font-bold text-lg">4.2 ★</span>
                    </div>
                  </div>
               </div>
            </div>

          </motion.div>

          {/* 3. RIGHT SIDE: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-600"></div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="Reservation / Feedback / Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} /> Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. GOOGLE MAP EMBED */}
      <div className="w-full h-[400px] md:h-[500px] bg-stone-200 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://maps.google.com/maps?q=7R46+J2W,+Vasmat+Road,+Parbhani&output=embed"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="Vatika Pure Veg Location"
        ></iframe>
      </div>

      {/* 5. QUICK ACTION STRIP */}
      <div className="bg-stone-900 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="tel:09022960646" className="group bg-stone-800 p-6 rounded-2xl border border-stone-700 hover:border-amber-500 transition-all text-center">
            <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Phone size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Call Now</h3>
            <p className="text-stone-400 text-sm">Speak to our manager</p>
          </a>

          <a href="https://maps.google.com/?q=Vatika+Pure+Veg+Parbhani" target="_blank" rel="noreferrer" className="group bg-stone-800 p-6 rounded-2xl border border-stone-700 hover:border-amber-500 transition-all text-center">
            <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Navigation size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Get Directions</h3>
            <p className="text-stone-400 text-sm">Navigate to location</p>
          </a>

          <a href="/book" className="group bg-stone-800 p-6 rounded-2xl border border-stone-700 hover:border-amber-500 transition-all text-center">
            <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Calendar size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Book Table</h3>
            <p className="text-stone-400 text-sm">Reserve your spot</p>
          </a>
        </div>
      </div>

    </div>
  );
};

export default Contact;
