import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import serverInfo from '../data/server-info';
import { Menu, X, ExternalLink, Home, Newspaper, ShoppingCart, MessageSquare, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavIcons = {
  Home: Home,
  Newspaper: Newspaper,
  ShoppingCart: ShoppingCart,
  MessageSquare: MessageSquare,
  BookOpen: BookOpen
};

function Navbar({ onOpenModal }) {
  const { logoText, navbarLinks } = serverInfo;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
          toggleButtonRef.current && !toggleButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const renderLink = (link, isMobile = false) => {
    const isExternal = link.url.startsWith('http');
    const IconComponent = NavIcons[link.icon]; 
    
    const baseClasses = isMobile 
      ? "text-lg font-bold font-serif uppercase tracking-widest text-hytale-text w-full text-center py-4 flex items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-hytale-gold hover:text-hytale-gold transition-all duration-200 active:scale-95 shadow-sm"
      : "relative px-6 py-2 group rounded-md transition-all duration-200 hover:bg-hytale-gold/10 border border-transparent hover:border-hytale-gold/20";

    const content = (
      <>
        <div className="relative flex items-center gap-2 z-10">
           {IconComponent && <IconComponent size={isMobile ? 20 : 18} className={`text-hytale-gold/80 group-hover:text-hytale-gold transition-colors duration-200 ${!isMobile && "group-hover:scale-110"}`} />}
           <span className={`font-serif font-bold uppercase tracking-widest text-sm text-hytale-text/90 group-hover:text-white transition-colors duration-200 ${!isMobile && "group-hover:drop-shadow-[0_0_5px_rgba(205,176,117,0.5)]"}`}>
             {link.name}
           </span>
           {isExternal && <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 text-hytale-gold" />}
        </div>
      </>
    );

    const LinkComponent = isExternal ? 'a' : Link;
    const props = isExternal 
      ? { href: link.url, target: "_blank", rel: "noopener noreferrer" }
      : { to: link.url };

    return (
      <LinkComponent
        key={link.name}
        {...props}
        className={baseClasses}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        {content}
      </LinkComponent>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/5 shadow-xl">
        
        <div className="container mx-auto h-full flex justify-between items-center relative px-6">
          
          {/* Logo Area - Simplificado */}
          <Link to="/" className="group relative z-50 flex items-center">
             <span className="text-3xl font-serif font-bold tracking-[0.15em] bg-gradient-to-r from-hytale-gold via-yellow-200 to-hytale-gold bg-clip-text text-transparent drop-shadow-sm group-hover:drop-shadow-[0_0_10px_rgba(205,176,117,0.5)] transition-all duration-300">
              {logoText.toUpperCase()}
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center bg-black/40 px-2 py-1 rounded-full border border-white/5 shadow-inner">
            {navbarLinks.map((link) => renderLink(link, false))}
          </div>

          <div className="md:hidden z-50 ml-auto">
            <button ref={toggleButtonRef} onClick={toggleMobileMenu} className="text-hytale-text text-2xl p-2 active:text-hytale-gold transition-colors">
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 w-full h-full bg-black/60 backdrop-blur-md z-40 flex flex-col items-center justify-start pt-28 px-6 space-y-4 overflow-y-auto"
          >
            <div className="w-full flex flex-col gap-4 items-center" onClick={(e) => e.stopPropagation()}>
               {navbarLinks
                 .map((link) => renderLink(link, true))
               }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;