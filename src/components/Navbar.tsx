import { useState, useEffect } from 'react';
import { Compass, Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'xy' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-orange-600 p-2 rounded-lg group-hover:rotate-45 transition-transform duration-500">
              <Compass className="text-white w-6 h-6" />
            </div>
            <span className={`font-display font-bold text-xl tracking-tight ${!scrolled && isHome ? 'text-white' : 'text-stone-900'}`}>
              {t('company.name').toUpperCase()}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#destinations" className={`text-sm font-medium hover:text-orange-600 transition-colors ${!scrolled && isHome ? 'text-white' : 'text-stone-900'}`}>{t('nav.destinations')}</Link>
            <Link to="/#about" className={`text-sm font-medium hover:text-orange-600 transition-colors ${!scrolled && isHome ? 'text-white' : 'text-stone-900'}`}>{t('nav.about')}</Link>
            <Link to="/#contact" className={`text-sm font-medium hover:text-orange-600 transition-colors ${!scrolled && isHome ? 'text-white' : 'text-stone-900'}`}>{t('nav.contact')}</Link>
            
            <button 
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${
                !scrolled && isHome 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{i18n.language === 'en' ? 'XY' : 'EN'}</span>
            </button>

            <Link 
              to="/#contact" 
              className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-600 transition-all"
            >
              {t('common.sendInquiry')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className={`md:hidden ${!scrolled && isHome ? 'text-white' : 'text-stone-900'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-bold">
              <Link to="/#destinations" onClick={() => setIsMenuOpen(false)}>Destinations</Link>
              <Link to="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/#contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link 
                to="/#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-orange-600 text-white py-4 rounded-xl text-center font-bold"
              >
                {t('common.sendInquiry')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
