import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Usar Link en lugar de a href
import serverInfo from '../data/server-info';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Aceptamos la prop onOpenModal
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

  return (
    <nav className="bg-hytale-blue/95 backdrop-blur-sm text-hytale-text p-4 shadow-lg sticky top-0 z-50 border-b border-hytale-gold/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif text-hytale-gold hover:text-hytale-gold-hover transition-colors z-50 drop-shadow-sm">
          {logoText}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navbarLinks.map((link) => (
            <Link // Usamos Link de react-router
              key={link.name}
              to={link.url}
              className="text-lg font-sans hover:text-hytale-gold-hover transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hytale-gold transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Botón Acción Desktop */}
        <div className="hidden md:block">
          <button // Cambiado de <a> a <button>
            onClick={onOpenModal}
            className="bg-hytale-gold hover:bg-hytale-gold-hover text-hytale-dark font-bold py-2 px-5 rounded-md transition-all transform hover:scale-105 shadow-md"
          >
            Unirse Ahora
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50">
          <button ref={toggleButtonRef} onClick={toggleMobileMenu} className="text-hytale-text text-2xl p-2">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-hytale-blue border-b border-hytale-gold/20 p-4 shadow-xl flex flex-col items-center space-y-4"
          >
            {navbarLinks.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="text-xl font-sans text-hytale-text hover:text-hytale-gold-hover transition-colors w-full text-center py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                onOpenModal();
                setIsMobileMenuOpen(false);
              }}
              className="bg-hytale-gold text-hytale-dark font-bold py-3 px-8 rounded-md w-full mt-2"
            >
              Unirse Ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;