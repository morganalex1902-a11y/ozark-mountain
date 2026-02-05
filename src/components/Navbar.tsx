import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Cabins', path: '/cabins' },
  { name: 'RV Stays', path: '/rv-stays' },
  { name: 'Activities', path: '/activities' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 lg:h-36">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Ozark Mountain Escape"
              className="h-24 lg:h-32 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm tracking-wide uppercase font-medium ${
                  location.pathname === link.path ? 'text-accent' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Contact */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:9723429846" className="flex items-center gap-2 text-cream/80 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">(972) 342-9846</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-cream"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-2 text-lg font-medium ${
                      location.pathname === link.path ? 'text-accent' : 'text-cream/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                <a href="tel:9723429846" className="flex items-center gap-3 text-cream/80">
                  <Phone className="w-5 h-5" />
                  <span>(972) 342-9846</span>
                </a>
                <a href="mailto:Tara@ozarkmountainescape.com" className="flex items-center gap-3 text-cream/80">
                  <Mail className="w-5 h-5" />
                  <span>Tara@ozarkmountainescape.com</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
