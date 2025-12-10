import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import serverInfo from '../data/server-info';
import { Menu, X, ExternalLink, Home, Newspaper, ShoppingCart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavIcons = {
  Home: Home,
  Newspaper: Newspaper,
  ShoppingCart: ShoppingCart,
  MessageSquare: MessageSquare
};

function Navbar({ onOpenModal }) {
  const { logoText, navbarLinks } = serverInfo;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
      : "text-lg font-sans hover:text-hytale-gold-hover transition-colors relative group flex items-center gap-1";

    const content = (
      <>
        {isMobile && IconComponent && <IconComponent size={20} />}
        {link.name}
        {isExternal && (
          <ExternalLink size={16} className="opacity-70 group-hover:opacity-100" /> 
        )}
        {!isMobile && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hytale-gold transition-all group-hover:w-full"></span>}
      </>
    );

    if (isExternal) {
      return (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={link.name}
        to={link.url}
        className={baseClasses}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        {content}
      </Link>
    );
  };

  return (
    <nav className="bg-black/60 backdrop-blur-md text-hytale-text p-4 shadow-2xl sticky top-0 z-[100] border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center relative z-[101]">
        <Link to="/" className="text-2xl font-serif text-hytale-gold hover:text-hytale-gold-hover transition-colors drop-shadow-sm">
          {logoText}
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {navbarLinks.map((link) => renderLink(link, false))}
        </div>

        <div className="hidden md:block">
          <button
            onClick={onOpenModal}
            className="bg-hytale-gold hover:bg-hytale-gold-hover text-hytale-dark font-bold py-2 px-5 rounded-md transition-all transform hover:scale-105 shadow-md"
          >
            Unirse Ahora
          </button>
        </div>

        <div className="md:hidden">
          <button ref={toggleButtonRef} onClick={toggleMobileMenu} className="text-hytale-text text-2xl p-2 active:text-hytale-gold transition-colors">
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-black/60 backdrop-blur-md border-t border-white/10 p-6 shadow-2xl flex flex-col items-center space-y-3 z-[99]"
          >
            {navbarLinks.map((link) => renderLink(link, true))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;