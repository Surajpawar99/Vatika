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
              <li><Link to="/vatika" className="hover:text-white transition-colors">Menu</Link></li>
              <li><Link to="/book" className="hover:text-white transition-colors">Reservations</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>7R46+J2W, Vasmat Road</li>
              <li>Parbhani, Maharashtra 431402</li>
              <li>090229 60646</li>
              <li>hello@vatikapureveg.com</li>
              <li>
                <a 
                  href="https://wa.me/919022960646?text=Hello%20Vatika%20Pure%20Veg,%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-[#128C7E] transition-colors flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enquiry on WhatsApp
                </a>
              </li>
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
