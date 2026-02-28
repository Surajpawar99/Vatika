import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Vatika Menu', path: '/vatika' },
    { name: 'Book Table', path: '/book' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Determine navbar style based on scroll and page
  const isTransparent = isHome && !isScrolled;
  const navbarBg = isTransparent ? 'bg-transparent border-transparent' : 'bg-white/90 backdrop-blur-md shadow-sm border-stone-200';
  const textColor = isTransparent ? 'text-white' : 'text-stone-800';
  const logoColor = isTransparent ? 'text-white' : 'text-stone-900';
  const mobileMenuBtnColor = isTransparent ? 'text-white' : 'text-stone-600';

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-orange-200">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${navbarBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 group ${logoColor}`}>
              <span className="group-hover:text-amber-500 transition-colors">Vatika</span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-extrabold ml-1.5">
                 Pure Veg
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative text-sm font-medium transition-colors duration-300 py-2 group ${
                      isActive 
                        ? 'text-amber-500' 
                        : isTransparent 
                          ? 'text-white/90 hover:text-white' 
                          : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md hover:bg-white/10 focus:outline-none transition-colors ${mobileMenuBtnColor}`}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="p-6 flex justify-end border-b border-stone-100">
                <button onClick={() => setIsMenuOpen(false)} className="text-stone-500 hover:text-stone-900">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-4 text-base font-medium border-l-4 transition-all ${
                      location.pathname === item.path
                        ? 'border-amber-500 text-amber-600 bg-amber-50'
                        : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
           {isMenuOpen && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
             />
           )}
        </AnimatePresence>
      </nav>

      {/* Main Content - Adjust padding based on page */}
      <main className={`${isHome ? 'pt-0' : 'pt-24'} pb-16 min-h-screen`}>
        {children}
      </main>

      <footer className="bg-[#0f0f0f] text-stone-400 pt-16 pb-8 border-t border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Vatika <span className="text-amber-500">Pure Veg</span>
                </h3>
                <p className="text-sm leading-relaxed text-stone-400 mt-4">
                  Pure Vegetarian Family Restaurant in Parbhani, serving authentic taste since 2010.
                </p>
              </div>
              <div className="flex gap-6">
                 {/* Ratings */}
                 <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">3.9</span>
                    <div className="flex flex-col">
                      <span className="text-amber-500 text-xs">★</span>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider">Google</span>
                    </div>
                 </div>
                 <div className="w-px h-8 bg-stone-800"></div>
                 <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-lg">4.2</span>
                    <div className="flex flex-col">
                      <span className="text-amber-500 text-xs">★</span>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider">Zomato</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Vatika Menu', path: '/vatika' },
                  { name: 'Book Table', path: '/book' },
                  { name: 'Gallery', path: '/gallery' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                   <li key={item.name}>
                     <Link 
                       to={item.path} 
                       className="hover:text-amber-500 transition-colors flex items-center gap-2 group"
                     >
                       <span className="w-1 h-1 rounded-full bg-stone-700 group-hover:bg-amber-500 transition-colors"></span>
                       {item.name}
                     </Link>
                   </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Contact Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="leading-relaxed pl-3 border-l-2 border-stone-800">
                  7R46+J2W, Vasmat Road,<br/>
                  Parbhani, Maharashtra 431402
                </li>
                <li className="pl-3 border-l-2 border-stone-800">
                  <a href="tel:09022960646" className="text-white hover:text-amber-500 transition-colors font-medium block">
                    090229 60646
                  </a>
                </li>
                <li className="pt-2">
                   <a 
                     href="https://wa.me/919022960646" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all border border-stone-700 hover:border-amber-500/30 group"
                   >
                     <span className="w-2 h-2 rounded-full bg-[#25D366] group-hover:animate-pulse"></span>
                     WhatsApp Enquiry
                   </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Opening Hours */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Opening Hours</h4>
              <div className="bg-stone-800/30 p-6 rounded-2xl border border-stone-800/50 backdrop-blur-sm">
                 <div className="flex items-center justify-between mb-3">
                    <span className="text-stone-300 font-medium text-sm">Open Daily</span>
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                 </div>
                 <p className="text-amber-500 font-bold text-xl tracking-tight">11:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
            <p>© 2026 Vatika Pure Veg</p>
            <div className="h-px w-full md:w-auto md:h-4 bg-stone-800/50"></div>
            <p className="uppercase tracking-[0.2em] text-[10px] text-stone-500">Serving Parbhani with Pride</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
