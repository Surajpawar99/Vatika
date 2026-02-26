import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Vatika Menu', path: '/vatika' },
    { name: 'Order Online', path: '/order' },
    { name: 'Book Table', path: '/book' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-orange-200">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-stone-900">
              Vatika<span className="text-orange-600"> Pure Veg</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                    location.pathname === item.path ? 'text-orange-600' : 'text-stone-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
                title="Admin Panel"
              >
                <User size={20} />
              </Link>
              <Link to="/order" className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors relative">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-orange-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
               <Link to="/order" className="p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors relative">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-orange-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-stone-600 hover:text-stone-900 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-4 text-base font-medium border-b border-stone-100 ${
                      location.pathname === item.path
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                >
                  Admin Panel
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20 pb-16">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-serif text-lg mb-4">Vatika Pure Veg</h3>
            <p className="text-sm leading-relaxed">
              Experience the finest culinary delights in a warm and inviting atmosphere.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link to="/book" className="hover:text-white transition-colors">Reservations</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Culinary Avenue</li>
              <li>New York, NY 10012</li>
              <li>(555) 123-4567</li>
              <li>hello@gourmethaven.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Mon-Fri</span> <span>11am - 10pm</span></li>
              <li className="flex justify-between"><span>Sat-Sun</span> <span>10am - 11pm</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-xs text-center">
          © {new Date().getFullYear()} Vatika Pure Veg. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
